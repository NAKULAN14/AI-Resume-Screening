import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { LuChevronUp, LuChevronDown, LuEye, LuDownload, LuInbox } from 'react-icons/lu'
import toast from 'react-hot-toast'
import type { RankedCandidate, SortDirection, SortField } from '@/types'
import { initials } from '@/utils/format'
import ScoreBadge from './ScoreBadge'
import SkillTag from '@/components/common/SkillTag'

interface RankingTableProps {
  candidates: RankedCandidate[]
  onSelect: (candidate: RankedCandidate) => void
  pageSize?: number
}

const COLUMNS: { key: SortField; label: string }[] = [
  { key: 'rank', label: 'Rank' },
  { key: 'name', label: 'Candidate' },
  { key: 'final_score', label: 'Final' },
  { key: 'similarity_score', label: 'Similarity' },
  { key: 'skill_score', label: 'Skill' },
  { key: 'education_score', label: 'Education' },
  { key: 'experience_score', label: 'Experience' },
  { key: 'eligibility_score', label: 'Eligibility' },
]

export default function RankingTable({ candidates, onSelect, pageSize = 8 }: RankingTableProps) {
  const [sortField, setSortField] = useState<SortField>('rank')
  const [sortDir, setSortDir] = useState<SortDirection>('asc')
  const [page, setPage] = useState(1)

  const sorted = useMemo(() => {
    const copy = [...candidates]
    copy.sort((a, b) => {
      const av = a[sortField]
      const bv = b[sortField]
      let cmp: number
      if (typeof av === 'string' && typeof bv === 'string') {
        cmp = av.localeCompare(bv)
      } else {
        cmp = (av as number) - (bv as number)
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return copy
  }, [candidates, sortField, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir(field === 'rank' ? 'asc' : 'desc')
    }
    setPage(1)
  }

  if (candidates.length === 0) {
    return (
      <div className="glass-panel flex flex-col items-center gap-3 px-8 py-16 text-center">
        <LuInbox className="h-8 w-8 text-ink-faint" />
        <p className="text-sm text-ink-dim">No candidates match your filters.</p>
      </div>
    )
  }

  return (
    <div className="glass-panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line-soft text-left">
              {COLUMNS.map((col) => (
                <th key={col.key} className="whitespace-nowrap px-4 py-3.5">
                  <button
                    onClick={() => toggleSort(col.key)}
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-ink-faint transition-colors hover:text-ink"
                  >
                    {col.label}
                    {sortField === col.key &&
                      (sortDir === 'asc' ? <LuChevronUp className="h-3 w-3" /> : <LuChevronDown className="h-3 w-3" />)}
                  </button>
                </th>
              ))}
              <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-ink-faint">Skills</th>
              <th className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-ink-faint">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((c, i) => (
              <motion.tr
                key={c.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: i * 0.02 }}
                className="group cursor-pointer border-b border-line-soft transition-colors hover:bg-white/[0.025]"
                onClick={() => onSelect(c)}
              >
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-lg font-mono text-xs font-semibold ${
                      c.rank <= 3 ? 'bg-signal-gradient text-base-950' : 'bg-white/[0.06] text-ink-dim'
                    }`}
                  >
                    {c.rank}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal-gradient-soft text-[11px] font-semibold text-signal-cyan">
                      {initials(c.name)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink">{c.name}</p>
                      <p className="truncate text-xs text-ink-faint">{c.email ?? 'No email found'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <ScoreBadge value={c.final_score} />
                </td>
                <td className="px-4 py-3.5 font-mono text-xs text-ink-dim">{c.similarity_score.toFixed(1)}</td>
                <td className="px-4 py-3.5 font-mono text-xs text-ink-dim">{c.skill_score.toFixed(1)}</td>
                <td className="px-4 py-3.5 font-mono text-xs text-ink-dim">{c.education_score.toFixed(0)}</td>
                <td className="px-4 py-3.5 font-mono text-xs text-ink-dim">{c.experience_score.toFixed(0)}</td>
                <td className="px-4 py-3.5 font-mono text-xs text-ink-dim">{c.eligibility_score.toFixed(0)}</td>
                <td className="px-4 py-3.5">
                  <div className="flex max-w-[180px] flex-wrap gap-1">
                    {c.skills.slice(0, 2).map((s) => (
                      <SkillTag key={s} skill={s} />
                    ))}
                    {c.skills.length > 2 && <span className="chip">+{c.skills.length - 2}</span>}
                    {c.skills.length === 0 && <span className="text-xs text-ink-faint">—</span>}
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelect(c)
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-faint transition-colors hover:bg-white/[0.06] hover:text-ink"
                      aria-label="View candidate"
                    >
                      <LuEye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()

                        if (!c.resume_url) {
                          toast.error("Resume not available")
                          return
                        }

                        window.open(c.resume_url, "_blank")
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-faint transition-colors hover:bg-white/[0.06] hover:text-ink"
                      aria-label="Download resume"
                    >
                      <LuDownload className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-line-soft px-4 py-3.5">
        <p className="text-xs text-ink-faint">
          Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, sorted.length)} of {sorted.length}
        </p>
        <div className="flex items-center gap-1.5">
          <button
            disabled={currentPage === 1}
            onClick={() => setPage((p) => p - 1)}
            className="btn-ghost px-2.5 py-1.5 disabled:opacity-30"
          >
            Prev
          </button>
          <span className="px-2 text-xs text-ink-dim">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="btn-ghost px-2.5 py-1.5 disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
