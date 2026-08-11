import { BUSINESS } from './business.js'
import { SERVICES } from './services.js'
import { ABOUT, EXPERIENCE_STEPS, GALLERY, TESTIMONIALS, FAQ, GIFT_CARD } from './content.js'

/* The navigation is DERIVED, never hand-written.

   Every section on this page removes itself while its content is missing, so a
   hand-maintained menu drifts the moment one of them does: the link stays, the
   target does not, and a visitor clicking "Vélemények" is dropped somewhere
   arbitrary on the page. That is a worse first impression than having no
   reviews at all.

   Deriving it means the menu can only ever list sections that are actually
   rendered, and it shrinks and grows on its own as she fills content in. The
   ordering here is the page order; keep the two in step. */
const SECTIONS = [
  { id: 'rolam', label: 'Rólam', has: () => Boolean(ABOUT.text) },
  { id: 'szolgaltatasok', label: 'Masszázsok', has: () => SERVICES.length > 0 },
  { id: 'elmeny', label: 'Az élmény', has: () => EXPERIENCE_STEPS.length > 0 },
  /* No separate "Árak" entry. The brief lists Masszázsok and Árak as two
     sections, but both would render the same five treatments from the same
     array -- and the brief also bans repeated section structures. The prices
     live in the Masszázsok list, where someone comparing treatments actually
     wants them, and one nav item points there. */
  { id: 'galeria', label: 'Galéria', has: () => GALLERY.length > 0 },
  { id: 'velemenyek', label: 'Vélemények', has: () => TESTIMONIALS.length > 0 },
  { id: 'ajandek', label: 'Ajándékutalvány', has: () => GIFT_CARD.enabled },
  { id: 'gyik', label: 'GYIK', has: () => FAQ.length > 0 },
  {
    /* Matches the id Visit.jsx has always rendered; renaming it would break
       every existing anchor and the prerendered links pointing at it. */
    id: 'elerhetoseg',
    label: 'Kapcsolat',
    has: () =>
      Boolean(BUSINESS.street && BUSINESS.city) ||
      BUSINESS.hours.length > 0 ||
      Boolean(BUSINESS.phone),
  },
]

export function visibleSections() {
  return SECTIONS.filter((section) => section.has()).map(({ id, label }) => ({ id, label }))
}
