import { useState } from 'react'
import { SERVICES } from '../data/services'
import { AREAS, NEEDS, PITCH, rank } from '../data/recommend'
import { formatPrice, formatDuration } from '../lib/format'
import Reveal from '../components/Reveal.jsx'
import { Pills } from '../components/Form.jsx'
import { track } from '../data/analytics'
import { BOOK_EVENT } from './BookingRequest.jsx'

/* "Which one is for me?" Tap where it feels tight and what you want from the
   hour; every tap re-ranks the three treatments on the spot, with a share
   for each, and the leader explains itself. From there one button fills in
   the appointment request, one turns it into a gift.

   The figure is for pointing; the labelled toggle buttons beside it are the
   real controls (keyboard, screen readers). Hovering either lights the other. */

// Label position beside the figure (top %, side).
const PIN = {
  fej: { top: '8%', side: 'right' },
  nyak: { top: '21%', side: 'left' },
  hat: { top: '33%', side: 'right' },
  derek: { top: '46%', side: 'left' },
  csipo: { top: '56%', side: 'right' },
  lab: { top: '76%', side: 'left' },
  talp: { top: '95%', side: 'right' },
}

// One front-view silhouette, split into the areas above.
const SHAPES = {
  fej: <ellipse cx="110" cy="42" rx="25" ry="29" />,
  nyak: <path d="M97 70h26v12c26 4 44 12 52 26c3 6 0 10-6 10H51c-6 0-9-4-6-10c8-14 26-22 52-26z" />,
  hat: <path d="M58 122h104c2 30 0 58-6 80H64c-6-22-8-50-6-80z" />,
  derek: <path d="M64 206h92c-2 14-2 26 0 38H64c2-12 2-24 0-38z" />,
  csipo: <path d="M62 248h96c4 16 4 30 0 44H62c-4-14-4-28 0-44z" />,
  lab: (
    <>
      <path d="M66 296h40c0 50-2 100-6 150H76c-6-50-10-100-10-150z" />
      <path d="M114 296h40c0 50-4 100-10 150h-24c-4-50-6-100-6-150z" />
    </>
  ),
  talp: (
    <>
      <ellipse cx="88" cy="461" rx="19" ry="8" />
      <ellipse cx="132" cy="461" rx="19" ry="8" />
    </>
  ),
}

export const GIFT_EVENT = 'ab:ajandek'

