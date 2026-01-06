interface AboutSectionProps {
    bio: string
}

export function AboutSection({ bio }: AboutSectionProps) {
    return (
        <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">À propos</h2>

            <div className="prose prose-blue prose-sm max-w-none text-gray-600 mb-8 whitespace-pre-line">
                <p>{bio}</p>
            </div>

            {/* Timeline (Simplified) */}
            <div className="space-y-6 border-l-2 border-gray-100 pl-6 ml-2 relative">
                <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white" />
                    <h4 className="font-bold text-gray-900">Senior Product Manager</h4>
                    <p className="text-sm text-blue-700 font-medium">Innovate • 2021 - Présent</p>
                    <p className="text-sm text-gray-500 mt-1">Toronto, Canada</p>
                </div>
                <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-gray-300 ring-4 ring-white" />
                    <h4 className="font-bold text-gray-900">Product Owner</h4>
                    <p className="text-sm text-gray-700 font-medium">TechFlow • 2018 - 2021</p>
                    <p className="text-sm text-gray-500 mt-1">Paris, France</p>
                </div>
                <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-gray-200 ring-4 ring-white" />
                    <h4 className="font-bold text-gray-900">Master Management</h4>
                    <p className="text-sm text-gray-700 font-medium">HEC Paris • 2017</p>
                </div>
            </div>
        </section>
    )
}
