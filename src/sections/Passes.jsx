import { useState } from 'react'
import { SERVICES } from '../data/services'
import { PASSES, passPrice } from '../data/passes'
import { REFERRAL } from '../data/referral'
import { formatPrice } from '../lib/format'
import { Pills } from '../components/Form.jsx'
import Reveal from '../components/Reveal.jsx'
import { track } from '../data/analytics'
import { BOOK_EVENT } from './BookingRequest.jsx'

/* Bérlet calculator beside the "bring a friend" offer: the two ways a
   regular pays less. Pick a treatment and a size, see the saving, and one
   button carries both into the appointment request. Numbers are FILLER
   until Brigitta sets them (data/passes.js, data/referral.js). */
export default function Passes() {
  const [serviceId, setServiceId] = useState(SERVICES[0]?.id)
  const [size, setSize] = useState(PASSES.sizes[0])
  if (!SERVICES.length) return null

  const service = SERVICES.find((s) => s.id === serviceId) ?? SERVICES[0]
  const { full, price, saving } = passPrice(service.price, size)

  function ask() {
    track('Bérletet kérek')
    window.dispatchEvent(new CustomEvent(BOOK_EVENT, { detail: { serviceId: service.id, pass: size } }))
    document.getElementById('idopont')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="berlet" className="px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-[16ch] text-[clamp(2.25rem,5.5vw,4rem)] font-normal leading-[1.05] text-ink">
            Rendszeresen <em className="text-lotus">jönnél?</em>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-shell border border-line bg-tint/60 p-7 shadow-core sm:p-9">
            <h3 className="font-display text-2xl text-ink">Bérlet</h3>
            <div className="mt-6 space-y-6">
              <Pills
                legend="Kezelés"
                name="berlet-kezeles"
                options={SERVICES.map((s) => ({ value: s.id, label: s.name }))}
                value={service.id}
                onChange={setServiceId}
              />
              <Pills
                legend="Alkalom"
                name="berlet-db"
                options={PASSES.sizes.map((n) => ({ value: n, label: `${n} alkalom` }))}
                value={size}
                onChange={setSize}
              />
            </div>

            <div key={`${service.id}-${size}`} className="swap-in mt-8 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-sm text-muted line-through">{formatPrice(full)}</p>
                <p className="font-display text-4xl text-lotus">{formatPrice(price)}</p>
                <p className="mt-1 text-sm text-ink">
                  Megtakarítás: <strong>{formatPrice(saving)}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={ask}
                className="inline-flex min-h-[52px] items-center rounded-full bg-lotus px-7 text-sm font-semibold text-paper shadow-lift transition-[transform,background-color] duration-500 ease-fluid hover:bg-ink active:scale-[0.98]"
              >
                Bérletet kérek
              </button>
            </div>
          </div>

          {REFERRAL.text ? (
            <div className="flex flex-col justify-between rounded-shell bg-lotus p-7 text-paper shadow-liftHover sm:p-9">
              <div>
                <h3 className="font-display text-2xl">Hozd el a barátodat</h3>
                <p className="mt-4 leading-relaxed text-paper/90">{REFERRAL.text}</p>
              </div>
              <p className="mt-8 text-sm text-paper/75">
                Az időpontkérésnél írd be, ki ajánlott, és mindkettőtöknek levonom.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
