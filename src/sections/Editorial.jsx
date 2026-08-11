import { EDITORIAL } from '../data/content'
import ImageReveal from '../components/ImageReveal.jsx'

/* One near-full-height photograph with a single sentence set over it. The page
   needs one moment that is only a picture and a thought, between two sections
   that are both lists.

   Requires the sentence, not the picture: the quote over a labelled empty frame
   still reads as a deliberate composition, whereas a photograph with no line on
   it is just a gap. */
export default function Editorial() {
  if (!EDITORIAL.quote) return null

  return (
    <section className="relative isolate flex min-h-[80svh] items-end px-5 py-24 sm:px-8 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <ImageReveal
          src={EDITORIAL.image}
          alt={EDITORIAL.imageAlt}
          label="Hangulatkép"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper/90 via-paper/50 to-paper/20" />
      </div>

      <blockquote className="mx-auto w-full max-w-6xl">
        <p className="max-w-[18ch] font-display text-[clamp(2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-ink">
          {EDITORIAL.quote}
        </p>
      </blockquote>
    </section>
  )
}
