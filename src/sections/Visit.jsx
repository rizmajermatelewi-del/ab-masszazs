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

  return (
    <section id="elerhetoseg" className="bg-stone-50 px-5 py-16 sm:py-24">
      <div className="mx-auto grid max-w-3xl gap-10 sm:grid-cols-2">
        {hasAddress ? (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500">Cím</h2>
            <p className="mt-3 text-lg text-stone-900">{address}</p>
            {BUSINESS.mapsUrl ? (
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm underline underline-offset-4"
              >
                Megnyitás a térképen
              </a>
            ) : null}
          </div>
        ) : null}

        {BUSINESS.hours.length ? (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500">
              Nyitvatartás
            </h2>
            <dl className="mt-3 space-y-1">
              {BUSINESS.hours.map(({ day, opens, closes }) => (
                <div key={day} className="flex justify-between gap-6 text-stone-900">
                  <dt>{day}</dt>
                  <dd className="tabular-nums">{`${opens} – ${closes}`}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {BUSINESS.phone ? (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500">
              Időpontért
            </h2>
            {/* Phase 1 has no booking flow. Until Phase 2 replaces this block,
                the honest call to action is her telephone number. */}
            <a
              href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}
              className="mt-3 inline-block text-lg text-stone-900 underline underline-offset-4"
            >
              {BUSINESS.phone}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  )
}
