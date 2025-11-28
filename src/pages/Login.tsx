import { useState, FormEvent, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import Button from '../components/Button'
import Input from '../components/Input'
import { AuthLayout } from '../components/auth/AuthLayout'

// ... Icons ...

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccess('Compte créé avec succès ! Veuillez vérifier votre email pour confirmer votre compte avant de vous connecter.')
    }
  }, [searchParams])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const { error } = await signIn(email, password)
      if (error) {
        setError(error.message || 'Erreur de connexion')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError('Une erreur inattendue s\'est produite')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Connexion"
      subtitle="Connectez-vous à votre compte Ankora."
    >
      {/* ... Social Buttons ... */}
      <div className="space-y-2">
        <Button type="button" variant="outline" className="w-full justify-start" onClick={() => { }}>
          <GoogleIcon className='size-4 me-2' />
          Continuer avec Google
        </Button>
        <Button type="button" variant="outline" className="w-full justify-start" onClick={() => { }}>
          <AppleIcon className='size-4 me-2' />
          Continuer avec Apple
        </Button>
      </div>

      <AuthSeparator />

      <form onSubmit={handleSubmit} className="space-y-4">
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="votre.email@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <Input
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Se connecter avec Email
        </Button>
      </form>

      <p className="text-gray-500 mt-8 text-sm text-center">
        Pas encore de compte ?{' '}
        <Link
          to="/register"
          className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-4"
        >
          Créer un compte
        </Link>
      </p>
    </AuthLayout>
  )
}
