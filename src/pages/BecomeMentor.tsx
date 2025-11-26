import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SectionHeader from '../components/SectionHeader'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import Input from '../components/Input'
import { mentorApplications } from '../data/mock'

export default function BecomeMentor() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="container-custom pt-16 pb-20 space-y-12">
        <SectionHeader
          eyebrow="Mentors"
          title="Devenez mentor certifié et accompagnez la nouvelle génération"
          description="Votre expertise locale est clé. Nous vérifions chaque profil (identité, LinkedIn, références) puis ouvrons l’accès aux demandes des étudiants internationaux."
          align="left"
        />

        <section className="grid md:grid-cols-2 gap-8">
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Pourquoi devenir mentor ?</h3>
            <ul className="space-y-3 text-gray-600">
              <li>Impact direct sur la carrière d’étudiants motivés</li>
              <li>Visibilité locale (badge vérifié) et réseau international</li>
              <li>Gestion simple des demandes et messagerie sécurisée</li>
            </ul>
          </Card>

          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Critères de sélection</h3>
            <ul className="space-y-3 text-gray-600">
              <li>3+ ans d’expérience professionnelle dans le pays cible</li>
              <li>Profil LinkedIn à jour et recommandations</li>
              <li>Disponibilités régulières et capacité à communiquer en anglais/français</li>
            </ul>
          </Card>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          {mentorApplications.map((application) => (
            <Card key={application.id}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-gray-900">{application.fullName}</p>
                <Badge color="primary">Candidat</Badge>
              </div>
              <p className="text-sm text-gray-600">{application.expertise.join(' • ')}</p>
              <p className="text-gray-700 mt-3">“{application.motivation}”</p>
              <p className="text-sm text-gray-500 mt-2">Disponibilité: {application.availability}</p>
            </Card>
          ))}
        </section>

        <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary-700">Formulaire express</p>
              <h3 className="text-2xl font-bold text-gray-900">Candidature mentor</h3>
              <p className="text-gray-600">Nous revenons sous 48h avec les prochaines étapes et la vérification.</p>
            </div>
            <form className="space-y-4">
              <Input label="Nom complet" placeholder="Votre nom" required />
              <Input label="Email professionnel" type="email" placeholder="vous@entreprise.com" required />
              <Input label="Pays/Ville" placeholder="Ex: Canada / Montréal" />
              <Input label="Domaines d’expertise" placeholder="Produit, Finance, Data..." />
              <Input label="URL LinkedIn" placeholder="https://linkedin.com/in/..." />
              <Button type="submit" className="w-full">Envoyer ma candidature</Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
