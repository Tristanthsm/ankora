import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

interface AuthLayoutProps {
    children: React.ReactNode
    title: string
    subtitle: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <main className="relative min-h-screen overflow-hidden bg-white">
            <div className="relative flex min-h-screen flex-col justify-center p-4">
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
    )
}
