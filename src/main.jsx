import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes.jsx'
/* Self-hosted, so no request to Google (their font CDN logs the visitor's IP,
   which would need a line in the privacy notice). Both cover ő/ű. */
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/400-italic.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource-variable/manrope'
import './index.css'

/* Hydrate when the prerendered markup is present, mount when it is not — the
   dev server serves an empty #root, the built site does not. */
const root = document.getElementById('root')
const tree = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
)

if (root.hasChildNodes()) hydrateRoot(root, tree)
else createRoot(root).render(tree)
