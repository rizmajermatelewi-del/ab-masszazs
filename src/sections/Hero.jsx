import { BUSINESS } from '../data/business'
import PhotoSlot from '../components/PhotoSlot.jsx'
import Reveal from '../components/Reveal.jsx'

/* Editorial split: the type carries the left half, and the right half is the
   frame her portrait will occupy.

   Reserving that space now is the point. She has no photograph, and a stock
   massage image is the fastest way to make a real salon look like a template
   (spec §5) -- so the slot renders as a deliberate, machined empty frame until
   the day she supplies a file, and filling it is a data edit rather than a
   redesign.

   The town sits above the name as an eyebrow, because "masszázs [település]"
   is what people actually type. */
export default function Hero() {
  const tel = BUSINESS.phone ? `tel:${BUSINESS.phone.replace(/\s/g, '')}` : null

  return (
    <section className="px-4 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-24">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1.15fr_1fr] md:gap-16">
        <Reveal>
          {BUSINESS.city ? (
            <span className="inline-flex rounded-full border border-clay/20 bg-clay/[0.06] px-3 py-1 text-[10px] font-medium uppercase tracking-label text-clay">
              {BUSINESS.city}
            </span>
          ) : null}

          <h1 className="mt-6 text-[clamp(2.75rem,9vw,4.5rem)] leading-[0.95] tracking-[-0.02em] text-ink">
            {BUSINESS.name || 'AB Masszázs'}
          </h1>

          <div className="mt-8 h-px w-16 bg-clay/40" />

          {BUSINESS.tagline ? (
            <p className="mt-8 max-w-prose text-lg leading-relaxed text-muted">
              {BUSINESS.tagline}
            </p>
          ) : null}

          {/* Phase 1 has no booking form, so the honest primary action is the
              telephone -- and it is the only primary action on the page. */}
          {tel ? (
            <a
              href={tel}
              className="group mt-10 inline-flex min-h-[56px] items-center gap-4 rounded-full bg-clay py-2 pl-7 pr-2 text-white shadow-lift transition-[transform,box-shadow] duration-700 ease-fluid hover:shadow-liftHover active:scale-[0.98]"
            >
              <span className="text-sm font-medium">{`Időpontért: ${BUSINESS.phone}`}</span>
              <span
                aria-hidden="true"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 transition-transform duration-700 ease-fluid group-hover:-translate-y-[1px] group-hover:translate-x-1 group-hover:scale-105"
              >
                {/* Hairline stroke, drawn inline: one glyph does not justify an
                    icon dependency, and this way its weight matches the rules
                    used everywhere else on the page. */}
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.25">
                  <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ) : null}
        </Reveal>

        {/* Double bezel: a tray with its own hairline, holding a plate with its
            own inner highlight, radii concentric so the curves stay parallel. */}
        <Reveal delay={140} className="hidden md:block">
          <div className="rounded-shell border border-ink/[0.06] bg-ink/[0.03] p-1.5 shadow-lift">
            <div className="aspect-[4/5] overflow-hidden rounded-core shadow-core">
              <PhotoSlot src="" alt="" label="Kezelőszoba" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
