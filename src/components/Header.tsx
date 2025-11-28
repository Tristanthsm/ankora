import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User } from 'lucide-react'
import Button from './Button'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show header if at top or scrolling up
      if (currentScrollY < 10 || currentScrollY < lastScrollY) {
        setIsVisible(true)
      } else {
        // Hide header if scrolling down and not at top
        setIsVisible(false)
      }

      setIsScrolled(currentScrollY > 10)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm' : 'bg-transparent py-6'
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
          <ul className="flex gap-8 text-neutral-600 font-medium">
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
            <Button variant="ghost" size="icon" className="rounded-full text-neutral-600 hover:text-blue-600 hover:bg-blue-50">
              <User className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
