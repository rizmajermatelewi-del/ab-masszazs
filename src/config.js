/* ==================================================================
 * MINDEN SZERKESZTHETŐ ADAT EGY HELYEN.
 * Ha bármit módosítani kell az oldalon (ár, telefonszám, GYIK,
 * vélemény), azt itt tedd — a komponensekhez nem kell hozzányúlni.
 * ================================================================== */

/* --- Elérhetőség ------------------------------------------------- */
/* Online foglalás EGYELŐRE KIKAPCSOLVA.
 *
 * Amíg üres, minden foglalás-gomb telefonhívássá alakul, és a naptár
 * szekció helyén telefonos egyeztetés jelenik meg. Ez szándékos: jobb
 * egy működő telefonszám, mint egy naptár, ami rossz fiókra mutat.
 *
 * Bekapcsoláshoz: írd be ide anyukád SAJÁT Calendly-linkjét. Semmi mást
 * nem kell átállítani, az oldal magától átvált. */
export const BOOKING_URL = ''
export const PHONE_DISPLAY = '+36 30 635 7807'
export const PHONE_TEL = '+36306357807'
export const ADDRESS = '2365 Inárcs, Május 1. utca 12.'
export const INSTAGRAM_URL = 'https://www.instagram.com/ab.masszazs/'
// Nincs (még) valódi Facebook oldal. Üresen hagyva az ikon el sem jelenik —
// ez jobb, mint egy keresési találatra mutató link.
export const FACEBOOK_URL = ''
export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=2365+In%C3%A1rcs+M%C3%A1jus+1.+utca+12'

/* --- Integrációk / éles beállítások ------------------------------ *
 * Ezeket kell kitölteni, mielőtt élesbe megy az oldal.
 * ------------------------------------------------------------------ */
// Amíg üres, az űrlap helyett telefonos panel jelenik meg — nincs néma adatvesztés.
// Működő űrlaphoz: ingyenes kulcs a https://web3forms.com oldalról (30 mp).
export const W3F_ACCESS_KEY = ''
// Ideiglenes Vercel-domain. Amint megvan a .hu domain, itt ÉS az index.html,
// public/sitemap.xml, public/robots.txt fájlokban is át kell írni (a preflight ellenőrzi).
export const SITE_URL = 'https://ab-masszazs.vercel.app'

/* --- Nyitvatartás ------------------------------------------------ *
 * Nincs fix nyitvatartás megadva, mert a stúdió otthon működik és
 * időpontra. Ez nem hiányosság: kitalált sávokat kiírni rosszabb lenne,
 * mert egy vendég hiába állítana be rá.
 * ------------------------------------------------------------------ */
export const HOURS = [
  { day: 'Hétfő – Szombat', time: 'Előre egyeztetett időpontban' },
  { day: 'Vasárnap', time: 'Zárva' },
]

/* --- Árlista ------------------------------------------------------
 * AZ ÁRAKAT SZÁNDÉKOSAN NEM ÍRJUK KI. A `price` mezők üresek, így a
 * kártyákon csak a kezelés neve és hossza jelenik meg, mellette a
 * telefonos egyeztetés.
 *
 * Amint megvannak a valódi árak, elég ide beírni őket — a komponens
 * magától megjeleníti, nem kell kódot módosítani.
 *
 * Becsült árat kiírni tilos: az ügyfél azon az áron érkezne.
 * ------------------------------------------------------------------ */
export const PRICING = [
  {
    name: 'Svédmasszázs',
    blurb: 'Klasszikus izomlazítás — a leggyakrabban választott kezelés.',
    rows: [
      { label: 'Részmasszázs (hát, nyak, váll)', time: '30 perc', price: '' },
      { label: 'Teljes testmasszázs', time: '60 perc', price: '' },
      { label: 'Teljes test + talp', time: '90 perc', price: '' },
    ],
  },
  {
    name: 'Yumeiho terápia',
    blurb: 'Ízületstimuláló, egésztestes japán technika a szimmetriáért.',
    featured: true,
    rows: [
      { label: 'Yumeiho kezelés', time: '60 perc', price: '' },
      { label: 'Yumeiho + nyújtás', time: '90 perc', price: '' },
    ],
  },
  {
    name: 'Talpreflexológia',
    blurb: 'A talp reflexzónáin keresztül az egész szervezetre hat.',
    rows: [
      { label: 'Talpkezelés', time: '30 perc', price: '' },
      { label: 'Talpkezelés mélyebben', time: '60 perc', price: '' },
    ],
  },
]

// Bérletárak: amint megvannak, ide kerülnek. Üres tömb esetén a szekció el sem jelenik.
export const PACKAGES = []

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
