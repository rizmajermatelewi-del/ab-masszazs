import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  /* vitest 3.2.7 bundles its own Vite 7, while @vitejs/plugin-react 6 hands JSX
     to Vite 8's native transform — so inside tests JSX fell back to the classic
     runtime and failed with "React is not defined". Naming the automatic
     runtime here fixes the test pipeline; dev and build never had the problem. */
  esbuild: { jsx: 'automatic' },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{js,jsx}'],
  },
})
