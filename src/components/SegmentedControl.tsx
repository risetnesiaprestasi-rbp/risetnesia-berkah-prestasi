type Option<T extends string> = { value: T; label: string }

export function SegmentedControl<T extends string>({ label, options, value, onChange }: {
  label: string
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div role="group" aria-label={label} className="seg">
      {options.map((o) => (
        <button key={o.value} type="button" className="seg__btn" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}
