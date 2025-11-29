import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { User, Briefcase } from 'lucide-react'
import Button from '../components/Button'
import StudentOnboardingForm from '../components/onboarding/StudentOnboardingForm'
import MentorOnboardingForm from '../components/onboarding/MentorOnboardingForm'

export default function Onboarding() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState<'student' | 'mentor' | null>(null)

  // If profile is already verified, redirect to marketplace
  if (profile?.status === 'verified') {
    navigate('/marketplace')
    return null
  }

  const handleRoleSelect = async (selectedRole: 'student' | 'mentor') => {
    console.log('Role selected:', selectedRole)
    setRole(selectedRole)
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-green-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Bienvenue sur <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">ANKORA</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pour commencer, dites-nous quel est votre rôle. Cette étape nous permet de personnaliser votre expérience.
          </p>
        </div>

        {!role ? (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Student Card */}
            <div
              onClick={() => handleRoleSelect('student')}
              className="group relative bg-white rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 hover:border-blue-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative z-10 flex flex-col items-center text-center h-full">
                <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-blue-200">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Je suis étudiant</h3>
                <p className="text-gray-500 mb-6 flex-grow">
                  Je cherche un stage, une alternance ou un mentor pour booster ma carrière et développer mon réseau.
                </p>
                <div className="w-full py-3 px-6 rounded-xl bg-gray-50 text-blue-600 font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  Commencer en tant qu'étudiant
                </div>
              </div>
            </div>

            {/* Mentor Card */}
            <div
              onClick={() => handleRoleSelect('mentor')}
              className="group relative bg-white rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 hover:border-green-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative z-10 flex flex-col items-center text-center h-full">
                <div className="w-24 h-24 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-green-200">
                  <Briefcase className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Je suis mentor / offreur</h3>
                <p className="text-gray-500 mb-6 flex-grow">
                  Je souhaite partager mon expertise, proposer des opportunités ou aider la nouvelle génération.
                </p>
                <div className="w-full py-3 px-6 rounded-xl bg-gray-50 text-green-600 font-semibold group-hover:bg-green-600 group-hover:text-white transition-colors">
                  Commencer en tant que mentor
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50/50 border-b border-gray-100 p-6 flex items-center justify-between">
              <Button variant="ghost" onClick={() => setRole(null)} className="text-gray-500 hover:text-gray-900">
                ← Changer de rôle
              </Button>
              <div className="text-sm font-medium text-gray-500">
                Étape 2/2 : Vos informations
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {role === 'student' ? 'Profil Étudiant' : 'Profil Mentor'}
                </h2>
                <p className="text-gray-500">
                  Remplissez ce formulaire pour valider votre inscription.
                </p>
              </div>

              {role === 'student' ? (
                <StudentOnboardingForm />
              ) : (
                <MentorOnboardingForm />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
