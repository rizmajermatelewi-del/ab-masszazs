import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

/* Writes real HTML for every route, so a crawler never has to run JavaScript to
   see the address, the prices or the opening hours. For a business whose whole
   goal is being found locally, "Google can usually render JS eventually" is not
   a good enough answer.

   SITE_ORIGIN comes from the environment so the deploy sets it once. Getting it
   wrong produces canonical URLs pointing at the wrong host, which is worth
   failing loudly over rather than guessing. */
const root = process.cwd()
const origin = (process.env.SITE_ORIGIN || '').replace(/\/$/, '')

if (!origin) {
  console.error('SITE_ORIGIN is not set — refusing to prerender canonicals pointing nowhere.')
  console.error('Example: SITE_ORIGIN=https://ab-masszazs.pages.dev npm run build')
  process.exit(1)
}

const template = readFileSync(path.join(root, 'dist/index.html'), 'utf8')
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)
const { ROUTES, metaFor, buildLocalBusinessJsonLd } = await import(
  pathToFileURL(path.join(root, 'src/data/seo.js')).href
)

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const route of ROUTES) {
  const markup = render(route)
  const { title, description, index } = metaFor(route)
  const url = route === '/' ? `${origin}/` : `${origin}${route}`

  let page = template
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeAttr(description)}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${escapeAttr(url)}" />`,
    )

  /* The tájékoztató has no business in search results: it competes with the
     page that should rank and says nothing a searcher wants. */
  if (!index) {
    page = page.replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>')
  }

  if (route === '/') {
    const ld = buildLocalBusinessJsonLd(origin)
    if (ld) {
      const json = JSON.stringify(ld).replace(/</g, '\\u003c')
      page = page.replace(
        '</head>',
        `  <script type="application/ld+json">${json}</script>\n  </head>`,
      )
    }
  }

  const outDir = route === '/' ? path.join(root, 'dist') : path.join(root, 'dist', route)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(path.join(outDir, 'index.html'), page, 'utf8')
  console.log(`prerendered ${route} -> ${path.relative(root, path.join(outDir, 'index.html'))}`)
}
