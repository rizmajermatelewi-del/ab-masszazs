import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Privacy from './pages/Privacy.jsx'

/* Both paths also live in src/data/seo.js as ROUTES, which the prerender script
   walks to write the HTML files. Adding a route means adding it there too, or
   it ships with no prerendered markup. */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adatvedelem" element={<Privacy />} />
    </Routes>
  )
}
