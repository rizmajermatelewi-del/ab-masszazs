import { BUSINESS } from '../data/business'
import { GIFT_CARD } from '../data/content'
import BookingButton from '../components/BookingButton.jsx'
import Reveal from '../components/Reveal.jsx'

/* Behind an explicit flag rather than behind "is the text non-empty", because
   this section is a commercial offer: it must appear only if she genuinely
   sells vouchers. Advertising something a visitor cannot actually buy is worse
   than not mentioning it.

   The card is drawn, not photographed -- a tilted rectangle of the site's own
   palette. A stock image of a gift certificate would undo the whole
   no-stock-photography argument in one section. */
export default function GiftCard() {
  if (!GIFT_CARD.enabled) return null

  return (
    <section id="ajandek" className="px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-label text-faint">
              Ajándékutalvány
            </p>
            <h2 className="mt-6 max-w-[14ch] text-[clamp(2rem,5vw,3.5rem)] leading-[0.98] tracking-[-0.02em] text-ink">
              Ajándékozz valódi kikapcsolódást
            </h2>
            {GIFT_CARD.text ? (
              <p className="mt-8 max-w-prose leading-relaxed text-muted">{GIFT_CARD.text}</p>
            ) : null}
            <div className="mt-10">
              <BookingButton />
            </div>
          </div>

          <div className="relative aspect-[16/10]">
            <div className="absolute inset-0 -rotate-2 rounded-shell bg-tint shadow-lift" />
            <div className="absolute inset-0 rotate-1 rounded-shell border border-ink/[0.06] bg-ink shadow-liftHover">
              <div className="flex h-full flex-col justify-between p-8">
                <span className="text-[10px] uppercase tracking-label text-paper/60">
                  Ajándékutalvány
                </span>
                {/* The same fallback as the header and the hero, not a literal:
                    a voucher printed with a name she does not trade under is
                    the one place on this page where a wrong word is a
                    commercial document. */}
                <span className="font-display text-2xl text-paper">
                  {BUSINESS.name || 'AB Masszázs'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