export default function Recommender() {
  const [areas, setAreas] = useState([])
  const [need, setNeed] = useState(null)
  const [hover, setHover] = useState(null)

  if (SERVICES.length < 2) return null

  const toggle = (id) => setAreas((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]))
  const ranking = rank(areas, need, SERVICES)
  const pick = ranking.length ? SERVICES.find((s) => s.id === ranking[0].id) : null
  const chosen = [...AREAS.filter((a) => areas.includes(a.id)), ...NEEDS.filter((n) => n.id === need)]

  function go(event, target, label) {
    track(label)
    window.dispatchEvent(new CustomEvent(event, { detail: pick.id }))
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="ajanlo" className="px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-[16ch] text-[clamp(2.25rem,5.5vw,4rem)] font-normal leading-[1.05] text-ink">
            Melyik masszázs <em className="text-lotus">illik hozzád?</em>
          </h2>
          <p className="mt-5 max-w-[46ch] leading-relaxed text-muted">
            Koppints oda, ahol a feszültséget érzed, és válaszd ki, mire vágysz. Minden koppintásra
            újrarangsorolom a kezeléseket.
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div className="relative mx-auto aspect-[360/480] w-full max-w-[360px]" onMouseLeave={() => setHover(null)}>
            <svg aria-hidden="true" viewBox="0 0 220 480" className="absolute left-1/2 top-0 h-full -translate-x-1/2">
              {/* Arms: part of the figure, not an area. */}
              <g className="fill-tint stroke-lotus/25" strokeWidth="1.5">
                <path d="M44 122c-8 30-12 70-14 110c0 8 12 10 14 2c6-36 10-72 18-106z" />
                <path d="M176 122c8 30 12 70 14 110c0 8-12 10-14 2c-6-36-10-72-18-106z" />
              </g>
              {AREAS.map((a) => {
                const on = areas.includes(a.id)
                return (
                  <g
                    key={a.id}
                    onClick={() => toggle(a.id)}
                    onMouseEnter={() => setHover(a.id)}
                    strokeWidth="1.5"
                    className={`cursor-pointer transition-[fill,stroke] duration-500 ease-fluid ${
                      on
                        ? 'part-on fill-lotus/80 stroke-lotus'
                        : hover === a.id
                          ? 'fill-lotus/30 stroke-lotus/70'
                          : 'fill-tint stroke-lotus/30'
                    }`}
                  >
                    {SHAPES[a.id]}
                  </g>
                )
              })}
            </svg>

            {AREAS.map((a) => {
              const on = areas.includes(a.id)
              const pin = PIN[a.id]
              return (
                <button
                  key={a.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(a.id)}
                  onMouseEnter={() => setHover(a.id)}
                  onFocus={() => setHover(a.id)}
                  onBlur={() => setHover(null)}
                  style={{ top: pin.top, [pin.side]: 0 }}
                  className={`absolute min-h-[40px] -translate-y-1/2 rounded-full border px-3.5 text-sm shadow-core transition-[background-color,color,border-color,transform] duration-300 ease-fluid active:scale-95 ${
                    on
                      ? 'border-lotus bg-lotus text-paper'
                      : hover === a.id
                        ? 'border-lotus bg-paper text-lotus'
                        : 'border-line bg-paper/85 text-ink'
                  }`}
                >
                  {a.label}
                </button>
              )
            })}
          </div>

          <div>
            <Pills
              legend="Mire vágysz?"
              name="igeny"
              options={NEEDS.map((n) => ({ value: n.id, label: n.label }))}
              value={need}
              onChange={setNeed}
            />

            <div aria-live="polite" className="mt-8 rounded-shell border border-line bg-tint/60 p-7 shadow-core sm:p-9">
              {pick ? (
                <>
                  <div key={pick.id} className="swap-in">
                    <p className="text-sm text-muted">Neked most ezt ajánlom:</p>
                    <h3 className="mt-1 text-[clamp(2rem,4vw,2.75rem)] font-normal leading-tight text-lotus">{pick.name}</h3>
                    <p className="mt-3 max-w-[44ch] leading-relaxed text-ink">{PITCH[pick.id] || pick.desc}</p>
                    <p className="mt-3 text-sm text-muted">
                      {formatDuration(pick.minutes)}, {formatPrice(pick.price)}
                    </p>
                  </div>

                  {/* How all three compare for what was tapped. */}
                  <ul className="mt-7 space-y-3">
                    {ranking.map((r) => {
                      const s = SERVICES.find((x) => x.id === r.id)
                      return (
                        <li key={r.id}>
                          <div className="flex items-baseline justify-between text-sm">
                            <span className={r.id === pick.id ? 'font-semibold text-ink' : 'text-muted'}>{s.name}</span>
                            <span className="tabular-nums text-muted">{r.pct}%</span>
                          </div>
                          <span
                            className={`mt-1.5 block h-1.5 rounded-full transition-[width] duration-700 ease-fluid ${r.id === pick.id ? 'bg-lotus' : 'bg-lotus/35'}`}
                            style={{ width: `${Math.max(r.pct, 2)}%` }}
                          />
                        </li>
                      )
                    })}
                  </ul>

                  <p className="mt-5 text-xs text-muted">
                    Amit jelöltél: {chosen.map((c) => c.label.toLowerCase()).join(', ')}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-5">
                    <button
                      type="button"
                      onClick={() => go(BOOK_EVENT, 'idopont', 'Ajánló: ezt kérem')}
                      className="inline-flex min-h-[52px] items-center rounded-full bg-lotus px-7 text-sm font-semibold text-paper shadow-lift transition-[transform,background-color] duration-500 ease-fluid hover:bg-ink active:scale-[0.98]"
                    >
                      Ezt kérem
                    </button>
                    <button
                      type="button"
                      onClick={() => go(GIFT_EVENT, 'ajandek', 'Ajándékba adnám')}
                      className="min-h-[44px] text-sm font-medium text-lotus underline decoration-lotus/30 underline-offset-4 transition-colors hover:decoration-lotus"
                    >
                      Ajándékba adnám
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAreas([])
                        setNeed(null)
                      }}
                      className="ml-auto min-h-[44px] text-xs text-muted underline underline-offset-4 hover:text-ink"
                    >
                      Újrakezdem
                    </button>
                  </div>
                </>
              ) : (
                <p className="font-display text-2xl italic leading-snug text-muted">
                  Koppints egy testrészre vagy arra, mire vágysz, és itt megjelenik, melyik kezelés illik
                  hozzád a legjobban.
                </p>
              )}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Ez csak kiindulópont, nem orvosi tanács. Ha bizonytalan vagy, kérdezd Brigittát.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
