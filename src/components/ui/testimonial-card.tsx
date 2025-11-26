import { cn } from '@/lib/utils'

export interface TestimonialAuthor {
  name: string
  role: string
  country?: string
}

interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ author, text, href, className }: TestimonialCardProps) {
  const content = (
    <article
      className={cn(
        'flex h-full w-[280px] flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md sm:w-[320px]',
        className
      )}
    >
      <p className="text-sm leading-relaxed text-gray-700">“{text}”</p>
      <div className="mt-4 border-t border-gray-100 pt-3">
        <p className="font-semibold text-gray-900">{author.name}</p>
        <p className="text-sm text-gray-600">{author.role}</p>
        {author.country ? <p className="text-xs text-gray-500">{author.country}</p> : null}
      </div>
    </article>
  )

  if (href) {
    return (
      <a
        href={href}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
      >
        {content}
      </a>
    )
  }

  return content
}
