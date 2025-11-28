import { Globe, ShieldCheck, Calendar, Zap, Award, Users } from 'lucide-react'

const features = [
    {
        icon: Globe,
        title: "Réseau Mondial",
        description: "Accédez à des mentors de plus de 50 pays. Élargissez vos horizons culturels et professionnels."
    },
    {
        icon: ShieldCheck,
        title: "Mentors Vérifiés",
        description: "Chaque mentor est rigoureusement sélectionné pour garantir une expertise et une pédagogie de qualité."
    },
    {
        icon: Calendar,
        title: "Planning Flexible",
        description: "Réservez des sessions selon vos disponibilités. Notre calendrier intelligent gère les fuseaux horaires."
    },
    {
        icon: Zap,
        title: "Matching IA",
        description: "Notre algorithme vous connecte avec le mentor idéal en fonction de vos objectifs et de votre profil."
    },
    {
        icon: Award,
        title: "Certifications",
        description: "Obtenez des certificats reconnus à la fin de vos parcours de mentorat pour valoriser votre CV."
    },
    {
        icon: Users,
        title: "Communauté",
        description: "Rejoignez une communauté vibrante d'étudiants et de professionnels passionnés par l'apprentissage."
    }
]

export default function FeaturesSection() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Pourquoi choisir <span className="text-blue-600">Ankora</span> ?
                    </h2>
                    <p className="text-xl text-gray-600">
                        Une plateforme conçue pour accélérer votre croissance professionnelle et personnelle.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100"
                        >
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
