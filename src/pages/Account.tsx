import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../lib/auth'
import { hasRole } from '../lib/roles'
import { supabase, StudentDetails, MentorDetails } from '../lib/supabase'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'
import { Briefcase, AlertCircle, CheckCircle, Clock, GraduationCap } from 'lucide-react'

export default function Account() {
    const { user, profile, refreshProfile } = useAuth()
    const [loading, setLoading] = useState(false)
    const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null)
    const [mentorDetails, setMentorDetails] = useState<MentorDetails | null>(null)

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
                return <span className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium"><CheckCircle className="w-4 h-4 mr-2" /> Vérifié</span>
            case 'under_review':
                return <span className="flex items-center text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-sm font-medium"><Clock className="w-4 h-4 mr-2" /> En cours de vérification</span>
            case 'rejected':
                return <span className="flex items-center text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm font-medium"><AlertCircle className="w-4 h-4 mr-2" /> Rejeté</span>
            default:
                return <span className="flex items-center text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-sm font-medium">En attente</span>
        }
    }

    const hasStudentRole = hasRole(profile, 'student')
    const hasMentorRole = hasRole(profile, 'mentor')

    if (!profile) return null

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Mon Compte</h1>
                        <p className="text-gray-600">Gérez vos informations principales et vos rôles Ankora.</p>
                    </div>
                    {getStatusBadge(profile.status)}
                </div>

                <Card>
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center font-semibold text-lg">
                                {(profile.full_name || user?.email || '?').substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Informations principales</h2>
                                <p className="text-sm text-gray-500">Vos données sont synchronisées avec Supabase.</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {hasStudentRole && <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 flex items-center gap-1"><GraduationCap className="h-3 w-3" /> Étudiant</span>}
                            {hasMentorRole && <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 flex items-center gap-1"><Briefcase className="h-3 w-3" /> Mentor</span>}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                            <Input value={profile.full_name || ''} disabled className="bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <Input value={user?.email} disabled className="bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                            <Input value={profile.country || ''} disabled className="bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                            <Input value={profile.city || ''} disabled className="bg-gray-50" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Langues</label>
                            <div className="flex flex-wrap gap-2">
                                {profile.languages?.length ? (
                                    profile.languages.map((lang) => (
                                        <span key={lang} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                            {lang}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-500 text-sm">Langues non renseignées</span>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Documents & vérification</h2>
                            <p className="text-sm text-gray-500">Dernière mise à jour : {profile.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={refreshProfile}>Rafraîchir</Button>
                    </div>

                    <div className="space-y-6">
                        {hasStudentRole && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-gray-800 font-semibold">
                                    <GraduationCap className="h-4 w-4" /> Documents étudiants
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                                    <InfoRow label="CV" value={studentDetails?.cv_url || 'Non fourni'} />
                                    <InfoRow label="Justificatif de scolarité" value={studentDetails?.student_proof_url || 'Non fourni'} />
                                    <InfoRow label="LinkedIn" value={studentDetails?.linkedin_url || 'Non renseigné'} />
                                    <InfoRow label="Objectif" value={studentDetails?.objective || 'Ajoutez vos objectifs pour être mieux orienté.'} />
                                </div>
                            </div>
                        )}

                        {hasMentorRole && (
                            <div className="space-y-3 border-t pt-4">
                                <div className="flex items-center gap-2 text-gray-800 font-semibold">
                                    <Briefcase className="h-4 w-4" /> Documents & liens mentor
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                                    <InfoRow label="LinkedIn" value={mentorDetails?.linkedin_url || 'Non renseigné'} />
                                    <InfoRow label="Justificatifs professionnels" value={mentorDetails?.proof_documents_url?.join(', ') || 'Non fournis'} />
                                    <InfoRow label="Formats de coaching" value={mentorDetails?.coaching_formats?.join(', ') || 'À définir'} />
                                    <InfoRow label="Entreprise actuelle" value={mentorDetails?.company || 'Non renseignée'} />
                                </div>
                            </div>
                        )}

                        {loading && <p className="text-sm text-gray-400">Chargement des données...</p>}
                    </div>
                </Card>
            </div>
        </div>
    )
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="space-y-1">
            <p className="text-xs uppercase text-gray-500 font-semibold">{label}</p>
            <p className="text-gray-800">{value}</p>
        </div>
    )
}
