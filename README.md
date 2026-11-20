# SQAS — Seed Quality Assurance System (web UI)

React + TypeScript + Vite implementation of the "SQAS — Draft UI Web" design.

```bash
npm install
npm run dev
```

## Routes

| Path | Screen |
| --- | --- |
| `/` | Public portal — home (lot search, about, why seed quality matters, cookie notice) |
| `/lacak?lot=…` | Public QR / lot lookup result |
| `/login` | Internal login with role picker (Super Admin / Admin) |
| `/app` | Internal KPI dashboard |
| `/app/lot/:lotId` | Lot detail: genealogy (backward/forward), LIMS results, release decision, audit trail |
| `/app/gudang` | Warehouse (WMS) stock with FIFO/FEFO ordering + QR label generator |

## Structure

- `src/styles/tokens.css` — design tokens (colors, type, radii) from the design
- `src/styles/components.css` — shared component styles (buttons, fields, cards, pills, tables, app shell)
- `src/components/` — `AppShell`/`TopBar`, `Logo`, `Button`/`ButtonLink`, `Card`, `TextField`/`SelectField`/`TextAreaField`, `StatusPill`, `SegmentedControl`, `QrPreview`
- `src/data/` — sample data (`mock.ts`) and module navigation (`nav.ts`)
- `src/pages/` — one file per screen

All data is sample data ("Data contoh"); bracketed values such as `[NAMA INSTANSI]` are placeholders. Auth, data fetching and the QR encoder are stubbed (see `TODO`s).
