import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { Sidebar } from '../../components/space/Sidebar'
import { SpaceHeader } from '../../components/space/SpaceHeader'

export default function SpaceLayout() {
  const { loading } = useAuth()
  const location = useLocation()

  // Determine title based on path - simple mapping for now
  const getPageTitle = (path: string) => {
    if (path === '/space') return 'Vue d\'ensemble'
    if (path.includes('messages')) return 'Messagerie'
    if (path.includes('profile')) return 'Mon profil'
    if (path.includes('documents')) return 'Mes documents'
    if (path.includes('search')) return 'Trouver un mentor'
    if (path.includes('student/requests') || path === '/space/requests') return 'Mes requêtes'
    if (path.includes('mentor-requests')) return 'Demandes reçues'
    if (path.includes('students')) return 'Mes étudiants'
    return 'Espace'
  }

  // Timeout de sécurité : si loading dure plus de 3 secondes, on affiche quand même
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (!loading) {
      setShowContent(true)
      return
    }

    const timeout = setTimeout(() => {
      setShowContent(true)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [loading])

  if (loading && !showContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 pt-16">
        <SpaceHeader
          title={getPageTitle(location.pathname)}
          description="Gérez votre activité et vos progrès."
        />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

