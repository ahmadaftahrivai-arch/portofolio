import { ImageIcon } from '../icons'

interface PlaceholderProps {
  label: string
  hint?: string
  className?: string
}

/**
 * Honest stand-in for missing real content. Renders a dashed box naming the
 * exact file/data path to fill in, instead of a stock photo or invented data.
 */
export function Placeholder({ label, hint, className = '' }: PlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center text-ink-500 ${className}`}
    >
      <ImageIcon className="opacity-50" />
      <p className="text-xs font-medium text-ink-300">{label}</p>
      {hint && <p className="text-[11px] leading-relaxed text-ink-500">{hint}</p>}
    </div>
  )
}
