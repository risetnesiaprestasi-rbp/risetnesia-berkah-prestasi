import type { ReactNode } from 'react'
import type { Decision } from '../data/types'

type Tone = Decision | 'neutral'

export function Pill({ tone, size = 'sm', children }: { tone: Tone; size?: 'sm' | 'md' | 'lg'; children: ReactNode }) {
  return <span className={`pill pill--${tone}${size !== 'sm' ? ` pill--${size}` : ''}`}>{children}</span>
}

const SHORT: Record<Decision, string> = { release: 'Release', hold: 'Hold', reject: 'Reject' }
const LONG: Record<Decision, string> = {
  release: 'DILEPAS (RELEASE)',
  hold: 'DITAHAN (HOLD)',
  reject: 'DITOLAK (REJECT)',
}

/** Release / Hold / Reject badge. `long` uses the Indonesian label shown on lot pages. */
export function StatusPill({ status, long, size }: { status: Decision; long?: boolean; size?: 'sm' | 'md' | 'lg' }) {
  return <Pill tone={status} size={size}>{long ? LONG[status] : SHORT[status]}</Pill>
}

export function SampleTag() {
  return <span className="sample-tag">Data contoh</span>
}
