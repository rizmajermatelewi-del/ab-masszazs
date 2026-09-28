import { EXPERIENCE_STEPS } from '../data/content'
import Reveal from '../components/Reveal.jsx'

/* "First time? This is how it goes." For someone who has never had a
   massage, the unknown is the obstacle, so the visit is laid out as a path.
   The plum line draws itself down the steps as the section scrolls past
   (CSS scroll-driven animation, .exp-fill in index.css); browsers without it,
   and reduced motion, get the finished line.

   The steps are FILLER until Brigitta rewrites them (content.js). */
export default function Experience() {
  if (!EXPERIENCE_STEPS.length) return null

  return (
    <section id="elmeny" className="border-y border-line bg-tint/60 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1fr_1.3fr] md:gap-20">
        <div>
          <div className="md:sticky md:top-32">
            <h2 className="max-w-[12ch] text-[clamp(2.25rem,5vw,4rem)] font-normal leading-[1.05] text-ink">
              Első alkalom? <em className="text-lotus">Így zajlik</em>
            </h2>
            <p className="mt-5 max-w-[36ch] leading-relaxed text-muted">
              Nem kell tudnod, mit kérj. Megbeszéljük, és mindig szólhatsz, ha valami nem kényelmes.
            </p>
          </div>
        </div>

        <ol className="relative">
          <span aria-hidden="true" className="absolute bottom-10 left-[19px] top-10 w-px bg-line" />
          <span aria-hidden="true" className="exp-fill absolute bottom-10 left-[19px] top-10 w-px origin-top bg-lotus" />
          {EXPERIENCE_STEPS.map((step, index) => (
            <li key={step.title} className="relative">
              <Reveal delay={index * 80}>
                <div className="flex gap-6 py-7 sm:gap-8">
                  <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-lotus/60 bg-paper font-display text-lg text-lotus">
                    {index + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-2xl font-normal text-ink">{step.title}</h3>
                    {step.text ? <p className="mt-2 max-w-prose leading-relaxed text-muted">{step.text}</p> : null}
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
