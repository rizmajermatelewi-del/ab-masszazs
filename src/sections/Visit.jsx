import { BUSINESS } from '../data/business'

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

  /* Without this the wrapper still paints a tinted, 128px-tall empty stripe when
     none of the three blocks has data. check-content.mjs happens to require all
     three fields today, so that stripe cannot reach production -- but that is a
     coincidence between two files, and this section should not depend on it. */
  if (!hasAddress && !BUSINESS.hours.length && !BUSINESS.phone) return null

  return (
    <section id="elerhetoseg" className="border-y border-line bg-tint px-5 py-16 sm:px-8 sm:py-20">
      <h2 className="sr-only">Elérhetőség</h2>
      {/* Two columns, not three: address and telephone stack together on the
          left because they are the same question ("how do I get there, how do I
          reach her"), while the hours table is tall and needs a column of its
          own. A flat three-item grid drops the third block onto a second row and
          leaves half the section empty. */}
      <div className="mx-auto grid max-w-4xl gap-12 sm:grid-cols-2 sm:gap-x-16">
        <div className="flex flex-col gap-12">
          {hasAddress ? (
            <div>
              <h3 className="text-xs uppercase tracking-label text-faint">Cím</h3>
              <p className="mt-4 font-display text-xl leading-snug text-ink">{address}</p>
              {BUSINESS.mapsUrl ? (
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-[44px] items-center text-sm text-clay underline decoration-clay/40 underline-offset-4 transition-colors duration-200 hover:decoration-clay"
                >
                  Megnyitás a térképen
                </a>
              ) : null}
            </div>
          ) : null}

          {BUSINESS.phone ? (
            <div>
              <h3 className="text-xs uppercase tracking-label text-faint">Időpontért</h3>
              {/* Phase 1 has no booking flow. Until Phase 2 replaces this block,
                  the honest call to action is her telephone number. */}
              <a
                href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}
                className="mt-4 inline-flex min-h-[44px] items-center font-display text-xl text-clay underline decoration-clay/40 underline-offset-4 transition-colors duration-200 hover:decoration-clay"
              >
                {BUSINESS.phone}
              </a>
            </div>
          ) : null}
        </div>

        {BUSINESS.hours.length ? (
          <div>
            <h3 className="text-xs uppercase tracking-label text-faint">Nyitvatartás</h3>
            <dl className="mt-4 space-y-2">
              {BUSINESS.hours.map(({ day, opens, closes }) => (
                <div
                  key={day}
                  className="flex items-baseline justify-between gap-6 border-b border-line/70 pb-2 text-ink"
                >
                  <dt>{day}</dt>
                  <dd className="tabular-nums text-muted">{`${opens} – ${closes}`}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </div>
    </section>
  )
}
