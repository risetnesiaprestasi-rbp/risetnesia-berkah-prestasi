import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Decision } from '../data/types'

/**
 * Client-only state for the limited-trial prototype ("uji coba terbatas").
 * Kept in this browser's localStorage so a tester's actions survive reloads;
 * nothing is sent to a server. `reset()` restores the sample data.
 */

export type Role = 'super' | 'admin'
export type AuditEntry = { lotId: string; time: string; user: string; text: string }

type State = {
  role: Role | null
  decisions: Record<string, Decision>
  audit: AuditEntry[]
  reports: number
  cookieOk: boolean
}

const INITIAL: State = { role: null, decisions: {}, audit: [], reports: 0, cookieOk: false }
const KEY = 'sqas-prototype-v1'

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...INITIAL, ...JSON.parse(raw) } : INITIAL
  } catch {
    return INITIAL
  }
}

export const ROLE_LABEL: Record<Role, string> = { super: 'Super Admin', admin: 'Admin' }
export const ROLE_INITIALS: Record<Role, string> = { super: 'SA', admin: 'AD' }

type Ctx = State & {
  login: (role: Role) => void
  logout: () => void
  decide: (lotId: string, decision: Decision, note: string) => void
  report: () => void
  acceptCookies: () => void
  reset: () => void
  toast: (message: string) => void
}

const PrototypeContext = createContext<Ctx | null>(null)

const nowLabel = () =>
  new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(load)
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable: prototype still works for this visit */
    }
  }, [state])

  const toast = useCallback((message: string) => {
    setToastMsg(message)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToastMsg(null), 3500)
  }, [])

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      toast,
      login: (role) => setState((s) => ({ ...s, role })),
      logout: () => setState((s) => ({ ...s, role: null })),
      decide: (lotId, decision, note) =>
        setState((s) => ({
          ...s,
          decisions: { ...s.decisions, [lotId]: decision },
          audit: [
            {
              lotId,
              time: nowLabel(),
              user: s.role ? ROLE_LABEL[s.role] : 'Pengguna',
              text: `Keputusan mutu: ${decision.toUpperCase()}${note.trim() ? ` — “${note.trim()}”` : ''}`,
            },
            ...s.audit,
          ],
        })),
      report: () => setState((s) => ({ ...s, reports: s.reports + 1 })),
      acceptCookies: () => setState((s) => ({ ...s, cookieOk: true })),
      reset: () => {
        setState({ ...INITIAL, cookieOk: state.cookieOk })
        toast('Data prototipe dikembalikan ke kondisi awal.')
      },
    }),
    [state, toast],
  )

  return (
    <PrototypeContext.Provider value={value}>
      {children}
      <div className="toast-region" role="status" aria-live="polite">
        {toastMsg && <div className="toast">{toastMsg}</div>}
      </div>
    </PrototypeContext.Provider>
  )
}

export function usePrototype() {
  const ctx = useContext(PrototypeContext)
  if (!ctx) throw new Error('usePrototype must be used inside <PrototypeProvider>')
  return ctx
}

/** Toast text for anything the prototype intentionally doesn't implement. */
export const NOT_IN_PROTOTYPE = 'Belum tersedia di prototipe uji coba.'
