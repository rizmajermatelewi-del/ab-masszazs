import { EXPERIENCE_STEPS } from '../data/content'
import Reveal from '../components/Reveal.jsx'

/* What actually happens during a visit, as a sticky column beside a scrolling
   list: the heading holds still while the steps move past it, which is the one
   place on this page where scroll position carries meaning rather than
   decoration.

   Empty until she describes her own process. A generated
   "megérkezés → ráhangolódás → feltöltődve távozol" reads plausible and is
   fiction, and it is the single most template-shaped thing this page could say. */
export default function Experience() {
  if (!EXPERIENCE_STEPS.length) return null

  return (
    <section id="elmeny" className="border-y border-line bg-tint px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1fr_1.3fr] md:gap-20">
        <div>
          <div className="md:sticky md:top-32">
            <p className="text-[10px] font-medium uppercase tracking-label text-faint">Az élmény</p>
            <h2 className="mt-6 max-w-[10ch] text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em] text-ink">
              Nem csak egy masszázs
            </h2>
          </div>
        </div>

        <ol className="border-t border-ink/[0.08]">
          {EXPERIENCE_STEPS.map((step, index) => (
            <li key={step.title} className="border-b border-ink/[0.08]">
              <Reveal delay={index * 60}>
                <div className="flex gap-6 py-9 sm:gap-10">
                  <span className="font-display text-2xl tabular-nums leading-none text-clay/70 sm:text-3xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-xl text-ink sm:text-2xl">{step.title}</h3>
                    {step.text ? (
                      <p className="mt-3 max-w-prose leading-relaxed text-muted">{step.text}</p>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
