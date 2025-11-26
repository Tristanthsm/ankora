import { Globe2, ShieldCheck, Users } from 'lucide-react'

export type MentorProfile = {
  id: string
  name: string
  title: string
  country: string
  city: string
  rating: number
  expertise: string[]
  bio: string
  languages: string[]
  availability: string
  verified?: boolean
}

export type Testimonial = {
  id: string
  name: string
  role: string
  quote: string
  country: string
}

export const mentors: MentorProfile[] = [
  {
    id: '1',
    name: 'Amina Diallo',
    title: 'Product Manager · Berlin',
    country: 'Allemagne',
    city: 'Berlin',
    rating: 4.9,
    expertise: ['Produit', 'UX Research', 'SaaS B2B'],
    bio: '10 ans dans la tech, ex-N26 et Zalando. J’aide les étudiants à réussir leurs entretiens en anglais et à structurer leur portfolio.',
    languages: ['Français', 'Anglais', 'Allemand'],
    availability: '5 créneaux / semaine',
    verified: true,
  },
  {
    id: '2',
    name: 'Lucas Fernandez',
    title: 'Consultant Stratégie · Montréal',
    country: 'Canada',
    city: 'Montréal',
    rating: 4.8,
    expertise: ['Conseil', 'Finance', 'Pitch'],
    bio: 'Senior chez McKinsey, spécialisé en growth et marchés nord-américains. Coaching CV et simulation de cas.',
    languages: ['Français', 'Anglais', 'Espagnol'],
    availability: 'Week-end et soirées',
    verified: true,
  },
  {
    id: '3',
    name: 'Sofia Rossi',
    title: 'Data Scientist · Milan',
    country: 'Italie',
    city: 'Milan',
    rating: 4.7,
    expertise: ['IA', 'Python', 'Analytics'],
    bio: 'Expérience chez AWS et start-ups IA. J’accompagne sur les projets data, la recherche d’alternance et les entretiens techniques.',
    languages: ['Italien', 'Anglais', 'Français'],
    availability: 'Flexible',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Marine, emlyon',
    role: 'Stage Product Owner · Amsterdam',
    quote: 'Grâce à ANKORA, j’ai été accompagnée pas à pas pour décrocher mon stage en Europe. Le mentorat m’a fait gagner des mois.',
    country: 'Pays-Bas',
  },
  {
    id: 't2',
    name: 'Youssef, EPFL',
    role: 'CDI Data Analyst · Berlin',
    quote: 'Processus clair, mentors réactifs. Les mock interviews en anglais m’ont permis de signer en 6 semaines.',
    country: 'Allemagne',
  },
  {
    id: 't3',
    name: 'Camila, USP',
    role: 'VIE Marketing · Paris',
    quote: 'J’ai adoré l’approche humaine : on ne se sent jamais seul. Les mentors locaux connaissent vraiment le marché.',
    country: 'France',
  },
]

export const faqs = [
  {
    question: 'Combien coûte l’accompagnement ?',
    answer:
      'Le matching et la création de compte sont gratuits. Des packs premium (mock interviews, revue CV) seront proposés ultérieurement.',
  },
  {
    question: 'Comment sont sélectionnés les mentors ?',
    answer:
      'Chaque mentor est vérifié manuellement (LinkedIn, références, entretien). Les profils vérifiés sont signalés par un badge.',
  },
  {
    question: 'Puis-je changer de mentor ?',
    answer: 'Oui, vous pouvez renvoyer une demande à un autre mentor à tout moment depuis votre dashboard étudiant.',
  },
  {
    question: 'Proposez-vous des offres de stages/emplois ?',
    answer:
      'ANKORA facilite la mise en relation et le coaching. Les mentors peuvent partager des opportunités locales mais nous ne garantissons pas de placement.',
  },
]

export const processSteps = [
  {
    title: '1. Définir votre objectif',
    description: 'Sélectionnez votre pays cible, votre secteur et votre objectif (stage, VIE, CDI).',
    icon: Globe2,
  },
  {
    title: '2. Être matché avec un mentor local',
    description: 'Nous recommandons des mentors certifiés selon votre parcours, vos langues et votre secteur.',
    icon: Users,
  },
  {
    title: '3. Passer à l’action',
    description: 'Sessions hebdomadaires, messagerie temps réel, partage de documents, suivi des demandes en toute transparence.',
    icon: ShieldCheck,
  },
]

export const stats = [
  { label: 'Pays couverts', value: '25+', helper: 'Europe, Amérique du Nord, Asie' },
  { label: 'Mentors vérifiés', value: '180', helper: 'Experts locaux avec 5+ ans d’expérience' },
  { label: 'Taux de matching', value: '82%', helper: 'Demandes acceptées sur les 90 derniers jours' },
  { label: 'Temps de réponse', value: '<24h', helper: 'Notifications email + in-app' },
]

export const mentorApplications = [
  {
    id: 'app1',
    fullName: 'Clara Moreau',
    expertise: ['Marketing digital', 'SaaS', 'Europe'],
    motivation: 'Envie de rendre ce que j’ai reçu pendant mon VIE à Dublin.',
    availability: '3 créneaux / semaine',
  },
  {
    id: 'app2',
    fullName: 'Hassan Karim',
    expertise: ['Data', 'Cloud', 'Moyen-Orient'],
    motivation: 'Aider les étudiants à éviter mes erreurs de mobilité.',
    availability: 'Soirées (UTC+4)',
  },
]
