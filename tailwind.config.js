import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Abszolút globok: a dev server a projekten kívüli cwd-ből is indulhat.
const here = path.dirname(fileURLToPath(import.meta.url)).replace(/\\/g, '/')

/** @type {import('tailwindcss').Config} */
export default {
  content: [`${here}/index.html`, `${here}/src/**/*.{js,ts,jsx,tsx}`],
  theme: {
    extend: {
      colors: {
        // Derived from the @abmasszazs Instagram identity:
        // plum logo plate, lavender line-art lotus, candlelight gold, warm cream.
        primary: '#6D3F76',
        'primary-dark': '#4E2A56',
        'primary-light': '#A87FB0',
        accent: '#D9A441',
        'accent-dark': '#B8862C',
        background: '#FAF6F2',
        surface: '#FFFFFF',
        ink: '#2A1F2D',
        muted: '#7A6B7D',
        divider: '#E8DFE6',
        deep: '#2A1430',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '4rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
