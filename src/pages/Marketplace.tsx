import { useMemo, useState } from 'react'
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
import SectionHeader from '../components/SectionHeader'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import MentorProfileView from '../components/marketplace/MentorProfileView'
import {
    countryOptions,
    experienceRanges,
    expertiseFilters,
    languageOptions,
    priceRanges,
    type FilterOption,
    type PriceRange
} from '../config/filters'

type Mentor = {
    id: number
    name: string
    role: string
    company: string
    country: string
    city: string
    expertise: string[]
    rating: number
    reviews: number
    image: string
    available: boolean
    languages: string[]
    rate: number
    experienceRange: FilterOption['value']
    responseTime: string
    sessions: number
    bio: string
    availabilitySlots: string[]
    primaryHelp: string
    badge?: 'Top mentor' | 'Nouveau'
}

const MOCK_MENTORS: Mentor[] = [
    {
        id: 1,
        name: 'Thomas Anderson',
        role: 'Senior Software Engineer',
        company: 'TechCorp',
        country: 'Allemagne',
        city: 'Berlin',
        expertise: ['React', 'Node.js', 'Carrière Tech'],
        rating: 4.9,
        reviews: 24,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        available: true,
        languages: ['Anglais', 'Allemand'],
        rate: 80,
        experienceRange: '3-7',
        responseTime: '1h',
        sessions: 143,
        bio: 'Ingénieur full‑stack passionné par les architectures scalables et la transmission de bonnes pratiques code review.',
        availabilitySlots: ['Lun · 09:00', 'Mar · 14:00', 'Jeu · 18:00'],
        primaryHelp: 'Carrière Tech',
        badge: 'Top mentor'
    },
    {
        id: 2,
        name: 'Sarah Miller',
        role: 'Product Manager',
        company: 'Innovate',
        country: 'Canada',
        city: 'Toronto',
        expertise: ['Product Management', 'Agile', 'Leadership'],
        rating: 5.0,
        reviews: 18,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        available: true,
        languages: ['Français', 'Anglais'],
        rate: 95,
        experienceRange: '7+',
        responseTime: '45m',
        sessions: 201,
        bio: 'Coach produit spécialisée dans l’idéation, la validation rapide et la priorisation data‑driven.',
        availabilitySlots: ['Lun · 17:00', 'Mer · 13:00', 'Ven · 10:00'],
        primaryHelp: 'Stratégie Produit',
        badge: 'Top mentor'
    },
    {
        id: 3,
        name: 'Yuki Tanaka',
        role: 'UX Designer',
        company: 'Creative Studio',
        country: 'Japon',
        city: 'Tokyo',
        expertise: ['UX/UI', 'Design Thinking', 'Portfolio'],
        rating: 4.8,
        reviews: 32,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        available: false,
        languages: ['Anglais', 'Japonais'],
        rate: 70,
        experienceRange: '3-7',
        responseTime: '2h',
        sessions: 118,
        bio: 'Designer centrée utilisateur avec 10 ans d’expérience sur des produits fintech et B2B complexes.',
        availabilitySlots: ['Sam · 09:00', 'Dim · 11:00'],
        primaryHelp: 'Portfolio UX',
        badge: 'Nouveau'
    },
    {
        id: 4,
        name: 'James Wilson',
        role: 'Marketing Director',
        company: 'Global Brand',
        country: 'UK',
        city: 'Londres',
        expertise: ['Marketing Digital', 'Stratégie', 'Branding'],
        rating: 4.7,
        reviews: 15,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        available: true,
        languages: ['Anglais'],
        rate: 85,
        experienceRange: '7+',
        responseTime: '3h',
        sessions: 94,
        bio: 'Ancien CMO spécialisé dans la structuration des équipes growth et l’industrialisation des campagnes multicanales.',
        availabilitySlots: ['Mar · 11:00', 'Jeu · 16:00', 'Ven · 09:00'],
        primaryHelp: 'Stage Marketing'
    },
    {
        id: 5,
        name: 'Amira Benali',
        role: 'Data Scientist',
        company: 'DataViz',
        country: 'France',
        city: 'Paris',
        expertise: ['Python', 'Machine Learning', 'Data Analysis'],
        rating: 5.0,
        reviews: 41,
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        available: true,
        languages: ['Français', 'Anglais'],
        rate: 120,
        experienceRange: '7+',
        responseTime: '30m',
        sessions: 247,
        bio: 'Experte IA appliquée aux produits SaaS, avec un focus sur l’explicabilité des modèles et la mise en production.',
        availabilitySlots: ['Lun · 15:00', 'Mer · 09:00', 'Jeu · 19:00'],
        primaryHelp: 'Coaching Data',
        badge: 'Top mentor'
    },
    {
        id: 6,
        name: 'Lucas Silva',
        role: 'Entrepreneur',
        company: 'StartUp Inc',
        country: 'Portugal',
        city: 'Lisbonne',
        expertise: ['Entrepreneuriat', 'Levée de fonds', 'Business Plan'],
        rating: 4.9,
        reviews: 28,
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        available: true,
        languages: ['Anglais', 'Portugais', 'Espagnol'],
        rate: 110,
        experienceRange: '7+',
        responseTime: '1h',
        sessions: 167,
        bio: 'Fondateur passé par YC. J’aide à peaufiner les pitch decks, structurer les OKR et préparer les tours Seed/Série A.',
        availabilitySlots: ['Mar · 09:00', 'Mer · 18:00', 'Ven · 14:00'],
        primaryHelp: 'Coaching fundraising',
        badge: 'Top mentor'
    }
]

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
    const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
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
                <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 text-white rounded-2xl p-10 shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 pointer-events-none" />
                    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-10">
                        <div className="space-y-4 max-w-2xl">
                            <p className="text-blue-100 uppercase tracking-[0.2em] text-xs">Marketplace</p>
                            <h1 className="text-3xl md:text-4xl font-bold leading-tight">Trouvez le mentor qui accélère votre prochain cap</h1>
                            <p className="text-blue-50 text-lg">Réservez un mentor vérifié et obtenez des réponses concrètes en quelques heures, pour avancer dès cette semaine.</p>
                            <div className="flex flex-wrap gap-3 items-center">
                                <Badge color="primary" className="bg-white/10 border-white/30 text-white">Réponse moyenne &lt; 1h</Badge>
                                <Badge color="secondary" className="bg-white/10 border-white/30 text-white">+1000 sessions bookées</Badge>
                                <Badge color="secondary" className="bg-white/10 border-white/30 text-white flex items-center gap-1">
                                    <ShieldCheck className="h-4 w-4" /> Profils vérifiés
                                </Badge>
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-md border border-white/20 w-full md:w-96 shadow-md">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-lg">Filtre express</h3>
                                <span className="text-xs text-blue-100">Front-only (mock)</span>
                            </div>
                            <div className="space-y-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-100 h-5 w-5" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher par nom, rôle, ville..."
                                        className="w-full bg-white/10 border border-white/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-white/60"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {expertiseFilters.filter((filter) => filter !== 'Tous').map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setSelectedExpertise(filter)}
                                            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${selectedExpertise === filter ? 'bg-white text-blue-600 border-white' : 'border-white/30 text-white hover:bg-white/10'}`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setSelectedExpertise('Tous')}
                                        className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${selectedExpertise === 'Tous' ? 'bg-white text-blue-600 border-white' : 'border-white/30 text-white hover:bg-white/10'}`}
                                    >
                                        Tout afficher
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative mt-6 md:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-blue-100">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4" />
                            Profils fictifs utilisés pour la démo – la version finale affichera de vrais mentors ANKORA.
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            Pensé pour les étudiants : accès rapide, mentorat ciblé, échanges sécurisés.
                        </div>
                    </div>
                </div>

                <SectionHeader
                    eyebrow="Mentors disponibles"
                    title="Explorez une sélection prête à être réservée"
                    description="Tous les mentors sont vérifiés avant d’apparaître ici. Affinez par expertise, langue ou disponibilité pour trouver le bon match."
                />

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
                                <Button className="w-full" onClick={() => setSelectedMentor(mentor)}>
                                    Voir le profil
                                </Button>
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

            {selectedMentor && (
                <MentorProfileView mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />
            )}

            <Footer />
        </div>
    )
}
