import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from '../routes.jsx'

/* @testing-library/react only auto-registers its afterEach(cleanup) when it
   finds a global `afterEach` -- this project runs vitest without test.globals,
   so nothing unmounts the previous test's render. Both tests below render the
   same route and both look for "nem gyűjt", so without this the second test
   sees two leftover trees and getByText fails with "multiple elements",
   not because the page is wrong. */
afterEach(cleanup)

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
