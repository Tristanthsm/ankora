import { useState, useEffect } from 'react'
import { Save, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../../../lib/auth'
import { supabase } from '../../../lib/supabase'
import Button from '../../../components/Button'
import { cn } from '../../../lib/utils'

// Components
import StudentHeroEditor from '../../../components/space/student/editor/StudentHeroEditor'
import AcademicBackgroundEditor from '../../../components/space/student/editor/AcademicBackgroundEditor'
import CareerGoalsEditor from '../../../components/space/student/editor/CareerGoalsEditor'
import StudentSkillsEditor from '../../../components/space/student/editor/StudentSkillsEditor'
import DocumentPortfolioEditor from '../../../components/space/student/editor/DocumentPortfolioEditor'
import StudentProfileCompletionCard from '../../../components/space/student/editor/StudentProfileCompletionCard'

export default function StudentProfileEditor() {
    const { user, profile, studentDetails, refreshProfile } = useAuth()
    const [isSaving, setIsSaving] = useState(false)
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [error, setError] = useState<string | null>(null)

    // Main Form State
    const [formData, setFormData] = useState({
        // Identity (Mostly from Profile)
        full_name: '',
        bio: '',
        country: '',
        city: '',
        languages: [] as string[],
        image_url: '',
        linkedin_url: '',

        // Academic
        school: '',
        degree_level: '',
        field_of_study: '',

        // Career & Mentoring
        target_countries: [] as string[],
        target_cities: [] as string[],
        internship_type: '',
        internship_duration: '',
        start_date: '',
        objective: '',

        // Skills (From student_details if we add it, or just use mentor style)
        skills: [] as string[]
    })

    // Initialize data
    useEffect(() => {
        if (profile && studentDetails) {
            setFormData({
                full_name: profile.full_name || '',
                bio: profile.bio || '',
                country: profile.country || '',
                city: profile.city || '',
                languages: Array.isArray(profile.languages) ? profile.languages : [],
                image_url: (profile as any).image_url || '',
                linkedin_url: studentDetails.linkedin_url || '',

                school: studentDetails.school || '',
                degree_level: studentDetails.degree_level || '',
                field_of_study: studentDetails.field_of_study || '',

                target_countries: Array.isArray(studentDetails.target_countries) ? studentDetails.target_countries : [],
                target_cities: Array.isArray((studentDetails as any).target_cities) ? (studentDetails as any).target_cities : [],
                internship_type: studentDetails.internship_type || '',
                internship_duration: studentDetails.internship_duration || '',
                start_date: studentDetails.start_date || '',
                objective: studentDetails.objective || '',

                skills: Array.isArray((studentDetails as any).skills) ? (studentDetails as any).skills : []
            })
        }
    }, [profile, studentDetails])

    const handleSave = async () => {
        if (!user || !profile) return
        setIsSaving(true)
        setSaveStatus('idle')
        setError(null)

        try {
            // 1. Update Profile (Identity fields)
            const { error: pError } = await supabase
                .from('profiles')
                .update({
                    full_name: formData.full_name,
                    bio: formData.bio,
                    city: formData.city || null,
                    country: formData.country || null,
                    languages: formData.languages
                })
                .eq('user_id', user.id)

            if (pError) throw pError

            // 2. Update Student Details
            const { error: sError } = await supabase
                .from('student_details')
                .upsert({
                    profile_id: profile.id,
                    school: formData.school,
                    degree_level: formData.degree_level,
                    field_of_study: formData.field_of_study,
                    target_countries: formData.target_countries,
                    target_cities: formData.target_cities,
                    internship_type: formData.internship_type,
                    internship_duration: formData.internship_duration,
                    start_date: formData.start_date,
                    objective: formData.objective,
                    linkedin_url: formData.linkedin_url,
                    skills: formData.skills
                } as any, { onConflict: 'profile_id' })

            if (sError) throw sError

            setSaveStatus('success')
            await refreshProfile()
            setTimeout(() => setSaveStatus('idle'), 3000)
        } catch (err: any) {
            console.error('Save failed:', err)
            setSaveStatus('error')
            setError(err.message)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Mon Profil Étudiant</h1>
                    <p className="text-gray-500 text-lg">
                        Complétez votre profil pour maximiser vos chances de trouver le mentor idéal.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={cn(
                            "flex items-center gap-2 shadow-xl h-11 px-8 transition-all",
                            saveStatus === 'success' ? "bg-green-600 hover:bg-green-700 shadow-green-600/20" : "shadow-blue-600/10"
                        )}
                    >
                        {isSaving ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : saveStatus === 'success' ? (
                            <CheckCircle2 className="h-4 w-4" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        {isSaving ? 'Enregistrement...' : saveStatus === 'success' ? 'Enregistré !' : 'Enregistrer les modifications'}
                    </Button>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column (Forms) */}
                <div className="lg:col-span-8 space-y-10">
                    <StudentHeroEditor formData={formData} setFormData={setFormData} />
                    <AcademicBackgroundEditor formData={formData} setFormData={setFormData} />
                    <CareerGoalsEditor formData={formData} setFormData={setFormData} />
                    <StudentSkillsEditor formData={formData} setFormData={setFormData} />
                    <DocumentPortfolioEditor />
                </div>

                {/* Right Column (Status & Completion) */}
                <aside className="lg:col-span-4">
                    <div className="sticky top-24 space-y-6">
                        <StudentProfileCompletionCard formData={formData} isSaving={isSaving} handleSave={handleSave} />
                    </div>
                </aside>
            </div>
        </div>
    )
}
