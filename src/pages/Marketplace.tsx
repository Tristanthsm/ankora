import { useMemo, useState } from 'react'
import { MapPin, Search, Star, Heart, Clock, Globe2, MessageCircle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'

type Mentor = {
    id: number
    name: string
    role: string
    company: string
    location: string
    expertise: string[]
    rating: number
    reviews: number
    image: string
    available: boolean
    languages: string[]
    rate: number
    responseTime: string
    sessions: number
    bio: string
    availabilitySlots: string[]
}

const MOCK_MENTORS: Mentor[] = [
    {
        id: 1,
        name: 'Thomas Anderson',
        role: 'Senior Software Engineer',
        company: 'TechCorp',
        location: 'Berlin, Allemagne',
        expertise: ['React', 'Node.js', 'Carrière Tech'],
        rating: 4.9,
        reviews: 24,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        available: true,
        languages: ['Anglais', 'Allemand'],
        rate: 80,
        responseTime: '1h',
        sessions: 143,
        bio: 'Ingénieur full‑stack passionné par les architectures scalables et la transmission de bonnes pratiques code review.',
        availabilitySlots: ['Lun · 09:00', 'Mar · 14:00', 'Jeu · 18:00']
    },
    {
        id: 2,
        name: 'Sarah Miller',
        role: 'Product Manager',
        company: 'Innovate',
        location: 'Toronto, Canada',
        expertise: ['Product Management', 'Agile', 'Leadership'],
        rating: 5.0,
        reviews: 18,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        available: true,
        languages: ['Français', 'Anglais'],
        rate: 95,
        responseTime: '45m',
        sessions: 201,
        bio: 'Coach produit spécialisée dans l’idéation, la validation rapide et la priorisation data‑driven.',
        availabilitySlots: ['Lun · 17:00', 'Mer · 13:00', 'Ven · 10:00']
    },
    {
        id: 3,
        name: 'Yuki Tanaka',
        role: 'UX Designer',
        company: 'Creative Studio',
        location: 'Tokyo, Japon',
        expertise: ['UX/UI', 'Design Thinking', 'Portfolio'],
        rating: 4.8,
        reviews: 32,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        available: false,
        languages: ['Anglais', 'Japonais'],
        rate: 70,
        responseTime: '2h',
        sessions: 118,
        bio: 'Designer centrée utilisateur avec 10 ans d’expérience sur des produits fintech et B2B complexes.',
        availabilitySlots: ['Sam · 09:00', 'Dim · 11:00']
    },
    {
        id: 4,
        name: 'James Wilson',
        role: 'Marketing Director',
        company: 'Global Brand',
        location: 'Londres, UK',
        expertise: ['Marketing Digital', 'Stratégie', 'Branding'],
        rating: 4.7,
        reviews: 15,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        available: true,
        languages: ['Anglais'],
        rate: 85,
        responseTime: '3h',
        sessions: 94,
        bio: 'Ancien CMO spécialisé dans la structuration des équipes growth et l’industrialisation des campagnes multicanales.',
        availabilitySlots: ['Mar · 11:00', 'Jeu · 16:00', 'Ven · 09:00']
    },
    {
        id: 5,
        name: 'Amira Benali',
        role: 'Data Scientist',
        company: 'DataViz',
        location: 'Paris, France',
        expertise: ['Python', 'Machine Learning', 'Data Analysis'],
        rating: 5.0,
        reviews: 41,
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        available: true,
        languages: ['Français', 'Anglais'],
        rate: 120,
        responseTime: '30m',
        sessions: 247,
        bio: 'Experte IA appliquée aux produits SaaS, avec un focus sur l’explicabilité des modèles et la mise en production.',
        availabilitySlots: ['Lun · 15:00', 'Mer · 09:00', 'Jeu · 19:00']
    },
    {
        id: 6,
        name: 'Lucas Silva',
        role: 'Entrepreneur',
        company: 'StartUp Inc',
        location: 'Lisbonne, Portugal',
        expertise: ['Entrepreneuriat', 'Levée de fonds', 'Business Plan'],
        rating: 4.9,
        reviews: 28,
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        available: true,
        languages: ['Anglais', 'Portugais', 'Espagnol'],
        rate: 110,
        responseTime: '1h',
        sessions: 167,
        bio: 'Fondateur passé par YC. J’aide à peaufiner les pitch decks, structurer les OKR et préparer les tours Seed/Série A.',
        availabilitySlots: ['Mar · 09:00', 'Mer · 18:00', 'Ven · 14:00']
    }
]

const expertiseFilters = ['Tous', 'Tech', 'Product', 'Design', 'Marketing', 'Data', 'Leadership'] as const
const languageFilters = ['Toutes', 'Français', 'Anglais', 'Espagnol', 'Allemand', 'Portugais', 'Japonais']

export default function Marketplace() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedExpertise, setSelectedExpertise] = useState<(typeof expertiseFilters)[number]>('Tous')
    const [languageFilter, setLanguageFilter] = useState<string>('Toutes')
    const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available'>('all')
    const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'price' | 'sessions'>('relevance')
    const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
    const [favorites, setFavorites] = useState<number[]>([])

    const filteredMentors = useMemo(() => {
        const filtered = MOCK_MENTORS.filter((mentor) => {
            const haystack = `${mentor.name} ${mentor.role} ${mentor.company} ${mentor.location} ${mentor.expertise.join(' ')}`.toLowerCase()
            const matchesSearch = haystack.includes(searchTerm.toLowerCase())

            const matchesExpertise =
                selectedExpertise === 'Tous' ||
                mentor.expertise.some((exp) => exp.toLowerCase().includes(selectedExpertise.toLowerCase()))

            const matchesLanguage =
                languageFilter === 'Toutes' || mentor.languages.some((lang) => lang.toLowerCase() === languageFilter.toLowerCase())

            const matchesAvailability = availabilityFilter === 'all' || mentor.available

            return matchesSearch && matchesExpertise && matchesLanguage && matchesAvailability
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
    }, [availabilityFilter, languageFilter, searchTerm, selectedExpertise, sortBy])

    const toggleFavorite = (mentorId: number) => {
        setFavorites((prev) =>
            prev.includes(mentorId) ? prev.filter((id) => id !== mentorId) : [...prev, mentorId]
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container-custom pt-24 pb-20 space-y-12">
                <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 text-white rounded-2xl p-10 shadow-lg">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                        <div className="space-y-4 max-w-2xl">
                            <p className="text-blue-100 uppercase tracking-[0.2em] text-xs">Marketplace</p>
                            <h1 className="text-3xl md:text-4xl font-bold leading-tight">Trouvez le mentor qui débloque votre prochaine étape</h1>
                            <p className="text-blue-50 text-lg">
                                Parcourez une sélection de profils vérifiés, prenez rendez-vous en un clic et échangez directement
                                depuis la plateforme.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Badge color="primary" className="bg-white/10 border-white/30 text-white">Réponse moyenne &lt; 1h</Badge>
                                <Badge color="secondary" className="bg-white/10 border-white/30 text-white">+1000 sessions bookées</Badge>
                                <Badge color="secondary" className="bg-white/10 border-white/30 text-white">Profils vérifiés</Badge>
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-md border border-white/20 w-full md:w-96">
                            <h3 className="font-semibold text-lg mb-3">Filtre express</h3>
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
                                    {['Tech', 'Product', 'Design', 'Marketing', 'Data'].map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setSelectedExpertise(filter as (typeof expertiseFilters)[number])}
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
                </div>

                <SectionHeader
                    eyebrow="Mentors disponibles"
                    title="Explorez une sélection riche et interactive"
                    description="Filtrez par expertise, langue ou disponibilité. Cliquez sur un profil pour afficher la bio détaillée, les créneaux disponibles et engager la conversation."
                />

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                        <div className="relative w-full lg:w-[420px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Rechercher par nom, rôle ou ville..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
                            {expertiseFilters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setSelectedExpertise(filter)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${selectedExpertise === filter
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-600 font-medium">Langue</label>
                            <select
                                value={languageFilter}
                                onChange={(e) => setLanguageFilter(e.target.value)}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {languageFilters.map((lang) => (
                                    <option key={lang} value={lang}>{lang}</option>
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

                        <div className="flex flex-col gap-2 justify-end">
                            <label className="text-sm text-gray-600 font-medium">Actions rapides</label>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1 border-gray-200 text-gray-700"
                                    onClick={() => { setSearchTerm(''); setSelectedExpertise('Tous'); setLanguageFilter('Toutes'); setAvailabilityFilter('all'); setSortBy('relevance') }}
                                >
                                    Réinitialiser
                                </Button>
                                <Button size="sm" className="flex-1">Trouver</Button>
                            </div>
                        </div>
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
                                    <div>
                                        <h3 className="font-bold text-gray-900">{mentor.name}</h3>
                                        <p className="text-sm text-gray-500">{mentor.role} @ {mentor.company}</p>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                            <Globe2 className="h-3.5 w-3.5" />
                                            {mentor.languages.join(' · ')}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleFavorite(mentor.id)}
                                    className={`p-2 rounded-full border ${favorites.includes(mentor.id) ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200'}`}
                                    aria-label="Ajouter aux favoris"
                                >
                                    <Heart className={`h-4 w-4 ${favorites.includes(mentor.id) ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            <div className="space-y-3 mb-6 flex-grow">
                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                    <MapPin className="h-4 w-4 text-blue-500" />
                                    {mentor.location}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {mentor.expertise.map((exp) => (
                                        <Badge key={exp} color="secondary">{exp}</Badge>
                                    ))}
                                </div>

                                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{mentor.bio}</p>

                                <div className="grid grid-cols-3 gap-3 text-sm">
                                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-center">
                                        <div className="font-semibold text-gray-900">{mentor.rate}€</div>
                                        <div className="text-gray-500 text-xs">/h</div>
                                    </div>
                                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-center">
                                        <div className="font-semibold text-gray-900">{mentor.responseTime}</div>
                                        <div className="text-gray-500 text-xs">Réponse</div>
                                    </div>
                                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-center">
                                        <div className="font-semibold text-gray-900">{mentor.sessions}</div>
                                        <div className="text-gray-500 text-xs">Sessions</div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span className="font-bold text-gray-900">{mentor.rating}</span>
                                    <span className="text-gray-400 text-sm">({mentor.reviews})</span>
                                    {mentor.available && (
                                        <span className="flex items-center gap-1 text-xs text-green-600 ml-2">
                                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                            Disponible
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="border-gray-200 hover:bg-gray-50 text-gray-700" onClick={() => setSelectedMentor(mentor)}>
                                        Voir le profil
                                    </Button>
                                    <Button size="sm" className="gap-1">
                                        <MessageCircle className="h-4 w-4" />
                                        Contacter
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredMentors.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-gray-600 text-lg">Aucun mentor ne correspond à ces filtres.</p>
                        <Button
                            variant="link"
                            onClick={() => { setSearchTerm(''); setSelectedExpertise('Tous'); setLanguageFilter('Toutes'); setAvailabilityFilter('all'); setSortBy('relevance') }}
                            className="mt-2 text-blue-600 hover:text-blue-700"
                        >
                            Réinitialiser les filtres
                        </Button>
                    </div>
                )}
            </main>

            {selectedMentor && (
                <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedMentor(null)} />
                    <div className="relative z-50 bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">
                        <div className="flex items-start justify-between p-6 border-b border-gray-100">
                            <div className="flex items-center gap-4">
                                <img src={selectedMentor.image} alt={selectedMentor.name} className="w-16 h-16 rounded-full object-cover" />
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-2xl font-bold text-gray-900">{selectedMentor.name}</h2>
                                        {selectedMentor.available && (
                                            <span className="px-2 py-1 text-xs rounded-full bg-green-50 text-green-700 border border-green-100">Disponible</span>
                                        )}
                                    </div>
                                    <p className="text-gray-600">{selectedMentor.role} · {selectedMentor.company}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {selectedMentor.location}</span>
                                        <span className="flex items-center gap-1"><Globe2 className="h-4 w-4" /> {selectedMentor.languages.join(' · ')}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right space-y-2">
                                <div className="flex items-center justify-end gap-1 text-lg font-semibold text-gray-900">
                                    <Star className="h-5 w-5 text-yellow-400 fill-current" /> {selectedMentor.rating}
                                    <span className="text-sm text-gray-500">({selectedMentor.reviews} avis)</span>
                                </div>
                                <div className="text-sm text-gray-500">{selectedMentor.sessions} sessions accompagnées</div>
                                <div className="flex gap-2 justify-end">
                                    <Button variant="outline" className="border-gray-200 text-gray-700" onClick={() => toggleFavorite(selectedMentor.id)}>
                                        <Heart className={`h-4 w-4 mr-2 ${favorites.includes(selectedMentor.id) ? 'fill-current text-red-500' : ''}`} />
                                        {favorites.includes(selectedMentor.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                                    </Button>
                                    <Button onClick={() => setSelectedMentor(null)}>Fermer</Button>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 p-6">
                            <div className="md:col-span-2 space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-900">Présentation</h3>
                                    <p className="text-gray-600 leading-relaxed">{selectedMentor.bio}</p>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-gray-800 uppercase">Expertises clés</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedMentor.expertise.map((exp) => (
                                            <Badge key={exp} color="secondary">{exp}</Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-blue-900">Réponse moyenne {selectedMentor.responseTime}</p>
                                        <p className="text-sm text-blue-800">Réservez un créneau ou envoyez un message pour démarrer la conversation.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Tarif horaire</span>
                                        <span className="text-xl font-bold text-gray-900">{selectedMentor.rate}€</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <span>Réponse moyenne</span>
                                        <span>{selectedMentor.responseTime}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <span>Sessions menées</span>
                                        <span>{selectedMentor.sessions}</span>
                                    </div>
                                    <Button className="w-full mt-2">Demander une session</Button>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-800 mb-2 uppercase">Créneaux disponibles</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedMentor.availabilitySlots.map((slot) => (
                                            <span key={slot} className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700">
                                                {slot}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )
}
