import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import FullPageLoader from './FullPageLoader'

/**
 * Composant de protection de route
 * Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
 * Affiche un loader pendant le chargement de l'état d'authentification
 */
interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return <FullPageLoader />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

