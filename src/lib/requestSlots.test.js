import { describe, it, expect } from 'vitest'
import { openDays, timesFor } from './requestSlots'

const WEEK = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'].map((day) => ({ day, opens: '08:00', closes: '18:00' }))

describe('openDays', () => {
  it('starts tomorrow and skips the weekend (Budapest dates)', () => {
    // Friday 2026-10-02, 23:30 in Budapest (21:30 UTC): tomorrow is Saturday.
    const days = openDays(WEEK, new Date('2026-10-02T21:30:00Z'), 3)
    expect(days.map((d) => d.iso)).toEqual(['2026-10-05', '2026-10-06', '2026-10-07'])
    expect(days[0].weekday).toBe('Hétfő')
  })
})

describe('timesFor', () => {
  it('offers whole hours that still end by closing', () => {
    const day = { opens: '08:00', closes: '18:00' }
    expect(timesFor(day, 60).at(-1)).toBe('17:00')
    expect(timesFor(day, 90).at(-1)).toBe('16:00')
    expect(timesFor(day, 45)[0]).toBe('08:00')
    expect(timesFor(null, 60)).toEqual([])
  })
})
