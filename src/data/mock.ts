// Sample data ("Data contoh") from the design. Bracketed values are placeholders
// to be replaced by real data from the SQAS database.
import type { Decision } from './types'

export const SAMPLE_LOT_ID = 'LOT-PD-2026-0142'

/* ---------- Public portal ---------- */

export const PROCESS_STAGES = [
  { title: 'Benih Sumber', desc: 'Registrasi & dokumen asal' },
  { title: 'Produksi Lapangan', desc: 'Tanam, roguing, inspeksi' },
  { title: 'Panen & Olah', desc: 'Pengeringan, sortasi, rendemen' },
  { title: 'Uji Laboratorium', desc: 'Daya kecambah, kemurnian, KA' },
  { title: 'Gudang & Sertifikasi', desc: 'Stok FIFO/FEFO, label QR' },
  { title: 'Distribusi', desc: 'Pengiriman, retur, recall' },
]

export const STAKEHOLDER_BENEFITS = [
  { who: 'Bagi Petani', text: 'Kepastian benih yang ditanam sesuai varietas dan kelas yang tertera pada label.' },
  { who: 'Bagi Pembeli', text: 'Bukti status mutu dan nomor sertifikat dapat diperiksa sebelum membeli.' },
  { who: 'Bagi Auditor', text: 'Riwayat lot dan jejak perubahan data tersedia untuk pemeriksaan.' },
  { who: 'Bagi Produsen', text: 'Lot bermasalah bisa ditarik cepat melalui pelacakan recall.' },
]

export const PUBLIC_LOT = {
  id: SAMPLE_LOT_ID,
  status: 'release' as Decision,
  certified: true,
  facts: [
    { label: 'Komoditas / Varietas', value: 'Padi · [VARIETAS]' },
    { label: 'Kelas Benih', value: 'BP (Benih Pokok)' },
    { label: 'Produsen', value: '[NAMA PRODUSEN]' },
    { label: 'No. Sertifikat', value: '[NO. SERTIFIKAT]' },
    { label: 'Tanggal Uji', value: '[TGL]' },
    { label: 'Masa Berlaku Label', value: '[TGL]' },
  ],
  history: [
    { title: 'Benih Sumber', detail: 'Kelas BD, diterima dengan berita acara penerimaan', ref: 'Ref: BS-2026-011' },
    { title: 'Produksi Lapangan', detail: 'Ditanam di petak [KODE PETAK] · roguing & inspeksi lapangan lulus', ref: 'Ref: PTK-07' },
    { title: 'Panen & Pengeringan', detail: 'Panen per petak, dikeringkan hingga kadar air sesuai SOP', ref: 'Ref: PN-2026-0388' },
    { title: 'Sortasi & Pembentukan Lot', detail: 'Sortasi dan rendemen tercatat; lot akhir terbentuk', ref: 'Ref: LOT-PD-2026-0142' },
    { title: 'Uji Laboratorium & Keputusan Mutu', detail: 'Lulus uji mutu → keputusan: Dilepas (Release)', ref: 'Tiket lab: LAB-2026-1207' },
    { title: 'Pengemasan & Distribusi', detail: 'Dikemas, diberi label QR, dan siap didistribusikan', ref: 'Gudang: [LOKASI]' },
  ],
  lab: [
    { label: 'Daya berkecambah', value: '[–] %' },
    { label: 'Kemurnian fisik', value: '[–] %' },
    { label: 'Kadar air', value: '[–] %' },
  ],
}

/* ---------- Dashboard ---------- */

export const KPIS = [
  { label: 'Volume produksi', value: '64 ton', note: 'Bulan ini' },
  { label: 'Kelulusan uji lab', value: '91%', note: 'Dari sampel terverifikasi' },
  { label: 'Rasio reject', value: '4%', note: 'Lot ditolak / total keputusan' },
  { label: 'Stok aktif gudang', value: '38 lot', note: 'Di 3 lokasi gudang' },
]

export const MONTHLY_VOLUME: { month: string; tons: number }[] = [
  { month: 'Jun', tons: 42 },
  { month: 'Jul', tons: 55 },
  { month: 'Agu', tons: 61 },
  { month: 'Sep', tons: 48 },
  { month: 'Okt', tons: 70 },
  { month: 'Nov', tons: 64 },
]

export type ActionTone = 'reject' | 'hold' | 'info' | 'neutral'
export const ACTION_ITEMS: { count: number; text: string; tone: ActionTone }[] = [
  { count: 3, text: 'Ketidaksesuaian (NC) terbuka, CAPA belum ditutup', tone: 'reject' },
  { count: 5, text: 'Lot status Hold menunggu uji ulang (re-test)', tone: 'hold' },
  { count: 2, text: 'Versi SOP baru menunggu persetujuan Super Admin', tone: 'info' },
  { count: 4, text: 'Lot mendekati batas masa simpan (FEFO)', tone: 'neutral' },
]

