import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

type Size = 'sm' | 'md' | 'lg'
const inputCls = (size: Size) => `input${size !== 'sm' ? ` input--${size}` : ''}`

type Labelled = { id: string; label: ReactNode; hideLabel?: boolean; gap?: number }

function Wrap({ id, label, hideLabel, gap, children }: Labelled & { children: ReactNode }) {
  return (
    <div className="field" style={gap ? { gap } : undefined}>
      <label htmlFor={id} className={hideLabel ? 'sr-only' : 'field__label'}>{label}</label>
      {children}
    </div>
  )
}

export function TextField({ id, label, hideLabel, gap, size = 'sm', ...rest }: Labelled & { size?: Size } & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>) {
  return (
    <Wrap id={id} label={label} hideLabel={hideLabel} gap={gap}>
      <input id={id} className={inputCls(size)} {...rest} />
    </Wrap>
  )
}

export function SelectField({ id, label, hideLabel, gap, options, ...rest }: Labelled & { options: string[] } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrap id={id} label={label} hideLabel={hideLabel} gap={gap}>
      <select id={id} className="input" {...rest}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </Wrap>
  )
}

export function TextAreaField({ id, label, gap, ...rest }: Labelled & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrap id={id} label={label} gap={gap}>
      <textarea id={id} className="input" {...rest} />
    </Wrap>
  )
}
