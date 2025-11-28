import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
            <div className="bg-muted/60 relative hidden h-full flex-col border-r p-10 lg:flex bg-gray-50">
                <div className="from-white absolute inset-0 z-10 bg-gradient-to-t to-transparent" />
                <Link to="/" className="z-10 flex items-center gap-2 mb-8">
                    <img
                        src="/ankora-logo.png"
                        alt="ANKORA"
                        className="h-8 w-auto object-contain"
                    />
                </Link>
                <div className="z-10 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-xl font-medium text-gray-800">
                            &ldquo;Cette plateforme m'a permis de gagner un temps précieux et de servir mes clients plus rapidement que jamais.&rdquo;
                        </p>
                        <footer className="font-mono text-sm font-semibold text-gray-600">
                            ~ Ali Hassan
                        </footer>
                    </blockquote>
                </div>
                <div className="absolute inset-0">
                    <FloatingPaths position={1} />
                    <FloatingPaths position={-1} />
                </div>
            </div>
            <div className="relative flex min-h-screen flex-col justify-center p-4 bg-white">
                <div
                    aria-hidden
                    className="absolute inset-0 isolate contain-strict -z-10 opacity-60"
                >
                    <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(0,0,0,0.06)_0,rgba(0,0,0,0.02)_50%,rgba(0,0,0,0.01)_80%)] absolute top-0 right-0 h-[320px] w-[140px] -translate-y-[87.5px] rounded-full" />
                    <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,0.04)_0,rgba(0,0,0,0.01)_80%,transparent_100%)] absolute top-0 right-0 h-[320px] w-[60px] translate-x-[5%] -translate-y-[50%] rounded-full" />
                    <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,0.04)_0,rgba(0,0,0,0.01)_80%,transparent_100%)] absolute top-0 right-0 h-[320px] w-[60px] -translate-y-[87.5px] rounded-full" />
                </div>
                <div className="absolute top-7 left-5">
                    <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                        <ChevronLeft className='size-4 me-2' />
                        Retour
                    </Link>
                </div>
                <div className="mx-auto space-y-4 sm:w-[400px] w-full">
                    <div className="flex items-center gap-2 lg:hidden justify-center mb-8">
                        <img
                            src="/ankora-logo.png"
                            alt="ANKORA"
                            className="h-10 w-auto object-contain"
                        />
                    </div>
                    <div className="flex flex-col space-y-1 text-center lg:text-left">
                        <h1 className="font-heading text-2xl font-bold tracking-wide text-gray-900">
                            {title}
                        </h1>
                        <p className="text-gray-500 text-base">
                            {subtitle}
                        </p>
                    </div>

                    {children}

                </div>
            </div>
        </main>
    );
}

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
            } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
            } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
            } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="pointer-events-none absolute inset-0">
            <svg
                className="h-full w-full text-slate-950 dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'linear',
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}
