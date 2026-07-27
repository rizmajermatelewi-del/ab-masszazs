import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-28">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-sm text-primary lift-on-hover"
        >
          <ArrowLeft className="h-4 w-4" /> Vissza a főoldalra
        </Link>

        <h1 className="mt-10 font-display text-4xl sm:text-5xl font-bold tracking-tight">
          Impresszum és tájékoztató
        </h1>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          AB Masszázs · Inárcs
        </p>

        <div className="mt-12 space-y-10 font-body text-sm sm:text-base text-ink/80 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">A szolgáltató adatai</h2>
            <ul className="mt-3 space-y-1.5">
              <li>
                <strong>Szolgáltatás neve:</strong> AB Masszázs
              </li>
              <li>
                <strong>Vállalkozó neve:</strong>{' '}
                <span className="text-muted">[kitöltendő — a vállalkozó teljes neve]</span>
              </li>
              <li>
                <strong>Székhely:</strong>{' '}
                <span className="text-muted">[kitöltendő — a vállalkozás bejegyzett székhelye]</span>
              </li>
              <li>
                <strong>Kezelő címe:</strong> 2365 Inárcs, Május 1. utca 12.
              </li>
              <li>
                <strong>Adószám:</strong> <span className="text-muted">[kitöltendő]</span>
              </li>
              <li>
                <strong>Nyilvántartási szám:</strong>{' '}
                <span className="text-muted">
                  [kitöltendő — egyéni vállalkozói nyilvántartási szám]
                </span>
              </li>
              <li>
                <strong>E-mail:</strong> <span className="text-muted">[kitöltendő]</span>
              </li>
              <li>
                <strong>Telefon:</strong>{' '}
                <a href="tel:+36306357807" className="text-primary underline underline-offset-2">
                  +36 30 635 7807
                </a>
              </li>
              <li>
                <strong>Instagram:</strong>{' '}
                <a
                  href="https://www.instagram.com/abmasszazs/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  @abmasszazs
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Tárhelyszolgáltató</h2>
            <p className="mt-3">
              Az oldalt a Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA —
              privacy@vercel.com) tárhelyén üzemeltetem. Ha az oldal más szolgáltatóhoz kerül, ezt az
              adatot frissíteni kell.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Időpontfoglalás és lemondás
            </h2>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>Az időpont online naptáron, telefonon vagy üzenetben foglalható.</li>
              <li>
                A foglalás akkor válik véglegessé, amikor visszaigazolást kapsz a megadott
                elérhetőségeden.
              </li>
              <li>
                Lemondást vagy módosítást lehetőleg a kezelés előtt legalább 24 órával jelezz, hogy
                az idősáv másnak felszabadulhasson.
              </li>
              <li>
                Késés esetén a kezelés a foglalt időn belül fejeződik be, hogy a következő vendég ne
                csússzon.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Egészségügyi tájékoztatás
            </h2>
            <p className="mt-3">
              A kínált masszázs- és reflexológiai kezelések közérzetjavító, relaxációs
              szolgáltatások. Nem minősülnek orvosi ellátásnak, nem helyettesítik az orvosi
              diagnózist, vizsgálatot vagy kezelést.
            </p>
            <p className="mt-3">
              A kezelés előtt kérlek, jelezd, ha az alábbiak bármelyike fennáll: láz vagy fertőzés,
              friss sérülés, trombózis, daganatos megbetegedés, súlyos szív- vagy érrendszeri
              betegség, terhesség, bőrelváltozás a kezelendő területen, vagy ha véralvadásgátlót
              szedsz. Ezekben az esetekben a kezelés előtt orvosi egyeztetés szükséges.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Fizetés</h2>
            <p className="mt-3 text-muted">
              [Kitöltendő: aktuális árlista, elfogadott fizetési módok, illetve bérlet- vagy
              kúracsomag-feltételek.]
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Adatkezelés</h2>
            <p className="mt-3">
              A személyes adatok kezelésének részleteit az{' '}
              <Link to="/adatkezeles" className="text-primary underline underline-offset-2">
                adatkezelési tájékoztató
              </Link>{' '}
              tartalmazza.
            </p>
          </section>
        </div>

        <Link
          to="/"
          className="mt-16 inline-flex items-center gap-2 font-body text-sm text-primary lift-on-hover"
        >
          <ArrowLeft className="h-4 w-4" /> Vissza a főoldalra
        </Link>
      </div>
    </div>
  )
}
