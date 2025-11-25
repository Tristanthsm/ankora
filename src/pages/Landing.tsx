import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import Button from '../components/Button'
import { Globe, Users, MessageSquare, Shield } from 'lucide-react'

/**
 * Page d'accueil publique
 * Présente la plateforme et redirige vers l'authentification
 */
export default function Landing() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header */}
      <header className="container-custom py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">ANKORA Global Connect</h1>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button>Tableau de bord</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Connexion</Button>
                </Link>
                <Link to="/register">
                  <Button>Inscription</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container-custom py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Trouvez votre stage ou emploi à l'international
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Connectez-vous avec des mentors certifiés qui vous guideront dans votre recherche
            de stage ou d'emploi à l'étranger. Un accompagnement personnalisé pour réussir.
          </p>
          {!user && (
            <Link to="/register">
              <Button size="lg">Commencer maintenant</Button>
            </Link>
          )}
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mentors certifiés</h3>
            <p className="text-gray-600">
              Accédez à un réseau de mentors expérimentés et vérifiés dans votre pays cible
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <MessageSquare className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Messagerie temps réel</h3>
            <p className="text-gray-600">
              Communiquez directement avec vos mentors via une messagerie sécurisée
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Accompagnement personnalisé</h3>
            <p className="text-gray-600">
              Bénéficiez d'un suivi adapté à votre profil et vos objectifs professionnels
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container-custom py-8 border-t border-gray-200 mt-20">
        <p className="text-center text-gray-600">
          © 2024 ANKORA Global Connect. Tous droits réservés.
        </p>
      </footer>
    </div>
  )
}

