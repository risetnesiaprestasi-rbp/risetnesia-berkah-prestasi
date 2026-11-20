import { Fragment, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppShell } from '../../components/AppShell'
import { Button, ButtonLink } from '../../components/Button'
import { Card } from '../../components/Card'
import { TextAreaField } from '../../components/Field'
import { ArrowRightIcon } from '../../components/Icons'
import { SegmentedControl } from '../../components/SegmentedControl'
import { SampleTag, StatusPill } from '../../components/StatusPill'
import { LOT_DETAIL } from '../../data/mock'
import type { Decision } from '../../data/types'
import './app.css'

const DECISIONS: { id: Decision; label: string }[] = [
  { id: 'release', label: 'Release' },
  { id: 'hold', label: 'Hold' },
  { id: 'reject', label: 'Reject' },
]

export default function LotDetail() {
  const { lotId } = useParams()
  // TODO: load the lot by `lotId`; sample data is shown for now.
  const lot = LOT_DETAIL
  const [dir, setDir] = useState<'back' | 'fwd'>('back')
  const [decision, setDecision] = useState<Decision>('release')
  const stages = dir === 'back' ? lot.backward : lot.forward

  const header = (
    <header className="lot-header">
      <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>
        <Link to="/app">Dashboard</Link> / Mutu / Detail Lot · <SampleTag />
      </span>
      <div className="card__head">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
          <h1 className="display" style={{ fontSize: 28 }}>{lotId ?? lot.id}</h1>
          <StatusPill status={decision} long size="md" />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <ButtonLink to={`/lacak?lot=${lot.id}`} variant="secondary">Lihat Halaman Publik</ButtonLink>
          <ButtonLink to="/app/gudang" variant="secondary">Cetak Label QR</ButtonLink>
        </div>
      </div>
      <div className="lot-header__meta">
        {lot.summary.map((s) => (
          <span key={s.label}>{s.label} <strong>{s.value}</strong></span>
        ))}
      </div>
    </header>
  )

  return (
    <AppShell active="Genealogy Lot" header={header}>
      <Card
        title="Pohon Silsilah Lot (Seed Lot Genealogy)"
        style={{ gap: 18 }}
        actions={
          <SegmentedControl
            label="Arah penelusuran"
            value={dir}
            onChange={setDir}
            options={[
              { value: 'back', label: '← Backward (asal)' },
              { value: 'fwd', label: 'Forward (tujuan) →' },
            ]}
          />
        }
      >
        <div className="table-wrap">
          <div className="genealogy">
            {stages.map((c, i) => (
              <div key={c.stage} className="genealogy__col">
                <div className="genealogy__stage">
                  <span className="genealogy__label">{c.stage}</span>
                  {c.nodes.map((n) => (
                    <div key={n.id} className={`gnode${n.focus ? ' gnode--focus' : ''}`}>
                      <strong>{n.id}</strong>
                      <span>{n.sub}</span>
                    </div>
                  ))}
                </div>
                {i < stages.length - 1 && <span className="genealogy__arrow"><ArrowRightIcon /></span>}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="row" style={{ alignItems: 'flex-start' }}>
        <Card
          title="LIMS — Hasil Uji Laboratorium"
          style={{ flex: '3 1 520px' }}
          actions={<span style={{ fontSize: 13, color: 'var(--color-muted)' }}>Tiket {lot.labTicket} · Sampel diambil [TGL]</span>}
        >
          <div className="table-wrap">
            <table className="table" style={{ minWidth: 520 }}>
              <thead>
                <tr><th>Parameter</th><th>Hasil</th><th>Standar SOP (BP)</th><th>Status</th></tr>
              </thead>
              <tbody>
                {lot.labResults.map((r) => (
                  <tr key={r.param}>
                    <td>{r.param}</td>
                    <td className="strong">{r.result}</td>
                    <td>{r.standard}</td>
                    <td className={r.pass ? 'pass' : 'fail'}>{r.pass ? '✓ Lulus' : '✕ Tidak lulus'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderTop: '1px solid var(--color-border-subtle)', paddingTop: 14 }}>
            <strong style={{ fontSize: 14 }}>Alur verifikasi</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <span className="pill pill--release pill--md" style={{ fontWeight: 600 }}>1 · Input analis ✓</span>
              <span className="pill pill--release pill--md" style={{ fontWeight: 600 }}>2 · Verifikasi kepala lab ✓</span>
              <span className="pill pill--neutral pill--md">Riwayat re-test: tidak ada</span>
            </div>
          </div>
        </Card>

        <Card tone="emphasis" title="Keputusan Pelepasan Lot" style={{ flex: '2 1 340px' }}>
          <div style={{ background: 'var(--color-primary-soft)', borderRadius: 8, padding: 14, fontSize: 14, color: 'var(--color-release-fg)', lineHeight: 1.5 }}>
            <strong>Rekomendasi sistem: Release.</strong> Seluruh parameter memenuhi kriteria SOP kelas BP (versi SOP [v3.1]). Tidak ada
            NC terbuka pada silsilah lot.
          </div>
          <fieldset className="fieldset">
            <legend>Keputusan</legend>
            <div className="choice-grid choice-grid--3">
              {DECISIONS.map((d) => (
                <button key={d.id} type="button" className={`choice decision decision--${d.id}`} aria-pressed={decision === d.id} onClick={() => setDecision(d.id)}>
                  {d.label}
                </button>
              ))}
            </div>
          </fieldset>
          <TextAreaField id="cat" label="Catatan keputusan" rows={3} gap={6} />
          <Button size="bold">Simpan Keputusan</Button>
          <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>Tersimpan ke Audit Trail: pengguna, waktu, nilai sebelum & sesudah.</span>
        </Card>
      </div>

      <Card title="Jejak Audit Lot" style={{ gap: 14 }}>
        {lot.audit.map((a, i) => (
          <Fragment key={i}>
            <div className="audit-row">
              <span style={{ color: 'var(--color-muted)', minWidth: 140 }}>{a.time}</span>
              <strong style={{ minWidth: 160 }}>{a.user}</strong>
              <span style={{ flex: '1 1 300px', color: 'var(--color-ink-2)' }}>{a.text}</span>
            </div>
          </Fragment>
        ))}
      </Card>
    </AppShell>
  )
}
