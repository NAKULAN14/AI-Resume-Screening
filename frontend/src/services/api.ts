import axios from 'axios'

/**
 * Base URL of the FastAPI backend.
 * Backend exposes no "/api" prefix — routers are mounted at "/upload" and "/ranking"
 * directly on the root app (see backend/main.py). Configure via VITE_API_BASE_URL.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  // Ranking runs sentence-transformer inference over every resume server-side,
  // which can take a while for larger batches — give it real headroom.
  timeout: 120_000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const detail =
      error?.response?.data?.detail ||
      error?.message ||
      'Something went wrong talking to the backend.'
    return Promise.reject(new Error(detail))
  }
)
