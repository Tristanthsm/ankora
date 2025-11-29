import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { 
  LayoutGrid, 
  Search, 
  Send, 
  MessageSquare, 
  User, 
  FileText,
  GraduationCap,
  Briefcase,
  Users
} from 'lucide-react'
import { useAuth } from '../../lib/auth'
import { hasRole } from '../../lib/roles'
import Navbar from '../../components/layout/Navbar'

export default function SpaceLayout() {
  const { loading, profile } = useAuth()
  
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const isStudent = profile && hasRole(profile, 'student')
  const isMentor = profile && hasRole(profile, 'mentor')

  // Liens communs
  const commonLinks = [
    { to: '/space', label: 'Vue d\'ensemble', icon: LayoutGrid },
    { to: '/space/messages', label: 'Messages', icon: MessageSquare },
    { to: '/space/profile', label: 'Mon profil', icon: User },
  ]

  // Liens étudiants
  const studentLinks = [
    { to: '/space/search', label: 'Recherche mentors', icon: Search },
    { to: '/space/requests', label: 'Mes requêtes', icon: Send },
  ]

  // Liens mentors
  const mentorLinks = [
    { to: '/space/mentor-requests', label: 'Demandes reçues', icon: Send },
    { to: '/space/students', label: 'Mes étudiants', icon: Users },
  ]

  // Liens documents
  const documentLinks = [
    { to: '/space/documents', label: 'Documents', icon: FileText },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container-custom py-10 grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="bg-white shadow-sm rounded-xl border border-gray-100 p-4 space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Espace</p>
            
            {/* Navigation principale */}
            <div className="space-y-1 mb-4">
              {commonLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/space'}
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
            </div>

            {/* Section Étudiant */}
            {(isStudent || !profile) && (
              <div className="space-y-1 mb-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 px-3 mb-2">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                  <p className="text-xs font-semibold text-gray-500 uppercase">Étudiant</p>
                </div>
                {studentLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}

            {/* Section Mentor */}
            {(isMentor || !profile) && (
              <div className="space-y-1 mb-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 px-3 mb-2">
                  <Briefcase className="h-4 w-4 text-purple-600" />
                  <p className="text-xs font-semibold text-gray-500 uppercase">Mentor</p>
                </div>
                {mentorLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}

            {/* Documents */}
            <div className="space-y-1 pt-4 border-t border-gray-100">
              {documentLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </aside>
        <section>
          <Outlet />
        </section>
      </div>
    </div>
  )
}

