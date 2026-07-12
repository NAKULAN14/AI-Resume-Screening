import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LuLayoutDashboard,
  LuCloudUpload,
  LuUsers,
  LuChartColumn,
  LuSettings,
  LuCircleHelp,
  LuScanLine,
} from 'react-icons/lu'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LuLayoutDashboard },
  { to: '/upload', label: 'Upload', icon: LuCloudUpload },
  { to: '/candidates', label: 'Candidates', icon: LuUsers },
  { to: '/analytics', label: 'Analytics', icon: LuChartColumn },
  { to: '/settings', label: 'Settings', icon: LuSettings },
  { to: '/help', label: 'Help', icon: LuCircleHelp },
]

interface SidebarProps {
  mobileOpen: boolean
  onClose: () => void
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-line-soft bg-base-900/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 lg:bg-base-900/40 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-2.5 px-6 py-6">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-signal-gradient">
            <LuScanLine className="h-5 w-5 text-base-950" />
            <motion.span
              className="absolute inset-0 rounded-xl"
              animate={{ opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              style={{ boxShadow: '0 0 0 1px rgba(108,108,244,0.5)' }}
            />
          </div>
          <div>
            <div className="font-display text-base font-semibold leading-none text-ink">ResumeIQ</div>
            <div className="mt-1 text-[11px] leading-none text-ink-faint">AI Screening</div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white/[0.06] text-ink shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]'
                    : 'text-ink-dim hover:bg-white/[0.04] hover:text-ink'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`h-[18px] w-[18px] transition-colors ${isActive ? 'text-signal-cyan' : 'text-ink-faint group-hover:text-ink-dim'}`}
                  />
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-signal-cyan"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mx-3 mb-4 rounded-xl border border-line-soft bg-signal-gradient-soft p-4">
          <p className="text-xs font-medium text-ink">Built for HR teams</p>
          <p className="mt-1 text-[11px] leading-relaxed text-ink-dim">
            Rank candidates against any JD in seconds using AI embeddings.
          </p>
        </div>
      </aside>
    </>
  )
}
