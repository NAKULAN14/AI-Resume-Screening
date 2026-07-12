import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  actionLabel?: string
  actionTo?: string
}

export default function EmptyState({ icon, title, description, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel flex flex-col items-center justify-center gap-4 px-8 py-16 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-signal-gradient-soft text-2xl text-signal-cyan">
        {icon}
      </div>
      <div className="space-y-1.5">
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        <p className="max-w-sm text-sm text-ink-dim">{description}</p>
      </div>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn-primary mt-2">
          {actionLabel}
        </Link>
      )}
    </motion.div>
  )
}
