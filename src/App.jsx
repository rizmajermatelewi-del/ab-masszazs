import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  Phone,
  MapPin,
  Orbit,
  Hand,
  Footprints,
  Armchair,
  Flower2,
  CalendarRange,
  Award,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Send,
  Loader2,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* Minden szerkeszthető üzleti adat a config.js-ben él. */
import {
  BOOKING_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  ADDRESS,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  W3F_ACCESS_KEY,
} from './config'
import {
  About,
  Pricing,
  GiftCard,
  Testimonials,
  FAQSection,
  VisitUs,
  MobileCTA,
  TreatmentDetails,
  Gallery,
  MapEmbed,
  Booking,
} from './sections'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// A lucide-react 1.x-ből kikerültek a brand ikonok — minimál inline SVG pótlás.
const brandIconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const IgIcon = (props) => (
  <svg {...brandIconProps} {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const FbIcon = (props) => (
  <svg {...brandIconProps} {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const NAV_LINKS = [
  { label: 'Rólam', href: '#rolam' },
  { label: 'Kezelések', href: '#kezelesek' },
  { label: 'Árak', href: '#arak' },
  { label: 'Galéria', href: '#galeria' },
  { label: 'GYIK', href: '#gyik' },
  { label: 'Kapcsolat', href: '#kapcsolat' },
]

const SERVICES = [
  {
    icon: Orbit,
    title: 'Yumeiho masszázsterápia',
    text: 'Ízületstimuláló, egésztestes japán technika, amely a test szimmetriájának helyreállítását célozza.',
  },
  {
    icon: Hand,
    title: 'Svédmasszázs',
    text: 'Klasszikus izomlazítás: simítás, gyúrás, dörzsölés — a megfeszült izomcsoportok oldására.',
  },
  {
    icon: Footprints,
    title: 'Talpreflexológia',
    text: 'A talp reflexzónáin keresztül támogatja a szervezet öngyógyító folyamatait és az egyensúlyt.',
  },
  {
    icon: Armchair,
    title: 'Hát, nyak, váll kezelés',
    text: 'Ülőmunkából eredő merevségre és fejfájásra, célzottan a felsőtestre koncentrálva.',
  },
  {
    icon: Flower2,
    title: 'Frissítő relaxmasszázs',
    text: 'Stresszoldó, lassú tempójú kezelés, amikor egyszerűen csak kikapcsolnál egy órára.',
  },
  {
    icon: CalendarRange,
    title: 'Kúraszerű csomagok',
    text: 'Több alkalmas sorozat, ha nem csak pillanatnyi könnyebbséget, hanem tartós változást szeretnél.',
  },
]

/* ================================================================== *
 * 1. Navbar
 * ================================================================== */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl rounded-full px-4 sm:px-6 py-2.5 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-primary/5' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2.5 shrink-0">
            <img
              src="/img/logo.jpg"
              alt="AB Masszázs logó"
              className="h-9 w-9 rounded-xl object-cover ring-1 ring-primary/20"
            />
            <span
              className={`font-display text-lg font-semibold uppercase tracking-[0.18em] transition-colors ${
                scrolled ? 'text-ink' : 'text-white'
              }`}
            >
              AB Masszázs
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative font-body text-sm font-medium transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled ? 'text-muted hover:text-primary' : 'text-white/80 hover:text-white'
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn hidden sm:inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-body text-sm font-semibold shadow-lg shadow-primary/25"
            >
              Időpontfoglalás
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.3} />
            </a>
            <button
              type="button"
              aria-label="Menü megnyitása"
              onClick={() => setOpen(true)}
              className={`lg:hidden p-2 rounded-full transition-colors ${
                scrolled ? 'text-ink hover:bg-primary/10' : 'text-white hover:bg-white/10'
              }`}
            >
              <Menu className="h-5 w-5" strokeWidth={2.3} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobil overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-deep/95 backdrop-blur-2xl lg:hidden transition-all duration-500 ${
          open ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-4'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <span className="font-display text-lg font-semibold uppercase tracking-[0.18em] text-white">
            AB Masszázs
          </span>
          <button
            type="button"
            aria-label="Menü bezárása"
            onClick={() => setOpen(false)}
            className="p-2 rounded-full text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" strokeWidth={2.3} />
          </button>
        </div>
        <div className="flex flex-col gap-1 px-6 pt-8">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-4xl font-semibold text-white/90 hover:text-accent py-3 border-b border-white/10 transition-colors"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="magnetic-btn mt-8 inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-body font-semibold"
          >
            Időpontfoglalás <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="mt-3 inline-flex items-center justify-center gap-2 glass-dark text-white px-6 py-4 rounded-full font-body font-semibold border border-white/15"
          >
            <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </>
  )
}

/* ================================================================== *
 * 2. Hero
 * ================================================================== */
function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' })
      gsap.from('.hero-cta, .hero-meta', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-[100dvh] overflow-hidden bg-deep">
      <style>{`
        @keyframes hero-zoom {
          from { transform: scale(1.12); }
          to   { transform: scale(1); }
        }
      `}</style>
      <img
        src="/img/hero.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.42] saturate-[0.85]"
        style={{ animation: 'hero-zoom 18s ease-out forwards' }}
      />
      {/* lila fátyol a fotón, hogy a márka színvilágába simuljon */}
      <div className="absolute inset-0 bg-primary-dark/45 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-br from-deep/85 via-deep/45 to-deep/80" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-deep to-transparent" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* Lebegő lótuszszirmok — jobb felső */}
      <div
        className="absolute top-24 right-6 sm:right-16 w-40 h-56 pointer-events-none"
        aria-hidden="true"
      >
        {[
          { left: '10%', top: '5%', size: 18, delay: 0 },
          { left: '55%', top: '18%', size: 13, delay: 1.1 },
          { left: '28%', top: '40%', size: 22, delay: 2.2 },
          { left: '70%', top: '58%', size: 15, delay: 0.6 },
          { left: '18%', top: '76%', size: 11, delay: 1.7 },
        ].map((p, i) => (
          <svg
            key={i}
            viewBox="0 0 16 22"
            className="absolute animate-float text-primary-light/50"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              animationDelay: `${p.delay}s`,
              transform: `rotate(${i * 37}deg)`,
            }}
          >
            <path d="M8 1c5 6 5 14 0 20C3 15 3 7 8 1z" fill="currentColor" />
          </svg>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-20 min-h-[100dvh] flex flex-col justify-end">
        <p className="hero-meta font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-accent/90 mb-6">
          Inárcs · Testben lélekben harmóniában
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.95] max-w-5xl">
          <span className="hero-line-1 block">A tested</span>
          <span className="hero-line-2 block font-serif italic font-medium text-primary-light">
            harmóniájáért.
          </span>
        </h1>
        <p className="hero-meta mt-8 max-w-xl text-white/70 text-base sm:text-lg leading-relaxed">
          Yumeiho terápia, svédmasszázs és talpreflexológia egy csendes inárcsi kezelőben. Pihenés,
          feltöltődés, egyensúly — a te tempódban.
        </p>
        <div className="hero-cta mt-10 flex flex-wrap gap-3">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-primary/30"
          >
            Időpontot kérek <ArrowUpRight className="h-4 w-4" strokeWidth={2.3} />
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="magnetic-btn inline-flex items-center gap-2 glass-dark text-white px-6 py-3 rounded-full font-semibold border border-white/15"
          >
            <Phone className="h-4 w-4" strokeWidth={2.3} /> {PHONE_DISPLAY}
          </a>
        </div>

        <div className="hero-meta mt-14 flex items-center gap-3">
          <div className="h-10 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            Görgess
          </span>
        </div>
      </div>
    </section>
  )
}

/* ================================================================== *
 * 3a. Kezelés-váltó (stacked shuffler)
 * ================================================================== */
const SHUFFLE_CARDS = [
  { name: 'Yumeiho terápia', meta: 'Egésztest · ízületek', tint: 'from-primary to-primary-dark' },
  { name: 'Svédmasszázs', meta: 'Izomlazítás · keringés', tint: 'from-primary-dark to-deep' },
  { name: 'Talpreflexológia', meta: 'Reflexzónák · egyensúly', tint: 'from-accent-dark to-primary' },
]

function KezelesShuffler() {
  const [front, setFront] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setFront((f) => (f + 1) % SHUFFLE_CARDS.length), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-44 rounded-3xl bg-background overflow-hidden">
      {SHUFFLE_CARDS.map((c, i) => {
        const pos = (i - front + SHUFFLE_CARDS.length) % SHUFFLE_CARDS.length
        return (
          <div
            key={c.name}
            className={`absolute inset-x-5 top-6 rounded-2xl bg-gradient-to-br ${c.tint} p-5 text-white transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`}
            style={{
              transform: `translateY(${pos * 22}px) scale(${1 - pos * 0.06})`,
              filter: pos === 0 ? 'none' : `blur(${pos * 1.5}px)`,
              opacity: pos === 0 ? 1 : 0.55 - pos * 0.12,
              zIndex: SHUFFLE_CARDS.length - pos,
            }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">{c.meta}</p>
            <p className="font-display text-2xl font-semibold mt-1.5">{c.name}</p>
            <div className="mt-4 h-px bg-white/20" />
            <p className="mt-3 font-body text-xs text-white/70">60 perc · személyre szabva</p>
          </div>
        )
      })}
    </div>
  )
}

/* ================================================================== *
 * 3b. SZIGNATÚRA ANIMÁCIÓ — zen vízcsorgó + hulló lótuszszirmok
 * (a referencia esőcsepp-animációjának újraszínezése a márka világára)
 * ================================================================== */
const PETALS = [
  { left: '18%', delay: 0, dur: 3.4, size: 11 },
  { left: '32%', delay: 1.2, dur: 4.1, size: 8 },
  { left: '45%', delay: 0.5, dur: 3.7, size: 13 },
  { left: '57%', delay: 2.1, dur: 4.4, size: 9 },
  { left: '68%', delay: 1.6, dur: 3.2, size: 12 },
  { left: '78%', delay: 0.9, dur: 4.6, size: 7 },
  { left: '26%', delay: 2.7, dur: 3.9, size: 10 },
]

const ZEN_STATES = ['Belégzés…', 'Kilégzés…', 'Elernyedés…', 'Csend.']

function ZenFountain() {
  const [state, setState] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setState((s) => (s + 1) % ZEN_STATES.length), 2300)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-44 rounded-3xl overflow-hidden bg-gradient-to-b from-primary/15 via-background to-accent/10">
      <style>{`
        @keyframes petal-fall {
          0%   { transform: translate(-50%, -10px) rotate(0deg); opacity: 0; }
          12%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translate(-50%, 95px) rotate(160deg); opacity: 0; }
        }
        @keyframes petal-ripple {
          0%   { transform: translateX(-50%) scale(0.4); opacity: 0.9; }
          80%  { transform: translateX(-50%) scale(3.5); opacity: 0; }
          100% { transform: translateX(-50%) scale(3.5); opacity: 0; }
        }
        @keyframes petal-fadein {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Légköri foltok */}
      <div className="absolute -top-6 left-6 h-20 w-20 rounded-full bg-white/60 blur-2xl" />
      <div className="absolute top-10 right-4 h-16 w-16 rounded-full bg-accent/25 blur-2xl" />
      <div className="absolute bottom-2 left-1/3 h-14 w-24 rounded-full bg-primary/20 blur-2xl" />

      {/* Fejléc */}
      <div className="absolute top-3 inset-x-4 flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-dark/70">
          Zen ritmus
        </span>
        <span className="font-mono text-[9px] text-muted">{PETALS.length} szirom</span>
      </div>

      {/* Bambusz csorgó */}
      <svg
        viewBox="0 0 120 26"
        className="absolute left-1/2 -translate-x-1/2 top-8 w-28 text-primary-dark"
        aria-hidden="true"
      >
        <rect x="4" y="6" width="82" height="9" rx="4.5" fill="currentColor" opacity="0.85" />
        <rect x="26" y="6" width="2" height="9" fill="#FAF6F2" opacity="0.5" />
        <rect x="56" y="6" width="2" height="9" fill="#FAF6F2" opacity="0.5" />
        <path
          d="M86 6h9a5 5 0 0 1 5 5v8"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>

      {/* Hulló szirmok */}
      <div className="absolute inset-x-0 top-14 h-24" aria-hidden="true">
        {PETALS.map((p, i) => (
          <svg
            key={i}
            viewBox="0 0 16 22"
            className="absolute text-primary/70"
            style={{
              left: p.left,
              width: p.size,
              animation: `petal-fall ${p.dur}s ${p.delay}s linear infinite`,
            }}
          >
            <path d="M8 1c5 6 5 14 0 20C3 15 3 7 8 1z" fill="currentColor" />
          </svg>
        ))}
      </div>

      {/* Vízfelszín + gyűrűk */}
      <svg
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="absolute bottom-9 inset-x-0 w-full h-3 text-primary/40"
        aria-hidden="true"
      >
        <path
          d="M0 6 Q 25 2 50 6 T 100 6 T 150 6 T 200 6"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      <div className="absolute bottom-8 inset-x-0 h-4" aria-hidden="true">
        {[
          { left: '32%', delay: 0.4 },
          { left: '52%', delay: 1.5 },
          { left: '71%', delay: 2.6 },
        ].map((r, i) => (
          <span
            key={i}
            className="absolute block h-2 w-6 rounded-full border border-primary/50"
            style={{ left: r.left, animation: `petal-ripple 3.2s ${r.delay}s ease-out infinite` }}
          />
        ))}
      </div>

      {/* Lábléc állapotsáv */}
      <div className="absolute bottom-3 inset-x-4 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent ring-pulse" />
        <span
          key={state}
          className="font-mono text-[10px] text-primary-dark/80"
          style={{ animation: 'petal-fadein 0.4s ease-out' }}
        >
          {ZEN_STATES[state]}
        </span>
      </div>
    </div>
  )
}

/* ================================================================== *
 * 3c. Foglalás-naptár kurzorral
 * ================================================================== */
const CAL_STEPS = [
  { x: 18, y: 78, day: null, label: 'Nyisd meg a naptárt' },
  { x: 52, y: 42, day: null, label: 'Válassz napot' },
  { x: 52, y: 42, day: 17, label: 'Csütörtök, 17.' },
  { x: 78, y: 74, day: 17, label: 'Erősítsd meg' },
  { x: 78, y: 74, day: 17, label: 'Időpont lefoglalva ✓' },
]

function FoglalasNaptar() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % CAL_STEPS.length), 1400)
    return () => clearInterval(id)
  }, [])
  const cur = CAL_STEPS[step]
  const days = [14, 15, 16, 17, 18, 19, 20]

  return (
    <div className="relative h-44 rounded-3xl bg-background overflow-hidden p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-dark/70">
          Foglalás
        </span>
        <span className="font-mono text-[9px] text-muted">Október</span>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1">
        {['H', 'K', 'Sz', 'Cs', 'P', 'Sz', 'V'].map((d, i) => (
          <span key={i} className="text-center font-mono text-[8px] text-muted">
            {d}
          </span>
        ))}
        {days.map((d) => (
          <span
            key={d}
            className={`flex h-7 items-center justify-center rounded-lg font-body text-[11px] transition-all duration-300 ${
              cur.day === d
                ? 'bg-primary text-white scale-110 shadow-md shadow-primary/30'
                : 'bg-surface text-muted'
            }`}
          >
            {d}
          </span>
        ))}
      </div>

      <div
        className={`mt-3 rounded-xl px-3 py-2 transition-all duration-500 ${
          step === 4 ? 'bg-accent/20 text-accent-dark' : 'bg-surface text-muted'
        }`}
      >
        <p className="font-body text-[11px] font-medium">{cur.label}</p>
      </div>

      {/* Kurzor */}
      <svg
        viewBox="0 0 24 24"
        className="absolute w-4 text-primary-dark drop-shadow transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        style={{
          left: `${cur.x}%`,
          top: `${cur.y}%`,
          transform: step === 2 || step === 4 ? 'scale(0.85)' : 'scale(1)',
        }}
        aria-hidden="true"
      >
        <path d="M4 2l7 18 2.5-7L21 10.5 4 2z" fill="currentColor" />
      </svg>
    </div>
  )
}

/* ================================================================== *
 * 3. Features
 * ================================================================== */
const FEATURES = [
  {
    eyebrow: 'Három módszer',
    title: 'Nem egy sablon — a te állapotod',
    Comp: KezelesShuffler,
    text: 'A Yumeiho, a svédmasszázs és a talpreflexológia más-más ponton nyúl a testhez. Együtt beszéljük meg, melyikre van most szükséged.',
    bullets: ['Kombinálható kezelések', 'Egyeztetett erősség', '60 perc, sietség nélkül'],
  },
  {
    eyebrow: 'A kezelő',
    title: 'Csend, gyertyafény, saját tempó',
    Comp: ZenFountain,
    text: 'Egyszerre egy vendég. Nincs várakozás, nincs zaj, nincs sietség — csak te és az a hatvan perc, ami a tiéd.',
    bullets: ['Egy vendég egy időben', 'Nyugodt, privát tér', 'Illóolajok, halk zene'],
  },
  {
    eyebrow: 'Időpont',
    title: 'Két perc alatt megvan',
    Comp: FoglalasNaptar,
    text: 'Válaszd ki online a szabad idősávot, vagy hívj fel egy szóra. Visszaigazolást kapsz, és onnantól nincs más dolgod.',
    bullets: ['Online naptár', 'Esti és hétvégi sávok', 'Telefonos egyeztetés is'],
  },
]

function Features() {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="modszerek" ref={ref} className="relative py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-primary">
            Pihenés · Feltöltődés · Egyensúly
          </p>
          <h2 className="mt-5 font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Ahogy nálam <span className="font-serif italic text-primary">történik</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="feature-card group rounded-3xl bg-surface border border-divider p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {f.eyebrow}
              </p>
              <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold">{f.title}</h3>
              <div className="mt-6">
                <f.Comp />
              </div>
              <p className="mt-6 font-body text-sm text-muted leading-relaxed">{f.text}</p>
              <ul className="mt-5 space-y-2">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 font-body text-xs text-ink/70">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================== *
 * 4. Pillars — animált számlálók
 * ================================================================== */
function CountUp({ end, suffix = '', duration = 2000 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTs = performance.now()
          const tick = (now) => {
            const t = Math.min(1, (now - startTs) / duration)
            const eased = 1 - Math.pow(1 - t, 3)
            setValue(Math.round(end * eased))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 },
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  )
}

const PILLARS = [
  {
    label: 'Módszer',
    end: 3,
    suffix: '',
    unit: 'kezelési technika',
    text: 'Yumeiho terápia, svédmasszázs és talpreflexológia — külön-külön vagy egymásra építve.',
  },
  {
    label: 'Egy kezelés',
    end: 60,
    suffix: '',
    unit: 'perc',
    text: 'Ennyi idő kell ahhoz, hogy a test tényleg elengedje, amit hetek óta tart.',
  },
  {
    label: 'Hozzáállás',
    end: 100,
    suffix: '%',
    unit: 'személyre szabva',
    text: 'Minden alkalom az aznapi állapotodhoz igazodik, nem egy előre megírt protokollhoz.',
  },
]

function Pillars() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-surface">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-3 lg:divide-x divide-divider">
          {PILLARS.map((p) => (
            <div key={p.label} className="px-0 lg:px-10 py-8 lg:py-0 first:lg:pl-0 last:lg:pr-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                {p.label}
              </p>
              <p className="mt-4 font-display text-6xl sm:text-7xl font-bold gradient-text leading-none">
                <CountUp end={p.end} suffix={p.suffix} />
              </p>
              <p className="mt-2 font-serif italic text-xl text-primary">{p.unit}</p>
              <div className="relative mt-5 h-px w-full overflow-hidden bg-divider">
                <span
                  className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{ animation: 'pillar-sweep 3s ease-in-out infinite' }}
                />
              </div>
              <p className="mt-5 font-body text-sm text-muted leading-relaxed max-w-xs">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes pillar-sweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(300%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </section>
  )
}

/* ================================================================== *
 * 5. Protocol — ragadós kártyapakli
 * ================================================================== */
const PROTOCOL = [
  {
    n: '01',
    eyebrow: 'Első lépés',
    title: 'Beszélgetés',
    text: 'Elmondod, hol feszül, mi fáj, mióta, és mit szeretnél elérni. Ebből derül ki, melyik technika a megfelelő aznap.',
    bullets: ['Rövid állapotfelmérés', 'Panaszok, korábbi sérülések', 'Közösen kiválasztott kezelés'],
    img: '/img/therapist.jpg',
  },
  {
    n: '02',
    eyebrow: 'A kezelés',
    title: 'Hatvan perc, csak rád',
    text: 'Személyre szabott technika, végig veled egyeztetett erősséggel. Ha valami sok vagy kevés, szólsz — és igazítunk rajta.',
    bullets: ['Yumeiho, svéd vagy talpreflex', 'Folyamatos visszajelzés', 'Illóolaj, halk zene, gyertyafény'],
    img: '/img/treatments.jpg',
  },
  {
    n: '03',
    eyebrow: 'Utána',
    title: 'Hogy megmaradjon',
    text: 'Kapsz néhány otthon is elvégezhető gyakorlatot és tanácsot, hogy a kezelés hatása ne két nap alatt múljon el.',
    bullets: ['Otthoni gyakorlatok', 'Tartáshoz szóló tippek', 'Következő időpont, ha kell'],
    img: '/img/zen-garden.jpg',
  },
]

function Protocol() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.slice(0, -1).forEach((card) => {
        gsap.to(card, {
          scrollTrigger: { trigger: card, start: 'top top+=100', end: '+=500', scrub: 1 },
          scale: 0.92,
          filter: 'blur(6px) saturate(0.7)',
          opacity: 0.5,
          ease: 'none',
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="folyamat" ref={ref} className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-primary">
            A folyamat
          </p>
          <h2 className="mt-5 font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Három lépés a <span className="font-serif italic text-primary">könnyebbségig</span>
          </h2>
        </div>
      </div>

      <div className="relative mt-16 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {PROTOCOL.map((s) => (
          <div key={s.n} className="protocol-card sticky top-24 mb-8">
            <div className="rounded-4xl bg-surface border border-divider shadow-xl shadow-primary/5 overflow-hidden">
              <div className="grid lg:grid-cols-5 gap-0">
                <div className="lg:col-span-3 p-8 sm:p-12">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-5xl font-bold text-primary/20">{s.n}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                      {s.eyebrow}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-4 font-body text-sm sm:text-base text-muted leading-relaxed max-w-lg">
                    {s.text}
                  </p>
                  <ul className="mt-7 space-y-2.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 font-body text-sm text-ink/75">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="group lg:col-span-2 relative min-h-[220px] lg:min-h-full overflow-hidden">
                  <img
                    src={s.img}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 to-transparent transition-opacity duration-700 group-hover:opacity-60" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ================================================================== *
 * 6. ServicesGrid — sötét csempék
 * ================================================================== */
function ServicesGrid() {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="kezelesek" ref={ref} className="bg-deep text-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-accent">
            Kezelések
          </p>
          <h2 className="mt-5 font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance">
            Amit <span className="font-serif italic text-primary-light">nálam kaphatsz</span>
          </h2>
        </div>
      </div>

      <div className="mt-14 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-3xl overflow-hidden">
          {SERVICES.map((s) => (
            <a
              key={s.title}
              href="#reszletek"
              aria-label={`${s.title} — részletek`}
              className="svc-tile group relative block overflow-hidden bg-deep p-8 sm:p-10 transition-colors duration-500 hover:bg-white/[0.05]"
            >
              {/* felső fénysáv hoveren */}
              <span className="absolute inset-x-0 top-0 h-px w-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-700 group-hover:w-full" />
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/25 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary/40">
                <s.icon className="h-6 w-6 text-primary-light transition-colors duration-500 group-hover:text-accent" strokeWidth={2.2} />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-white transition-colors duration-300 group-hover:text-accent">
                {s.title}
              </h3>
              <p className="mt-3 font-body text-sm text-white/60 leading-relaxed transition-colors duration-300 group-hover:text-white/75">
                {s.text}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                Részletek <ArrowRight className="h-3 w-3" />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-primary/30"
          >
            Foglalok időpontot <ArrowUpRight className="h-4 w-4" strokeWidth={2.3} />
          </a>
          <a
            href="#kapcsolat"
            className="font-body text-sm font-medium text-primary-light lift-on-hover inline-flex items-center gap-1"
          >
            Inkább kérdeznék előbb <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ================================================================== *
 * 7. TrustSignals
 * ================================================================== */
const TRUST = [
  {
    icon: Award,
    title: 'Yumeiho® technika',
    text: 'A Saionji Masayuki által kidolgozott, ízületstimuláló terápiás rendszer szerint dolgozom.',
  },
  {
    icon: ShieldCheck,
    title: 'Privát kezelő',
    text: 'Egyszerre egy vendég Inárcson — nincs várakozás, nincs idegen tekintet, nincs sietség.',
  },
  {
    icon: Clock,
    title: 'Rugalmas időpontok',
    text: 'Esti és hétvégi sávok is egyeztethetők, hogy a munka mellett is beleférjen.',
  },
]

function TrustSignals() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setShown(true)
      },
      { threshold: 0.25 },
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-background">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-3 gap-6">
          {TRUST.map((t, i) => (
            <div
              key={t.title}
              className="rounded-2.5xl bg-surface border border-divider p-7 shadow-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                <t.icon className="h-5 w-5 text-primary" strokeWidth={2.2} />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{t.title}</h3>
              <p className="mt-2.5 font-body text-sm text-muted leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================== *
 * 8. ContactForm
 * ================================================================== */
function Field({ label, children }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  )
}

const inputCls =
  'w-full rounded-xl border border-divider bg-background px-4 py-3 font-body text-sm text-ink placeholder:text-muted/60 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20'

function ContactForm() {
  const [status, setStatus] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    // Nincs beállítva Web3Forms-kulcs → imitált küldés, hogy fejlesztés közben is működjön az UI.
    if (!W3F_ACCESS_KEY) {
      setStatus('sending')
      setTimeout(() => setStatus('sent'), 1000)
      return
    }
    setStatus('sending')
    try {
      const data = new FormData(form)
      data.append('access_key', W3F_ACCESS_KEY)
      data.append('subject', 'Új megkeresés — AB Masszázs weboldal')
      data.append('from_name', 'AB Masszázs weboldal')
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      const json = await res.json().catch(() => ({}))
      setStatus(res.ok && json.success ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="kapcsolat" className="py-24 sm:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Bal oldal */}
          <div className="lg:col-span-5">
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-primary">
              Kapcsolat
            </p>
            <h2 className="mt-5 font-display text-3xl sm:text-5xl font-bold tracking-tight text-balance">
              Írj, vagy <span className="font-serif italic text-primary">hívj egy szóra</span>
            </h2>
            <p className="mt-5 font-body text-sm sm:text-base text-muted leading-relaxed max-w-md">
              Ha nem vagy biztos benne, melyik kezelés való neked, kérdezz nyugodtan — segítek
              kiválasztani.
            </p>

            <div className="mt-10 space-y-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-4 rounded-2xl border border-divider bg-background p-4 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Phone className="h-4 w-4 text-primary" strokeWidth={2.2} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Telefon
                  </span>
                  <span className="block font-body text-sm font-medium">{PHONE_DISPLAY}</span>
                </span>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-divider bg-background p-4 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <IgIcon className="h-4 w-4 text-primary" strokeWidth={2.2} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Instagram
                  </span>
                  <span className="block font-body text-sm font-medium">@abmasszazs</span>
                </span>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-divider bg-background p-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" strokeWidth={2.2} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Kezelő
                  </span>
                  <span className="block font-body text-sm font-medium">{ADDRESS}</span>
                </span>
              </div>
            </div>

            <p className="mt-8 font-body text-xs text-muted leading-relaxed max-w-md">
              Az űrlapon megadott adatokat kizárólag a megkeresésed megválaszolására használom,
              harmadik félnek nem adom át. Részletek az{' '}
              <Link to="/adatkezeles" className="text-primary underline underline-offset-2">
                adatkezelési tájékoztatóban
              </Link>
              .
            </p>
          </div>

          {/* Jobb oldal — űrlap */}
          <div className="lg:col-span-7">
            <div className="rounded-4xl bg-background border border-divider p-6 sm:p-10">
              {status === 'sent' ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                    <CheckCircle2 className="h-8 w-8 text-accent-dark" strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-semibold">Köszönöm az üzenetet!</h3>
                  <p className="mt-3 font-body text-sm text-muted max-w-sm">
                    Hamarosan jelentkezem a megadott elérhetőségen. Ha sürgős, hívj nyugodtan a{' '}
                    {PHONE_DISPLAY} számon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-8 font-body text-sm font-medium text-primary lift-on-hover"
                  >
                    Új üzenet írása
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Neved">
                      <input required name="name" className={inputCls} placeholder="Kovács Anna" />
                    </Field>
                    <Field label="E-mail">
                      <input
                        required
                        type="email"
                        name="email"
                        className={inputCls}
                        placeholder="anna@pelda.hu"
                      />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Telefon">
                      <input
                        type="tel"
                        name="phone"
                        className={inputCls}
                        placeholder="+36 30 123 4567"
                      />
                    </Field>
                    <Field label="Település">
                      <input name="city" className={inputCls} placeholder="Inárcs" />
                    </Field>
                  </div>

                  <Field label="Miben segíthetek?">
                    <textarea
                      required
                      rows={5}
                      name="message"
                      className={`${inputCls} resize-none`}
                      placeholder="Pl. hetek óta fáj a hátam ülőmunkától, és nem tudom, melyik kezelés lenne jó…"
                    />
                  </Field>

                  {/* Spamszűrő — rejtett mező; ember nem tölti ki. A Web3Forms ezt figyeli. */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    style={{ display: 'none' }}
                  />

                  {status === 'error' && (
                    <p
                      aria-live="polite"
                      className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-body text-sm text-red-700"
                    >
                      Nem sikerült elküldeni az üzenetet. Kérlek próbáld újra, vagy hívj a{' '}
                      {PHONE_DISPLAY} számon.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="magnetic-btn w-full inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-body font-semibold shadow-lg shadow-primary/25 disabled:opacity-70"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Küldés…
                      </>
                    ) : (
                      <>
                        Üzenet küldése <Send className="h-4 w-4" strokeWidth={2.3} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================== *
 * 9. Footer
 * ================================================================== */
function Footer() {
  return (
    <footer className="bg-deep text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src="/img/logo.jpg"
                alt="AB Masszázs logó"
                className="h-11 w-11 rounded-xl object-cover ring-1 ring-white/15"
              />
              <span className="font-display text-xl font-semibold uppercase tracking-[0.18em]">
                AB Masszázs
              </span>
            </div>
            <p className="mt-5 font-serif italic text-2xl text-primary-light">
              A tested harmóniájáért.
            </p>
            <p className="mt-4 font-body text-sm text-white/55 max-w-xs leading-relaxed">
              Pihenés. Feltöltődés. Egyensúly. Yumeiho terápia, svédmasszázs és talpreflexológia
              Inárcson.
            </p>
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-white/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-accent ring-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                Foglalás nyitva
              </span>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Kezelések
            </p>
            <ul className="mt-5 space-y-2.5">
              {SERVICES.slice(0, 4).map((s) => (
                <li key={s.title}>
                  <a
                    href="#kezelesek"
                    className="inline-block font-body text-sm text-white/70 transition-all duration-300 hover:text-accent hover:translate-x-1"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Információ
            </p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a
                  href="#modszerek"
                  className="inline-block font-body text-sm text-white/70 transition-all duration-300 hover:text-accent hover:translate-x-1"
                >
                  Módszerek
                </a>
              </li>
              <li>
                <a
                  href="#folyamat"
                  className="inline-block font-body text-sm text-white/70 transition-all duration-300 hover:text-accent hover:translate-x-1"
                >
                  Hogyan zajlik
                </a>
              </li>
              <li>
                <a
                  href="#kapcsolat"
                  className="inline-block font-body text-sm text-white/70 transition-all duration-300 hover:text-accent hover:translate-x-1"
                >
                  Kapcsolat
                </a>
              </li>
              <li>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block font-body text-sm text-white/70 transition-all duration-300 hover:text-accent hover:translate-x-1"
                >
                  Időpontfoglalás
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Elérhetőség
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 text-primary-light shrink-0" strokeWidth={2.2} />
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="font-body text-sm text-white/70 hover:text-accent"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-primary-light shrink-0" strokeWidth={2.2} />
                <span className="font-body text-sm text-white/70">{ADDRESS}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <IgIcon className="mt-0.5 h-4 w-4 text-primary-light shrink-0" strokeWidth={2.2} />
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-body text-sm text-white/70 hover:text-accent"
                >
                  @abmasszazs
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <FbIcon className="mt-0.5 h-4 w-4 text-primary-light shrink-0" strokeWidth={2.2} />
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-body text-sm text-white/70 hover:text-accent"
                >
                  AB Masszázs
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} AB Masszázs. Minden jog fenntartva.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/adatkezeles" className="font-body text-xs text-white/50 hover:text-accent">
              Adatkezelés
            </Link>
            <Link to="/impresszum" className="font-body text-xs text-white/50 hover:text-accent">
              Impresszum
            </Link>
          </div>
        </div>

        <p className="mt-8 font-body text-[11px] text-white/30 leading-relaxed max-w-3xl">
          A masszázs és a reflexológia közérzetjavító, relaxációs szolgáltatás, nem helyettesíti az
          orvosi diagnózist vagy kezelést. Panasz esetén fordulj orvoshoz.
        </p>
      </div>
    </footer>
  )
}

/* ================================================================== *
 * App
 * ================================================================== */
export default function App() {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 200)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pillars />
        <About />
        <Protocol />
        <ServicesGrid />
        <TreatmentDetails />
        <Pricing />
        <GiftCard />
        <Gallery />
        <Testimonials />
        <TrustSignals />
        <VisitUs />
        <MapEmbed />
        <FAQSection />
        <Booking />
        <ContactForm />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  )
}
