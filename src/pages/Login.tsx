import { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { AuthForm } from '../components/auth/AuthForm'
import { AuthLayout } from '../components/auth/AuthLayout'
import { Home } from 'lucide-react'

export default function Login() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    // If registered param matches, we could show a message if we wanted to utilize the AuthForm for it, 
    // but AuthForm handles its own success state. 
    // We'll leave the searchParams hook for now in case we need to pass props later.
  }, [searchParams])

  useEffect(() => {
    if (!loading && user) {
      navigate('/', { replace: true })
    }
  }, [loading, navigate, user])

  return (
    <AuthLayout
      title="Bienvenue !"
      subtitle="Connectez-vous pour continuer"
    >
      <div className="w-full max-w-md space-y-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full"
        >
          <Home className="h-4 w-4" />
          Retour à l'accueil
        </Link>
        <AuthForm
          initialMode="login"
          onSuccess={() => navigate('/')}
        />
      </div>
    </AuthLayout>
  )
}
