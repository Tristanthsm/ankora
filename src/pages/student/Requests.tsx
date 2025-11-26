import Card from '../../components/Card'
import SectionHeader from '../../components/SectionHeader'
import Badge from '../../components/Badge'

const requests = [
  { id: 'r1', mentor: 'Amina Diallo', status: 'accepted', date: '12 mai', message: 'Recherche stage produit à Berlin' },
  { id: 'r2', mentor: 'Lucas Fernandez', status: 'pending', date: '10 mai', message: 'CDI Data à Montréal, feedback CV' },
  { id: 'r3', mentor: 'Sofia Rossi', status: 'rejected', date: '8 mai', message: 'Projet data science et alternance' },
]

const statusColor: Record<string, 'primary' | 'success' | 'warning'> = {
  accepted: 'success',
  pending: 'primary',
  rejected: 'warning',
}

export default function StudentRequestsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Demandes"
        title="Vos demandes envoyées"
        description="Suivez le statut de chaque demande, accédez directement à la conversation lorsqu’elle est acceptée."
        align="left"
      />

      <div className="grid md:grid-cols-3 gap-4">
        {requests.map((request) => (
          <Card key={request.id}>
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-900">{request.mentor}</p>
              <Badge color={statusColor[request.status]}> {request.status}</Badge>
            </div>
            <p className="text-sm text-gray-500">Envoyée le {request.date}</p>
            <p className="text-gray-700 mt-3">{request.message}</p>
            <p className="text-primary-700 text-sm mt-3">Ouvrir la conversation</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
