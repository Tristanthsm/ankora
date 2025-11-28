import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { supabase } from '../../lib/supabase'
import Button from '../Button'
import Input from '../Input'

type StudentFormData = {
    school: string
    degree_level: string
    field_of_study: string
    internship_type: string
    internship_duration: string
    linkedin_url: string
}

export default function StudentOnboardingForm() {
    const { user, refreshProfile } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<StudentFormData>()

    const onSubmit = async (data: StudentFormData) => {
        if (!user) return
        setLoading(true)

        try {
            // 1. Update profile role and status
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    role: 'student',
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
                    // Default empty arrays for now, can be expanded later
                    target_countries: [],
                    target_sectors: [],
                    languages: []
                })

            if (detailsError) throw detailsError

            await refreshProfile()
            navigate('/dashboard') // Or a specific "pending verification" page
        } catch (error) {
            console.error('Error submitting student onboarding:', error)
            alert('Une erreur est survenue lors de la soumission du formulaire.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">École / Université</label>
                    <Input
                        {...register('school', { required: 'Ce champ est requis' })}
                        placeholder="Ex: HEC Paris, Sorbonne..."
                    />
                    {errors.school && <span className="text-red-500 text-xs">{errors.school.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Niveau d'études</label>
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
                        <option value="Doctorat">Doctorat</option>
                        <option value="Autre">Autre</option>
                    </select>
                    {errors.degree_level && <span className="text-red-500 text-xs">{errors.degree_level.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Domaine d'études</label>
                    <Input
                        {...register('field_of_study', { required: 'Ce champ est requis' })}
                        placeholder="Ex: Marketing, Informatique..."
                    />
                    {errors.field_of_study && <span className="text-red-500 text-xs">{errors.field_of_study.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Type de recherche</label>
                    <select
                        {...register('internship_type', { required: 'Ce champ est requis' })}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    >
                        <option value="">Sélectionner...</option>
                        <option value="Stage">Stage</option>
                        <option value="Alternance">Alternance</option>
                        <option value="Premier Emploi">Premier Emploi</option>
                    </select>
                    {errors.internship_type && <span className="text-red-500 text-xs">{errors.internship_type.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Durée souhaitée</label>
                    <Input
                        {...register('internship_duration', { required: 'Ce champ est requis' })}
                        placeholder="Ex: 6 mois"
                    />
                    {errors.internship_duration && <span className="text-red-500 text-xs">{errors.internship_duration.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Profil LinkedIn</label>
                    <Input
                        {...register('linkedin_url')}
                        placeholder="https://linkedin.com/in/..."
                    />
                </div>
            </div>

            <div className="pt-4">
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Envoi en cours...' : 'Soumettre mon profil'}
                </Button>
            </div>
        </form>
    )
}
