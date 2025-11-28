import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import { Search, MapPin, Star } from 'lucide-react'

// Données mockées pour les mentors
const MOCK_MENTORS = [
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
        available: true
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
        available: true
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
        available: false
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
        available: true
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
        available: true
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
        available: true
    }
]

export default function Marketplace() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedExpertise, setSelectedExpertise] = useState('Tous')

    // Filtrage des mentors
    const filteredMentors = MOCK_MENTORS.filter(mentor => {
        const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.role.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesExpertise = selectedExpertise === 'Tous' || mentor.expertise.includes(selectedExpertise)

        return matchesSearch && matchesExpertise
    })

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container-custom pt-32 pb-20">
                <SectionHeader
                    eyebrow="Marketplace"
                    title="Trouvez votre mentor idéal"
                    description="Explorez notre communauté de professionnels internationaux prêts à vous guider vers le succès."
                    align="center"
                />

                {/* Filtres et Recherche */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-12 mt-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Rechercher par nom, rôle ou ville..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                            {['Tous', 'Tech', 'Marketing', 'Product', 'Design'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setSelectedExpertise(filter === 'Tech' ? 'React' : filter === 'Product' ? 'Product Management' : filter)} // Simplification pour la démo
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${(selectedExpertise === filter || (filter === 'Tous' && selectedExpertise === 'Tous'))
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grille de Mentors */}
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
                                    </div>
                                </div>
                                {mentor.available && (
                                    <span className="flex h-3 w-3 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                )}
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
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span className="font-bold text-gray-900">{mentor.rating}</span>
                                    <span className="text-gray-400 text-sm">({mentor.reviews})</span>
                                </div>
                                <Button size="sm" variant="outline" className="border-gray-200 hover:bg-gray-50 text-gray-700">Contacter</Button>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredMentors.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">Aucun mentor trouvé pour cette recherche.</p>
                        <Button
                            variant="link"
                            onClick={() => { setSearchTerm(''); setSelectedExpertise('Tous') }}
                            className="mt-2 text-blue-600 hover:text-blue-700"
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
