import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User } from 'lucide-react'
import Button from './Button'

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
          {/* Logo */}
          <img
            src="/ankora-logo.png"
            alt="ANKORA Global Connect"
            className="h-20 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex gap-8 text-gray-600 font-medium">
            <li>
              <Link to="/about" className="hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full">
                À propos
              </Link>
            </li>
            <li>
              <Link to="/marketplace" className="hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full">
                Marketplace
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
              <User className="h-6 w-6 text-gray-700" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
