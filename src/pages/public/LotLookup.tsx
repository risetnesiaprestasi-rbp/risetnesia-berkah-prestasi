import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Logo } from '../../components/Logo'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { TextField } from '../../components/Field'
import { CheckIcon } from '../../components/Icons'
import { Pill, SampleTag, StatusPill } from '../../components/StatusPill'
import { PUBLIC_LOT } from '../../data/mock'
import './public.css'

/** Public result page for a scanned / typed lot number. */
export default function LotLookup() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('lot') ?? PUBLIC_LOT.id)
  // TODO: fetch the lot by `params.get('lot')`; sample data is shown for now.
  const lot = PUBLIC_LOT

  const search = (e: FormEvent) => {
    e.preventDefault()
    setParams(query.trim() ? { lot: query.trim() } : {})
  }

  return (
    <div className="public">
      <header className="public-header">
        <div className="container public-header__inner">
          <Logo to="/" size={36} label="SQAS · Lacak Lot" />
          <form onSubmit={search} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: '0 1 420px' }}>
            <div style={{ flex: '1 1 200px' }}>
              <TextField id="q" label="Nomor lot" hideLabel size="md" value={query} onChange={(e) => setQuery(e.target.value)} style={{ height: 44 }} />
            </div>
            <Button type="submit" style={{ padding: '0 18px' }}>Cari</Button>
          </form>
        </div>
      </header>

      <main className="container" style={{ padding: '40px 24px 64px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, fontSize: 13, color: 'var(--color-muted)' }}>
          <SampleTag />
          <span>Tampilan hasil pemindaian QR label kemasan</span>
        </div>

        <Card large className="lot-hero">
          <div style={{ flex: '2 1 460px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className="eyebrow eyebrow--muted">Nomor Lot</span>
            <h1 className="display" style={{ fontSize: 40, lineHeight: 1.1, overflowWrap: 'anywhere' }}>{lot.id}</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {lot.status === 'release' ? (
                <Pill tone="release" size="lg"><CheckIcon />DILEPAS (RELEASE)</Pill>
              ) : (
                <StatusPill status={lot.status} long size="lg" />
              )}
              {lot.certified && <Pill tone="neutral" size="lg">Bersertifikat</Pill>}
            </div>
          </div>
          <dl className="fact-grid">
            {lot.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <div className="row" style={{ alignItems: 'flex-start' }}>
          <Card large style={{ flex: '2 1 520px', padding: 28, gap: 20 }}>
            <h2 className="display" style={{ fontSize: 22 }}>Riwayat Asal-Usul Lot</h2>
            <ol className="timeline">
              {lot.history.map((s, i) => (
                <li key={s.title} className="timeline__item">
                  <div className="timeline__rail">
                    <span className="timeline__dot">{i + 1}</span>
                    <span className="timeline__line" />
                  </div>
                  <div className="timeline__body">
                    <strong style={{ fontSize: 16 }}>{s.title}</strong>
                    <span style={{ fontSize: 14, color: 'var(--color-ink-2)' }}>{s.detail}</span>
                    <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>{s.ref}</span>
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          <aside style={{ flex: '1 1 300px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Card large>
              <h2 className="display" style={{ fontSize: 20 }}>Ringkasan Uji Lab</h2>
              {lot.lab.map((r) => (
                <div key={r.label} className="kv-row">
                  <span style={{ color: 'var(--color-ink-2)' }}>{r.label}</span>
                  <strong>{r.value}</strong>
                </div>
              ))}
              <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>Diverifikasi kepala laboratorium</span>
            </Card>
            <Card tone="warning">
              <strong style={{ fontSize: 16, color: 'var(--color-hold-fg)' }}>Menemukan ketidaksesuaian?</strong>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--color-hold-text)' }}>
                Laporkan jika label atau kondisi benih tidak sesuai dengan informasi di halaman ini.
              </p>
              <a href="#lapor" className="btn btn--warning" style={{ alignSelf: 'flex-start' }}>Laporkan</a>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
