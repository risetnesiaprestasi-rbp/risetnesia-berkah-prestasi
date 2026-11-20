import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppShell, TopBar, UserChip } from '../../components/AppShell'
import { Button, ButtonLink } from '../../components/Button'
import { Card } from '../../components/Card'
import { TextAreaField } from '../../components/Field'
import { ArrowRightIcon } from '../../components/Icons'
import { SegmentedControl } from '../../components/SegmentedControl'
import { Pill, SampleTag, StatusPill } from '../../components/StatusPill'
import { LAB_PARAMS, LOT_DETAIL, RECOMMENDATION_TEXT, findLot, type GenealogyStage } from '../../data/mock'
import type { Decision } from '../../data/types'
import { usePrototype } from '../../state/prototype'
import './app.css'

const DECISIONS: { id: Decision; label: string }[] = [
  { id: 'release', label: 'Release' },
  { id: 'hold', label: 'Hold' },
  { id: 'reject', label: 'Reject' },
]

/** Put the current lot's id/weight on the focus node of the sample genealogy. */
const withLot = (stages: GenealogyStage[], id: string, weight: string) =>
  stages.map((s) => ({ ...s, nodes: s.nodes.map((n) => (n.focus ? { ...n, id, sub: weight } : n)) }))

export default function LotDetail() {
  const { lotId } = useParams()
  const record = findLot(lotId)
  const { decisions, audit, decide, toast } = usePrototype()
  const saved = record ? decisions[record.id] : undefined
  const recommendation = record?.status ?? 'release'

  const [dir, setDir] = useState<'back' | 'fwd'>('back')
  const [choice, setChoice] = useState<Decision>(saved ?? recommendation)
  const [note, setNote] = useState('')

  // Reset the form when navigating to another lot.
  useEffect(() => {
    setChoice(saved ?? recommendation)
    setNote('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record?.id])

  if (!record) {
    return (
      <AppShell active="Genealogy Lot" header={<TopBar title="Detail Lot" />}>
        <Card className="empty-state">
          <h2 className="display" style={{ fontSize: 24 }}>Lot “{lotId}” tidak ditemukan</h2>
          <ButtonLink to="/app">Kembali ke Dashboard</ButtonLink>
        </Card>
      </AppShell>
    )
  }

  const stages = withLot(dir === 'back' ? LOT_DETAIL.backward : LOT_DETAIL.forward, record.id, record.weight)
  const lotAudit = [...audit.filter((a) => a.lotId === record.id), ...LOT_DETAIL.audit.map((a) => ({ ...a, text: a.text.replace('LAB-2026-1207', record.ticket).replace('LOT-PD-2026-0142', record.id) }))]

  const save = () => {
    decide(record.id, choice, note)
    setNote('')
    toast(`Keputusan ${choice.toUpperCase()} untuk ${record.id} tersimpan dan tercatat di Audit Trail.`)
  }

  const header = (
    <header className="lot-header">
      <div className="card__head">
        <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>
          <Link to="/app">Dashboard</Link> / Mutu / Detail Lot · <SampleTag />
        </span>
        <UserChip />
      </div>
      <div className="card__head">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
          <h1 className="display" style={{ fontSize: 28 }}>{record.id}</h1>
          {saved ? <StatusPill status={saved} long size="md" /> : <Pill tone="neutral" size="md">MENUNGGU KEPUTUSAN</Pill>}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <ButtonLink to={`/lacak?lot=${record.id}`} variant="secondary">Lihat Halaman Publik</ButtonLink>
          <ButtonLink to="/app/gudang" variant="secondary">Cetak Label QR</ButtonLink>
        </div>
      </div>
      <div className="lot-header__meta">
        <span>Padi · <strong>{record.variety}</strong></span>
        <span>Kelas <strong>{record.cls}</strong></span>
        <span>Berat <strong>{record.weight}</strong></span>
        <span>Rendemen <strong>{record.yieldPct}</strong></span>
        <span>Asal: <strong>Merge 2 batch panen</strong></span>
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
          actions={<span style={{ fontSize: 13, color: 'var(--color-muted)' }}>Tiket {record.ticket} · Sampel diambil [TGL]</span>}
        >
          <div className="table-wrap">
            <table className="table" style={{ minWidth: 520 }}>
              <thead>
                <tr><th>Parameter</th><th>Hasil</th><th>Standar SOP ({record.cls})</th><th>Status</th></tr>
              </thead>
              <tbody>
                {LAB_PARAMS.map((p, i) => (
                  <tr key={p.param}>
                    <td>{p.param}</td>
                    <td className="strong">{record.lab[i].result}</td>
                    <td>{p.standard}</td>
                    <td className={record.lab[i].pass ? 'pass' : 'fail'}>{record.lab[i].pass ? '✓ Lulus' : '✕ Tidak lulus'}</td>
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
              <span className="pill pill--neutral pill--md">
                Riwayat re-test: {recommendation === 'hold' ? 'dijadwalkan' : 'tidak ada'}
              </span>
            </div>
          </div>
        </Card>

        <Card tone="emphasis" title="Keputusan Pelepasan Lot" style={{ flex: '2 1 340px' }}>
          <div className={`recommendation recommendation--${recommendation}`}>
            <strong>Rekomendasi sistem: {recommendation[0].toUpperCase() + recommendation.slice(1)}.</strong> {RECOMMENDATION_TEXT[recommendation]}
          </div>
          <fieldset className="fieldset">
            <legend>Keputusan</legend>
            <div className="choice-grid choice-grid--3">
              {DECISIONS.map((d) => (
                <button key={d.id} type="button" className={`choice decision decision--${d.id}`} aria-pressed={choice === d.id} onClick={() => setChoice(d.id)}>
                  {d.label}
                </button>
              ))}
            </div>
          </fieldset>
          {choice !== recommendation && (
            <p style={{ fontSize: 13, color: 'var(--color-hold-text)' }}>Keputusan berbeda dari rekomendasi sistem — tuliskan alasannya di catatan.</p>
          )}
          <TextAreaField id="cat" label="Catatan keputusan" rows={3} gap={6} value={note} onChange={(e) => setNote(e.target.value)} />
          <Button size="bold" onClick={save} disabled={choice !== recommendation && !note.trim()}>Simpan Keputusan</Button>
          <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>Tersimpan ke Audit Trail: pengguna, waktu, nilai sebelum & sesudah.</span>
        </Card>
      </div>

      <Card title="Jejak Audit Lot" style={{ gap: 14 }}>
        {lotAudit.map((a, i) => (
          <div key={i} className="audit-row">
            <span style={{ color: 'var(--color-muted)', minWidth: 140 }}>{a.time}</span>
            <strong style={{ minWidth: 160 }}>{a.user}</strong>
            <span style={{ flex: '1 1 300px', color: 'var(--color-ink-2)' }}>{a.text}</span>
          </div>
        ))}
      </Card>
    </AppShell>
  )
}
