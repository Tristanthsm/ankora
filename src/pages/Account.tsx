import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { hasRole } from '../lib/roles'
import { supabase, StudentDetails, MentorDetails } from '../lib/supabase'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'
import Navbar from '../components/layout/Navbar'
import SectionHeader from '../components/SectionHeader'
import {
  Briefcase,
  AlertCircle,
  CheckCircle, 
  Clock, 
  GraduationCap, 
  Globe2, 
  Languages, 
  User,
  Mail,
  MapPin,
  Camera,
  Edit,
  ExternalLink,
  FileText,
  LogOut
} from 'lucide-react'

export default function Account() {
  const { user, profile, refreshProfile, signOut } = useAuth()
  const [loading, setLoading] = useState(false)
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null)
  const [mentorDetails, setMentorDetails] = useState<MentorDetails | null>(null)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const navigate = useNavigate()

  const fetchDetails = useCallback(async () => {
    if (!profile) return
    setLoading(true)

    try {
      if (hasRole(profile, 'student')) {
        const { data } = await supabase
          .from('student_details')
          .select('*')
          .eq('profile_id', profile.id)
          .single()

        setStudentDetails(data)
      }

      if (hasRole(profile, 'mentor')) {
        const { data } = await supabase
          .from('mentor_details')
          .select('*')
          .eq('profile_id', profile.id)
          .single()

        setMentorDetails(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des détails:', error)
    } finally {
      setLoading(false)
    }
  }, [profile])

  useEffect(() => {
    if (user && profile) {
      fetchDetails()
    }
  }, [user, profile, fetchDetails])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="flex items-center text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4 mr-2" /> Vérifié
          </span>
        )
      case 'under_review':
        return (
          <span className="flex items-center text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4 mr-2" /> En cours de vérification
          </span>
        )
      case 'rejected':
        return (
          <span className="flex items-center text-red-600 bg-red-50 px-3 py-1.5 rounded-full text-sm font-medium">
            <AlertCircle className="w-4 h-4 mr-2" /> Rejeté
          </span>
        )
      default:
        return (
          <span className="flex items-center text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full text-sm font-medium">
            En attente
          </span>
        )
    }
  }

  const hasStudentRole = profile && hasRole(profile, 'student')
  const hasMentorRole = profile && hasRole(profile, 'mentor')

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Veuillez vous connecter pour accéder à votre profil.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container-custom py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <SectionHeader
            eyebrow="Mon profil"
            title="Vos informations personnelles"
            description="Gérez toutes vos informations : profil général, stagiaire et mentor."
            align="left"
          />
          <Button
            variant="outline"
            className="self-start"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Se déconnecter
          </Button>
        </div>

        <div className="space-y-6 mt-8">
          {/* Profil général */}
          <Card>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                {/* Photo de profil */}
                <div className="relative">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {(profile?.full_name || user.email || '?').substring(0, 2).toUpperCase()}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50">
                    <Camera className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profile?.full_name || user.email}
                  </h2>
                  <div className="flex items-center gap-3 mt-2">
                    {hasStudentRole && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" /> Étudiant
                      </span>
                    )}
                    {hasMentorRole && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 flex items-center gap-1">
                        <Briefcase className="h-3 w-3" /> Mentor
                      </span>
                    )}
                    {profile && getStatusBadge(profile.status)}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(isEditing === 'general' ? null : 'general')}
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing === 'general' ? 'Annuler' : 'Modifier'}
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InfoField 
                label="Nom complet" 
                value={profile?.full_name || 'Non renseigné'} 
                icon={<User className="h-4 w-4 text-primary-600" />}
                editable={isEditing === 'general'}
              />
              <InfoField 
                label="Email" 
                value={user.email || 'Non renseigné'} 
                icon={<Mail className="h-4 w-4 text-primary-600" />}
                editable={false}
              />
              <InfoField 
                label="Pays" 
                value={profile?.country || 'Non renseigné'} 
                icon={<Globe2 className="h-4 w-4 text-primary-600" />}
                editable={isEditing === 'general'}
              />
              <InfoField 
                label="Ville" 
                value={profile?.city || 'Non renseignée'} 
                icon={<MapPin className="h-4 w-4 text-primary-600" />}
                editable={isEditing === 'general'}
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Langues parlées</label>
                <div className="flex flex-wrap gap-2 items-center">
                  <Languages className="h-4 w-4 text-primary-600" />
                  {profile?.languages && profile.languages.length > 0 ? (
                    profile.languages.map((lang) => (
                      <span key={lang} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                        {lang}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">Aucune langue renseignée</span>
                  )}
                </div>
              </div>
            </div>

            {isEditing === 'general' && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button onClick={() => setIsEditing(null)}>
                  Enregistrer les modifications
                </Button>
              </div>
            )}
          </Card>

          {/* Profil stagiaire */}
          {hasStudentRole && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Profil stagiaire</h3>
                    <p className="text-sm text-gray-600">Informations spécifiques à votre statut d'étudiant</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(isEditing === 'student' ? null : 'student')}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing === 'student' ? 'Annuler' : 'Modifier'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshProfile}
                    disabled={loading}
                  >
                    Rafraîchir
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <InfoField 
                  label="École / Université" 
                  value={studentDetails?.school || 'Non renseignée'} 
                  editable={isEditing === 'student'}
                />
                <InfoField 
                  label="Niveau d'études" 
                  value={studentDetails?.degree_level || 'Non renseigné'} 
                  editable={isEditing === 'student'}
                />
                <InfoField 
                  label="Domaine d'études" 
                  value={studentDetails?.field_of_study || 'Non renseigné'} 
                  editable={isEditing === 'student'}
                />
                <InfoField 
                  label="Ville cible" 
                  value={studentDetails?.target_city || 'Non renseignée'} 
                  editable={isEditing === 'student'}
                />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pays cibles</label>
                  <div className="flex flex-wrap gap-2">
                    {studentDetails?.target_countries && studentDetails.target_countries.length > 0 ? (
                      studentDetails.target_countries.map((country) => (
                        <span key={country} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {country}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">Aucun pays cible renseigné</span>
                    )}
                  </div>
                </div>
                <InfoField 
                  label="Type de stage recherché" 
                  value={studentDetails?.internship_type || 'Non renseigné'} 
                  editable={isEditing === 'student'}
                />
                <InfoField 
                  label="Durée du stage" 
                  value={studentDetails?.internship_duration || 'Non renseignée'} 
                  editable={isEditing === 'student'}
                />
                <InfoField 
                  label="Date de début souhaitée" 
                  value={studentDetails?.start_date || 'Non renseignée'} 
                  editable={isEditing === 'student'}
                />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Objectifs</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700 min-h-[80px]">
                    {studentDetails?.objective || 'Aucun objectif renseigné. Ajoutez vos objectifs pour être mieux orienté.'}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">CV</label>
                  {studentDetails?.cv_url ? (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <FileText className="h-5 w-5 text-primary-600" />
                      <span className="flex-1 text-sm text-gray-700 truncate">{studentDetails.cv_url}</span>
                      <a
                        href={studentDetails.cv_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-500">
                      Aucun CV téléchargé
                    </div>
                  )}
                </div>
                {studentDetails?.linkedin_url && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                    <a
                      href={studentDetails.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {studentDetails.linkedin_url}
                    </a>
                  </div>
                )}
              </div>

              {isEditing === 'student' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button onClick={() => setIsEditing(null)}>
                    Enregistrer les modifications
                  </Button>
                </div>
              )}
            </Card>
          )}

          {/* Profil mentor */}
          {hasMentorRole && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Briefcase className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Profil mentor / offreur</h3>
                    <p className="text-sm text-gray-600">Informations spécifiques à votre statut de mentor</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(isEditing === 'mentor' ? null : 'mentor')}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing === 'mentor' ? 'Annuler' : 'Modifier'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshProfile}
                    disabled={loading}
                  >
                    Rafraîchir
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <InfoField 
                  label="Poste actuel" 
                  value={mentorDetails?.current_position || profile?.position || 'Non renseigné'} 
                  editable={isEditing === 'mentor'}
                />
                <InfoField 
                  label="Entreprise" 
                  value={mentorDetails?.company || profile?.company || 'Non renseignée'} 
                  editable={isEditing === 'mentor'}
                />
                <InfoField 
                  label="Années d'expérience" 
                  value={mentorDetails?.experience_years ? `${mentorDetails.experience_years} ans` : 'Non renseignées'} 
                  editable={isEditing === 'mentor'}
                />
                <InfoField 
                  label="Capacité de mentorat" 
                  value={mentorDetails?.max_students_per_month ? `${mentorDetails.max_students_per_month} étudiants/mois` : 'Non renseignée'} 
                  editable={isEditing === 'mentor'}
                />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secteurs d'expertise</label>
                  <div className="flex flex-wrap gap-2">
                    {mentorDetails?.expertise_sectors && mentorDetails.expertise_sectors.length > 0 ? (
                      mentorDetails.expertise_sectors.map((sector) => (
                        <span key={sector} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          {sector}
                        </span>
                      ))
                    ) : profile?.expertise_areas && profile.expertise_areas.length > 0 ? (
                      profile.expertise_areas.map((area) => (
                        <span key={area} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          {area}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">Aucun secteur renseigné</span>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pays couverts</label>
                  <div className="flex flex-wrap gap-2">
                    {mentorDetails?.countries_network && mentorDetails.countries_network.length > 0 ? (
                      mentorDetails.countries_network.map((country) => (
                        <span key={country} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                          {country}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">Aucun pays renseigné</span>
                    )}
                  </div>
                </div>
                {mentorDetails?.linkedin_url && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                    <a
                      href={mentorDetails.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {mentorDetails.linkedin_url}
                    </a>
                  </div>
                )}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Documents de preuve</label>
                  {mentorDetails?.proof_documents_url && mentorDetails.proof_documents_url.length > 0 ? (
                    <div className="space-y-2">
                      {mentorDetails.proof_documents_url.map((url, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <FileText className="h-5 w-5 text-primary-600" />
                          <span className="flex-1 text-sm text-gray-700 truncate">{url}</span>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-500">
                      Aucun document de preuve fourni
                    </div>
                  )}
                </div>
              </div>

              {isEditing === 'mentor' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button onClick={() => setIsEditing(null)}>
                    Enregistrer les modifications
                  </Button>
                </div>
              )}
            </Card>
          )}

          {/* Message si pas de profil */}
          {!profile && (
            <Card className="text-center py-12">
              <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-600 mb-4">
                Vous n'avez pas encore complété votre profil.
              </p>
              <Button onClick={() => window.location.href = '/space'}>
                Compléter mon profil
              </Button>
            </Card>
          )}

          {loading && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-400">Chargement des données...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoField({ 
  label, 
  value, 
  icon, 
  editable = false 
}: { 
  label: string
  value: string
  icon?: React.ReactNode
  editable?: boolean
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm">
        {icon}
        {editable ? (
          <Input 
            value={value} 
            className="bg-white border-gray-300 flex-1"
            onChange={() => {}}
          />
        ) : (
          <span className="text-gray-900 flex-1">{value}</span>
        )}
      </div>
    </div>
  )
}
