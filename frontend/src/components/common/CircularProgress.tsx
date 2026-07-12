import { motion } from 'framer-motion'
import { scoreTier, tierColor } from '@/utils/format'

interface CircularProgressProps {
  value: number // 0-100
  size?: number
  strokeWidth?: number
  label?: string
}

export default function CircularProgress({ value, size = 96, strokeWidth = 8, label }: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(100, value))
  const offset = circumference - (clamped / 100) * circumference
  const color = tierColor[scoreTier(clamped)]

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-display text-xl font-semibold text-ink">{clamped.toFixed(0)}</span>
        {label && <span className="text-[10px] uppercase tracking-wide text-ink-faint">{label}</span>}
      </div>
    </div>
  )
}
