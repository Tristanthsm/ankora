import { useMemo, type ReactNode } from 'react'

interface AnimatedPath {
  id: number
  d: string
  width: number
  delay: number
}

function FloatingPaths({ position }: { position: number }) {
  const paths = useMemo<AnimatedPath[]>(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${
          312 - i * 5 * position
        } ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 -
          i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
        delay: i * 0.25,
      })),
    [position]
  )

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-slate-950 dark:text-white" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            className="animated-path"
            style={{
              animationDelay: `${path.delay}s`,
              strokeDasharray: '280',
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export function BackgroundPaths({ children }: { children?: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">{children}</div>
    </div>
  )
}
