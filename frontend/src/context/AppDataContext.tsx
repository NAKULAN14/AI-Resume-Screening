import { createContext, useContext, useMemo, ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { genId } from '@/utils/format'
import type { RankedCandidate, RankResponse, RankingSession } from '@/types'

interface AppDataContextValue {
  sessions: RankingSession[]
  activeSession: RankingSession | null
  candidates: RankedCandidate[]
  addSession: (jdName: string, resumeCount: number, response: RankResponse) => RankingSession
  clearAllData: () => void
  hasData: boolean
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined)

const STORAGE_KEY = 'resumeiq_sessions_v1'

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useLocalStorage<RankingSession[]>(STORAGE_KEY, [])

  const activeSession = sessions.length > 0 ? sessions[0] : null

  const candidates = useMemo(() => activeSession?.candidates ?? [], [activeSession])

  function addSession(jdName: string, resumeCount: number, response: RankResponse): RankingSession {
    const session: RankingSession = {
      id: genId(),
      createdAt: new Date().toISOString(),
      jobDescriptionName: jdName,
      resumeCount,
      candidates: response.rankings.map((c, idx) => ({
        ...c,
        id: genId(),
        rank: idx + 1,
      })),
    }
    setSessions((prev) => [session, ...prev].slice(0, 20))
    return session
  }

  function clearAllData() {
    setSessions([])
  }

  return (
    <AppDataContext.Provider
      value={{ sessions, activeSession, candidates, addSession, clearAllData, hasData: candidates.length > 0 }}
    >
      {children}
    </AppDataContext.Provider>
  )
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider')
  return ctx
}
