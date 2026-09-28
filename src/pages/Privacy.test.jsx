import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from '../routes.jsx'
import { BOOKING_ONLINE } from '../data/booking'

/* Phase 1 collects no personal data at all — there is no form yet. The page
   exists anyway because the footer links to it from day one, and a dead link in
   the footer of a business site is exactly the sloppiness this project is meant
   to disprove. Phase 2 rewrites it when the booking form lands. */
function renderAt(path) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('/adatvedelem', () => {
  it('is a real route with a heading', () => {
    renderAt('/adatvedelem')
    expect(screen.getByRole('heading', { name: /Adatkezelési tájékoztató/ })).toBeTruthy()
  })

  /* Whichever state the site is in, the notice describes that one: no data
     while booking is off, the booking data (and the regulator) once it is on. */
  it('describes what the site actually collects', () => {
    renderAt('/adatvedelem')
    // The forms exist in every state, so the notice can never say it collects nothing.
    expect(screen.queryByText(/nem gyűjt/)).toBe(null)
    expect(screen.getByText(/Visszahívás és ajándékutalvány/)).toBeTruthy()
    if (BOOKING_ONLINE) {
      expect(screen.getByText(/Online időpontfoglalás/)).toBeTruthy()
      expect(screen.getByText(/Google Naptárban/)).toBeTruthy()
    } else {
      expect(screen.queryByText(/Online időpontfoglalás/)).toBe(null)
    }
  })

  /* Was "the site has no form". The callback and voucher forms arrived
     together with the notice text that describes them, as that test asked;
     this keeps the two tied: every form on the home page must be named in
     the notice. */
  it('names every form the home page actually has', () => {
    const home = render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    const forms = home.container.querySelectorAll('form').length
    home.unmount()

    renderAt('/adatvedelem')
    const text = document.body.textContent
    expect(forms).toBe(2)
    expect(text).toContain('visszahívás-kérő űrlapon')
    expect(text).toContain('ajándékutalvány-igénylésnél')
    expect(text).toContain('Gmailen keresztül')
  })
})
