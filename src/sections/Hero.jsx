import { BUSINESS } from '../data/business'

/* No hero photograph, by design. She has none, and a stock massage image is the
   fastest way to make a real salon look like a template (spec §5). Type and
   space carry it instead: a serif name at display size, a rule, and one line of
   her own words.

   The town sits ABOVE the name as an eyebrow rather than below it, because
   "masszázs [település]" is what people actually type and it should be the
   first thing the eye lands on after the name itself. */
export default function Hero() {
  return (
    <section className="px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
      <div className="mx-auto max-w-4xl">
        {BUSINESS.city ? (
          <p className="mb-5 text-xs uppercase tracking-label text-clay">{BUSINESS.city}</p>
        ) : null}

        <h1 className="text-[2.75rem] leading-[1.05] tracking-tight text-ink sm:text-7xl">
          {BUSINESS.name || 'AB Masszázs'}
        </h1>

        <div className="mt-8 h-px w-16 bg-clay/40" />

        {BUSINESS.tagline ? (
          <p className="mt-8 max-w-prose text-lg leading-relaxed text-muted sm:text-xl">
            {BUSINESS.tagline}
          </p>
        ) : null}

        {/* Phase 1 has no booking form, so the honest primary action is the
            telephone. One CTA only -- the nav already carries the rest. */}
        {BUSINESS.phone ? (
          <a
            href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}
            className="mt-10 inline-flex min-h-[44px] items-center rounded-full bg-clay px-7 text-sm font-medium text-white shadow-sm transition-[transform,box-shadow] duration-200 hover:shadow-md active:scale-[0.98]"
          >
            {`Időpontért: ${BUSINESS.phone}`}
          </a>
        ) : null}
      </div>
    </section>
  )
}
