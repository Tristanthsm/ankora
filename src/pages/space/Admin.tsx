import { useState } from 'react'
import { ShieldCheck, UserCheck, UserX, RefreshCw, Terminal, Activity, Zap, Lock } from 'lucide-react'
import Button from '../../components/Button'
import { useAuth } from '../../lib/auth'
import { supabase } from '../../lib/supabase'

export default function AdminPage() {
    const { profile, user, refreshProfile } = useAuth()
    const [loading, setLoading] = useState(false)
    const [logs, setLogs] = useState<string[]>([])

    const addLog = (msg: string, type: 'info' | 'error' | 'success' = 'info') => {
        const timestamp = new Date().toLocaleTimeString()
        setLogs(prev => [`[${timestamp}] [${type.toUpperCase()}] ${msg}`, ...prev])
    }

    const updateRole = async (newRole: string) => {
        if (!user) {
            addLog("No user found", "error")
            return
        }
        setLoading(true)
        addLog(`Initiating role update to: ${newRole}...`)

        try {
            // FORCE LOCAL OVERRIDE FIRST
            if (newRole.includes('mentor')) {
                localStorage.setItem('ankora_demo_role', 'student,mentor')
            } else {
                localStorage.removeItem('ankora_demo_role')
            }

            // FIRE AND FORGET DB UPDATE (Don't await it to prevent hanging)
            supabase
                .from('profiles')
                .update({ role: newRole })
                .eq('user_id', user.id)
                .then(({ error }) => {
                    if (error) console.warn("Background DB update failed (expected in test mode):", error)
                })

            addLog("Local override applied.", "success")
            addLog("Refreshing page...", "info")

            // Reload to apply changes instantly
            setTimeout(() => window.location.reload(), 500)

        } catch (error: any) {
            console.error("UpdateRole error:", error)
            addLog(`ERROR: ${error.message}`, "error")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-heading font-bold text-gray-900 tracking-tight">Centre de Contrôle</h1>
                        <p className="text-gray-500 mt-2 text-lg">Gérez vos permissions et simulez les différents rôles utilisateur.</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm text-sm font-medium text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Environnement Dev
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column: Role Management */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Current Status Card */}
                        <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-xl shadow-blue-900/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <ShieldCheck className="w-32 h-32 text-blue-600 transform rotate-12" />
                            </div>

                            <div className="relative z-10">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                                    <Activity className="w-3 h-3" /> État Actuel
                                </span>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
                                    {profile?.role === 'student,mentor' ? 'Mentorat Activé' : 'Compte Étudiant'}
                                </h2>
                                <p className="text-gray-500 mb-8 max-w-md">
                                    Votre compte possède actuellement les privilèges associés au rôle <strong className="text-gray-900">{profile?.role || 'Aucun'}</strong>.
                                </p>

                                <div className="flex gap-4">
                                    <Button variant="outline" onClick={() => window.location.reload()} disabled={loading}>
                                        <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                                        Sync. Données
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Role Switcher Grid */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Card: Student */}
                            <button
                                onClick={() => updateRole('student')}
                                disabled={loading}
                                className="relative overflow-hidden bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all text-left hover:border-blue-200 group"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                <div className="relative z-10">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <UserX className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Mode Étudiant</h3>
                                    <p className="text-sm text-gray-500">Réinitialise les droits. Vue standard sans accès mentor.</p>
                                </div>
                            </button>

                            {/* Card: Mentor */}
                            <button
                                onClick={() => updateRole('student,mentor')}
                                disabled={loading}
                                className="relative overflow-hidden bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all text-left hover:border-purple-200 group"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                <div className="relative z-10">
                                    <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Activer Mentor</h3>
                                    <p className="text-sm text-gray-500">Simule la validation réussie. Débloque dashboard et outils.</p>
                                </div>
                            </button>
                        </div>

                    </div>

                    {/* Right Column: Logs & Security */}
                    <div className="space-y-6">
                        {/* Terminal Box */}
                        <div className="bg-[#1e1e1e] rounded-[24px] p-6 text-gray-300 font-mono text-xs shadow-2xl relative overflow-hidden min-h-[300px] flex flex-col">
                            <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-3">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Terminal className="w-4 h-4" />
                                    <span>System Output</span>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center">●</div> {/* Fake dots */}
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center">●</div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">●</div>
                                </div>
                            </div>

                            <div className="space-y-2 overflow-y-auto flex-1 max-h-[400px]">
                                {logs.length === 0 && (
                                    <span className="text-gray-600 italic">Waiting for specific actions...</span>
                                )}
                                {logs.map((log, i) => {
                                    const isError = log.includes("[ERROR]")
                                    const isSuccess = log.includes("[SUCCESS]")
                                    return (
                                        <div key={i} className={`${isError ? 'text-red-400' : isSuccess ? 'text-green-400' : 'text-blue-300'}`}>
                                            {log}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="bg-orange-50 rounded-[20px] p-5 border border-orange-100 flex gap-4 items-start">
                            <Lock className="w-5 h-5 text-orange-600 mt-1 shrink-0" />
                            <div>
                                <h4 className="font-bold text-orange-800 text-sm">Restriction de Sécurité</h4>
                                <p className="text-xs text-orange-700 mt-1 leading-relaxed">
                                    Si les boutons échouent (Unauthorized), c'est une sécurité normale de la base de données. Utilisez le script SQL d'administration pour forcer les droits si nécessaire.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
