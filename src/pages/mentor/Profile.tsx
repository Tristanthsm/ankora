import SectionHeader from '../../components/SectionHeader'
import Card from '../../components/Card'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function MentorProfilePage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Profil mentor"
        title="Mettez à jour votre disponibilité et vos expertises"
        description="Les informations de profil sont utilisées pour le matching automatique et le badge vérifié."
        align="left"
      />

      <Card>
        <form className="grid md:grid-cols-2 gap-4">
          <Input label="Nom complet" defaultValue="Mentor ANKORA" />
          <Input label="Entreprise" defaultValue="Startup locale" />
          <Input label="Poste" defaultValue="Product Lead" />
          <Input label="Pays/Ville" defaultValue="Canada / Montréal" />
          <Input label="Domaines" defaultValue="Produit, Go-to-market" />
          <Input label="Disponibilités" defaultValue="3 créneaux / semaine" />
          <Input label="Langues" defaultValue="Français, Anglais" />
          <Input label="LinkedIn" placeholder="https://linkedin.com/in/..." />
          <div className="md:col-span-2">
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
