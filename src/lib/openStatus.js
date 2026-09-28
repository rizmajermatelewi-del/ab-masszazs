/* "Most nyitva / most zárva" from BUSINESS.hours, always in Budapest time, so
   a visitor whose laptop sits in another time zone still gets the salon's
   answer. Times are 'HH:MM' strings, which compare correctly as strings. */
const DAYS = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap']
const ON = ['hétfőn', 'kedden', 'szerdán', 'csütörtökön', 'pénteken', 'szombaton', 'vasárnap']
const SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function budapest(date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Budapest',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type) => parts.find((p) => p.type === type).value
  return { day: SHORT.indexOf(get('weekday')), time: `${get('hour')}:${get('minute')}` }
}

/* Returns the sentence to show, or '' when there are no hours to go on. */
export function openStatus(hours, date = new Date()) {
  if (!hours.length) return ''
  const { day, time } = budapest(date)
  const on = (d) => hours.find((h) => h.day === DAYS[d])

  const today = on(day)
  if (today && time >= today.opens && time < today.closes) {
    return `Most nyitva, ${today.closes}-ig`
  }
  for (let k = 0; k < 7; k++) {
    const d = (day + k) % 7
    const h = on(d)
    if (!h || (k === 0 && time >= h.opens)) continue
    const when = k === 0 ? 'ma' : k === 1 ? 'holnap' : ON[d]
    return `Most zárva, ${when} ${h.opens}-kor nyit`
  }
  return 'Most zárva'
}
