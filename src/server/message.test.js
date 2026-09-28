import { describe, it, expect } from 'vitest'
import { composeMessage, createMessages, VOUCHER_MONTHS } from './message.js'
import { handle } from './http.js'

const SERVICES = [{ id: 'sved', name: 'Svédmasszázs', minutes: 60, price: 9000 }]
const who = { name: 'Kiss Anna', phone: '+36 30 123 4567' }

describe('composeMessage', () => {
  it('turns a callback request into an e-mail with the time window', () => {
    const r = composeMessage({ kind: 'callback', ...who, when: 'du', serviceId: 'sved' }, SERVICES)
    expect(r.ok).toBe(true)
    expect(r.mail.subject).toBe('Visszahívást kér: Kiss Anna')
    expect(r.mail.text).toContain('Kora délután (12-15)')
    expect(r.mail.text).toContain('Érdekli: Svédmasszázs')
  })

  it('turns a voucher request into an e-mail with price and validity', () => {
    const r = composeMessage({ kind: 'voucher', ...who, serviceId: 'sved', recipient: 'Nagy Éva' }, SERVICES)
    expect(r.ok).toBe(true)
    expect(r.mail.text).toContain('Kinek szól: Nagy Éva')
    expect(r.mail.text).toContain('9 000 Ft')
    expect(r.mail.text).toContain(`${VOUCHER_MONTHS} hónap`)
  })

  it('refuses a bad phone, a missing window, an unknown treatment or a missing recipient', () => {
    expect(composeMessage({ kind: 'callback', ...who, phone: 'x', when: 'de' }, SERVICES).ok).toBe(false)
    expect(composeMessage({ kind: 'callback', ...who, when: 'éjjel' }, SERVICES).ok).toBe(false)
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
    const ok = await handle(post({ kind: 'callback', ...who, when: 'de' }), null, '2.2.2.2', messages)
    const spam = await handle(post({ website: 'x' }), null, '2.2.2.3', messages)
    expect(ok.status).toBe(200)
    expect(spam.status).toBe(200)
    expect(sent).toHaveLength(1)
    expect(sent[0].to).toBe('brigitta@x.hu')
  })
})
