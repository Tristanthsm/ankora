import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SectionHeader from '../components/SectionHeader'
import Card from '../components/Card'
import Badge from '../components/Badge'

const pillars = [
  {
    title: 'Accompagnement humain',
    description: 'Chaque étudiant est guidé par un mentor local certifié, avec des points de contact réguliers et une messagerie en temps réel.',
  },
  {
    title: 'Architecture sécurisée',
    description: 'Supabase, RLS, stockage chiffré, authentification robuste. Une base technique prête pour le scale et l’audit.',
  },
  {
    title: 'Orientation internationale',
    description: 'Processus pensé pour la mobilité : langues, fuseaux horaires, pays cibles et exigences légales.',
  },
]

const team = [
  { name: 'Equipe produit', focus: 'Onboarding, matching, expérience mentor/étudiant' },
  { name: 'Equipe technique', focus: 'Supabase, sécurité RLS, CI/CD Vercel' },
  { name: 'Equipe communauté', focus: 'Vérification mentors, partenariats école/entreprises' },
]

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="container-custom pt-16 pb-20 space-y-16">
        <SectionHeader
          eyebrow="Mission"
          title="Accélérer les carrières internationales grâce au mentorat local"
          description="ANKORA Global Connect est née d’un constat simple : partir travailler à l’étranger est complexe sans réseau local. Nous créons le pont entre étudiants ambitieux et professionnels certifiés déjà sur place."
          align="left"
        />

        <section className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="h-full">
              <p className="text-sm font-semibold text-primary-700 mb-2">Pilier</p>
              <h3 className="text-xl font-bold text-gray-900">{pillar.title}</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">{pillar.description}</p>
            </Card>
          ))}
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <Card>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Vision internationale</h3>
            <p className="text-gray-600 leading-relaxed">
              ANKORA se concentre sur les hubs internationaux (Berlin, Toronto, Singapour...) avec des mentors certifiés
              localement. L’architecture multi-pays et multilingue permet de déployer rapidement de nouveaux marchés.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge color="primary">Europe</Badge>
              <Badge color="primary">Amériques</Badge>
              <Badge color="primary">Asie</Badge>
            </div>
          </Card>

          <Card>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Equipe pluridisciplinaire</h3>
            <ul className="space-y-3 text-gray-600">
              {team.map((member) => (
                <li key={member.name} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <p className="font-semibold text-gray-900">{member.name}</p>
                  <p>{member.focus}</p>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  )
}
