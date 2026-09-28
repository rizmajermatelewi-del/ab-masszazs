import { handle, bookingFromEnv, messagesFromEnv } from '../../src/server/http.js'

/* The host adapter: everything else lives in src/server/http.js. Built once
   per instance, so the Google access token is reused between requests. */
const booking = bookingFromEnv(process.env)
const messages = messagesFromEnv(process.env)

export default (req, context) => handle(req, booking, context.ip, messages)

export const config = { path: '/api/*' }
