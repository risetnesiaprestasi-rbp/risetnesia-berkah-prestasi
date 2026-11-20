import type { HTMLAttributes, ReactNode } from 'react'

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: 'section' | 'div' | 'aside'
  tone?: 'default' | 'emphasis' | 'warning'
  large?: boolean
  title?: ReactNode
  titleSize?: 'sm' | 'md'
  /** Rendered on the right of the title row. */
  actions?: ReactNode
}

export function Card({ as: Tag = 'section', tone = 'default', large, title, titleSize = 'md', actions, className, children, ...rest }: CardProps) {
  const cls = ['card', large && 'card--lg', tone !== 'default' && `card--${tone}`, className].filter(Boolean).join(' ')
  const heading = title ? (
    <h2 className={titleSize === 'sm' ? 'card__title card__title--sm' : 'card__title'}>{title}</h2>
  ) : null
  return (
    <Tag className={cls} {...rest}>
      {heading && actions ? (
        <div className="card__head">
          {heading}
          {actions}
        </div>
      ) : (
        heading
      )}
      {children}
    </Tag>
  )
}
