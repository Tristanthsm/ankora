import { useMemo, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'

import {
    countryOptions,
    experienceRanges,
    expertiseFilters,
    languageOptions,
    priceRanges,
    type PriceRange
} from '../config/filters'

import { MOCK_MENTORS } from '../data/mockMentors'
import { MentorCard } from '../components/marketplace/MentorCard'
import { FilterBar } from '../components/marketplace/FilterBar'
import { Sparkles, Globe2, Search, SlidersHorizontal, ChevronDown, ChevronUp, ShieldCheck, Clock, MessageCircle } from 'lucide-react'

export default function Marketplace() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedExpertise, setSelectedExpertise] = useState<(typeof expertiseFilters)[number]>('Tous')
    const [languageFilter, setLanguageFilter] = useState<string>('Toutes')
    const [countryFilter, setCountryFilter] = useState<string>('all')
    const [cityFilter, setCityFilter] = useState<string>('')
    const [priceRange, setPriceRange] = useState<PriceRange['value'] | ''>('')
    const [experienceFilter, setExperienceFilter] = useState<string>('all')
    const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available'>('all')
    const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'price' | 'sessions'>('relevance')
    const [showAdvanced, setShowAdvanced] = useState<boolean>(false)
    const [favorites, setFavorites] = useState<number[]>([])

    // Filter Logic
    const filteredMentors = useMemo(() => {
        const filtered = MOCK_MENTORS.filter((mentor) => {
            const haystack = `${mentor.name} ${mentor.role} ${mentor.company} ${mentor.city} ${mentor.country} ${mentor.primaryHelp} ${mentor.expertise.join(' ')}`.toLowerCase()
            const matchesSearch = haystack.includes(searchTerm.toLowerCase())

            const matchesExpertise =
                selectedExpertise === 'Tous' ||
                mentor.expertise.some((exp) => exp.toLowerCase().includes(selectedExpertise.toLowerCase()))

            const matchesLanguage =
                languageFilter === 'Toutes' || mentor.languages.some((lang) => lang.toLowerCase() === languageFilter.toLowerCase())

            const matchesAvailability = availabilityFilter === 'all' || mentor.available

            const matchesCountry = countryFilter === 'all' || mentor.country === countryFilter
            const matchesCity = !cityFilter.trim() || mentor.city.toLowerCase().includes(cityFilter.toLowerCase())

            const selectedRange = priceRanges.find((range) => range.value === priceRange)
            const matchesPrice =
                !selectedRange ||
                ((selectedRange.min ? mentor.rate >= selectedRange.min : true) &&
                    (selectedRange.max ? mentor.rate <= selectedRange.max : true))

            const matchesExperience = experienceFilter === 'all' || mentor.experienceRange === experienceFilter

            return (
                matchesSearch &&
                matchesExpertise &&
                matchesLanguage &&
                matchesAvailability &&
                matchesCountry &&
                matchesCity &&
                matchesPrice &&
                matchesExperience
            )
        })

        switch (sortBy) {
            case 'rating':
                return [...filtered].sort((a, b) => b.rating - a.rating)
            case 'price':
                return [...filtered].sort((a, b) => a.rate - b.rate)
            case 'sessions':
                return [...filtered].sort((a, b) => b.sessions - a.sessions)
            default:
                return filtered
        }
    }, [availabilityFilter, cityFilter, countryFilter, experienceFilter, languageFilter, priceRange, searchTerm, selectedExpertise, sortBy])

    const toggleFavorite = (mentorId: number) => {
        setFavorites((prev) =>
            prev.includes(mentorId) ? prev.filter((id) => id !== mentorId) : [...prev, mentorId]
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container-custom pt-36 pb-20 space-y-12">
                <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 md:p-12 shadow-sm">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_85%_0%,rgba(99,102,241,0.08),transparent_30%)]" />
                    <div className="absolute inset-x-0 -bottom-16 h-32 bg-gradient-to-t from-gray-50 to-transparent" />

                    <div className="relative grid items-center gap-10 lg:grid-cols-[1.6fr,1fr]">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600 shadow-sm">
                                    <Sparkles className="h-4 w-4 text-blue-600" /> Mentors disponibles
                                </span>
                                <span className="text-xs text-gray-500">Marketplace</span>
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-3xl font-semibold leading-tight text-gray-900 md:text-4xl">Explorez une sélection prête à être réservée</h1>
                                <p className="text-lg text-gray-600 md:max-w-3xl">
                                    Tous les mentors sont vérifiés avant d’apparaître ici. Affinez par expertise, langue ou disponibilité pour trouver le bon match.
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-sm font-medium text-gray-800">
                                    <ShieldCheck className="h-4 w-4 text-blue-600" />
                                    Profils vérifiés
                                </div>
                                <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-sm font-medium text-gray-800">
                                    <Clock className="h-4 w-4 text-blue-600" />
                                    Réponse moyenne {'< 1h'}
                                </div>
                                <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-sm font-medium text-gray-800">
                                    <MessageCircle className="h-4 w-4 text-blue-600" />
                                    Sessions sécurisées
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-2 shadow-sm">
                                    <Globe2 className="h-4 w-4 text-blue-600" /> Filtrez par langue, pays ou fuseau horaire
                                </div>
                                <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-2 shadow-sm">
                                    <SlidersHorizontal className="h-4 w-4 text-blue-600" /> Ajustez selon l’expertise et le tarif
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                <FilterBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    showAdvanced={showAdvanced}
                    setShowAdvanced={setShowAdvanced}
                    countryFilter={countryFilter}
                    setCountryFilter={setCountryFilter}
                    cityFilter={cityFilter}
                    setCityFilter={setCityFilter}
                    languageFilter={languageFilter}
                    setLanguageFilter={setLanguageFilter}
                    availabilityFilter={availabilityFilter}
                    setAvailabilityFilter={setAvailabilityFilter}
                    selectedExpertise={selectedExpertise}
                    setSelectedExpertise={setSelectedExpertise}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    experienceFilter={experienceFilter}
                    setExperienceFilter={setExperienceFilter}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    onReset={() => {
                        setSearchTerm('')
                        setSelectedExpertise('Tous')
                        setLanguageFilter('Toutes')
                        setAvailabilityFilter('all')
                        setCountryFilter('all')
                        setCityFilter('')
                        setPriceRange('')
                        setExperienceFilter('all')
                        setSortBy('relevance')
                    }}
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredMentors.map((mentor) => (
                        <MentorCard
                            key={mentor.id}
                            mentor={mentor}
                            isFavorite={favorites.includes(mentor.id)}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>

                {filteredMentors.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm space-y-3">
                        <p className="text-gray-700 text-lg font-semibold">Aucun mentor ne correspond à ces filtres.</p>
                        <p className="text-gray-500 text-sm">Ajustez vos critères ou relancez une recherche plus large.</p>
                        <Button
                            onClick={() => {
                                setSearchTerm('')
                                setSelectedExpertise('Tous')
                                setLanguageFilter('Toutes')
                                setAvailabilityFilter('all')
                                setCountryFilter('all')
                                setCityFilter('')
                                setPriceRange('')
                                setExperienceFilter('all')
                                setSortBy('relevance')
                            }}
                            className="mt-2"
                        >
                            Réinitialiser les filtres
                        </Button>
                    </div>
                )}
            </main>



            <Footer />
        </div>
    )
}
