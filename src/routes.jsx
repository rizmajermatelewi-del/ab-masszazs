import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Privacy from './pages/Privacy.jsx'

/* Task 8 adds src/data/seo.js, listing both paths as ROUTES for the prerender
   script to walk. Once it exists, adding a route here means adding it there too,
   or the new page ships with no prerendered markup. */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adatvedelem" element={<Privacy />} />
    </Routes>
  )
}
