import { missingFacts } from '../src/data/business.js'
import { SERVICES } from '../src/data/services.js'
import { DEMO } from '../src/data/demo.js'

/* The demo gate runs first and alone. Everything below it checks whether enough
   REAL facts have arrived; this checks the opposite -- whether FAKE ones are
   still in place -- and while they are, every check below would pass and wave a
   page full of invented prices through onto a live domain.

   Deliberately not a warning. A warning is a thing you scroll past. */
if (DEMO) {
  console.error('\nDEMO MODE — ez az oldal nem építhető ki élesbe.\n')
  console.error('  A src/data/demo.js kitalált telefonszámot, címet, árakat,')
  console.error('  nyitvatartást és vendégvéleményeket tesz az oldalra, plusz')
  console.error('  idegen Unsplash-fotókat. Egy valódi vállalkozásról.\n')
  console.error('  Kiadás előtt: src/data/demo.js -> DEMO = false, és a valódi')
  console.error('  adatok be a business.js / services.js / content.js fájlokba.\n')
  process.exit(1)
}

/* Runs first in `npm run build`. It exists because the honest choice — ship
   nothing invented — has a failure mode of its own: a live site with empty
   sections because an answer never came back. This makes that a loud build
   failure instead.

   It deliberately does not run in `npm run dev`: building the layout against
   empty data is exactly what Tasks 4-6 do. */
const missing = [...missingFacts()]
if (!SERVICES.length) missing.push('services (the price list)')

if (missing.length) {
  console.error('\nThis site cannot be built for launch yet. Still missing:\n')
  for (const item of missing) console.error(`  - ${item}`)
  console.error('\nThese come from the salon owner and must not be invented.')
  console.error('See §9 of the design spec.\n')
  process.exit(1)
}

console.log(`content check: ${SERVICES.length} services, all business facts present`)
