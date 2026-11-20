import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from './Logo'
import { NAV_GROUPS } from '../data/nav'
import { NOT_IN_PROTOTYPE, ROLE_INITIALS, ROLE_LABEL, usePrototype } from '../state/prototype'

/** Internal (logged-in) layout: dark module sidebar + white top bar + content. */
export function AppShell({ active, header, children }: { active: string; header: ReactNode; children: ReactNode }) {
  const { toast } = usePrototype()
  return (
    <div className="shell">
      <nav aria-label="Modul SQAS" className="sidebar">
        <Logo to="/app" />
        {NAV_GROUPS.map((g) => (
          <div key={g.label} className="sidebar__group">
            <span className="sidebar__label">{g.label}</span>
            {g.items.map((it) =>
              it.to ? (
                <Link
                  key={it.name}
                  to={it.to}
                  className={`sidebar__link${it.name === active ? ' sidebar__link--active' : ''}`}
                  aria-current={it.name === active ? 'page' : undefined}
                >
                  {it.name}
                </Link>
              ) : (
                <button key={it.name} type="button" className="sidebar__link sidebar__link--soon" onClick={() => toast(`${it.name}: ${NOT_IN_PROTOTYPE}`)}>
                  {it.name}
                </button>
              ),
            )}
          </div>
        ))}
      </nav>
      <div className="shell__main">
        {header}
        <main className="content">{children}</main>
      </div>
    </div>
  )
}

/** Signed-in user chip with a logout button. */
export function UserChip() {
  const { role, logout } = usePrototype()
  const navigate = useNavigate()
  if (!role) return null
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
      <span className="avatar" aria-hidden="true">{ROLE_INITIALS[role]}</span>
      {ROLE_LABEL[role]}
      <button
        type="button"
        className="btn btn--secondary"
        style={{ minHeight: 36, padding: '0 10px', fontSize: 13 }}
        onClick={() => {
          logout()
          navigate('/login')
        }}
      >
        Keluar
      </button>
    </span>
  )
}

/** Standard top bar: title, subtitle, actions on the right (user chip appended). */
export function TopBar({ title, subtitle, actions }: { title: ReactNode; subtitle?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="topbar">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <h1 className="topbar__title">{title}</h1>
        {subtitle && <span className="topbar__sub">{subtitle}</span>}
      </div>
      <div className="topbar__actions">
        {actions}
        <UserChip />
      </div>
    </header>
  )
}
