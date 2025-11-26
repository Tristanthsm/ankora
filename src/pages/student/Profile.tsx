import SectionHeader from '../../components/SectionHeader'
import Card from '../../components/Card'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function StudentProfilePage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Profil"
        title="Votre profil étudiant"
        description="Mettez à jour vos informations, langues et CV pour améliorer le matching."
        align="left"
      />

      <Card>
        <form className="grid md:grid-cols-2 gap-4">
          <Input label="Nom complet" placeholder="Votre nom" defaultValue="Etudiant ANKORA" />
          <Input label="Université" placeholder="Votre école" defaultValue="emlyon" />
          <Input label="Domaine d’études" placeholder="Business, Data, ..." defaultValue="Produit / Innovation" />
          <Input label="Pays cible" placeholder="Canada" defaultValue="Allemagne" />
          <Input label="Objectif" placeholder="Stage, CDI" defaultValue="Stage" />
          <Input label="Langues" placeholder="Français, Anglais" defaultValue="Français, Anglais" />
          <Input label="Lien CV" placeholder="URL vers votre CV" />
          <div className="md:col-span-2">
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
