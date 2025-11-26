import Card from '../../components/Card'
import SectionHeader from '../../components/SectionHeader'
import Badge from '../../components/Badge'
import Button from '../../components/Button'

const requests = [
  { id: 'm1', student: 'Yasmine, HEC', goal: 'Stage finance à Londres', status: 'pending', date: '12 mai' },
  { id: 'm2', student: 'Arthur, Centrale', goal: 'CDI data à Berlin', status: 'accepted', date: '10 mai' },
  { id: 'm3', student: 'Lina, Polytechnique', goal: 'VIE marketing à Montréal', status: 'pending', date: '9 mai' },
]

const statusColor: Record<string, 'primary' | 'success' | 'warning'> = {
  pending: 'primary',
  accepted: 'success',
  rejected: 'warning',
}

export default function MentorRequestsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Demandes reçues"
        title="Gérez les sollicitations des étudiants"
        description="Acceptez ou refusez avec un message. Les conversations s’ouvrent automatiquement après acceptation."
        align="left"
      />

      <div className="grid md:grid-cols-3 gap-4">
        {requests.map((request) => (
          <Card key={request.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{request.student}</p>
                <p className="text-sm text-gray-500">{request.goal}</p>
              </div>
              <Badge color={statusColor[request.status]}>{request.status}</Badge>
            </div>
            <p className="text-sm text-gray-500">Reçue le {request.date}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Refuser</Button>
              <Button size="sm">Accepter</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
