import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Circle, Clock, ArrowRight, FileText, Briefcase } from 'lucide-react'
import Button from '../../../components/Button'
import { useAuth } from '../../../lib/auth'
import { supabase } from '../../../lib/supabase'

type ApplicationStep = {
    id: number
    label: string
    status: 'completed' | 'current' | 'pending'
    description?: string
}

type ApplicationState = 'idle' | 'submitted' | 'reviewing' | 'approved' | 'rejected'

export default function MentorApplicationStatus() {
    const { profile } = useAuth()
    const navigate = useNavigate()

    // Derive state from Profile
    const getApplicationState = (): ApplicationState => {
        if (!profile) return 'idle'
        if (profile.role === 'mentor' || (Array.isArray(profile.role) && profile.role.includes('mentor'))) return 'approved'

        switch (profile.status) {
            case 'verified': return 'approved'
            case 'rejected': return 'rejected'
            case 'pending_verification':
            case 'under_review': return 'reviewing'
            default: return 'idle'
        }
    }

    const applicationState = getApplicationState()

    const steps: ApplicationStep[] = [
        { id: 1, label: 'Informations Personnelles', status: 'completed', description: 'Identité et coordonnées vérifiées' },
        { id: 2, label: 'Profil Mentor', status: 'completed', description: 'Expérience et bio renseignées' },
        { id: 3, label: 'Vérification', status: applicationState === 'reviewing' ? 'current' : applicationState === 'approved' ? 'completed' : 'pending', description: 'Validation manuelle par notre équipe' },
        { id: 4, label: 'Activation', status: applicationState === 'approved' ? 'completed' : 'pending', description: 'Accès aux outils mentor' },
    ]

    if (applicationState === 'idle') {
        return (
            <div className="max-w-3xl mx-auto pt-10 pb-20">
                <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                        <Briefcase className="h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Devenez Mentor Ankora</h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
                        Partagez votre expertise, aidez la nouvelle génération et générez des revenus complémentaires.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-10 text-left">
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <h3 className="font-semibold text-gray-900 mb-2">Impact Réel</h3>
                            <p className="text-sm text-gray-600">Aidez concrètement des étudiants à réussir leur carrière.</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <h3 className="font-semibold text-gray-900 mb-2">Revenus</h3>
                            <p className="text-sm text-gray-600">Fixez vos tarifs et recevez vos paiements de manière sécurisée.</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <h3 className="font-semibold text-gray-900 mb-2">Flexibilité</h3>
                            <p className="text-sm text-gray-600">Gérez vos disponibilités et votre charge de travail.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 justify-center items-center">
                        <Button size="lg" onClick={() => navigate('/space/mentor-application/apply')}>
                            Commencer ma candidature <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                        <button
                            type="button"
                            onClick={async () => {
                                if (!profile?.id) return
                                try {
                                    // 1. FORCE LOCALE IMMÉDIATE (No wait)
                                    localStorage.setItem('ankora_demo_role', 'student,mentor')

                                    // 2. Fire-and-forget DB update (on n'attend pas)
                                    supabase
                                        .from('profiles')
                                        .update({ role: 'student,mentor' })
                                        .eq('id', profile.id)
                                        .then(({ error }) => {
                                            if (error) console.error("DB Update BG Error:", error)
                                        })

                                    // 3. Force refresh immédiat
                                    setTimeout(() => window.location.reload(), 100)
                                } catch (e) {
                                    console.error("Erreur devenire mentor:", e)
                                    window.location.reload()
                                }
                            }}
                            className="text-xs text-purple-400 hover:text-purple-600 underline mt-2"
                        >
                            ⚡ Devenir Mentor (Instant / Demo)
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto pt-6 pb-20 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Ma Candidature
                    </h1>
                    <p className="text-gray-500">
                        Suivez l'avancement de votre demande.
                    </p>
                </div>
            </div>

            {/* Status Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">

                {applicationState === 'reviewing' && (
                    <div className="flex flex-col items-center text-center py-6">
                        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4 animate-pulse">
                            <Clock className="h-8 w-8 text-amber-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Candidature en cours d'examen</h2>
                        <p className="text-gray-600 max-w-md">
                            Notre équipe examine actuellement votre profil. Nous vérifions vos informations pour garantir la qualité de notre communauté.
                        </p>
                        <p className="text-sm text-gray-500 mt-4">Délai estimé : 24-48h</p>
                    </div>
                )}

                {applicationState === 'approved' && (
                    <div className="flex flex-col items-center text-center py-6">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Félicitations ! Vous êtes Mentor.</h2>
                        <p className="text-gray-600 max-w-md mb-6">
                            Votre profil a été validé. Vous pouvez maintenant configurer vos disponibilités et accepter vos premiers étudiants.
                        </p>
                        <Button onClick={() => navigate('/space/mentor-profile')}>
                            Configurer mon profil public
                        </Button>
                    </div>
                )}

                {applicationState === 'rejected' && (
                    <div className="flex flex-col items-center text-center py-6">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                            <FileText className="h-8 w-8 text-red-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Candidature non retenue</h2>
                        <p className="text-gray-600 max-w-md mb-6">
                            Malheureusement, votre profil ne correspond pas exactement à nos critères actuels. Vous avez reçu un email détaillant les raisons.
                        </p>
                        <Button variant="outline">Contacter le support</Button>
                    </div>
                )}

            </div>

            {/* Application Summary (If Submitted) */}
            {(applicationState === 'reviewing' || applicationState === 'approved') && (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900">Récapitulatif de votre dossier</h3>
                        {/* <Button variant="ghost" size="sm" onClick={() => window.location.href = '/space/mentor-application/apply'}>Modifier</Button> */}
                    </div>
                    <div className="p-6 grid gap-6 md:grid-cols-2 text-sm">
                        <div className="space-y-4">
                            <div>
                                <span className="text-gray-500 block mb-1">Poste & Entreprise</span>
                                <span className="font-medium text-gray-900">{profile?.position} chez {profile?.company}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 block mb-1">Expertise</span>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    {/* We need mentorDetails here. Assuming it is fetched? We need to use useAuth() fully. */}
                                    {/* Note: I need to update the useAuth hook usage in this file to get mentorDetails */}
                                    <span className="text-gray-400 italic">Détails chargés depuis le profil...</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <span className="text-gray-500 block mb-1">Statut</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                    {applicationState === 'reviewing' ? 'En attente de validation' : 'Validé'}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500 block mb-1">Documents</span>
                                <span className="flex items-center gap-2 text-gray-700">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    CV reçu
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-6">Étapes de validation</h3>
                <div className="relative">
                    {steps.map((step, index) => (
                        <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
                            {/* Vertical Line */}
                            {index !== steps.length - 1 && (
                                <div className={`absolute left-[19px] top-8 bottom-0 w-0.5 ${step.status === 'completed' ? 'bg-blue-600' : 'bg-gray-100'}`} />
                            )}

                            {/* Icon */}
                            <div className="relative z-10 flex-shrink-0">
                                {step.status === 'completed' ? (
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/20">
                                        <CheckCircle2 className="h-5 w-5 text-white" />
                                    </div>
                                ) : step.status === 'current' ? (
                                    <div className="w-10 h-10 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/10">
                                        <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center">
                                        <Circle className="h-5 w-5 text-gray-300" />
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="pt-2">
                                <span className={`text-xs font-semibold uppercase tracking-wider ${step.status === 'completed' ? 'text-blue-600' :
                                    step.status === 'current' ? 'text-blue-600' : 'text-gray-400'
                                    }`}>
                                    Étape 0{step.id}
                                </span>
                                <h4 className={`text-lg font-bold mt-1 ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-900'
                                    }`}>{step.label}</h4>
                                {step.description && (
                                    <p className="text-gray-500 mt-1 text-sm">{step.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
