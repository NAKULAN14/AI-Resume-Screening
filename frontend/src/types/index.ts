/**
 * These types are derived directly from the FastAPI backend source
 * (services/parser.py, services/ranking_service.py, routes/ranking.py).
 * Do not add fields the backend does not actually return.
 */

/** A single ranked candidate, exactly as returned inside `rankings[]` by POST /ranking/rank */
export interface Candidate {
  name: string
  email: string | null
  phone: string | null
  skills: string[]
  education: string
  experience: string
  batch: string
  /** Full raw extracted resume text — large, only used in the detail drawer */
  text: string
  /** This is just the uploaded filename, NOT a servable path/URL. See README for backend gap. */
  resume_path: string
  similarity_score: number
  skill_score: number
  education_score: number
  experience_score: number
  eligibility_score: number
  final_score: number
  resume_url?: string
}

/** Response shape of POST /ranking/rank */
export interface RankResponse {
  total_candidates: number
  rankings: Candidate[]
}

/** Response shape of POST /upload/upload */
export interface SingleUploadResponse {
  message: string
  filename: string
}

export interface HealthResponse {
  status: string
  database: string
  ai_model: string
}

/** A candidate enriched with a client-generated id + the JD/session it belongs to. */
export interface RankedCandidate extends Candidate {
  id: string
  rank: number

}

export interface RankingSession {
  id: string
  createdAt: string
  jobDescriptionName: string
  resumeCount: number
  candidates: RankedCandidate[]
}

export type SortField =
  | 'rank'
  | 'name'
  | 'final_score'
  | 'similarity_score'
  | 'skill_score'
  | 'education_score'
  | 'experience_score'
  | 'eligibility_score'

export type SortDirection = 'asc' | 'desc'

export interface StagedFile {
  id: string
  file: File
  name: string
  sizeLabel: string
}
