import { useParams } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Card from '../../components/Card'
import SectionHeader from '../../components/SectionHeader'
import Button from '../../components/Button'
import Input from '../../components/Input'

export default function ConversationPage() {
  const { conversationId } = useParams()

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="container-custom pt-16 pb-20 space-y-8">
        <SectionHeader
          eyebrow="Messagerie"
          title={`Conversation #${conversationId}`}
          description="Interface inspirée d’un chat temps réel Supabase : historique, statut lu/non-lu, pièces jointes."
          align="left"
        />

        <Card className="space-y-4">
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <div className="p-3 rounded-lg bg-gray-50">Bonjour, merci pour votre demande !</div>
            <div className="p-3 rounded-lg bg-primary-50 text-primary-900 self-end">Voici mon CV et mes objectifs pour le Canada.</div>
          </div>
          <form className="flex gap-3">
            <Input className="flex-1" placeholder="Ecrire un message" />
            <Button type="submit">Envoyer</Button>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
