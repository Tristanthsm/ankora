import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    MapPin,
    Search,
    Star,
    Heart,
    Clock,
    Globe2,
    MessageCircle,
    ShieldCheck,
    SlidersHorizontal,
    ChevronDown,
    ChevronUp,
    Sparkles
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'

import {
    countryOptions,
    experienceRanges,
    expertiseFilters,
    languageOptions,
    priceRanges,
    type PriceRange
} from '../config/filters'

import { MOCK_MENTORS } from '../data/mockMentors'

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
    const [showFilters, setShowFilters] = useState<boolean>(false)
    const [favorites, setFavorites] = useState<number[]>([])

    // Ready for future Supabase connection: swap MOCK_MENTORS with a fetched list and reuse the filter states as query params.
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

            <main className="container-custom pt-24 pb-20 space-y-12">
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
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Recherche principale</p>
                            <p className="text-sm text-gray-600">Filtrez par nom, rôle ou ville, puis ouvrez les filtres avancés si besoin.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                className="md:hidden"
                                onClick={() => setShowFilters((prev) => !prev)}
                            >
                                <SlidersHorizontal className="h-4 w-4 mr-2" /> {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-200 text-gray-700"
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
                            >
                                Réinitialiser
                            </Button>
                        </div>
                    </div>

                    <div className={`${showFilters ? 'space-y-6' : 'space-y-6 hidden md:block'}`}>
                        <div className="grid lg:grid-cols-[2fr,3fr] gap-4 items-start">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Rechercher par nom, rôle ou ville..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-600 font-medium">Pays</label>
                                    <select
                                        value={countryFilter}
                                        onChange={(e) => setCountryFilter(e.target.value)}
                                        className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {countryOptions.map((option) => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-600 font-medium">Ville</label>
                                    <input
                                        type="text"
                                        value={cityFilter}
                                        onChange={(e) => setCityFilter(e.target.value)}
                                        placeholder="Ex: Paris"
                                        className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-600 font-medium">Langue</label>
                                    <select
                                        value={languageFilter}
                                        onChange={(e) => setLanguageFilter(e.target.value)}
                                        className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {languageOptions.map((lang) => (
                                            <option key={lang.value} value={lang.value}>{lang.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-600 font-medium">Disponibilité</label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setAvailabilityFilter('all')}
                                            className={`flex-1 px-3 py-2 rounded-lg border text-sm ${availabilityFilter === 'all' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            Tous
                                        </button>
                                        <button
                                            onClick={() => setAvailabilityFilter('available')}
                                            className={`flex-1 px-3 py-2 rounded-lg border text-sm ${availabilityFilter === 'available' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            Disponibles
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <SlidersHorizontal className="h-4 w-4" />
                                Filtres avancés : précisez le domaine, la fourchette de prix ou l’expérience.
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-200 text-gray-700"
                                onClick={() => setShowAdvanced((prev) => !prev)}
                            >
                                {showAdvanced ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />} Filtres avancés
                            </Button>
                        </div>

                        {showAdvanced && (
                            <div className="grid lg:grid-cols-3 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-600 font-medium">Domaine principal</label>
                                    <div className="flex flex-wrap gap-2">
                                        {expertiseFilters.map((filter) => (
                                            <button
                                                key={filter}
                                                onClick={() => setSelectedExpertise(filter)}
                                                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${selectedExpertise === filter ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                                            >
                                                {filter}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-600 font-medium">Fourchette de prix</label>
                                    <select
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(e.target.value)}
                                        className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Toutes</option>
                                        {priceRanges.map((range) => (
                                            <option key={range.value} value={range.value}>{range.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-600 font-medium">Années d’expérience</label>
                                    <select
                                        value={experienceFilter}
                                        onChange={(e) => setExperienceFilter(e.target.value)}
                                        className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {experienceRanges.map((range) => (
                                            <option key={range.value} value={range.value}>{range.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-600 font-medium">Trier par</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                                        className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="relevance">Pertinence</option>
                                        <option value="rating">Note</option>
                                        <option value="price">Tarif horaire</option>
                                        <option value="sessions">Sessions réalisées</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredMentors.map((mentor) => (
                        <Card key={mentor.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={mentor.image}
                                        alt={mentor.name}
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                                    />
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-900">{mentor.name}</h3>
                                            {mentor.badge && <Badge color="secondary" className="text-xs">{mentor.badge}</Badge>}
                                        </div>
                                        <p className="text-sm text-gray-600">{mentor.role} · {mentor.company}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <button
                                        onClick={() => toggleFavorite(mentor.id)}
                                        className={`p-2 rounded-full border ${favorites.includes(mentor.id) ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200'}`}
                                        aria-label="Ajouter aux favoris"
                                    >
                                        <Heart className={`h-4 w-4 ${favorites.includes(mentor.id) ? 'fill-current' : ''}`} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6 flex-grow">
                                <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                                    <MapPin className="h-4 w-4 text-blue-600" />
                                    <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded-full border border-blue-100 text-xs">{mentor.city}, {mentor.country}</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Badge color="primary" className="bg-blue-50 text-blue-700 border-blue-100">{mentor.primaryHelp}</Badge>
                                    {mentor.expertise.slice(0, 2).map((exp) => (
                                        <Badge key={exp} color="secondary">{exp}</Badge>
                                    ))}
                                    {mentor.expertise.length > 2 && <Badge color="secondary">+{mentor.expertise.length - 2}</Badge>}
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-600 pt-2">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="font-bold text-gray-900">{mentor.rating}</span>
                                        <span className="text-gray-400">({mentor.reviews})</span>
                                    </div>
                                    <div className="font-bold text-gray-900">{mentor.rate}€<span className="text-gray-500 font-normal">/h</span></div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 mt-auto">
                                <Link to={`/marketplace/mentor/${mentor.id}`} className="block w-full">
                                    <Button className="w-full">
                                        Voir le profil
                                    </Button>
                                </Link>
                            </div>
                        </Card>
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
