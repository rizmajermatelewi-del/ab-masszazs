import { useEffect, useState } from 'react'
import { ANNOUNCEMENT, announcementActive } from '../data/announcement'

/* Inside the fixed header, so it cannot scroll away before it is read.
   Starts shown (as prerendered) and hides itself after hydration if the date
   has passed, so the first client render matches the HTML. Closing it lasts
   until the page is reloaded: remembering it would need storage, and the
   privacy notice promises the site keeps nothing in the browser. */
export default function Announcement() {
  const [shown, setShown] = useState(Boolean(ANNOUNCEMENT.text))

  useEffect(() => {
    if (!announcementActive()) setShown(false)
  }, [])

  if (!shown) return null

  return (
    <div className="relative bg-lotus px-12 py-2 text-center text-xs text-paper sm:text-sm">
      {ANNOUNCEMENT.text}{' '}
      {ANNOUNCEMENT.href ? (
        <a href={ANNOUNCEMENT.href} className="font-semibold underline decoration-paper/40 underline-offset-2 hover:decoration-paper">
          {ANNOUNCEMENT.linkLabel}
        </a>
      ) : null}
      <button
        type="button"
        onClick={() => setShown(false)}
        aria-label="Hírsáv bezárása"
        className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-paper/80 transition-colors hover:bg-paper/10 hover:text-paper"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
