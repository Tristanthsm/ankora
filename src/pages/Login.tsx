import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import Button from '../components/Button'
import Input from '../components/Input'
import { AuthLayout } from '../components/auth/AuthLayout'
import { Github } from 'lucide-react'

const GoogleIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <g>
      <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
    </g>
  </svg>
);

const AppleIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.02 3.93-.72 1.69.24 2.85 1.19 3.6 2.33-3.17 1.88-2.65 6.08.66 7.51-.5 1.49-1.2 2.96-2.27 4.11zm-2.9-16.32c.67-1.13.29-2.72-1.02-3.67-1.24-.9-2.94-.52-3.57.58-.65 1.14-.38 2.9 1.05 3.66.97.52 2.82.68 3.54-.57z" />
  </svg>
);

const AuthSeparator = () => {
  return (
    <div className="flex w-full items-center justify-center my-4">
      <div className="bg-gray-200 h-px w-full" />
      <span className="text-gray-500 px-2 text-xs uppercase">OU</span>
      <div className="bg-gray-200 h-px w-full" />
    </div>
  );
};

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
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
      <div className="space-y-2">
        <Button type="button" variant="outline" className="w-full justify-start" onClick={() => { }}>
          <GoogleIcon className='size-4 me-2' />
          Continuer avec Google
        </Button>
        <Button type="button" variant="outline" className="w-full justify-start" onClick={() => { }}>
          <AppleIcon className='size-4 me-2' />
          Continuer avec Apple
        </Button>
        <Button type="button" variant="outline" className="w-full justify-start" onClick={() => { }}>
          <Github className='size-4 me-2' />
          Continuer avec GitHub
        </Button>
      </div>

      <AuthSeparator />

      <form onSubmit={handleSubmit} className="space-y-4">
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
