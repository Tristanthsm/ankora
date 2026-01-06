import { useState, useEffect } from 'react'
import { Save, Eye, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../../../lib/auth'
import { supabase } from '../../../lib/supabase'
import Button from '../../../components/Button'
import { cn } from '../../../lib/utils'

// Components
import ProfileHeroEditor from '../../../components/space/mentor/editor/ProfileHeroEditor'
import ValuePropositionEditor from '../../../components/space/mentor/editor/ValuePropositionEditor'
import ServicesEditor from '../../../components/space/mentor/editor/ServicesEditor'
import CountriesNetworkEditor from '../../../components/space/mentor/editor/CountriesNetworkEditor'
import AboutEditor from '../../../components/space/mentor/editor/AboutEditor'
import SkillsEditor from '../../../components/space/mentor/editor/SkillsEditor'
import PricingAvailabilityEditor from '../../../components/space/mentor/editor/PricingAvailabilityEditor'
import ProfileCompletionCard from '../../../components/space/mentor/editor/ProfileCompletionCard'

export default function MentorProfileEditor() {
    const { user, profile, mentorDetails, refreshProfile } = useAuth()
    const [isSaving, setIsSaving] = useState(false)
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [error, setError] = useState<string | null>(null)

    // Main Form State
    const [formData, setFormData] = useState({
        // Identity (Mostly from Profile)
        full_name: '',
        title: '',
        company: '',
        location: '',
        languages: [] as string[],
        image_url: '',

        // Value Proposition
        short_pitch: '',
        outcomes: [] as string[],

        // Services
        services: [] as any[], // Complex objects

        // Network
        countries_network: [] as any[], // Objects with country, experience, sectors, notes

        // About
        bio: '',
        mentoring_style: [] as string[],
        career_highlights: [] as string[],

        // Skills
        key_skills: [] as string[],

        // Pricing & Availability
        hourly_rate: 0,
        response_time: '24h',
        availability: { slots: [] } as any
    })

    // Initialize data
    useEffect(() => {
        if (profile && mentorDetails) {
            // Normalize Services (string[] -> object[])
            const normalizedServices = (mentorDetails.services || []).map((s: any) => {
                if (typeof s === 'string') {
                    return {
                        id: `service-${Math.random().toString(36).substr(2, 9)}`,
                        name: s,
                        type: 'Visio',
                        duration: '45 min',
                        deliverable: '',
                        response_time: '48h',
                        active: true
                    }
                }
                return s
            })

            // Normalize Outcomes
            const defaultOutcomes = [
                'Correction et optimisation de votre CV',
                'Simulation d\'entretien technique',
                'Accès à mon réseau de contacts'
            ]
            const rawOutcomes = (mentorDetails as any).outcomes || []
            const normalizedOutcomes = rawOutcomes.length > 0 ? rawOutcomes : defaultOutcomes

            // Normalize Countries Network
            const rawCountries = mentorDetails.countries_network || []
            const normalizedCountries = Array.isArray(rawCountries)
                ? rawCountries.map((c: any) => {
                    if (typeof c === 'string') {
                        return {
                            id: `country-${Math.random().toString(36).substr(2, 9)}`,
                            country: c,
                            level: 'resident',
                            sectors: [],
                            notes: ''
                        }
                    }
                    return c
                })
                : []

            // Safe arrays for other fields
            const safeMentoringStyle = Array.isArray((mentorDetails as any).mentoring_style)
                ? (mentorDetails as any).mentoring_style
                : []
            const safeHighlights = Array.isArray((mentorDetails as any).career_highlights)
                ? (mentorDetails as any).career_highlights
                : []

            setFormData({
                full_name: profile.full_name || '',
                title: mentorDetails.current_position || profile.position || '',
                company: mentorDetails.company || profile.company || '',
                location: `${profile.city || ''}${profile.city && profile.country ? ', ' : ''}${profile.country || ''}`,
                languages: Array.isArray(profile.languages) ? profile.languages : [],
                image_url: (profile as any).image_url || '',
                short_pitch: mentorDetails.short_pitch || '',
                outcomes: normalizedOutcomes,
                services: normalizedServices,
                countries_network: normalizedCountries,
                bio: profile.bio || '',
                mentoring_style: safeMentoringStyle,
                career_highlights: safeHighlights,
                key_skills: Array.isArray(mentorDetails.key_skills) ? mentorDetails.key_skills : [],
                hourly_rate: mentorDetails.hourly_rate || 0,
                response_time: mentorDetails.response_time || '24h',
                availability: mentorDetails.availability || { slots: [] }
            })
        }
    }, [profile, mentorDetails])

    const handleSave = async () => {
        if (!user || !profile) return
        setIsSaving(true)
        setSaveStatus('idle')
        setError(null)

        try {
            // 1. Update Profile (Identity fields)
            const [city, ...countryParts] = formData.location.split(',').map(s => s.trim())
            const country = countryParts.join(', ')

            const { error: pError } = await supabase
                .from('profiles')
                .update({
                    full_name: formData.full_name,
                    position: formData.title,
                    company: formData.company,
                    city: city || null,
                    country: country || null,
                    languages: formData.languages,
                    bio: formData.bio
                })
                .eq('user_id', user.id)

            if (pError) throw pError

            // 2. Update Mentor Details
            const { error: mError } = await supabase
                .from('mentor_details')
                .upsert({
                    profile_id: profile.id,
                    current_position: formData.title,
                    company: formData.company,
                    short_pitch: formData.short_pitch,
                    hourly_rate: formData.hourly_rate,
                    response_time: formData.response_time,
                    services: formData.services,
                    availability: formData.availability,
                    key_skills: formData.key_skills,
                    countries_network: formData.countries_network,
                    outcomes: formData.outcomes,
                    mentoring_style: formData.mentoring_style,
                    career_highlights: formData.career_highlights
                } as any, { onConflict: 'profile_id' })

            if (mError) throw mError

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
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Mon Profil Mentor</h1>
                    <p className="text-gray-500 text-lg">
                        Gérez les informations visibles sur votre fiche publique Marketplace.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 border-gray-200 text-gray-700 h-11"
                        onClick={() => window.open(`/marketplace/mentor/${profile?.id}`, '_blank')}
                    >
                        <Eye className="h-4 w-4" /> Prévisualiser
                    </Button>
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
                    <ProfileHeroEditor formData={formData} setFormData={setFormData} />
                    <ValuePropositionEditor formData={formData} setFormData={setFormData} />
                    <ServicesEditor formData={formData} setFormData={setFormData} />
                    <CountriesNetworkEditor formData={formData} setFormData={setFormData} />
                    <AboutEditor formData={formData} setFormData={setFormData} />
                    <SkillsEditor formData={formData} setFormData={setFormData} />
                    <PricingAvailabilityEditor formData={formData} setFormData={setFormData} />
                </div>

                {/* Right Column (Status & Completion) */}
                <aside className="lg:col-span-4">
                    <div className="sticky top-24 space-y-6">
                        <ProfileCompletionCard formData={formData} isSaving={isSaving} handleSave={handleSave} />
                    </div>
                </aside>
            </div>
        </div>
    )
}
