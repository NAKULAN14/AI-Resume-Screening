import { motion } from 'framer-motion'
import { LuBrainCircuit } from 'react-icons/lu'

const STEPS = [
  'Extracting text from PDFs',
  'Parsing candidate profiles',
  'Generating AI embeddings',
  'Scoring against job description',
  'Ranking candidates',
]

export default function ProcessingAnimation({ activeStep }: { activeStep: number }) {
  return (
    <div className="glass-panel flex flex-col items-center gap-6 px-8 py-14 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-signal-gradient-soft">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-2xl border-2 border-dashed border-signal-cyan/40"
        />
        <LuBrainCircuit className="h-9 w-9 text-signal-cyan" />
        <motion.div
          className="absolute inset-x-2 h-[2px] bg-signal-cyan/70"
          animate={{ top: ['10%', '90%', '10%'] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 8px 1px rgba(51,212,224,0.6)' }}
        />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-ink">AI is screening your candidates</h3>
        <p className="mt-1 text-sm text-ink-dim">This usually takes a few seconds per resume.</p>
      </div>
      <div className="w-full max-w-xs space-y-2.5 text-left">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center gap-3 text-sm">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] transition-colors ${
                i < activeStep
                  ? 'bg-signal-mint text-base-950'
                  : i === activeStep
                  ? 'bg-signal-gradient text-base-950'
                  : 'bg-white/[0.06] text-ink-faint'
              }`}
            >
              {i < activeStep ? '✓' : i + 1}
            </span>
            <span className={i <= activeStep ? 'text-ink' : 'text-ink-faint'}>{step}</span>
            {i === activeStep && (
              <motion.span
                className="ml-auto h-1.5 w-1.5 rounded-full bg-signal-cyan"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
