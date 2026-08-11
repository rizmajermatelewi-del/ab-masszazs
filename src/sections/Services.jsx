import { SERVICES } from '../data/services'
import { formatPrice, formatDuration } from '../lib/format'
import Reveal from '../components/Reveal.jsx'

/* Returns null rather than an empty section while the price list is unknown.
   A heading with nothing under it tells a visitor the site is unfinished, on
   the one page whose job is to look like a real business.

   Set as a price list inside a machined tray, not as a row of cards: a line per
   treatment with the price flush right is how a printed menu does it, it
   survives a 320px phone without collapsing into a stack of boxes, and it lets
   the eye run down one column of numbers instead of hunting across three
   tiles. */
export default function Services() {
  if (!SERVICES.length) return null

  return (
    <section id="szolgaltatasok" className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <span className="inline-flex rounded-full border border-ink/[0.08] bg-ink/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-label text-faint">
            Árak
          </span>
          <h2 className="mt-6 text-[clamp(2rem,5vw,3rem)] leading-[1.05] tracking-[-0.02em] text-ink">
            Szolgáltatások
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <div className="rounded-shell border border-ink/[0.06] bg-ink/[0.03] p-1.5 shadow-lift">
            <ul className="rounded-core bg-paper/80 px-5 shadow-core sm:px-8">
              {SERVICES.map((service, index) => (
                <li
                  key={service.id}
                  className={`group flex flex-wrap items-baseline gap-x-5 gap-y-2 py-7 ${
                    index ? 'border-t border-ink/[0.07]' : ''
                  }`}
                >
                  <h3 className="text-lg text-ink transition-transform duration-700 ease-fluid group-hover:translate-x-1 sm:text-xl">
                    {service.name}
                  </h3>
                  <span className="text-sm text-faint">{formatDuration(service.minutes)}</span>
                  <span className="ml-auto font-display text-xl tabular-nums text-clay sm:text-2xl">
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
        </Reveal>
      </div>
    </section>
  )
}
