import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { Home, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from '../../lib/auth'

import { Search } from "lucide-react"

const items = [
  { name: 'Accueil', url: '/', icon: Home },
  { name: 'À propos', url: '/about', icon: Info },
  { name: 'Marketplace', url: '/marketplace', icon: Search },
]

export default function PublicTabBar() {
  const { user } = useAuth()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(location.pathname)
  const hiddenRoutes = ['/login', '/register']

  useEffect(() => {
    setActiveTab(location.pathname)
  }, [location])

  if (user || hiddenRoutes.some((route) => location.pathname.startsWith(route))) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 sm:top-6 sm:bottom-auto">
      <div className="flex items-center gap-3 bg-white/80 border border-gray-200 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.url

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.url)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-gray-600 hover:text-blue-600",
                isActive && "text-blue-600 bg-gray-100",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={20} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-blue-50/50 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-blue-600/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-blue-600/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-blue-600/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
