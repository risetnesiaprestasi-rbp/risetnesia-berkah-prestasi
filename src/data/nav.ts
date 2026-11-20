export type NavItem = { name: string; to?: string }
export type NavGroup = { label: string; items: NavItem[] }

/** Internal module navigation. Items without `to` are modules not yet built. */
export const NAV_GROUPS: NavGroup[] = [
  { label: 'Ringkasan', items: [{ name: 'Dashboard KPI', to: '/app' }] },
  { label: 'Master Data', items: [{ name: 'Varietas, Kelas & SOP' }, { name: 'Produsen, Gudang & Petak' }] },
  { label: 'Produksi', items: [{ name: 'Benih Sumber' }, { name: 'Lapangan & Roguing' }, { name: 'Panen, Sortasi & Lot' }] },
  {
    label: 'Mutu',
    items: [
      { name: 'Genealogy Lot', to: '/app/lot/LOT-PD-2026-0142' },
      { name: 'LIMS Laboratorium', to: '/app/lot/LOT-PD-2026-0142' },
      { name: 'NC & CAPA' },
      { name: 'Release / Hold / Reject', to: '/app/lot/LOT-PD-2026-0142' },
    ],
  },
  {
    label: 'Gudang & Distribusi',
    items: [
      { name: 'Inventory / WMS', to: '/app/gudang' },
      { name: 'Label QR', to: '/app/gudang' },
      { name: 'Sertifikasi' },
      { name: 'Distribusi & Recall' },
    ],
  },
  { label: 'Sistem', items: [{ name: 'Audit Trail & Versi SOP' }, { name: 'Pengguna & Hak Akses' }] },
]
