import { useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Card from '../../components/Card'
import SectionHeader from '../../components/SectionHeader'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useAuth } from '../../lib/auth'
import { MessageSquare, Send } from 'lucide-react'

interface ConversationPreview {
  id: string
  title: string
  lastMessage: string
  timestamp: string
}

export default function InboxPage() {
  const { user, profile } = useAuth()
  const [activeConversation, setActiveConversation] = useState<string>('1')
  const [message, setMessage] = useState('')

  const conversations = useMemo<ConversationPreview[]>(
    () => [
      {
        id: '1',
        title: 'Coaching carrière - Amine',
        lastMessage: 'Merci pour les documents, on avance !',
        timestamp: 'Il y a 2h',
      },
      {
        id: '2',
        title: 'Préparation entretien - Sofia',
        lastMessage: 'Peux-tu revoir mon CV ?',
        timestamp: 'Hier',
      },
      {
        id: '3',
        title: 'Nouveau matching - Lucas',
        lastMessage: 'Bienvenue dans la messagerie Ankora 🎉',
        timestamp: 'Il y a 3 jours',
      },
    ],
    []
  )

  if (!user) return <Navigate to="/login" replace />
  if (!profile) return <Navigate to="/onboarding" replace />

  const active = conversations.find((c) => c.id === activeConversation) || conversations[0]

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container-custom pt-16 pb-20 space-y-8">
        <SectionHeader
          eyebrow="Messagerie"
          title="Messages"
          description="Retrouvez vos conversations entre étudiants et mentors."
          align="left"
        />

        <Card className="grid lg:grid-cols-[320px_1fr] gap-6">
          <aside className="border-r border-gray-100 pr-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase">Conversations</h3>
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setActiveConversation(conversation.id)}
                  className={`w-full text-left p-3 rounded-lg border transition shadow-sm ${
                    activeConversation === conversation.id
                      ? 'border-primary-200 bg-primary-50 text-primary-900'
                      : 'border-gray-100 bg-white hover:border-primary-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>{conversation.title}</span>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{conversation.lastMessage}</p>
                </button>
              ))}
            </div>
          </aside>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Conversation</p>
                <h4 className="text-lg font-semibold text-gray-900">{active.title}</h4>
              </div>
              <MessageSquare className="h-5 w-5 text-primary-600" />
            </div>

            <div className="space-y-3 max-h-[420px] overflow-y-auto">
              <div className="p-3 rounded-lg bg-white border border-gray-100 w-fit">Bonjour, comment puis-je t’aider ?</div>
              <div className="p-3 rounded-lg bg-primary-50 border border-primary-100 w-fit ml-auto">Je cherche un mentor pour mes candidatures.</div>
              <div className="p-3 rounded-lg bg-white border border-gray-100 w-fit">Partage ton CV et ta ville cible pour commencer.</div>
            </div>

            <form
              className="flex gap-3"
              onSubmit={(e) => {
                e.preventDefault()
                setMessage('')
              }}
            >
              <Input
                className="flex-1"
                placeholder="Écrire un message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type="submit" disabled={!message}>
                <Send className="h-4 w-4 mr-2" />
                Envoyer
              </Button>
            </form>
          </section>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
