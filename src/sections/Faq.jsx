import { FAQ } from '../data/content'
import Reveal from '../components/Reveal.jsx'

/* Native <details>/<summary> rather than a hand-built accordion. It is
   keyboard-operable, announced correctly by screen readers, works before
   hydration and needs no state and no library -- the brief allows Radix for
   accessibility-heavy components, but this component is already in the
   platform, so pulling in a dependency for it would be paying for something
   the browser gives away.

   The smooth open uses a grid-rows 0fr → 1fr transition, which is how you
   animate to an unknown height without measuring anything in JavaScript. */
export default function Faq() {
  if (!FAQ.length) return null

  return (
    <section id="gyik" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.6fr] md:gap-20">
        <Reveal>
          <p className="text-[10px] font-medium uppercase tracking-label text-faint">GYIK</p>
          <h2 className="mt-6 max-w-[10ch] text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.98] tracking-[-0.02em] text-ink">
            Gyakori kérdések
          </h2>
        </Reveal>

        <div className="border-t border-ink/[0.08]">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="group border-b border-ink/[0.08]">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                {q}
                <span aria-hidden="true" className="relative grid h-6 w-6 shrink-0 place-items-center">
                  <span className="absolute h-px w-3.5 bg-clay" />
                  <span className="absolute h-px w-3.5 rotate-90 bg-clay transition-transform duration-500 ease-fluid group-open:rotate-0" />
                </span>
              </summary>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-fluid group-open:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="max-w-prose pb-6 leading-relaxed text-muted">{a}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
