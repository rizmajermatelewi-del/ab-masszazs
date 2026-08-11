import { BUSINESS } from '../data/business'
import { HERO } from '../data/content'
import ImageReveal from '../components/ImageReveal.jsx'
import BookingButton from '../components/BookingButton.jsx'

/* One viewport, one photograph, one line of type.

   100svh rather than 100vh: on iOS the large viewport unit leaves the hero
   taller than the visible area until the address bar collapses, so the CTA
   parked at the bottom sits under the browser chrome on first paint -- on the
   single most important control of the page.

   The picture is a full-bleed layer with the type over it, not a column beside
   it, and it carries only a light scrim. The brief asks twice for the
   photograph to stay visually important; a heavy overlay is how a hero photo
   quietly becomes a texture.

   No image yet renders a labelled frame instead, which is the whole point of
   the PhotoSlot pattern: the composition is finished, the file is the only
   thing missing.

   The headline's line-height is just over 1 rather than the tight 0.9 that
   display type usually wants. Hungarian is full of descenders (gy, j, p) and
   accents that sit high (ó, ő, í); at 0.9 the tail of "Egy" lands in the
   ascenders of the line below it. The tracking carries the display feel
   instead. */
export default function Hero() {
  return (
    <section id="kezdolap" className="relative isolate flex min-h-[100svh] flex-col">
      <div className="absolute inset-0 -z-10">
        <ImageReveal
          src={HERO.image}
          alt={HERO.imageAlt}
          label="Nyitókép"
          priority
          className="h-full w-full"
        />
        {/* Just enough to hold the type, not enough to flatten the picture. */}
        <div className="absolute inset-0 bg-gradient-to-b from-paper/70 via-paper/30 to-paper/85" />
        {/* A second, horizontal wash under the type, which is left-aligned, and
            gone well before the right edge. One overlay strong enough to carry
            a headline over a busy photograph greys out the entire picture --
            which is exactly how a hero photo becomes a texture. Paying for the
            legibility locally keeps the right half of the image intact. */}
        <div className="absolute inset-0 bg-gradient-to-r from-paper/85 via-paper/45 to-transparent" />
      </div>

      <div className="flex flex-1 items-center px-5 pb-10 pt-28 sm:px-8 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl">
          {/* The eyebrow carries the brand only when the h1 is her headline.
              With no headline the h1 IS the name, and repeating it directly
              above itself is noise on the page and a duplicate for anyone
              reading the document in order. */}
          {HERO.headline ? (
            <p className="text-[10px] font-medium uppercase tracking-label text-clay">
              {BUSINESS.name || 'AB Masszázs'}
            </p>
          ) : null}

          {HERO.headline ? (
            <h1 className="mt-8 max-w-[15ch] text-[clamp(3rem,11vw,8rem)] font-normal leading-[1.02] tracking-[-0.03em] text-ink">
              {HERO.headline}
            </h1>
          ) : (
            /* The name carries the h1 until she writes a line of her own. It is
               the honest fallback and it is also the better one for search:
               "AB Masszázs" plus the town is what people type. */
            <h1 className="mt-8 max-w-[15ch] text-[clamp(3rem,11vw,8rem)] font-normal leading-[1.02] tracking-[-0.03em] text-ink">
              {BUSINESS.name || 'AB Masszázs'}
              {BUSINESS.city ? <span className="block text-clay">{BUSINESS.city}</span> : null}
            </h1>
          )}
        </div>
      </div>

      {/* The two corners the eye ends on: what this is, and how to book it. */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 pb-12 sm:px-8 sm:pb-16 md:flex-row md:items-end md:justify-between">
        <p className="max-w-prose text-base leading-relaxed text-muted">{BUSINESS.tagline}</p>
        <BookingButton />
      </div>
    </section>
  )
}
