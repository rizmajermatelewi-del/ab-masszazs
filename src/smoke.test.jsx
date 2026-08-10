import { describe, it, expect } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
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

  /* The prerendered HTML gets the title right for whichever page a crawler lands
     on, but a visitor who clicks through never reloads, so only RouteMeta keeps
     the tab honest after that. Untested, it can be broken by dropping a
     dependency or mistyping the selector without anything going red. */
  it('retitles the tab when the route changes under it', async () => {
    document.head.innerHTML = '<meta name="description" content="" />'
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    await waitFor(() => expect(document.title).toContain('AB Masszázs'))
    expect(document.title).not.toContain('Adatkezelési')

    /* A real click on the footer link, not a re-render with different entries:
       MemoryRouter ignores initialEntries after mount, so that would assert
       nothing about navigation. */
    fireEvent.click(screen.getByRole('link', { name: 'Adatvédelem' }))
    await waitFor(() => expect(document.title).toContain('Adatkezelési'))
    expect(
      document.querySelector('meta[name="description"]').getAttribute('content'),
    ).toContain('adatokat')
  })

  it('survives a document with no description tag at all', async () => {
    document.head.innerHTML = ''
    expect(() =>
      render(
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>,
      ),
    ).not.toThrow()
    await waitFor(() => expect(document.title).toContain('AB Masszázs'))
  })
})
