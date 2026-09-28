import { describe, it, expect } from 'vitest'
import { passPrice } from './passes'

describe('passPrice', () => {
  it('discounts and rounds to 100 Ft', () => {
    expect(passPrice(9000, 5)).toEqual({ full: 45000, price: 40500, saving: 4500 })
    expect(passPrice(7000, 10)).toEqual({ full: 70000, price: 59500, saving: 10500 })
  })
})
