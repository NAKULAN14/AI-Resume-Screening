import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { RankedCandidate } from '@/types'

export default function SkillDistributionChart({ candidates, limit = 8 }: { candidates: RankedCandidate[]; limit?: number }) {
  const data = useMemo(() => {
    const counts = new Map<string, number>()
    candidates.forEach((c) => c.skills.forEach((s) => counts.set(s, (counts.get(s) ?? 0) + 1)))
    return Array.from(counts.entries())
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }, [candidates, limit])

  if (data.length === 0) {
    return <p className="py-10 text-center text-sm text-ink-faint">No skills detected across current candidates.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={Math.max(240, data.length * 34)}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
        <XAxis type="number" allowDecimals={false} tick={{ fill: '#9CA3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis
          type="category"
          dataKey="skill"
          width={100}
          tick={{ fill: '#E8EAF2', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          contentStyle={{
            background: '#151926',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            fontSize: 12,
            color: '#E8EAF2',
          }}
        />
        <Bar dataKey="count" fill="url(#skillGradient)" radius={[0, 6, 6, 0]} barSize={16} />
        <defs>
          <linearGradient id="skillGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6C6CF4" />
            <stop offset="100%" stopColor="#33D4E0" />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  )
}
