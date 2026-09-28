import { zoned } from './slots.js'

/* "Naptárhoz adom" after an appointment request: an .ics file (Apple,
   Outlook, most phones) and a Google Calendar link, built in the browser,
   nothing sent anywhere. `date` is 'YYYY-MM-DD', `time` 'HH:MM', Budapest. */
const stamp = (ms) => new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
const esc = (s) => String(s).replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n')

function range(date, time, minutes) {
  const [y, m, d] = date.split('-').map(Number)
  const [h, min] = time.split(':').map(Number)
  const start = zoned(y, m, d, h, min)
  return [start, start + minutes * 60000]
}

export function buildIcs({ date, time, minutes, title, location, description }) {
  const [start, end] = range(date, time, minutes)
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AB Masszazs//hu',
    'BEGIN:VEVENT',
    `UID:${start}-${date}@abmasszazs.hu`,
    `DTSTAMP:${stamp(Date.now())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${esc(title)}`,
    `LOCATION:${esc(location)}`,
    `DESCRIPTION:${esc(description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function googleCalendarUrl({ date, time, minutes, title, location, description }) {
  const [start, end] = range(date, time, minutes)
  const q = new URLSearchParams({ action: 'TEMPLATE', text: title, dates: `${stamp(start)}/${stamp(end)}`, location, details: description })
  return `https://calendar.google.com/calendar/render?${q}`
}
