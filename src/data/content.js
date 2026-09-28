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
import { BUSINESS } from './business.js'
import { SERVICES } from './services.js'
import { VOUCHER_MONTHS } from '../server/message.js'
import { formatDuration } from '../lib/format.js'

/* Egyetlen kapu mind a kilenc export előtt: a demó felülírás így egy helyen
   van, nem kilencszer bemásolva. */
const pick = (key, real) => (DEMO ? DEMO_CONTENT[key] : real)

/* The one line under the name. Not a slogan -- something she would say.
   Deliberately NOT auto-filled from a template like "Adj időt magadnak":
   the hero is the first thing a stranger reads, and borrowed words there are
   the fastest way to sound like every other salon page. */
/* ─── KITÖLTŐ TARTALOM (Máté, 2026-09-28: „filler dolgok is lehetnek") ───
   The hero photo, ABOUT, EXPERIENCE_STEPS, GALLERY and the treatment photos
   in services.js are FILLER until Brigitta replaces them: free Unsplash
   photos stored in public/img (not hotlinked, so no third party sees the
   visitor), alt texts that say "Illusztráció", and short texts she should
   read and rewrite in her own words. Nothing here is a review, a number or
   a qualification: those are never filled in. */
export const HERO = pick('HERO', {
  headline: '',
  image: '/img/hero-gyertya.webp',
  imageAlt: 'Illusztráció: összetekert törölköző, gyertya és rózsaszín tulipán',
})

export const ABOUT = pick('ABOUT', {
  // FILLER (generated, Máté 2026-09-28: "majd max átírjuk"). Brigitta rewrites it.
  text:
    'Apostol Brigitta vagyok. Inárcson, egy csendes, klimatizált kezelőszobában várlak svédmasszázzsal, Yumeiho terápiával és talpreflexológiával.\n\n' +
    'Hiszek abban, hogy egy jó masszázs nem csak az izmoknak szól: egy óra, amikor nem kell sehova sietni, és valaki csak rád figyel. Minden kezelés egy rövid beszélgetéssel kezdődik, elmondod, hol érzed a feszültséget, és ahhoz igazítom a mozdulatokat.\n\n' +
    'A célom egyszerű: hogy könnyebben, nyugodtabban menj haza, mint ahogy jöttél, és szívesen gyere vissza.',
  image: '/img/rolam-szoba.webp',
  imageAlt: 'Illusztráció: világos kezelőszoba masszázságyal és orchideával',
})

/* FILLER: how a first visit goes. Numbering comes from the array index. */
export const EXPERIENCE_STEPS = pick('EXPERIENCE_STEPS', [
  { title: 'Megérkezés', text: 'Leveszed a kabátod, iszol egy pohár vizet, és nem kell sietni sehova.' },
  { title: 'Rövid beszélgetés', text: 'Elmondod, hol érzed a feszültséget, és mire vágysz: így tudom, mire figyeljek.' },
  { title: 'A kezelés', text: 'A választott masszázs, a te tempódhoz igazítva. Szólj bátran, ha valami túl erős.' },
  { title: 'Pihenő', text: 'Pár perc csend a végén, mielőtt felkelsz. Utána egy pohár víz, és indulhatsz.' },
])

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
export const GALLERY = pick('GALLERY', [
  { src: '/img/galeria-olaj.webp', alt: 'Illusztráció: masszázsolaj a háton' },
  { src: '/img/galeria-kovek.webp', alt: 'Illusztráció: egymásra rakott fehér kövek' },
  { src: '/img/galeria-talp.webp', alt: 'Illusztráció: talpreflexológiás kezelés' },
  { src: '/img/galeria-csepp.webp', alt: 'Illusztráció: olajcsepp egy üvegcséből a tenyérbe' },
  { src: '/img/galeria-moha.webp', alt: 'Illusztráció: kőrakás mohás sziklán' },
  { src: '/img/galeria-fej.webp', alt: 'Illusztráció: arc- és fejmasszázs' },
])

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
   section out of the page and out of the navigation. She does: request
   online, pay and collect in person (Máté, 2026-09-28). The form lives in
   sections/GiftCard.jsx. */
export const GIFT_CARD = pick('GIFT_CARD', {
  enabled: true,
  text: '',
})

/* Parking, payment and the 24-hour cancellation request are Máté's answers
   (2026-09-28); the facts are built from business.js / services.js, so a
   changed phone number or price cannot leave a stale copy here. The last
   three answers are generated FILLER for Brigitta to confirm or rewrite. */
const weekHours = () => {
  const [first, ...rest] = BUSINESS.hours
  if (!first || rest.some((h) => h.opens !== first.opens || h.closes !== first.closes)) return ''
  return ` Hétfőtől péntekig ${first.opens} és ${first.closes} között dolgozom.`
}
const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1)

export const FAQ = pick('FAQ', [
  {
    q: 'Hogyan tudok időpontot kérni?',
    a: `Hívj a ${BUSINESS.phone} számon, írj Messengeren, vagy hagyd meg a számod a visszahívás-kérő űrlapon, és visszahívlak.${weekHours()}`,
  },
  {
    q: 'Miben különbözik a három kezelés?',
    a:
      SERVICES.map((s) => `${s.name} (${formatDuration(s.minutes)}): ${lower(s.desc)}`).join(' ') +
      ' Ha nem tudod eldönteni, a „Melyik masszázs illik hozzád?” résznél segítek választani.',
  },
  {
    q: 'Hol vagy pontosan, és hol tudok parkolni?',
    a: `${BUSINESS.postalCode} ${BUSINESS.city}, ${BUSINESS.street} Az utcán ingyen tudsz parkolni.`,
  },
  { q: 'Hogyan fizethetek?', a: 'Készpénzzel, bankkártyával vagy átutalással.' },
  {
    q: 'Mi van, ha mégsem tudok menni?',
    a: 'Kérlek, legalább 24 órával előtte szólj telefonon vagy Messengeren, hogy másnak oda tudjam adni az időpontot.',
  },
  {
    q: 'Adhatok ajándékba kezelést?',
    a: `Igen. Az ajándékutalvány egy választott kezelésre szól, és a kiállítástól számított ${VOUCHER_MONTHS} hónapig érvényes. Online kérheted, a fizetés és az átvétel személyesen történik.`,
  },
  { q: 'Milyen a kezelőszoba?', a: 'Csendes, klimatizált helyiségben dolgozom.' },
  // FILLER answers below (generated, Máté 2026-09-28): Brigitta confirms or rewrites.
  {
    q: 'Mit hozzak magammal?',
    a: 'Semmi különlegeset: kényelmes ruhában gyere. Törölközőt, lepedőt és olajat én biztosítok.',
  },
  { q: 'Férfiakat is fogadsz?', a: 'Igen, nőket és férfiakat egyaránt szívesen várok.' },
  {
    q: 'Mennyivel előtte érkezzek?',
    a: 'Elég pár perccel a megbeszélt időpont előtt, hogy nyugodtan átöltözhess, és ne kapkodva kezdjünk.',
  },
])
