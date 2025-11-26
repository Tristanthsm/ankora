import Card from '../../components/Card'
import SectionHeader from '../../components/SectionHeader'
import Badge from '../../components/Badge'

const students = [
  { id: 's1', name: 'Yasmine', progress: 'CV validé · Mock entretien prévu', country: 'UK' },
  { id: 's2', name: 'Arthur', progress: 'Test technique en préparation', country: 'Allemagne' },
  { id: 's3', name: 'Lina', progress: 'Revue du pitch et du portfolio', country: 'Canada' },
]

export default function MentorStudentsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Accompagnements"
        title="Vos étudiants actifs"
        description="Suivez chaque parcours, partagez des ressources et planifiez les prochaines étapes."
        align="left"
      />

      <div className="grid md:grid-cols-3 gap-4">
        {students.map((student) => (
          <Card key={student.id}>
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-900">{student.name}</p>
              <Badge color="muted">{student.country}</Badge>
            </div>
            <p className="text-sm text-gray-600">{student.progress}</p>
            <p className="text-primary-700 text-sm mt-3">Ouvrir la fiche</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
