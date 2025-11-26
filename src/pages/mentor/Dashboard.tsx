import SectionHeader from '../../components/SectionHeader'
import Card from '../../components/Card'
import Badge from '../../components/Badge'

const kpis = [
  { label: 'Demandes reçues', value: '6', helper: '2 en attente' },
  { label: 'Etudiants accompagnés', value: '4', helper: 'Satisfaction moyenne 4.8/5' },
  { label: 'Slots restants', value: '3', helper: 'Mettre à jour vos disponibilités' },
]

export default function MentorDashboardPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Vue d’ensemble"
        title="Vos accompagnements en un coup d’œil"
        description="Pilotez vos demandes, disponibilités et conversations actives."
        align="left"
      />

      <div className="grid md:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <p className="text-sm text-gray-500">{kpi.label}</p>
            <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
            <p className="text-sm text-gray-600">{kpi.helper}</p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Etat des demandes</h3>
          <Badge color="primary">Mise à jour temps réel</Badge>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="p-4 bg-gray-50 rounded-lg">2 en attente</div>
          <div className="p-4 bg-gray-50 rounded-lg">3 acceptées</div>
          <div className="p-4 bg-gray-50 rounded-lg">1 refusée</div>
        </div>
      </Card>
    </div>
  )
}
