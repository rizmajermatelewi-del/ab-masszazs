import PhotoSlot from '../components/PhotoSlot.jsx'

/* The text is deliberately absent until she writes it in her own words. A
   generated "passionate about wellness" paragraph is the most obvious tell of a
   template site, and she is the only person who can say why someone should lie
   on her table. */
export const ABOUT_TEXT = ''

export default function About() {
  if (!ABOUT_TEXT) return null

  return (
    <section className="px-5 py-16 sm:py-24">
      <div className="mx-auto grid max-w-3xl items-center gap-10 sm:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-stone-900">Rólam</h2>
          <p className="mt-6 whitespace-pre-line leading-relaxed text-stone-600">{ABOUT_TEXT}</p>
        </div>
        <div className="aspect-[3/4] overflow-hidden rounded-3xl">
          <PhotoSlot src="" alt="" label="Portré" />
        </div>
      </div>
    </section>
  )
}
