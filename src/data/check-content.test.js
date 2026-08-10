import { describe, it, expect } from 'vitest'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { missingFacts } from './business'
import { SERVICES } from './services'

/* The point of this project is that nothing about the business is invented.
   The risk that creates is the opposite one: a live site with blank sections
   because a fact never arrived. This guard turns that into a failed build
   rather than a quiet embarrassment. */
const root = process.cwd()
const launchable = missingFacts().length === 0 && SERVICES.length > 0

describe('content guard', () => {
  it('agrees with the data modules about whether we can launch', () => {
    let exitCode = 0
    try {
      execFileSync('node', ['scripts/check-content.mjs'], { cwd: root, stdio: 'pipe' })
    } catch (err) {
      exitCode = err.status
    }
    expect(exitCode === 0).toBe(launchable)
  })

  it('runs before vite build, so a blank site is never produced', () => {
    const build = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8')).scripts.build
    const guardAt = build.indexOf('check-content.mjs')
    const viteAt = build.indexOf('vite build')
    expect(guardAt, 'check-content.mjs is not in the build script').toBeGreaterThan(-1)
    expect(guardAt, 'the guard must run before vite build').toBeLessThan(viteAt)
  })
})
