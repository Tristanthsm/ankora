import { Briefcase, Award, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import { BentoGrid, BentoCard } from './ui/BentoGrid'

const features = [
    {
        icon: Briefcase,
        title: "Réseau International",
        description: "Accédez à un réseau exclusif de mentors basés dans les plus grandes places financières et technologiques mondiales.",
        color: "text-blue-600",
        bg: "bg-blue-50",
        href: "/marketplace",
        cta: "Explorer le réseau",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-blue-50/30 to-transparent" />
        )
    },
    {
        icon: Award,
        title: "Mentors Vérifiés",
        description: "Qualité garantie. Chaque mentor est sélectionné pour son expertise et sa capacité à transmettre son savoir.",
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        href: "/how-it-works",
        cta: "En savoir plus",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 via-indigo-50/30 to-transparent" />
        )
    },
    {
        icon: Target,
        title: "Matching Intelligent",
        description: "Ne perdez plus de temps. Notre technologie vous connecte instantanément avec le profil le plus pertinent pour vous.",
        color: "text-purple-600",
        bg: "bg-purple-50",
        href: "/become-mentor",
        cta: "Découvrir",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-purple-50/30 to-transparent" />
        )
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

                <BentoGrid>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <BentoCard
                                name={feature.title}
                                Icon={feature.icon}
                                description={feature.description}
                                href={feature.href}
                                cta={feature.cta}
                                background={feature.background}
                                color={feature.color}
                                bg={feature.bg}
                            />
                        </motion.div>
                    ))}
                </BentoGrid>
            </div>
        </section>
    )
}
