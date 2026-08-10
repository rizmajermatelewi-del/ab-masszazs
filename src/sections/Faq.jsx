/* Empty until she says what people actually ask her. The questions on a salon
   site are worth writing only if they are the real ones — "kell-e törölközőt
   hoznom" beats an invented question every time. */
export const FAQ = []

export default function Faq() {
  if (!FAQ.length) return null

  return (
    <section id="gyik" className="px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight text-stone-900">Gyakori kérdések</h2>
        <dl className="mt-10 space-y-8">
          {FAQ.map(({ q, a }) => (
            <div key={q}>
              <dt className="font-medium text-stone-900">{q}</dt>
              <dd className="mt-2 leading-relaxed text-stone-600">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
