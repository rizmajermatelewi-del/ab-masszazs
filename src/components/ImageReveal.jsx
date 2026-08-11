import { useEffect, useRef, useState } from 'react'
import PhotoSlot from './PhotoSlot.jsx'

/* A photograph that uncovers itself: the frame wipes open from the bottom while
   the picture inside settles back from 1.08 to 1.

   Two elements, because one cannot do both. The wrapper owns the clip, the
   inner element owns the scale -- animating clip-path and transform on the same
   node fights over the same compositing layer and stutters.

   Reserved for the few images that carry a section. Applied to every picture on
   a page it stops reading as craft and starts reading as a slideshow, which is
   the note the brief makes twice.

   Same visibility contract as Reveal: it starts open, and only closes itself
   for images that are genuinely below the fold, so the prerendered HTML never
   ships a blank frame to a crawler. */
export default function ImageReveal({ src, alt, label, className = '', priority = false }) {
  const ref = useRef(null)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const node = ref.current
    if (!node || priority) return undefined
    if (typeof window.matchMedia !== 'function') return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (typeof IntersectionObserver !== 'function') return undefined
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return undefined

    setOpen(false)

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setOpen(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [priority])

  return (
    <div
      ref={ref}
      className={`overflow-hidden transition-[clip-path] duration-[1200ms] ease-fluid ${
        open ? '[clip-path:inset(0_0_0%_0)]' : '[clip-path:inset(0_0_100%_0)]'
      } ${className}`}
    >
      <div
        className={`h-full w-full transition-transform duration-[1400ms] ease-fluid ${
          open ? 'scale-100' : 'scale-[1.08]'
        }`}
      >
        <PhotoSlot src={src} alt={alt} label={label} />
      </div>
    </div>
  )
}
