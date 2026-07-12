import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { LuFileCheck2, LuRotateCcw, LuTriangleAlert, LuZap } from 'react-icons/lu'
import DropZone from '@/components/upload/DropZone'
import { FileCardList } from '@/components/upload/FileCard'
import ProcessingAnimation from '@/components/upload/ProcessingAnimation'
import Confetti from '@/components/upload/Confetti'
import { rankCandidates } from '@/services/rankingService'
import { useAppData } from '@/context/AppDataContext'
import { genId, formatBytes } from '@/utils/format'
import type { StagedFile } from '@/types'

type Phase = 'idle' | 'processing' | 'error'

export default function Upload() {
  const [jdFile, setJdFile] = useState<StagedFile | null>(null)
  const [resumeFiles, setResumeFiles] = useState<StagedFile[]>([])
  const [phase, setPhase] = useState<Phase>('idle')
  const [activeStep, setActiveStep] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const { addSession } = useAppData()
  const navigate = useNavigate()

  function toStaged(file: File): StagedFile {
    return { id: genId(), file, name: file.name, sizeLabel: formatBytes(file.size) }
  }

  function handleJdFiles(files: File[]) {
    setJdFile(toStaged(files[0]))
  }

  function handleResumeFiles(files: File[]) {
    setResumeFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name))
      const additions = files.filter((f) => !existingNames.has(f.name)).map(toStaged)
      return [...prev, ...additions]
    })
  }

  function removeResume(id: string) {
    setResumeFiles((prev) => prev.filter((f) => f.id !== id))
  }

  async function handleRank() {
    if (!jdFile) {
      toast.error('Upload a job description PDF first.')
      return
    }
    if (resumeFiles.length === 0) {
      toast.error('Upload at least one resume PDF.')
      return
    }

    setPhase('processing')
    setActiveStep(0)
    setErrorMsg('')

    const stepTimer = setInterval(() => {
      setActiveStep((s) => (s < 3 ? s + 1 : s))
    }, 900)

    try {
      const response = await rankCandidates(jdFile.file, resumeFiles.map((f) => f.file))
      clearInterval(stepTimer)
      setActiveStep(4)
      addSession(jdFile.name, resumeFiles.length, response)
      setShowConfetti(true)
      toast.success(`Ranked ${response.total_candidates} candidate${response.total_candidates !== 1 ? 's' : ''}!`)
      setTimeout(() => {
        setShowConfetti(false)
        navigate('/candidates')
      }, 1400)
    } catch (err) {
      clearInterval(stepTimer)
      setPhase('error')
      setErrorMsg(err instanceof Error ? err.message : 'Ranking failed.')
    }
  }

  function reset() {
    setPhase('idle')
    setErrorMsg('')
  }

  if (phase === 'processing') {
    return (
      <div className="mx-auto max-w-lg">
        <ProcessingAnimation activeStep={activeStep} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showConfetti && <Confetti />}

      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Upload &amp; Rank</h2>
        <p className="text-sm text-ink-dim">Upload one job description and every resume you want scored against it.</p>
      </div>

      {phase === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel flex items-center gap-4 border-signal-rose/30 bg-signal-rose/[0.06] p-4"
        >
          <LuTriangleAlert className="h-5 w-5 shrink-0 text-signal-rose" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink">Ranking failed</p>
            <p className="text-xs text-ink-dim">{errorMsg}</p>
          </div>
          <button onClick={reset} className="btn-secondary shrink-0 px-3.5 py-2 text-xs">
            <LuRotateCcw className="h-3.5 w-3.5" />
            Retry
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ink">1. Job description</h3>
            <span className="chip">Required · 1 file</span>
          </div>
          {jdFile ? (
            <FileCardList files={[jdFile]} onRemove={() => setJdFile(null)} />
          ) : (
            <DropZone
              multiple={false}
              onFiles={handleJdFiles}
              title="Drop your job description here"
              subtitle="or click to browse — one PDF only"
              accent="indigo"
            />
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ink">2. Resumes</h3>
            <span className="chip">{resumeFiles.length} uploaded</span>
          </div>
          <DropZone
            multiple
            onFiles={handleResumeFiles}
            title="Drop resumes here"
            subtitle="or click to browse — multiple PDFs allowed"
            accent="cyan"
          />
          {resumeFiles.length > 0 && (
            <div className="max-h-72 overflow-y-auto pr-1">
              <FileCardList files={resumeFiles} onRemove={removeResume} />
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {jdFile && resumeFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="glass-panel flex flex-col items-center justify-between gap-4 p-5 sm:flex-row"
          >
            <div className="flex items-center gap-3">
              <LuFileCheck2 className="h-5 w-5 text-signal-mint" />
              <p className="text-sm text-ink-dim">
                Ready to screen <span className="font-medium text-ink">{resumeFiles.length}</span> resume
                {resumeFiles.length !== 1 ? 's' : ''} against{' '}
                <span className="font-medium text-ink">{jdFile.name}</span>
              </p>
            </div>
            <button onClick={handleRank} className="btn-primary w-full sm:w-auto">
              <LuZap className="h-4 w-4" />
              Rank Candidates
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
