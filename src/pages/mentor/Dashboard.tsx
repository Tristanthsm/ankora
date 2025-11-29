import { Link } from 'react-router-dom'
import SectionHeader from '../../components/SectionHeader'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import { useAuth } from '../../lib/auth'

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
  const { profile } = useAuth()

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

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Espace Mentor"
        title="Pilotez vos mentorés et offres"
        description="Profil mentor, demandes reçues et raccourcis pour rester à jour."
        align="left"
      />

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
