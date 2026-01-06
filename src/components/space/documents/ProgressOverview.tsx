import { CheckCircle2, AlertCircle } from 'lucide-react'

interface ProgressOverviewProps {
    completionPercentage: number
    pendingCount: number
    missingCount: number
}

export function ProgressOverview({ completionPercentage, pendingCount, missingCount }: ProgressOverviewProps) {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <div className="relative z-10 grid gap-6 md:grid-cols-[1fr,auto]">
                <div className="space-y-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Documents & Vérifications</h1>
                        <p className="text-gray-500 mt-1">
                            Gérez vos justificatifs pour compléter votre profil et accéder aux opportunités.
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                            </span>
                            {missingCount} documents manquants
                        </div>
                        {pendingCount > 0 && (
                            <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                                <ClockIcon className="w-3.5 h-3.5" />
                                {pendingCount} en révision
                            </div>
                        )}
                    </div>
                </div>

                <div className="min-w-[200px] flex flex-col justify-center">
                    <div className="flex items-end justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progression globale</span>
                        <span className="text-2xl font-bold text-blue-600">{completionPercentage}%</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${completionPercentage}%` }}
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-right">
                        Plus que quelques étapes !
                    </p>
                </div>
            </div>
        </div>
    )
}

function ClockIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
    )
}
