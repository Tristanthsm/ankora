import { Link, NavLink } from 'react-router-dom'
import { Globe2, LogIn } from 'lucide-react'
import Button from '../Button'
import { useAuth } from '../../lib/auth'
import UserDropdown from '../UserDropdown'

const navLinks = [
  { to: '/about', label: 'À propos' },
  { to: '/how-it-works', label: 'Comment ça marche' },
  { to: '/become-mentor', label: 'Devenir mentor' },
  { to: '/faq', label: 'FAQ' },
]

export default function Navbar() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur shadow-sm">
      <div className="container-custom py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-primary-700 font-semibold">
          <Globe2 className="h-6 w-6" />
          <span>ANKORA Global Connect</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `hover:text-primary-700 transition-colors ${isActive ? 'text-primary-700' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          {user ? (
            <UserDropdown />
          ) : (
            <>
              <Link to="/login">
                <Button size="sm" variant="outline">
                  <LogIn className="h-4 w-4 mr-2" />
                  Connexion
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Créer un compte</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
