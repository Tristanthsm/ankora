import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { User, Home, Info, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from './Button'
import { useAuth } from '@/lib/auth'
import { UserDropdown } from './UserDropdown'
import { cn } from '@/lib/utils'

const items = [
  { name: 'Accueil', url: '/', icon: Home },
  { name: 'À propos', url: '/about', icon: Info },
  { name: 'Marketplace', url: '/marketplace', icon: Search },
]

export default function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const { user } = useAuth()
  const location = useLocation()

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
            className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>



        {/* Desktop Navigation - Centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 bg-white/80 border border-gray-200 backdrop-blur-lg py-1 px-1 rounded-full shadow-sm pointer-events-auto">
          {items.map((item) => {
            const isActive = location.pathname === item.url

            return (
              <Link
                key={item.name}
                to={item.url}
                className={cn(
                  "relative cursor-pointer text-sm font-medium px-4 py-2 rounded-full transition-colors flex items-center gap-2",
                  "text-gray-600 hover:text-blue-600",
                  isActive && "text-blue-600 bg-gray-50",
                )}
              >
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="header-lamp"
                    className="absolute inset-0 w-full bg-blue-50/50 rounded-full -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-4 pointer-events-auto">
          {user ? (
            <UserDropdown />
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="icon" className="rounded-full text-neutral-600 hover:text-blue-600 hover:bg-blue-50 bg-white/80 backdrop-blur-md shadow-sm border border-gray-100">
                <User className="h-6 w-6" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header >
  )
}
