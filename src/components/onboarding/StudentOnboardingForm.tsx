import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { supabase } from '../../lib/supabase'
import { normalizeRoles } from '../../lib/roles'
import Button from '../Button'
import Input from '../Input'

type StudentFormData = {
    school: string
    degree_level: string
    field_of_study: string
    target_city: string
    internship_type: string
    internship_duration: string
    start_date: string
    objective: string
    linkedin_url: string
}

export default function StudentOnboardingForm() {
    const { user, profile, refreshProfile } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors } } = useForm<StudentFormData>()

    const onSubmit = async (data: StudentFormData) => {
        if (!user) return
        setLoading(true)
        setSubmitError(null)

        try {
            const roles = normalizeRoles(profile?.role || '')
            const nextRoles = Array.from(new Set([...roles, 'student']))
            const roleValue = nextRoles.length ? nextRoles.join(',') : 'student'

            // 1. Update profile role and status
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    role: roleValue,
                    status: 'under_review'
                })
                .eq('user_id', user.id)

            if (profileError) throw profileError

            // 2. Get profile ID
            const { data: profileData, error: profileFetchError } = await supabase
                .from('profiles')
                .select('id')
                .eq('user_id', user.id)
                .single()

            if (profileFetchError) throw profileFetchError

            // 3. Insert student details
            const { error: detailsError } = await supabase
                .from('student_details')
                .insert({
                    profile_id: profileData.id,
                    ...data,
                    target_countries: [],
                    target_sectors: [],
                    languages: []
                })
                .select()
                .single()

            if (detailsError) throw detailsError

            await refreshProfile()
            navigate('/dashboard')
        } catch (error: any) {
            console.error('Error submitting student onboarding:', error)
            setSubmitError('Une erreur est survenue lors de l’enregistrement de votre profil. Veuillez réessayer dans quelques instants.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Erreur : </strong>
                    <span className="block sm:inline">{submitError}</span>
                </div>
            )}

            {/* Section 1: Infos Académiques */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Informations Académiques</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">École / Université <span className="text-red-500">*</span></label>
                        <Input
                            {...register('school', { required: 'Ce champ est requis' })}
                            placeholder="Ex: HEC Paris, Sorbonne..."
                        />
                        {errors.school && <span className="text-red-500 text-xs">{errors.school.message}</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Niveau d'études <span className="text-red-500">*</span></label>
                        <select
                            {...register('degree_level', { required: 'Ce champ est requis' })}
                            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        >
                            <option value="">Sélectionner...</option>
                            <option value="L1">Licence 1</option>
                            <option value="L2">Licence 2</option>
                            <option value="L3">Licence 3</option>
                            <option value="M1">Master 1</option>
                            <option value="M2">Master 2</option>
                            <option value="Césure">Année de Césure</option>
                            <option value="Jeune Diplômé">Jeune Diplômé</option>
                            <option value="Doctorat">Doctorat</option>
                            <option value="Autre">Autre</option>
                        </select>
                        {errors.degree_level && <span className="text-red-500 text-xs">{errors.degree_level.message}</span>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-gray-700">Domaine d'études <span className="text-red-500">*</span></label>
                        <Input
                            {...register('field_of_study', { required: 'Ce champ est requis' })}
                            placeholder="Ex: Marketing, Finance, Informatique..."
                        />
                        {errors.field_of_study && <span className="text-red-500 text-xs">{errors.field_of_study.message}</span>}
                    </div>
                </div>
            </div>

            {/* Section 2: Projet de Mobilité */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Projet de Mobilité</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Type d'opportunité <span className="text-red-500">*</span></label>
                        <select
                            {...register('internship_type', { required: 'Ce champ est requis' })}
                            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        >
                            <option value="">Sélectionner...</option>
                            <option value="Stage Obligatoire">Stage Obligatoire</option>
                            <option value="Stage Facultatif">Stage Facultatif</option>
                            <option value="Alternance">Alternance</option>
                            <option value="Premier Emploi">Premier Emploi</option>
                        </select>
                        {errors.internship_type && <span className="text-red-500 text-xs">{errors.internship_type.message}</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Durée souhaitée <span className="text-red-500">*</span></label>
                        <Input
                            {...register('internship_duration', { required: 'Ce champ est requis' })}
                            placeholder="Ex: 6 mois"
                        />
                        {errors.internship_duration && <span className="text-red-500 text-xs">{errors.internship_duration.message}</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Ville souhaitée</label>
                        <Input
                            {...register('target_city')}
                            placeholder="Ex: Londres, New York..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Date de début souhaitée</label>
                        <Input
                            type="month"
                            {...register('start_date')}
                        />
                    </div>
                </div>
            </div>

            {/* Section 3: Objectifs & Profil */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Objectifs & Profil</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Quel est ton objectif principal avec ANKORA ?</label>
                        <textarea
                            {...register('objective', { maxLength: 280 })}
                            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all min-h-[100px]"
                            placeholder="Ex: Je cherche un mentor pour m'aider à trouver un stage à Londres..."
                        />
                        <p className="text-xs text-gray-500 text-right">Max 280 caractères</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Profil LinkedIn <span className="text-red-500">*</span></label>
                        <Input
                            {...register('linkedin_url', { required: 'Ce champ est requis' })}
                            placeholder="https://linkedin.com/in/..."
                        />
                        {errors.linkedin_url && <span className="text-red-500 text-xs">{errors.linkedin_url.message}</span>}
                    </div>

                    <div className="flex items-start space-x-3 pt-4">
                        <input type="checkbox" required className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                        <label className="text-sm text-gray-600">
                            J'accepte que mon profil soit partagé à des mentors et recruteurs vérifiés sur la plateforme ANKORA.
                        </label>
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <Button type="submit" className="w-full py-4 text-lg" disabled={loading}>
                    {loading ? 'Envoi en cours...' : 'Soumettre mon profil'}
                </Button>
            </div>
        </form>
    )
}
