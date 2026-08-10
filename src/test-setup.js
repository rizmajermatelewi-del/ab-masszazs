import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

/* @testing-library/react only registers its own auto-cleanup when it finds a
   global `afterEach`, which needs vitest's `globals: true`. This repo does not
   set it, so without this file every render() leaks its DOM into the next test
   in the same file — a query then matches the live tree AND the abandoned one.
   It surfaced in Privacy.test.jsx as "found multiple elements"; every other
   multi-render test file was one overlapping string away from the same fault. */
afterEach(cleanup)
