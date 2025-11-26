import Card from '../../components/Card'
import SectionHeader from '../../components/SectionHeader'
import Badge from '../../components/Badge'
import { mentors } from '../../data/mock'

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Vue d’ensemble"
        title="Suivez votre progression et vos demandes"
        description="Accès rapide à vos prochaines étapes : matching mentor, demandes envoyées, messages non lus."
        align="left"
      />

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <p className="text-sm text-gray-500">Demandes envoyées</p>
          <p className="text-3xl font-bold text-gray-900">3</p>
          <p className="text-sm text-gray-600">1 en attente · 2 acceptées</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Messages non lus</p>
          <p className="text-3xl font-bold text-gray-900">5</p>
          <p className="text-sm text-gray-600">Notifications temps réel activées</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Pays cibles</p>
          <p className="text-3xl font-bold text-gray-900">2</p>
          <p className="text-sm text-gray-600">Canada · Allemagne</p>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Mentors recommandés</h3>
          <Badge color="primary">Filtres appliqués</Badge>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50">
              <p className="font-semibold text-gray-900">{mentor.name}</p>
              <p className="text-sm text-gray-600">{mentor.title}</p>
              <p className="text-sm text-gray-500 mt-1">{mentor.country} · {mentor.languages.join(', ')}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {mentor.expertise.map((tag) => (
                  <Badge key={tag} color="muted">{tag}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
