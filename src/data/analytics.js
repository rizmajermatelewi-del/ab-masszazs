/* Cookieless visitor statistics with Umami (Máté, 2026-09-28). Off until
   `websiteId` is filled in: create the site at cloud.umami.is (or a self-
   hosted Umami) and paste its website id here. Nothing loads while it is
   empty, and the privacy notice mentions analytics only once it is on.

   `domains` makes the tracker count visits on the real domain only, so the
   Vercel preview and local development never pollute the numbers. */
export const ANALYTICS = {
  websiteId: '',
  src: 'https://cloud.umami.is/script.js',
  domains: 'abmasszazs.hu,www.abmasszazs.hu',
}

export const ANALYTICS_ON = Boolean(ANALYTICS.websiteId)

/* Adds the tracker once, in the browser. */
export function loadAnalytics(doc = document) {
  if (!ANALYTICS_ON || doc.querySelector('script[data-website-id]')) return
  const s = doc.createElement('script')
  s.defer = true
  s.src = ANALYTICS.src
  s.dataset.websiteId = ANALYTICS.websiteId
  s.dataset.domains = ANALYTICS.domains
  s.dataset.doNotTrack = 'true'
  doc.head.appendChild(s)
}

/* Records a named event from code (form sent, etc.). A no-op while
   analytics is off or the tracker has not loaded. Links use the
   data-umami-event attribute instead, which needs no script. */
export function track(name) {
  if (typeof window !== 'undefined') window.umami?.track?.(name)
}
