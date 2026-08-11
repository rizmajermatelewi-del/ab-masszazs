import { USP } from '../data/content'
import Reveal from '../components/Reveal.jsx'

/* Deliberately not icon cards. A row of little pictograms above three
   interchangeable phrases is the most recognisable shape on the internet, and
   the brief bans it by name twice. Numbered type on rules says the same thing
   and looks like it was set rather than assembled. */
export default function Usp() {
  if (!USP.length) return null

  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <dl className="grid gap-x-16 gap-y-12 border-t border-ink/[0.08] pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {USP.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <div>
                <span className="font-display text-xs tabular-nums text-clay">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <dt className="mt-4 font-display text-xl text-ink">{item.title}</dt>
                {item.text ? (
                  <dd className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
                    {item.text}
                  </dd>
                ) : null}
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
