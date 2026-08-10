import { describe, it, expect } from 'vitest'
import { BUSINESS, missingFacts } from './business'

/* These fields cannot be invented — spec §9. The tests do not assert that they
   are filled, because an unfinished repo must still be green; they assert the
   SHAPE is right and that missingFacts() tells the truth about what is absent.
   The build guard in Task 3 is what actually blocks a launch. */
describe('business facts', () => {
  it('exposes every field the page and the schema need', () => {
    for (const key of [
      'name', 'legalName', 'tagline', 'street', 'city', 'postalCode',
      'phone', 'email', 'facebook', 'instagram', 'mapsUrl',
    ]) {
      expect(typeof BUSINESS[key], `BUSINESS.${key} must be a string`).toBe('string')
    }
    expect(Array.isArray(BUSINESS.hours)).toBe(true)
  })

  it('states opening hours as 24-hour strings when present', () => {
    for (const { day, opens, closes } of BUSINESS.hours) {
      expect(day.trim().length).toBeGreaterThan(0)
      expect(opens).toMatch(/^\d{2}:\d{2}$/)
      expect(closes).toMatch(/^\d{2}:\d{2}$/)
      expect(closes > opens, `${day} closes before it opens`).toBe(true)
    }
  })

  it('names each missing launch-blocking fact', () => {
    const missing = missingFacts()
    expect(Array.isArray(missing)).toBe(true)
    for (const item of missing) expect(typeof item).toBe('string')
    if (!BUSINESS.city) expect(missing.join(' ')).toContain('city')
  })
})
