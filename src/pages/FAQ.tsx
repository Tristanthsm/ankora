import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SectionHeader from '../components/SectionHeader'
import Card from '../components/Card'
import Button from '../components/Button'
import { faqs } from '../data/mock'

export default function FAQ() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="container-custom pt-16 pb-20 space-y-12">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions fréquentes"
          description="Tout ce qu’il faut savoir sur le coût, la sécurité, la sélection des mentors et la messagerie en temps réel."
          align="left"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((item) => (
            <Card key={item.question}>
              <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">{item.answer}</p>
            </Card>
          ))}
        </div>

        <Card className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary-700">Pas encore de réponse ?</p>
            <p className="text-gray-700">Contactez l’équipe ANKORA, nous répondons sous 24h.</p>
          </div>
          <div className="flex gap-3">
            <Button>Parler à l’équipe</Button>
            <Button variant="outline">Voir la roadmap</Button>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
