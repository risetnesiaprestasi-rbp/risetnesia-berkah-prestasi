import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../../components/Logo'
import { Button, ButtonLink } from '../../components/Button'
import { TextField } from '../../components/Field'
import { QrScanIcon } from '../../components/Icons'
import { LOTS, PROCESS_STAGES, STAKEHOLDER_BENEFITS } from '../../data/mock'
import { usePrototype } from '../../state/prototype'
import './public.css'

export default function Home() {
  const navigate = useNavigate()
  const [lot, setLot] = useState('')
  const { cookieOk, acceptCookies } = usePrototype()

  const search = (e: FormEvent) => {
    e.preventDefault()
    navigate(`/lacak${lot.trim() ? `?lot=${encodeURIComponent(lot.trim())}` : ''}`)
  }

  return (
    <div className="public">
      <header className="public-header">
        <div className="container-wide public-header__inner" style={{ gap: 16 }}>
          <Logo size={40} fontSize={20} subtitle="Seed Quality Assurance System" />
          <nav aria-label="Navigasi utama" className="public-nav">
            <a href="#tentang">Tentang SQAS</a>
            <a href="#urgensi">Urgensi Mutu Benih</a>
            <a href="#lacak">Lacak Lot</a>
            <a href="#about">About Us</a>
            <ButtonLink to="/login" style={{ padding: '0 20px', fontSize: 15 }}>Masuk Staf</ButtonLink>
          </nav>
        </div>
      </header>

      <section id="lacak" className="hero">
        <div className="container-wide hero__inner">
          <div className="hero__copy">
            <span className="hero__eyebrow">Ketertelusuran Benih Terbuka</span>
            <h1 className="hero__title">Cek asal-usul dan status mutu setiap lot benih.</h1>
            <p className="hero__lead">
              Pindai QR atau ketik nomor lot pada label kemasan. Riwayat lot — dari benih sumber, lahan, panen, uji lab, hingga
              distribusi — ditampilkan langsung dari database SQAS.
            </p>
          </div>
          <form className="lookup-card" onSubmit={search}>
            <h2 className="display" style={{ fontSize: 24 }}>Lacak Lot Benih</h2>
            <TextField
              id="lot-input"
              label="Nomor lot (tertera di label)"
              size="lg"
              placeholder="Contoh: LOT-PD-2026-0142"
              value={lot}
              onChange={(e) => setLot(e.target.value)}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Button type="submit" size="lg" style={{ flex: '1 1 160px' }}>Cari Lot</Button>
              <ButtonLink to="/lacak?lot=LOT-PD-2026-0142&scan=1" variant="outline" size="lg" style={{ flex: '1 1 160px' }}>
                <QrScanIcon />
                Pindai QR
              </ButtonLink>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, fontSize: 13 }}>
              <span style={{ color: 'var(--color-muted)' }}>Coba nomor contoh:</span>
              {Object.keys(LOTS).slice(0, 3).map((id) => (
                <button key={id} type="button" className="chip-btn" onClick={() => setLot(id)}>{id}</button>
              ))}
            </div>
            <p style={{ fontSize: 13, color: 'var(--color-muted)' }}>
              Tanpa login. Hanya menampilkan data yang dinyatakan publik oleh pengelola.
            </p>
          </form>
        </div>
      </section>

      <section id="tentang" className="container-wide" style={{ padding: '72px 24px 24px', display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 720 }}>
          <span className="eyebrow">Tentang SQAS</span>
          <h2 className="section-title">Satu sistem untuk penjaminan mutu benih dari hulu ke hilir</h2>
          <p className="lead">
            SQAS mencatat setiap tahap produksi benih dan menautkannya ke identitas lot, sehingga keputusan mutu dan riwayat lot
            dapat diperiksa kapan saja.
          </p>
        </div>
        <ol className="stage-grid">
          {PROCESS_STAGES.map((s, i) => (
            <li key={s.title} className="stage-card">
              <span className="stage-card__num">{String(i + 1).padStart(2, '0')}</span>
              <strong style={{ fontSize: 16 }}>{s.title}</strong>
              <span style={{ fontSize: 14, color: 'var(--color-muted)' }}>{s.desc}</span>
            </li>
          ))}
        </ol>
      </section>

      <section id="urgensi" className="container-wide" style={{ padding: '56px 24px', display: 'flex', flexWrap: 'wrap', gap: 32 }}>
        <div style={{ flex: '1 1 340px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="eyebrow">Urgensi Mutu Benih</span>
          <h2 className="section-title">Mengapa penjaminan mutu benih penting?</h2>
        </div>
        <div className="benefit-grid">
          {STAKEHOLDER_BENEFITS.map((b) => (
            <div key={b.who} className="card" style={{ gap: 10 }}>
              <strong style={{ fontSize: 17 }}>{b.who}</strong>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--color-ink-2)' }}>{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="about">
        <div className="container-wide" style={{ padding: '56px 24px', display: 'flex', flexWrap: 'wrap', gap: 32 }}>
          <div className="about__col">
            <h2 className="display" style={{ fontSize: 28 }}>About Us</h2>
            <p>[PROFIL SINGKAT PENGELOLA / PENGEMBANG SQAS]</p>
          </div>
          <div className="about__col">
            <h2 className="display" style={{ fontSize: 28 }}>Informasi Umum</h2>
            <p>[PENGUMUMAN / INFORMASI UNTUK PEMANGKU KEPENTINGAN PERBENIHAN]</p>
          </div>
        </div>
      </section>

      <footer className="public-footer">
        <div className="container-wide public-footer__inner">
          <span>© 2026 SQAS — [NAMA INSTANSI]</span>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <a href="#about">About Us</a>
            <a href="#cookies">Kebijakan Cookies</a>
            <a href="#lacak">Lacak Lot</a>
          </div>
        </div>
        {!cookieOk && (
          <div id="cookies" role="region" aria-label="Pemberitahuan cookies" className="container-wide" style={{ padding: '0 24px 24px' }}>
            <div className="cookie-banner">
              <p style={{ fontSize: 14, color: 'var(--color-ink-2)', flex: '1 1 400px' }}>
                Situs ini memakai cookies yang diperlukan agar portal berfungsi. <a href="#cookies">Baca Kebijakan Cookies</a>.
              </p>
              <Button onClick={acceptCookies} style={{ padding: '0 20px' }}>Saya Mengerti</Button>
            </div>
          </div>
        )}
      </footer>
    </div>
  )
}
