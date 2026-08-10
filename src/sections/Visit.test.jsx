import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

const EMPTY = {
  name: '', legalName: '', tagline: '', street: '', city: '', postalCode: '',
  phone: '', email: '', facebook: '', instagram: '', mapsUrl: '', hours: [],
}

describe('Visit', () => {
  it('omits the address block when there is no address', async () => {
    vi.resetModules()
    vi.doMock('../data/business', () => ({ BUSINESS: EMPTY, missingFacts: () => [] }))
    const { default: Visit } = await import('./Visit.jsx')
    render(<Visit />)
    expect(screen.queryByText('Cím')).toBe(null)
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
