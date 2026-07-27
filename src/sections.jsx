import { useEffect, useRef, useState } from 'react'
import {
  Sparkles,
  Gift,
  Quote,
  Star,
  Plus,
  Check,
  Clock,
  MapPin,
  Phone,
  CalendarCheck,
  ArrowUpRight,
  ArrowRight,
  Leaf,
  X,
  ChevronDown,
} from 'lucide-react'
import {
  BOOKING_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  ADDRESS,
  MAPS_URL,
  FACEBOOK_URL,
  HOURS,
  PRICING,
  PACKAGES,
  FAQ,
  TESTIMONIALS,
  GALLERY,
  TREATMENTS,
} from './config'

/* ------------------------------------------------------------------ *
 * Reveal — belépő animáció görgetésre. Egy IntersectionObserver
 * kapcsol egy állapotot, a mozgást a CSS transition adja.
 * ------------------------------------------------------------------ */
export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${className}`}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(28px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* Közös szekciófejléc */
function SectionHead({ eyebrow, title, accent, sub, dark = false }) {
  return (
    <Reveal className="max-w-2xl">
      <p
        className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] ${
          dark ? 'text-accent' : 'text-primary'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-5 font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance ${
          dark ? 'text-white' : ''
        }`}
      >
        {title}{' '}
        <span className={`font-serif italic ${dark ? 'text-primary-light' : 'text-primary'}`}>
          {accent}
        </span>
      </h2>
      {sub && (
        <p
          className={`mt-5 font-body text-sm sm:text-base leading-relaxed ${
            dark ? 'text-white/60' : 'text-muted'
          }`}
        >
          {sub}
        </p>
      )}
    </Reveal>
  )
}

/* ================================================================== *
 * RÓLAM
 * ================================================================== */
