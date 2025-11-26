import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SectionHeader from '../components/SectionHeader'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'
import { processSteps, mentors } from '../data/mock'

const studentFlow = [
  'Créer un compte sécurisé Supabase',
  'Choisir son rôle et compléter l’onboarding',
  'Rechercher un mentor par pays, domaine, langue',
  'Envoyer une demande personnalisée',
  'Démarrer la messagerie et planifier les sessions',
]

const mentorFlow = [
  'Valider son identité et ses références',
  'Configurer ses disponibilités et domaines',
  'Recevoir et gérer les demandes',
  'Accompagner en messagerie temps réel',
  'Suivre la satisfaction et les avis',
]

export default function HowItWorks() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="container-custom pt-16 pb-20 space-y-14">
        <SectionHeader
          eyebrow="Parcours complet"
          title="Un processus clair pour étudiants et mentors"
          description="Du premier clic à la validation d’une demande, tout est guidé. Les routes sensibles sont protégées, les données sécurisées via Row Level Security."
          align="left"
        />

        <section className="grid md:grid-cols-3 gap-6">
          {processSteps.map((step) => (
            <Card key={step.title} className="h-full">
              <div className="flex items-center gap-3 text-primary-700 mb-3">
                <step.icon className="h-5 w-5" />
                <p className="font-semibold">{step.title}</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </Card>
          ))}
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Badge color="primary">Étudiant</Badge>
              <p className="font-semibold text-gray-900">5 étapes guidées</p>
            </div>
            <ul className="space-y-2 text-gray-600">
              {studentFlow.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary-600" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Badge color="secondary">Mentor</Badge>
              <p className="font-semibold text-gray-900">Validation obligatoire</p>
            </div>
            <ul className="space-y-2 text-gray-600">
              {mentorFlow.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-secondary-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-primary-700">Matching</p>
              <h3 className="text-2xl font-bold text-gray-900">Filtres avancés et transparence</h3>
              <p className="text-gray-600 mt-2">
                Filtrez par pays, expertise, langues, disponibilité et note. Les cartes mentors affichent un badge vérifié et des informations clés pour décider rapidement.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {mentors.slice(0, 3).map((mentor) => (
                <Badge key={mentor.id} color="muted">{mentor.name}</Badge>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button>Essayer la recherche</Button>
            <Button variant="outline">Voir la sécurité</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
