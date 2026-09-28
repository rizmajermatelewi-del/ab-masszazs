import { describe, it, expect } from 'vitest'
import { buildIcs, googleCalendarUrl } from './ics'

const ev = { date: '2026-10-06', time: '10:00', minutes: 60, title: 'Svédmasszázs, AB Masszázs', location: '2365 Inárcs, Május 1. utca 12.', description: 'Még megerősítésre vár.' }

describe('calendar export', () => {
  it('writes the Budapest time as UTC (10:00 CEST = 08:00Z) and escapes commas', () => {
    const ics = buildIcs(ev)
    expect(ics).toContain('DTSTART:20261006T080000Z')
    expect(ics).toContain('DTEND:20261006T090000Z')
    expect(ics).toContain('SUMMARY:Svédmasszázs\\, AB Masszázs')
  })
  it('builds a Google Calendar link with the same times', () => {
    expect(googleCalendarUrl(ev)).toContain('dates=20261006T080000Z%2F20261006T090000Z')
  })
})
