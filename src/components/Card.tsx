import { ReactNode } from 'react'

/**
 * Composant Card réutilisable
 * Container avec ombre et padding pour afficher du contenu structuré
 */
interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export default function Card({
  children,
  className = '',
  padding = 'md',
  onClick
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-sm border border-gray-100
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

