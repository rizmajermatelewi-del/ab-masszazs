import path from 'node:path'
import { fileURLToPath } from 'node:url'

// A dev servert a projekten kívüli cwd-ből is indíthatják, ezért a Tailwind
// configot abszolút úton adjuk át — különben üresnek látja a content listát.
const here = path.dirname(fileURLToPath(import.meta.url))

export default {
  plugins: {
    tailwindcss: { config: path.join(here, 'tailwind.config.js') },
    autoprefixer: {},
  },
}
