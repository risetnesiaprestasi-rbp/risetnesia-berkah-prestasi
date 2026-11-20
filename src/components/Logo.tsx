import { Link } from 'react-router-dom'
import { SproutIcon } from './Icons'

type LogoProps = {
  to?: string
  /** Size of the square mark in px. */
  size?: number
  label?: string
  subtitle?: string
  fontSize?: number
  /** Icon only, no filled tile (used on dark-green backgrounds). */
  bare?: boolean
}

export function Logo({ to, size = 34, label = 'SQAS', subtitle, fontSize = 18, bare }: LogoProps) {
  const content = (
    <>
      {bare ? (
        <SproutIcon size={size} />
      ) : (
        <span className="logo__mark" style={{ width: size, height: size, borderRadius: Math.round(size / 4) }}>
          <SproutIcon size={Math.round(size * 0.55)} />
        </span>
      )}
      {subtitle ? (
        <span style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="logo__name" style={{ fontSize, letterSpacing: 0.5 }}>{label}</span>
          <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>{subtitle}</span>
        </span>
      ) : (
        <span className="logo__name" style={{ fontSize }}>{label}</span>
      )}
    </>
  )
  return to ? (
    <Link to={to} className="logo">{content}</Link>
  ) : (
    <span className="logo">{content}</span>
  )
}
