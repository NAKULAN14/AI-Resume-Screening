import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface StatCardProps {
  icon: ReactNode
  label: string
  value: string
  sublabel?: string
  accent?: string
  delay?: number
}

export default function StatCard({ icon, label, value, sublabel, accent = '#6C6CF4', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className="glass-panel-hover group p-5"
    >
      <div className="flex items-start justify-between">
        <span className="section-eyebrow">{label}</span>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl text-base transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${accent}1A`, color: accent }}
        >
          {icon}
        </div>
      </div>
      <div className="mt-3 font-display text-3xl font-semibold text-ink">{value}</div>
      {sublabel && <div className="mt-1.5 text-xs text-ink-dim">{sublabel}</div>}
    </motion.div>
  )
}
