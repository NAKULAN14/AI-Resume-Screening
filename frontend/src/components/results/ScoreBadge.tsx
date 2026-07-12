import { scoreTier, tierColor, tierLabel } from '@/utils/format'

export default function ScoreBadge({ value, showLabel = false }: { value: number; showLabel?: boolean }) {
  const tier = scoreTier(value)
  const color = tierColor[tier]
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs font-semibold"
      style={{ background: `${color}1A`, color }}
    >
      {value.toFixed(1)}
      {showLabel && <span className="font-body font-normal opacity-80">· {tierLabel[tier]}</span>}
    </span>
  )
}
