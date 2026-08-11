import { useEffect, useState } from 'react'
import { BUSINESS } from '../data/business'
import { visibleSections } from '../data/navigation'
import BookingButton from '../components/BookingButton.jsx'

/* Transparent over the hero, then a paper wash and a hairline once the page has
   moved. It compacts rather than changing shape, so nothing under it jumps.

   The links come from visibleSections(), never from a list written here: every
   section on this page removes itself while its content is missing, and a
   hand-kept menu would keep pointing at the ones that are gone. */
export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sections = visibleSections()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    /* passive: this listener only reads scrollY and never calls
       preventDefault, so telling the browser that keeps it off the
       scroll-blocking path. */
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-[background-color,border-color,padding] duration-700 ease-fluid ${
        scrolled
          ? 'border-b border-line/70 bg-paper/80 py-1 backdrop-blur-xl'
          : 'border-b border-transparent py-3'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <a
          href="#kezdolap"
          className="relative z-10 inline-flex min-h-[44px] items-center font-display text-base tracking-tight text-ink"
        >
          {BUSINESS.name || 'AB Masszázs'}
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="group inline-flex min-h-[44px] items-center text-sm text-muted transition-colors duration-500 ease-fluid hover:text-ink"
            >
              <span className="relative">
                {label}
                {/* Underline grows from the left rather than fading in, so the
                    hover reads as a direction instead of a state change. */}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-clay transition-transform duration-500 ease-fluid group-hover:scale-x-100" />
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <BookingButton variant="compact" className="hidden sm:inline-flex" />

          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? 'Menü bezárása' : 'Menü megnyitása'}
            onClick={() => setOpen((value) => !value)}
            className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink/[0.05] transition-transform duration-500 ease-fluid active:scale-95 lg:hidden"
          >
            <span
              className={`absolute h-px w-4 bg-ink transition-transform duration-500 ease-fluid ${
                open ? 'rotate-45' : '-translate-y-[3px]'
              }`}
            />
            <span
              className={`absolute h-px w-4 bg-ink transition-transform duration-500 ease-fluid ${
                open ? '-rotate-45' : 'translate-y-[3px]'
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 -z-10 bg-paper/95 backdrop-blur-2xl transition-opacity duration-700 ease-fluid lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none invisible opacity-0'
        }`}
      >
        <nav className="flex h-full flex-col justify-center gap-1 px-8">
          {sections.map(({ id, label }, index) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: `${open ? 100 + index * 45 : 0}ms` }}
              className={`inline-flex min-h-[56px] items-center font-display text-3xl text-ink transition-[opacity,transform] duration-700 ease-fluid ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              {label}
            </a>
          ))}

          <div
            style={{ transitionDelay: `${open ? 100 + sections.length * 45 : 0}ms` }}
            className={`mt-8 transition-[opacity,transform] duration-700 ease-fluid ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <BookingButton />
          </div>
        </nav>
      </div>
    </header>
  )
}
