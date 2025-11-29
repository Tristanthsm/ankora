import { Briefcase, Award, Target, MessageSquare, Shield, UserCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const features = [
    {
        title: "Réseau International",
        description: "Accédez à un réseau exclusif de mentors basés dans les plus grandes places financières et technologiques mondiales.",
        icon: <Briefcase className="h-8 w-8" />,
        href: "/marketplace"
    },
    {
        title: "Mentors Vérifiés",
        description: "Qualité garantie. Chaque mentor est sélectionné pour son expertise et sa capacité à transmettre son savoir.",
        icon: <Award className="h-8 w-8" />,
        href: "/how-it-works"
    },
    {
        title: "Matching Intelligent",
        description: "Ne perdez plus de temps. Notre technologie vous connecte instantanément avec le profil le plus pertinent pour vous.",
        icon: <Target className="h-8 w-8" />,
        href: "/become-mentor"
    },
    {
        title: "Messagerie Temps Réel",
        description: "Communiquez instantanément avec vos mentors ou étudiants grâce à notre système de messagerie en temps réel.",
        icon: <MessageSquare className="h-8 w-8" />,
        href: "/messages"
    },
    {
        title: "Plateforme Sécurisée",
        description: "Vos données sont protégées avec les meilleures pratiques de sécurité. Profils vérifiés, communications sécurisées et confidentialité garantie.",
        icon: <Shield className="h-8 w-8" />,
        href: "/about"
    },
    {
        title: "Accompagnement Personnalisé",
        description: "Bénéficiez d'un suivi sur mesure adapté à vos objectifs. Chaque parcours est unique et conçu pour maximiser vos chances de réussite.",
        icon: <UserCheck className="h-8 w-8" />,
        href: "/how-it-works"
    }
]

export default function FeaturesSection() {
    return (
        <section className="py-24 bg-white">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                            L'excellence <span className="text-blue-600">Ankora</span>
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Une approche premium du mentorat, conçue pour ceux qui visent l'excellence.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <Feature key={feature.title} {...feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

const Feature = ({
    title,
    description,
    icon,
    index,
    href,
}: {
    title: string
    description: string
    icon: React.ReactNode
    index: number
    href: string
}) => {
    const totalFeatures = features.length
    const isLastRow = index >= Math.floor(totalFeatures / 3) * 3
    const isFirstColumn = index % 3 === 0

    return (
        <a
            href={href}
            className={cn(
                "flex flex-col lg:border-r py-10 relative group/feature border-neutral-200 hover:bg-neutral-50 transition-colors duration-200",
                isFirstColumn && "lg:border-l border-neutral-200",
                !isLastRow && "lg:border-b border-neutral-200",
                "cursor-pointer"
            )}
        >
            {!isLastRow && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent pointer-events-none" />
            )}

            {isLastRow && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent pointer-events-none" />
            )}

            <div className="mb-4 relative z-10 px-10 text-neutral-600 group-hover/feature:text-primary-600 transition-colors duration-200">
                {icon}
            </div>

            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 group-hover/feature:bg-primary-500 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800">
                    {title}
                </span>
            </div>

            <p className="text-sm text-neutral-600 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </a>
    )
}
