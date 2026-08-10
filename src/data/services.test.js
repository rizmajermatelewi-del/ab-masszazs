import { describe, it, expect } from 'vitest'
import { SERVICES } from './services'

/* An invented price is the one unrecoverable mistake here: a client would quote
   it back to her. So the guard covers shape and internal sanity only, and
   emptiness stays legal until launch. */
describe('service list', () => {
  it('is a list', () => {
    expect(Array.isArray(SERVICES)).toBe(true)
  })

  it('gives every service a unique id, a duration and a price', () => {
    const ids = new Set()
    for (const s of SERVICES) {
      expect(s.id, 'every service needs a stable id').toMatch(/^[a-z0-9-]+$/)
      expect(ids.has(s.id), `duplicate service id: ${s.id}`).toBe(false)
      ids.add(s.id)
      expect(s.name.trim().length).toBeGreaterThan(0)
      expect(Number.isInteger(s.minutes)).toBe(true)
      expect(s.minutes).toBeGreaterThan(0)
      expect(Number.isInteger(s.price)).toBe(true)
      expect(s.price).toBeGreaterThan(0)
    }
  })
})
