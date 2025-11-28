import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { supabase } from '../../lib/supabase'
import Button from '../Button'
import Input from '../Input'

type MentorFormData = {
    company: string
    current_position: string
    experience_years: number
    linkedin_url: string
    max_students_per_month: number
}

export default function MentorOnboardingForm() {
    const { user, refreshProfile } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<MentorFormData>()

    const onSubmit = async (data: MentorFormData) => {
        if (!user) return
        setLoading(true)

        try {
            // 1. Update profile role and status
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    role: 'mentor',
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

            // 3. Insert mentor details
            const { error: detailsError } = await supabase
                .from('mentor_details')
                .insert({
                    profile_id: profileData.id,
                    ...data,
                    // Default empty arrays
                    expertise_sectors: [],
                    countries_network: [],
                    help_types: [],
                    proof_documents_url: []
                })

            if (detailsError) throw detailsError

            await refreshProfile()
            navigate('/dashboard')
        } catch (error) {
            console.error('Error submitting mentor onboarding:', error)
            alert('Une erreur est survenue lors de la soumission du formulaire.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Entreprise actuelle</label>
                    <Input
                        {...register('company', { required: 'Ce champ est requis' })}
                        placeholder="Ex: Google, Startup..."
                    />
                    {errors.company && <span className="text-red-500 text-xs">{errors.company.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Poste actuel</label>
                    <Input
                        {...register('current_position', { required: 'Ce champ est requis' })}
                        placeholder="Ex: Senior Product Manager"
                    />
                    {errors.current_position && <span className="text-red-500 text-xs">{errors.current_position.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Années d'expérience</label>
                    <Input
                        type="number"
                        {...register('experience_years', { required: 'Ce champ est requis', min: 0 })}
                        placeholder="Ex: 5"
                    />
                    {errors.experience_years && <span className="text-red-500 text-xs">{errors.experience_years.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Profil LinkedIn</label>
                    <Input
                        {...register('linkedin_url', { required: 'Ce champ est requis' })}
                        placeholder="https://linkedin.com/in/..."
                    />
                    {errors.linkedin_url && <span className="text-red-500 text-xs">{errors.linkedin_url.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Capacité de mentorat (étudiants/mois)</label>
                    <Input
                        type="number"
                        {...register('max_students_per_month', { required: 'Ce champ est requis', min: 1 })}
                        defaultValue={3}
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
