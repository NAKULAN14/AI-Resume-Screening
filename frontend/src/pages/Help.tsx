import { LuCircleHelp } from 'react-icons/lu'

const FAQS = [
  {
    q: 'What file types can I upload?',
    a: 'Only PDF files. The backend rejects anything else with a 400 error for both the job description and every resume.',
  },
  {
    q: 'Where is my ranking history stored?',
    a: 'The FastAPI backend does not persist rankings to a database — each call to /ranking/rank is stateless and returns results in-memory only. ResumeIQ stores your last 20 sessions in this browser\u2019s local storage so your dashboard and analytics have something to show between visits.',
  },
  {
    q: 'Why can\u2019t I download a candidate\u2019s resume?',
    a: 'The backend only returns the original filename of each resume, not a URL or file it can serve back. To enable downloads, the backend needs a static file route (e.g. mounting the uploads folder) and to actually save resumes during /ranking/rank.',
  },
  {
    q: 'How is the final score calculated?',
    a: 'final_score = similarity \u00d7 30% + skill_score \u00d7 35% + education_score \u00d7 5% + experience_score \u00d7 15% + eligibility_score \u00d7 15%, computed entirely server-side in services/ranking_service.py.',
  },
]

export default function Help() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Help &amp; FAQ</h2>
        <p className="text-sm text-ink-dim">Answers grounded in exactly what the backend does today.</p>
      </div>

      <div className="space-y-3">
        {FAQS.map((f) => (
          <details key={f.q} className="glass-panel group p-5 open:bg-white/[0.035]">
            <summary className="flex cursor-pointer items-center gap-3 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
              <LuCircleHelp className="h-4 w-4 shrink-0 text-signal-cyan" />
              {f.q}
            </summary>
            <p className="mt-3 pl-7 text-sm leading-relaxed text-ink-dim">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="glass-panel p-5">
        <h3 className="font-display text-sm font-semibold text-ink">Still stuck?</h3>
        <p className="mt-2 text-sm text-ink-dim">
          Check the <span className="font-mono text-xs text-ink">README.md</span> shipped with this frontend for the
          full list of backend gaps and the exact fixes needed.
        </p>
      </div>
    </div>
  )
}
