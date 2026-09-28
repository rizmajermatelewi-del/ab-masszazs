import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/business'
import { DEMO } from '../data/demo'
import DemoBanner from '../components/DemoBanner.jsx'
import { BOOKING_ONLINE } from '../data/booking'
import { ANALYTICS_ON } from '../data/analytics'

/* How long a booking stays in her calendar before she deletes it.
   ponytail: a stated default until she decides otherwise; change it here and
   the notice follows. */
const RETENTION = 'az időpontot követő 12 hónapig'

/* The part of the notice the booking form needs (spec §7): who holds the
   data, what, why, where, for how long, and what the visitor can do about
   it. Written against the code in src/server/: the data lives only in the
   calendar event and the two e-mails. */
function BookingData({ owner }) {
  const who = owner || 'a szolgáltató'
  return (
    <>
      <p>
        <strong>Online időpontfoglalás.</strong> Foglaláskor a nevedet, telefonszámodat, e-mail
        címedet, a választott kezelést és időpontot, valamint az esetleges megjegyzésedet kérem el.
        Az adatkezelő {who}
        {BUSINESS.street ? ` (${[BUSINESS.postalCode, BUSINESS.city, BUSINESS.street].filter(Boolean).join(' ')})` : ''}.
      </p>
      <p>
        Az adatokat kizárólag az időpont rögzítésére, visszaigazolására, szükség esetén az
        egyeztetésre és a lemondás lehetővé tételére használom. A kezelés jogalapja a
        hozzájárulásod, amelyet a foglaláskor adsz meg, és a szolgáltatás igénybevételéhez
        szükséges lépések (GDPR 6. cikk (1) a) és b) pont).
      </p>
      <p>
        Az adatok egyetlen helyen tárolódnak: az időpont a naptárban, a Google Naptárban (Google
        Ireland Ltd.), a visszaigazolás pedig e-mailben, Gmailen keresztül. Adatbázis, hírlevél,
        látogatottság-mérő nincs; az oldal saját sütit nem használ. Az adatokat {RETENTION} őrzöm,
        utána törlöm. A foglalást a visszaigazoló e-mailben lévő linkkel magad is lemondhatod.
      </p>
    </>
  )
}

/* The callback and voucher forms (src/server/message.js): what they ask,
   why, where it goes. Written against the code: the submission becomes one
   e-mail in her Gmail inbox and nothing else stores it. */
function FormsData({ owner }) {
  const who = owner || 'a szolgáltató'
  return (
    <>
      <p>
        <strong>Visszahívás és ajándékutalvány.</strong> A visszahívás-kérő űrlapon a nevedet,
        telefonszámodat, a számodra kényelmes idősávot, az érdeklődési körödet és az esetleges
        üzenetedet kérem el. Az ajándékutalvány-igénylésnél ezen felül a választott kezelést, a
        megajándékozott nevét és az utalványra kért üzenetet; az e-mail cím mindkét helyen
        opcionális. Az adatkezelő {who}
        {BUSINESS.street ? ` (${[BUSINESS.postalCode, BUSINESS.city, BUSINESS.street].filter(Boolean).join(' ')})` : ''}.
      </p>
      <p>
        Az adatokat csak arra használom, hogy visszahívjalak, illetve egyeztessük az utalvány
        fizetését és átadását. Jogalap: a hozzájárulásod, amelyet a küldéssel adsz meg, és a
        szolgáltatás igénybevétele előtti lépések (GDPR 6. cikk (1) a) és b) pont). A
        megajándékozott nevét csak az utalványra írom rá.
      </p>
      <p>
        A kitöltött űrlap egyetlen e-mailként érkezik a postafiókomba, Gmailen keresztül (Google
        Ireland Ltd.). Adatbázisba nem kerül. Az e-mailt {FORM_RETENTION} őrzöm, utána törlöm.
      </p>
    </>
  )
}

const FORM_RETENTION = 'a megkeresést követő 12 hónapig'

/* Every state lists exactly the forms that exist: booking only once it is
   switched on, the callback and voucher forms always. A notice that
   describes a form the site does not have, or misses one it does, is wrong
   either way. */
