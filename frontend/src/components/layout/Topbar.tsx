import { useState } from 'react'
import { LuMenu, LuSearch, LuBell, LuSun, LuMoon } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@/context/ThemeContext'
import { useAppData } from '@/context/AppDataContext'
import { initials } from '@/utils/format'

interface TopbarProps {
  onMenuClick: () => void
  title: string
}

export default function Topbar({ onMenuClick, title }: TopbarProps) {
  const { theme, toggleTheme } = useTheme()
  const { candidates } = useAppData()
  const [query, setQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const navigate = useNavigate()

  const matches = query.trim()
    ? candidates.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : []

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-line-soft bg-base-950/70 px-5 py-4 backdrop-blur-xl lg:px-8">
      <button className="btn-ghost -ml-2 lg:hidden" onClick={onMenuClick} aria-label="Open menu">
        <LuMenu className="h-5 w-5" />
      </button>

      <h1 className="hidden font-display text-lg font-semibold text-ink sm:block">{title}</h1>

      <div className="relative ml-auto w-full max-w-xs sm:max-w-sm">
        <LuSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search candidates..."
          className="input-field pl-10 text-sm"
        />
        {matches.length > 0 && (
          <div className="absolute left-0 right-0 top-12 z-40 overflow-hidden rounded-xl border border-line-soft bg-base-850 shadow-glass">
            {matches.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setQuery('')
                  navigate('/candidates')
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-ink hover:bg-white/[0.05]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-signal-gradient-soft text-[10px] font-semibold text-signal-cyan">
                  {initials(m.name)}
                </span>
                {m.name}
                <span className="ml-auto font-mono text-xs text-ink-faint">{m.final_score.toFixed(0)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <button className="btn-ghost" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? <LuSun className="h-[18px] w-[18px]" /> : <LuMoon className="h-[18px] w-[18px]" />}
      </button>

      <div className="relative">
        <button
          className="btn-ghost relative"
          onClick={() => setShowNotifications((v) => !v)}
          aria-label="Notifications"
        >
          <LuBell className="h-[18px] w-[18px]" />
          {candidates.length > 0 && (
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-signal-cyan" />
          )}
        </button>
        {showNotifications && (
          <div className="absolute right-0 top-12 z-40 w-72 overflow-hidden rounded-xl border border-line-soft bg-base-850 p-1 shadow-glass">
            {candidates.length > 0 ? (
              <div className="px-3.5 py-3 text-sm">
                <p className="text-ink">Ranking complete</p>
                <p className="mt-0.5 text-xs text-ink-dim">
                  {candidates.length} candidate{candidates.length !== 1 ? 's' : ''} scored against your latest job description.
                </p>
              </div>
            ) : (
              <div className="px-3.5 py-3 text-sm text-ink-dim">No notifications yet.</div>
            )}
          </div>
        )}
      </div>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-signal-gradient font-display text-xs font-semibold text-base-950">
        HR
      </div>
    </header>
  )
}
