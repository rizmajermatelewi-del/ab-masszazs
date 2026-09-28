import { useState } from 'react'
import { SERVICES } from '../data/services'
import { WHEN } from '../server/message.js'
import { sendMessage } from '../lib/sendMessage'
import { Field, Area, Pills, Honeypot, Submit, Consent } from '../components/Form.jsx'
import Reveal from '../components/Reveal.jsx'
import { FormStatus } from './GiftCard.jsx'

/* For the visitor who is on the page at 22:00, or who would rather not ring
   first: leave a number and a time window, and she calls back. Goes to her
   inbox through /api/message like the voucher form. */
export default function Callback() {
  const [when, setWhen] = useState('de')
  const [interest, setInterest] = useState('')
  const [state, setState] = useState('idle')

  async function submit(e) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setState('sending')
    setState(
      await sendMessage({
        kind: 'callback',
        name: f.get('name'),
        phone: f.get('phone'),
        when,
        serviceId: interest || undefined,
        note: f.get('note'),
        website: f.get('website'),
      }),
    )
  }

  return (
    <section id="visszahivas" className="px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="mx-auto max-w-2xl">
        <div className="rounded-shell border border-line bg-tint/60 p-8 shadow-core sm:p-12">
          <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-normal leading-[1.1] text-ink">
            Inkább <em className="text-lotus">visszahívlak</em>
          </h2>
          <p className="mt-4 max-w-[44ch] leading-relaxed text-muted">
            Hagyd itt a számod, és a megadott idősávban hívlak, hogy megbeszéljük az időpontot.
          </p>

          {state === 'sent' ? (
            <div className="swap-in mt-10">
              <p className="font-display text-3xl text-lotus">Köszönöm!</p>
              <p className="mt-2 text-ink">{WHEN[when]} hívlak.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="relative mt-10 space-y-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Neved" name="name" required maxLength={80} autoComplete="name" />
                <Field label="Telefonszámod" name="phone" type="tel" required maxLength={20} autoComplete="tel" />
              </div>
              <Pills
                legend="Mikor hívhatlak?"
                name="mikor"
                options={Object.entries(WHEN).map(([value, label]) => ({ value, label }))}
                value={when}
                onChange={setWhen}
              />
              <Pills
                legend="Mi érdekel?"
                name="erdekel"
                options={[
                  ...SERVICES.map((s) => ({ value: s.id, label: s.name })),
                  { value: '', label: 'Még nem tudom' },
                ]}
                value={interest}
                onChange={setInterest}
              />
              <Area label="Üzenet (nem kötelező)" name="note" maxLength={500} />
              <Honeypot />
              <Submit state={state}>Kérem a visszahívást</Submit>
              <Consent />
              <FormStatus state={state} />
            </form>
          )}
        </div>
      </Reveal>
    </section>
  )
}
