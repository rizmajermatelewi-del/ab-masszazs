/* Empty until she says what people actually ask her. The questions on a salon
   site are worth writing only if they are the real ones — "kell-e törölközőt
   hoznom" beats an invented question every time. */
export const FAQ = []

export default function Faq() {
  if (!FAQ.length) return null

  return (
    <section id="gyik" className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl tracking-tight text-ink sm:text-4xl">Gyakori kérdések</h2>
        <dl className="mt-12 space-y-8 border-t border-line pt-8">
          {FAQ.map(({ q, a }) => (
            <div key={q}>
              <dt className="font-display text-lg text-ink">{q}</dt>
              <dd className="mt-3 max-w-prose leading-relaxed text-muted">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
