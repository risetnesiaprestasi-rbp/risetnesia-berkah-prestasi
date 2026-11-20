import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/public/Home'
import LotLookup from './pages/public/LotLookup'
import Login from './pages/Login'
import Dashboard from './pages/app/Dashboard'
import LotDetail from './pages/app/LotDetail'
import Warehouse from './pages/app/Warehouse'

export default function App() {
  return (
    <Routes>
      {/* Public portal (no login) */}
      <Route path="/" element={<Home />} />
      <Route path="/lacak" element={<LotLookup />} />
      <Route path="/login" element={<Login />} />

      {/* Internal operations (login & RBAC) */}
      <Route path="/app" element={<Dashboard />} />
      <Route path="/app/lot/:lotId" element={<LotDetail />} />
      <Route path="/app/gudang" element={<Warehouse />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
