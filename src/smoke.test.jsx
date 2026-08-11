import { describe, it, expect } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from './routes.jsx'
import { BUSINESS } from './data/business'
import { GIFT_CARD } from './data/content'
import { DEMO } from './data/demo'

/* Proves the toolchain works end to end — JSX compiles, jsdom renders, the
   router resolves — before any real component depends on all three. */
describe('app shell', () => {
  it('renders the home route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    /* An exact count, not "at least once": a query that cannot fail would leave
       this test asserting only that getAllByText did not throw.

       Derived rather than a literal, because the number moves with the data and
       for a good reason. The header wordmark and the hero both always carry the
       name -- the hero as its h1 while there is no headline, as the eyebrow
       above it once there is. The voucher mock-up carries it a third time, but
       only once she actually sells vouchers. A hardcoded 2 goes red the day
       real content lands, which is precisely the day it must not. */
    const brand = BUSINESS.name || 'AB Masszázs'
    expect(screen.getAllByText(brand)).toHaveLength(GIFT_CARD.enabled ? 3 : 2)
  })

  /* check-content.mjs stops demo content reaching a server. Nothing stopped it
     reaching a screenshot until the banner existed, and nothing noticed if the
     banner were deleted -- every other test on this page passes with it gone,
     because it is the one element whose whole job is to be redundant.

     Asserted both ways round: present while the data is fake, and absent once
     it is real, so it cannot be left behind on the live site either. */
  it('says out loud that the content is invented, exactly while it is', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    const alerts = screen.queryAllByRole('alert')
    expect(alerts).toHaveLength(DEMO ? 1 : 0)
    if (DEMO) expect(alerts[0].textContent).toContain('DEMÓ')
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
