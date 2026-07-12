import { motion } from 'framer-motion'

const COLORS = ['#6C6CF4', '#33D4E0', '#B26CF4', '#3CE0A6', '#F2B84B']

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export default function Confetti({ count = 60 }: { count?: number }) {
  const pieces = Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: randomBetween(-40, 40),
    rotate: randomBetween(-180, 180),
    delay: randomBetween(0, 0.3),
    duration: randomBetween(1.4, 2.2),
    color: COLORS[i % COLORS.length],
    left: randomBetween(0, 100),
    size: randomBetween(6, 11),
  }))

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 1, y: -20, x: 0, rotate: 0 }}
          animate={{ opacity: 0, y: '100vh', x: p.x, rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size * 0.4,
            background: p.color,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  )
}
