/* Hungarian number formatting, in one place because the price appears on the
   page, in the JSON-LD, and (in Phase 2) in a confirmation e-mail.

   Every separator is non-breaking: "9 000 Ft" breaking across two lines as "9"
   and "000 Ft" happens on a 360px phone, and it reads as a different price for
   the half-second before the eye recovers.

   useGrouping: 'always' because hu-HU's default CLDR grouping only kicks in
   at 5 digits (10 000 groups, 9000 does not) -- a spec bug the brief's plain
   toLocaleString('hu-HU') call inherits and this fixes. */
export function formatPrice(huf) {
  const grouped = huf
    .toLocaleString('hu-HU', { useGrouping: 'always' })
    .replace(/[\s\u202f]/g, '\u00a0')
  return `${grouped}\u00a0Ft`
}

export function formatDuration(minutes) {
  return `${minutes} perc`
}
