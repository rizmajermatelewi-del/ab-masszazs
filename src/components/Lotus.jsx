/* Her logo's lotus, reduced to five hairline petals so it holds at 40px.
   A brand mark, not an icon, which is why it is drawn here rather than taken
   from an icon set: no set has her flower. */
export default function Lotus({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M24 29C20 23 20 12 24 3c4 9 4 20 0 26Z" />
      <path d="M24 29c-5-3-10-10-10-19 6 3 10 11 10 19Z" />
      <path d="M24 29c5-3 10-10 10-19-6 3-10 11-10 19Z" />
      <path d="M24 29C17 29 8 25 4 17c8 0 16 5 20 12Z" />
      <path d="M24 29c7 0 16-4 20-12-8 0-16 5-20 12Z" />
      <path d="M10 30.5h28" strokeLinecap="round" />
    </svg>
  )
}
