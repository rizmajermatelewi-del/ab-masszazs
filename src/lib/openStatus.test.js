import { describe, it, expect } from 'vitest'
import { openStatus } from './openStatus'

const WEEKDAYS = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'].map((day) => ({
  day,
  opens: '08:00',
  closes: '18:00',
}))

/* 2026-09-28 is a Monday; Budapest is UTC+2 until the end of October. */
describe('openStatus', () => {
  it('is open inside the hours, and says until when', () => {
    expect(openStatus(WEEKDAYS, new Date('2026-09-28T08:00:00Z'))).toBe('Most nyitva, 18:00-ig')
  })
  it('before opening points to today', () => {
    expect(openStatus(WEEKDAYS, new Date('2026-09-28T05:00:00Z'))).toBe('Most zárva, ma 08:00-kor nyit')
  })
  it('after closing points to tomorrow', () => {
    expect(openStatus(WEEKDAYS, new Date('2026-09-28T17:30:00Z'))).toBe('Most zárva, holnap 08:00-kor nyit')
  })
  it('at the weekend points to Monday, in Budapest time not UTC', () => {
    // Friday 16:30 UTC is 18:30 in Budapest: already closed.
    expect(openStatus(WEEKDAYS, new Date('2026-10-02T16:30:00Z'))).toBe('Most zárva, hétfőn 08:00-kor nyit')
  })
  it('says nothing without hours', () => {
    expect(openStatus([])).toBe('')
  })
})
