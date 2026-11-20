import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
import { TextField } from '../components/Field'
import { usePrototype, type Role } from '../state/prototype'
import './login.css'

const ROLES: { id: Role; name: string; sub: string }[] = [
  { id: 'super', name: 'Super Admin', sub: 'Central Data & Security' },
  { id: 'admin', name: 'Admin', sub: 'Physical Operation' },
]

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, toast } = usePrototype()
  const [role, setRole] = useState<Role>('admin')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    // Prototype: no real authentication. TODO: authenticate against the SQAS backend; role drives RBAC.
    login(role)
    const from = (location.state as { from?: string } | null)?.from
    navigate(from && from.startsWith('/app') ? from : '/app')
  }

  return (
    <div className="login">
      <div className="login__brand">
        <Logo to="/" size={24} fontSize={20} bare />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
          <h1 className="display" style={{ fontSize: 40, lineHeight: 1.1 }}>Sistem Operasional Internal</h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--color-primary-on-dark-muted)' }}>
            Akses dibatasi sesuai peran. Super Admin mengelola data pusat, hak akses, dan persetujuan SOP. Admin mencatat dan
            memverifikasi operasional harian.
          </p>
        </div>
        <span style={{ fontSize: 13, color: 'var(--color-primary-on-dark)' }}>Setiap login dan perubahan data tercatat di Audit Trail.</span>
      </div>

      <div className="login__panel">
        <form className="login__form" onSubmit={submit}>
          <h2 className="display" style={{ fontSize: 28 }}>Masuk</h2>
          <p className="login__hint">Uji coba: isi email dan kata sandi bebas, lalu pilih peran.</p>
          <TextField id="email" label="Email atau ID staf" size="md" autoComplete="username" />
          <TextField id="pw" label="Kata sandi" type="password" size="md" autoComplete="current-password" />
          <fieldset className="fieldset">
            <legend>Masuk sebagai</legend>
            <div className="choice-grid choice-grid--2">
              {ROLES.map((r) => (
                <button key={r.id} type="button" className="choice role-choice" aria-pressed={role === r.id} onClick={() => setRole(r.id)}>
                  <strong style={{ fontSize: 14 }}>{r.name}</strong>
                  <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>{r.sub}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <Button type="submit" size="bold" block style={{ fontWeight: 600, fontSize: 14 }}>Masuk</Button>
          <button type="button" className="link-btn" onClick={() => toast('Hubungi Super Admin untuk reset kata sandi.')}>Lupa kata sandi? Hubungi Super Admin</button>
        </form>
      </div>
    </div>
  )
}
