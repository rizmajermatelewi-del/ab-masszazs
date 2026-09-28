import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/business'
import { BOOKING_ONLINE } from '../data/booking'

/* The phone-only bar with the three things a visitor on a phone wants: call
   (or book, once online booking is on), write on Messenger, get directions.
   It appears once the hero, which carries the same actions, has scrolled
   away. "Útvonal" opens a small choice between Google Maps and Waze, the
   two navigation apps people here actually use.

   env(safe-area-inset-bottom) keeps it clear of the iPhone home indicator,
   and the spacer under it means it never covers the footer's last line. */
export default function BookingBar() {
  const [shown, setShown] = useState(false)
  const [routeOpen, setRouteOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.8
      setShown(past)
      if (!past) setRouteOpen(false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!BUSINESS.phone) return null

  const address = encodeURIComponent(`${BUSINESS.postalCode} ${BUSINESS.city}, ${BUSINESS.street}`)
  const hasAddress = Boolean(BUSINESS.street && BUSINESS.city)
  const btn =
    'flex min-h-[52px] flex-1 items-center justify-center rounded-full text-sm font-semibold transition-transform duration-300 ease-fluid active:scale-[0.97]'

  return (
    <>
      <div aria-hidden="true" className="h-[calc(4.5rem+env(safe-area-inset-bottom))] lg:hidden" />
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-line/70 bg-paper/90 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-700 ease-fluid lg:hidden ${
          shown ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {routeOpen && hasAddress ? (
          <div className="swap-in mb-3 flex gap-2">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} border border-line bg-paper text-ink`}
            >
              Google Térkép
            </a>
            <a
              href={`https://waze.com/ul?q=${address}&navigate=yes`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} border border-line bg-paper text-ink`}
            >
              Waze
            </a>
          </div>
        ) : null}

        <div className="flex gap-2">
          {BOOKING_ONLINE ? (
            <Link to="/foglalas" className={`${btn} bg-lotus text-paper`}>
              Foglalás
            </Link>
          ) : (
            <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className={`${btn} bg-lotus text-paper`}>
              Hívás
            </a>
          )}
          {BUSINESS.messenger ? (
            <a
              href={BUSINESS.messenger}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} border border-lotus/40 text-ink`}
            >
              Messenger
            </a>
          ) : null}
          {hasAddress ? (
            <button
              type="button"
              aria-expanded={routeOpen}
              onClick={() => setRouteOpen((v) => !v)}
              className={`${btn} border border-lotus/40 ${routeOpen ? 'bg-tint text-lotus' : 'text-ink'}`}
            >
              Útvonal
            </button>
          ) : null}
        </div>
      </div>
    </>
  )
}
