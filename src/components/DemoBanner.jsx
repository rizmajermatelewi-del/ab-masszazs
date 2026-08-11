import { DEMO } from '../data/demo'

/* The second half of the demo guard. check-content.mjs stops the site reaching
   a server; this stops a SCREENSHOT of it being mistaken for the finished
   thing -- the likelier accident, because the whole point of demo mode is that
   the page gets shown to people.

   Deliberately ugly. Every other colour here was chosen to belong; this one was
   chosen not to.

   It renders inside the fixed header (and at the top of the privacy page, which
   has no header). In the normal page flow it would scroll away, and a warning
   you have to scroll back up to find is not a warning.

   role="alert" rather than a decorative strip: someone reading this page with a
   screen reader has to hear that the prices are invented too. */
export default function DemoBanner() {
  if (!DEMO) return null

  return (
    <div
      role="alert"
      className="bg-red-700 px-5 py-2.5 text-center text-xs font-medium leading-relaxed text-white sm:px-8 sm:text-sm"
    >
      DEMÓ OLDAL — a telefonszám, a cím, az árak, a nyitvatartás, a vélemények és
      a fotók mind kitaláltak. Semmi sem valós adat.
    </div>
  )
}
