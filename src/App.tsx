import { useEffect, type ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/public/Home'
import LotLookup from './pages/public/LotLookup'
import Login from './pages/Login'
import Dashboard from './pages/app/Dashboard'
import LotDetail from './pages/app/LotDetail'
import Warehouse from './pages/app/Warehouse'
import { TrialBanner } from './components/TrialBanner'
import { usePrototype } from './state/prototype'

/** Internal pages need a (prototype) login; otherwise go to /login. */
function RequireLogin({ children }: { children: ReactNode }) {
  const { role } = usePrototype()
  const location = useLocation()
  return role ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <TrialBanner />
      <ScrollToTop />
      <Routes>
        {/* Public portal (no login) */}
        <Route path="/" element={<Home />} />
        <Route path="/lacak" element={<LotLookup />} />
        <Route path="/login" element={<Login />} />

        {/* Internal operations (login & RBAC) */}
        <Route path="/app" element={<RequireLogin><Dashboard /></RequireLogin>} />
        <Route path="/app/lot/:lotId" element={<RequireLogin><LotDetail /></RequireLogin>} />
        <Route path="/app/gudang" element={<RequireLogin><Warehouse /></RequireLogin>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
