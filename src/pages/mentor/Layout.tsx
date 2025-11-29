import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { LayoutGrid, Send, MessageSquare, User, GraduationCap } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import { useAuth } from '../../lib/auth'

const links = [
  { to: '/mentor/dashboard', label: 'Vue d’ensemble', icon: LayoutGrid },
  { to: '/mentor/requests', label: 'Demandes reçues', icon: Send },
  { to: '/mentor/students', label: 'Mes étudiants', icon: GraduationCap },
  { to: '/mentor/messages', label: 'Messages', icon: MessageSquare },
  { to: '/mentor/profile', label: 'Mon profil', icon: User },
]

export default function MentorLayout() {
  const { loading } = useAuth()
  
  // Ne pas bloquer l'accès - permettre même sans profil ou avec un autre rôle
  // L'utilisateur peut compléter le formulaire dans le dashboard
  // Timeout de sécurité : si loading dure plus de 3 secondes, on affiche quand même
  const [showContent, setShowContent] = useState(false)
  
  useEffect(() => {
    if (!loading) {
      setShowContent(true)
      return
    }
    
    // Timeout de sécurité après 3 secondes
    const timeout = setTimeout(() => {
      setShowContent(true)
    }, 3000)
    
    return () => clearTimeout(timeout)
  }, [loading])
  
  if (loading && !showContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container-custom py-10 grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="bg-white shadow-sm rounded-xl border border-gray-100 p-4 space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Espace mentor</p>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          ))}
        </aside>
        <section>
          <Outlet />
        </section>
      </div>
    </div>
  )
}
