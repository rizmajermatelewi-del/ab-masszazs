import { renderToString } from 'react-dom/server'
/* react-router-dom 7.18 dropped the /server subpath export (there is no
   dist/server.js on disk and no "./server" entry in its package.json
   "exports" map, which is what `vite build --ssr` failed on: "./server" is
   not exported under the conditions [...] from package react-router-dom).
   StaticRouter now ships from the base "react-router" package and is
   re-exported by react-router-dom's main entry, so the plain import works. */
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './routes.jsx'

export function render(route) {
  return renderToString(
    <StaticRouter location={route}>
      <AppRoutes />
    </StaticRouter>,
  )
}
