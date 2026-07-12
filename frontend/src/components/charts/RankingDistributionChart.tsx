import { useMemo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import type { RankedCandidate } from '@/types'
import { scoreTier, tierColor, tierLabel } from '@/utils/format'

export default function RankingDistributionChart({ candidates }: { candidates: RankedCandidate[] }) {
  const data = useMemo(() => {
    const tiers = ['excellent', 'good', 'fair', 'weak'] as const
    return tiers
      .map((t) => ({
        name: tierLabel[t],
        value: candidates.filter((c) => scoreTier(c.final_score) === t).length,
        color: tierColor[t],
      }))
      .filter((d) => d.value > 0)
  }, [candidates])

  if (data.length === 0) {
    return <p className="py-10 text-center text-sm text-ink-faint">No candidates yet.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={3} strokeWidth={0}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: '#151926',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            fontSize: 12,
            color: '#E8EAF2',
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value) => <span style={{ color: '#9CA3B8', fontSize: 12 }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