export const PENDING_LOTS: { id: string; variety: string; cls: string; ticket: string; testStatus: string; recommendation: Decision }[] = [
  { id: 'LOT-PD-2026-0142', variety: '[Varietas A]', cls: 'BP', ticket: 'LAB-2026-1207', testStatus: 'Terverifikasi', recommendation: 'release' },
  { id: 'LOT-PD-2026-0145', variety: '[Varietas A]', cls: 'BR', ticket: 'LAB-2026-1211', testStatus: 'Uji ulang', recommendation: 'hold' },
  { id: 'LOT-JG-2026-0031', variety: '[Varietas B]', cls: 'BD', ticket: 'LAB-2026-1214', testStatus: 'Terverifikasi', recommendation: 'reject' },
  { id: 'LOT-KD-2026-0019', variety: '[Varietas C]', cls: 'BP', ticket: 'LAB-2026-1220', testStatus: 'Terverifikasi', recommendation: 'release' },
]

/* ---------- Lot detail ---------- */

export type GenealogyNode = { id: string; sub: string; focus?: boolean }
export type GenealogyStage = { stage: string; nodes: GenealogyNode[] }

export const LOT_DETAIL = {
  id: SAMPLE_LOT_ID,
  summary: [
    { label: 'Padi ·', value: '[Varietas A]' },
    { label: 'Kelas', value: 'BP' },
    { label: 'Berat', value: '4.820 kg' },
    { label: 'Rendemen', value: '82,4%' },
    { label: 'Asal:', value: 'Merge 2 batch panen' },
  ],
  backward: [
    { stage: 'Benih Sumber', nodes: [{ id: 'BS-2026-011', sub: 'Kelas BD · 25 kg' }] },
    { stage: 'Petak Tanam', nodes: [{ id: 'PTK-07', sub: '1,2 ha · tanam [TGL]' }, { id: 'PTK-08', sub: '0,9 ha · tanam [TGL]' }] },
    { stage: 'Panen & Kering', nodes: [{ id: 'PN-2026-0388', sub: '3,4 t GKP' }, { id: 'PN-2026-0390', sub: '2,6 t GKP' }] },
    { stage: 'Sortasi / Merge', nodes: [{ id: 'SRT-0412', sub: 'Merge 2 batch' }] },
    { stage: 'Lot Akhir', nodes: [{ id: SAMPLE_LOT_ID, sub: '4.820 kg', focus: true }] },
  ] as GenealogyStage[],
  forward: [
    { stage: 'Lot Akhir', nodes: [{ id: SAMPLE_LOT_ID, sub: '4.820 kg', focus: true }] },
    { stage: 'Pengemasan', nodes: [{ id: 'PK-0142-A', sub: '5 kg × 600' }, { id: 'PK-0142-B', sub: '10 kg × 182' }] },
    { stage: 'Gudang', nodes: [{ id: 'GD-01 · Rak B3', sub: 'Stok 2.900 kg' }] },
    { stage: 'Distribusi', nodes: [{ id: 'DO-2026-0711', sub: '[Penerima 1]' }, { id: 'DO-2026-0715', sub: '[Penerima 2]' }] },
    { stage: 'Retur / Recall', nodes: [{ id: '—', sub: 'Tidak ada' }] },
  ] as GenealogyStage[],
  labTicket: 'LAB-2026-1207',
  labResults: [
    { param: 'Daya berkecambah', result: '[–] %', standard: '≥ [STANDAR] %', pass: true },
    { param: 'Kemurnian fisik', result: '[–] %', standard: '≥ [STANDAR] %', pass: true },
    { param: 'Kadar air', result: '[–] %', standard: '≤ [STANDAR] %', pass: true },
  ],
  audit: [
    { time: '[TGL] 14:02', user: 'Kepala Lab', text: 'Memverifikasi hasil uji LAB-2026-1207' },
    { time: '[TGL] 10:15', user: 'Analis Lab', text: 'Input kadar air: [nilai lama] → [nilai baru]' },
    { time: '[TGL] 08:40', user: 'Admin Ops', text: 'Merge PN-2026-0388 + PN-2026-0390 menjadi LOT-PD-2026-0142' },
    { time: '[TGL] 16:22', user: 'Admin Ops', text: 'Input hasil sortasi & rendemen SRT-0412' },
  ],
}

/* ---------- Warehouse ---------- */

