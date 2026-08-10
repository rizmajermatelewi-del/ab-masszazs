import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
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
  /* Reading routes.jsx rather than restating its paths here. Repeating the list
     would only prove this file agrees with itself; the drift that costs
     something is a route added to the app and forgotten here, which ships that
     page to crawlers as an empty <div id="root"> on a site whose whole job is
     being found. */
  it('lists exactly the routes the app answers', () => {
    /* resolve() from the project root, not import.meta.url: vitest serves test
       modules over http, so import.meta.url is not a file: URL here. */
    const source = readFileSync(resolve(process.cwd(), 'src/routes.jsx'), 'utf8')
    const declared = [...source.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1])
    expect(declared.length).toBeGreaterThan(0)
    expect([...ROUTES].sort()).toEqual([...declared].sort())
  })

  it('refuses to publish a day name schema.org does not know', async () => {
    vi.resetModules()
    vi.doMock('./business', () => ({
      BUSINESS: { ...FILLED, hours: [{ day: 'Hétfő–Péntek', opens: '09:00', closes: '18:00' }] },
      missingFacts: () => [],
    }))
    vi.doMock('./services', () => ({ SERVICES: [] }))
    const { buildLocalBusinessJsonLd: build } = await import('./seo')
    expect(() => build('https://example.pages.dev')).toThrow(/Hétfő–Péntek/)
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
