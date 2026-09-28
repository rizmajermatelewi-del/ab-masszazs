import { Link } from 'react-router-dom'

/* The pieces the callback and voucher forms share. Labels sit above their
   fields (never a placeholder standing in for a label), every control is at
   least 44px tall, and the one colour for focus is the plum accent. */

const FIELD =
  'mt-2 block w-full rounded-2xl border border-line bg-paper/70 px-4 text-ink transition-colors duration-300 placeholder:text-faint focus:border-lotus focus:bg-paper focus:outline-none'

export function Field({ label, hint, ...input }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input {...input} className={`${FIELD} min-h-[52px]`} />
      {hint ? <span className="mt-1.5 block text-xs text-muted">{hint}</span> : null}
    </label>
  )
}

export function Area({ label, hint, ...input }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <textarea {...input} rows={3} className={`${FIELD} resize-none py-3`} />
      {hint ? <span className="mt-1.5 block text-xs text-muted">{hint}</span> : null}
    </label>
  )
}

/* A row of pill radios. Native inputs underneath, so arrow keys, form
   submission and screen readers all work without any script. */
export function Pills({ legend, name, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-ink">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="peer sr-only"
            />
            <span className="inline-flex min-h-[44px] items-center rounded-full border border-line px-4 text-sm text-ink transition-[background-color,color,border-color] duration-300 ease-fluid hover:border-lotus/60 peer-checked:border-lotus peer-checked:bg-lotus peer-checked:text-paper peer-focus-visible:ring-2 peer-focus-visible:ring-lotus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-paper">
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/* The consent the notice relies on ("a hozzájárulásod, amelyet a küldéssel
   adsz meg"), said where it is given. */
export function Consent() {
  return (
    <p className="text-xs leading-relaxed text-muted">
      A küldéssel hozzájárulsz, hogy az adataidat erre a megkeresésre használjam.{' '}
      <Link to="/adatvedelem" className="text-lotus underline decoration-lotus/30 underline-offset-2 hover:decoration-lotus">
        Adatkezelési tájékoztató
      </Link>
    </p>
  )
}

/* Off-screen field a person never fills and a bot usually does. */
export function Honeypot() {
  return (
    <label aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      Weboldal
      <input type="text" name="website" tabIndex={-1} autoComplete="off" />
    </label>
  )
}

/* idle | sending | sent. The label changes with the state and a check draws
   itself on success, so the one thing the visitor watches after pressing is
   the thing they pressed. */
export function Submit({ state, children }) {
  return (
    <button
      type="submit"
      disabled={state === 'sending' || state === 'sent'}
      className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-lotus px-7 text-sm font-semibold text-paper shadow-lift transition-[transform,background-color] duration-500 ease-fluid hover:bg-ink active:scale-[0.98] disabled:cursor-default disabled:hover:bg-lotus"
    >
      {state === 'sending' ? (
        <>
          Küldöm
          <span aria-hidden="true" className="dots inline-flex gap-1">
            <i /> <i /> <i />
          </span>
        </>
      ) : state === 'sent' ? (
        <>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path className="check-draw" d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Elküldve
        </>
      ) : (
        children
      )}
    </button>
  )
}
