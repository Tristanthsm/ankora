import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { User, Briefcase } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'
import StudentOnboardingForm from '../components/onboarding/StudentOnboardingForm'
import MentorOnboardingForm from '../components/onboarding/MentorOnboardingForm'

export default function Onboarding() {
  const { user, profile, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState<'student' | 'mentor' | null>(null)
  const [loading, setLoading] = useState(false)

  // If profile is already verified, redirect to marketplace
  if (profile?.status === 'verified') {
    navigate('/marketplace')
    return null
  }

  const handleRoleSelect = async (selectedRole: 'student' | 'mentor') => {
    setRole(selectedRole)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Bienvenue sur ANKORA</h1>
          <p className="mt-2 text-gray-600">Complétez votre profil pour accéder à la plateforme.</p>
        </div>

        {!role ? (
          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className="cursor-pointer hover:border-blue-500 transition-all hover:shadow-md group"
              onClick={() => handleRoleSelect('student')}
            >
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                  <User className="w-8 h-8 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Je suis étudiant</h3>
                <p className="text-gray-500">Je cherche un stage, une alternance ou un mentor pour m'accompagner.</p>
              </div>
            </Card>

            <Card
              className="cursor-pointer hover:border-blue-500 transition-all hover:shadow-md group"
              onClick={() => handleRoleSelect('mentor')}
            >
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors">
                  <Briefcase className="w-8 h-8 text-green-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Je suis mentor / offreur</h3>
                <p className="text-gray-500">Je propose mon expertise, mon réseau ou des opportunités.</p>
              </div>
            </Card>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="mb-8">
              <Button variant="ghost" onClick={() => setRole(null)} className="mb-4">
                ← Retour au choix du rôle
              </Button>
              <h2 className="text-2xl font-bold text-gray-900">
                {role === 'student' ? 'Profil Étudiant' : 'Profil Mentor'}
              </h2>
              <p className="text-gray-500">
                Remplissez les informations ci-dessous pour soumettre votre profil à validation.
              </p>
            </div>

            {role === 'student' ? (
              <StudentOnboardingForm />
            ) : (
              <MentorOnboardingForm />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
