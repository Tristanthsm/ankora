import Card from '../../components/Card'
import SectionHeader from '../../components/SectionHeader'
import Badge from '../../components/Badge'
import Button from '../../components/Button'

const conversations = [
  { id: 'cm1', student: 'Yasmine', lastMessage: 'Merci pour le template CV !', unread: 1 },
  { id: 'cm2', student: 'Arthur', lastMessage: 'On peut décaler à vendredi ?', unread: 0 },
]

export default function MentorMessagesPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Messagerie"
        title="Conversations actives"
        description="Centralisez vos échanges et partagez des fichiers via Supabase Storage (prévu MVP)."
        align="left"
      />

      <div className="grid md:grid-cols-2 gap-4">
        {conversations.map((conversation) => (
          <Card key={conversation.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{conversation.student}</p>
                <p className="text-sm text-gray-600">{conversation.lastMessage}</p>
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
