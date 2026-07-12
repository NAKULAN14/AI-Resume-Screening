export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

export function genId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

export function initials(name: string): string {
  if (!name || name === 'Unknown') return '?'
  const parts = name.trim().split(/\s+/)
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ' · ' +
    d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

export function scoreTier(score: number): 'excellent' | 'good' | 'fair' | 'weak' {
  if (score >= 80) return 'excellent'
  if (score >= 60) return 'good'
  if (score >= 40) return 'fair'
  return 'weak'
}

export const tierColor: Record<string, string> = {
  excellent: '#3CE0A6',
  good: '#33D4E0',
  fair: '#F2B84B',
  weak: '#F2607A',
}

export const tierLabel: Record<string, string> = {
  excellent: 'Strong match',
  good: 'Good match',
  fair: 'Partial match',
  weak: 'Weak match',
}
