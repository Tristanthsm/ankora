import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

function FloatingPaths({ position }: { position: number }) {
  const paths = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${
          216 - i * 6
        } ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${
          875 - i * 6
        } ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
        duration: 20 + (i % 12),
      })),
    [position]
  )

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-slate-950" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            className="animated-path"
            style={{ strokeDasharray: '12 10', animationDuration: `${path.duration}s` }}
          />
        ))}
      </svg>
    </div>
  )
}

interface BackgroundPathsProps {
  title?: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
}

export function BackgroundPaths({
  title = 'Background Paths',
  subtitle = "Une mise en avant immersive dès l'arrivée sur le site.",
  ctaLabel = "Découvrir l'accompagnement",
  ctaHref = '/register',
}: BackgroundPathsProps) {
  const words = title.split(' ')

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container-custom text-center py-16">
        <div className="hero-fade mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="h-2 w-2 rounded-full bg-secondary-500" aria-hidden />
            <span>Mentorat international personnalisé</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter leading-tight text-gray-900">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split('').map((letter, letterIndex) => (
                  <span
                    key={`${wordIndex}-${letterIndex}`}
                    className="letter-animated bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600"
                    style={{ animationDelay: `${wordIndex * 0.1 + letterIndex * 0.03}s` }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 hero-fade" style={{ animationDelay: '0.3s' }}>
            {subtitle}
          </p>

          <div className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link to={ctaHref}>
              <Button
                variant="ghost"
                className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md bg-white/95 hover:bg-white/100 text-black transition-all duration-300 group-hover:-translate-y-0.5 border border-black/10 hover:shadow-md"
              >
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">{ctaLabel}</span>
                <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                  →
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BackgroundPaths
