import { useMemo, useState } from 'react'
import { LuUsers } from 'react-icons/lu'
import TableFilters from '@/components/results/TableFilters'
import RankingTable from '@/components/results/RankingTable'
import CandidateDrawer from '@/components/results/CandidateDrawer'
import EmptyState from '@/components/common/EmptyState'
import { useAppData } from '@/context/AppDataContext'
import { exportCandidatesToCsv } from '@/utils/csvExport'
import type { RankedCandidate } from '@/types'

export default function Candidates() {
  const { candidates, hasData } = useAppData()
  const [search, setSearch] = useState('')
  const [minScore, setMinScore] = useState(0)
  const [educationFilter, setEducationFilter] = useState('all')
  const [selected, setSelected] = useState<RankedCandidate | null>(null)

  const educationOptions = useMemo(
    () => Array.from(new Set(candidates.map((c) => c.education))).sort(),
    [candidates]
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return candidates.filter((c) => {
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        (c.email ?? '').toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q))
      const matchesScore = c.final_score >= minScore
      const matchesEducation = educationFilter === 'all' || c.education === educationFilter
      return matchesSearch && matchesScore && matchesEducation
    })
  }, [candidates, search, minScore, educationFilter])

  if (!hasData) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <EmptyState
          icon={<LuUsers />}
          title="No candidates yet"
          description="Once you rank a batch of resumes, they'll show up here as a searchable, sortable table."
          actionLabel="Upload resumes"
          actionTo="/upload"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader />

      <TableFilters
        search={search}
        onSearchChange={setSearch}
        minScore={minScore}
        onMinScoreChange={setMinScore}
        educationFilter={educationFilter}
        onEducationFilterChange={setEducationFilter}
        educationOptions={educationOptions}
        onExport={() => exportCandidatesToCsv(filtered)}
        resultCount={filtered.length}
      />

      <RankingTable candidates={filtered} onSelect={setSelected} />

      <CandidateDrawer candidate={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

function PageHeader() {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="font-display text-2xl font-semibold text-ink">Candidates</h2>
      <p className="text-sm text-ink-dim">Every candidate ranked in your latest screening session.</p>
    </div>
  )
}
