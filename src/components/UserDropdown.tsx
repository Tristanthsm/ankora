import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, MessageSquare, Settings, UserCircle, GraduationCap, Briefcase } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { hasRole } from '../lib/roles'

export default function UserDropdown() {
  const { user, profile, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  const initials = profile?.full_name
    ? profile.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : user.email?.slice(0, 2).toUpperCase()

  const studentEnabled = hasRole(profile, 'student')
  const mentorEnabled = hasRole(profile, 'mentor')

  const handleLogout = async () => {
    setOpen(false)
    await logout()
    navigate('/')
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="h-10 w-10 rounded-full bg-primary-100 text-primary-800 font-semibold flex items-center justify-center border border-primary-200 shadow-sm"
        aria-label="Menu utilisateur"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm text-gray-500">Connecté en tant que</p>
            <p className="text-sm font-semibold text-gray-900 truncate">{profile?.full_name || user.email}</p>
          </div>

          <nav className="py-1 text-sm">
            <Link
              to="/dashboard/student"
              className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition ${
                studentEnabled ? 'text-gray-800' : 'text-gray-400 cursor-not-allowed'
              }`}
              onClick={(e) => {
                if (!studentEnabled) {
                  e.preventDefault()
                  navigate('/onboarding?role=student')
                }
                setOpen(false)
              }}
            >
              <GraduationCap className="h-4 w-4" />
              Espace Étudiant
            </Link>

            <Link
              to={mentorEnabled ? '/dashboard/mentor' : '/onboarding?role=mentor'}
              className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition ${
                mentorEnabled ? 'text-gray-800' : 'text-gray-400'
              }`}
              title={mentorEnabled ? undefined : 'Disponible après création d’un profil mentor'}
              onClick={() => setOpen(false)}
            >
              <Briefcase className="h-4 w-4" />
              Espace Offreur / Mentor
            </Link>

            <Link to="/messages" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-800" onClick={() => setOpen(false)}>
              <MessageSquare className="h-4 w-4" />
              Messages
            </Link>

            <div className="my-1 border-t border-gray-100" />

            <Link to="/account" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-800" onClick={() => setOpen(false)}>
              <UserCircle className="h-4 w-4" />
              Mon compte
            </Link>
            <Link to="/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-800" onClick={() => setOpen(false)}>
              <Settings className="h-4 w-4" />
              Paramètres
            </Link>

            <div className="my-1 border-t border-gray-100" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Se déconnecter
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}
