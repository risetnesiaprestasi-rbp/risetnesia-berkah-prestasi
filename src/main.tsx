import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './styles/tokens.css'
import './styles/global.css'
import './styles/components.css'
import { PrototypeProvider } from './state/prototype'
import App from './App'

// HashRouter: the trial prototype is served as static files, so routes live in the URL hash.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <PrototypeProvider>
        <App />
      </PrototypeProvider>
    </HashRouter>
  </StrictMode>,
)
