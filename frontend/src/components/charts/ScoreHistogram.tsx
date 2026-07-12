import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts'
import type { RankedCandidate } from '@/types'
import { tierColor } from '@/utils/format'

const BUCKETS = [
  { label: '0-20', min: 0, max: 20 },
  { label: '20-40', min: 20, max: 40 },
  { label: '40-60', min: 40, max: 60 },
  { label: '60-80', min: 60, max: 80 },
  { label: '80-100', min: 80, max: 101 },
]

export default function ScoreHistogram({ candidates }: { candidates: RankedCandidate[] }) {
  const data = useMemo(
    () =>
      BUCKETS.map((b) => ({
        label: b.label,
        count: candidates.filter((c) => c.final_score >= b.min && c.final_score < b.max).length,
        color: b.min >= 80 ? tierColor.excellent : b.min >= 60 ? tierColor.good : b.min >= 40 ? tierColor.fair : tierColor.weak,
      })),
    [candidates]
  )

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis dataKey="label" tick={{ fill: '#9CA3B8', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} tickLine={false} />
        <YAxis allowDecimals={false} tick={{ fill: '#9CA3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
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
        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
