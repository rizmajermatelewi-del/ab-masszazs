import { useEffect, useRef, useState } from 'react'
import { BUSINESS } from '../data/business'
import { GALLERY } from '../data/content'
import Reveal from '../components/Reveal.jsx'

/* A column-based masonry rather than a 3x3 grid, so portrait and landscape
   frames can sit together without being cropped to a common square. CSS columns
   do this with no measuring and no layout library.

   The lightbox is a native <dialog>: it brings focus trapping, Escape, the
   backdrop and inert-ing the page behind it for free. A hand-rolled modal is
   where keyboard users get stranded, and it is a lot of code to get wrong. */
export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (openIndex === null) {
      if (dialog.open) dialog.close()
    } else if (!dialog.open && typeof dialog.showModal === 'function') {
      dialog.showModal()
    }
  }, [openIndex])

  if (!GALLERY.length) return null

  const current = openIndex === null ? null : GALLERY[openIndex]

  return (
    <section id="galeria" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[10px] font-medium uppercase tracking-label text-faint">Galéria</p>
          <h2 className="mt-6 text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.02em] text-ink">
            Pillanatok
          </h2>
        </Reveal>

        <div className="mt-14 gap-4 [column-count:1] sm:[column-count:2] lg:[column-count:3]">
          {GALLERY.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-core"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="w-full transition-transform duration-[900ms] ease-fluid group-hover:scale-[1.04]"
              />
            </button>
          ))}
        </div>

        {BUSINESS.instagram ? (
          <a
            href={BUSINESS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex min-h-[44px] items-center text-sm text-clay underline decoration-clay/30 underline-offset-4 transition-colors duration-700 ease-fluid hover:decoration-clay"
          >
            További pillanatok Instagramon
          </a>
        ) : null}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onClick={(event) => {
          /* Clicking the backdrop closes it. The <dialog> element itself fills
             the viewport, so a click landing on it rather than on the image is
             a click outside the picture. */
          if (event.target === dialogRef.current) setOpenIndex(null)
        }}
        className="max-h-[90svh] max-w-[92vw] bg-transparent backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
      >
        {current ? (
          <figure className="m-0">
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[80svh] w-auto rounded-core object-contain"
            />
            <figcaption className="mt-3 text-center text-xs text-paper/80">{current.alt}</figcaption>
          </figure>
        ) : null}
        <button
          type="button"
          onClick={() => setOpenIndex(null)}
          aria-label="Bezárás"
          className="absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-full bg-paper/90 text-ink"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
      </dialog>
    </section>
  )
}
