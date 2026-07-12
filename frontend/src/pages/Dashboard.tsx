import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { LuUsers, LuTrendingUp, LuCrown, LuCloudUpload, LuArrowRight } from 'react-icons/lu'
import StatCard from '@/components/common/StatCard'
import EmptyState from '@/components/common/EmptyState'
import ChartCard from '@/components/charts/ChartCard'
import ScoreHistogram from '@/components/charts/ScoreHistogram'
import SkillDistributionChart from '@/components/charts/SkillDistributionChart'
import RankingDistributionChart from '@/components/charts/RankingDistributionChart'
import ScoreBadge from '@/components/results/ScoreBadge'
import { useAppData } from '@/context/AppDataContext'
import { formatDate, initials } from '@/utils/format'

export default function Dashboard() {
  const { candidates, activeSession, hasData } = useAppData()

  const stats = useMemo(() => {
    if (candidates.length === 0) return null
    const avg = candidates.reduce((sum, c) => sum + c.final_score, 0) / candidates.length
    const top = [...candidates].sort((a, b) => b.final_score - a.final_score)[0]
    return { avg, top }
  }, [candidates])

  if (!hasData) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <EmptyState
          icon={<LuCloudUpload />}
          title="No candidates ranked yet"
          description="Upload a job description and a batch of resumes to see your dashboard come to life."
          actionLabel="Go to Upload"
          actionTo="/upload"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<LuUsers />}
          label="Total candidates"
          value={String(candidates.length)}
          sublabel={`From ${activeSession?.resumeCount ?? candidates.length} resumes uploaded`}
          accent="#6C6CF4"
          delay={0}
        />
        <StatCard
          icon={<LuTrendingUp />}
          label="Average score"
          value={stats!.avg.toFixed(1)}
          sublabel="Across current session"
          accent="#33D4E0"
          delay={0.05}
        />
        <StatCard
          icon={<LuCrown />}
          label="Top candidate"
          value={stats!.top.final_score.toFixed(1)}
          sublabel={stats!.top.name}
          accent="#3CE0A6"
          delay={0.1}
        />
        <StatCard
          icon={<LuCloudUpload />}
          label="Last upload"
          value={activeSession ? formatDate(activeSession.createdAt).split(' · ')[0] : '—'}
          sublabel={activeSession?.jobDescriptionName ?? ''}
          accent="#B26CF4"
          delay={0.15}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard title="Candidate score distribution" subtitle="Final score buckets across all candidates" delay={0.1}>
            <ScoreHistogram candidates={candidates} />
          </ChartCard>
        </div>
        <ChartCard title="Match quality" subtitle="Candidates by tier" delay={0.15}>
          <RankingDistributionChart candidates={candidates} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <ChartCard title="Top matched skills" subtitle="Most common skills found in resumes" delay={0.2}>
          <SkillDistributionChart candidates={candidates} limit={6} />
        </ChartCard>

        <div className="glass-panel p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-sm font-semibold text-ink">Recent uploads</h3>
              <p className="mt-0.5 text-xs text-ink-faint">Latest ranked candidates from this session</p>
            </div>
            <Link to="/candidates" className="btn-ghost text-xs">
              View all
              <LuArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-1.5">
            {candidates
              .slice()
              .sort((a, b) => a.rank - b.rank)
              .slice(0, 5)
              .map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.03]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal-gradient-soft text-[11px] font-semibold text-signal-cyan">
                    {initials(c.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{c.name}</p>
                    <p className="truncate text-xs text-ink-faint">{c.email ?? 'No email found'}</p>
                  </div>
                  <ScoreBadge value={c.final_score} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PageHeader() {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="font-display text-2xl font-semibold text-ink">Dashboard</h2>
      <p className="text-sm text-ink-dim">Overview of your candidate screening activity.</p>
    </div>
  )
}
