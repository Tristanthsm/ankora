import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface AuthLayoutProps {
    children: React.ReactNode
    title: string
    subtitle: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    useEffect(() => {
        const viewer = document.querySelector('spline-viewer');
        if (viewer && viewer.shadowRoot) {
            const style = document.createElement('style');
            style.textContent = `
                #logo { display: none !important; }
                canvas { cursor: auto !important; }
            `;
            viewer.shadowRoot.appendChild(style);
        }
    }, []);

    return (
        <main className="fixed inset-0 w-full bg-white overflow-hidden flex font-sans">
            {/* Left Side - Form Content */}
            <div className="w-full lg:w-1/2 flex flex-col relative h-full overflow-y-auto">
                {/* Background Decor */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
                <div className="absolute inset-0 z-0 bg-gradient-to-tr from-blue-50/50 via-transparent to-transparent"></div>

                {/* Content Container */}
                <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 relative z-10">
                    <div className="w-full max-w-[440px] space-y-8">
                        <div className="text-center">
                            <Link to="/" className="inline-block mb-8 group relative">
                                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <img
                                    src="/ankora-logo.png"
                                    alt="ANKORA Global Connect"
                                    className="h-28 w-auto object-contain relative transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                                />
                            </Link>
                            <h1 className="font-heading text-4xl font-bold tracking-tight text-gray-900 mb-3">
                                {title}
                            </h1>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                {subtitle}
                            </p>
                        </div>

                        {children}
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 p-6 text-center">
                    <p className="text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} Ankora Global Connect.
                        <span className="mx-2">&middot;</span>
                        <Link to="/privacy" className="hover:text-gray-600 transition-colors">Confidentialité</Link>
                        <span className="mx-2">&middot;</span>
                        <Link to="/terms" className="hover:text-gray-600 transition-colors">Conditions</Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Visual (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black items-center justify-center overflow-hidden pointer-events-none">
                <div className="absolute inset-0">
                    <spline-viewer url="https://prod.spline.design/gKsclxAw8RdQiCoC/scene.splinecode"></spline-viewer>
                </div>
                {/* Gradient overlay for better blend */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20"></div>
            </div>
        </main>
    )
}
