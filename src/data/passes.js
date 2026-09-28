/* Bérlet (pass). FILLER numbers (Máté, 2026-09-28: filler is fine for now):
   Brigitta sets the real sizes and discount. The price is rounded to the
   nearest 100 Ft so it reads like a price, not a calculation. */
export const PASSES = { sizes: [5, 10], discountPct: { 5: 10, 10: 15 } }

export function passPrice(unitPrice, size, passes = PASSES) {
  const full = unitPrice * size
  const price = Math.round((full * (100 - (passes.discountPct[size] ?? 0))) / 100 / 100) * 100
  return { full, price, saving: full - price }
}
