import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { AuthForm } from '../components/auth/AuthForm'
import { Home } from 'lucide-react'

export default function Login() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, user, loading } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccess('Compte créé avec succès ! Veuillez vérifier votre email pour confirmer votre compte avant de vous connecter.')
    }
  }, [searchParams])

  useEffect(() => {
    if (!loading && user) {
      navigate('/', { replace: true })
    }
  }, [loading, navigate, user])

  const handleEmailSubmit = async (data: { email: string; password?: string }) => {
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const { error } = await signIn(data.email, data.password || '')
      if (error) {
        setError(error.message || 'Erreur de connexion')
      } else {
        navigate('/')
      }
    } catch (err) {
      setError('Une erreur inattendue s\'est produite')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <Home className="h-4 w-4" />
          Retour à l'accueil
        </Link>
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm mb-4">
            {success}
          </div>
        )}
        <AuthForm
          mode="login"
          onEmailSubmit={handleEmailSubmit}
          isLoading={isLoading}
          error={error}
          onSocialSignIn={(provider) => console.log('Social sign in:', provider)}
        />
      </div>
    </div>
  )
}
