import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { hasRole } from '../../lib/roles'
import { supabase, StudentDetails } from '../../lib/supabase'
import Card from '../../components/Card'
import Button from '../../components/Button'
import { ArrowRight, CheckCircle, Clock, GraduationCap, MapPin, UserPen } from 'lucide-react'

export default function StudentSpace() {
  const { user, profile, loading } = useAuth()
  const navigate = useNavigate()
  const [details, setDetails] = useState<StudentDetails | null>(null)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    if (profile && hasRole(profile, 'student')) {
      const loadDetails = async () => {
        setFetching(true)
        const { data } = await supabase
          .from('student_details')
          .select('*')
          .eq('profile_id', profile.id)
          .single()
        setDetails(data)
        setFetching(false)
      }
      loadDetails()
    }
  }, [profile])

  if (loading) {
    return null
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!profile) {
    return <Navigate to="/onboarding" replace />
  }

  if (!hasRole(profile, 'student')) {
    return <Navigate to="/onboarding?role=student" replace />
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Espace Étudiant</h1>
            <p className="text-gray-600">Accédez rapidement à vos actions clés.</p>
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
                <p className="text-sm text-gray-500">Progression</p>
                <h2 className="text-xl font-semibold text-gray-900">Mini tableau de bord</h2>
              </div>
              <GraduationCap className="h-6 w-6 text-primary-600" />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-blue-50 border-blue-100 shadow-none">
                <p className="text-xs uppercase text-blue-700 font-semibold">Marketplace</p>
                <p className="text-lg font-bold text-blue-900">Explorer les mentors</p>
                <Button variant="link" className="px-0 text-blue-800" onClick={() => navigate('/marketplace')}>
                  Accéder
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Card>

              <Card className="bg-indigo-50 border-indigo-100 shadow-none">
                <p className="text-xs uppercase text-indigo-700 font-semibold">Profil</p>
                <p className="text-lg font-bold text-indigo-900">Modifier mon profil étudiant</p>
                <Button variant="link" className="px-0 text-indigo-800" onClick={() => navigate('/student/profile')}>
                  Mettre à jour
                  <UserPen className="h-4 w-4 ml-1" />
                </Button>
              </Card>

              <Card className="bg-emerald-50 border-emerald-100 shadow-none">
                <p className="text-xs uppercase text-emerald-700 font-semibold">Demandes</p>
                <p className="text-lg font-bold text-emerald-900">Envoyer une nouvelle demande</p>
                <Button variant="link" className="px-0 text-emerald-800" onClick={() => navigate('/student/search')}>
                  Chercher un mentor
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Card>
            </div>
          </Card>

          <Card className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Profil étudiant</h3>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="h-4 w-4" />
              <span>
                {profile.city || 'Ville non renseignée'} • {profile.country || 'Pays non renseigné'}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-800">Objectif</p>
              <p className="text-gray-600 line-clamp-3">{details?.objective || 'Ajoutez vos objectifs pour trouver le bon mentor.'}</p>
            </div>
            <div className="text-xs text-gray-500">
              Dernière mise à jour : {details?.updated_at ? new Date(details.updated_at).toLocaleDateString() : 'N/A'}
            </div>
            {fetching && <p className="text-xs text-gray-400">Chargement des détails...</p>}
          </Card>
        </div>
      </div>
    </div>
  )
}
