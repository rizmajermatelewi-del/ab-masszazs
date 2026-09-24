import { describe, it, expect } from 'vitest'
import { freeSlots, zoned, localDate } from './slots.js'

const WEEK = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'].map((day) => ({
  day,
  opens: '09:00',
  closes: '12:00',
}))
const at = (date, time) => {
  const [y, m, d] = date.split('-').map(Number)
  const [h, min] = time.split(':').map(Number)
  return zoned(y, m, d, h, min)
}
const iso = (date, time) => new Date(at(date, time)).toISOString()
const LONG_AGO = '2026-01-01T00:00:00Z'
const OPEN = { bufferMin: 15, leadMin: 0, horizonDays: 400, stepMin: 30 }

describe('freeSlots', () => {
  it('offers every grid start the whole treatment fits into', () => {
    // 2026-10-05 is a Monday
    const s = freeSlots({ hours: WEEK, minutes: 60, now: LONG_AGO, from: '2026-10-05', rules: OPEN })
    expect(s).toEqual(['09:00', '09:30', '10:00', '10:30', '11:00'].map((t) => iso('2026-10-05', t)))
  })

  it('keeps the buffer after an appointment, and not a minute more', () => {
    const endsAtTen = [{ start: iso('2026-10-05', '09:00'), end: iso('2026-10-05', '10:00') }]
    expect(freeSlots({ hours: WEEK, busy: endsAtTen, minutes: 60, now: LONG_AGO, from: '2026-10-05', rules: OPEN })[0]).toBe(
      iso('2026-10-05', '10:30'),
    )
    const endsAt945 = [{ start: iso('2026-10-05', '09:00'), end: iso('2026-10-05', '09:45') }]
    expect(freeSlots({ hours: WEEK, busy: endsAt945, minutes: 60, now: LONG_AGO, from: '2026-10-05', rules: OPEN })[0]).toBe(
      iso('2026-10-05', '10:00'),
    )
  })

  it('keeps the buffer before an appointment too', () => {
    const startsAt1115 = [{ start: iso('2026-10-05', '11:15'), end: iso('2026-10-05', '11:45') }]
    const s = freeSlots({ hours: WEEK, busy: startsAt1115, minutes: 60, now: LONG_AGO, from: '2026-10-05', rules: OPEN })
    // 10:00-11:00 ends exactly 15 minutes before; 10:30 would not
    expect(s.at(-1)).toBe(iso('2026-10-05', '10:00'))
  })

  it('returns nothing for a fully booked day, rather than throwing', () => {
    const allDay = [{ start: iso('2026-10-05', '08:00'), end: iso('2026-10-05', '13:00') }]
    expect(freeSlots({ hours: WEEK, busy: allDay, minutes: 60, now: LONG_AGO, from: '2026-10-05', rules: OPEN })).toEqual([])
  })

  it('applies the lead time at exactly the threshold', () => {
    const rules = { ...OPEN, leadMin: 120, horizonDays: 60 }
    const exactly = at('2026-10-05', '07:00')
    expect(freeSlots({ hours: WEEK, minutes: 60, now: exactly, from: '2026-10-05', rules })[0]).toBe(iso('2026-10-05', '09:00'))
    expect(freeSlots({ hours: WEEK, minutes: 60, now: exactly + 60000, from: '2026-10-05', rules })[0]).toBe(
      iso('2026-10-05', '09:30'),
    )
  })

  it('offers nothing when the treatment is longer than any gap', () => {
    expect(freeSlots({ hours: WEEK, minutes: 240, now: LONG_AGO, from: '2026-10-05', rules: OPEN })).toEqual([])
  })

  it('stops at the horizon', () => {
    const now = at('2026-10-05', '10:00')
    const s = freeSlots({ hours: WEEK, minutes: 60, now, from: '2026-10-05', days: 3, rules: { ...OPEN, horizonDays: 1 } })
    expect(s.every((x) => Date.parse(x) <= now + 86400000)).toBe(true)
    expect(s.some((x) => localDate(Date.parse(x)) === '2026-10-06')).toBe(true)
    expect(s.some((x) => localDate(Date.parse(x)) === '2026-10-07')).toBe(false)
  })

  it('keeps 9:00 at 9:00 local across both DST weekends', () => {
    const first = (date) => freeSlots({ hours: WEEK, minutes: 60, now: LONG_AGO, from: date, rules: OPEN })[0]
    // spring: clocks go forward on Sunday 29 March 2026
    expect(first('2026-03-28')).toBe('2026-03-28T08:00:00.000Z')
    expect(first('2026-03-29')).toBe('2026-03-29T07:00:00.000Z')
    // autumn: clocks go back on Sunday 25 October 2026
    expect(first('2026-10-24')).toBe('2026-10-24T07:00:00.000Z')
    expect(first('2026-10-25')).toBe('2026-10-25T08:00:00.000Z')
  })

  it('is closed on days with no hours', () => {
    // 2026-10-10 is a Saturday
    expect(freeSlots({ hours: WEEK.slice(0, 5), minutes: 60, now: LONG_AGO, from: '2026-10-10', rules: OPEN })).toEqual([])
  })
})
