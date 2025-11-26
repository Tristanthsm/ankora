interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({ eyebrow, title, description, align = 'center' }: SectionHeaderProps) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  return (
    <div className={`flex flex-col ${alignment} gap-3`}>
      {eyebrow && <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">{eyebrow}</span>}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
      {description && <p className="text-gray-600 max-w-3xl">{description}</p>}
    </div>
  )
}
