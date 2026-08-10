import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from '../routes.jsx'

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

  it('says plainly that the site collects nothing yet', () => {
    renderAt('/adatvedelem')
    expect(screen.getByText(/nem gyűjt/)).toBeTruthy()
  })
})
