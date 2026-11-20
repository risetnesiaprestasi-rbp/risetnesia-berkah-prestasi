import { Link } from 'react-router-dom'
import { AppShell, TopBar } from '../../components/AppShell'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { SelectField } from '../../components/Field'
import { SampleTag, StatusPill } from '../../components/StatusPill'
import { ACTION_ITEMS, KPIS, MONTHLY_VOLUME, PENDING_LOTS } from '../../data/mock'
import { NOT_IN_PROTOTYPE, usePrototype } from '../../state/prototype'
import './app.css'

const BAR_MAX_PX = 170

export default function Dashboard() {
  const { decisions, toast } = usePrototype()
  const maxTons = Math.max(...MONTHLY_VOLUME.map((m) => m.tons))

  return (
    <AppShell
      active="Dashboard KPI"
      header={
        <TopBar
          title="Dashboard KPI"
          subtitle={<>Produksi, mutu & stok · <SampleTag /></>}
          actions={
            <>
              <SelectField id="per" label="Periode" hideLabel options={['Bulan ini', 'Kuartal ini', 'Tahun ini']} />
              <Button onClick={() => toast(`Registrasi Benih Sumber: ${NOT_IN_PROTOTYPE}`)}>+ Registrasi Benih Sumber</Button>
            </>
          }
        />
      }
    >
      <div className="kpi-grid">
        {KPIS.map((k) => (
          <div key={k.label} className="card kpi">
            <span className="kpi__label">{k.label}</span>
            <span className="kpi__value">{k.value}</span>
            <span className="kpi__note">{k.note}</span>
          </div>
        ))}
      </div>

      <div className="row" style={{ alignItems: 'stretch' }}>
        <Card title="Volume Produksi per Bulan (ton)" titleSize="sm" style={{ flex: '2 1 440px' }}>
          <div role="img" aria-label="Grafik batang volume produksi per bulan, data contoh" className="bars">
            {MONTHLY_VOLUME.map((m) => (
              <div key={m.month} className="bars__col">
                <span className="bars__value">{m.tons}</span>
                <div className="bars__bar" style={{ height: Math.round((m.tons / maxTons) * BAR_MAX_PX) }} />
              </div>
            ))}
          </div>
          <div className="bars__axis" aria-hidden="true">
            {MONTHLY_VOLUME.map((m) => <span key={m.month}>{m.month}</span>)}
          </div>
        </Card>

        <Card title="Perlu Tindakan" titleSize="sm" style={{ flex: '1 1 300px', gap: 14 }}>
          {ACTION_ITEMS.map((a) => (
            <div key={a.text} className={`action action--${a.tone}`}>
              <strong className="action__count">{a.count}</strong>
              <span className="action__text">{a.text}</span>
            </div>
          ))}
        </Card>
      </div>

      <Card title="Lot Menunggu Keputusan Mutu" titleSize="sm" actions={<button type="button" className="link-btn" style={{ fontWeight: 600, padding: 0 }} onClick={() => toast(`Daftar semua lot: ${NOT_IN_PROTOTYPE}`)}>Lihat semua lot</button>}>
        <div className="table-wrap">
          <table className="table" style={{ minWidth: 800 }}>
            <thead>
              <tr>
                <th>No. Lot</th>
                <th>Varietas</th>
                <th>Kelas</th>
                <th>Tiket Lab</th>
                <th>Status Uji</th>
                <th>Rekomendasi Sistem</th>
                <th>Keputusan</th>
                <th><span className="sr-only">Aksi</span></th>
              </tr>
            </thead>
            <tbody>
              {PENDING_LOTS.map((l) => (
                <tr key={l.id}>
                  <td className="strong">{l.id}</td>
                  <td>{l.variety}</td>
                  <td>{l.cls}</td>
                  <td>{l.ticket}</td>
                  <td>{l.testStatus}</td>
                  <td><StatusPill status={l.recommendation} /></td>
                  <td>{decisions[l.id] ? <StatusPill status={decisions[l.id]} /> : <span style={{ color: 'var(--color-muted)' }}>Belum</span>}</td>
                  <td style={{ textAlign: 'right' }}>
                    <Link to={`/app/lot/${l.id}`} style={{ fontWeight: 600 }} aria-label={`Buka ${l.id}`}>Buka</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  )
}
