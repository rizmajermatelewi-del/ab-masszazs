import { SERVICES } from '../data/services'
import { formatPrice, formatDuration } from '../lib/format'

/* Returns null rather than an empty section while the price list is unknown.
   A heading with nothing under it tells a visitor the site is unfinished, on
   the one page whose job is to look like a real business.

   Set as a price list, not as cards: a row per treatment with the price flush
   right on a hairline rule is how a printed menu does it, it survives a 320px
   phone without turning into a stack of boxes, and it lets the eye scan one
   column of numbers instead of hunting across three tiles. */
export default function Services() {
  if (!SERVICES.length) return null

  return (
    <section id="szolgaltatasok" className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl tracking-tight text-ink sm:text-4xl">Szolgáltatások</h2>

        <ul className="mt-12 border-t border-line">
          {SERVICES.map((service) => (
            <li
              key={service.id}
              className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-line py-6 transition-colors duration-200 hover:bg-tint/50"
            >
              <h3 className="text-lg text-ink sm:text-xl">{service.name}</h3>
              <span className="text-sm text-faint">{formatDuration(service.minutes)}</span>
              <span className="ml-auto font-display text-lg tabular-nums text-clay sm:text-xl">
                {formatPrice(service.price)}
              </span>
              {service.desc ? (
                <p className="w-full max-w-prose text-sm leading-relaxed text-muted">
                  {service.desc}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
