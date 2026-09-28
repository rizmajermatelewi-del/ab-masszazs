import { dailyFromEnv } from '../../src/server/http.js'

/* Netlify scheduled function: once a day at 16:00 UTC (17:00 in winter,
   18:00 in summer, Budapest). Reminders for tomorrow and review requests
   for yesterday, only for clients who ticked the consent box. Does nothing
   until the same environment variables as online booking are set. */
export default async () => {
  const daily = dailyFromEnv(process.env)
  if (!daily) return new Response('not configured', { status: 200 })
  const sent = await daily.run()
  return new Response(JSON.stringify(sent), { status: 200 })
}

export const config = { schedule: '0 16 * * *' }
