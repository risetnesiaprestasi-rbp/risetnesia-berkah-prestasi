type IconProps = { size?: number; color?: string; strokeWidth?: number }

export function SproutIcon({ size = 22, color = '#FFFFFF', strokeWidth = 2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21V11" />
      <path d="M12 11c0-4 3-7 7-7 0 4-3 7-7 7z" />
      <path d="M12 14c0-3-2.5-5.5-6-5.5 0 3.5 2.5 5.5 6 5.5z" />
    </svg>
  )
}

export function QrScanIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <path d="M3 7V4h3M21 7V4h-3M3 17v3h3M21 17v3h-3" />
      <rect x="7" y="7" width="4" height="4" />
      <rect x="13" y="13" width="4" height="4" />
      <path d="M13 7h4v4M7 13v4h4" />
    </svg>
  )
}

export function CheckIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden="true">
      <path d="M5 12l5 5 9-10" />
    </svg>
  )
}

export function ArrowRightIcon() {
  return (
    <svg width="36" height="24" viewBox="0 0 36 24" fill="none" stroke="var(--color-arrow)" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <path d="M4 12h26M24 6l6 6-6 6" />
    </svg>
  )
}
