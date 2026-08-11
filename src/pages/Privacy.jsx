import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/business'

/* Deliberately short, because in Phase 1 it is true: the site has no form, no
   analytics, no cookies of its own and no third-party embeds. Phase 2 replaces
   this with the real tájékoztató covering booking data — name, telephone
   number, e-mail address — Google Calendar as processor, and the retention
   period. Writing that text now, before the form it describes exists, would be
   a document that does not match the site. */
export default function Privacy() {
  const owner = BUSINESS.legalName || BUSINESS.name

  return (
    <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="text-3xl tracking-tight text-ink sm:text-4xl">Adatkezelési tájékoztató</h1>

      <div className="mt-4 h-px w-16 bg-clay/40" />

      <div className="mt-10 space-y-6 leading-relaxed text-muted">
        <p>
          Ez az oldal jelenleg <strong>nem gyűjt</strong> személyes adatot: nincs rajta űrlap,
          hírlevél-feliratkozás, sem látogatottság-mérő. Saját sütit nem helyez el a böngésződben.
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
        <p>
          Amint online időpontfoglalás indul, ez a tájékoztató kiegészül azzal, hogy a foglaláshoz
          megadott név, telefonszám és e-mail cím hogyan kerül kezelésre.
        </p>
        {BUSINESS.email ? (
          <p>
            Kérdés esetén:{' '}
            <a
              className="text-clay underline decoration-clay/40 underline-offset-4 transition-colors duration-200 hover:decoration-clay"
              href={`mailto:${BUSINESS.email}`}
            >
              {BUSINESS.email}
            </a>
          </p>
        ) : null}
      </div>

      <Link
        to="/"
        className="mt-12 inline-flex min-h-[44px] items-center text-sm text-clay underline decoration-clay/40 underline-offset-4 transition-colors duration-200 hover:decoration-clay"
      >
        Vissza a főoldalra
      </Link>
    </main>
  )
}
