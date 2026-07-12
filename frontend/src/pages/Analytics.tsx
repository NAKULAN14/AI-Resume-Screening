import { useMemo } from 'react'
import { LuChartColumn } from 'react-icons/lu'
import ChartCard from '@/components/charts/ChartCard'
import ScoreHistogram from '@/components/charts/ScoreHistogram'
import SkillDistributionChart from '@/components/charts/SkillDistributionChart'
import RankingDistributionChart from '@/components/charts/RankingDistributionChart'
import EducationPieChart from '@/components/charts/EducationPieChart'
import StatCard from '@/components/common/StatCard'
import EmptyState from '@/components/common/EmptyState'
import { useAppData } from '@/context/AppDataContext'

export default function Analytics() {
  const { candidates, hasData } = useAppData()

  const avgScores = useMemo(() => {
    if (candidates.length === 0) return null
    const n = candidates.length
    const sum = (key: keyof (typeof candidates)[number]) =>
      candidates.reduce((acc, c) => acc + (c[key] as number), 0) / n
    return {
      similarity: sum('similarity_score'),
      skill: sum('skill_score'),
      education: sum('education_score'),
      experience: sum('experience_score'),
      eligibility: sum('eligibility_score'),
    }
  }, [candidates])

  if (!hasData) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <EmptyState
          icon={<LuChartColumn />}
          title="Nothing to analyze yet"
          description="Analytics fill in automatically once you've ranked at least one batch of candidates."
          actionLabel="Upload resumes"
          actionTo="/upload"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard icon={<span>%</span>} label="Avg similarity" value={avgScores!.similarity.toFixed(0)} accent="#6C6CF4" delay={0} />
        <StatCard icon={<span>%</span>} label="Avg skill match" value={avgScores!.skill.toFixed(0)} accent="#33D4E0" delay={0.04} />
        <StatCard icon={<span>%</span>} label="Avg education" value={avgScores!.education.toFixed(0)} accent="#B26CF4" delay={0.08} />
        <StatCard icon={<span>%</span>} label="Avg experience" value={avgScores!.experience.toFixed(0)} accent="#3CE0A6" delay={0.12} />
        <StatCard icon={<span>%</span>} label="Avg eligibility" value={avgScores!.eligibility.toFixed(0)} accent="#F2B84B" delay={0.16} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartCard title="Score distribution" subtitle="Final scores grouped into ranges" delay={0.1}>
          <ScoreHistogram candidates={candidates} />
        </ChartCard>
        <ChartCard title="Match quality" subtitle="Share of candidates per tier" delay={0.15}>
          <RankingDistributionChart candidates={candidates} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartCard title="Most common skills" subtitle="Across all candidates in this session" delay={0.2}>
          <SkillDistributionChart candidates={candidates} limit={10} />
        </ChartCard>
        <ChartCard title="Education distribution" subtitle="Highest degree detected per resume" delay={0.25}>
          <EducationPieChart candidates={candidates} />
        </ChartCard>
      </div>
    </div>
  )
}

function PageHeader() {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="font-display text-2xl font-semibold text-ink">Analytics</h2>
      <p className="text-sm text-ink-dim">Deeper insight into how your candidate pool scores.</p>
    </div>
  )
}
