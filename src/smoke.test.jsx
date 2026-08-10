import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from './routes.jsx'

/* Proves the toolchain works end to end — JSX compiles, jsdom renders, the
   router resolves — before any real component depends on all three. */
describe('app shell', () => {
  it('renders the home route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    /* Twice, not "at least once": the header wordmark and the hero h1 both fall
       back to it while BUSINESS.name is empty. A count that cannot fail would
       leave this test asserting only that getAllByText did not throw. */
    expect(screen.getAllByText('AB Masszázs')).toHaveLength(2)
  })
})
