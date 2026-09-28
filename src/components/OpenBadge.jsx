import { useEffect, useState } from 'react'
import { BUSINESS } from '../data/business'
import { openStatus } from '../lib/openStatus'

/* "Most nyitva, 18:00-ig" in the header. Computed in the browser only (the
   prerendered HTML would carry the build's time) and refreshed each minute.
   The dot is semantic, not decoration: filled and softly pulsing while open,
   hollow while closed. */
export default function OpenBadge({ className = '' }) {
  const [status, setStatus] = useState('')

  useEffect(() => {
    const update = () => setStatus(openStatus(BUSINESS.hours))
    update()
    const t = setInterval(update, 60_000)
    return () => clearInterval(t)
  }, [])

  if (!status) return null
  const open = status.startsWith('Most nyitva')

  return (
    <a
      href="#elerhetoseg"
      className={`items-center gap-2 rounded-full border border-line bg-paper/70 px-3 py-1.5 text-xs text-muted transition-colors hover:border-lotus/50 hover:text-ink ${className}`}
    >
      <span aria-hidden="true" className={`relative h-2 w-2 rounded-full ${open ? 'open-dot bg-lotus' : 'border border-faint'}`} />
      {status}
    </a>
  )
}
