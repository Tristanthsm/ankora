import { Link } from 'react-router-dom'
import SectionHeader from '../../components/SectionHeader'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import { useAuth } from '../../lib/auth'
import { hasRole } from '../../lib/roles'
import MentorOnboardingForm from '../../components/onboarding/MentorOnboardingForm'
import { Briefcase, CheckCircle, AlertCircle } from 'lucide-react'

const requests = [
  {
    student: 'Amine K.',
    focus: 'Candidatures Canada',
    status: 'En attente',
  },
  {
    student: 'Sofia L.',
    focus: 'Préparation entretien',
    status: 'Nouveau',
  },
  {
    student: 'Lucas M.',
    focus: 'Recherche stage Berlin',
    status: 'En cours',
  },
]

export default function MentorDashboardPage() {
  const { profile, loading } = useAuth()

  // Afficher un loader pendant le chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  // Si pas de profil ou pas le rôle mentor, afficher le formulaire d'onboarding
  const needsOnboarding = !profile || !hasRole(profile, 'mentor')

  if (needsOnboarding) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Bienvenue dans votre espace mentor
              </h2>
              <p className="text-gray-700 mb-4">
                Pour commencer à accompagner des étudiants, complétez votre profil mentor. 
                Cela nous permet de vous mettre en relation avec les étudiants qui correspondent à vos expertises.
              </p>
              <Badge color="primary">Étape 1/2 : Compléter votre profil</Badge>
            </div>
          </div>
        </Card>

        <Card>
          <MentorOnboardingForm />
        </Card>
      </div>
    )
  }

  // Profil existant - afficher le dashboard
  const mentorProfile = {
    position: profile?.position || 'Poste non renseigné',
    company: profile?.company || 'Entreprise non renseignée',
    sectors: profile?.expertise_areas || ['Tech', 'Produit'],
    countries: ['France', 'Canada'],
    capacity: '3 mentorés actifs',
    status: profile?.status || 'pending_verification',
  }

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
        eyebrow="Espace Mentor"
        title="Pilotez vos mentorés et offres"
        description="Profil mentor, demandes reçues et raccourcis pour rester à jour."
        align="left"
      />

      {/* Statut de vérification */}
      {mentorProfile.status !== 'verified' && (
        <Card className="border-l-4 border-l-yellow-500 bg-yellow-50">
          <div className="flex items-center gap-3">
            {statusIcon[mentorProfile.status as keyof typeof statusIcon]}
            <div>
              <p className="font-semibold text-gray-900">Statut : {statusLabel[mentorProfile.status]}</p>
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
              <p className="text-xs font-semibold uppercase text-gray-500">Profil mentor</p>
              <h3 className="text-xl font-bold text-gray-900">Résumé de votre offre</h3>
              <p className="text-sm text-gray-600">Poste, entreprise, secteurs, pays et capacité de mentorat.</p>
            </div>
            <Badge color="primary">{statusLabel[mentorProfile.status]}</Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <InfoItem label="Poste" value={mentorProfile.position} />
            <InfoItem label="Entreprise" value={mentorProfile.company} />
            <InfoItem label="Secteurs" value={mentorProfile.sectors.join(' · ')} />
            <InfoItem label="Pays couverts" value={mentorProfile.countries.join(' · ')} />
            <InfoItem label="Capacité" value={mentorProfile.capacity} />
            <InfoItem label="Statut" value={statusLabel[mentorProfile.status]} />
          </div>

          <div className="pt-4 border-t">
            <Link to="/mentor/profile">
              <Button variant="outline" className="w-full">
                Modifier mon profil
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-100">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-purple-600 uppercase">Raccourcis</p>
            <h3 className="text-xl font-bold text-gray-900">Mettre à jour votre offre</h3>
            <p className="text-sm text-gray-700">
              Ajustez votre présentation, vos disponibilités et vos documents de preuve pour rester attractif.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/mentor/profile">
                <Button>Mettre à jour mon offre</Button>
              </Link>
              <Link to="/mentor/requests">
                <Button variant="outline">Gérer mes disponibilités</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Demandes reçues</h3>
          <Badge color="muted">Étudiants en attente de réponse</Badge>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {requests.map((item) => (
            <div key={item.student} className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
              <p className="text-sm font-semibold text-gray-900">{item.student}</p>
              <p className="text-xs text-gray-500">{item.focus}</p>
              <span className="inline-flex mt-2 px-2 py-1 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700">
                {item.status}
              </span>
            </div>
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
