import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight, BarChart3, Briefcase, CheckCircle, Clock, MessageSquare, UserPen } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import { useAuth } from '../../lib/auth'
import { hasRole } from '../../lib/roles'
import { MentorDetails, supabase } from '../../lib/supabase'

export default function MentorSpace() {
  const { user, profile, loading } = useAuth()
  const navigate = useNavigate()
  const [details, setDetails] = useState<MentorDetails | null>(null)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    if (profile && hasRole(profile, 'mentor')) {
      const loadDetails = async () => {
        setFetching(true)
        const { data } = await supabase
          .from('mentor_details')
          .select('*')
          .eq('profile_id', profile.id)
          .single()
        setDetails(data)
        setFetching(false)
      }
      loadDetails()
    }
  }, [profile])

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (!profile) return <Navigate to="/onboarding" replace />
  if (!hasRole(profile, 'mentor')) return <Navigate to="/onboarding?role=mentor" replace />

  const statusDisplay = {
    verified: {
      label: 'Profil vérifié',
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      color: 'text-green-700 bg-green-50',
    },
    under_review: {
      label: 'Profil en cours de vérification',
      icon: <Clock className="h-5 w-5 text-amber-600" />,
      color: 'text-amber-700 bg-amber-50',
    },
    pending_verification: {
      label: 'En attente de vérification',
      icon: <Clock className="h-5 w-5 text-gray-500" />,
      color: 'text-gray-700 bg-gray-100',
    },
    rejected: {
      label: 'Profil rejeté',
      icon: <CheckCircle className="h-5 w-5 text-red-600" />,
      color: 'text-red-700 bg-red-50',
    },
  }[profile.status] || {
    label: 'En attente de vérification',
    icon: <Clock className="h-5 w-5 text-gray-500" />,
    color: 'text-gray-700 bg-gray-100',
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container-custom space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Espace connecté</p>
            <h1 className="text-3xl font-bold text-gray-900">Espace Offreur / Mentor</h1>
            <p className="text-gray-600">Suivez vos interactions avec les étudiants.</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${statusDisplay.color}`}>
            {statusDisplay.icon}
            <span>{statusDisplay.label}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Vue d’ensemble</p>
                <h2 className="text-xl font-semibold text-gray-900">Activité mentor</h2>
              </div>
              <Briefcase className="h-6 w-6 text-primary-600" />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-blue-50 border-blue-100 shadow-none">
                <p className="text-xs uppercase text-blue-700 font-semibold">Demandes</p>
                <p className="text-lg font-bold text-blue-900">{details?.max_students_per_month || 3} slots / mois</p>
                <Button variant="link" className="px-0 text-blue-800" onClick={() => navigate('/mentor/requests')}>
                  Voir les demandes
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Card>

              <Card className="bg-indigo-50 border-indigo-100 shadow-none">
                <p className="text-xs uppercase text-indigo-700 font-semibold">Profil</p>
                <p className="text-lg font-bold text-indigo-900">Mettre à jour mes infos</p>
                <Button variant="link" className="px-0 text-indigo-800" onClick={() => navigate('/mentor/profile')}>
                  Modifier
                  <UserPen className="h-4 w-4 ml-1" />
                </Button>
              </Card>

              <Card className="bg-emerald-50 border-emerald-100 shadow-none">
                <p className="text-xs uppercase text-emerald-700 font-semibold">Messages</p>
                <p className="text-lg font-bold text-emerald-900">Répondre aux étudiants</p>
                <Button variant="link" className="px-0 text-emerald-800" onClick={() => navigate('/messages')}>
                  Ouvrir la messagerie
                  <MessageSquare className="h-4 w-4 ml-1" />
                </Button>
              </Card>
            </div>
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">Statut mentor</h3>
            </div>
            <div className="text-sm text-gray-700 space-y-2">
              <p className="flex items-center justify-between">
                <span>Vérification</span>
                <span className="font-semibold capitalize">{statusDisplay.label}</span>
              </p>
              <p className="flex items-center justify-between">
                <span>Demandes reçues</span>
                <span className="font-semibold">{details ? details.max_students_per_month || 3 : '—'}</span>
              </p>
              <p className="flex items-center justify-between">
                <span>Domaines</span>
                <span className="font-semibold">{details?.expertise_sectors?.join(', ') || 'À définir'}</span>
              </p>
            </div>
            {fetching && <p className="text-xs text-gray-400">Chargement des informations...</p>}
          </Card>
        </div>
      </div>
    </div>
  )
}
