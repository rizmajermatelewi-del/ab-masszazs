/* The slot calculator (spec §4, §8): working hours + busy events + duration
   + now -> the start times a client may book. Pure, so every rule that can
   go wrong is tested without a calendar, and shared by the server (which
   decides) and the demo page (which only shows).

   Every wall-clock time is Europe/Budapest, converted through Intl rather
   than a fixed offset, so the two DST weekends need no special case. */

export const TZ = 'Europe/Budapest'

/* Defaults from the spec. `step` is the grid slot starts sit on, `buffer`
   the minimum gap either side of another appointment. */
export const RULES = { bufferMin: 15, leadMin: 120, horizonDays: 60, stepMin: 30 }

const WEEKDAY = { Vasárnap: 0, Hétfő: 1, Kedd: 2, Szerda: 3, Csütörtök: 4, Péntek: 5, Szombat: 6 }
const MIN = 60000

const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: TZ,
  hourCycle: 'h23',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
})

/* Budapest wall-clock fields of an instant. */
export function localParts(ms) {
  const p = Object.fromEntries(fmt.formatToParts(new Date(ms)).map((x) => [x.type, x.value]))
  return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour, min: +p.minute }
}

const offset = (ms) => {
  const p = localParts(ms)
  return Date.UTC(p.y, p.m - 1, p.d, p.h, p.min) - Math.floor(ms / MIN) * MIN
}

/* A Budapest wall-clock time -> UTC milliseconds. Guess with the offset at
   the naive instant, then correct once with the offset at the answer; that
   settles every time a salon could open (none fall in the skipped hour). */
export function zoned(y, m, d, h, min) {
  const naive = Date.UTC(y, m - 1, d, h, min)
  let t = naive - offset(naive)
  const o = offset(t)
  if (naive - t !== o) t = naive - o
  return t
}

export const localDate = (ms) => {
  const p = localParts(ms)
  return `${p.y}-${String(p.m).padStart(2, '0')}-${String(p.d).padStart(2, '0')}`
}

const hm = (s) => s.split(':').map(Number)
const toMs = (v) => (typeof v === 'number' ? v : Date.parse(v))

/* Free start times, as ISO strings, for `days` local days from `from`
   ('YYYY-MM-DD'). `busy` is [{ start, end }] in ISO or milliseconds. */
export function freeSlots({ hours, busy = [], minutes, now, from, days = 1, rules = RULES }) {
  const { bufferMin, leadMin, horizonDays, stepMin } = rules
  const nowMs = toMs(now)
  const earliest = nowMs + leadMin * MIN
  const latest = nowMs + horizonDays * 24 * 60 * MIN
  const busyMs = busy.map((b) => [toMs(b.start), toMs(b.end)])
  const dur = minutes * MIN
  const buf = bufferMin * MIN
  const [fy, fm, fd] = from.split('-').map(Number)
  const out = []

  for (let k = 0; k < days; k++) {
    const day = new Date(Date.UTC(fy, fm - 1, fd + k))
    const [y, m, d, wd] = [day.getUTCFullYear(), day.getUTCMonth() + 1, day.getUTCDate(), day.getUTCDay()]
    for (const block of hours.filter((h) => WEEKDAY[h.day] === wd)) {
      const open = zoned(y, m, d, ...hm(block.opens))
      const close = zoned(y, m, d, ...hm(block.closes))
      for (let t = open; t + dur <= close; t += stepMin * MIN) {
        if (t < earliest || t > latest) continue
        const clash = busyMs.some(([s, e]) => s < t + dur + buf && e > t - buf)
        if (!clash) out.push(new Date(t).toISOString())
      }
    }
  }
  return out
}
