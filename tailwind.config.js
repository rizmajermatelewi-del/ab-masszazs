/** @type {import('tailwindcss').Config} */

/* Semantic tokens, not raw hex in components, so the whole site can be
   re-tinted from one file and so a colour cannot drift between sections.

   The palette is deliberately NOT the stock beauty-salon pink-and-lavender.
   That palette is the colour equivalent of stock massage photography: it says
   "template" to exactly the local reader this site has to convince. Warm paper,
   warm near-black ink and a single clay accent read as a real room instead.

   Every foreground/background pair here is measured, not eyeballed:
     ink   on paper 14.91:1   muted on paper 5.43:1
     ink   on tint  13.78:1   muted on tint  5.02:1
     clay  on paper  5.89:1   white on clay  6.46:1  */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F4EF',
        tint: '#F0EBE3',
        ink: '#231F1C',
        muted: '#6B625B',
        faint: '#8A7F76',
        line: '#DED5C9',
        clay: '#8A4F34',
      },
      fontFamily: {
        /* No webfont: no remote request, nothing to self-host, nothing to
           block first paint. Georgia is on effectively every desktop and
           covers Hungarian (ő, ű) properly, and a real serif is the single
           biggest step away from looking like an unstyled default. */
        display: ['Georgia', 'Iowan Old Style', 'Palatino Linotype', 'Times New Roman', 'serif'],
        sans: [
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
        /* Diffuse and warm-tinted rather than a grey drop shadow: the light in
           this palette is warm, so the shadow has to be, or the cards read as
           cut out and pasted on. */
        lift: '0 1px 2px rgb(35 31 28 / 4%), 0 12px 32px -12px rgb(35 31 28 / 12%)',
        liftHover: '0 1px 2px rgb(35 31 28 / 5%), 0 20px 48px -16px rgb(35 31 28 / 18%)',
        /* The inner highlight that sells a surface as a physical plate. */
        core: 'inset 0 1px 1px rgb(255 255 255 / 70%)',
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
