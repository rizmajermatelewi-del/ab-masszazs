import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/business'
import { BOOKING_ONLINE } from '../data/booking'

/* The one control the whole page exists to get pressed, in one component so it
   cannot drift between the hero, the header and the sticky mobile bar.

   In phase 1 "Időpontfoglalás" means her telephone, because there is no booking
   system yet. Labelling it as though there were -- and then dropping the
   visitor on a page that only shows a number -- is the kind of small dishonesty
   that costs a booking. So the label says what pressing it does.

   With no telephone number on file it renders nothing at all rather than a dead
   button. check-content.mjs already refuses to build in that state; this is the
   same rule enforced where it is visible.

   Once online booking is switched on (data/booking.js) the same button leads
   to /foglalas instead, and the label is literally true. */
export default function BookingButton({ variant = 'primary', className = '' }) {
  if (!BUSINESS.phone) return null

  const Tag = BOOKING_ONLINE ? Link : 'a'
  const target = BOOKING_ONLINE ? { to: '/foglalas' } : { href: `tel:${BUSINESS.phone.replace(/\s/g, '')}` }

  if (variant === 'compact') {
    return (
      <Tag
        {...target}
        className={`group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-paper transition-[transform,background-color] duration-700 ease-fluid hover:bg-clay active:scale-[0.98] ${className}`}
      >
        Időpontfoglalás
        <Arrow />
      </Tag>
    )
  }

  return (
    <Tag
      {...target}
      className={`group inline-flex min-h-[56px] shrink-0 items-center gap-4 rounded-full bg-ink py-2 pl-7 pr-2 text-paper shadow-lift transition-[transform,background-color,box-shadow] duration-700 ease-fluid hover:bg-clay hover:shadow-liftHover active:scale-[0.98] ${className}`}
    >
      <span className="text-sm font-medium">Időpontfoglalás</span>
      <span
        aria-hidden="true"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper/15 transition-transform duration-700 ease-fluid group-hover:-translate-y-[1px] group-hover:translate-x-1 group-hover:scale-105"
      >
        <Arrow />
      </span>
    </Tag>
  )
}

/* Hairline stroke, drawn inline. One glyph does not justify an icon
   dependency, and this way its weight matches the rules used across the page. */
function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
