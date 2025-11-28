export type Mentor = {
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
    experienceRange: string
    responseTime: string
    sessions: number
    bio: string
    availabilitySlots: string[]
    primaryHelp: string
    badge?: 'Top mentor' | 'Nouveau'
}

export const MOCK_MENTORS: Mentor[] = [
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
