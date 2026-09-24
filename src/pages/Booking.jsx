import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/business'
import { SERVICES } from '../data/services'
import { DEMO } from '../data/demo'
import { BOOKING_ONLINE } from '../data/booking'
import DemoBanner from '../components/DemoBanner.jsx'
import Footer from '../sections/Footer.jsx'
import { formatPrice, formatDuration } from '../lib/format'
import { localDate, RULES, TZ } from '../lib/slots'
import { fetchSlots, submitBooking } from '../lib/bookingApi'

/* The booking flow (spec §4): service -> day -> free time -> details, on one
   screen, each step appearing once the one before it is answered. No
   account, no password, nothing asked that she does not need. */

const WEEKDAY = { Vasárnap: 0, Hétfő: 1, Kedd: 2, Szerda: 3, Csütörtök: 4, Péntek: 5, Szombat: 6 }
const dayLabel = new Intl.DateTimeFormat('hu-HU', { timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric' })
const timeLabel = new Intl.DateTimeFormat('hu-HU', { timeZone: TZ, hour: '2-digit', minute: '2-digit' })
const fullLabel = new Intl.DateTimeFormat('hu-HU', { timeZone: TZ, dateStyle: 'full', timeStyle: 'short' })

const PAGE = 14

/* Local dates she works on, from today to the horizon. */
function openDays() {
  const open = new Set(BUSINESS.hours.map((h) => WEEKDAY[h.day]))
  const [y, m, d] = localDate(Date.now()).split('-').map(Number)
  const out = []
  for (let k = 0; k <= RULES.horizonDays; k++) {
    const day = new Date(Date.UTC(y, m - 1, d + k))
    if (open.has(day.getUTCDay())) out.push(day.toISOString().slice(0, 10))
  }
  return out
}

const MESSAGES = {
  taken: 'Ezt az időpontot közben valaki lefoglalta. Válassz egy másikat a frissített listából.',
  invalid: 'Valamelyik adat hiányzik vagy nem jó formátumú. Nézd át, kérlek.',
  limited: 'Túl sok próbálkozás érkezett erről a hálózatról. Próbáld újra pár perc múlva, vagy hívj.',
}

function Step({ n, title, children }) {
  return (
    <section className="border-t border-line pt-8 motion-safe:animate-[rise_0.6s_cubic-bezier(0.32,0.72,0,1)]">
      <h2 className="flex items-baseline gap-3 font-display text-2xl tracking-tight text-ink">
        <span className="font-sans text-xs tabular-nums text-clay">{String(n).padStart(2, '0')}</span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

const choice = (on) =>
  `rounded-2xl border px-4 py-3 text-left transition-[border-color,background-color,box-shadow] duration-500 ease-fluid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay ${
    on ? 'border-ink bg-ink text-paper' : 'border-line bg-paper hover:border-ink/40'
  }`

export default function Booking() {
  const [serviceId, setServiceId] = useState(null)
  const [date, setDate] = useState(null)
  const [shown, setShown] = useState(PAGE)
  const [slots, setSlots] = useState(null)
  const [start, setStart] = useState(null)
  const [state, setState] = useState(BOOKING_ONLINE ? 'idle' : 'down') // idle | loading | sending | done | down
  const [error, setError] = useState(null)
  const [done, setDone] = useState(null)
  const [refresh, setRefresh] = useState(0)
  const days = useMemo(openDays, [])
  const service = SERVICES.find((s) => s.id === serviceId)
  const detailsRef = useRef(null)

  useEffect(() => {
    if (!service || !date) return undefined
    let live = true
    setSlots(null)
    setState('loading')
    fetchSlots(service, date)
      .then((s) => live && (setSlots(s), setState('idle')))
      .catch(() => live && setState('down'))
    return () => {
      live = false
    }
  }, [service, date, refresh])

  function pickService(id) {
    setServiceId(id)
    setStart(null)
    setError(null)
  }
  function pickDate(d) {
    setDate(d)
    setStart(null)
    setError(null)
  }
  function pickStart(s) {
    setStart(s)
    setError(null)
    requestAnimationFrame(() => detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setState('sending')
    setError(null)
    const r = await submitBooking({
      serviceId,
      start,
      name: f.get('name'),
      phone: f.get('phone'),
      email: f.get('email'),
      note: f.get('note'),
      consent: f.get('consent') === 'on',
      website: f.get('website'),
    })
    if (r.ok) {
      setDone({ ...r, service, email: f.get('email') })
      setState('done')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (r.code === 'unavailable') {
      setState('down')
    } else {
      setState('idle')
      setError(MESSAGES[r.code] ?? MESSAGES.invalid)
      if (r.code === 'taken') {
        setStart(null)
        setRefresh((n) => n + 1)
      }
    }
  }

  const tel = BUSINESS.phone ? `tel:${BUSINESS.phone.replace(/\s/g, '')}` : null

  return (
    <>
      <DemoBanner />
      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 pt-8 sm:px-8">
        <Link to="/" className="font-display text-lg tracking-tight text-ink">
          {BUSINESS.name}
        </Link>
        {tel && (
          <a href={tel} className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
            {BUSINESS.phone}
          </a>
        )}
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
        {state === 'done' && done ? (
          <div role="status" className="rounded-3xl border border-line bg-tint p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-clay">{done.demo ? 'Demó — nem jött létre foglalás' : 'Lefoglalva'}</p>
            <h1 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">Várlak!</h1>
            <p className="mt-5 text-lg text-ink">
              {done.service.name}, {formatDuration(done.service.minutes)}
              <br />
              {fullLabel.format(new Date(done.start))}
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              {done.demo
                ? 'Élesben ide egy visszaigazoló e-mail érkezne, benne a lemondás linkjével.'
                : `A visszaigazolást elküldtem a(z) ${done.email} címre. Ha mégsem jó az időpont, az e-mailben lévő linkkel le tudod mondani.`}
            </p>
            <Link to="/" className="mt-8 inline-block text-sm text-clay underline underline-offset-4">
              Vissza a főoldalra
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">Időpontfoglalás</h1>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              Válassz kezelést, napot és időpontot. A foglalás azonnal rögzül, és e-mailben visszaigazolom.
            </p>

            {state === 'down' && (
              <div role="alert" className="mt-8 rounded-2xl border border-clay/40 bg-tint p-5 text-ink">
                {BOOKING_ONLINE ? 'Az online foglalás most technikai okból nem elérhető.' : 'Időpontot most telefonon tudsz foglalni.'}
                {tel && (
                  <>
                    {' '}
                    Hívj, és telefonon egyeztetünk:{' '}
                    <a href={tel} className="font-medium text-clay underline underline-offset-4">
                      {BUSINESS.phone}
                    </a>
                  </>
                )}
              </div>
            )}

            {state !== 'down' && (
            <div className="mt-12 space-y-12">
              <Step n={1} title="Kezelés">
                <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Kezelés">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      role="radio"
                      aria-checked={serviceId === s.id}
                      onClick={() => pickService(s.id)}
                      className={choice(serviceId === s.id)}
                    >
                      <span className="block font-medium">{s.name}</span>
                      <span className={`mt-1 block text-sm ${serviceId === s.id ? 'text-paper/75' : 'text-muted'}`}>
                        {formatDuration(s.minutes)} · {formatPrice(s.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </Step>

              {service && (
                <Step n={2} title="Nap">
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5" role="radiogroup" aria-label="Nap">
                    {days.slice(0, shown).map((d) => (
                      <button
                        key={d}
                        type="button"
                        role="radio"
                        aria-checked={date === d}
                        onClick={() => pickDate(d)}
                        className={`${choice(date === d)} text-center text-sm capitalize`}
                      >
                        {dayLabel.format(new Date(`${d}T00:00:00Z`))}
                      </button>
                    ))}
                  </div>
                  {shown < days.length && (
                    <button
                      type="button"
                      onClick={() => setShown((n) => n + PAGE)}
                      className="mt-4 text-sm text-clay underline underline-offset-4"
                    >
                      Későbbi napok
                    </button>
                  )}
                </Step>
              )}

              {service && date && state !== 'down' && (
                <Step n={3} title="Időpont">
                  {state === 'loading' || slots === null ? (
                    <p className="text-muted" aria-live="polite">
                      Szabad időpontok betöltése…
                    </p>
                  ) : slots.length === 0 ? (
                    <p className="text-muted" aria-live="polite">
                      Erre a napra már nincs szabad időpont. Válassz egy másik napot.
                    </p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6" role="radiogroup" aria-label="Időpont">
                      {slots.map((s) => (
                        <button
                          key={s}
                          type="button"
                          role="radio"
                          aria-checked={start === s}
                          onClick={() => pickStart(s)}
                          className={`${choice(start === s)} text-center tabular-nums`}
                        >
                          {timeLabel.format(new Date(s))}
                        </button>
                      ))}
                    </div>
                  )}
                </Step>
              )}

              {start && state !== 'down' && (
                <div ref={detailsRef} className="scroll-mt-8">
                  <Step n={4} title="Adataid">
                    <p className="mb-6 rounded-2xl bg-tint px-4 py-3 text-ink">
                      {service.name}, {formatDuration(service.minutes)} · {fullLabel.format(new Date(start))}
                    </p>
                    <form onSubmit={onSubmit} className="space-y-5">
                      <Field label="Neved" name="name" autoComplete="name" required minLength={2} maxLength={80} />
                      <Field label="Telefonszám" name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={20} />
                      <Field label="E-mail cím" name="email" type="email" autoComplete="email" required maxLength={120} />
                      <label className="block">
                        <span className="text-sm font-medium text-ink">Megjegyzés (nem kötelező)</span>
                        <span className="mt-1 block text-sm text-muted">
                          Gyakorlati dolgokra, például parkolás. Egészségügyi részleteket inkább személyesen beszéljük meg.
                        </span>
                        <textarea
                          name="note"
                          rows={3}
                          maxLength={500}
                          className="mt-2 w-full rounded-2xl border border-line bg-paper px-4 py-3 text-ink focus:border-ink focus:outline-none"
                        />
                      </label>
                      {/* Honeypot: invisible to people, filled by bots. */}
                      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                        <label>
                          Weboldal
                          <input name="website" tabIndex={-1} autoComplete="off" />
                        </label>
                      </div>
                      <label className="flex items-start gap-3 text-sm leading-relaxed text-ink">
                        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[#231F1C]" />
                        <span>
                          Elolvastam az{' '}
                          <Link to="/adatvedelem" className="text-clay underline underline-offset-4">
                            adatkezelési tájékoztatót
                          </Link>
                          , és hozzájárulok, hogy a foglaláshoz megadott adataimat kezeld.
                        </span>
                      </label>

                      {error && (
                        <p role="alert" className="rounded-2xl border border-clay/40 bg-tint px-4 py-3 text-ink">
                          {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={state === 'sending'}
                        className="inline-flex min-h-[56px] items-center rounded-full bg-ink px-8 text-sm font-medium text-paper shadow-lift transition-[transform,background-color] duration-700 ease-fluid hover:bg-clay active:scale-[0.98] disabled:opacity-60"
                      >
                        {state === 'sending' ? 'Foglalás folyamatban…' : 'Lefoglalom'}
                      </button>
                      {DEMO && <p className="text-sm text-muted">Demó: a gomb nem hoz létre valódi foglalást, és nem küld e-mailt.</p>}
                    </form>
                  </Step>
                </div>
              )}
            </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

function Field({ label, ...input }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        {...input}
        className="mt-2 block min-h-[52px] w-full rounded-2xl border border-line bg-paper px-4 text-ink focus:border-ink focus:outline-none"
      />
    </label>
  )
}
