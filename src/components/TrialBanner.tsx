import { usePrototype } from '../state/prototype'

/** Thin strip on every screen telling testers this is a prototype. */
export function TrialBanner() {
  const { reset } = usePrototype()
  return (
    <div className="trial-banner" role="note">
      <span>
        <strong>Prototipe uji coba terbatas.</strong> Semua data adalah contoh dan hanya tersimpan di browser ini.
      </span>
      <button type="button" className="trial-banner__btn" onClick={reset}>Reset data</button>
    </div>
  )
}
