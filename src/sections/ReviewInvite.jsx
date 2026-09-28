import { BUSINESS } from '../data/business'
import Reveal from '../components/Reveal.jsx'

/* An invitation, not a review wall. The only Google review today is from
   her son, and showing it would mislead (Máté agreed, 2026-09-28), so the
   page asks past clients to write one instead. Real reviews go into
   TESTIMONIALS in content.js once there are some, with permission.

   The stars are one link to Google's write-a-review dialog. Pointing at a
   star fills it and the ones before it, so the gesture is the rating;
   the rating itself is given on Google. */
const STAR = 'M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z'

export default function ReviewInvite() {
  if (!BUSINESS.googleReviewUrl) return null

  return (
    <section id="velemeny" className="px-5 py-14 text-center sm:px-8 sm:py-20">
      <Reveal className="mx-auto max-w-xl">
        <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-normal leading-[1.1] text-ink">
          Jártál már <em className="text-lotus">nálam?</em>
        </h2>
        <p className="mx-auto mt-4 max-w-[40ch] leading-relaxed text-muted">
          Ha jólesett a kezelés, egy rövid Google-vélemény sokat segít, hogy mások is rám találjanak.
        </p>

        <a
          href={BUSINESS.googleReviewUrl}
          data-umami-event="Vélemény írása"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex flex-col items-center gap-5"
        >
          {/* row-reverse so "this star and every star before it" is a plain
              sibling selector (.review-star:hover ~ .review-star). */}
          <span aria-hidden="true" className="flex flex-row-reverse gap-2">
            {[5, 4, 3, 2, 1].map((n) => (
              <svg key={n} viewBox="0 0 24 24" className="review-star h-9 w-9" strokeWidth="1.2" strokeLinejoin="round">
                <path d={STAR} />
              </svg>
            ))}
          </span>
          <span className="inline-flex min-h-[48px] items-center rounded-full border border-lotus/40 px-6 text-sm font-medium text-ink transition-[background-color,color,border-color] duration-500 ease-fluid group-hover:border-lotus group-hover:bg-lotus group-hover:text-paper">
            Vélemény írása a Google-ön
          </span>
        </a>
      </Reveal>
    </section>
  )
}
