import { BUSINESS } from '../data/business'

/* Sticky, because the phone number and the price list are the two things a
   visitor came for and both are below the fold on a phone. The backdrop is a
   translucent paper wash rather than a hard bar, so the page reads as one sheet
   scrolling under a header instead of two stacked boxes. */
export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-paper/85 backdrop-blur">
      {/* min-h-[44px] on the links rather than padding on the bar: the tap target
          is the anchor, not the row it sits in, and a 20px-tall link is a missed
          tap on a phone even when the header around it looks generous. */}
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-1.5 sm:px-8">
        <a
          href="/"
          className="inline-flex min-h-[44px] items-center font-display text-lg tracking-tight text-ink transition-colors duration-200 hover:text-clay"
        >
          {BUSINESS.name || 'AB Masszázs'}
        </a>
        <nav className="flex items-center gap-5 text-sm text-muted sm:gap-8">
          <a
            href="#szolgaltatasok"
            className="inline-flex min-h-[44px] items-center transition-colors duration-200 hover:text-clay"
          >
            Szolgáltatások
          </a>
          <a
            href="#elerhetoseg"
            className="inline-flex min-h-[44px] items-center transition-colors duration-200 hover:text-clay"
          >
            Elérhetőség
          </a>
        </nav>
      </div>
    </header>
  )
}
