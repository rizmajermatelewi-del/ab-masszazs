import { BUSINESS } from './business.js'
import { SERVICES } from './services.js'
import { BOOKING_ONLINE } from './booking.js'
import { DEMO } from './demo.js'

/* Everything a crawler reads, derived from the two data modules rather than
   written out a second time. The failure this prevents is the one that costs a
   local business real money: a listing showing an old address or last year's
   opening hours while the page shows the right ones.

   HealthAndBeautyBusiness rather than the generic LocalBusiness: it is the type
   Google documents for salons, and the more specific type is what earns the
   richer treatment in local results. */
export const ROUTES = ['/', '/adatvedelem', '/foglalas']

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

/* Throws rather than passing the Hungarian through. "Hétfő–Péntek" is the most
   natural way for her to write her hours, and it is not a schema.org DayOfWeek —
   but nothing on the page would look wrong, so a fallthrough would publish
   invalid structured data that no human ever sees. Same rule as the address
   guard below: no listing beats a wrong listing. If she gives a range, it gets
   expanded into individual days in business.js, which is where the display text
   comes from too. */
function dayOfWeek(day) {
  const mapped = DAY_NAMES[day]
  if (!mapped) {
    throw new Error(
      `Unknown day name in BUSINESS.hours: ${JSON.stringify(day)}. ` +
        `Use one weekday per entry, spelled: ${Object.keys(DAY_NAMES).join(', ')}.`,
    )
  }
  return mapped
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
      dayOfWeek: dayOfWeek(day),
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

  /* Linked from Facebook, Instagram and the Google profile (spec §5), so
     it is indexed once it takes bookings, and not while it only says to
     phone. */
  if (route === '/foglalas') {
    return {
      title: `Időpontfoglalás — ${name}`,
      description: `Foglalj időpontot online${BUSINESS.city ? ` ${BUSINESS.city} környékén` : ''}: kezelés, nap, időpont, és kész.`,
      index: BOOKING_ONLINE && !DEMO,
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
