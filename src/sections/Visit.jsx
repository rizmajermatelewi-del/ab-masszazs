import { useEffect, useState } from 'react'
import { BUSINESS } from '../data/business'
import { openStatus } from '../lib/openStatus'
import Reveal from '../components/Reveal.jsx'

/* The section a local searcher actually came for: where, when, and the number
   to ring. Every block is conditional because these facts arrive at different
   times, and a heading over a blank is worse than no heading.

   The map is a link, not an embedded iframe. An embed sets third-party cookies,
   which would put a consent banner on a site that otherwise needs none (spec
   §7), and it costs a large third-party script on a page whose whole argument
   is that it loads fast. */
export default function Visit() {
  const hasAddress = Boolean(BUSINESS.street && BUSINESS.city)
  const address = `${BUSINESS.postalCode} ${BUSINESS.city}, ${BUSINESS.street}`.trim()
  /* Computed in the browser only: the prerendered HTML is built once and
     would otherwise say "open" or "closed" as of the build. Refreshed each
     minute for a page left open. */
  const [status, setStatus] = useState('')
  useEffect(() => {
    const update = () => setStatus(openStatus(BUSINESS.hours))
    update()
    const t = setInterval(update, 60_000)
    return () => clearInterval(t)
  }, [])

  /* Without this the wrapper still paints a tinted, tall empty band when none
     of the three blocks has data. check-content.mjs happens to require all
     three fields today, so that band cannot reach production -- but that is a
     coincidence between two files, and this section should not depend on it. */
  if (!hasAddress && !BUSINESS.hours.length && !BUSINESS.phone) return null

  return (
    <section id="elerhetoseg" className="px-4 py-24 sm:px-8 sm:py-32">
      <h2 className="sr-only">Elérhetőség</h2>

      {/* Two columns, not three: address and telephone belong together because
          they answer the same question, while the hours table is tall and needs
          a column of its own. A flat three-item grid drops the third block onto
          a second row and leaves half the section empty. */}
      <Reveal className="mx-auto max-w-5xl">
        <div className="rounded-shell border border-ink/[0.06] bg-ink/[0.03] p-1.5 shadow-lift">
          <div className="grid gap-12 rounded-core bg-tint/70 p-8 shadow-core sm:grid-cols-2 sm:gap-x-16 sm:p-12">
            <div className="flex flex-col gap-12">
              {hasAddress ? (
                <div>
                  <h3 className="font-sans text-[11px] font-semibold uppercase tracking-label text-faint">
                    Cím
                  </h3>
                  <p className="mt-4 font-display text-xl leading-snug text-ink">{address}</p>
                  {BUSINESS.mapsUrl ? (
                    <a
                      href={BUSINESS.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-3 inline-flex min-h-[44px] items-center gap-2 text-sm text-lotus"
                    >
                      <span className="underline decoration-lotus/30 underline-offset-4 transition-colors duration-700 ease-fluid group-hover:decoration-lotus">
                        Megnyitás a térképen
                      </span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5 transition-transform duration-700 ease-fluid group-hover:-translate-y-[1px] group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.25"
                      >
                        <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ) : null}
                </div>
              ) : null}

              {BUSINESS.phone ? (
                <div>
                  <h3 className="font-sans text-[11px] font-semibold uppercase tracking-label text-faint">
                    Időpontért
                  </h3>
                  {/* Phase 1 has no booking flow. Until Phase 2 replaces this
                      block, the honest call to action is her telephone number. */}
                  <a
                    href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}
                    data-umami-event="Telefonszám"
                    className="mt-4 inline-flex min-h-[44px] items-center font-display text-2xl text-lotus underline decoration-lotus/30 underline-offset-[6px] transition-colors duration-700 ease-fluid hover:decoration-lotus"
                  >
                    {BUSINESS.phone}
                  </a>
                  {BUSINESS.messenger ? (
                    <a
                      href={BUSINESS.messenger}
                      data-umami-event="Messenger"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex min-h-[44px] items-center text-sm text-lotus underline decoration-lotus/30 underline-offset-4 transition-colors duration-700 ease-fluid hover:decoration-lotus"
                    >
                      vagy írj Messengeren
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>

            {BUSINESS.hours.length ? (
              <div>
                <h3 className="font-sans text-[11px] font-semibold uppercase tracking-label text-faint">
                  Nyitvatartás
                </h3>
                {/* Polite live region: a page left open updates each minute. */}
                <p aria-live="polite" className="mt-3 min-h-[1.5rem] text-sm font-medium text-lotus">
                  {status}
                </p>
                <dl className="mt-2">
                  {BUSINESS.hours.map(({ day, opens, closes }, index) => (
                    <div
                      key={day}
                      className={`flex items-baseline justify-between gap-6 py-2.5 text-ink ${
                        index ? 'border-t border-ink/[0.07]' : ''
                      }`}
                    >
                      <dt>{day}</dt>
                      <dd className="tabular-nums text-muted">{`${opens} – ${closes}`}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
