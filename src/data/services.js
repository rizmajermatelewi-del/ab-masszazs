/* Her price list. Empty until she gives it — spec §9 makes this a hard blocker,
   and an invented price is worse than a missing one because a client will quote
   it back to her.

   `minutes` and `price` are integers, not strings: Phase 2's booking does
   arithmetic on the duration, and the price is formatted for display in one
   place rather than baked into the data.

   Shape:
     { id: 'svedmasszazs-60', name: 'Svédmasszázs', minutes: 60,
       price: 9000, desc: 'Egy mondat arról, kinek való.' }

   Amíg demo.js DEMO === true, kitalált árak jelennek meg helyette és a build
   elhasal. Lásd demo.js fejlécét. */
import { DEMO, DEMO_SERVICES } from './demo.js'

/* Nevek és leírások a szórólapjáról (Google Cégprofil, 2026-09-28).
   ponytail: az idők és árak ALAPÉRTÉKEK, Máté kérésére (2026-09-28: „ár mindegy
   most legyen alap, majd változtatunk"). Brigittával egyeztetni és átírni. */
const REAL = [
  {
    id: 'svedmasszazs',
    name: 'Svédmasszázs',
    minutes: 60,
    price: 9000,
    desc: 'Frissülés, ellazulás, teljes testi-lelki kikapcsolódás.',
    image: '/img/kezeles-sved.webp', // FILLER photo
    imageAlt: 'Illusztráció: kezek masszírozzák a hátat',
  },
  {
    id: 'yumeiho',
    name: 'Yumeiho terápia',
    minutes: 60,
    price: 10000,
    desc: 'Harmonizálás, energiaáramlás, test és lélek egyensúlya.',
    image: '/img/kezeles-yumeiho.webp', // FILLER photo
    imageAlt: 'Illusztráció: tenyérrel nyomott izom a csípő táján',
  },
  {
    id: 'talpreflexologia',
    name: 'Talpreflexológia',
    minutes: 45,
    price: 7000,
    desc: 'Talpmasszázzsal a szervek működésének támogatásáért.',
    image: '/img/kezeles-talp.webp', // FILLER photo
    imageAlt: 'Illusztráció: talpmasszázs olajjal',
  },
]

export const SERVICES = DEMO ? DEMO_SERVICES : REAL
