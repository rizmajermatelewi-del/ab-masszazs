import { useEffect, useState } from 'react'
import { BUSINESS } from '../data/business'

const LINKS = [
  { href: '#szolgaltatasok', label: 'Szolgáltatások' },
  { href: '#elerhetoseg', label: 'Elérhetőség' },
]

/* A floating glass pill, detached from the top edge, rather than a bar glued
   across it. The page reads as a sheet of paper that the navigation hovers
   over.

   The full-screen menu is phone-only. On a two-link site a hamburger on desktop
   would be hiding navigation for no reason -- the links fit, so they stay
   visible. It exists below `sm` because at 375px two Hungarian labels plus the
   business name genuinely do not fit on one line without shrinking all three
   below a comfortable tap target.

   Note the menu deliberately does NOT repeat the business name: it appears
   exactly twice on the page (this pill and the h1), and a third copy would be
   noise for a screen-reader user reading the document in order. */
export default function Header() {
  const [open, setOpen] = useState(false)

  /* A fixed overlay over a scrollable body scrolls the page behind it, which
     feels broken on iOS in particular. */
  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  /* Escape closes it. A full-screen overlay with no keyboard way out is a trap. */
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="pointer-events-none sticky top-0 z-30 px-4 pt-5 sm:pt-6">
      {/* relative z-30 keeps the pill -- and therefore the close button -- above
          the overlay below it. Without it the overlay paints over the only
          control that dismisses it, and the menu becomes a trap on a phone. */}
      <div className="pointer-events-auto relative z-30 mx-auto flex w-full max-w-4xl items-center justify-between gap-3 rounded-full border border-ink/[0.06] bg-paper/70 p-1.5 pl-5 shadow-lift backdrop-blur-xl sm:w-max sm:gap-8 sm:pl-7">
        <a
          href="/"
          className="inline-flex min-h-[44px] items-center font-display text-base tracking-tight text-ink transition-colors duration-500 ease-fluid hover:text-clay"
        >
          {BUSINESS.name || 'AB Masszázs'}
        </a>

        <nav className="hidden items-center gap-8 pr-4 text-sm text-muted sm:flex">
          {LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="inline-flex min-h-[44px] items-center transition-colors duration-500 ease-fluid hover:text-clay"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* The hamburger's two rules rotate and converge into an X rather than
            swapping for a different icon, so the control keeps its identity
            through the change. */}
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? 'Menü bezárása' : 'Menü megnyitása'}
          onClick={() => setOpen((value) => !value)}
          className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink/[0.04] transition-transform duration-500 ease-fluid active:scale-95 sm:hidden"
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

      {/* Kept mounted so the links can animate out as well as in; visibility is
          what removes it from the tab order when closed. */}
      <div
        className={`fixed inset-0 z-20 bg-paper/85 backdrop-blur-2xl transition-opacity duration-700 ease-fluid sm:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none invisible opacity-0'
        }`}
      >
        <nav className="flex h-full flex-col justify-center gap-2 px-8">
          {LINKS.map(({ href, label }, index) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: `${open ? 120 + index * 60 : 0}ms` }}
              className={`inline-flex min-h-[56px] items-center font-display text-4xl text-ink transition-[opacity,transform] duration-700 ease-fluid ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {label}
            </a>
          ))}

          {BUSINESS.phone ? (
            <a
              href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: `${open ? 240 : 0}ms` }}
              className={`mt-6 inline-flex min-h-[44px] items-center text-sm uppercase tracking-label text-clay transition-[opacity,transform] duration-700 ease-fluid ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {BUSINESS.phone}
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  )
}
