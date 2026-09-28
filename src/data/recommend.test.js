import { describe, it, expect } from 'vitest'
import { recommend } from './recommend'

const S = [{ id: 'svedmasszazs' }, { id: 'yumeiho' }, { id: 'talpreflexologia' }]

describe('recommend', () => {
  it('waits for a choice', () => {
    expect(recommend([], null, S)).toBe(null)
  })
  it('follows the strongest signal', () => {
    expect(recommend(['talp'], null, S)).toBe('talpreflexologia')
    expect(recommend(['derek'], 'ules', S)).toBe('yumeiho')
    expect(recommend(['nyak'], 'lazitas', S)).toBe('svedmasszazs')
  })
  it('breaks a tie in menu order', () => {
    // hát: svéd 2, yumeiho 2
    expect(recommend(['hat'], null, S)).toBe('svedmasszazs')
  })
  it('ignores treatments that are not on the menu', () => {
    expect(recommend(['talp'], null, [{ id: 'svedmasszazs' }])).toBe(null)
  })
})
