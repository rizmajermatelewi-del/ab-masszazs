/* Every fact about the salon, in one place, because several of them are shown
   on the page AND published as JSON-LD AND used in the <title>. The portfolio
   this was built after was bitten repeatedly by one fact living in several
   files until the copies drifted; here a drifted copy would be a wrong address
   on a business listing.

   Empty strings are the honest default. Nothing here may be guessed: every
   value comes from her directly (spec §9). Sections omit themselves when their
   fields are empty, and scripts/check-content.mjs refuses to build while
   missingFacts() is non-empty.

   Amíg demo.js DEMO === true, ezek helyett kitalált adatok kerülnek az oldalra
   és a build szándékosan elhasal. Lásd demo.js fejlécét. */
import { DEMO, DEMO_BUSINESS } from './demo.js'

/* Cím, telefon, nyitvatartás: a Google Cégprofiljáról (2026-09-28). */
const REAL = {
  name: 'AB Masszázs',
  legalName: 'Apostol Brigitta',
  tagline: 'Svédmasszázs, Yumeiho terápia és talpreflexológia Inárcson, csendes, klimatizált kezelőszobában.',
  street: 'Május 1. utca 12.',
  city: 'Inárcs',
  postalCode: '2365',
  phone: '+36 30 635 7807',
  email: '',
  facebook: 'https://www.facebook.com/brigitta.apostol.9',
  /* Her Facebook is where clients already write to her, so a Messenger link
     is a real second booking channel, not decoration. */
  messenger: 'https://m.me/brigitta.apostol.9',
  instagram: '',
  /* A plain link to Google Maps, not an embedded iframe: an embed sets
     third-party cookies, which would drag a consent banner onto a site that
     otherwise needs none (spec §7). */
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=AB+Massz%C3%A1zs+In%C3%A1rcs',
  /* The tárhelyszolgáltató, named in the adatvédelmi tájékoztató because it is
     a processor: it sees the request logs. Empty until the host is actually
     chosen (spec §3 leaves it between Cloudflare Pages and Netlify), and the
     privacy page says nothing about hosting until it is filled. */
  hostingProvider: 'Netlify, Inc. (512 2nd Street, Suite 200, San Francisco, CA 94107, USA)',
  hours: [
    { day: 'Hétfő', opens: '08:00', closes: '18:00' },
    { day: 'Kedd', opens: '08:00', closes: '18:00' },
    { day: 'Szerda', opens: '08:00', closes: '18:00' },
    { day: 'Csütörtök', opens: '08:00', closes: '18:00' },
    { day: 'Péntek', opens: '08:00', closes: '18:00' },
  ],
}

export const BUSINESS = DEMO ? DEMO_BUSINESS : REAL

/* The facts a launch cannot proceed without. Kept next to the data rather than
   in the build script, so the rule lives with what it describes.

   legalName is here because spec §9 lists it: it goes in the footer and in the
   adatvédelmi tájékoztató, which has to name the actual data controller. */
const REQUIRED = [
  'name',
  'legalName',
  'city',
  'street',
  'postalCode',
  'phone',
  'hostingProvider',
]

export function missingFacts() {
  const missing = REQUIRED.filter((key) => !BUSINESS[key].trim())
  if (!BUSINESS.hours.length) missing.push('hours')
  return missing
}
