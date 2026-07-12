import { Link } from 'react-router-dom'
import { LuCompass } from 'react-icons/lu'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-signal-gradient-soft text-signal-cyan">
        <LuCompass className="h-7 w-7" />
      </div>
      <h1 className="font-display text-3xl font-semibold text-ink">Page not found</h1>
      <p className="max-w-sm text-sm text-ink-dim">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/dashboard" className="btn-primary">
        Back to dashboard
      </Link>
    </div>
  )
}
