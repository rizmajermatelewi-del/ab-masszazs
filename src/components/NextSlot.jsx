import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/business'
import { SERVICES } from '../data/services'
import { BOOKING_ONLINE } from '../data/booking'
import { openDays } from '../lib/requestSlots'

const time = new Intl.DateTimeFormat('hu-HU', { timeZone: 'Europe/Budapest', hour: '2-digit', minute: '2-digit' })

/* "Legközelebbi szabad időpont: kedd 10:00", from the same /api/slots the
   booking page uses, for the first treatment on the menu. Renders nothing
   until online booking is switched on, and nothing if the calendar cannot
   be read: a guessed free slot would be worse than none. */
export default function NextSlot() {
  const [next, setNext] = useState(null)

  useEffect(() => {
    if (!BOOKING_ONLINE || !SERVICES.length) return undefined
    let alive = true
    ;(async () => {
      for (const day of openDays(BUSINESS.hours, new Date(), 7)) {
        try {
          const res = await fetch(`/api/slots?service=${encodeURIComponent(SERVICES[0].id)}&date=${day.iso}`)
          const data = await res.json()
          if (!alive || !data.ok) return
          if (data.slots.length) return setNext(`${day.weekday.toLowerCase()}, ${day.label}, ${time.format(new Date(data.slots[0]))}`)
        } catch {
          return
        }
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  if (!next) return null
  return (
    <Link
      to="/foglalas"
      className="swap-in inline-flex items-center gap-2 rounded-full border border-lotus/30 bg-paper/70 px-4 py-2 text-sm text-ink transition-colors hover:border-lotus"
    >
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-lotus" />
      Legközelebbi szabad időpont: <strong className="font-semibold">{next}</strong>
    </Link>
  )
}
