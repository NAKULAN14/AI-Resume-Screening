interface SkillTagProps {
  skill: string
  matched?: boolean
}

export default function SkillTag({ skill, matched }: SkillTagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
        matched
          ? 'border-signal-cyan/30 bg-signal-cyan/10 text-signal-cyan'
          : 'border-line-soft bg-white/[0.03] text-ink-dim'
      }`}
    >
      {skill}
    </span>
  )
}
