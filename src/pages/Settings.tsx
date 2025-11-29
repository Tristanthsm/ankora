import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Card from '../components/Card'

export default function Settings() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container-custom pt-16 pb-20 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <Card className="space-y-3">
          <p className="text-gray-700">Cette page accueillera prochainement vos préférences de notification et sécurité.</p>
          <p className="text-sm text-gray-500">En attendant, vous pouvez gérer vos informations principales depuis la page Mon compte.</p>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
