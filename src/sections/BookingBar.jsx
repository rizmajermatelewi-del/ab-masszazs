import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/business'
import { BOOKING_ONLINE } from '../data/booking'

/* A phone-only bar that holds the booking action once the hero -- which already
   carries the same button -- has scrolled away. Two copies of the primary CTA
   on screen at once is clutter, so this one only exists after the first has
   gone.

   env(safe-area-inset-bottom) keeps it clear of the iPhone home indicator, and
   the matching spacer under it means the bar never covers the last line of the
   footer, which is where the privacy link lives. */
export default function BookingBar() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!BUSINESS.phone) return null
  const Tag = BOOKING_ONLINE ? Link : 'a'
  const target = BOOKING_ONLINE ? { to: '/foglalas' } : { href: `tel:${BUSINESS.phone.replace(/\s/g, '')}` }

  return (
    <>
      <div aria-hidden="true" className="h-[calc(4.5rem+env(safe-area-inset-bottom))] lg:hidden" />
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-line/70 bg-paper/90 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-700 ease-fluid lg:hidden ${
          shown ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <Tag
          {...target}
          className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-ink text-sm font-medium text-paper transition-transform duration-500 ease-fluid active:scale-[0.99]"
        >
          Időpontfoglalás
        </Tag>
      </div>
    </>
  )
}
