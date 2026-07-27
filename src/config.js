/* ==================================================================
 * MINDEN SZERKESZTHETŐ ADAT EGY HELYEN.
 * Ha bármit módosítani kell az oldalon (ár, telefonszám, GYIK,
 * vélemény), azt itt tedd — a komponensekhez nem kell hozzányúlni.
 * ================================================================== */

/* --- Elérhetőség ------------------------------------------------- */
// Valódi Calendly foglalási link. Ez nyílik meg a gombokra ÉS ez töltődik be a beágyazott naptárba.
export const BOOKING_URL = 'https://calendly.com/rizmajermatelewi/30min'
export const PHONE_DISPLAY = '+36 30 635 7807'
export const PHONE_TEL = '+36306357807'
export const ADDRESS = '2365 Inárcs, Május 1. utca 12.'
export const INSTAGRAM_URL = 'https://www.instagram.com/ab.masszazs/'
// TODO: cseréld a valódi Facebook oldal URL-jére
export const FACEBOOK_URL = 'https://www.facebook.com/search/top?q=ab%20massz%C3%A1zs'
export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=2365+In%C3%A1rcs+M%C3%A1jus+1.+utca+12'

/* --- Integrációk / éles beállítások ------------------------------ *
 * Ezeket kell kitölteni, mielőtt élesbe megy az oldal.
 * ------------------------------------------------------------------ */
// TODO: ingyenes hozzáférési kulcs a https://web3forms.com oldalról (30 mp, e-mail cím kell hozzá).
// Amíg üres, a kapcsolati űrlap csak IMITÁLJA a küldést — nem megy sehova.
export const W3F_ACCESS_KEY = ''
// TODO: az éles domain, ha már megvan. A canonical, az OG-kép és a sitemap ehhez igazodik.
export const SITE_URL = 'https://abmasszazs.hu'

/* --- Nyitvatartás ------------------------------------------------ */
// TODO: írd át a valós sávokra
export const HOURS = [
  { day: 'Hétfő – Péntek', time: '09:00 – 20:00' },
  { day: 'Szombat', time: '09:00 – 14:00' },
  { day: 'Vasárnap', time: 'Egyeztetés szerint' },
]

/* --- Árlista ------------------------------------------------------
 * FIGYELEM: ezek BECSÜLT árak, nem a valódiak. Élesítés előtt
 * mindenképp írd át őket.
 * ------------------------------------------------------------------ */
export const PRICING = [
  {
    name: 'Svédmasszázs',
    blurb: 'Klasszikus izomlazítás — a leggyakrabban választott kezelés.',
    rows: [
      { label: 'Részmasszázs (hát, nyak, váll)', time: '30 perc', price: '8 000 Ft' },
      { label: 'Teljes testmasszázs', time: '60 perc', price: '13 000 Ft' },
      { label: 'Teljes test + talp', time: '90 perc', price: '18 000 Ft' },
    ],
  },
  {
    name: 'Yumeiho terápia',
    blurb: 'Ízületstimuláló, egésztestes japán technika a szimmetriáért.',
    featured: true,
    rows: [
      { label: 'Yumeiho kezelés', time: '60 perc', price: '15 000 Ft' },
      { label: 'Yumeiho + nyújtás', time: '90 perc', price: '20 000 Ft' },
    ],
  },
  {
    name: 'Talpreflexológia',
    blurb: 'A talp reflexzónáin keresztül az egész szervezetre hat.',
    rows: [
      { label: 'Talpkezelés', time: '30 perc', price: '7 000 Ft' },
      { label: 'Talpkezelés mélyebben', time: '60 perc', price: '12 000 Ft' },
    ],
  },
]

// TODO: valós bérletárak
export const PACKAGES = [
  { label: '5 alkalmas bérlet', note: 'egy kezeléstípusra', price: '−10%' },
  { label: '10 alkalmas bérlet', note: 'szabadon felhasználható', price: '−15%' },
]

/* --- Galéria ------------------------------------------------------
 * Jelenleg Unsplash-fotók. Amint vannak saját képeid a kezelőről,
 * cseréld le őket — a valódi tér sokkal többet ér.
 * ------------------------------------------------------------------ */
export const GALLERY = [
  { src: '/img/g2.jpg', alt: 'Hátmasszázs a kezelőágyon' },
  { src: '/img/g8.jpg', alt: 'Gyertyafény a kezelés alatt' },
  { src: '/img/g1.jpg', alt: 'Meleg köves kezelés' },
  { src: '/img/g9.jpg', alt: 'Talpkezelés' },
  { src: '/img/g4.jpg', alt: 'Vállak és nyak átmozgatása' },
  { src: '/img/g3.jpg', alt: 'Masszázsolaj és kellékek' },
  { src: '/img/g7.jpg', alt: 'Hátizmok átdolgozása' },
  { src: '/img/g5.jpg', alt: 'Pihenés a kezelés után' },
]

