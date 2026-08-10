import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Privacy from './pages/Privacy.jsx'
import { metaFor } from './data/seo.js'

/* Task 8 adds src/data/seo.js, listing both paths as ROUTES for the prerender
   script to walk. Once it exists, adding a route here means adding it there too,
   or the new page ships with no prerendered markup. */

/* The prerender script sets <title> and the description once, at build time,
   for whichever route a crawler lands on directly. But a visitor who lands on
   "/" and then clicks through to "/adatvedelem" never reloads the page, so
   nothing else would update the tab title or the description for that second
   route. This keeps both in sync with the route react-router is showing.
   React never runs effects during renderToString, so this is a no-op on the
   server and does not need an entry-server-side guard. */
function RouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const { title, description } = metaFor(pathname)
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [pathname])

  return null
}

export function AppRoutes() {
  return (
    <>
      <RouteMeta />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adatvedelem" element={<Privacy />} />
      </Routes>
    </>
  )
}
