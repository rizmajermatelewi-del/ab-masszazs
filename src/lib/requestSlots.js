/* Days and times offered by the appointment REQUEST form. Not availability:
   she confirms every request herself, so this only keeps the choice inside
   her opening hours. Everything in Budapest time. */
const TZ = 'Europe/Budapest'
const DAYS = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap']
const SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function parts(date) {
  const p = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).formatToParts(date)
  const get = (t) => p.find((x) => x.type === t).value
  return { y: +get('year'), m: +get('month'), d: +get('day'), wd: SHORT.indexOf(get('weekday')) }
}

const monthDay = new Intl.DateTimeFormat('hu-HU', { timeZone: TZ, month: 'short', day: 'numeric' })

/* The next `count` days she is open, starting tomorrow. */
export function openDays(hours, from = new Date(), count = 10) {
  const today = parts(from)
  const out = []
  for (let k = 1; out.length < count && k <= 60; k++) {
    // Noon UTC of the k-th next calendar day: far from any DST edge.
    const date = new Date(Date.UTC(today.y, today.m - 1, today.d + k, 12))
    const p = parts(date)
    const h = hours.find((x) => x.day === DAYS[p.wd])
    if (!h) continue
    out.push({
      iso: `${p.y}-${String(p.m).padStart(2, '0')}-${String(p.d).padStart(2, '0')}`,
      weekday: DAYS[p.wd],
      label: monthDay.format(date),
      opens: h.opens,
      closes: h.closes,
    })
  }
  return out
}

const toMin = (t) => +t.slice(0, 2) * 60 + +t.slice(3)
const toTime = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`

/* Whole hours at which a treatment of `minutes` still ends by closing. */
export function timesFor(day, minutes) {
  if (!day) return []
  const out = []
  for (let t = toMin(day.opens); t + minutes <= toMin(day.closes); t += 60) out.push(toTime(t))
  return out
}
