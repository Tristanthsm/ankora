import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ArrowLeft } from 'lucide-react'
import { MentorHero } from '../components/mentor-profile/MentorHero'
import { StickyBookingCard } from '../components/mentor-profile/StickyBookingCard'
import { OutcomesSection } from '../components/mentor-profile/OutcomesSection'
import { NetworkSection } from '../components/mentor-profile/NetworkSection'
import { AboutSection } from '../components/mentor-profile/AboutSection'
import { ReviewsSection } from '../components/mentor-profile/ReviewsSection'
import { useEffect } from 'react'

import { MOCK_MENTORS } from '../data/mockMentors'

export default function MentorPublicProfile() {
    const { id } = useParams()
    const mentorData = MOCK_MENTORS.find(m => m.id === Number(id))

    if (!mentorData) {
        return <div className="p-8 text-center text-gray-500">Mentor introuvable</div>
    }

    const mentor = {
        name: mentorData.name,
        title: mentorData.role,
        company: mentorData.company,
        location: `${mentorData.city}, ${mentorData.country}`,
        image_url: mentorData.image,
        languages: mentorData.languages,
        rating: mentorData.rating,
        reviews_count: mentorData.reviews,
        verified: true, // Mock logic
        top_mentor: mentorData.badge === 'Top mentor',
        experience_years: parseInt(mentorData.experienceRange) || 5, // Fallback/parse
        response_time: mentorData.responseTime
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <div className="pt-24 pb-20">
                <div className="container-custom max-w-7xl mx-auto px-4 md:px-8">
                    {/* Back Nav */}
                    <Link to="/marketplace" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        Retour à la marketplace
                    </Link>

                    {/* Hero Section */}
                    <MentorHero mentor={mentor} />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
                        {/* Main Content (Left) */}
                        <div className="lg:col-span-8">
                            {/* Navigation Tabs (Sticky) - Optional for now, simple spacing implies sections */}
                            <OutcomesSection />
                            <NetworkSection />
                            <AboutSection bio={mentorData.bio} />
                            {/* Skills Section (Inline simplified) */}
                            <section className="mb-12">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Compétences clés</h2>
                                <div className="flex flex-wrap gap-2">
                                    {mentorData.expertise.map(skill => (
                                        <span key={skill} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm font-medium text-gray-700 hover:border-blue-200 hover:text-blue-700 transition-colors cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                            <ReviewsSection />
                        </div>

                        {/* Sidebar (Right) - Sticky */}
                        <div className="lg:col-span-4">
                            <StickyBookingCard mentorName={mentor.name} />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
