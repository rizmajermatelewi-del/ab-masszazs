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
    <main className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
        Adatkezelési tájékoztató
      </h1>

      <div className="mt-8 space-y-5 leading-relaxed text-stone-600">
        <p>
          Ez az oldal jelenleg <strong>nem gyűjt</strong> személyes adatot: nincs rajta űrlap,
          hírlevél-feliratkozás, sem látogatottság-mérő. Saját sütit nem helyez el a böngésződben.
        </p>
        <p>
          Ha időpontot szeretnél, telefonon tudsz jelentkezni. A hívás során megadott adatokat
          {owner ? ` ${owner} ` : ' a szolgáltató '}
          kizárólag az időpont egyeztetésére használja.
        </p>
        <p>
          Az oldalt tárhelyszolgáltató szolgálja ki, amely üzemeltetési célból naplózhatja a
          kéréseket (például IP-cím, böngésző típusa). Ezekhez az oldal üzemeltetője azonosítható
          formában nem fér hozzá.
        </p>
        <p>
          Amint online időpontfoglalás indul, ez a tájékoztató kiegészül azzal, hogy a foglaláshoz
          megadott név, telefonszám és e-mail cím hogyan kerül kezelésre.
        </p>
        {BUSINESS.email ? (
          <p>
            Kérdés esetén:{' '}
            <a className="underline underline-offset-4" href={`mailto:${BUSINESS.email}`}>
              {BUSINESS.email}
            </a>
          </p>
        ) : null}
      </div>

      <Link to="/" className="mt-10 inline-block text-sm underline underline-offset-4">
        Vissza a főoldalra
      </Link>
    </main>
  )
}
