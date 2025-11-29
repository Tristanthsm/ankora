import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import SectionHeader from '../../components/SectionHeader'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import { useAuth } from '../../lib/auth'
import { hasRole } from '../../lib/roles'
import StudentOnboardingForm from '../../components/onboarding/StudentOnboardingForm'
import { GraduationCap, CheckCircle, AlertCircle } from 'lucide-react'

export default function StudentDashboardPage() {
  const { profile, loading } = useAuth()

  // Afficher un loader pendant le chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  // Si pas de profil ou pas le rôle étudiant, afficher le formulaire d'onboarding
  const needsOnboarding = !profile || !hasRole(profile, 'student')

  if (needsOnboarding) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Bienvenue dans votre espace étudiant
              </h2>
              <p className="text-gray-700 mb-4">
                Pour accéder à toutes les fonctionnalités, complétez votre profil étudiant. 
                Cela nous permet de vous mettre en relation avec les meilleurs mentors.
              </p>
              <Badge color="primary">Étape 1/2 : Compléter votre profil</Badge>
            </div>
          </div>
        </Card>

        <Card>
          <StudentOnboardingForm />
        </Card>
      </div>
    )
  }

  // Profil existant - afficher le dashboard
  const studentProfile = {
    school: profile?.bio || 'École non renseignée',
    level: 'Master 2',
    targets: ['Canada', 'Allemagne'],
    status: profile?.status || 'pending_verification',
  }

  const démarches = [
    {
      title: 'Demandes de mentorat envoyées',
      detail: '3 au total · 1 en attente',
      href: '/student/requests',
      accent: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    },
    {
      title: 'Prochains rendez-vous',
      detail: '2 sessions planifiées cette semaine',
      href: '/student/messages',
      accent: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      title: 'Messages non lus',
      detail: '5 échanges à lire dans vos conversations',
      href: '/messages',
      accent: 'bg-amber-50 text-amber-700 border-amber-100',
    },
  ]

  const statusLabel: Record<string, string> = {
    verified: 'Profil vérifié',
    under_review: 'Vérification en cours',
    rejected: 'Profil refusé',
    pending_verification: 'En attente de vérification',
  }

  const statusIcon = {
    verified: <CheckCircle className="h-4 w-4 text-green-600" />,
    under_review: <AlertCircle className="h-4 w-4 text-yellow-600" />,
    rejected: <AlertCircle className="h-4 w-4 text-red-600" />,
    pending_verification: <AlertCircle className="h-4 w-4 text-gray-600" />,
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Espace Stagiaire"
        title="Votre tableau de bord étudiant"
        description="Visualisez l'essentiel : profil, accès marketplace et suivi de vos démarches."
        align="left"
      />

      {/* Statut de vérification */}
      {studentProfile.status !== 'verified' && (
        <Card className="border-l-4 border-l-yellow-500 bg-yellow-50">
          <div className="flex items-center gap-3">
            {statusIcon[studentProfile.status as keyof typeof statusIcon]}
            <div>
              <p className="font-semibold text-gray-900">Statut : {statusLabel[studentProfile.status]}</p>
              <p className="text-sm text-gray-600">
                Votre profil est en cours de vérification. Vous pouvez toujours utiliser la plateforme.
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
        <Card className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-gray-500">Profil stagiaire</p>
              <h3 className="text-xl font-bold text-gray-900">Résumé de votre parcours</h3>
              <p className="text-sm text-gray-600">École, niveau, pays cibles et statut de vérification.</p>
            </div>
            <Badge color="primary">{statusLabel[studentProfile.status]}</Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <InfoItem label="École" value={studentProfile.school} />
            <InfoItem label="Niveau" value={studentProfile.level} />
            <InfoItem label="Pays cibles" value={studentProfile.targets.join(' · ')} />
            <InfoItem label="Statut" value={statusLabel[studentProfile.status]} />
          </div>

          <div className="pt-4 border-t">
            <Link to="/student/profile">
              <Button variant="outline" className="w-full">
                Modifier mon profil
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 border-indigo-100">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-indigo-600 uppercase">Marketplace</p>
            <h3 className="text-xl font-bold text-gray-900">Trouver un mentor ou un stage</h3>
            <p className="text-sm text-gray-700">
              Accédez à la marketplace pour identifier un mentor, réserver un créneau ou découvrir des offres de stage.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/marketplace">
                <Button>Accéder à la marketplace</Button>
              </Link>
              <Link to="/student/search">
                <Button variant="outline">Rechercher un mentor</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Mes démarches</h3>
          <p className="text-xs text-gray-500">Demandes envoyées · rendez-vous · messages non lus</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {démarches.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={`rounded-xl border p-4 shadow-sm transition hover:shadow-md ${item.accent}`}
            >
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-xs mt-1">{item.detail}</p>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase text-gray-500 font-semibold">{label}</p>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  )
}
