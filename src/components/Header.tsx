import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          {/* Logo placeholder - replace with actual logo */}
          <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-teal-400 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-blue-500/30 transition-all">
            A
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
            ANKORA <span className="font-normal text-gray-500">Global Connect</span>
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex gap-8 text-gray-600 font-medium">
            {['À propos', 'Comment ça marche', 'Devenir mentor', 'FAQ'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
            Connexion
          </Link>
          <Link to="/register" className="px-5 py-2.5 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
            Créer un compte
          </Link>
        </div>
      </div>
    </header>
  )
}
