import { useState } from 'react'
import { SERVICES } from '../data/services'
import { AREAS, NEEDS, recommend } from '../data/recommend'
import { formatPrice, formatDuration } from '../lib/format'
import BookingButton from '../components/BookingButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { Pills } from '../components/Form.jsx'

/* "Which one is for me?" Many visitors have never heard of Yumeiho, so the
   menu alone does not help them choose. Tap where it feels tight, pick what
   you want from the hour, and the suggestion updates on the spot; from there
   one button books it and one turns it into a gift.

   The figure is decoration for sighted mouse users; the labelled toggle
   buttons beside it are the real controls, so keyboard and screen-reader
   users get the same thing. */

// Where each label sits beside the figure (top %, side).
const PIN = {
  nyak: { top: '17%', side: 'right' },
  hat: { top: '33%', side: 'left' },
  derek: { top: '52%', side: 'right' },
  lab: { top: '72%', side: 'left' },
  talp: { top: '93%', side: 'right' },
}

export const GIFT_EVENT = 'ab:ajandek'

export default function Recommender() {
  const [areas, setAreas] = useState([])
  const [need, setNeed] = useState(null)

  if (SERVICES.length < 2) return null

  const toggle = (id) => setAreas((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]))
  const pickId = recommend(areas, need, SERVICES)
  const pick = SERVICES.find((s) => s.id === pickId)
  const reasons = [...AREAS.filter((a) => areas.includes(a.id)), ...NEEDS.filter((n) => n.id === need)]

  function gift() {
    window.dispatchEvent(new CustomEvent(GIFT_EVENT, { detail: pickId }))
    document.getElementById('ajandek')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="ajanlo" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-[16ch] text-[clamp(2.25rem,5.5vw,4rem)] font-normal leading-[1.05] text-ink">
            Melyik masszázs <em className="text-lotus">illik hozzád?</em>
          </h2>
          <p className="mt-5 max-w-[46ch] leading-relaxed text-muted">
            Jelöld meg, hol érzed a feszültséget, és mire vágysz. Az ajánlás azonnal frissül.
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          {/* Figure with labelled toggles */}
          <div className="relative mx-auto aspect-[340/420] w-full max-w-[340px]">
            <svg
              aria-hidden="true"
              viewBox="0 0 200 420"
              className="absolute left-1/2 top-0 h-full -translate-x-1/2"
            >
              <g className="fill-tint stroke-lotus/30" strokeWidth="1.5">
                <circle cx="100" cy="38" r="24" />
                <rect x="26" y="100" width="20" height="130" rx="10" />
                <rect x="154" y="100" width="20" height="130" rx="10" />
              </g>
              <Part id="nyak" on={areas} toggle={toggle}>
                <path d="M86 62h28v10q30 4 44 20q6 8-2 12H44q-8-4-2-12q14-16 44-20z" />
              </Part>
              <Part id="hat" on={areas} toggle={toggle}>
                <rect x="52" y="106" width="96" height="90" rx="18" />
              </Part>
              <Part id="derek" on={areas} toggle={toggle}>
                <rect x="54" y="199" width="92" height="44" rx="16" />
              </Part>
              <Part id="lab" on={areas} toggle={toggle}>
                <rect x="60" y="246" width="37" height="136" rx="16" />
                <rect x="103" y="246" width="37" height="136" rx="16" />
              </Part>
              <Part id="talp" on={areas} toggle={toggle}>
                <ellipse cx="78" cy="398" rx="23" ry="10" />
                <ellipse cx="122" cy="398" rx="23" ry="10" />
              </Part>
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
                  style={{ top: pin.top, [pin.side]: 0 }}
                  className={`absolute min-h-[40px] -translate-y-1/2 rounded-full border px-3.5 text-sm transition-[background-color,color,border-color,transform] duration-300 ease-fluid active:scale-95 ${
                    on
                      ? 'border-lotus bg-lotus text-paper'
                      : 'border-line bg-paper/80 text-ink hover:border-lotus/60'
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

            <div aria-live="polite" className="mt-10 rounded-shell border border-line bg-tint/60 p-8 shadow-core sm:p-10">
              {pick ? (
                <div key={pick.id} className="swap-in">
                  <p className="text-sm text-muted">Neked most ezt ajánlom:</p>
                  <h3 className="mt-2 text-[clamp(2rem,4vw,2.75rem)] font-normal leading-tight text-lotus">
                    {pick.name}
                  </h3>
                  <p className="mt-3 max-w-[40ch] leading-relaxed text-ink">{pick.desc}</p>
                  <p className="mt-4 text-sm text-muted">
                    {formatDuration(pick.minutes)}, {formatPrice(pick.price)}
                  </p>
                  <p className="mt-4 text-sm text-muted">
                    Mert ezt jelölted: {reasons.map((r) => r.label.toLowerCase()).join(', ')}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <BookingButton />
                    <button
                      type="button"
                      onClick={gift}
                      className="min-h-[44px] text-sm font-medium text-lotus underline decoration-lotus/30 underline-offset-4 transition-colors hover:decoration-lotus"
                    >
                      Ajándékba adnám
                    </button>
                  </div>
                </div>
              ) : (
                <p className="font-display text-2xl italic leading-snug text-muted">
                  Jelölj meg egy testrészt vagy azt, mire vágysz, és itt megjelenik, melyik kezelést ajánlom.
                </p>
              )}
              {areas.length || need ? (
                <button
                  type="button"
                  onClick={() => {
                    setAreas([])
                    setNeed(null)
                  }}
                  className="mt-6 min-h-[44px] text-xs text-muted underline underline-offset-4 hover:text-ink"
                >
                  Újrakezdem
                </button>
              ) : null}
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

/* One clickable region of the figure. It fills with plum when chosen. */
function Part({ id, on, toggle, children }) {
  const active = on.includes(id)
  return (
    <g
      onClick={() => toggle(id)}
      strokeWidth="1.5"
      className={`cursor-pointer transition-[fill,stroke] duration-500 ease-fluid ${
        active ? 'fill-lotus/75 stroke-lotus' : 'fill-tint stroke-lotus/30 hover:fill-lotus/20'
      }`}
    >
      {children}
    </g>
  )
}
