/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  DEMÓ TARTALOM — EGYETLEN SZAVA SEM IGAZ.                                 ║
   ║                                                                           ║
   ║  Ez a fájl kitalált adatokat tartalmaz egy VALÓDI vállalkozásról:          ║
   ║  telefonszámot, címet, árakat, nyitvatartást, vendégvéleményeket,          ║
   ║  és idegen fotókat az Unsplashről.                                        ║
   ║                                                                           ║
   ║  Azért létezik, hogy a tulajdonos lássa, hogyan néz ki a kész oldal,       ║
   ║  MIELŐTT megírja a saját szövegeit. Semmi másra.                          ║
   ║                                                                           ║
   ║  ÉLESBEN SOHA. A `npm run build` szándékosan elhasal, amíg a DEMO          ║
   ║  értéke true — lásd scripts/check-content.mjs. A böngészőben egy piros     ║
   ║  csík írja ki ugyanezt, hogy egy képernyőkép se legyen félreérthető.       ║
   ║                                                                           ║
   ║  KIADÁS ELŐTT: DEMO = false, és a valódi adatok mennek a                   ║
   ║  business.js / services.js / content.js fájlokba.                         ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */
export const DEMO = true

/* Külső fotók. Élesben nem maradhatnak: idegen kezelőszoba, idegen kezek.
   Az alt szövegek szándékosan bevallják, hogy demók — nem láttam ezeket a
   képeket, egy kitalált leírás pedig pont annak a képernyőolvasót használó
   vendégnek hazudna, akinek az alt az egyetlen forrása. */
const u = (id) => `https://images.unsplash.com/photo-${id}?w=1600&q=80&auto=format&fit=crop`
const ALT = 'Demó fotó — cserélendő a saját képére'

export const DEMO_BUSINESS = {
  name: 'AB Masszázs',
  legalName: 'DEMÓ Példa Anna e.v. (kitalált)',
  tagline: 'DEMÓ — nem valós szöveg',
  street: 'Demó utca 1. (kitalált cím)',
  city: 'Budapest',
  postalCode: '1000',
  /* Kiosztatlan számtartomány, hogy a demó véletlenül se csörgesse meg
     senki telefonját. */
  phone: '+36 30 000 0000',
  email: 'demo@example.com',
  facebook: '',
  instagram: 'https://www.instagram.com/abmasszazs/',
  mapsUrl: '',
  hostingProvider: 'DEMÓ Tárhely Kft. (kitalált)',
  hours: [
    { day: 'Hétfő', opens: '09:00', closes: '18:00' },
    { day: 'Kedd', opens: '09:00', closes: '18:00' },
    { day: 'Szerda', opens: '09:00', closes: '18:00' },
    { day: 'Csütörtök', opens: '09:00', closes: '18:00' },
    { day: 'Péntek', opens: '09:00', closes: '16:00' },
  ],
}

/* Kitalált árak. Ezt fogja a vendég visszaidézni a telefonban, ha kimegy
   élesbe — ezért hasal el rá a build. */
export const DEMO_SERVICES = [
  {
    id: 'demo-sved-60',
    name: 'Svédmasszázs',
    minutes: 60,
    price: 12000,
    desc: 'DEMÓ leírás. A valódi szöveget a masszőr írja, nem ez az oldal.',
  },
  {
    id: 'demo-frissito-45',
    name: 'Frissítő hátmasszázs',
    minutes: 45,
    price: 9000,
    desc: 'DEMÓ leírás. Csak azért van itt, hogy a tördelés látszódjon.',
  },
  {
    id: 'demo-mely-90',
    name: 'Mélyszöveti masszázs',
    minutes: 90,
    price: 18000,
    desc: 'DEMÓ leírás. Kitalált időtartam, kitalált ár.',
  },
  {
    id: 'demo-aroma-60',
    name: 'Aromaterápiás masszázs',
    minutes: 60,
    price: 13500,
    desc: 'DEMÓ leírás. A kezelés nevét is a masszőr hagyja jóvá.',
  },
]

export const DEMO_CONTENT = {
  HERO: {
    headline: 'Egy óra, ami csak a tiéd',
    image: u('1544161515-4ab6ce6db874'),
    imageAlt: ALT,
  },

  ABOUT: {
    text:
      'DEMÓ SZÖVEG — nem a masszőr szavai. Ide kerül majd az, hogy ki ő, hogyan ' +
      'dolgozik, és miért így. Ez a bekezdés csak azt mutatja meg, mennyi hely ' +
      'van rá, és hogyan fut a sor a fotó mellett.',
    image: u('1540555700478-4be289fbecef'),
    imageAlt: ALT,
  },

  EXPERIENCE_STEPS: [
    { title: 'DEMÓ — Megérkezés', text: 'Kitalált lépés. A valódi menetet a masszőr írja le.' },
    { title: 'DEMÓ — Beszélgetés', text: 'Kitalált lépés, csak a tördelés kedvéért.' },
    { title: 'DEMÓ — Kezelés', text: 'Kitalált lépés. Semmilyen ígéretet nem hordoz.' },
    { title: 'DEMÓ — Utána', text: 'Kitalált lépés. Cserélendő.' },
  ],

  EDITORIAL: {
    quote: 'DEMÓ mondat, a masszőr sajátja helyett.',
    image: u('1600334089648-b0d9d3028eb2'),
    imageAlt: ALT,
  },

  GALLERY: [
    { src: u('1519823551278-64ac92734fb1'), alt: ALT },
    { src: u('1571019613454-1cb2f99b2d8b'), alt: ALT },
    { src: u('1512290923902-8a9f81dc236c'), alt: ALT },
    { src: u('1515377905703-c4788e51af15'), alt: ALT },
    { src: u('1596178065887-1198b6148b2b'), alt: ALT },
    { src: u('1552693673-1bf958298935'), alt: ALT },
  ],

  /* A brief „trust signal" blokkja. Minden szám kitalált — ezért van
     mindegyik elé írva, hogy DEMÓ. Egy valódi vállalkozásról tett kitalált
     szakmai állítás akkor is hazugság, ha jól mutat. */
  USP: [
    { title: 'DEMÓ — Egy vendég egyszerre', text: 'Kitalált állítás. Csak akkor maradhat, ha igaz.' },
    { title: 'DEMÓ — 10 év tapasztalat', text: 'Kitalált szám. A valódit a masszőr mondja meg.' },
    { title: 'DEMÓ — 500+ vendég', text: 'Kitalált szám, kizárólag a tördelés bemutatására.' },
  ],

  TESTIMONIALS: [
    { quote: 'DEMÓ vélemény — nem valódi vendégtől származik.', name: 'DEMÓ V.' },
    { quote: 'DEMÓ vélemény — kitalált, engedély nélkül senki szava nem kerül ide.', name: 'DEMÓ K.' },
    { quote: 'DEMÓ vélemény — helykitöltő.', name: 'DEMÓ Zs.' },
  ],

  GIFT_CARD: {
    enabled: true,
    text: 'DEMÓ — csak akkor marad az oldalon, ha tényleg árul ajándékutalványt.',
  },

  FAQ: [
    { q: 'DEMÓ — Kell törölközőt hoznom?', a: 'Kitalált válasz. A valódit a masszőr adja meg.' },
    { q: 'DEMÓ — Hogyan tudok időpontot foglalni?', a: 'Kitalált válasz.' },
    { q: 'DEMÓ — Van parkolás a közelben?', a: 'Kitalált válasz.' },
    { q: 'DEMÓ — Mit tegyek, ha nem tudok jönni?', a: 'Kitalált válasz.' },
  ],
}
