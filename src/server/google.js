import { createSign } from 'node:crypto'
import { TZ } from '../lib/slots.js'

/* Google Calendar through a service account (spec §3): she shares her
   calendar with the account's address, granting "make changes to events",
   and can take it back in two taps. No OAuth consent flow, no refresh
   tokens. A signed JWT is exchanged for an hour-long access token; that is
   the whole of the auth, so no SDK. */

const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url')

export function googleCalendar({ clientEmail, privateKey, calendarId, fetch = globalThis.fetch }) {
  let token = null
  let expires = 0

  async function accessToken() {
    if (token && Date.now() < expires - 60000) return token
    const iat = Math.floor(Date.now() / 1000)
    const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/calendar',
      aud: 'https://oauth2.googleapis.com/token',
      iat,
      exp: iat + 3600,
    })}`
    const sig = createSign('RSA-SHA256').update(unsigned).sign(privateKey, 'base64url')
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${sig}` }),
    })
    if (!res.ok) throw new Error(`google token ${res.status}`)
    const json = await res.json()
    token = json.access_token
    expires = Date.now() + json.expires_in * 1000
    return token
  }

  async function api(path, init = {}) {
    const res = await fetch(`https://www.googleapis.com/calendar/v3${path}`, {
      ...init,
      headers: { authorization: `Bearer ${await accessToken()}`, 'content-type': 'application/json' },
    })
    if (res.status === 404 || res.status === 410) return null
    if (!res.ok) throw new Error(`google calendar ${res.status}`)
    return res.status === 204 ? true : res.json()
  }

  const events = `/calendars/${encodeURIComponent(calendarId)}/events`

  return {
    async busy(timeMin, timeMax) {
      const json = await api('/freeBusy', {
        method: 'POST',
        body: JSON.stringify({ timeMin, timeMax, timeZone: TZ, items: [{ id: calendarId }] }),
      })
      const cal = json.calendars[calendarId]
      // Not shared, or shared without access: fail loudly rather than
      // report a free day that is not.
      if (!cal || cal.errors) throw new Error(`calendar not readable: ${JSON.stringify(cal?.errors)}`)
      return cal.busy
    },
    async insert({ start, end, summary, description }) {
      const json = await api(events, {
        method: 'POST',
        body: JSON.stringify({ start: { dateTime: start }, end: { dateTime: end }, summary, description }),
      })
      return { id: json.id }
    },
    async get(id) {
      const json = await api(`${events}/${encodeURIComponent(id)}`)
      if (!json || json.status === 'cancelled' || !json.start?.dateTime) return null
      return {
        id: json.id,
        start: new Date(json.start.dateTime).toISOString(),
        summary: json.summary ?? '',
        description: json.description ?? '',
      }
    },
    async remove(id) {
      await api(`${events}/${encodeURIComponent(id)}`, { method: 'DELETE' })
    },
  }
}
