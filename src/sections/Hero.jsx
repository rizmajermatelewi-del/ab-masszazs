import { BUSINESS } from '../data/business'
import { HERO } from '../data/content'
import BookingButton from '../components/BookingButton.jsx'
import Lotus from '../components/Lotus.jsx'

/* Her own logo, as the page's first thing: "AB" over "MASSZÁZS" between two
   rules, the lotus underneath, in plum on dusty rose, as on the cover of her
   Facebook page. It is real text in the h1 (not an image), so it is also the
   name Google and screen readers get.

   Beside it a photograph in an arched frame, the shape of the ornament around
   her logo. Until she has her own photos it is filler (see content.js).

   Two actions, because those are the two ways her clients actually reach her:
   the phone, and Facebook Messenger.

   100svh, not 100vh: on iOS the large viewport unit parks the buttons under
   the browser chrome on first paint. */
export default function Hero() {
  return (
    <section id="kezdolap" className="flex min-h-[100svh] items-center px-5 pb-16 pt-28 sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div className="text-center">
          <h1 className="font-display font-normal text-lotus">
            <span className="block text-[clamp(4.5rem,12vw,8rem)] leading-none tracking-[0.06em]">AB</span>
            {/* The space keeps the accessible name "AB Masszázs", not "ABMasszázs". */}{' '}
            <span className="mt-3 flex items-center justify-center gap-4 sm:gap-6">
              <span aria-hidden="true" className="h-px w-8 bg-lotus/50 sm:w-14" />
              <span className="text-[clamp(2rem,5.5vw,3.5rem)] uppercase leading-none tracking-[0.16em]">
                Masszázs
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-lotus/50 sm:w-14" />
            </span>
          </h1>
          <Lotus className="mx-auto mt-7 h-12 w-[4.5rem] text-lotus" />

          {HERO.headline ? (
            <p className="mx-auto mt-10 max-w-[22ch] font-display text-3xl leading-snug text-ink">{HERO.headline}</p>
          ) : null}
          {BUSINESS.tagline ? (
            <p className="mx-auto mt-8 max-w-[40ch] text-base leading-relaxed text-muted sm:text-lg">
              {BUSINESS.tagline}
            </p>
          ) : null}

          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
            <BookingButton />
            {BUSINESS.messenger ? (
              <a
                href={BUSINESS.messenger}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center text-sm font-medium text-lotus underline decoration-lotus/30 underline-offset-4 transition-colors duration-500 ease-fluid hover:decoration-lotus"
              >
                Írj Messengeren
              </a>
            ) : null}
          </div>
        </div>

        {HERO.image ? (
          <div className="relative mx-auto w-full max-w-sm md:max-w-none">
            {/* A thin plum arch offset behind the photo, like the frame in her logo. */}
            <div aria-hidden="true" className="absolute -inset-3 rounded-t-[999px] rounded-b-[2rem] border border-lotus/25" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] shadow-liftHover">
              <img
                src={HERO.image}
                alt={HERO.imageAlt}
                fetchpriority="high"
                decoding="async"
                className="hero-photo h-full w-full object-cover"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
