import { SERVICES } from '../data/services.js'
import { formatPrice, formatDuration } from '../lib/format.js'

/* The two small forms (callback request, gift voucher request) as one
   e-mail to her. They need only the Gmail credentials, not the calendar, so
   they work before online booking is switched on. No database: the e-mail in
   her inbox is the record. */

const PHONE = /^[+0-9 ()/-]{7,20}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* Callback windows, inside her opening hours. */
export const WHEN = {
  de: 'Délelőtt (8-12)',
  du: 'Kora délután (12-15)',
  dk: 'Késő délután (15-18)',
}

/* Printed on the voucher preview and repeated in the e-mail, so the two
   cannot disagree. Hungarian law lets her choose it, but it must be stated. */
export const VOUCHER_MONTHS = 6

const line = (v, max) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max)
const text = (v, max) => String(v ?? '').trim().slice(0, max)
const join = (lines) => lines.filter(Boolean).join('\n')
const INVALID = { ok: false, code: 'invalid' }

/* Validates a submission and turns it into the e-mail. Pure, so the tests
   need no mailer. */
export function composeMessage(body = {}, services = SERVICES) {
  // Honeypot: a field people never see. Filled means a bot; answer as if it
  // worked, so the bot learns nothing.
  if (body.website) return { ok: true, spam: true }

  const name = line(body.name, 80)
  const phone = line(body.phone, 20)
  const email = line(body.email, 120)
  if (!name || !PHONE.test(phone) || (email && !EMAIL.test(email))) return INVALID
  const contact = [`Név: ${name}`, `Telefon: ${phone}`, email && `E-mail: ${email}`]

  if (body.kind === 'callback') {
    const when = WHEN[body.when]
    if (!when) return INVALID
    const service = services.find((s) => s.id === body.serviceId)
    const note = text(body.note, 500)
    return {
      ok: true,
      mail: {
        subject: `Visszahívást kér: ${name}`,
        replyTo: email || undefined,
        text: join([
          'Visszahívást kértek a weboldalon.',
          '',
          ...contact,
          `Mikor hívd: ${when}`,
          `Érdekli: ${service ? service.name : 'még nem tudja'}`,
          note && `\nÜzenet:\n${note}`,
        ]),
      },
    }
  }

  if (body.kind === 'voucher') {
    const service = services.find((s) => s.id === body.serviceId)
    const recipient = line(body.recipient, 60)
    if (!service || !recipient) return INVALID
    const note = text(body.note, 140)
    return {
      ok: true,
      mail: {
        subject: `Ajándékutalvány-igénylés: ${service.name}`,
        replyTo: email || undefined,
        text: join([
          'Ajándékutalványt igényeltek a weboldalon. Fizetés és átvétel nálad, személyesen.',
          '',
          `Kezelés: ${service.name}, ${formatDuration(service.minutes)}, ${formatPrice(service.price)}`,
          `Kinek szól: ${recipient}`,
          note && `Üzenet az utalványra: ${note}`,
          `Érvényesség: a kiállítástól számított ${VOUCHER_MONTHS} hónap`,
          '',
          'Aki kéri:',
          ...contact,
        ]),
      },
    }
  }

  return INVALID
}

export function createMessages({ mailer, to }) {
  return {
    async send(body) {
      const r = composeMessage(body)
      if (!r.ok) return r
      if (!r.spam) await mailer.send({ to, ...r.mail })
      return { ok: true }
    },
  }
}
