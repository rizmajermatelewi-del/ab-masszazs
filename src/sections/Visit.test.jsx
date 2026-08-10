import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

const EMPTY = {
  name: '', legalName: '', tagline: '', street: '', city: '', postalCode: '',
  phone: '', email: '', facebook: '', instagram: '', mapsUrl: '', hours: [],
}

describe('Visit', () => {
  /* Not just "no heading": the whole section has to go. Its wrapper carries a
     tinted background and 128px of vertical padding, so leaving it behind paints
     an empty stripe that reads as a half-finished page (spec §5). */
  it('disappears entirely when it has no address, hours or phone', async () => {
    vi.resetModules()
    vi.doMock('../data/business', () => ({ BUSINESS: EMPTY, missingFacts: () => [] }))
    const { default: Visit } = await import('./Visit.jsx')
    const { container } = render(<Visit />)
    expect(screen.queryByText('Cím')).toBe(null)
    expect(container.firstChild).toBe(null)
  })

  it('shows the address, the hours and a dialable phone number when present', async () => {
    vi.resetModules()
    vi.doMock('../data/business', () => ({
      BUSINESS: {
        ...EMPTY,
        street: 'Fő utca 1.',
        city: 'Inárcs',
        postalCode: '2365',
        phone: '+36 30 123 4567',
        hours: [{ day: 'Hétfő', opens: '09:00', closes: '18:00' }],
      },
      missingFacts: () => [],
    }))
    const { default: Visit } = await import('./Visit.jsx')
    render(<Visit />)
    expect(screen.getByText(/Fő utca 1\./)).toBeTruthy()
    expect(screen.getByText('Hétfő')).toBeTruthy()
    expect(screen.getByText('09:00 – 18:00')).toBeTruthy()
    expect(screen.getByRole('link', { name: /123 4567/ }).getAttribute('href')).toBe('tel:+36301234567')
  })
})