export function About() {
  return (
    <section id="rolam" className="py-24 sm:py-32 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <div className="group relative rounded-4xl overflow-hidden shadow-xl shadow-primary/10">
              <img
                src="/img/therapist.jpg"
                alt="AB Masszázs — a kezelő"
                className="w-full aspect-square object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-40" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-2.5 rounded-2xl glass px-4 py-3 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <Leaf className="h-4 w-4 text-primary shrink-0" />
                <span className="font-body text-xs text-ink/80">Testben lélekben harmóniában</span>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <SectionHead eyebrow="Rólam" title="Ki fog" accent="masszírozni?" />

            <Reveal delay={100}>
              <p className="mt-8 font-body text-sm sm:text-base text-muted leading-relaxed max-w-xl">
                Három technikával dolgozom — Yumeiho terápiával, svédmasszázzsal és
                talpreflexológiával —, és mindig azzal, amire aznap a testednek szüksége van. Nem
                futószalag: egyszerre egy vendéget fogadok Inárcson, hogy a kezelés végig rólad
                szóljon.
              </p>
              <p className="mt-4 font-body text-sm sm:text-base text-muted/70 leading-relaxed max-w-xl italic">
                [Ide írd a saját történeted 3–4 mondatban: mikor és miért kezdtél masszírozni, hol
                végezted a képzéseidet, mi az, amiben a legerősebb vagy. Ez a szakasz hozza a
                legtöbb bizalmat — érdemes személyesre venni.]
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-9 grid sm:grid-cols-3 gap-3">
                {[
                  { icon: Sparkles, label: '3 kezelési módszer' },
                  { icon: MapPin, label: 'Inárcs, saját kezelő' },
                  { icon: Clock, label: 'Egyszerre egy vendég' },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="group flex items-center gap-3 rounded-2xl border border-divider bg-background px-4 py-3.5 transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.04] hover:-translate-y-0.5"
                  >
                    <b.icon className="h-4 w-4 text-primary shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-body text-xs font-medium text-ink/80">{b.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================== *
 * ÁRLISTA
 * ================================================================== */
export function Pricing() {
  return (
    <section id="arak" className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHead
          eyebrow="Árlista"
          title="Átlátható"
          accent="árak"
          sub="Nem kell telefonálnod ahhoz, hogy megtudd, mennyibe kerül. Minden kezelés ára és hossza itt van."
        />

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {PRICING.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 120}>
              <div
                className={`group relative h-full rounded-4xl border p-7 sm:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/15 ${
                  cat.featured
                    ? 'border-primary/40 bg-surface ring-1 ring-primary/20'
                    : 'border-divider bg-surface hover:border-primary/30'
                }`}
              >
                {cat.featured && (
                  <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white shadow-lg shadow-primary/30">
                    <Star className="h-3 w-3 fill-current" /> Legkeresettebb
                  </span>
                )}

                <h3 className="font-display text-2xl font-semibold">{cat.name}</h3>
                <p className="mt-2 font-body text-sm text-muted leading-relaxed">{cat.blurb}</p>

                <div className="mt-7 space-y-1">
                  {cat.rows.map((r) => (
                    <div
                      key={r.label}
                      className="flex items-baseline justify-between gap-3 rounded-xl px-3 py-3 -mx-3 transition-colors duration-300 hover:bg-primary/[0.05]"
                    >
                      <span className="min-w-0">
                        <span className="block font-body text-sm text-ink/85">{r.label}</span>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted mt-0.5">
                          {r.time}
                        </span>
                      </span>
                      <span className="font-display text-xl font-semibold text-primary whitespace-nowrap">
                        {r.price}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-primary group/link"
                >
                  Foglalok erre
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bérletek */}
        <Reveal delay={150}>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {PACKAGES.map((p) => (
              <div
                key={p.label}
                className="group flex items-center justify-between gap-4 rounded-2.5xl border border-divider bg-surface px-6 py-5 transition-all duration-300 hover:border-accent/50 hover:bg-accent/[0.04]"
              >
                <span>
                  <span className="block font-display text-lg font-semibold">{p.label}</span>
                  <span className="block font-body text-xs text-muted mt-0.5">{p.note}</span>
                </span>
                <span className="font-display text-2xl font-bold text-accent-dark transition-transform duration-300 group-hover:scale-110">
                  {p.price}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-8 font-body text-xs text-muted text-center max-w-2xl mx-auto leading-relaxed">
            A feltüntetett árak tájékoztató jellegűek. Kúraszerű kezelés vagy egyedi igény esetén
            hívj — megbeszéljük.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ================================================================== *
 * AJÁNDÉKUTALVÁNY
 * ================================================================== */
export function GiftCard() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <Reveal>
          <div className="group relative overflow-hidden rounded-4xl bg-gradient-to-br from-primary via-primary-dark to-deep p-8 sm:p-14">
            {/* Dekor */}
            <div className="absolute -top-16 -right-10 h-56 w-56 rounded-full bg-accent/20 blur-3xl transition-all duration-1000 group-hover:bg-accent/30 group-hover:scale-110" />
            <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-primary-light/20 blur-3xl transition-all duration-1000 group-hover:scale-110" />
            {[
              { top: '18%', left: '8%', s: 16, d: 0 },
              { top: '62%', left: '88%', s: 12, d: 1.4 },
              { top: '80%', left: '22%', s: 10, d: 2.6 },
            ].map((p, i) => (
              <svg
                key={i}
                viewBox="0 0 16 22"
                className="absolute animate-float text-white/15"
                style={{ top: p.top, left: p.left, width: p.s, animationDelay: `${p.d}s` }}
                aria-hidden="true"
              >
                <path d="M8 1c5 6 5 14 0 20C3 15 3 7 8 1z" fill="currentColor" />
              </svg>
            ))}

            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur">
                  <Gift className="h-3.5 w-3.5" /> Ajándékutalvány
                </span>
                <h2 className="mt-6 font-display text-3xl sm:text-5xl font-bold text-white tracking-tight text-balance">
                  Ajándékozz <span className="font-serif italic text-accent">feltöltődést</span>
                </h2>
                <p className="mt-5 font-body text-sm sm:text-base text-white/70 leading-relaxed max-w-lg">
                  Születésnapra, anyák napjára vagy csak úgy. Az utalvány bármelyik kezelésre
                  beváltható, és a vásárlástól számított 12 hónapig érvényes.
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {['Bármelyik kezelésre', '12 hónap érvényesség', 'Névre szóló'].map((t) => (
                    <li key={t} className="flex items-center gap-2 font-body text-xs text-white/60">
                      <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-4 flex lg:justify-end">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="magnetic-btn inline-flex items-center gap-2 bg-accent text-deep px-7 py-4 rounded-full font-body font-bold shadow-xl shadow-black/20"
                >
                  <Phone className="h-4 w-4" strokeWidth={2.5} />
                  Utalványt kérek
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ================================================================== *
 * VÉLEMÉNYEK
 * ================================================================== */
export function Testimonials() {
  if (!TESTIMONIALS.length) return null

  return (
    <section className="py-24 sm:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHead
          eyebrow="Vendégeim mondták"
          title="Amit a kezelés"
          accent="után éreztek"
          sub="A legőszintébb visszajelzés az, ami néhány nappal a kezelés után is igaz."
        />

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 130}>
              <figure className="group relative h-full rounded-4xl border border-divider bg-background p-7 sm:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                <Quote
                  className="h-8 w-8 text-primary/15 transition-all duration-500 group-hover:text-primary/30 group-hover:scale-110"
                  strokeWidth={2}
                />
                <div className="mt-4 flex gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="mt-5 font-body text-sm text-ink/80 leading-relaxed">
                  {t.text}
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-divider">
                  <span className="block font-display text-lg font-semibold">{t.author}</span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted mt-0.5">
                    {t.meta}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Valódi véleményeket gyűjtő blokk — ez tölti fel a fenti kártyákat */}
        <Reveal delay={200}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-4xl border border-dashed border-primary/30 bg-primary/[0.04] px-7 py-6">
            <p className="font-body text-sm text-muted text-center sm:text-left max-w-lg">
              <span className="font-semibold text-ink">Jártál már nálam?</span> Egy rövid
              visszajelzés sokat segít annak, aki most bizonytalankodik — és nekem is.
            </p>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 font-body text-sm font-semibold text-white shadow-lg shadow-primary/25"
            >
              <Star className="h-4 w-4 fill-current" />
              Írok véleményt
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ================================================================== *
 * GYIK — accordion
 * ================================================================== */
export function FAQSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="gyik" className="py-24 sm:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="Gyakori kérdések"
          title="Amit sokan"
          accent="megkérdeznek"
          sub="Ha valamire itt nem találsz választ, hívj nyugodtan — szívesen átbeszéljük."
        />

        <div className="mt-14 space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div
                  className={`rounded-2.5xl border bg-surface transition-all duration-500 ${
                    isOpen
                      ? 'border-primary/40 shadow-lg shadow-primary/10'
                      : 'border-divider hover:border-primary/25 hover:shadow-md hover:shadow-primary/5'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span
                      className={`font-display text-lg sm:text-xl font-semibold transition-colors duration-300 ${
                        isOpen ? 'text-primary' : 'group-hover:text-primary'
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                        isOpen
                          ? 'bg-primary text-white rotate-[135deg]'
                          : 'bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110'
                      }`}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 font-body text-sm text-muted leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ================================================================== *
 * NYITVATARTÁS + MEGKÖZELÍTÉS
 * ================================================================== */
export function VisitUs() {
  return (
    <section className="py-16 sm:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="group h-full rounded-4xl border border-divider bg-background p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Clock className="h-5 w-5 text-primary" strokeWidth={2.2} />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold">Mikor találsz meg?</h3>
              <dl className="mt-6 space-y-1">
                {HOURS.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 -mx-3 transition-colors duration-300 hover:bg-primary/[0.05]"
                  >
                    <dt className="font-body text-sm text-ink/80">{h.day}</dt>
                    <dd className="font-mono text-xs text-primary">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 font-body text-xs text-muted leading-relaxed">
                Az utolsó kezelés a zárás előtt 90 perccel indul. Ezen kívüli időpontról hívj
                nyugodtan.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="group block h-full rounded-4xl border border-divider bg-background p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                <MapPin className="h-5 w-5 text-primary" strokeWidth={2.2} />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold">Hogyan jutsz ide?</h3>
              <p className="mt-4 font-body text-sm text-ink/80">{ADDRESS}</p>
              <p className="mt-3 font-body text-sm text-muted leading-relaxed">
                Inárcs központjában, ingyenes parkolással a ház előtt. Az M5-ösről lehajtva néhány
                perc, Dabas és Ócsa felől is könnyen elérhető.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-primary">
                Megnyitom a térképen
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ================================================================== *
 * MOBIL STICKY CTA — a foglalások többsége telefonról indul
 * ================================================================== */
export function MobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 sm:hidden transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="glass border-t border-primary/15 px-4 py-3 flex gap-2.5">
        <a
          href={`tel:${PHONE_TEL}`}
          className="magnetic-btn flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-surface px-4 py-3 font-body text-sm font-semibold text-primary"
        >
          <Phone className="h-4 w-4" strokeWidth={2.4} />
          Hívás
        </a>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="magnetic-btn flex-[1.4] inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 font-body text-sm font-semibold text-white shadow-lg shadow-primary/30"
        >
          <CalendarCheck className="h-4 w-4" strokeWidth={2.4} />
          Időpontfoglalás
        </a>
      </div>
      <p className="sr-only">{PHONE_DISPLAY}</p>
    </div>
  )
}

/* ================================================================== *
 * KEZELÉS-RÉSZLETEK — lenyíló kártyák
 * ================================================================== */
export function TreatmentDetails() {
  const [open, setOpen] = useState(null)

  return (
    <section id="reszletek" className="py-24 sm:py-32 bg-surface">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="Kezelés-részletek"
          title="Melyik való"
          accent="neked?"
          sub="Nyisd le azt, ami érdekel — leírom, kinek ajánlom, hogyan zajlik, és mire számíthatsz utána."
        />

        <div className="mt-14 space-y-4">
          {TREATMENTS.map((t, i) => {
            const isOpen = open === i
            return (
              <Reveal key={t.name} delay={i * 90}>
                <div
                  className={`group overflow-hidden rounded-4xl border bg-background transition-all duration-500 ${
                    isOpen
                      ? 'border-primary/40 shadow-xl shadow-primary/10'
                      : 'border-divider hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 px-7 sm:px-9 py-7 text-left"
                  >
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-accent-dark">
                        {t.tagline}
                      </span>
                      <span
                        className={`mt-2 block font-display text-2xl sm:text-3xl font-semibold transition-colors duration-300 ${
                          isOpen ? 'text-primary' : 'group-hover:text-primary'
                        }`}
                      >
                        {t.name}
                      </span>
                    </span>
                    <span
                      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                        isOpen
                          ? 'bg-primary text-white rotate-180'
                          : 'bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </button>

                  <div
                    className="grid transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <div className="grid sm:grid-cols-3 gap-6 px-7 sm:px-9 pb-8">
                        {[
                          { label: 'Kinek ajánlom', text: t.forWhom },
                          { label: 'Hogyan zajlik', text: t.how },
                          { label: 'Mire számíthatsz', text: t.effect },
                        ].map((b) => (
                          <div
                            key={b.label}
                            className="rounded-2xl border border-divider bg-surface p-5 transition-colors duration-300 hover:border-primary/30"
                          >
                            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                              {b.label}
                            </p>
                            <p className="mt-3 font-body text-sm text-muted leading-relaxed">
                              {b.text}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="px-7 sm:px-9 pb-8">
                        <a
                          href={BOOKING_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-body text-sm font-semibold text-white shadow-lg shadow-primary/25"
                        >
                          Ezt kérem <ArrowUpRight className="h-4 w-4" strokeWidth={2.3} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ================================================================== *
 * GALÉRIA — rács + lightbox
 * ================================================================== */
export function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % GALLERY.length)
      if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + GALLERY.length) % GALLERY.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <section id="galeria" className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHead
          eyebrow="Galéria"
          title="Egy pillantás a"
          accent="kezelésekre"
          sub="Így néz ki egy alkalom nálam — nyugodt tempó, meleg fény, semmi sietség."
        />

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {GALLERY.map((img, i) => (
            <Reveal
              key={img.src}
              delay={i * 70}
              className={i === 0 || i === 5 ? 'col-span-2 row-span-2' : ''}
            >
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative block h-full w-full overflow-hidden rounded-2.5xl bg-deep"
                aria-label={`${img.alt} — nagyítás`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-all duration-[1.1s] ease-out group-hover:scale-110 ${
                    i === 0 || i === 5 ? 'aspect-square' : 'aspect-square'
                  }`}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 right-4 translate-y-3 font-body text-xs text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {img.alt}
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mt-8 text-center font-body text-xs text-muted">
            A képek illusztrációk. Hamarosan saját fotókkal cserélem őket.
          </p>
        </Reveal>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-deep/95 backdrop-blur-xl p-6 animate-[fadein_.3s_ease-out]"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <style>{`@keyframes fadein { from { opacity: 0 } to { opacity: 1 } }`}</style>
          <button
            type="button"
            aria-label="Bezárás"
            className="absolute top-6 right-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-white/20 hover:rotate-90"
          >
            <X className="h-5 w-5" strokeWidth={2.3} />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-4xl">
            <img
              src={GALLERY[lightbox].src}
              alt={GALLERY[lightbox].alt}
              className="max-h-[75vh] w-auto rounded-3xl shadow-2xl"
            />
            <figcaption className="mt-4 text-center font-body text-sm text-white/70">
              {GALLERY[lightbox].alt}
              <span className="ml-3 font-mono text-xs text-white/40">
                {lightbox + 1} / {GALLERY.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}

/* ================================================================== *
 * BEÁGYAZOTT TÉRKÉP
 * ================================================================== */
export function MapEmbed() {
  return (
    <section className="pb-24 sm:pb-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <Reveal>
          <div className="group relative overflow-hidden rounded-4xl border border-divider shadow-lg shadow-primary/5">
            <iframe
              title="AB Masszázs — Inárcs, Május 1. utca 12."
              src="https://www.google.com/maps?q=2365+In%C3%A1rcs+M%C3%A1jus+1.+utca+12&hl=hu&z=15&output=embed"
              className="h-[340px] sm:h-[420px] w-full border-0 grayscale-[0.35] transition-all duration-700 group-hover:grayscale-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full glass px-5 py-3 font-body text-sm font-semibold text-ink shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <MapPin className="h-4 w-4 text-primary" strokeWidth={2.3} />
              Útvonaltervezés
              <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ================================================================== *
 * IDŐPONTFOGLALÁS — beágyazott Calendly naptár
 * (BOOKING_URL a config.js-ben; amíg 'CSERELD', telefonos fallback jön)
 * ================================================================== */
export function Booking() {
  const ready = BOOKING_URL && !BOOKING_URL.includes('CSERELD')

  useEffect(() => {
    if (!ready) return
    const s = document.createElement('script')
    s.src = 'https://assets.calendly.com/assets/external/widget.js'
    s.async = true
    document.body.appendChild(s)
    return () => s.remove()
  }, [ready])

  return (
    <section id="foglalas" className="py-24 sm:py-32 bg-background">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHead
          eyebrow="Időpontfoglalás"
          title="Válassz egy"
          accent="szabad időpontot"
          sub="Nézd meg élőben a szabad sávokat, és foglalj néhány kattintással. Ha inkább telefonon egyeztetnél, hívj nyugodtan."
        />
        <Reveal delay={100}>
          {ready ? (
            <div className="mt-12 overflow-hidden rounded-4xl border border-divider bg-surface shadow-xl shadow-primary/5">
              <div
                className="calendly-inline-widget"
                data-url={BOOKING_URL}
                style={{ minWidth: 320, height: 680 }}
              />
            </div>
          ) : (
            <div className="mt-12 rounded-4xl border border-dashed border-primary/30 bg-primary/[0.04] p-10 text-center">
              <CalendarCheck className="mx-auto h-8 w-8 text-primary" strokeWidth={2} />
              <p className="mx-auto mt-4 max-w-md font-body text-sm text-muted leading-relaxed">
                Az online naptár hamarosan itt lesz. Addig telefonon vagy üzenetben tudsz időpontot
                foglalni — hívj nyugodtan.
              </p>
              <a
                href={`tel:${PHONE_TEL}`}
                className="magnetic-btn mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-body text-sm font-semibold text-white shadow-lg shadow-primary/25"
              >
                <Phone className="h-4 w-4" strokeWidth={2.4} /> {PHONE_DISPLAY}
              </a>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
