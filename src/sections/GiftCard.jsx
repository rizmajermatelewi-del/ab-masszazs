import { useEffect, useRef, useState } from 'react'
import { BUSINESS } from '../data/business'
import { GIFT_CARD } from '../data/content'
import { SERVICES } from '../data/services'
import { VOUCHER_MONTHS } from '../server/message.js'
import { formatPrice, formatDuration } from '../lib/format'
import { sendMessage } from '../lib/sendMessage'
import { Field, Area, Pills, Honeypot, Submit, Consent } from '../components/Form.jsx'
import Lotus from '../components/Lotus.jsx'
import Reveal from '../components/Reveal.jsx'
import { GIFT_EVENT } from './Recommender.jsx'
import { track } from '../data/analytics'

/* Gift voucher request. The card on the left is the voucher itself, written
   as you type: who it is for, which treatment, your message. Sending turns it
   over, and the back says what happens next. Payment and hand-over are in
   person (Máté, 2026-09-28), so this is a request, not a checkout, and the
   page says so before anyone presses anything.

   Behind GIFT_CARD.enabled: an offer she does not make must not appear. */
export default function GiftCard() {
  const [serviceId, setServiceId] = useState(SERVICES[0]?.id)
  const [recipient, setRecipient] = useState('')
  const [note, setNote] = useState('')
  const [phone, setPhone] = useState('')
  const [state, setState] = useState('idle') // idle | sending | sent | invalid | failed
  const cardRef = useRef(null)

  // "Ajándékba adnám" in the recommender preselects its treatment here.
  useEffect(() => {
    const onGift = (e) => e.detail && setServiceId(e.detail)
    window.addEventListener(GIFT_EVENT, onGift)
    return () => window.removeEventListener(GIFT_EVENT, onGift)
  }, [])

  if (!GIFT_CARD.enabled || !SERVICES.length) return null
  const service = SERVICES.find((s) => s.id === serviceId) ?? SERVICES[0]

  async function submit(e) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setState('sending')
    const result = await sendMessage({
      kind: 'voucher',
      serviceId: service.id,
      recipient,
      note,
      name: f.get('name'),
      phone,
      email: f.get('email'),
      website: f.get('website'),
    })
    setState(result)
    if (result === 'sent') track('Utalvány elküldve')
    // On a phone the button is far below the card: bring the card back so
    // the visitor sees it turn over and reads what happens next.
    const card = cardRef.current
    if (result === 'sent' && card && card.getBoundingClientRect().top < 0) {
      card.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }

  return (
    <section id="ajandek" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-[16ch] text-[clamp(2.25rem,5.5vw,4rem)] font-normal leading-[1.05] text-ink">
            Ajándékutalvány, <em className="text-lotus">személyre szabva</em>
          </h2>
          <p className="mt-5 max-w-[48ch] leading-relaxed text-muted">
            Írd be, kinek szól, és az utalvány már készül is. Fizetés és átvétel személyesen, Inárcson.
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-12 md:grid-cols-2 md:gap-16">
          {/* The voucher: front while filling in, back once sent. */}
          <div ref={cardRef} className="flip-card scroll-mt-28 md:sticky md:top-28">
            <div className={`flip-inner relative aspect-[16/10] ${state === 'sent' ? 'is-flipped' : ''}`}>
              <div className="flip-face absolute inset-0 overflow-hidden rounded-shell bg-lotus p-7 text-paper shadow-liftHover sm:p-9">
                <div aria-hidden="true" className="absolute inset-3 rounded-core border border-paper/25" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-label text-paper/75">
                      Ajándékutalvány
                    </span>
                    <Lotus className="h-7 w-10 text-paper/80" />
                  </div>
                  <div>
                    <p className={`font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight ${recipient ? '' : 'text-paper/45'}`}>
                      {recipient || 'A megajándékozott neve'}
                    </p>
                    <p key={service.id} className="swap-in mt-1 text-sm text-paper/85">
                      {service.name}, {formatDuration(service.minutes)}
                    </p>
                    {note ? (
                      <p className="mt-3 line-clamp-2 font-display text-lg italic leading-snug text-paper/90">„{note}”</p>
                    ) : null}
                  </div>
                  <div className="flex items-end justify-between gap-4 text-[11px] text-paper/70">
                    <span>Érvényes a kiállítástól számított {VOUCHER_MONTHS} hónapig</span>
                    <span className="shrink-0 font-display text-base text-paper">{BUSINESS.name}</span>
                  </div>
                </div>
              </div>

              <div className="flip-face flip-back absolute inset-0 flex flex-col items-center justify-center rounded-shell bg-tint p-8 text-center shadow-liftHover">
                <Lotus className="h-9 w-14 text-lotus" />
                <p className="mt-4 font-display text-3xl text-lotus">Köszönöm!</p>
                <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-ink">
                  Hamarosan hívlak{phone ? ` a ${phone} számon` : ''}, és megbeszéljük az átvételt.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="relative space-y-7">
            <Pills
              legend="Melyik kezelésre szóljon?"
              name="kezeles"
              options={SERVICES.map((s) => ({ value: s.id, label: `${s.name}, ${formatPrice(s.price)}` }))}
              value={service.id}
              onChange={setServiceId}
            />
            <Field
              label="Kinek szól?"
              name="recipient"
              required
              maxLength={60}
              autoComplete="off"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <Area
              label="Üzenet az utalványra (nem kötelező)"
              name="note"
              maxLength={140}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              hint={`${note.length}/140`}
            />

            <div className="border-t border-line pt-7">
              <p className="text-sm text-muted">A te adataid, hogy vissza tudjalak hívni:</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Neved" name="name" required maxLength={80} autoComplete="name" />
                <Field
                  label="Telefonszámod"
                  name="phone"
                  type="tel"
                  required
                  maxLength={20}
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <Field label="E-mail (nem kötelező)" name="email" type="email" maxLength={120} autoComplete="email" />
              </div>
            </div>
            <Honeypot />

            <div className="flex flex-wrap items-center gap-5">
              <Submit state={state}>Utalványt kérek</Submit>
              <span className="text-xs text-muted">Nem kell előre fizetned.</span>
            </div>
            <Consent />
            <FormStatus state={state} />
          </form>
        </div>
      </div>
    </section>
  )
}

/* The two outcomes that are not success, said in words, with the phone
   number as the way out. Shared with the callback form. */
export function FormStatus({ state }) {
  if (state !== 'invalid' && state !== 'failed') return null
  return (
    <p role="alert" className="text-sm leading-relaxed text-lotus">
      {state === 'invalid'
        ? 'Nézd át a mezőket, főleg a telefonszámot.'
        : `Most nem sikerült elküldeni. Hívj a ${BUSINESS.phone} számon, vagy írj Messengeren.`}
    </p>
  )
}
