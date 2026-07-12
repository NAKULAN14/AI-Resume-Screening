import { api } from './api'
import type { HealthResponse, RankResponse, SingleUploadResponse } from '@/types'

/**
 * POST /ranking/rank
 * multipart/form-data:
 *   job_description: File   (single PDF, field name required exactly by FastAPI param name)
 *   resumes:         File[] (multiple PDFs, same field name repeated)
 */
export async function rankCandidates(
  jobDescription: File,
  resumes: File[],
  onProgress?: (percent: number) => void
): Promise<RankResponse> {
  const formData = new FormData()
  formData.append('job_description', jobDescription)
  resumes.forEach((resume) => formData.append('resumes', resume))

  const { data } = await api.post<RankResponse>('/ranking/rank', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (evt) => {
      if (onProgress && evt.total) {
        onProgress(Math.round((evt.loaded / evt.total) * 100))
      }
    },
  })
  return data
}

/**
 * POST /upload/upload
 * multipart/form-data: file: File
 * Saves a single file server-side and returns its filename. The backend does not
 * use this route as part of the ranking flow — it exists standalone.
 */
export async function uploadSingleFile(file: File): Promise<SingleUploadResponse> {
  const formData = new FormData()
  formData.append('file', file)
  const { data } = await api.post<SingleUploadResponse>('/upload/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

/** GET /health */
export async function checkHealth(): Promise<HealthResponse> {
  const { data } = await api.get<HealthResponse>('/health')
  return data
}
