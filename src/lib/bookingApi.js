import { DEMO } from '../data/demo.js'
import { BUSINESS } from '../data/business.js'
import { freeSlots, zoned } from './slots.js'

/* The page's two calls. In demo mode nothing leaves the browser: free times
   are computed from her demo hours with two invented appointments per day,
   and "booking" only waits and says so. */

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

function demoSlots(service, date) {
  const [y, m, d] = date.split('-').map(Number)
  const busy = [
    { start: zoned(y, m, d, 10, 0), end: zoned(y, m, d, 11, 0) },
    { start: zoned(y, m, d, 14, 0), end: zoned(y, m, d, 15, 30) },
  ]
  return freeSlots({ hours: BUSINESS.hours, busy, minutes: service.minutes, now: Date.now(), from: date })
}

export class BookingError extends Error {
  constructor(code) {
    super(code)
    this.code = code
  }
}

export async function fetchSlots(service, date) {
  if (DEMO) {
    await wait(250)
    return demoSlots(service, date)
  }
  const res = await fetch(`/api/slots?service=${encodeURIComponent(service.id)}&date=${date}`).catch(() => null)
  const body = res ? await res.json().catch(() => null) : null
  if (!body?.ok) throw new BookingError(body?.code ?? 'unavailable')
  return body.slots
}

export async function submitBooking(payload) {
  if (DEMO) {
    await wait(600)
    return { ok: true, start: payload.start, demo: true }
  }
  const res = await fetch('/api/book', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => null)
  const body = res ? await res.json().catch(() => null) : null
  return body ?? { ok: false, code: 'unavailable' }
}
