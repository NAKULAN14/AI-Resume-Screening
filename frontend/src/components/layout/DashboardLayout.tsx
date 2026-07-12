import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/upload': 'Upload',
  '/candidates': 'Candidates',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
  '/help': 'Help',
}

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const title = TITLES[location.pathname] ?? 'ResumeIQ'

  return (
    <div className="flex min-h-screen bg-base-950">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
        <Topbar onMenuClick={() => setMobileOpen(true)} title={title} />
        <main className="flex-1 px-5 py-6 lg:px-8 lg:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
