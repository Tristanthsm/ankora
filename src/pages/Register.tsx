import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { AuthForm } from '../components/auth/AuthForm'

export default function Register() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleEmailSubmit = async (data: { email: string; password?: string }) => {
    setError('')

    if (!data.password || data.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setIsLoading(true)

    try {
      const { error, data: authData } = await signUp(data.email, data.password)
      if (error) {
        setError(error.message || 'Erreur lors de l\'inscription')
      } else {
        navigate('/login?registered=true')
      }
    } catch (err) {
      setError('Une erreur inattendue s\'est produite')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <AuthForm
          mode="register"
          onEmailSubmit={handleEmailSubmit}
          isLoading={isLoading}
          error={error}
          onSocialSignIn={(provider) => console.log('Social sign in:', provider)}
        />
      </div>
    </div>
  )
}
