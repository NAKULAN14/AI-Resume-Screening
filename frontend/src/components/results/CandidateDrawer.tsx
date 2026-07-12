import { AnimatePresence, motion } from 'framer-motion'
import { LuX, LuMail, LuPhone, LuGraduationCap, LuBriefcase, LuCalendar, LuFileText } from 'react-icons/lu'
import toast from 'react-hot-toast'
import type { RankedCandidate } from '@/types'
import { initials } from '@/utils/format'
import CircularProgress from '@/components/common/CircularProgress'
import ProgressBar from '@/components/common/ProgressBar'
import SkillTag from '@/components/common/SkillTag'

interface CandidateDrawerProps {
  candidate: RankedCandidate | null
  onClose: () => void
}

export default function CandidateDrawer({ candidate, onClose }: CandidateDrawerProps) {
  return (
    <AnimatePresence>
      {candidate && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-line-soft bg-base-900 shadow-glass"
          >
            <div className="flex items-center justify-between border-b border-line-soft px-6 py-5">
              <span className="section-eyebrow">Candidate profile</span>
              <button onClick={onClose} className="btn-ghost h-8 w-8 p-0" aria-label="Close">
                <LuX className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-signal-gradient-soft font-display text-lg font-semibold text-signal-cyan">
                  {initials(candidate.name)}
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink">{candidate.name}</h2>
                  <p className="mt-1 text-xs text-ink-faint">
                    Rank #{candidate.rank} of session · {candidate.resume_path}
                  </p>
                </div>
                <CircularProgress value={candidate.final_score} label="Final score" size={110} />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <InfoRow icon={<LuMail />} label="Email" value={candidate.email ?? 'Not found'} />
                <InfoRow icon={<LuPhone />} label="Phone" value={candidate.phone ?? 'Not found'} />
                <InfoRow icon={<LuGraduationCap />} label="Education" value={candidate.education} />
                <InfoRow icon={<LuBriefcase />} label="Experience" value={candidate.experience} />
                <InfoRow icon={<LuCalendar />} label="Batch / Year" value={candidate.batch} />
                <InfoRow icon={<LuFileText />} label="Source file" value={candidate.resume_path} />
              </div>

              <div className="mt-7 space-y-4 rounded-xl2 border border-line-soft bg-white/[0.02] p-5">
                <h3 className="section-eyebrow">Score breakdown</h3>
                <ProgressBar label="Similarity (30%)" value={candidate.similarity_score} delay={0} />
                <ProgressBar label="Skill match (35%)" value={candidate.skill_score} delay={0.05} />
                <ProgressBar label="Education (5%)" value={candidate.education_score} delay={0.1} />
                <ProgressBar label="Experience (15%)" value={candidate.experience_score} delay={0.15} />
                <ProgressBar label="Eligibility (15%)" value={candidate.eligibility_score} delay={0.2} />
              </div>

              <div className="mt-7">
                <h3 className="section-eyebrow mb-3">Matched skills ({candidate.skills.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.length > 0 ? (
                    candidate.skills.map((s) => <SkillTag key={s} skill={s} matched />)
                  ) : (
                    <p className="text-sm text-ink-faint">No known skills detected in this resume.</p>
                  )}
                </div>
              </div>

              <div className="mt-7 flex gap-3">
                <button
                  onClick={() => {
                    if (!candidate.resume_url) {
                      toast.error("Resume not available")
                      return
                    }

                    window.open(candidate.resume_url, "_blank")
                  }}
                  className="btn-secondary flex-1 text-xs"
                >
                  Download Resume
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(candidate.email ?? '')
                    toast.success('Email copied to clipboard')
                  }}
                  className="btn-primary flex-1 text-xs"
                >
                  Copy email
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line-soft bg-white/[0.02] p-3">
      <div className="flex items-center gap-1.5 text-ink-faint">
        <span className="text-sm">{icon}</span>
        <span className="text-[10px] font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-1.5 truncate text-sm text-ink" title={value}>
        {value}
      </p>
    </div>
  )
}
