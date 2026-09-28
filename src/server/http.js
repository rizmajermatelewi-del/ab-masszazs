import { createBooking, formatWhen } from './booking.js'
import { googleCalendar } from './google.js'
import { gmailMailer } from './mail.js'
import { createMessages } from './message.js'
import { createDaily } from './daily.js'
import { BUSINESS } from '../data/business.js'

/* The three endpoints (spec §3) as one web-standard handler: Request in,
   Response out. The host adapter in netlify/functions/ is two lines, so a
   move to another host does not touch this file. */

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } })

/* Per-IP limit on booking attempts (spec §4: honeypot plus rate limit, no
   captcha). In memory, per function instance.
   ponytail: an instance restart forgets it; a shared store if abuse appears. */
const hits = new Map()
const LIMIT = { max: 5, windowMs: 10 * 60000 }
export function allow(ip, now = Date.now()) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < LIMIT.windowMs)
  if (recent.length >= LIMIT.max) return false
  hits.set(ip, [...recent, now])
  return true
}

/* Built from environment variables at the host. Missing any of them means
   booking is not wired yet, and the page falls back to the phone number. */
export function bookingFromEnv(env) {
  const need = ['GOOGLE_CLIENT_EMAIL', 'GOOGLE_PRIVATE_KEY', 'CALENDAR_ID', 'GMAIL_USER', 'GMAIL_APP_PASSWORD', 'BOOKING_SECRET', 'SITE_ORIGIN']
  if (need.some((k) => !env[k])) return null
  return createBooking({
    calendar: googleCalendar({
      clientEmail: env.GOOGLE_CLIENT_EMAIL,
      // Hosts store the key on one line with literal \n.
      privateKey: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      calendarId: env.CALENDAR_ID,
    }),
    mailer: gmailMailer({ user: env.GMAIL_USER, pass: env.GMAIL_APP_PASSWORD, fromName: BUSINESS.name }),
    secret: env.BOOKING_SECRET,
    origin: env.SITE_ORIGIN,
  })
}

/* The daily reminder / review-request run needs the same wiring as booking. */
export function dailyFromEnv(env) {
  const need = ['GOOGLE_CLIENT_EMAIL', 'GOOGLE_PRIVATE_KEY', 'CALENDAR_ID', 'GMAIL_USER', 'GMAIL_APP_PASSWORD']
  if (need.some((k) => !env[k])) return null
  return createDaily({
    calendar: googleCalendar({
      clientEmail: env.GOOGLE_CLIENT_EMAIL,
      privateKey: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      calendarId: env.CALENDAR_ID,
    }),
    mailer: gmailMailer({ user: env.GMAIL_USER, pass: env.GMAIL_APP_PASSWORD, fromName: BUSINESS.name }),
  })
}

/* The callback and voucher forms need only Gmail, so they go live before the
   calendar does. Sent to her own address. */
export function messagesFromEnv(env) {
  if (!env.GMAIL_USER || !env.GMAIL_APP_PASSWORD) return null
  return createMessages({
    mailer: gmailMailer({ user: env.GMAIL_USER, pass: env.GMAIL_APP_PASSWORD, fromName: BUSINESS.name }),
    to: env.GMAIL_USER,
  })
}

export async function handle(req, booking, ip = 'unknown', messages = null) {
  const url = new URL(req.url)
  const path = url.pathname.replace(/\/+$/, '')

  if (path.endsWith('/message') && req.method === 'POST') {
    if (!messages) return json({ ok: false, code: 'unavailable' }, 503)
    if (!allow(ip)) return json({ ok: false, code: 'limited' }, 429)
    try {
      const r = await messages.send(await req.json().catch(() => ({})))
      return json(r, r.ok ? 200 : 400)
    } catch (err) {
      console.error('message api', err)
      return json({ ok: false, code: 'unavailable' }, 503)
    }
  }

  if (!booking) return path.endsWith('/cancel') ? page(UNAVAILABLE) : json({ ok: false, code: 'unavailable' }, 503)

  try {
    if (path.endsWith('/slots') && req.method === 'GET') {
      const r = await booking.slots({ serviceId: url.searchParams.get('service'), date: url.searchParams.get('date') })
      return json(r, r.ok ? 200 : 400)
    }
    if (path.endsWith('/book') && req.method === 'POST') {
      if (!allow(ip)) return json({ ok: false, code: 'limited' }, 429)
      const body = await req.json().catch(() => ({}))
      const r = await booking.book(body)
      return json(r, r.ok ? 200 : r.code === 'taken' ? 409 : 400)
    }
    if (path.endsWith('/cancel')) {
      const token = url.searchParams.get('token')
      if (req.method === 'POST') {
        const r = await booking.cancel(token)
        return page(r.ok ? cancelled(r.start) : GONE)
      }
      const r = await booking.cancelInfo(token)
      return page(r.ok ? confirm(r.start, r.summary, token) : GONE)
    }
    return json({ ok: false, code: 'not-found' }, 404)
  } catch (err) {
    // Calendar or network down: the page must say so and show the phone
    // number (spec §4), never pretend a booking went through.
    console.error('booking api', err)
    return path.endsWith('/cancel') ? page(UNAVAILABLE) : json({ ok: false, code: 'unavailable' }, 503)
  }
}

/* The cancel link opens a small page of its own. It is not part of the
   React app because it has to work from an e-mail client with no state. */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
const phoneLine = () => (BUSINESS.phone ? `<p>Kérdés esetén hívj: <a href="tel:${esc(BUSINESS.phone.replace(/\s/g, ''))}">${esc(BUSINESS.phone)}</a></p>` : '')

const confirm = (start, summary, token) => `
  <h1>Lemondod az időpontot?</h1>
  <p><strong>${esc(summary)}</strong><br>${esc(formatWhen(start))}</p>
  <form method="post" action="/api/cancel?token=${encodeURIComponent(token)}">
    <button type="submit">Igen, lemondom</button>
  </form>
  <p><a href="/">Mégsem, maradjon</a></p>`
const cancelled = (start) => `
  <h1>Lemondva</h1>
  <p>A ${esc(formatWhen(start))} időpontot töröltem, és e-mailben is megerősítem.</p>
  ${phoneLine()}<p><a href="/foglalas">Új időpontot foglalok</a></p>`
const GONE = `
  <h1>Ez a link már nem érvényes</h1>
  <p>Az időpontot már lemondták vagy módosították.</p>`
const UNAVAILABLE = `
  <h1>Most nem sikerült</h1>
  <p>A lemondás most technikai okból nem ment végig.</p>`

function page(body) {
  const html = `<!doctype html><html lang="hu"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${esc(BUSINESS.name || 'Időpont')}</title>
<style>body{margin:0;background:#F4E9E6;color:#2E1A2B;font:17px/1.6 system-ui,sans-serif}main{max-width:32rem;margin:0 auto;padding:4rem 1.25rem}h1{font:400 2rem/1.2 Georgia,serif;margin:0 0 1rem}a{color:#6E3563}button{margin-top:.5rem;min-height:52px;padding:0 1.75rem;border:0;border-radius:999px;background:#6E3563;color:#F4E9E6;font:500 15px system-ui,sans-serif;cursor:pointer}</style>
</head><body><main>${body}${body === UNAVAILABLE ? phoneLine() : ''}</main></body></html>`
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
}
