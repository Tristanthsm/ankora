import React from 'react'
import { Link } from 'react-router-dom'

interface AuthLayoutProps {
    children: React.ReactNode
    title: string
    subtitle: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <main className="relative min-h-screen overflow-hidden bg-white">
            {/* Background Elements */}
            <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(0,0,0,0.03)_0,rgba(0,0,0,0.01)_50%,rgba(0,0,0,0)_80%)] absolute top-0 right-0 h-[320px] w-[140px] -translate-y-[87.5px] rounded-full" />
            <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,0.02)_0,rgba(0,0,0,0)_100%)] absolute bottom-0 left-0 h-[320px] w-[320px] translate-y-[87.5px] rounded-full" />

            <div className="container-custom relative z-10 flex min-h-screen flex-col items-center justify-center py-12">
                <div className="mb-8 text-center">
                    <Link to="/" className="inline-block mb-8 group">
                        <img
                            src="/ankora-logo.png"
                            alt="ANKORA Global Connect"
                            className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
                        />
                    </Link>
                    <h1 className="font-heading text-2xl font-bold tracking-wide text-gray-900">
                        {title}
                    </h1>
                    <p className="text-gray-500 text-base">
                        {subtitle}
                    </p>
                </div>

                {children}
            </div>
        </main>
    )
}
