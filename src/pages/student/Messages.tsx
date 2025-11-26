import Card from '../../components/Card'
import SectionHeader from '../../components/SectionHeader'
import Badge from '../../components/Badge'
import Button from '../../components/Button'

const conversations = [
  { id: 'c1', mentor: 'Amina Diallo', lastMessage: 'On révise le pitch demain ?', unread: 2, status: 'accepted' },
  { id: 'c2', mentor: 'Lucas Fernandez', lastMessage: 'Peux-tu envoyer la dernière version du CV ?', unread: 0, status: 'accepted' },
]

export default function StudentMessagesPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Messagerie"
        title="Conversations en temps réel"
        description="Basé sur Supabase Realtime Channels. Statuts lus/non lus et partage de fichiers prêts pour l’itération."
        align="left"
      />

      <div className="grid md:grid-cols-2 gap-4">
        {conversations.map((conversation) => (
          <Card key={conversation.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{conversation.mentor}</p>
                <p className="text-sm text-gray-600">Dernier message : {conversation.lastMessage}</p>
              </div>
              <Badge color={conversation.unread ? 'primary' : 'muted'}>
                {conversation.unread ? `${conversation.unread} non lus` : 'À jour'}
              </Badge>
            </div>
            <Button size="sm" className="self-start">Ouvrir la conversation</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
