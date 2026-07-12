import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { LuCloudUpload } from 'react-icons/lu'
import toast from 'react-hot-toast'

interface DropZoneProps {
  multiple?: boolean
  onFiles: (files: File[]) => void
  title: string
  subtitle: string
  accent?: 'indigo' | 'cyan'
}

export default function DropZone({ multiple = false, onFiles, title, subtitle, accent = 'indigo' }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const validateAndEmit = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return
      const files = Array.from(fileList)
      const pdfs = files.filter((f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))
      const rejected = files.length - pdfs.length
      if (rejected > 0) {
        toast.error(`${rejected} file${rejected > 1 ? 's were' : ' was'} skipped — only PDF files are accepted.`)
      }
      if (pdfs.length > 0) onFiles(pdfs)
    },
    [onFiles]
  )

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    validateAndEmit(e.dataTransfer.files)
  }

  const gradient =
    accent === 'indigo'
      ? 'from-signal-indigo/20 to-transparent'
      : 'from-signal-cyan/20 to-transparent'

  return (
    <motion.div
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      whileHover={{ scale: 1.005 }}
      className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-xl2 border-2 border-dashed px-6 py-12 text-center transition-colors duration-200 ${
        isDragging ? 'border-signal-cyan bg-signal-cyan/[0.06]' : 'border-line-med bg-white/[0.02] hover:bg-white/[0.035]'
      }`}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradient}`} />
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          validateAndEmit(e.target.files)
          e.target.value = ''
        }}
      />
      <motion.div
        animate={{ y: isDragging ? -4 : 0 }}
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-signal-gradient-soft text-signal-cyan"
      >
        <LuCloudUpload className="h-6 w-6" />
      </motion.div>
      <div className="relative z-10">
        <p className="font-display text-sm font-semibold text-ink">{title}</p>
        <p className="mt-1 text-xs text-ink-dim">{subtitle}</p>
      </div>
      <span className="relative z-10 chip">PDF only{multiple ? ' · multiple allowed' : ''}</span>
    </motion.div>
  )
}
