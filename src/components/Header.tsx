import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { User } from 'lucide-react'
import Button from './Button'
import { useAuth } from '../lib/auth'
import UserDropdown from './UserDropdown'

export default function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show header if at top or scrolling up
      if (currentScrollY < 10 || currentScrollY < lastScrollY.current) {
        setIsVisible(true)
      } else {
        // Hide header if scrolling down and not at top
        setIsVisible(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'
        } bg-transparent py-6`}
    >
      <div className="container-custom flex items-center justify-between pointer-events-none">
        <Link to="/" className="flex items-center gap-2 group pointer-events-auto">
          {/* Logo */}
          <img
            src="/ankora-logo.png"
            alt="ANKORA Global Connect"
            className="h-32 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Navigation removed to avoid duplication with PublicTabBar */}

        <div className="flex items-center gap-4 pointer-events-auto">
          {user ? (
            <UserDropdown />
          ) : (
            <Link to="/login">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-neutral-600 hover:text-blue-600 hover:bg-blue-50 bg-white/80 backdrop-blur-md shadow-sm border border-gray-100"
              >
                <User className="h-6 w-6" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
