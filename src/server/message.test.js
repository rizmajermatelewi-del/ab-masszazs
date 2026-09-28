import { describe, it, expect } from 'vitest'
import { composeMessage, createMessages, VOUCHER_MONTHS, FLEXIBLE } from './message.js'
import { handle } from './http.js'

const SERVICES = [{ id: 'sved', name: 'Svédmasszázs', minutes: 60, price: 9000 }]
const who = { name: 'Kiss Anna', phone: '+36 30 123 4567' }

describe('composeMessage', () => {
  it('turns an appointment request into an e-mail with day, time and treatment', () => {
    const r = composeMessage({ kind: 'booking', ...who, serviceId: 'sved', date: '2026-10-06', time: '10:00' }, SERVICES)
    expect(r.ok).toBe(true)
    expect(r.mail.subject).toBe('Időpontkérés: Kiss Anna, 2026-10-06 10:00')
    expect(r.mail.text).toContain('október 6.')
    expect(r.mail.text).toContain('Időpont: 10:00')
    expect(r.mail.text).toContain('Kezelés: Svédmasszázs')
  })

  it('accepts a flexible time', () => {
    const r = composeMessage({ kind: 'booking', ...who, serviceId: 'sved', date: '2026-10-06', time: FLEXIBLE }, SERVICES)
    expect(r.mail.text).toContain('aznap bármikor jó neki')
  })

  it('turns a voucher request into an e-mail with price and validity', () => {
    const r = composeMessage({ kind: 'voucher', ...who, serviceId: 'sved', recipient: 'Nagy Éva' }, SERVICES)
    expect(r.ok).toBe(true)
    expect(r.mail.text).toContain('Kinek szól: Nagy Éva')
    expect(r.mail.text).toContain('9 000 Ft')
    expect(r.mail.text).toContain(`${VOUCHER_MONTHS} hónap`)
  })

  it('refuses a bad phone, a missing window, an unknown treatment or a missing recipient', () => {
    const ok = { kind: 'booking', ...who, serviceId: 'sved', date: '2026-10-06', time: '10:00' }
    expect(composeMessage({ ...ok, phone: 'x' }, SERVICES).ok).toBe(false)
    expect(composeMessage({ ...ok, time: 'éjjel' }, SERVICES).ok).toBe(false)
    expect(composeMessage({ ...ok, date: 'holnap' }, SERVICES).ok).toBe(false)
    expect(composeMessage({ kind: 'voucher', ...who, serviceId: 'nincs', recipient: 'Éva' }, SERVICES).ok).toBe(false)
    expect(composeMessage({ kind: 'voucher', ...who, serviceId: 'sved', recipient: ' ' }, SERVICES).ok).toBe(false)
    expect(composeMessage({ kind: 'mas', ...who }, SERVICES).ok).toBe(false)
  })

  it('answers a filled honeypot as success but marks it spam', () => {
    expect(composeMessage({ website: 'http://spam', kind: 'callback' })).toEqual({ ok: true, spam: true })
  })
})

describe('POST /api/message', () => {
  const post = (body) =>
    new Request('https://x.hu/api/message', { method: 'POST', body: JSON.stringify(body) })

  it('says unavailable when Gmail is not configured', async () => {
    const res = await handle(post({}), null, '1.1.1.1', null)
    expect(res.status).toBe(503)
  })

  it('sends one e-mail for a valid form and none for spam', async () => {
    const sent = []
    const messages = createMessages({ mailer: { send: async (m) => sent.push(m) }, to: 'brigitta@x.hu' })
    const ok = await handle(post({ kind: 'booking', ...who, serviceId: 'svedmasszazs', date: '2026-10-06', time: '10:00' }), null, '2.2.2.2', messages)
    const spam = await handle(post({ website: 'x' }), null, '2.2.2.3', messages)
    expect(ok.status).toBe(200)
    expect(spam.status).toBe(200)
    expect(sent).toHaveLength(1)
    expect(sent[0].to).toBe('brigitta@x.hu')
  })
})
