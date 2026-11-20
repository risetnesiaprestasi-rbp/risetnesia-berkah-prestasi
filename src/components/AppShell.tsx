import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { NAV_GROUPS } from '../data/nav'

/** Internal (logged-in) layout: dark module sidebar + white top bar + content. */
export function AppShell({ active, header, children }: { active: string; header: ReactNode; children: ReactNode }) {
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
                <a key={it.name} href="#" className="sidebar__link" aria-disabled="true" onClick={(e) => e.preventDefault()}>
                  {it.name}
                </a>
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

/** Standard top bar: title, subtitle, actions on the right. */
export function TopBar({ title, subtitle, actions }: { title: ReactNode; subtitle?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="topbar">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <h1 className="topbar__title">{title}</h1>
        {subtitle && <span className="topbar__sub">{subtitle}</span>}
      </div>
      {actions && <div className="topbar__actions">{actions}</div>}
    </header>
  )
}