export default function Privacy() {
  const owner = BUSINESS.legalName || BUSINESS.name

  return (
    <>
      <DemoBanner />
      <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="text-3xl tracking-tight text-ink sm:text-4xl">Adatkezelési tájékoztató</h1>

      <div className="mt-4 h-px w-16 bg-lotus/40" />

      <div className="mt-10 space-y-6 leading-relaxed text-muted">
        {/* Demó módban ez a lap hazudna magáról: a fotók az images.unsplash.com
            címről töltődnek, ami harmadik fél, és látja a látogató IP-címét.
            A tájékoztató alatta pont az ellenkezőjét állítja, ezért ez a
            bekezdés elé kerül, nem utána. */}
        {DEMO ? (
          <p className="border-l-2 border-red-700 pl-4 text-ink">
            <strong>Demó változat.</strong> Ezen a bemutató oldalon a fotók az Unsplash
            (images.unsplash.com) szervereiről töltődnek be, így az a szolgáltató látja a
            látogató IP-címét. Az éles oldalon nem lesznek külső képek, és az alábbiak
            akkor lesznek maradéktalanul igazak.
          </p>
        ) : null}
        {BOOKING_ONLINE ? <BookingData owner={owner} /> : null}
        <FormsData owner={owner} />
        {ANALYTICS_ON ? (
          <p>
            <strong>Látogatottság-mérés.</strong> Az oldal az Umami nevű, süti nélküli mérőt használja
            (umami.is). Összesítve és névtelenül látom, hány látogató volt, melyik részt nézték,
            honnan érkeztek, és milyen eszközről, valamint azt, hogy hányszor nyomtak meg egy-egy
            gombot (például a telefonszámot). Sütit nem helyez el, személyes adatot nem tárol, és a
            „Ne kövess” (Do Not Track) böngészőbeállítást tiszteletben tartja. Jogalap: jogos érdek
            az oldal fejlesztéséhez (GDPR 6. cikk (1) f) pont).
          </p>
        ) : null}
        <p>
          Hírlevél és harmadik féltől származó beágyazás nincs az oldalon,
          {ANALYTICS_ON ? '' : ' látogatottság-mérő sincs,'} és saját sütit sem helyez el a
          böngésződben. Kérlek, egészségügyi adatot ne írj az üzenetbe; ha valamire figyelnem kell,
          azt személyesen beszéljük meg.
        </p>
        <p>
          Bármikor kérheted, hogy megmutassam, kijavítsam vagy töröljem az adataidat, és
          visszavonhatod a hozzájárulásodat. Panasszal a Nemzeti Adatvédelmi és
          Információszabadság Hatósághoz (naih.hu) fordulhatsz.
        </p>
        {BUSINESS.phone ? (
          <p>
            Ha időpontot szeretnél, telefonon tudsz jelentkezni. A hívás során megadott adatokat
            {owner ? ` ${owner} ` : ' a szolgáltató '}
            kizárólag az időpont egyeztetésére használja.
          </p>
        ) : null}
        {/* Named, not described in the abstract: the host sees the request logs,
            so it is a processor and Hungarian practice expects it by name. The
            paragraph stays out entirely until the host is chosen, and it makes no
            claim about who can read those logs — that depends on the provider's
            settings and nobody has configured them yet. */}
        {BUSINESS.hostingProvider ? (
          <p>
            Az oldalt a(z) {BUSINESS.hostingProvider} szolgálja ki, amely üzemeltetési célból
            naplózhatja a kéréseket (például IP-cím, böngésző típusa).
          </p>
        ) : null}
        {BUSINESS.email ? (
          <p>
            Kérdés esetén:{' '}
            <a
              className="text-lotus underline decoration-lotus/40 underline-offset-4 transition-colors duration-200 hover:decoration-lotus"
              href={`mailto:${BUSINESS.email}`}
            >
              {BUSINESS.email}
            </a>
          </p>
        ) : null}
      </div>

      <Link
        to="/"
        className="mt-12 inline-flex min-h-[44px] items-center text-sm text-lotus underline decoration-lotus/40 underline-offset-4 transition-colors duration-200 hover:decoration-lotus"
      >
        Vissza a főoldalra
      </Link>
      </main>
    </>
  )
}
