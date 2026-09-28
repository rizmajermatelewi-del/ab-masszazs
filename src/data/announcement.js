/* The seasonal strip above the header. Edit the text, the link and the last
   day it shows; after `until` (Budapest date, inclusive) it disappears by
   itself, so a Christmas offer cannot still be up in February. Empty text
   hides it. */
export const ANNOUNCEMENT = {
  text: 'Karácsonyra már kérhető ajándékutalvány.',
  linkLabel: 'Utalványt kérek',
  href: '#ajandek',
  until: '2026-12-24',
}

/* True while the strip should show on `date`. */
export function announcementActive(a = ANNOUNCEMENT, date = new Date()) {
  if (!a.text) return false
  const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Budapest' }).format(date)
  return !a.until || today <= a.until
}
