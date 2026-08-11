import { TESTIMONIALS } from '../data/content'
import Reveal from '../components/Reveal.jsx'

/* One review set large, the rest quieter beneath it.

   The array is empty and stays empty until real reviews exist. This is the one
   section where inventing content is not a design shortcut but a fabricated
   endorsement from a named person, so there is no placeholder mode and no
   "example" copy to accidentally ship -- the section simply does not exist yet. */
export default function Testimonials() {
  if (!TESTIMONIALS.length) return null

  const [lead, ...rest] = TESTIMONIALS

  return (
    <section id="velemenyek" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[10px] font-medium uppercase tracking-label text-faint">Vélemények</p>

          <figure className="mt-10">
            <blockquote>
              <p className="max-w-[20ch] font-display text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-ink">
                {lead.quote}
              </p>
            </blockquote>
            {lead.name ? (
              <figcaption className="mt-6 text-sm uppercase tracking-label text-clay">
                {lead.name}
              </figcaption>
            ) : null}
          </figure>
        </Reveal>

        {rest.length ? (
          <div className="mt-16 grid gap-x-16 gap-y-10 border-t border-ink/[0.08] pt-12 sm:grid-cols-2">
            {rest.map((item, index) => (
              <Reveal key={item.quote} delay={index * 70}>
                <figure>
                  <blockquote>
                    <p className="max-w-prose leading-relaxed text-muted">{item.quote}</p>
                  </blockquote>
                  {item.name ? (
                    <figcaption className="mt-3 text-xs uppercase tracking-label text-faint">
                      {item.name}
                    </figcaption>
                  ) : null}
                </figure>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
