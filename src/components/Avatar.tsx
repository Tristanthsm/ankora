interface AvatarProps {
  name: string
  imageUrl?: string | null
  size?: 'sm' | 'md' | 'lg'
}

export default function Avatar({ name, imageUrl, size = 'md' }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  const dimensions = { sm: 'h-8 w-8 text-sm', md: 'h-10 w-10 text-base', lg: 'h-14 w-14 text-lg' }

  return imageUrl ? (
    <img
      src={imageUrl}
      alt={name}
      className={`rounded-full object-cover ${dimensions[size]}`}
    />
  ) : (
    <div
      className={`rounded-full bg-primary-100 text-primary-700 font-semibold flex items-center justify-center ${dimensions[size]}`}
      aria-hidden
    >
      {initials}
    </div>
  )
}
