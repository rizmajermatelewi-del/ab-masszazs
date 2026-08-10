import { BUSINESS } from '../data/business'

/* No hero photograph, by design. She has none, and a stock massage image is the
   fastest way to make a real salon look like a template (spec §5). Type and
   space carry it instead. */
export default function Hero() {
  return (
    <section className="px-5 pb-16 pt-10 sm:pb-24 sm:pt-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-6xl">
          {BUSINESS.name || 'AB Masszázs'}
        </h1>
        {BUSINESS.tagline ? (
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">{BUSINESS.tagline}</p>
        ) : null}
        {BUSINESS.city ? (
          <p className="mt-4 text-sm uppercase tracking-widest text-stone-500">{BUSINESS.city}</p>
        ) : null}
      </div>
    </section>
  )
}
