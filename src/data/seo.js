import { BUSINESS } from './business.js'
import { SERVICES } from './services.js'

/* Everything a crawler reads, derived from the two data modules rather than
   written out a second time. The failure this prevents is the one that costs a
   local business real money: a listing showing an old address or last year's
   opening hours while the page shows the right ones.

   HealthAndBeautyBusiness rather than the generic LocalBusiness: it is the type
   Google documents for salons, and the more specific type is what earns the
   richer treatment in local results. */
export const ROUTES = ['/', '/adatvedelem']

/* schema.org wants English day names; the page shows Hungarian ones. This map
   is the only place the two meet. */
const DAY_NAMES = {
  Hétfő: 'Monday',
  Kedd: 'Tuesday',
  Szerda: 'Wednesday',
  Csütörtök: 'Thursday',
  Péntek: 'Friday',
  Szombat: 'Saturday',
  Vasárnap: 'Sunday',
}

export function buildLocalBusinessJsonLd(origin) {
  /* No address means no listing. A LocalBusiness entry without a location is
     not a weaker listing, it is an invalid one, and publishing invalid
     structured data is worse than publishing none. */
  if (!BUSINESS.street || !BUSINESS.city) return null

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    '@id': `${origin}/#business`,
    name: BUSINESS.name,
    url: `${origin}/`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      postalCode: BUSINESS.postalCode,
      addressCountry: 'HU',
    },
    openingHoursSpecification: BUSINESS.hours.map(({ day, opens, closes }) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAY_NAMES[day] ?? day,
      opens,
      closes,
    })),
  }

  if (BUSINESS.phone) ld.telephone = BUSINESS.phone
  if (BUSINESS.email) ld.email = BUSINESS.email

  const sameAs = [BUSINESS.facebook, BUSINESS.instagram].filter(Boolean)
  if (sameAs.length) ld.sameAs = sameAs

  if (SERVICES.length) {
    ld.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Szolgáltatások',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name },
        price: String(s.price),
        priceCurrency: 'HUF',
      })),
    }
  }

  return ld
}

export function metaFor(route) {
  const name = BUSINESS.name || 'AB Masszázs'

  if (route === '/adatvedelem') {
    return {
      title: `Adatkezelési tájékoztató — ${name}`,
      description: 'Milyen adatokat kezel ez az oldal, és milyen célból.',
      index: false,
    }
  }

  return {
    title: `${name}${BUSINESS.city ? ` — ${BUSINESS.city}` : ''} — masszázs`,
    description:
      BUSINESS.tagline ||
      `Masszázs${BUSINESS.city ? ` ${BUSINESS.city}` : ''}. Szolgáltatások, árak, nyitvatartás és elérhetőség.`,
    index: true,
  }
}
