import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LuArrowRight, LuScanLine, LuSparkles, LuTarget, LuShieldCheck, LuGauge } from 'react-icons/lu'

const FEATURES = [
  {
    icon: LuTarget,
    title: 'Embedding-based matching',
    desc: 'Every resume is compared against the job description using sentence-transformer embeddings, not keyword guesswork.',
  },
  {
    icon: LuGauge,
    title: 'Five-factor scoring',
    desc: 'Similarity, skills, education, experience and eligibility combine into one transparent final score per candidate.',
  },
  {
    icon: LuShieldCheck,
    title: 'Built for your pipeline',
    desc: 'Upload a JD once, drop in every resume you have, and get a ranked shortlist in one pass.',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden">
      <header className="relative z-10 flex items-center justify-between px-6 py-6 lg:px-12">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-signal-gradient">
            <LuScanLine className="h-5 w-5 text-base-950" />
          </div>
          <span className="font-display text-base font-semibold text-ink">ResumeIQ</span>
        </div>
        <Link to="/dashboard" className="btn-secondary text-sm">
          Open dashboard
        </Link>
      </header>

      <section className="relative px-6 pb-24 pt-16 lg:px-12 lg:pt-24">
        <div className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-signal-indigo/20 blur-[120px]" />
        <div className="pointer-events-none absolute -left-20 top-40 h-[360px] w-[360px] rounded-full bg-signal-cyan/15 blur-[110px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-line-soft bg-white/[0.03] px-4 py-1.5 text-xs text-ink-dim"
          >
            <LuSparkles className="h-3.5 w-3.5 text-signal-cyan" />
            AI-powered candidate screening
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl lg:text-6xl"
          >
            Screen every resume against{' '}
            <span className="bg-signal-gradient bg-clip-text text-transparent">one job description</span> in seconds
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-5 max-w-xl text-base text-ink-dim"
          >
            Upload a job description and every resume in your pipeline. ResumeIQ ranks candidates using AI embeddings,
            skill matching, education and experience fit — so your shortlist builds itself.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to="/upload" className="btn-primary px-6 py-3 text-sm">
              Start ranking candidates
              <LuArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/dashboard" className="btn-secondary px-6 py-3 text-sm">
              View dashboard
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <div className="glass-panel overflow-hidden p-2">
            <div className="rounded-xl2 bg-base-850 p-6">
              <div className="flex items-center gap-2 pb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-signal-rose/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-signal-amber/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-signal-mint/60" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['Similarity', 'Skill match', 'Final score'].map((label, i) => (
                  <div key={label} className="rounded-xl border border-line-soft bg-white/[0.02] p-4">
                    <p className="section-eyebrow">{label}</p>
                    <p className="mt-2 font-display text-2xl font-semibold text-ink">
                      {[87, 92, 89][i]}
                      <span className="text-sm text-ink-faint">%</span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { name: 'Priya Sharma', score: 94 },
                  { name: 'Rohan Iyer', score: 88 },
                  { name: 'Ananya Das', score: 81 },
                ].map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center justify-between rounded-lg border border-line-soft bg-white/[0.02] px-4 py-2.5 text-sm"
                  >
                    <span className="text-ink-dim">{c.name}</span>
                    <span className="font-mono font-semibold text-signal-cyan">{c.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative px-6 pb-28 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-panel-hover p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal-gradient-soft text-signal-cyan">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
