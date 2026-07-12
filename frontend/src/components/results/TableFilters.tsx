import { LuSearch, LuDownload, LuSlidersHorizontal } from 'react-icons/lu'

interface TableFiltersProps {
  search: string
  onSearchChange: (v: string) => void
  minScore: number
  onMinScoreChange: (v: number) => void
  educationFilter: string
  onEducationFilterChange: (v: string) => void
  educationOptions: string[]
  onExport: () => void
  resultCount: number
}

export default function TableFilters({
  search,
  onSearchChange,
  minScore,
  onMinScoreChange,
  educationFilter,
  onEducationFilterChange,
  educationOptions,
  onExport,
  resultCount,
}: TableFiltersProps) {
  return (
    <div className="glass-panel flex flex-col gap-4 p-4 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <LuSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, email or skill..."
          className="input-field pl-10"
        />
      </div>

      <div className="flex items-center gap-2">
        <LuSlidersHorizontal className="h-4 w-4 shrink-0 text-ink-faint" />
        <label className="whitespace-nowrap text-xs text-ink-dim">Min score</label>
        <input
          type="range"
          min={0}
          max={100}
          value={minScore}
          onChange={(e) => onMinScoreChange(Number(e.target.value))}
          className="w-28 accent-signal-indigo"
        />
        <span className="w-8 font-mono text-xs text-ink">{minScore}</span>
      </div>

      <select
        value={educationFilter}
        onChange={(e) => onEducationFilterChange(e.target.value)}
        className="input-field w-auto py-2 text-xs"
      >
        <option value="all">All education</option>
        {educationOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-3">
        <span className="hidden whitespace-nowrap text-xs text-ink-faint sm:inline">{resultCount} results</span>
        <button onClick={onExport} className="btn-secondary whitespace-nowrap px-3.5 py-2 text-xs">
          <LuDownload className="h-3.5 w-3.5" />
          Export CSV
        </button>
      </div>
    </div>
  )
}
