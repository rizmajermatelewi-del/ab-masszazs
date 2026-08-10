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
    expect(screen.getAllByText('AB Masszázs').length).toBeGreaterThan(0)
  })
})
