import { createHmac, timingSafeEqual } from 'node:crypto'
import { freeSlots, zoned, localDate, TZ, RULES } from '../lib/slots.js'
import { SERVICES } from '../data/services.js'
import { BUSINESS } from '../data/business.js'
import { formatPrice } from '../lib/format.js'

/* The booking rules (spec §3–4), with the calendar and the mailer passed in
   so the tests run against fakes and never call Google. There is no
   database: the booking *is* the calendar event. */

const DATE = /^\d{4}-\d{2}-\d{2}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^[+0-9 ()/-]{7,20}$/

const when = new Intl.DateTimeFormat('hu-HU', { timeZone: TZ, dateStyle: 'full', timeStyle: 'short' })
export const formatWhen = (iso) => when.format(new Date(iso))

const joinLines = (lines) => lines.filter((l) => l !== false && l !== undefined && l !== null).join('\n')

/* The cancel link carries the event id and its start, signed, so one client
   cannot cancel another's appointment by editing a URL. The start is in
   the signature too: a link for an event that was later moved stops
   working rather than cancelling the new time. */
function sign(secret, id, start) {
  const body = Buffer.from(`${id}|${start}`).toString('base64url')
  const mac = createHmac('sha256', secret).update(body).digest('base64url')
  return `${body}.${mac}`
}

function verify(secret, token) {
  const [body, mac] = String(token ?? '').split('.')
  if (!body || !mac) return null
  const want = Buffer.from(createHmac('sha256', secret).update(body).digest('base64url'))
  const got = Buffer.from(mac)
  if (want.length !== got.length || !timingSafeEqual(want, got)) return null
  const [id, start] = Buffer.from(body, 'base64url').toString().split('|')
  return id && start ? { id, start } : null
}

export function createBooking({
  calendar,
  mailer,
  secret,
  origin,
  now = () => Date.now(),
  services = SERVICES,
  business = BUSINESS,
  rules = RULES,
}) {
  const serviceById = (id) => services.find((s) => s.id === id)

  async function slots({ serviceId, date }) {
    const service = serviceById(serviceId)
    if (!service || !DATE.test(date ?? '')) return { ok: false, code: 'invalid' }
    const [y, m, d] = date.split('-').map(Number)
    // The whole local day, widened by the buffer so an appointment just
    // before opening or after closing still counts.
    const pad = rules.bufferMin * 60000
    const timeMin = new Date(zoned(y, m, d, 0, 0) - pad).toISOString()
    const timeMax = new Date(zoned(y, m, d + 1, 0, 0) + pad).toISOString()
    const busy = await calendar.busy(timeMin, timeMax)
    return { ok: true, slots: freeSlots({ hours: business.hours, busy, minutes: service.minutes, now: now(), from: date, rules }) }
  }

  async function book(input) {
    // A bot fills the hidden field. It is told "done" and nothing happens,
    // so it learns nothing from trying again.
    if (input.website) return { ok: true }

    const service = serviceById(input.serviceId)
    const name = String(input.name ?? '').trim()
    const phone = String(input.phone ?? '').trim()
    const email = String(input.email ?? '').trim()
    const note = String(input.note ?? '').trim()
    const start = String(input.start ?? '')
    if (
      !service ||
      name.length < 2 ||
      name.length > 80 ||
      !PHONE.test(phone) ||
      !EMAIL.test(email) ||
      email.length > 120 ||
      note.length > 500 ||
      input.consent !== true ||
      Number.isNaN(Date.parse(start))
    ) {
      return { ok: false, code: 'invalid' }
    }

    /* Re-read the calendar immediately before writing (spec §4). Google has
       no lock, so this narrows the race to milliseconds rather than closing
       it; it also rejects any start the rules would never have offered. */
    const iso = new Date(start).toISOString()
    const fresh = await slots({ serviceId: service.id, date: localDate(Date.parse(iso)) })
    if (!fresh.ok || !fresh.slots.includes(iso)) return { ok: false, code: 'taken' }

    const end = new Date(Date.parse(iso) + service.minutes * 60000).toISOString()
    const event = await calendar.insert({
      start: iso,
      end,
      summary: `${service.name} – ${name}`,
      description: joinLines([`Telefon: ${phone}`, `E-mail: ${email}`, note && `Megjegyzés: ${note}`, 'Foglalva a weboldalon.']),
    })

    const cancelUrl = `${origin}/api/cancel?token=${sign(secret, event.id, iso)}`
    const whenText = formatWhen(iso)
    const what = `${service.name}, ${service.minutes} perc, ${formatPrice(service.price)}`
    const place = [business.street, business.postalCode, business.city].filter(Boolean).join(', ')

    /* The event exists whatever happens to the e-mails. A failed send is
       reported, not turned into a failed booking she would never hear of. */
    const mails = await Promise.allSettled([
      mailer.send({
        to: email,
        subject: `Időpontod: ${whenText}`,
        text: joinLines([
          `Kedves ${name}!`,
          '',
          'Az időpontodat rögzítettem:',
          what,
          whenText,
          place && `Helyszín: ${place}`,
          '',
          `Ha mégsem jó, itt tudod lemondani: ${cancelUrl}`,
          business.phone && `Kérdés esetén hívj: ${business.phone}`,
          '',
          business.name,
        ]),
      }),
      mailer.send({
        to: business.email,
        replyTo: email,
        subject: `Új foglalás: ${name}, ${whenText}`,
        text: joinLines([what, whenText, '', `Név: ${name}`, `Telefon: ${phone}`, `E-mail: ${email}`, note && `Megjegyzés: ${note}`]),
      }),
    ])
    return { ok: true, start: iso, mailed: mails.every((m) => m.status === 'fulfilled') }
  }

  /* What the cancel page shows before asking for a click. Mail scanners
     open links on their own, so opening the link must never cancel. */
  async function cancelInfo(token) {
    const claim = verify(secret, token)
    if (!claim) return { ok: false, code: 'invalid' }
    const event = await calendar.get(claim.id)
    if (!event || event.start !== claim.start) return { ok: false, code: 'gone' }
    return { ok: true, id: claim.id, start: claim.start, summary: event.summary, description: event.description ?? '' }
  }

  /* Both sides hear about it (spec §4). The client's address is read back
     from the event, the only place it is stored. */
  async function cancel(token) {
    const info = await cancelInfo(token)
    if (!info.ok) return info
    await calendar.remove(info.id)
    const whenText = formatWhen(info.start)
    const clientEmail = info.description.match(/^E-mail: (.+)$/m)?.[1]
    await Promise.allSettled([
      mailer.send({
        to: business.email,
        subject: `Lemondva: ${info.summary}, ${whenText}`,
        text: `A vendég lemondta az időpontot a weboldalon.\n\n${info.summary}\n${whenText}`,
      }),
      clientEmail &&
        mailer.send({
          to: clientEmail,
          subject: `Lemondva: ${whenText}`,
          text: joinLines([`Az időpontodat (${whenText}) lemondtad.`, business.phone && `Új időpontért hívj: ${business.phone}`, '', business.name]),
        }),
    ])
    return { ok: true, start: info.start }
  }

  return { slots, book, cancelInfo, cancel }
}