export type StockRow = {
  id: string
  rack: string
  kg: string
  inLabel: string
  inDate: string // ISO, for sorting
  expLabel: string
  expDate: string
  status: Extract<Decision, 'release' | 'hold'>
}

export const STOCK_GD01: StockRow[] = [
  { id: 'LOT-PD-2026-0128', rack: 'A1', kg: '1.150', inLabel: '02 Sep 2026', inDate: '2026-09-02', expLabel: '02 Mar 2027', expDate: '2027-03-02', status: 'release' },
  { id: 'LOT-PD-2026-0133', rack: 'A2', kg: '2.400', inLabel: '15 Sep 2026', inDate: '2026-09-15', expLabel: '15 Jan 2027', expDate: '2027-01-15', status: 'release' },
  { id: 'LOT-PD-2026-0142', rack: 'B3', kg: '2.900', inLabel: '28 Okt 2026', inDate: '2026-10-28', expLabel: '28 Apr 2027', expDate: '2027-04-28', status: 'release' },
  { id: 'LOT-KD-2026-0019', rack: 'C1', kg: '860', inLabel: '05 Okt 2026', inDate: '2026-10-05', expLabel: '05 Feb 2027', expDate: '2027-02-05', status: 'release' },
  { id: 'LOT-PD-2026-0145', rack: 'B4', kg: '3.100', inLabel: '03 Nov 2026', inDate: '2026-11-03', expLabel: '03 Mei 2027', expDate: '2027-05-03', status: 'hold' },
]

/* ---------- Lot registry (prototype) ---------- */
// Sample lots testers can look up. Lot detail / public pages are derived from
// these so each lot shows a consistent status everywhere.

type LotRecord = {
  id: string
  variety: string
  cls: string
  clsLong: string
  status: Decision
  weight: string
  yieldPct: string
  ticket: string
  lab: { result: string; pass: boolean }[]
}

export const LOTS: Record<string, LotRecord> = {
  'LOT-PD-2026-0142': {
    id: 'LOT-PD-2026-0142', variety: '[Varietas A]', cls: 'BP', clsLong: 'BP (Benih Pokok)', status: 'release',
    weight: '4.820 kg', yieldPct: '82,4%', ticket: 'LAB-2026-1207',
    lab: [{ result: '[–] %', pass: true }, { result: '[–] %', pass: true }, { result: '[–] %', pass: true }],
  },
  'LOT-PD-2026-0145': {
    id: 'LOT-PD-2026-0145', variety: '[Varietas A]', cls: 'BR', clsLong: 'BR (Benih Sebar)', status: 'hold',
    weight: '3.100 kg', yieldPct: '79,8%', ticket: 'LAB-2026-1211',
    lab: [{ result: '[–] %', pass: false }, { result: '[–] %', pass: true }, { result: '[–] %', pass: true }],
  },
  'LOT-JG-2026-0031': {
    id: 'LOT-JG-2026-0031', variety: '[Varietas B]', cls: 'BD', clsLong: 'BD (Benih Dasar)', status: 'reject',
    weight: '1.240 kg', yieldPct: '74,1%', ticket: 'LAB-2026-1214',
    lab: [{ result: '[–] %', pass: false }, { result: '[–] %', pass: false }, { result: '[–] %', pass: true }],
  },
  'LOT-KD-2026-0019': {
    id: 'LOT-KD-2026-0019', variety: '[Varietas C]', cls: 'BP', clsLong: 'BP (Benih Pokok)', status: 'release',
    weight: '860 kg', yieldPct: '81,0%', ticket: 'LAB-2026-1220',
    lab: [{ result: '[–] %', pass: true }, { result: '[–] %', pass: true }, { result: '[–] %', pass: true }],
  },
}

export const LAB_PARAMS = [
  { param: 'Daya berkecambah', standard: '≥ [STANDAR] %' },
  { param: 'Kemurnian fisik', standard: '≥ [STANDAR] %' },
  { param: 'Kadar air', standard: '≤ [STANDAR] %' },
]

/** Case/space-insensitive lookup, e.g. "lot-pd-2026-0142 " → the record. */
export function findLot(query: string | null | undefined): LotRecord | undefined {
  if (!query) return undefined
  return LOTS[query.trim().toUpperCase().replace(/\s+/g, '')]
}

export const RECOMMENDATION_TEXT: Record<Decision, string> = {
  release: 'Seluruh parameter memenuhi kriteria SOP (versi SOP [v3.1]). Tidak ada NC terbuka pada silsilah lot.',
  hold: 'Daya berkecambah di bawah standar pada uji pertama. Disarankan uji ulang (re-test) sebelum keputusan akhir.',
  reject: 'Dua parameter tidak memenuhi kriteria SOP. Lot disarankan ditolak dan ditandai di silsilah.',
}
