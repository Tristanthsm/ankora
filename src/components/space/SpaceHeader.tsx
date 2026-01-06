import React from 'react'
import { UserDropdown } from '../UserDropdown'

interface SpaceHeaderProps {
    title?: string
    description?: string
}

export function SpaceHeader({ title, description }: SpaceHeaderProps) {
    return (
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-gray-100 bg-white/80 px-8 backdrop-blur-md">
            <div>
                {title && <h1 className="text-xl font-bold text-gray-900">{title}</h1>}
                {description && <p className="text-sm text-gray-500">{description}</p>}
            </div>

            <div className="flex items-center gap-4">

                <div className="h-8 w-px bg-gray-100" />
                <UserDropdown />
            </div>
        </header>
    )
}
