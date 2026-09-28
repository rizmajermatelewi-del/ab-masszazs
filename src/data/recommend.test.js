import { describe, it, expect } from 'vitest'
import { recommend, rank } from './recommend'

const S = [{ id: 'svedmasszazs' }, { id: 'yumeiho' }, { id: 'talpreflexologia' }]

describe('recommend', () => {
  it('waits for a choice', () => {
    expect(recommend([], null, S)).toBe(null)
  })
  it('follows the strongest signal', () => {
    expect(recommend(['talp'], null, S)).toBe('talpreflexologia')
    expect(recommend(['derek'], 'ules', S)).toBe('yumeiho')
    expect(recommend(['nyak'], 'lazitas', S)).toBe('svedmasszazs')
    expect(recommend(['csipo'], null, S)).toBe('yumeiho')
  })
  it('breaks a tie in menu order', () => {
    // hát: svéd 2, yumeiho 2
    expect(recommend(['hat'], null, S)).toBe('svedmasszazs')
  })
  it('ignores treatments that are not on the menu', () => {
    expect(recommend(['talp'], null, [{ id: 'svedmasszazs' }])).toBe(null)
  })
})

describe('rank', () => {
  it('gives every treatment a share that adds up to about 100', () => {
    const r = rank(['nyak', 'talp'], null, S) // svéd 3, yumeiho 1, talp 3
    expect(r.map((x) => x.id)).toEqual(['svedmasszazs', 'talpreflexologia', 'yumeiho'])
    expect(r.reduce((s, x) => s + x.pct, 0)).toBeGreaterThanOrEqual(99)
  })
})
