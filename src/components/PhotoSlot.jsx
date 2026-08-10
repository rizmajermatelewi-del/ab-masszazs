/* A photograph, or an honest absence.

   Taken in spirit from the portfolio's Protocol.jsx: give it a file and it
   shows the picture, leave it empty and it draws a labelled frame rather than
   a broken image or a stock photograph. She has no photographs yet, and stock
   massage imagery is precisely what makes a real salon look fake, so every
   image on this site goes through here.

   The empty state is aria-hidden: it carries nothing a screen-reader user
   needs, and announcing "Kezelőszoba" for a picture that does not exist would
   be a small lie. */
export default function PhotoSlot({ src, alt, label, className = '' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      className={`relative flex h-full w-full items-center justify-center bg-stone-100 ${className}`}
    >
      <span className="absolute inset-4 rounded-2xl border border-dashed border-stone-300" />
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400">
        {label}
      </span>
    </div>
  )
}
