import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AuthForm } from '../components/auth/AuthForm'
import { AuthLayout } from '../components/auth/AuthLayout'
import { Home } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()

  return (
    <AuthLayout
      title="Rejoignez-nous"
      subtitle="Créez votre compte gratuitement"
    >
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-4 font-medium bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full"
        >
          <Home className="h-4 w-4" />
          Retour à l'accueil
        </Link>
        <AuthForm
          initialMode="signup"
          onSuccess={() => navigate('/')}
        />
      </div>
    </AuthLayout>
  )
}
