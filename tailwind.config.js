/** @type {import('tailwindcss').Config} */

/* Semantic tokens, not raw hex in components, so the whole site can be
   re-tinted from one file and so a colour cannot drift between sections.

   The palette is HER brand, taken from the AB Masszázs cover on her Facebook
   page: a dusty rose ground, the logo and the bamboo in deep plum, the
   tunic in wine. Light page, plum as the one accent.

   Measured pairs:
     ink on paper 13.6:1, muted 5.7:1, faint 5.4:1 (faint on tint 4.8:1)
     lotus on paper 7.5:1, paper on lotus 7.5:1 (the CTA)  */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F4E9E6',
        tint: '#EBDAD7',
        ink: '#2E1A2B',
        muted: '#6B5566',
        faint: '#6E5866',
        line: '#DCC7C4',
        lotus: '#6E3563',
      },
      fontFamily: {
        /* Cormorant for display: her logo is a classical serif set in capitals, so this is
           her letterform, not a "premium" default. Manrope for text. Both
           self-hosted in main.jsx, both with latin-ext (ő, ű). */
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: [
          '"Manrope Variable"',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        /* ~66 characters: the readable measure for body copy. */
        prose: '34rem',
      },
      letterSpacing: {
        label: '0.18em',
      },
      transitionTimingFunction: {
        /* One curve for the whole site. It decelerates hard at the end, which
           is what makes a panel feel like it has mass instead of snapping. */
        fluid: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      boxShadow: {
        /* Plum-tinted, not grey: a grey shadow on a rose page reads as dirt. */
        lift: '0 1px 2px rgb(46 26 43 / 5%), 0 14px 36px -14px rgb(46 26 43 / 16%)',
        liftHover: '0 1px 2px rgb(46 26 43 / 6%), 0 22px 50px -16px rgb(46 26 43 / 24%)',
        /* The inner highlight that sells a surface as a physical plate. */
        core: 'inset 0 1px 1px rgb(255 255 255 / 60%)',
      },
      borderRadius: {
        shell: '2rem',
        /* Concentric with `shell` once the 0.375rem tray padding is taken off,
           so the inner and outer curves stay parallel. */
        core: 'calc(2rem - 0.375rem)',
      },
    },
  },
  plugins: [],
}
