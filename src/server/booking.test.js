// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest'
import { createBooking } from './booking.js'
import { handle } from './http.js'
import { zoned } from '../lib/slots.js'

const SERVICES = [{ id: 'sved-60', name: 'Svédmasszázs', minutes: 60, price: 12000 }]
const BUSINESS = {
  name: 'AB Masszázs',
  email: 'salon@example.com',
  phone: '+36 30 000 0000',
  street: 'Utca 1.',
  postalCode: '1000',
  city: 'Budapest',
  hours: [{ day: 'Hétfő', opens: '09:00', closes: '12:00' }],
}
// Monday 2026-10-05, 09:00 local
const NINE = new Date(zoned(2026, 10, 5, 9, 0)).toISOString()
const NOW = zoned(2026, 10, 1, 12, 0)

/* An in-memory calendar. `sneak` inserts a rival event between the
   booking's check and its write, which is the race spec §8 asks for. */
function fakeCalendar() {
  const events = new Map()
  let n = 0
  const cal = {
    events,
    sneak: null,
    reads: 0,
    async busy() {
      cal.reads++
      if (cal.sneak && cal.reads === 2) events.set('rival', cal.sneak)
      return [...events.values()].map((e) => ({ start: e.start, end: e.end }))
    },
    async insert(e) {
      const id = `ev${++n}`
      events.set(id, { ...e, id })
      return { id }
    },
    async get(id) {
      return events.get(id) ?? null
    },
    async remove(id) {
      events.delete(id)
    },
  }
  return cal
}

let cal, sent, booking
const input = (over = {}) => ({
  serviceId: 'sved-60',
  start: NINE,
  name: 'Teszt Elek',
  phone: '+36 30 123 4567',
  email: 'elek@example.com',
  consent: true,
  ...over,
})

beforeEach(() => {
  cal = fakeCalendar()
  sent = []
  booking = createBooking({
    calendar: cal,
    mailer: { send: async (m) => sent.push(m) },
    secret: 'test-secret',
    origin: 'https://example.test',
    now: () => NOW,
    services: SERVICES,
    business: BUSINESS,
  })
})

describe('booking', () => {
  it('books a free slot: one event, an e-mail to each side, a cancel link', async () => {
    const r = await booking.book(input())
    expect(r).toMatchObject({ ok: true, start: NINE, mailed: true })
    expect(cal.events.size).toBe(1)
    expect(sent.map((m) => m.to)).toEqual(['elek@example.com', 'salon@example.com'])
    expect(sent[0].text).toMatch(/https:\/\/example\.test\/api\/cancel\?token=/)
    expect(sent[1].replyTo).toBe('elek@example.com')
  })

  it('refuses a slot someone took a moment earlier, and writes nothing', async () => {
    cal.sneak = { start: NINE, end: new Date(Date.parse(NINE) + 3600000).toISOString() }
    const first = await booking.slots({ serviceId: 'sved-60', date: '2026-10-05' })
    expect(first.slots).toContain(NINE)
    const r = await booking.book(input())
    expect(r).toEqual({ ok: false, code: 'taken' })
    expect(cal.events.has('rival')).toBe(true)
    expect(cal.events.size).toBe(1)
    expect(sent).toEqual([])
  })

  it('refuses a start the rules never offered', async () => {
    const offGrid = new Date(zoned(2026, 10, 5, 9, 10)).toISOString()
    expect(await booking.book(input({ start: offGrid }))).toEqual({ ok: false, code: 'taken' })
  })

  it('rejects missing consent and bad details', async () => {
    expect((await booking.book(input({ consent: false }))).code).toBe('invalid')
    expect((await booking.book(input({ email: 'nem-email' }))).code).toBe('invalid')
    expect((await booking.book(input({ phone: 'hívj fel' }))).code).toBe('invalid')
    expect(cal.events.size).toBe(0)
  })

  it('tells a bot filling the honeypot "done", and does nothing', async () => {
    expect(await booking.book(input({ website: 'spam' }))).toEqual({ ok: true })
    expect(cal.events.size).toBe(0)
  })

  it('cancels with the link, and only with an untampered one', async () => {
    await booking.book(input())
    const token = new URL(sent[0].text.match(/https:\S+/)[0]).searchParams.get('token')
    expect((await booking.cancelInfo(token + 'x')).ok).toBe(false)
    expect((await booking.cancelInfo(token)).ok).toBe(true)
    sent = []
    expect((await booking.cancel(token)).ok).toBe(true)
    expect(cal.events.size).toBe(0)
    expect(sent.map((m) => m.to).sort()).toEqual(['elek@example.com', 'salon@example.com'])
    expect((await booking.cancel(token)).code).toBe('gone')
  })
})

describe('http', () => {
  it('opening the cancel link only asks; cancelling needs the POST', async () => {
    await booking.book(input())
    const link = sent[0].text.match(/https:\S+/)[0]
    const get = await handle(new Request(link), booking)
    expect(await get.text()).toMatch(/Lemondod az időpontot\?/)
    expect(cal.events.size).toBe(1)
    await handle(new Request(link, { method: 'POST' }), booking)
    expect(cal.events.size).toBe(0)
  })

  it('answers 503 when the calendar is down or not configured', async () => {
    cal.busy = async () => {
      throw new Error('down')
    }
    const r = await handle(new Request('https://x.test/api/slots?service=sved-60&date=2026-10-05'), booking)
    expect(r.status).toBe(503)
    expect((await handle(new Request('https://x.test/api/slots'), null)).status).toBe(503)
  })

  it('returns 409 for a taken slot so the page can refresh the list', async () => {
    await booking.book(input())
    const r = await handle(
      new Request('https://x.test/api/book', { method: 'POST', body: JSON.stringify(input({ email: 'masik@example.com' })) }),
      booking,
      '1.2.3.4',
    )
    expect(r.status).toBe(409)
  })
})
