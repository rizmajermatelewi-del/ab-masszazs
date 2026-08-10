import { describe, it, expect, vi } from 'vitest'
import { buildLocalBusinessJsonLd, ROUTES } from './seo'
import { BUSINESS } from './business'

/* The schema is generated from the same module the page renders, for the same
   reason the price list is: a business listing that disagrees with the page
   about the address or the opening hours is worse than no listing. */
const FILLED = {
  name: 'AB Masszázs', legalName: 'AB Masszázs', tagline: '', street: 'Fő utca 1.',
  city: 'Inárcs', postalCode: '2365', phone: '+36 30 123 4567', email: '',
  facebook: '', instagram: '', mapsUrl: '',
  hours: [{ day: 'Hétfő', opens: '09:00', closes: '18:00' }],
}

describe('structured data', () => {
  it('lists exactly the routes the app answers', () => {
    expect(ROUTES).toEqual(['/', '/adatvedelem'])
  })

  it('refuses to emit a listing without an address', () => {
    if (!BUSINESS.street) {
      expect(buildLocalBusinessJsonLd('https://example.pages.dev')).toBe(null)
    }
  })

  it('emits a valid listing once the facts are there', async () => {
    vi.resetModules()
    vi.doMock('./business', () => ({ BUSINESS: FILLED, missingFacts: () => [] }))
    vi.doMock('./services', () => ({
      SERVICES: [{ id: 'a', name: 'Svédmasszázs', minutes: 60, price: 9000, desc: '' }],
    }))
    const { buildLocalBusinessJsonLd: build } = await import('./seo')
    const ld = build('https://example.pages.dev')

    expect(ld['@type']).toBe('HealthAndBeautyBusiness')
    expect(ld.address.streetAddress).toBe('Fő utca 1.')
    expect(ld.address.addressLocality).toBe('Inárcs')
    expect(ld.address.addressCountry).toBe('HU')
    expect(ld.telephone).toBe('+36 30 123 4567')
    expect(ld.openingHoursSpecification[0].dayOfWeek).toBe('Monday')
    expect(ld.openingHoursSpecification[0].opens).toBe('09:00')
    expect(ld.hasOfferCatalog.itemListElement[0].priceCurrency).toBe('HUF')
    expect(JSON.stringify(ld)).not.toContain('undefined')
  })

  it('puts the town in the home title and keeps the tájékoztató out of search', async () => {
    vi.resetModules()
    vi.doMock('./business', () => ({ BUSINESS: FILLED, missingFacts: () => [] }))
    vi.doMock('./services', () => ({ SERVICES: [] }))
    const { metaFor } = await import('./seo')
    expect(metaFor('/').title).toContain('Inárcs')
    expect(metaFor('/').index).toBe(true)
    expect(metaFor('/adatvedelem').title).toContain('Adatkezelési')
    expect(metaFor('/adatvedelem').index).toBe(false)
  })
})
