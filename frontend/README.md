# ResumeIQ — Frontend

A production-quality React + TypeScript + Tailwind frontend for the AI Resume Screening System FastAPI backend, built by reading the backend source directly (`main.py`, `routes/`, `services/`, `database/`) rather than assuming any API shape.

## Stack

React 18 · Vite · TypeScript · Tailwind CSS · React Router · Axios · Framer Motion · Recharts · React Hot Toast · React Icons (Lucide set)

## Getting started

```bash
npm install
cp .env.example .env   # set VITE_API_BASE_URL if your backend isn't on 127.0.0.1:8000
npm run dev
```

The app expects the FastAPI backend running with CORS enabled (it already is, `allow_origins=["*"]` in `main.py`).

## ⚠️ Backend issues found while integrating — read before demoing

The brief asked me to read every route before writing frontend code, and to flag anything missing rather than invent endpoints. Here's exactly what I found in `backend/`:

### 1. `POST /ranking/rank` will crash as written (blocking bug)

In `routes/ranking.py`:
```python
ranked_candidates = rank_candidates(job_description_text, parsed_resumes)
```
But `services/ranking_service.py` defines:
```python
def rank_candidates(job_description_text, parsed_resumes, parsed_jd):
```
`parsed_jd` is computed in the route (`parsed_jd = parse_job_description(job_description_text)`) but never passed into `rank_candidates`. As written, every call to `/ranking/rank` raises `TypeError: rank_candidates() missing 1 required positional argument: 'parsed_jd'`.

**Fix:** change the call to `rank_candidates(job_description_text, parsed_resumes, parsed_jd)`.

The frontend's Upload flow (`src/pages/Upload.tsx`) already handles this gracefully — a failed ranking call shows an error state with a Retry button rather than a blank screen — but ranking cannot succeed until this one-line fix is made.

### 2. No persistence — every ranking session is stateless

`database/models.py` defines a `Candidate` table and `database/crud.py` has `create_candidate()`, but neither is ever called from `routes/ranking.py`. The SQLite database is created on startup but nothing is ever written to it. This means:
- There is no `GET` endpoint to list past candidates or sessions.
- Refreshing the page loses all ranking data unless it's cached somewhere.

**What the frontend does about it:** since there's no backend history to read, ResumeIQ stores the last 20 ranking sessions in the browser's `localStorage` (`src/context/AppDataContext.tsx`) so the Dashboard and Analytics pages have something to show across visits. This is a client-side workaround, not a substitute for real persistence — it's per-browser, not shared across your HR team.

**Suggested fix:** call `crud.create_candidate()` for each ranked candidate inside `/ranking/rank`, and add `GET /candidates` and `GET /candidates/{id}` routes so the dashboard can be powered by real, shared server data instead of local storage.

### 3. No way to download a resume

Each candidate object returned by `/ranking/rank` includes `resume_path`, but it's just `resume.filename` — the original uploaded filename, not a path the backend can serve back (`routes/ranking.py` never writes the resume to disk at all; only `routes/upload.py`'s separate, unrelated `/upload/upload` endpoint saves files). There's also no `StaticFiles` mount in `main.py` to serve the `uploads/` folder.

The frontend surfaces this honestly: the "Download resume" buttons in the table and candidate drawer show a toast explaining why the file isn't available, instead of pretending to work.

**Suggested fix:** in `/ranking/rank`, save each uploaded resume to disk (like `/upload/upload` already does) and return a real path or ID; mount `app.mount("/files", StaticFiles(directory="uploads"), name="files")` in `main.py` so the frontend can link directly to `GET /files/{filename}`.

### 4. `/upload/upload` is unused by the ranking flow

It saves one file and returns `{"message", "filename"}` but nothing in `/ranking/rank` calls it, and it doesn't return any parsed data. It's implemented in the service layer (`services/rankingService.ts` → `uploadSingleFile`) but not wired into any page, since there's no clear product use for it today — flagging it here rather than inventing a use for it.

### 5. No analytics/aggregation endpoints

Everything shown on the Dashboard and Analytics pages (average score, skill frequency, education distribution, score histogram) is computed **client-side** from the single `/ranking/rank` response, because the backend exposes no summary endpoints. This is fine for one session, but if you want cross-session analytics shared across your team, that needs to live server-side once persistence (#2) exists.

## What's real vs. what's a workaround

| Feature | Backed by real API | Notes |
|---|---|---|
| Upload JD + resumes, rank | ✅ `POST /ranking/rank` | Broken until bug #1 is fixed server-side |
| Candidate table, scores, skills | ✅ from the same response | |
| Dashboard / Analytics history | ⚠️ `localStorage` | No backend persistence exists (#2) |
| Resume download | ❌ disabled with explanation | No servable file/path returned (#3) |
| Search/sort/filter/pagination | ✅ client-side | Backend doesn't support server-side pagination, and doesn't need to for single-batch results |
| Export CSV | ✅ client-side | Generated from in-memory data |

## Folder structure

```
src/
  components/   layout, common (StatCard, CircularProgress, ProgressBar...), upload, results, charts
  pages/        Landing, Dashboard, Upload, Candidates, Analytics, Settings, Help, NotFound
  context/      AppDataContext (session storage), ThemeContext (dark/light)
  hooks/        useLocalStorage
  services/     api.ts (axios instance), rankingService.ts (the 3 real endpoints)
  types/        index.ts — typed exactly to match backend response shapes
  utils/        format.ts, csvExport.ts
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check (`tsc -b`) then build for production
- `npm run preview` — preview the production build locally
