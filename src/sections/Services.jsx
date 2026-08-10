import { SERVICES } from '../data/services'
import { formatPrice, formatDuration } from '../lib/format'

/* Returns null rather than an empty section while the price list is unknown.
   A heading with nothing under it tells a visitor the site is unfinished, on
   the one page whose job is to look like a real business. */
export default function Services() {
  if (!SERVICES.length) return null

  return (
    <section id="szolgaltatasok" className="px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          Szolgáltatások
        </h2>

        <ul className="mt-10 divide-y divide-stone-200 border-t border-stone-200">
          {SERVICES.map((service) => (
            <li key={service.id} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-5">
              <h3 className="text-lg font-medium text-stone-900">{service.name}</h3>
              <span className="text-sm text-stone-500">{formatDuration(service.minutes)}</span>
              <span className="ml-auto text-lg tabular-nums text-stone-900">
                {formatPrice(service.price)}
              </span>
              {service.desc ? (
                <p className="w-full text-sm leading-relaxed text-stone-600">{service.desc}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
