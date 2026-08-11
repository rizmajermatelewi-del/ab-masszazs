import PhotoSlot from '../components/PhotoSlot.jsx'

/* The text is deliberately absent until she writes it in her own words. A
   generated "passionate about wellness" paragraph is the most obvious tell of a
   template site, and she is the only person who can say why someone should lie
   on her table. */
export const ABOUT_TEXT = ''

export default function About() {
  if (!ABOUT_TEXT) return null

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-4xl items-center gap-12 sm:grid-cols-[2fr_1fr] sm:gap-x-16">
        <div>
          <h2 className="text-3xl tracking-tight text-ink sm:text-4xl">Rólam</h2>
          <p className="mt-8 max-w-prose whitespace-pre-line leading-relaxed text-muted">
            {ABOUT_TEXT}
          </p>
        </div>
        <div className="aspect-[3/4] overflow-hidden rounded-2xl">
          <PhotoSlot src="" alt="" label="Portré" />
        </div>
      </div>
    </section>
  )
}
