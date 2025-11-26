import { NavLink } from 'react-router-dom'
import { GraduationCap, HelpCircle, Home, LogIn, Route, Info } from 'lucide-react'
import { useAuth } from '../../lib/auth'

const tabs = [
  { to: '/', label: 'Accueil', icon: Home },
  { to: '/how-it-works', label: 'Parcours', icon: Route },
  { to: '/become-mentor', label: 'Mentorat', icon: GraduationCap },
  { to: '/faq', label: 'FAQ', icon: HelpCircle },
  { to: '/about', label: 'À propos', icon: Info },
  { to: '/login', label: 'Connexion', icon: LogIn },
]

export default function PublicTabBar() {
  const { user } = useAuth()

  if (user) {
    return null
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur md:hidden">
      <nav className="flex items-center justify-around px-2 py-3 text-[11px] font-medium text-gray-600">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-colors ${
                  isActive ? 'text-primary-700' : 'text-gray-600'
                }`
              }
            >
              <Icon className="h-5 w-5" aria-hidden />
              <span>{tab.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
