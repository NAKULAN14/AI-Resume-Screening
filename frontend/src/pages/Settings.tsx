import toast from 'react-hot-toast'
import { LuSun, LuMoon, LuTrash2, LuServer, LuKeyboard } from 'react-icons/lu'
import { useTheme } from '@/context/ThemeContext'
import { useAppData } from '@/context/AppDataContext'
import { API_BASE_URL } from '@/services/api'

export default function Settings() {
  const { theme, toggleTheme } = useTheme()
  const { clearAllData, sessions } = useAppData()

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Settings</h2>
        <p className="text-sm text-ink-dim">Preferences and connection details for this workspace.</p>
      </div>

      <section className="glass-panel p-5">
        <h3 className="font-display text-sm font-semibold text-ink">Appearance</h3>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-line-soft bg-white/[0.02] p-4">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? <LuMoon className="h-5 w-5 text-signal-cyan" /> : <LuSun className="h-5 w-5 text-signal-amber" />}
            <div>
              <p className="text-sm font-medium text-ink">{theme === 'dark' ? 'Dark mode' : 'Light mode'}</p>
              <p className="text-xs text-ink-faint">ResumeIQ defaults to dark mode for long screening sessions.</p>
            </div>
          </div>
          <button onClick={toggleTheme} className="btn-secondary px-3.5 py-2 text-xs">
            Switch to {theme === 'dark' ? 'light' : 'dark'}
          </button>
        </div>
      </section>

      <section className="glass-panel p-5">
        <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
          <LuServer className="h-4 w-4 text-signal-indigo" />
          Backend connection
        </h3>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center justify-between rounded-xl border border-line-soft bg-white/[0.02] p-4">
            <span className="text-ink-dim">API base URL</span>
            <span className="font-mono text-xs text-ink">{API_BASE_URL}</span>
          </div>
          <p className="text-xs text-ink-faint">
            Set <code className="rounded bg-white/[0.06] px-1 py-0.5">VITE_API_BASE_URL</code> in your <code className="rounded bg-white/[0.06] px-1 py-0.5">.env</code> file to point at a different FastAPI instance.
          </p>
        </div>
      </section>

      <section className="glass-panel p-5">
        <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
          <LuKeyboard className="h-4 w-4 text-signal-violet" />
          Keyboard shortcuts
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {[
            ['g d', 'Go to Dashboard'],
            ['g u', 'Go to Upload'],
            ['g c', 'Go to Candidates'],
            ['g a', 'Go to Analytics'],
          ].map(([key, label]) => (
            <div key={key} className="flex items-center justify-between rounded-xl border border-line-soft bg-white/[0.02] px-4 py-2.5">
              <span className="text-ink-dim">{label}</span>
              <kbd className="rounded-md border border-line-med bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-ink">{key}</kbd>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel border-signal-rose/20 p-5">
        <h3 className="font-display text-sm font-semibold text-ink">Danger zone</h3>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-signal-rose/20 bg-signal-rose/[0.04] p-4">
          <div>
            <p className="text-sm font-medium text-ink">Clear stored ranking sessions</p>
            <p className="text-xs text-ink-faint">
              {sessions.length} session{sessions.length !== 1 ? 's' : ''} stored locally in this browser. The backend keeps no history, so this is the only copy.
            </p>
          </div>
          <button
            onClick={() => {
              clearAllData()
              toast.success('All local ranking data cleared.')
            }}
            className="btn-secondary shrink-0 border-signal-rose/30 px-3.5 py-2 text-xs text-signal-rose hover:bg-signal-rose/10"
          >
            <LuTrash2 className="h-3.5 w-3.5" />
            Clear data
          </button>
        </div>
      </section>
    </div>
  )
}
