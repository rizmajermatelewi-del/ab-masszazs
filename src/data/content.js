/* Editorial content, separate from BUSINESS facts on purpose.
   ────────────────────────────────────────────────────────────────────────────
   business.js holds things that are TRUE OR FALSE about the salon: the address,
   the phone number, the opening hours. This file holds things that are WRITTEN:
   headlines, the story, the steps of a visit, the questions people actually ask.

   Both are empty by default and for the same reason. An address cannot be
   guessed; neither can "how a treatment goes at AB Masszázs", because that is a
   claim about her practice and only she knows it. A generated
   "megérkezés / ráhangolódás / feltöltődve távozol" sequence is exactly the
   template tell this project exists to avoid -- it reads plausible, and it is
   fiction.

   Every section below removes itself while its content is empty, so the page is
   short and honest rather than long and padded. Filling any of these is a data
   edit; no layout work is needed.

   WHAT SHE NEEDS TO SUPPLY — hand her this list:
     1. HERO.headline     one short line, her words
     2. ABOUT.text        who she is, how she works
     3. EXPERIENCE_STEPS  what actually happens during a visit
     4. EDITORIAL.quote   one sentence worth setting large
     5. GALLERY           her own photographs
     6. USP               what genuinely sets her apart
     7. TESTIMONIALS      real reviews only, with permission
     8. GIFT_CARD.enabled only if she actually sells vouchers
     9. FAQ               the questions she is really asked

   Amíg demo.js DEMO === true, mind a kilencet kitalált tartalom helyettesíti,
   hogy a kész oldal látható legyen — és a build ilyenkor szándékosan elhasal.
   Lásd demo.js fejlécét. */
import { DEMO, DEMO_CONTENT } from './demo.js'

/* Egyetlen kapu mind a kilenc export előtt: a demó felülírás így egy helyen
   van, nem kilencszer bemásolva. */
const pick = (key, real) => (DEMO ? DEMO_CONTENT[key] : real)

/* The one line under the name. Not a slogan -- something she would say.
   Deliberately NOT auto-filled from a template like "Adj időt magadnak":
   the hero is the first thing a stranger reads, and borrowed words there are
   the fastest way to sound like every other salon page. */
export const HERO = pick('HERO', {
  headline: '',
  /* Optional: a photograph for the hero. Empty renders a labelled frame. */
  image: '',
  imageAlt: '',
})

export const ABOUT = pick('ABOUT', {
  /* Her own words about her practice. Never a generated
     "passionate about wellness" paragraph -- see the module header. */
  text: '',
  image: '',
  imageAlt: '',
})

/* The steps of a visit, e.g.
     { title: 'Megérkezés', text: 'Rövid mondat arról, mi történik.' }
   Numbering is generated from the array index, so reordering is safe. */
export const EXPERIENCE_STEPS = pick('EXPERIENCE_STEPS', [])

/* One sentence set at display size over a full-bleed photograph. */
export const EDITORIAL = pick('EDITORIAL', {
  quote: '',
  image: '',
  imageAlt: '',
})

/* Her own photographs, e.g.
     { src: '/images/kezelo-01.webp', alt: 'A kezelőszoba ablak felőli sarka' }
   alt is required on every entry and is checked by the test: a gallery of
   unlabelled images is unusable with a screen reader. */
export const GALLERY = pick('GALLERY', [])

/* What genuinely distinguishes her, e.g.
     { title: 'Egy vendég egy időben', text: 'Rövid, ellenőrizhető állítás.' }
   Only claims she can stand behind. No superlatives, no health promises. */
export const USP = pick('USP', [])

/* Real reviews only, published with permission, e.g.
     { quote: '...', name: 'Kata' }
   Inventing these is fraud, not decoration, so the array stays empty until
   real ones exist and the section stays hidden. */
export const TESTIMONIALS = pick('TESTIMONIALS', [])

/* Vouchers, only if she actually sells them. `enabled` false keeps the whole
   section out of the page and out of the navigation. */
export const GIFT_CARD = pick('GIFT_CARD', {
  enabled: false,
  text: '',
})

/* The questions she is really asked, e.g. { q: '...', a: '...' }.
   "Kell-e törölközőt hoznom" beats any invented question. */
export const FAQ = pick('FAQ', [])
