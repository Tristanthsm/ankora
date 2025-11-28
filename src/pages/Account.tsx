import { useState, useEffect } from 'react'
import { useAuth } from '../lib/auth'
import { supabase } from '../lib/supabase'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'
import { User, Briefcase, AlertCircle, CheckCircle, Clock } from 'lucide-react'

export default function Account() {
    const { user, profile, refreshProfile } = useAuth()
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState<any>(null)

    useEffect(() => {
        if (user && profile) {
            fetchDetails()
        }
    }, [user, profile])

    const fetchDetails = async () => {
        if (!profile) return
        const table = profile.role === 'student' ? 'student_details' : 'mentor_details'
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('profile_id', profile.id)
            .single()

        if (data) setDetails(data)
    }

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

    if (!profile) return null

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Mon Compte</h1>

                {/* Status Card */}
                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Statut du profil</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                {profile.role === 'student' ? 'Compte Étudiant' : 'Compte Mentor'}
                            </p>
                        </div>
                        {getStatusBadge(profile.status)}
                    </div>
                </Card>

                {/* Basic Info */}
                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations de base</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <Input value={user?.email} disabled className="bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                            <Input defaultValue={profile.full_name || ''} disabled className="bg-gray-50" />
                        </div>
                    </div>
                </Card>

                {/* Role Details */}
                {details && (
                    <Card>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Détails {profile.role === 'student' ? 'Étudiant' : 'Mentor'}
                        </h2>
                        <div className="space-y-4">
                            {profile.role === 'student' ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">École</label>
                                        <Input defaultValue={details.school} disabled className="bg-gray-50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                                        <Input defaultValue={details.linkedin_url} disabled className="bg-gray-50" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                                        <Input defaultValue={details.company} disabled className="bg-gray-50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                                        <Input defaultValue={details.linkedin_url} disabled className="bg-gray-50" />
                                    </div>
                                </>
                            )}

                            <div className="pt-4 border-t border-gray-100">
                                <p className="text-sm text-gray-500 italic">
                                    Pour modifier ces informations, veuillez contacter le support ou attendre la validation de votre profil.
                                </p>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    )
}
