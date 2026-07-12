import { motion, AnimatePresence } from 'framer-motion'
import { LuFileText, LuX } from 'react-icons/lu'
import type { StagedFile } from '@/types'

interface FileCardProps {
  file: StagedFile
  onRemove: (id: string) => void
}

export function FileCard({ file, onRemove }: FileCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="glass-panel-hover group flex items-center gap-3 p-3"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-signal-gradient-soft text-signal-indigo">
        <LuFileText className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{file.name}</p>
        <p className="text-xs text-ink-faint">{file.sizeLabel}</p>
      </div>
      <button
        onClick={() => onRemove(file.id)}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-ink-faint opacity-0 transition-opacity hover:bg-signal-rose/10 hover:text-signal-rose group-hover:opacity-100"
        aria-label={`Remove ${file.name}`}
      >
        <LuX className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

export function FileCardList({ files, onRemove }: { files: StagedFile[]; onRemove: (id: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      <AnimatePresence>
        {files.map((f) => (
          <FileCard key={f.id} file={f} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  )
}
