import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PhotoSlot from './PhotoSlot.jsx'

/* She has no photographs yet and stock imagery is banned (spec §5), so every
   image on this site is a slot that must look intentional while empty. The
   failure this prevents is a broken-image icon on a live page. */
describe('PhotoSlot', () => {
  it('renders the photograph when there is one', () => {
    render(<PhotoSlot src="/kezelo.webp" alt="A kezelőszoba" label="Kezelőszoba" />)
    expect(screen.getByAltText('A kezelőszoba').getAttribute('src')).toBe('/kezelo.webp')
  })

  it('draws a deliberate frame when there is none, and no img element', () => {
    const { container } = render(<PhotoSlot src="" alt="" label="Kezelőszoba" />)
    expect(container.querySelector('img')).toBe(null)
    expect(screen.getByText('Kezelőszoba')).toBeTruthy()
  })

  it('keeps an empty slot out of the accessibility tree', () => {
    const { container } = render(<PhotoSlot src="" alt="" label="Kezelőszoba" />)
    expect(container.firstChild.getAttribute('aria-hidden')).toBe('true')
  })
})
