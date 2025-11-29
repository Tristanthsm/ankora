import { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Button from "../Button"
import { GlowingEffect } from "./GlowingEffect"

interface BentoGridProps {
  children: ReactNode
  className?: string
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  )
}

interface BentoCardProps {
  name: string
  className?: string
  background: ReactNode
  Icon: any
  description: string
  href: string
  cta: string
  color?: string
  bg?: string
}

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  color = "text-primary-600",
  bg = "bg-primary-50",
}: BentoCardProps) => (
  <div className="relative h-full rounded-2xl p-0.5">
    <GlowingEffect
      spread={40}
      glow={true}
      disabled={false}
      proximity={64}
      inactiveZone={0.01}
    />
    <div
      key={name}
      className={cn(
        "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu transition-all duration-300",
        className,
      )}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {background}
      </div>

      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10 relative">
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-75",
          bg,
          color
        )}>
          <Icon className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          {name}
        </h3>
        <p className="max-w-lg text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-20",
        )}
      >
        <a 
          href={href}
          className="pointer-events-auto"
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start"
          >
            {cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </div>

      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03]" />
    </div>
  </div>
)

