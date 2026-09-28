import { describe, it, expect } from 'vitest'
import { announcementActive } from './announcement'

const A = { text: 'x', until: '2026-12-24' }

describe('announcementActive', () => {
  it('shows through the last day, in Budapest time', () => {
    expect(announcementActive(A, new Date('2026-12-24T22:30:00Z'))).toBe(true) // 23:30 Budapest
    expect(announcementActive(A, new Date('2026-12-24T23:30:00Z'))).toBe(false) // 00:30 on the 25th
  })
  it('hides with no text, and never expires without a date', () => {
    expect(announcementActive({ text: '' })).toBe(false)
    expect(announcementActive({ text: 'x' })).toBe(true)
  })
})
