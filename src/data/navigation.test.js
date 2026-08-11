import { describe, it, expect, vi } from 'vitest'

const EMPTY_BUSINESS = {
  name: '', legalName: '', tagline: '', street: '', city: '', postalCode: '',
  phone: '', email: '', facebook: '', instagram: '', mapsUrl: '',
  hostingProvider: '', hours: [],
}

const EMPTY_CONTENT = {
  HERO: { headline: '', image: '', imageAlt: '' },
  ABOUT: { text: '', image: '', imageAlt: '' },
  EXPERIENCE_STEPS: [],
  EDITORIAL: { quote: '', image: '', imageAlt: '' },
  GALLERY: [],
  USP: [],
  TESTIMONIALS: [],
  GIFT_CARD: { enabled: false, text: '' },
  FAQ: [],
}

async function nav({ business = EMPTY_BUSINESS, services = [], content = {} }) {
  vi.resetModules()
  vi.doMock('./business.js', () => ({ BUSINESS: business, missingFacts: () => [] }))
  vi.doMock('./services.js', () => ({ SERVICES: services }))
  vi.doMock('./content.js', () => ({ ...EMPTY_CONTENT, ...content }))
  const { visibleSections } = await import('./navigation.js')
  return visibleSections()
}

/* The menu is derived rather than written down, and these tests are the reason
   the derivation is worth the indirection: a hand-kept menu drifts silently the
   first time a section empties out, and the visitor is the one who finds out. */
describe('navigation', () => {
  it('offers nothing while every section is empty', async () => {
    expect(await nav({})).toEqual([])
  })

  it('never links to a section that is not on the page', async () => {
    const items = await nav({
      services: [{ id: 'a', name: 'X', minutes: 60, price: 9000, desc: '' }],
    })
    expect(items.map((item) => item.id)).toEqual(['szolgaltatasok'])
  })

  it('lists a section as soon as its content arrives', async () => {
    const items = await nav({
      content: { FAQ: [{ q: 'Kérdés?', a: 'Válasz.' }] },
    })
    expect(items).toEqual([{ id: 'gyik', label: 'GYIK' }])
  })

  it('keeps the contact entry when any one of address, hours or phone exists', async () => {
    const withPhone = await nav({ business: { ...EMPTY_BUSINESS, phone: '+36 30 000 0000' } })
    expect(withPhone.map((item) => item.id)).toContain('elerhetoseg')

    const withHours = await nav({
      business: { ...EMPTY_BUSINESS, hours: [{ day: 'Hétfő', opens: '09:00', closes: '18:00' }] },
    })
    expect(withHours.map((item) => item.id)).toContain('elerhetoseg')
  })

  it('hides the voucher entry unless she actually sells them', async () => {
    const off = await nav({ content: { GIFT_CARD: { enabled: false, text: 'x' } } })
    expect(off.map((item) => item.id)).not.toContain('ajandek')

    const on = await nav({ content: { GIFT_CARD: { enabled: true, text: '' } } })
    expect(on.map((item) => item.id)).toContain('ajandek')
  })
})
