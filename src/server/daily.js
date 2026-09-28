import { zoned, localDate } from '../lib/slots.js'
import { formatWhen, CONSENT_LINE } from './booking.js'
import { BUSINESS } from '../data/business.js'

/* Once a day (netlify/functions/daily.mjs, 16:00 UTC = 17-18:00 Budapest):
   - a reminder to everyone booked for TOMORROW,
   - a review request to everyone who came YESTERDAY.
   Only for bookings where the client ticked the consent box: booking.js
   writes CONSENT_LINE into the calendar event. Everyone else gets nothing.

   ponytail: no sent-log, so a retried run could send twice; it is one run a
   day, and a log would need the database this site avoids. */
export { CONSENT_LINE }

const clientEmail = (e) => e.description.match(/^E-mail: (.+)$/m)?.[1]
const clientName = (e) => (e.summary.split(' – ')[1] ?? '').trim()
const treatment = (e) => e.summary.split(' – ')[0]
const consented = (e) => e.description.includes(CONSENT_LINE)

/* [start, end) of the Budapest calendar day `offset` days from `ms`. */
function dayRange(ms, offset) {
  const [y, m, d] = localDate(ms).split('-').map(Number)
  return [new Date(zoned(y, m, d + offset, 0, 0)).toISOString(), new Date(zoned(y, m, d + offset + 1, 0, 0)).toISOString()]
}

export function createDaily({ calendar, mailer, business = BUSINESS, now = () => Date.now() }) {
  const sign = business.legalName || business.name
  return {
    async run() {
      const sent = { reminders: 0, reviews: 0 }
      const t = now()

      for (const e of (await calendar.list(...dayRange(t, 1))).filter(consented)) {
        const to = clientEmail(e)
        if (!to) continue
        await mailer.send({
          to,
          subject: `Holnap találkozunk: ${formatWhen(e.start)}`,
          text: [
            `Kedves ${clientName(e) || 'Vendégem'}!`,
            '',
            `Emlékeztetőül: holnap várlak, ${formatWhen(e.start)}.`,
            `${treatment(e)}, ${business.postalCode} ${business.city}, ${business.street}`,
            '',
            `Ha mégsem jó, kérlek, szólj: ${business.phone}`,
            '',
            sign,
          ].join('\n'),
        })
        sent.reminders++
      }

      if (business.googleReviewUrl) {
        for (const e of (await calendar.list(...dayRange(t, -1))).filter(consented)) {
          const to = clientEmail(e)
          if (!to) continue
          await mailer.send({
            to,
            subject: 'Hogy érezted magad?',
            text: [
              `Kedves ${clientName(e) || 'Vendégem'}!`,
              '',
              'Köszönöm, hogy nálam jártál. Ha jólesett a kezelés, egy rövid Google-vélemény sokat segít, hogy mások is rám találjanak:',
              business.googleReviewUrl,
              '',
              'Ez az egyetlen ilyen levél, többet nem küldök.',
              '',
              sign,
            ].join('\n'),
          })
          sent.reviews++
        }
      }
      return sent
    },
  }
}
