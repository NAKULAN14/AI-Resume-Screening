import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Landing from '@/pages/Landing'
import Dashboard from '@/pages/Dashboard'
import Upload from '@/pages/Upload'
import Candidates from '@/pages/Candidates'
import Analytics from '@/pages/Analytics'
import Settings from '@/pages/Settings'
import Help from '@/pages/Help'
import NotFound from '@/pages/NotFound'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { ThemeProvider } from '@/context/ThemeContext'
import { AppDataProvider } from '@/context/AppDataContext'

export default function App() {
  return (
    <ThemeProvider>
      <AppDataProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#151926',
              color: '#E8EAF2',
              border: '1px solid rgba(255,255,255,0.08)',
              fontSize: '13px',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AppDataProvider>
    </ThemeProvider>
  )
}
