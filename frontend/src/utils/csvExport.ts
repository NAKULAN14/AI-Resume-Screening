import type { RankedCandidate } from '@/types'

export function exportCandidatesToCsv(candidates: RankedCandidate[], filename = 'resumeiq-rankings.csv') {
  const headers = [
    'Rank',
    'Name',
    'Email',
    'Phone',
    'Final Score',
    'Similarity Score',
    'Skill Score',
    'Education Score',
    'Experience Score',
    'Eligibility Score',
    'Education',
    'Experience',
    'Batch',
    'Skills',
    'Source File',
  ]

  const escape = (val: string | number | null) => {
    const str = String(val ?? '')
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`
    }
    return str
  }

  const rows = candidates.map((c) => [
    c.rank,
    c.name,
    c.email,
    c.phone,
    c.final_score,
    c.similarity_score,
    c.skill_score,
    c.education_score,
    c.experience_score,
    c.eligibility_score,
    c.education,
    c.experience,
    c.batch,
    c.skills.join('; '),
    c.resume_path,
  ])

  const csv = [headers, ...rows].map((row) => row.map(escape).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
