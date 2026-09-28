import { describe, it, expect } from 'vitest'
import { createDaily, CONSENT_LINE } from './daily.js'

const business = {
  name: 'AB Masszázs', legalName: 'Apostol Brigitta', phone: '+36 30 000 0000',
  postalCode: '2365', city: 'Inárcs', street: 'Május 1. utca 12.',
  googleReviewUrl: 'https://review.example',
}
const ev = (start, consent, email = 'anna@example.hu') => ({
  id: start, start, summary: 'Svédmasszázs – Kiss Anna',
  description: ['Telefon: 1', `E-mail: ${email}`, consent && CONSENT_LINE].filter(Boolean).join('\n'),
})

// "Now" is Monday 2026-10-05 17:00 in Budapest.
const now = () => Date.parse('2026-10-05T15:00:00Z')

describe('daily run', () => {
  it('reminds tomorrow and asks yesterday for a review, only with consent', async () => {
    const calendar = {
      async list(timeMin) {
        return timeMin.startsWith('2026-10-05T22') // tomorrow (Tue) starts 22:00 UTC
          ? [ev('2026-10-06T08:00:00.000Z', true), ev('2026-10-06T10:00:00.000Z', false)]
          : [ev('2026-10-04T08:00:00.000Z', true, 'bela@example.hu')]
      },
    }
    const sent = []
    const r = await createDaily({ calendar, mailer: { send: async (m) => sent.push(m) }, business, now }).run()
    expect(r).toEqual({ reminders: 1, reviews: 1 })
    expect(sent[0].to).toBe('anna@example.hu')
    expect(sent[0].text).toContain('holnap várlak')
    expect(sent[1].to).toBe('bela@example.hu')
    expect(sent[1].text).toContain('https://review.example')
  })
})
