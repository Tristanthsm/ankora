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
import {
  GraduationCap,
  Briefcase,
  CheckCircle,
  AlertCircle,
  FileText,
  Upload,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  ClipboardList
} from 'lucide-react'
import { cn } from '../../lib/utils'

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

  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Espace"
        title="Vue d'ensemble"
        description="Gérez votre activité et suivez vos progrès sur Ankora."
        align="left"
      />

      {/* 1. Status Overview Header */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatusCard
          icon={<ShieldCheck className="w-5 h-5" />}
          title="Identité"
          status={profile?.id_card_url ? 'Complété' : 'À fournir'}
          isCompleted={!!profile?.id_card_url}
          link="/space/documents"
          color="emerald"
        />
        {isStudent && (
          <StatusCard
            icon={<GraduationCap className="w-5 h-5" />}
            title="Profil Étudiant"
            status={studentDetails?.cv_url ? 'Actif' : 'Incomplet'}
            isCompleted={!!studentDetails?.cv_url}
            link="/space/profile"
            color="blue"
          />
        )}
        {isMentor && (
          <StatusCard
            icon={<Briefcase className="w-5 h-5" />}
            title="Profil Mentor"
            status={profile?.status === 'verified' ? 'Vérifié' : 'En attente'}
            isCompleted={profile?.status === 'verified'}
            link="/space/mentor-profile"
            color="purple"
          />
        )}
      </div>

      {/* Sélection de rôle si aucun rôle */}
      {showRoleSelection && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 p-8">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Bienvenue sur votre Espace Ankora
            </h3>
            <p className="text-gray-600 max-w-lg mx-auto">
              Pour commencer, choisissez le rôle qui vous correspond le mieux. Vous pourrez toujours activer l'autre rôle plus tard.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <RoleChoiceCard
              role="student"
              onClick={() => setActiveRole('student')}
              icon={<GraduationCap className="h-8 w-8 text-blue-600" />}
              title="Étudiant"
              description="Je cherche un mentor pour m'accompagner dans ma recherche de stage ou mon expatriation."
              color="blue"
            />
            <RoleChoiceCard
              role="mentor"
              onClick={() => setActiveRole('mentor')}
              icon={<Briefcase className="h-8 w-8 text-purple-600" />}
              title="Mentor"
              description="Je souhaite partager mon expérience et guider des étudiants vers la réussite."
              color="purple"
            />
          </div>
        </Card>
      )}

      {/* Formulaire étudiant */}
      {(activeRole === 'student' || (isStudent && !profile?.full_name)) && (
        <Card className="p-8 border-blue-100 shadow-sm shadow-blue-50">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
            <div className="p-2 bg-blue-50 rounded-lg">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Complétez votre profil Étudiant</h3>
              <p className="text-sm text-gray-500">Ces informations nous permettent de vous trouver les meilleurs mentors.</p>
            </div>
          </div>
          <StudentOnboardingForm />
        </Card>
      )}

      {/* Formulaire mentor */}
      {(activeRole === 'mentor' || (isMentor && !profile?.full_name)) && (
        <Card className="p-8 border-purple-100 shadow-sm shadow-purple-50">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Configurez votre profil Mentor</h3>
              <p className="text-sm text-gray-500">Devenez mentor et commencez à impacter des carrières.</p>
            </div>
          </div>
          <MentorOnboardingForm />
        </Card>
      )}

      {/* Profils existants */}
      {(isStudent || isMentor) && (
        <div className="grid lg:grid-cols-12 gap-8">

          {/* Main Content (Dashboard Summary) */}
          <div className="lg:col-span-8 space-y-8">

            {/* 1. Account Status Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-gray-50/30">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-gray-500" />
                  Récapitulatif de votre statut
                </h3>
              </div>
              <div className="p-6 space-y-6">

                {/* User Type Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      {profile?.full_name?.[0].toUpperCase() || profile?.email?.[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{profile?.full_name}</p>
                      <p className="text-sm text-gray-500">{profile?.email}</p>
                    </div>
                  </div>
                  <Badge color={profile?.status === 'verified' ? 'success' : 'warning'}>
                    {statusLabel[profile?.status || 'peding_verification']}
                  </Badge>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {isStudent && (
                    <div className="p-4 rounded-xl border border-gray-100 bg-blue-50/20">
                      <p className="text-xs font-bold text-blue-600 uppercase mb-2">Statut Étudiant</p>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-900">{studentDetails?.school || 'École non renseignée'}</p>
                        <p className="text-xs text-gray-500">{studentDetails?.degree_level} - {studentDetails?.field_of_study}</p>
                      </div>
                    </div>
                  )}
                  {isMentor && (
                    <div className="p-4 rounded-xl border border-gray-100 bg-purple-50/20">
                      <p className="text-xs font-bold text-purple-600 uppercase mb-2">Statut Mentor</p>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-900">{mentorDetails?.current_position || 'Mentor'}</p>
                        <p className="text-xs text-gray-500">@{mentorDetails?.company}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Next steps helper */}
                {profile?.status !== 'verified' && (
                  <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-amber-900">Action requise</p>
                      <p className="text-xs text-amber-700 mt-1">
                        Votre profil est en attente de vérification. Pour accélérer le processus, assurez-vous d'avoir téléchargé votre pièce d'identité et complété vos informations professionnelles.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Documents Section */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Documents récents</h3>
                </div>
                <Link to="/space/documents">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    Voir tout <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {isStudent && (
                  <>
                    <DocumentSummaryCard
                      title="Curriculum Vitae"
                      isReceived={!!studentDetails?.cv_url}
                    />
                    <DocumentSummaryCard
                      title="Certificat de scolarité"
                      isReceived={!!studentDetails?.student_proof_url}
                    />
                  </>
                )}
                {isMentor && (
                  <DocumentSummaryCard
                    title="Justificatifs d'expérience"
                    isReceived={(mentorDetails?.proof_documents_url && mentorDetails.proof_documents_url.length > 0) || false}
                  />
                )}
                <DocumentSummaryCard
                  title="Pièce d'identité"
                  isReceived={!!profile?.id_card_url}
                />
              </div>
            </Card>
          </div>

          {/* Right Sidebar - Quick Actions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-indigo-500 to-blue-700 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">Actions rapides</h3>
                <p className="text-blue-100 text-sm mb-6">Accédez rapidement aux fonctionnalités essentielles.</p>

                <div className="space-y-3">
                  <QuickActionLink
                    to="/marketplace"
                    icon={<Search className="w-4 h-4" />}
                    label="Rechercher"
                  />
                  <QuickActionLink
                    to="/space/messages"
                    icon={<ClipboardList className="w-4 h-4" />}
                    label="Messagerie"
                  />
                  <QuickActionLink
                    to="/space/profile"
                    icon={<UserCheck className="w-4 h-4" />}
                    label="Mon Profil"
                  />
                </div>
              </div>

              {/* Background patterns */}
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
            </div>

            {/* Suggestion Card */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Besoin d'aide ?</h4>
              <p className="text-sm text-gray-500 mb-6">Consultez notre FAQ ou contactez le support pour toute question.</p>
              <Button variant="outline" className="w-full">Support Ankora</Button>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

function StatusCard({ icon, title, status, isCompleted, link, color }: {
  icon: React.ReactNode;
  title: string;
  status: string;
  isCompleted: boolean;
  link: string;
  color: 'emerald' | 'blue' | 'purple'
}) {
  const colorClasses = {
    emerald: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
    blue: 'bg-blue-50 text-blue-600 ring-blue-100',
    purple: 'bg-purple-50 text-purple-600 ring-purple-100'
  }

  return (
    <Link to={link}>
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center gap-4">
          <div className={cn("p-2.5 rounded-xl ring-4 transition-transform group-hover:scale-110 duration-300", colorClasses[color])}>
            {icon}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{title}</p>
            <p className={cn("text-sm font-bold", isCompleted ? "text-gray-900" : "text-amber-500")}>
              {status}
            </p>
          </div>
          {isCompleted ? (
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-gray-100"></div>
          )}
        </div>
      </div>
    </Link>
  )
}

function RoleChoiceCard({ onClick, icon, title, description, color }: {
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'purple'
}) {
  const colorClasses = {
    blue: 'hover:border-blue-400 hover:bg-blue-50/50',
    purple: 'hover:border-purple-400 hover:bg-purple-50/50'
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "p-8 border-2 border-transparent rounded-2xl bg-white transition-all text-left shadow-sm group",
        colorClasses[color]
      )}
    >
      <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-950">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">
        {description}
      </p>
      <div className="mt-8 flex items-center font-bold text-sm group-hover:translate-x-1 transition-transform">
        Continuer en tant qu'{title.toLowerCase()} <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </button>
  )
}

function DocumentSummaryCard({ title, isReceived }: { title: string; isReceived: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
      <div className="flex items-center gap-3">
        <div className={cn("w-2 h-2 rounded-full", isReceived ? "bg-emerald-500" : "bg-amber-400")}></div>
        <span className="text-sm font-medium text-gray-700">{title}</span>
      </div>
      <span className={cn("text-[10px] font-bold uppercase tracking-tight", isReceived ? "text-emerald-600" : "text-amber-600")}>
        {isReceived ? 'Reçu' : 'À fournir'}
      </span>
    </div>
  )
}

function QuickActionLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link to={to} className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10">
      <span className="flex items-center gap-3 text-sm font-semibold">
        {icon}
        {label}
      </span>
      <ChevronRight className="w-4 h-4 text-white/50" />
    </Link>
  )
}
