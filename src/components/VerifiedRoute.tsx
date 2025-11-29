import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { Clock, AlertCircle } from 'lucide-react'
import Button from './Button'
import FullPageLoader from './FullPageLoader'

interface VerifiedRouteProps {
    children: ReactNode
}

export default function VerifiedRoute({ children }: VerifiedRouteProps) {
    const { profile, loading, user } = useAuth()

    if (loading) {
        return <FullPageLoader label="Connexion sécurisée en cours..." />
    }

    // Si pas d'utilisateur, laisser ProtectedRoute gérer la redirection
    if (!user) {
        return null
    }

    // Si pas de profil, rediriger vers l'onboarding
    if (!profile) {
        return <Navigate to="/onboarding" replace />
    }

    // Si le profil est en attente de vérification, permettre l'accès mais afficher un message
    // (on ne bloque plus l'accès, juste un avertissement)
    if (profile.status === 'pending_verification') {
        // Permettre l'accès mais on pourrait afficher un banner
    }

    if (profile.status === 'under_review') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white max-w-md w-full rounded-xl shadow-lg p-8 text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Clock className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Profil en cours de vérification</h2>
                    <p className="text-gray-600 mb-8">
                        Merci d'avoir complété votre profil. Notre équipe examine actuellement vos informations.
                        <br /><br />
                        Cette procédure prend généralement moins de 7 jours. Vous recevrez un email dès que votre compte sera validé.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 mb-6">
                        En attendant, vous pouvez compléter votre profil ou explorer les ressources publiques.
                    </div>
                    <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
                        Retour au tableau de bord
                    </Button>
                </div>
            </div>
        )
    }

    if (profile.status === 'rejected') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white max-w-md w-full rounded-xl shadow-lg p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Profil non validé</h2>
                    <p className="text-gray-600 mb-6">
                        Malheureusement, nous n'avons pas pu valider votre profil. Veuillez vérifier vos informations et réessayer.
                    </p>
                    <Button onClick={() => window.location.href = '/account'}>
                        Modifier mon profil
                    </Button>
                </div>
            </div>
        )
    }

    // If verified, render children
    return <>{children}</>
}
