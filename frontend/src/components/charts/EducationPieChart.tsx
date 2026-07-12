import { useMemo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import type { RankedCandidate } from '@/types'

const PALETTE = ['#6C6CF4', '#33D4E0', '#B26CF4', '#3CE0A6', '#F2B84B', '#F2607A']

export default function EducationPieChart({ candidates }: { candidates: RankedCandidate[] }) {
  const data = useMemo(() => {
    const counts = new Map<string, number>()
    candidates.forEach((c) => {
      const key = c.education || 'Not Specified'
      counts.set(key, (counts.get(key) ?? 0) + 1)
    })
    return Array.from(counts.entries()).map(([name, value], i) => ({ name, value, color: PALETTE[i % PALETTE.length] }))
  }, [candidates])

  if (data.length === 0) {
    return <p className="py-10 text-center text-sm text-ink-faint">No candidates yet.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={92} strokeWidth={0}>
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
