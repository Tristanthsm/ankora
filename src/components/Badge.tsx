import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'muted'
}

export default function Badge({ children, color = 'primary' }: BadgeProps) {
  const variants = {
    primary: 'bg-blue-50 text-blue-700 border-blue-200',
    secondary: 'bg-purple-50 text-purple-700 border-purple-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    muted: 'bg-gray-100 text-gray-700 border-gray-200',
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${variants[color]}`}>
      {children}
    </span>
  )
}
