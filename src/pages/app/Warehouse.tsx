import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppShell, TopBar } from '../../components/AppShell'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { SelectField, TextField } from '../../components/Field'
import { SegmentedControl } from '../../components/SegmentedControl'
import { SampleTag, StatusPill } from '../../components/StatusPill'
import { QrPreview } from '../../components/QrPreview'
import { STOCK_GD01 } from '../../data/mock'
import { NOT_IN_PROTOTYPE, usePrototype } from '../../state/prototype'
import './app.css'

type Rule = 'fifo' | 'fefo'

const RULE_TEXT: Record<Rule, string> = {
  fifo: 'FIFO: lot yang paling dulu masuk gudang dikeluarkan lebih dulu.',
  fefo: 'FEFO: lot dengan batas masa simpan terdekat dikeluarkan lebih dulu.',
}

export default function Warehouse() {
  const [rule, setRule] = useState<Rule>('fefo')
  const [labelLot, setLabelLot] = useState('LOT-PD-2026-0142')
  const [qty, setQty] = useState('600')
  const { decisions, toast } = usePrototype()

  const rows = useMemo(() => {
    const key = rule === 'fifo' ? 'inDate' : 'expDate'
    // A decision saved in Lot Detail overrides the sample status (e.g. a lot put on Hold gets locked here).
    const stock = STOCK_GD01.map((r) => ({ ...r, status: decisions[r.id] ?? r.status }))
    const releasable = stock.filter((r) => r.status === 'release').sort((a, b) => a[key].localeCompare(b[key]))
    const locked = stock.filter((r) => r.status !== 'release')
    return [...releasable.map((r, i) => ({ ...r, rank: `#${i + 1}` })), ...locked.map((r) => ({ ...r, rank: '—' }))]
  }, [rule, decisions])

  return (
    <AppShell
      active="Inventory / WMS"
      header={
        <TopBar
          title="Inventory / WMS"
          subtitle={<>Kartu stok per lot & lokasi rak · <SampleTag /></>}
          actions={
            <>
              <Button variant="secondary" onClick={() => toast(`Scan QR / Barcode: ${NOT_IN_PROTOTYPE}`)}>Scan QR / Barcode</Button>
              <Button variant="secondary" onClick={() => toast(`Mutasi Antar-Gudang: ${NOT_IN_PROTOTYPE}`)}>Mutasi Antar-Gudang</Button>
              <Button onClick={() => toast(`Pengeluaran stok mengikuti urutan ${rule.toUpperCase()}: ${rows[0]?.id} dikeluarkan lebih dulu (simulasi).`)}>+ Pengeluaran Stok</Button>
            </>
          }
        />
      }
    >
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <Card
          title="Stok per Lot · Gudang GD-01"
          style={{ flex: '3 1 560px' }}
          actions={
            <SegmentedControl
              label="Urutan pengeluaran"
              value={rule}
              onChange={setRule}
              options={[
                { value: 'fifo', label: 'FIFO · tgl masuk' },
                { value: 'fefo', label: 'FEFO · masa simpan' },
              ]}
            />
          }
        >
          <p style={{ fontSize: 13, color: 'var(--color-ink-2)' }}>{RULE_TEXT[rule]}</p>
          <div className="table-wrap">
            <table className="table" style={{ minWidth: 680 }}>
              <thead>
                <tr><th>Urutan</th><th>No. Lot</th><th>Rak</th><th>Stok (kg)</th><th>Tgl Masuk</th><th>Batas Simpan</th><th>Status</th></tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id} className={r.status !== 'release' ? 'is-locked' : i === 0 ? 'is-next' : undefined}>
                    <td style={{ fontWeight: 700 }}>{r.rank}</td>
                    <td className="strong"><Link to={`/app/lot/${r.id}`}>{r.id}</Link></td>
                    <td>{r.rack}</td>
                    <td>{r.kg}</td>
                    <td>{r.inLabel}</td>
                    <td>{r.expLabel}</td>
                    <td><StatusPill status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>Lot berstatus Hold/Reject dikunci dan tidak dapat dikeluarkan.</span>
        </Card>

        <Card title="Generator Label QR" style={{ flex: '1 1 320px' }}>
          <SelectField
            id="lbl-lot"
            label="Lot"
            gap={6}
            options={['LOT-PD-2026-0142', 'LOT-KD-2026-0019']}
            value={labelLot}
            onChange={(e) => setLabelLot(e.target.value)}
          />
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <SelectField id="lbl-size" label="Ukuran label" gap={6} options={['100 × 50 mm', '75 × 50 mm']} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <TextField id="lbl-qty" label="Jumlah" gap={6} type="number" min={1} value={qty} onChange={(e) => setQty(e.target.value)} />
            </div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-muted)' }}>Pratinjau cetak (printer thermal)</span>
          <div className="label-preview">
            <QrPreview value={labelLot} label={`Kode QR contoh untuk lot ${labelLot}`} />
            <div className="label-preview__text">
              <strong style={{ fontSize: 13 }}>{labelLot}</strong>
              <span>Padi · [Varietas A] · Kelas BP</span>
              <span>Berat bersih: 5 kg</span>
              <span>Sertifikat: [NO. SERTIFIKAT]</span>
              <span>Pindai untuk cek mutu</span>
            </div>
          </div>
          <Button size="bold" onClick={() => toast(`Simulasi: ${qty || 0} label ${labelLot} dikirim ke printer thermal.`)}>Cetak Label</Button>
          <Link to={`/lacak?lot=${labelLot}`} style={{ fontSize: 14, fontWeight: 600 }}>Lihat tujuan QR (halaman publik)</Link>
        </Card>
      </div>
    </AppShell>
  )
}
