/* ==================================================================
 * PREFLIGHT — élesítés előtti ellenőrzés
 *
 * A `npm run build` ezt futtatja először (prebuild). Ha bármelyik
 * ellenőrzés elbukik, a build MEGÁLL.
 *
 * Miért: az oldalon több olyan érték van, ami "kitöltöttnek látszik",
 * de nem az — a Calendly-link egy MÁSIK fiókra mutat, az árak
 * becsültek, az űrlapnak nincs kulcsa. Ezek egyike sem látszik a
 * böngészőben. Ha nem a build fogja meg őket, akkor egy vendég fogja.
 *
 * Fejlesztéshez használd a `npm run dev`-et — az nem futtatja ezt.
 * ================================================================== */

import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => (existsSync(join(root, p)) ? readFileSync(join(root, p), 'utf8') : null)

const errors = []
const warnings = []
const fail = (what, why, fix) => errors.push({ what, why, fix })
const warn = (what, why, fix) => warnings.push({ what, why, fix })

const config = read('src/config.js')
if (!config) {
  console.error('preflight: src/config.js nem található')
  process.exit(1)
}

/** Egy `export const NÉV = '...'` értékének kiolvasása. */
const strVal = (name) => {
  const m = config.match(new RegExp(`export const ${name}\\s*=\\s*['"\`]([^'"\`]*)['"\`]`))
  return m ? m[1] : null
}

/* --- 1. Foglalási link ------------------------------------------- *
 * TELEFONOS MÓD: az üres BOOKING_URL megengedett — ilyenkor minden
 * foglalás-gomb telefonhívássá alakul. Ez tudatos döntés, nem hiba.
 * Amit viszont MEG KELL fogni: egy kitöltött, de rossz fiókra mutató
 * link, mert az működőnek látszik.
 * ------------------------------------------------------------------ */
const booking = strVal('BOOKING_URL')
if (booking) {
  if (booking.includes('CSERELD')) {
    fail('BOOKING_URL', 'placeholder maradt benne', 'Írd be a valódi linket, vagy hagyd üresen.')
  } else if (/rizmajermatelewi/i.test(booking)) {
    fail(
      'BOOKING_URL',
      `IDEGEN FIÓKRA mutat: ${booking}`,
      'Ez a te saját Calendly-fiókod, nem a stúdióé. Aki foglal, hozzád foglal. Cseréld le, vagy hagyd üresen — telefonos módban az oldal enélkül is teljes.'
    )
  } else if (!/^https:\/\//i.test(booking)) {
    fail('BOOKING_URL', 'nem https-sel kezdődik', 'Teljes URL kell, https-sel.')
  }
} else {
  warn('BOOKING_URL', 'üres — telefonos mód', 'Az oldal telefonhívásra vált. Ez rendben van.')
}

/* --- 2. Kapcsolati űrlap ----------------------------------------- *
 * Kulcs nélkül az űrlap helyén telefonos panel jelenik meg, tehát nincs
 * néma adatvesztés. Ezért figyelmeztetés, nem hiba.
 * ------------------------------------------------------------------ */
const w3f = strVal('W3F_ACCESS_KEY')
if (!w3f) {
  warn(
    'W3F_ACCESS_KEY',
    'üres — az űrlap helyett telefonos panel jelenik meg',
    'Ha kell működő űrlap: ingyenes kulcs a https://web3forms.com oldalról (30 mp).'
  )
}

/* --- 3. Facebook ------------------------------------------------- */
const fb = strVal('FACEBOOK_URL')
if (fb && /facebook\.com\/search/i.test(fb)) {
  fail(
    'FACEBOOK_URL',
    'keresési találatra mutat, nem az oldalra',
    'Cseréld a valódi oldal URL-jére, vagy hagyd üresen — az üres jobb, mint egy keresőoldal.'
  )
}

/* --- 4. Árak ------------------------------------------------------ *
 * Üres ár = "telefonon egyeztetjük", ez megengedett. Amit tilos: BECSÜLT
 * árat kiírni valódiként, mert az ügyfél azon az áron érkezik.
 * ------------------------------------------------------------------ */
if (/FIGYELEM: ezek BECSÜLT árak/.test(config)) {
  fail(
    'PRICING',
    'a becsült árakra figyelmeztető megjegyzés még bent van',
    'Írd át a valódi árakra és töröld a kommentet, vagy ürítsd ki a price mezőket (telefonos ár).'
  )
}
const priced = [...config.matchAll(/price:\s*'([^']*)'/g)].map((m) => m[1])
if (priced.length && priced.every((p) => p === '')) {
  warn('PRICING', 'egyetlen ár sincs kiírva — telefonos ármegadás', 'Ez rendben van.')
}
if (/\/\/ TODO: írd át a valós sávokra/.test(config)) {
  fail('HOURS', 'a nyitvatartás még a minta érték', 'Írd át a valós sávokra, majd töröld a TODO-t.')
}
if (/\/\/ TODO: valós bérletárak/.test(config)) {
  fail('PACKAGES', 'a bérletárak még minták', 'Írd át őket, majd töröld a TODO-t.')
}

/* --- 5. Domain-egyezés ------------------------------------------- *
 * A domain 5 helyen szerepel. Ha csak a config.js-t írod át, a
 * canonical és a sitemap egy nem létező címre mutat — ez SEO-t ront,
 * és nem látszik a böngészőben.
 * ------------------------------------------------------------------ */
const siteUrl = strVal('SITE_URL')
if (!siteUrl) {
  fail('SITE_URL', 'nincs beállítva', 'Írd be az éles domaint a config.js-be.')
} else {
  const host = siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const checks = [
    ['index.html', read('index.html'), 'og:url / canonical / plausible data-domain'],
    ['public/sitemap.xml', read('public/sitemap.xml'), '<loc> elemek'],
    ['public/robots.txt', read('public/robots.txt'), 'Sitemap: sor'],
  ]
  for (const [file, content, where] of checks) {
    if (content === null) {
      warn(file, 'hiányzik', 'Ellenőrizd, hogy szándékos-e.')
      continue
    }
    if (!content.includes(host)) {
      fail(
        file,
        `nem a SITE_URL domainjét (${host}) tartalmazza`,
        `Írd át benne a domaint itt: ${where}.`
      )
    }
  }
}

/* --- Kiírás ------------------------------------------------------- */
const line = '-'.repeat(72)
if (warnings.length) {
  console.warn(`\n${line}\nPREFLIGHT — figyelmeztetés (${warnings.length})\n${line}`)
  for (const w of warnings) console.warn(`  ! ${w.what}: ${w.why}\n    -> ${w.fix}`)
}

if (errors.length) {
  console.error(`\n${line}\nPREFLIGHT MEGÁLLT — ${errors.length} dolog hiányzik az élesítéshez\n${line}`)
  for (const e of errors) console.error(`\n  X ${e.what}: ${e.why}\n    -> ${e.fix}`)
  console.error(
    `\n${line}\nEzek egyike sem látszik a böngészőben. Ha most élesítenéd, működőnek\ntűnne az oldal, miközben a foglalás rossz helyre megy és az űrlap\nelnyeli a megkereséseket.\n\nFejlesztéshez: npm run dev  (ez nem futtatja a preflightot)\n${line}\n`
  )
  process.exit(1)
}

console.log('preflight: rendben — minden éles beállítás megvan.')
