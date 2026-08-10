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

  /* The sentence above is a factual claim about the rest of the site, and a
     privacy notice that has quietly become false is worse than none. Asserting
     the words are present would pass over a lie, so assert the fact instead.

     When this fails, the fix is NOT to delete the test: Phase 2 is adding the
     booking form, and the tájékoztató has to be rewritten to describe it in the
     same commit that introduces it. */
  it('is telling the truth: the site really has no form on it', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(container.querySelector('form')).toBe(null)
    expect(container.querySelector('input')).toBe(null)
    expect(container.querySelector('textarea')).toBe(null)
  })
})