/* --- Kezelés-részletek -------------------------------------------- */
export const TREATMENTS = [
  {
    name: 'Yumeiho terápia',
    tagline: 'Ha a tested féloldalasan dolgozik',
    forWhom:
      'Derékfájás, egyenetlen vállmagasság, csípőferdülés, visszatérő izomgörcs. Annak, aki már próbált mindent, de a panasz mindig visszajön.',
    how: 'Ruhában, matracon zajlik. Nyomó- és gyúrótechnikák, ízületi mozgatás és passzív nyújtás váltakozik — összesen több mint 100 fogás, meghatározott sorrendben.',
    effect:
      'A test szimmetriájának helyreállítása. Sokan az első alkalom után szabadabb mozgásról számolnak be, de a tartós eredményhez általában több kezelés kell.',
  },
  {
    name: 'Svédmasszázs',
    tagline: 'Ha egyszerűen csak elgémberedtél',
    forWhom:
      'Ülőmunka, edzés utáni izomláz, általános fáradtság, alvászavar. A legjobb belépő, ha még sosem voltál masszázson.',
    how: 'Masszázsolajjal, kezelőágyon. Simítás, gyúrás, dörzsölés és ütögetés — a felszíntől haladva a mélyebb izomrétegek felé, mindig a szívhez vezető irányban.',
    effect:
      'Oldódó izomfeszülés, javuló vérkeringés, mélyebb alvás. A hatás azonnal érezhető, és néhány napig kitart.',
  },
  {
    name: 'Talpreflexológia',
    tagline: 'Ha a fáradtságot nem tudod hova tenni',
    forWhom:
      'Emésztési panasz, fejfájás, hormonális egyensúlytalanság, állandó kimerültség. Akkor is jó választás, ha a hátad nem szereti az érintést.',
    how: 'Ülő vagy fekvő helyzetben, a talp reflexzónáinak pontszerű nyomásával. Az érzékeny pontok elárulják, melyik terület kér figyelmet.',
    effect:
      'A szervezet öngyógyító folyamatainak támogatása és mély ellazulás. Sokan elalszanak a kezelés közben — ez teljesen normális.',
  },
]

/* --- GYIK --------------------------------------------------------- */
export const FAQ = [
  {
    q: 'Kell teljesen levetkőznöm?',
    a: 'Nem. Mindig csak az éppen kezelt testrész szabad, a többi részed végig letakarva marad. Alsóneműben maradhatsz, a Yumeiho terápiát pedig kifejezetten ruhában végzem.',
  },
  {
    q: 'Meddig tart egy alkalom?',
    a: 'A kezelés maga 30, 60 vagy 90 perc, de az első beszélgetéssel és az utána következő rövid pihenéssel együtt számolj kb. 15 perc pluszt.',
  },
  {
    q: 'Fáj a Yumeiho masszázs?',
    a: 'Határozott, mély technika, de nem fájdalmas. Végig egyeztetjük az erősséget — ha valami sok, szólsz, és azonnal igazítok rajta.',
  },
  {
    q: 'Mit hozzak magammal?',
    a: 'Semmit. A törölközőt, a takarót és a masszázsolajat én adom. Yumeihóhoz kényelmes, nyújtható ruhában érkezz.',
  },
  {
    q: 'Ehetek a kezelés előtt?',
    a: 'Közvetlenül előtte ne. Egy könnyű étkezés 1–2 órával korábban ideális, teli hassal kellemetlen lehet a hason fekvés.',
  },
  {
    q: 'Mit csináljak utána?',
    a: 'Igyál a szokásosnál több vizet, és aznap kerüld a nagy fizikai terhelést. Előfordulhat enyhe izomláz-szerű érzés — ez normális, 1–2 nap alatt elmúlik.',
  },
  {
    q: 'Mikor nem ajánlott a masszázs?',
    a: 'Láz, fertőzés, friss sérülés, trombózis, daganatos megbetegedés, súlyos szív- és érrendszeri panasz, a kezelendő területen lévő bőrelváltozás esetén, illetve véralvadásgátló szedése mellett. Terhesség alatt kizárólag orvosi egyeztetés után. Ha bizonytalan vagy, hívj — átbeszéljük.',
  },
  {
    q: 'Hogyan mondhatom le az időpontot?',
    a: 'Telefonon vagy üzenetben, lehetőleg legalább 24 órával korábban, hogy az idősáv másnak felszabadulhasson.',
  },
]

/* --- Vélemények ---------------------------------------------------
 * SZÁNDÉKOSAN ÜRES. Amíg nincs valódi vendégvélemény, a szekció
 * egyáltalán nem jelenik meg — a Testimonials komponens üres tömb
 * esetén null-t ad vissza. Nem kell kódot módosítani a
 * visszakapcsoláshoz: elég ide beírni az első valódi véleményt.
 *
 * Kitalált vagy „mintaszövegként” kiírt vélemény rosszabb, mint a
 * semmi: hiányos oldal benyomását kelti, valótlan állítást tenne a
 * vendégekről, és fogyasztóvédelmileg is kockázatos.
 *
 * Formátum:
 *   {
 *     text: '2–3 mondat: mivel érkezett a vendég, mit érzett utána.',
 *     author: 'Keresztnév V.',   // kérj engedélyt a névhasználatra
 *     meta: 'Yumeiho terápia',
 *   }
 * ------------------------------------------------------------------ */
export const TESTIMONIALS = []
