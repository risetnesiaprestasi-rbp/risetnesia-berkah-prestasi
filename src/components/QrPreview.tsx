import { useMemo } from 'react'

const N = 21
const MODULE = 5

/**
 * Visual placeholder of a 21×21 QR code (finder patterns + pseudo-random data,
 * seeded by `value`). Not scannable — swap for a real QR encoder when printing.
 */
export function QrPreview({ value, label }: { value: string; label: string }) {
  const cells = useMemo(() => {
    let seed = [...value].reduce((s, ch) => (s * 31 + ch.charCodeAt(0)) % 233280, 7)
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280), seed / 233280)
    const finder = (r: number, c: number): boolean | null => {
      for (const [r0, c0] of [[0, 0], [0, 14], [14, 0]]) {
        const y = r - r0
        const x = c - c0
        if (y >= 0 && x >= 0 && y <= 6 && x <= 6) return y === 0 || y === 6 || x === 0 || x === 6 || (y >= 2 && y <= 4 && x >= 2 && x <= 4)
      }
      return null
    }
    const out: boolean[] = []
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) out.push(finder(r, c) ?? rnd() > 0.5)
    return out
  }, [value])

  return (
    <svg role="img" aria-label={label} width={N * MODULE} height={N * MODULE} viewBox={`0 0 ${N} ${N}`} shapeRendering="crispEdges" style={{ flex: 'none', background: '#fff' }}>
      {cells.map((on, i) => (on ? <rect key={i} x={i % N} y={Math.floor(i / N)} width={1} height={1} fill="#000" /> : null))}
    </svg>
  )
}
