import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  delay?: number
}

export default function ChartCard({ title, subtitle, children, delay = 0 }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className="glass-panel p-5"
    >
      <div className="mb-4">
        <h3 className="font-display text-sm font-semibold text-ink">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-ink-faint">{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  )
}
