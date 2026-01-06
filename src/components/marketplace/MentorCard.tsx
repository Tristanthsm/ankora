import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, MapPin, Star } from 'lucide-react'
import Button from '../Button'

export interface Mentor {
    id: number
    name: string
    role: string
    company: string
    city: string
    country: string
    image: string
    badge?: string
    primaryHelp: string
    expertise: string[]
    languages: string[]
    available: boolean
    rate: number
    rating: number
    reviews: number
    sessions: number
    experienceRange: string
}

interface MentorCardProps {
    mentor: Mentor
    isFavorite: boolean
    onToggleFavorite: (id: number) => void
}

export function MentorCard({ mentor, isFavorite, onToggleFavorite }: MentorCardProps) {
    return (
        <div className="group relative flex flex-col rounded-2xl bg-white border border-gray-100 p-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-100/50">
            {/* Header: User Info & Favorite */}
            <div className="flex items-start justify-between">
                <div className="flex gap-4">
                    <div className="relative">
                        <img
                            src={mentor.image}
                            alt={mentor.name}
                            className="h-14 w-14 rounded-full object-cover ring-2 ring-gray-50 transition-transform group-hover:scale-105"
                        />
                        {mentor.available && (
                            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" title="Disponible" />
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900 leading-tight">{mentor.name}</h3>
                            {mentor.badge && (
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-600">
                                    {mentor.badge}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{mentor.role}</p>
                        <p className="text-xs font-medium text-gray-400">{mentor.company}</p>
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        onToggleFavorite(mentor.id)
                    }}
                    className={`rounded-full p-2 transition-colors ${isFavorite
                        ? 'bg-red-50 text-red-500'
                        : 'text-gray-300 hover:bg-gray-50 hover:text-gray-500'
                        }`}
                >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
            </div>

            {/* Divider */}
            <div className="my-4 h-px w-full bg-gray-50" />

            {/* Body: Focus & Stats */}
            <div className="space-y-4 flex-grow">
                {/* Location & Language */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {mentor.city}, {mentor.country}
                    </div>
                    {mentor.reviews > 0 && (
                        <div className="flex items-center gap-1.5">
                            <Star className="h-3.5 w-3.5 text-yellow-400 fill-current" />
                            <span className="font-medium text-gray-900">{mentor.rating}</span>
                            <span className="text-gray-400">({mentor.reviews})</span>
                        </div>
                    )}
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 border border-gray-100">
                        {mentor.primaryHelp}
                    </span>
                    {mentor.expertise.slice(0, 2).map((exp) => (
                        <span key={exp} className="inline-flex items-center rounded-md bg-white px-2.5 py-1 text-xs font-medium text-gray-500 border border-gray-100">
                            {exp}
                        </span>
                    ))}
                    {mentor.expertise.length > 2 && (
                        <span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-400 border border-gray-100">
                            +{mentor.expertise.length - 2}
                        </span>
                    )}
                </div>
            </div>

            {/* Footer: Price & Action */}
            <div className="mt-5 flex items-center justify-between gap-4">
                <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">12%</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">/ Salaire</p>
                </div>
                <Link to={`/marketplace/mentor/${mentor.id}`} className="flex-1">
                    <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 shadow-none border-0 h-10 rounded-xl font-medium text-sm">
                        Voir le profil
                    </Button>
                </Link>
            </div>
        </div>
    )
}
