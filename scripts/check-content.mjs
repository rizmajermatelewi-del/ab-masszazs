import { missingFacts } from '../src/data/business.js'
import { SERVICES } from '../src/data/services.js'

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
