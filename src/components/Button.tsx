import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'outline' | 'warning'
type Size = 'md' | 'lg' | 'bold'

type StyleProps = { variant?: Variant; size?: Size; block?: boolean; className?: string }

function cx({ variant = 'primary', size = 'md', block, className }: StyleProps) {
  return ['btn', `btn--${variant}`, size !== 'md' && `btn--${size}`, block && 'btn--block', className]
    .filter(Boolean)
    .join(' ')
}

export function Button({ variant, size, block, className, type = 'button', ...rest }: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={cx({ variant, size, block, className })} {...rest} />
}

export function ButtonLink({ variant, size, block, className, ...rest }: StyleProps & LinkProps & { children: ReactNode }) {
  return <Link className={cx({ variant, size, block, className })} {...rest} />
}
