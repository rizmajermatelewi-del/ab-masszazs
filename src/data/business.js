/* Every fact about the salon, in one place, because several of them are shown
   on the page AND published as JSON-LD AND used in the <title>. The portfolio
   this was built after was bitten repeatedly by one fact living in several
   files until the copies drifted; here a drifted copy would be a wrong address
   on a business listing.

   Empty strings are the honest default. Nothing here may be guessed: every
   value comes from her directly (spec §9). Sections omit themselves when their
   fields are empty, and scripts/check-content.mjs refuses to build while
   missingFacts() is non-empty. */
export const BUSINESS = {
  name: '',
  legalName: '',
  tagline: '',
  street: '',
  city: '',
  postalCode: '',
  phone: '',
  email: '',
  facebook: '',
  instagram: '',
  /* A plain link to Google Maps, not an embedded iframe: an embed sets
     third-party cookies, which would drag a consent banner onto a site that
     otherwise needs none (spec §7). */
  mapsUrl: '',
  /* The tárhelyszolgáltató, named in the adatvédelmi tájékoztató because it is
     a processor: it sees the request logs. Empty until the host is actually
     chosen (spec §3 leaves it between Cloudflare Pages and Netlify), and the
     privacy page says nothing about hosting until it is filled. */
  hostingProvider: '',
  /* e.g. { day: 'Hétfő', opens: '09:00', closes: '18:00' } */
  hours: [],
}

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
