import { useState } from 'react'
import { SERVICES } from '../data/services'
import { formatPrice, formatDuration } from '../lib/format'
import PhotoSlot from '../components/PhotoSlot.jsx'
import Reveal from '../components/Reveal.jsx'

/* A list on the left, one large photograph on the right that follows whichever
   treatment you are pointing at. Not a card grid: three tiles side by side turn
   a price list into a pricing table, and this is a menu.

   The photograph is sticky rather than repeated per row, so a visitor scanning
   durations and prices never loses it, and the crossfade between images is the
   only motion in the section.

   Mobile does not inherit any of this. There is no hover on a phone, so the
   photograph moves inline above each treatment and the row becomes a plain tap
   target -- the brief is explicit that mobile gets its own art direction rather
   than a shrunken copy. */
export default function Services() {
  const [active, setActive] = useState(0)
  const hasPhoto = SERVICES.some((service) => service.image)

  if (!SERVICES.length) return null

  return (
    <section id="szolgaltatasok" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[10px] font-medium uppercase tracking-label text-faint">Masszázsok</p>
          <h2 className="mt-6 max-w-[12ch] text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.02em] text-ink">
            Amit kérni tudsz
          </h2>
        </Reveal>

        <div className={`mt-16 grid gap-12 ${hasPhoto ? 'md:grid-cols-[1.2fr_1fr] md:gap-16' : ''}`}>
          <ul className="border-t border-ink/[0.08]">
            {SERVICES.map((service, index) => (
              <li
                key={service.id}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="group border-b border-ink/[0.08]"
              >
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-5 gap-y-2 py-8 transition-[padding] duration-700 ease-fluid md:group-hover:pl-3">
                  <span className="font-display text-xs tabular-nums text-clay">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl leading-tight text-ink sm:text-3xl">{service.name}</h3>
                  <div className="flex items-baseline gap-5">
                    <span className="text-sm text-faint">{formatDuration(service.minutes)}</span>
                    <span className="font-display text-xl tabular-nums text-clay sm:text-2xl">
                      {formatPrice(service.price)}
                    </span>
                  </div>

                  {/* The photograph rides with the row on a phone, where the
                      sticky column on the right does not exist -- but only when
                      there IS one. An empty labelled frame under every single
                      treatment is a column of grey boxes, and the frame's label
                      would repeat the heading directly above it. */}
                  {service.image ? (
                    <div className="col-span-3 md:hidden">
                      <div className="aspect-[4/3] overflow-hidden rounded-core">
                        <PhotoSlot src={service.image} alt={service.imageAlt} label="" />
                      </div>
                    </div>
                  ) : null}

                  {service.desc ? (
                    <p className="col-start-2 max-w-prose text-sm leading-relaxed text-muted">
                      {service.desc}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>

          {hasPhoto ? <div className="hidden md:block">
            <div className="sticky top-28">
              <div className="relative aspect-[3/4] overflow-hidden rounded-shell">
                {SERVICES.map((service, index) => (
                  <div
                    key={service.id}
                    aria-hidden={index !== active}
                    className={`absolute inset-0 transition-opacity duration-700 ease-fluid ${
                      index === active ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {/* Generic label: the treatment's name is already in the
                        list beside this frame, and echoing it inside the
                        placeholder reads as a caption for a photo that is not
                        there. */}
                    <PhotoSlot src={service.image} alt={service.imageAlt} label="Kezelés" />
                  </div>
                ))}
              </div>
            </div>
          </div> : null}
        </div>
      </div>
    </section>
  )
}
