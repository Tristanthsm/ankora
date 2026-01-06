import { MapPin, Globe, Star, ShieldCheck, Share2, Flag, CheckCircle2, Clock, Briefcase } from 'lucide-react'
import Button from '../Button'
import Badge from '../Badge'

interface MentorHeroProps {
    mentor: {
        name: string
        title: string
        company: string
        location: string
        languages: string[]
        rating: number
        reviews_count: number
        image_url: string
        verified?: boolean
        top_mentor?: boolean
        experience_years?: number
        response_time?: string
    }
}

export function MentorHero({ mentor }: MentorHeroProps) {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm mb-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar */}
                <div className="relative">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0">
                        <img
                            src={mentor.image_url}
                            alt={mentor.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {mentor.verified && (
                        <div className="absolute bottom-2 right-2 bg-blue-600 text-white p-1.5 rounded-full ring-4 ring-white shadow-sm" title="Mentor Vérifié">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pt-2">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        {mentor.top_mentor && (
                            <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">
                                <Star className="w-3 h-3 mr-1 fill-amber-700" />
                                Top Mentor
                            </Badge>
                        )}
                        {mentor.experience_years && (
                            <Badge variant="outline" className="border-gray-200 text-gray-600 bg-gray-50/50">
                                <Briefcase className="w-3 h-3 mr-1" />
                                {mentor.experience_years}+ ans d'expérience
                            </Badge>
                        )}
                        {mentor.response_time && (
                            <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50/50">
                                <Clock className="w-3 h-3 mr-1" />
                                Réponse {mentor.response_time}
                            </Badge>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 truncate">
                        {mentor.name}
                    </h1>
                    <p className="text-xl text-gray-600 font-medium mb-4">
                        {mentor.title} <span className="text-gray-400 font-normal">chez</span> <span className="text-blue-900">{mentor.company}</span>
                    </p>

                    <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 shrink-0" />
                            {mentor.location}
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 shrink-0" />
                            {mentor.languages.join(' · ')}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-900 font-medium">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                            {mentor.rating}
                            <span className="text-gray-500 font-normal underline decoration-gray-300 underline-offset-2 cursor-pointer hover:text-gray-700">
                                ({mentor.reviews_count} avis)
                            </span>
                        </div>
                    </div>
                </div>

                {/* Secondary Actions */}
                <div className="flex gap-2 self-start md:self-center">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 hover:bg-gray-50">
                        <Share2 className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 hover:bg-gray-50">
                        <Flag className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
