import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Logo } from '../../components/Logo'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { TextAreaField, TextField } from '../../components/Field'
import { CheckIcon } from '../../components/Icons'
import { Pill, SampleTag, StatusPill } from '../../components/StatusPill'
import { LAB_PARAMS, LOTS, PUBLIC_LOT, findLot } from '../../data/mock'
import type { Decision } from '../../data/types'
import { usePrototype } from '../../state/prototype'
import './public.css'

const DECISION_STEP: Record<Decision, string> = {
  release: 'Lulus uji mutu → keputusan: Dilepas (Release)',
  hold: 'Menunggu uji ulang → keputusan: Ditahan (Hold)',
  reject: 'Tidak lulus uji mutu → keputusan: Ditolak (Reject)',
}

/** Public result page for a scanned / typed lot number. */
export default function LotLookup() {
  const [params, setParams] = useSearchParams()
  const lotParam = params.get('lot') ?? ''
  const scanned = params.get('scan') === '1'
  const [query, setQuery] = useState(lotParam)
  const { decisions, report, toast } = usePrototype()
  const [reportOpen, setReportOpen] = useState(false)

  useEffect(() => {
    setQuery(lotParam)
  }, [lotParam])

  const record = findLot(lotParam)
  const status: Decision | undefined = record ? decisions[record.id] ?? record.status : undefined

  const search = (e: FormEvent) => {
    e.preventDefault()
    setParams(query.trim() ? { lot: query.trim() } : {})
  }

  const submitReport = (e: FormEvent) => {
    e.preventDefault()
    report()
    setReportOpen(false)
    toast('Terima kasih. Laporan Anda diteruskan ke pengelola mutu (simulasi).')
  }

  return (
    <div className="public">
      <header className="public-header">
        <div className="container public-header__inner">
          <Logo to="/" size={36} label="SQAS · Lacak Lot" />
          <form onSubmit={search} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: '0 1 420px' }}>
            <div style={{ flex: '1 1 200px' }}>
              <TextField id="q" label="Nomor lot" hideLabel size="md" placeholder="Contoh: LOT-PD-2026-0142" value={query} onChange={(e) => setQuery(e.target.value)} style={{ height: 44 }} />
            </div>
            <Button type="submit" style={{ padding: '0 18px' }}>Cari</Button>
          </form>
        </div>
      </header>

      <main className="container" style={{ padding: '40px 24px 64px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, fontSize: 13, color: 'var(--color-muted)' }}>
          <SampleTag />
          <span>{scanned ? 'Simulasi: hasil pemindaian QR pada label kemasan' : 'Tampilan hasil pencarian nomor lot'}</span>
        </div>

        {!record || !status ? (
          <Card large className="empty-state">
            <h1 className="display" style={{ fontSize: 28 }}>{lotParam ? 'Lot tidak ditemukan' : 'Masukkan nomor lot'}</h1>
            <p className="lead" style={{ maxWidth: 520 }}>
              {lotParam
                ? <>Nomor <strong>{lotParam}</strong> tidak terdaftar atau belum dinyatakan publik. Periksa kembali nomor pada label kemasan.</>
                : 'Ketik nomor lot yang tertera pada label kemasan, atau pindai kode QR-nya.'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 8, fontSize: 13 }}>
              <span style={{ color: 'var(--color-muted)' }}>Coba nomor contoh:</span>
              {Object.keys(LOTS).map((id) => (
                <button key={id} type="button" className="chip-btn" onClick={() => setParams({ lot: id })}>{id}</button>
              ))}
            </div>
          </Card>
        ) : (
          <>
            <Card large className="lot-hero">
              <div style={{ flex: '2 1 460px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <span className="eyebrow eyebrow--muted">Nomor Lot</span>
                <h1 className="display" style={{ fontSize: 40, lineHeight: 1.1, overflowWrap: 'anywhere' }}>{record.id}</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {status === 'release' ? (
                    <Pill tone="release" size="lg"><CheckIcon />DILEPAS (RELEASE)</Pill>
                  ) : (
                    <StatusPill status={status} long size="lg" />
                  )}
                  {status === 'release' && <Pill tone="neutral" size="lg">Bersertifikat</Pill>}
                </div>
                {status !== 'release' && (
                  <p style={{ fontSize: 14, color: 'var(--color-ink-2)', maxWidth: 520 }}>
                    {status === 'hold'
                      ? 'Lot ini sedang ditahan untuk pemeriksaan lanjutan dan belum boleh diedarkan.'
                      : 'Lot ini tidak memenuhi standar mutu dan tidak boleh diedarkan sebagai benih bersertifikat.'}
                  </p>
                )}
              </div>
              <dl className="fact-grid">
                {[
                  { label: 'Komoditas / Varietas', value: `Padi · ${record.variety}` },
                  { label: 'Kelas Benih', value: record.clsLong },
                  { label: 'Produsen', value: '[NAMA PRODUSEN]' },
                  { label: 'No. Sertifikat', value: status === 'release' ? '[NO. SERTIFIKAT]' : '—' },
                  { label: 'Tanggal Uji', value: '[TGL]' },
                  { label: 'Masa Berlaku Label', value: status === 'release' ? '[TGL]' : '—' },
                ].map((f) => (
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
                  {PUBLIC_LOT.history.map((s, i) => {
                    const step =
                      i === 3 ? { ...s, ref: `Ref: ${record.id}` }
                      : i === 4 ? { ...s, detail: DECISION_STEP[status], ref: `Tiket lab: ${record.ticket}` }
                      : s
                    if (i === 5 && status !== 'release') return null
                    return (
                      <li key={s.title} className="timeline__item">
                        <div className="timeline__rail">
                          <span className="timeline__dot">{i + 1}</span>
                          <span className="timeline__line" />
                        </div>
                        <div className="timeline__body">
                          <strong style={{ fontSize: 16 }}>{step.title}</strong>
                          <span style={{ fontSize: 14, color: 'var(--color-ink-2)' }}>{step.detail}</span>
                          <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>{step.ref}</span>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </Card>

              <aside style={{ flex: '1 1 300px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <Card large>
                  <h2 className="display" style={{ fontSize: 20 }}>Ringkasan Uji Lab</h2>
                  {LAB_PARAMS.map((p, i) => (
                    <div key={p.param} className="kv-row">
                      <span style={{ color: 'var(--color-ink-2)' }}>{p.param}</span>
                      <strong className={record.lab[i].pass ? undefined : 'fail'}>
                        {record.lab[i].result}{record.lab[i].pass ? '' : ' · di bawah standar'}
                      </strong>
                    </div>
                  ))}
                  <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>Diverifikasi kepala laboratorium</span>
                </Card>
                <Card tone="warning">
                  <strong style={{ fontSize: 16, color: 'var(--color-hold-fg)' }}>Menemukan ketidaksesuaian?</strong>
                  {reportOpen ? (
                    <form onSubmit={submitReport} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <TextAreaField id="lapor-isi" label="Apa yang tidak sesuai?" rows={3} required gap={6} />
                      <TextField id="lapor-kontak" label="Kontak (opsional)" placeholder="No. HP atau email" gap={6} />
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        <Button type="submit">Kirim Laporan</Button>
                        <Button variant="secondary" onClick={() => setReportOpen(false)}>Batal</Button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--color-hold-text)' }}>
                        Laporkan jika label atau kondisi benih tidak sesuai dengan informasi di halaman ini.
                      </p>
                      <Button variant="warning" style={{ alignSelf: 'flex-start' }} onClick={() => setReportOpen(true)}>Laporkan</Button>
                    </>
                  )}
                </Card>
              </aside>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
