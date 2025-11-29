import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { hasRole } from '../lib/roles'
import Button from '../components/Button'
import StudentDashboard from '../components/dashboard/StudentDashboard'
import MentorDashboard from '../components/dashboard/MentorDashboard'
import { LogOut, User } from 'lucide-react'

/**
 * Page Dashboard principale
 * Affiche une interface différenciée selon le rôle de l'utilisateur
 * Redirige vers l'onboarding si le profil n'est pas complété
 */
export default function Dashboard() {
  const { user, profile, signOut, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  // Rediriger vers l'onboarding si pas de profil
  useEffect(() => {
    if (!authLoading && user && !profile) {
      navigate('/onboarding')
    }
  }, [user, profile, authLoading, navigate])

  if (authLoading || !user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">ANKORA Global Connect</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="h-5 w-5" />
                <span className="font-medium">{profile.full_name || user.email}</span>
                <span className="text-sm text-gray-500">
                  ({hasRole(profile, 'student') && hasRole(profile, 'mentor')
                    ? 'Étudiant & Mentor'
                    : hasRole(profile, 'student')
                      ? 'Étudiant'
                      : 'Mentor'})
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu du dashboard selon le rôle */}
      <main className="container-custom py-8">
        {hasRole(profile, 'student') ? (
          <StudentDashboard profile={profile} />
        ) : (
          <MentorDashboard profile={profile} />
        )}
      </main>
    </div>
  )
}

