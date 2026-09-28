import { useEffect, useState } from 'react'
import { BUSINESS } from '../data/business'
import { SERVICES } from '../data/services'
import { FLEXIBLE } from '../server/message.js'
import { openDays, timesFor } from '../lib/requestSlots'
import { formatPrice, formatDuration } from '../lib/format'
import { sendMessage } from '../lib/sendMessage'
import { track } from '../data/analytics'
import { Field, Area, Honeypot, Submit, Consent } from '../components/Form.jsx'
import Reveal from '../components/Reveal.jsx'
import { FormStatus } from './GiftCard.jsx'

export const BOOK_EVENT = 'ab:idopont'

/* The appointment request form: treatment, day, time, details. Until the
   calendar booking is switched on this is how the page takes bookings, so
   every "Időpontfoglalás" button leads here. It is a REQUEST and says so:
   she confirms each one by phone or message.

   The days are computed in the browser (the prerendered HTML would carry
   the build's date); until then the day row shows a quiet placeholder. */
export default function BookingRequest() {
  const [serviceId, setServiceId] = useState(SERVICES[0]?.id)
  const [days, setDays] = useState([])
  const [dayIso, setDayIso] = useState(null)
  const [time, setTime] = useState(null)
  const [state, setState] = useState('idle')

  useEffect(() => setDays(openDays(BUSINESS.hours)), [])

  // "Ezt kérem" in the recommender preselects its treatment here.
  useEffect(() => {
    const onBook = (e) => e.detail && setServiceId(e.detail)
    window.addEventListener(BOOK_EVENT, onBook)
    return () => window.removeEventListener(BOOK_EVENT, onBook)
  }, [])

  if (!SERVICES.length || !BUSINESS.hours.length) return null
  const service = SERVICES.find((s) => s.id === serviceId) ?? SERVICES[0]
  const day = days.find((d) => d.iso === dayIso)
  const times = timesFor(day, service.minutes)
  // A time that no longer fits (longer treatment chosen) is dropped.
  const chosenTime = time === FLEXIBLE || times.includes(time) ? time : null
  const ready = Boolean(day && chosenTime)

  async function submit(e) {
    e.preventDefault()
    if (!ready) return setState('incomplete')
    const f = new FormData(e.currentTarget)
    setState('sending')
    const result = await sendMessage({
      kind: 'booking',
      serviceId: service.id,
      date: day.iso,
      time: chosenTime,
      name: f.get('name'),
      phone: f.get('phone'),
      email: f.get('email'),
      note: f.get('note'),
      website: f.get('website'),
    })
    setState(result)
    if (result === 'sent') track('Időpontkérés elküldve')
  }

  const summary = [
    service.name,
    day ? `${day.weekday.toLowerCase()}, ${day.label}` : null,
    chosenTime === FLEXIBLE ? 'rugalmas időpont' : chosenTime,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <section id="idopont" className="px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="mx-auto max-w-3xl">
        <div className="rounded-shell border border-line bg-tint/60 p-6 shadow-core sm:p-12">
          <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-normal leading-[1.1] text-ink">
            Időpont <em className="text-lotus">kérése</em>
          </h2>
          <p className="mt-4 max-w-[48ch] leading-relaxed text-muted">
            Válassz kezelést, napot és időpontot. Hamarosan visszajelzek, és megerősítem az időpontot.
          </p>

          {state === 'sent' ? (
            <div className="swap-in mt-10">
              <p className="font-display text-3xl text-lotus">Köszönöm!</p>
              <p className="mt-2 text-ink">{summary}</p>
              <p className="mt-2 text-sm text-muted">Hamarosan hívlak vagy írok, hogy megerősítsem.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="relative mt-10 space-y-9">
              <Step n={1} title="Kezelés">
                <div className="grid gap-2 sm:grid-cols-3">
                  {SERVICES.map((s) => (
                    <Choice key={s.id} name="kezeles" checked={s.id === service.id} onChange={() => setServiceId(s.id)}>
                      <span className="block font-display text-xl leading-tight">{s.name}</span>
                      <span className="mt-1 block text-xs opacity-80">
                        {formatDuration(s.minutes)}, {formatPrice(s.price)}
                      </span>
                    </Choice>
                  ))}
                </div>
              </Step>

              <Step n={2} title="Nap">
                <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2">
                  {days.length
                    ? days.map((d) => (
                        <Choice key={d.iso} name="nap" checked={d.iso === dayIso} onChange={() => setDayIso(d.iso)} className="w-24 shrink-0 snap-start whitespace-nowrap text-center">
                          <span className="block text-xs opacity-80">{d.weekday}</span>
                          <span className="mt-0.5 block font-display text-lg">{d.label}</span>
                        </Choice>
                      ))
                    : <span className="text-sm text-muted">A napok betöltése…</span>}
                </div>
              </Step>

              <Step n={3} title="Időpont">
                {day ? (
                  <div key={day.iso + service.id} className="swap-in flex flex-wrap gap-2">
                    {times.map((t) => (
                      <Choice key={t} name="ido" checked={t === chosenTime} onChange={() => setTime(t)} className="min-w-[4.5rem] text-center tabular-nums">
                        {t}
                      </Choice>
                    ))}
                    <Choice name="ido" checked={chosenTime === FLEXIBLE} onChange={() => setTime(FLEXIBLE)}>
                      Rugalmas vagyok
                    </Choice>
                  </div>
                ) : (
                  <p className="text-sm text-muted">Előbb válassz napot.</p>
                )}
              </Step>

              <Step n={4} title="Adataid">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Neved" name="name" required maxLength={80} autoComplete="name" />
                  <Field label="Telefonszámod" name="phone" type="tel" required maxLength={20} autoComplete="tel" />
                </div>
                <div className="mt-5 grid gap-5">
                  <Field label="E-mail (nem kötelező)" name="email" type="email" maxLength={120} autoComplete="email" />
                  <Area label="Üzenet (nem kötelező)" name="note" maxLength={500} />
                </div>
              </Step>
              <Honeypot />

              <div className="rounded-2xl bg-paper/70 p-4 text-sm text-ink" aria-live="polite">
                <span className="text-muted">Kérésed: </span>
                {summary}
              </div>
              <div className="flex flex-wrap items-center gap-5">
                <Submit state={state}>Időpontot kérek</Submit>
                <span className="text-xs text-muted">Ez még nem végleges, megerősítem.</span>
              </div>
              <Consent />
              {state === 'incomplete' ? (
                <p role="alert" className="text-sm text-lotus">Válassz napot és időpontot is.</p>
              ) : null}
              <FormStatus state={state} />
            </form>
          )}
        </div>
      </Reveal>
    </section>
  )
}

function Step({ n, title, children }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 flex items-center gap-3 text-sm font-medium text-ink">
        <span className="grid h-7 w-7 place-items-center rounded-full border border-lotus/60 font-display text-base text-lotus">{n}</span>
        {title}
      </legend>
      {children}
    </fieldset>
  )
}

/* A radio that looks like a card. Native input underneath for keyboard and
   screen readers. */
function Choice({ name, checked, onChange, className = '', children }) {
  return (
    <label className={`relative cursor-pointer ${className}`}>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="block min-h-[44px] rounded-2xl border border-line bg-paper/70 px-4 py-2.5 text-sm text-ink transition-[background-color,color,border-color,transform] duration-300 ease-fluid hover:border-lotus/60 active:scale-[0.98] peer-checked:border-lotus peer-checked:bg-lotus peer-checked:text-paper peer-focus-visible:ring-2 peer-focus-visible:ring-lotus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-paper">
        {children}
      </span>
    </label>
  )
}
