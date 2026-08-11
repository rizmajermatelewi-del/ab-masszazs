import { useEffect, useRef, useState } from 'react'

/* Entry animation on scroll, in about twenty lines and with no dependency.

   IntersectionObserver, never a scroll listener: a listener fires on every
   frame of every scroll and forces a reflow each time, which is exactly the
   jank a design like this is supposed to avoid.

   Two details that matter more than the effect itself:

   - It starts VISIBLE and only hides itself once the observer is attached, in
     an effect. The prerendered HTML therefore contains the content in its
     final state, so a crawler -- and anyone whose JavaScript failed -- reads a
     complete page rather than a stack of invisible divs. On a site whose whole
     job is being found, an animation that can hide the content from Google is
     not a trade worth making.
   - It disconnects after the first reveal. Nothing here needs to re-animate,
     and an observer left attached to every section is a slow leak.

   Honours prefers-reduced-motion by never hiding anything in the first place. */
export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(true)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (typeof IntersectionObserver !== 'function') return undefined

    /* Only ever hide something that is genuinely off-screen. Hiding an element
       that is already in view means the visitor sees it painted by the
       prerendered HTML, then blanked by hydration, then faded back in -- a
       flicker on first load, which is worse than no animation at all. */
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return undefined

    setShown(false)

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform,filter] duration-[900ms] ease-fluid ${
        shown ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-12 opacity-0 blur-[6px]'
      } ${className}`}
    >
      {children}
    </div>
  )
}
