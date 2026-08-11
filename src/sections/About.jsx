import { ABOUT } from '../data/content'
import ImageReveal from '../components/ImageReveal.jsx'
import Reveal from '../components/Reveal.jsx'

/* Asymmetric on purpose: a tall portrait holding the left third against a
   narrow column of text, rather than two equal halves. Equal halves are what
   makes an "about" section look like a template slide.

   The text is absent until she writes it in her own words. A generated
   "passionate about wellness" paragraph is the most obvious tell of a template
   site, and she is the only person who can say why someone should lie on her
   table. */
export default function About() {
  if (!ABOUT.text) return null

  return (
    <section id="rolam" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-end gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <ImageReveal
          src={ABOUT.image}
          alt={ABOUT.imageAlt}
          label="Portré"
          className="aspect-[3/4] rounded-shell"
        />

        <Reveal delay={80}>
          <p className="text-[10px] font-medium uppercase tracking-label text-faint">Rólam</p>
          <div className="mt-6 max-w-prose whitespace-pre-line text-lg leading-relaxed text-muted">
            {ABOUT.text}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
