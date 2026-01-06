import { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import SectionHeader from '../../components/SectionHeader'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import { useAuth } from '../../lib/auth'
import { hasRole } from '../../lib/roles'
import StudentOnboardingForm from '../../components/onboarding/StudentOnboardingForm'
import MentorOnboardingForm from '../../components/onboarding/MentorOnboardingForm'
import { GraduationCap, Briefcase, CheckCircle, AlertCircle, FileText, Upload } from 'lucide-react'

export default function SpaceDashboard() {
  const { profile, loading, studentDetails, mentorDetails } = useAuth()
  const [activeRole, setActiveRole] = useState<'student' | 'mentor' | null>(null)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const isStudent = profile && hasRole(profile, 'student')
  const isMentor = profile && hasRole(profile, 'mentor')
  const hasNoRole = !isStudent && !isMentor

  // Si pas de rôle, permettre de choisir
  const showRoleSelection = hasNoRole && !activeRole

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
        eyebrow="Espace"
        title="Votre tableau de bord"
        description="Gérez vos profils, documents, demandes et messages depuis un seul endroit."
        align="left"
      />

      {/* Sélection de rôle si aucun rôle */}
      {showRoleSelection && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Choisissez votre rôle pour commencer
            </h3>
            <p className="text-gray-600">
              Vous pouvez avoir les deux rôles. Commencez par celui qui vous correspond le plus.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => setActiveRole('student')}
              className="p-6 border-2 border-blue-300 rounded-xl bg-white hover:bg-blue-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                <GraduationCap className="h-6 w-6 text-blue-600" />
                <h4 className="font-bold text-gray-900">Étudiant</h4>
              </div>
              <p className="text-sm text-gray-600">
                Je cherche un stage ou un emploi à l'international
              </p>
            </button>
            <button
              onClick={() => setActiveRole('mentor')}
              className="p-6 border-2 border-purple-300 rounded-xl bg-white hover:bg-purple-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="h-6 w-6 text-purple-600" />
                <h4 className="font-bold text-gray-900">Mentor</h4>
              </div>
              <p className="text-sm text-gray-600">
                Je guide des étudiants dans leur recherche
              </p>
            </button>
          </div>
        </Card>
      )}

      {/* Formulaire étudiant */}
      {(activeRole === 'student' || (isStudent && !profile?.full_name)) && (
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Profil Étudiant</h3>
          </div>
          <StudentOnboardingForm />
        </Card>
      )}

      {/* Formulaire mentor */}
      {(activeRole === 'mentor' || (isMentor && !profile?.full_name)) && (
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Profil Mentor</h3>
          </div>
          <MentorOnboardingForm />
        </Card>
      )}

      {/* Profils existants */}
      {(isStudent || isMentor) && (
        <>
          {/* Statut de vérification */}
          {profile && profile.status !== 'verified' && (
            <Card className="border-l-4 border-l-yellow-500 bg-yellow-50">
              <div className="flex items-center gap-3">
                {statusIcon[profile.status as keyof typeof statusIcon]}
                <div>
                  <p className="font-semibold text-gray-900">
                    Statut : {statusLabel[profile.status] || 'Inconnu'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Votre profil est en cours de vérification. Vous pouvez toujours utiliser la plateforme.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Résumé des profils */}
          <div className="grid lg:grid-cols-2 gap-6">
            {isStudent && (
              <Card className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Profil Étudiant</h3>
                  </div>
                  <Badge color="primary">
                    {profile?.status ? statusLabel[profile.status] : 'Actif'}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <InfoRow label="École" value={studentDetails?.school || 'Non renseignée'} />
                  <InfoRow label="Pays cibles" value={studentDetails?.target_countries?.join(', ') || 'Non renseignés'} />
                  <InfoRow label="Objectif" value={studentDetails?.objective || 'Non renseigné'} />
                </div>
                <div className="flex gap-2 pt-4 border-t">
                  <Link to="/space/search" className="flex-1">
                    <Button variant="outline" className="w-full">Rechercher un mentor</Button>
                  </Link>
                  <Link to="/space/requests" className="flex-1">
                    <Button className="w-full">Mes requêtes</Button>
                  </Link>
                </div>
              </Card>
            )}

            {isMentor && (
              <Card className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Profil Mentor</h3>
                  </div>
                  <Badge color="primary">
                    {profile?.status ? statusLabel[profile.status] : 'Actif'}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <InfoRow label="Poste" value={mentorDetails?.current_position || profile?.position || 'Non renseigné'} />
                  <InfoRow label="Entreprise" value={mentorDetails?.company || profile?.company || 'Non renseignée'} />
                  <InfoRow label="Secteurs" value={mentorDetails?.expertise_sectors?.join(', ') || 'Non renseignés'} />
                </div>
                <div className="flex gap-2 pt-4 border-t">
                  <Link to="/space/mentor-requests" className="flex-1">
                    <Button variant="outline" className="w-full">Demandes reçues</Button>
                  </Link>
                  <Link to="/space/students" className="flex-1">
                    <Button className="w-full">Mes étudiants</Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>

          {/* Documents */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
              </div>
              <Link to="/space/documents">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Gérer les documents
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">

              {isStudent && (
                <>
                  <DocumentCard
                    title="CV"
                    status={studentDetails?.cv_url ? "Reçu" : "À fournir"}
                    required={true}
                  />
                  <DocumentCard
                    title="Preuve scolarité"
                    status={studentDetails?.student_proof_url ? "Reçu" : "À fournir"}
                    required={true}
                  />
                </>
              )}

              {isMentor && (
                <DocumentCard
                  title="Preuves expertise"
                  status={(mentorDetails?.proof_documents_url && mentorDetails.proof_documents_url.length > 0) ? "Reçu" : "À fournir"}
                  required={true}
                />
              )}
            </div>
          </Card>

          {/* Actions rapides */}
          <Card className="bg-gradient-to-br from-primary-50 to-indigo-50 border-primary-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/marketplace">
                <div className="p-4 bg-white rounded-lg border border-primary-200 hover:shadow-md transition-shadow">
                  <p className="font-semibold text-gray-900 mb-1">Marketplace</p>
                  <p className="text-sm text-gray-600">Trouver un mentor ou un stage</p>
                </div>
              </Link>
              <Link to="/space/messages">
                <div className="p-4 bg-white rounded-lg border border-primary-200 hover:shadow-md transition-shadow">
                  <p className="font-semibold text-gray-900 mb-1">Messages</p>
                  <p className="text-sm text-gray-600">Voir vos conversations</p>
                </div>
              </Link>
              <Link to="/space/profile">
                <div className="p-4 bg-white rounded-lg border border-primary-200 hover:shadow-md transition-shadow">
                  <p className="font-semibold text-gray-900 mb-1">Mon profil</p>
                  <p className="text-sm text-gray-600">Gérer vos informations</p>
                </div>
              </Link>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}:</span>
      <span className="text-gray-900 font-medium">{value}</span>
    </div>
  )
}

function DocumentCard({ title, status, required }: { title: string; status: string; required: boolean | null }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white">
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-sm text-gray-900">{title}</p>
        {required && (
          <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">Requis</span>
        )}
      </div>
      <p className="text-xs text-gray-600">{status}</p>
    </div>
  )
}

