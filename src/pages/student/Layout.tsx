import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { MessageSquare, Search, Send, User, LayoutGrid } from 'lucide-react'
import { useAuth } from '../../lib/auth'
import { hasRole } from '../../lib/roles'
import Navbar from '../../components/layout/Navbar'

const links = [
  { to: '/student/dashboard', label: 'Vue d’ensemble', icon: LayoutGrid },
  { to: '/student/search', label: 'Recherche mentors', icon: Search },
  { to: '/student/requests', label: 'Mes requêtes', icon: Send },
  { to: '/student/messages', label: 'Messages', icon: MessageSquare },
  { to: '/student/profile', label: 'Mon profil', icon: User },
]

export default function StudentLayout() {
  const { profile } = useAuth()
  if (profile && !hasRole(profile, 'student')) {
    return <Navigate to="/mentor/dashboard" replace />
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container-custom py-10 grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="bg-white shadow-sm rounded-xl border border-gray-100 p-4 space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Espace étudiant</p>
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
