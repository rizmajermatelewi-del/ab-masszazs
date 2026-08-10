import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

/* The section must disappear entirely rather than render an empty heading: a
   live page with a "Szolgáltatások" heading and nothing under it reads as
   broken, which is the opposite of what this site is for. */
describe('Services', () => {
  it('renders nothing while the price list is empty', async () => {
    vi.resetModules()
    vi.doMock('../data/services', () => ({ SERVICES: [] }))
    const { default: Services } = await import('./Services.jsx')
    const { container } = render(<Services />)
    expect(container.firstChild).toBe(null)
  })

  it('lists each service with its duration and price', async () => {
    vi.resetModules()
    vi.doMock('../data/services', () => ({
      SERVICES: [
        { id: 'a', name: 'Svédmasszázs', minutes: 60, price: 9000, desc: 'Leírás.' },
        { id: 'b', name: 'Frissítő', minutes: 30, price: 5500, desc: '' },
      ],
    }))
    const { default: Services } = await import('./Services.jsx')
    render(<Services />)
    expect(screen.getByText('Svédmasszázs')).toBeTruthy()
    expect(screen.getByText('60 perc')).toBeTruthy()
    /* getByText's default normalizer collapses all whitespace -- including
       non-breaking spaces -- to a plain space before comparing, but it does
       not normalize the matcher string. A literal-nbsp matcher would never
       match, so normalization is disabled here to actually verify the nbsp
       survived into the DOM (see format.test.js for the encoding itself). */
    expect(screen.getByText('9\u00a0000\u00a0Ft', { normalizer: (text) => text })).toBeTruthy()
    expect(screen.getByText('Frissítő')).toBeTruthy()
  })
})
