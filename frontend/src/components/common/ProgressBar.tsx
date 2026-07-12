import { motion } from 'framer-motion'
import { scoreTier, tierColor } from '@/utils/format'

interface ProgressBarProps {
  label: string
  value: number
  delay?: number
}

export default function ProgressBar({ label, value, delay = 0 }: ProgressBarProps) {
  const color = tierColor[scoreTier(value)]
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-ink-dim">{label}</span>
        <span className="font-mono font-medium text-ink">{value.toFixed(0)}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
