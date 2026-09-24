import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

/* @testing-library/react only registers its own auto-cleanup when it finds a
   global `afterEach`, which needs vitest's `globals: true`. This repo does not
   set it, so without this file every render() leaks its DOM into the next test
   in the same file — a query then matches the live tree AND the abandoned one.
   It surfaced in Privacy.test.jsx as "found multiple elements"; every other
   multi-render test file was one overlapping string away from the same fault. */
afterEach(cleanup)

/* jsdom ships no matchMedia at all, so any component that asks the browser
   about prefers-reduced-motion throws on render. Every real browser has it;
   stubbing it here keeps that gap in the environment rather than pushing a
   defensive `?.` into components that would then be lying about what they
   support. Defaults to "no preference", which is what most visitors have --
   a test that needs the other answer can override this one property. */
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })
}
