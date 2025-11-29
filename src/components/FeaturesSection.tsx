import { Briefcase, Award, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GlowingEffect } from './ui/GlowingEffect'

const features = [
    {
        icon: Briefcase,
        title: "Réseau International",
        description: "Accédez à un réseau exclusif de mentors basés dans les plus grandes places financières et technologiques mondiales.",
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        icon: Award,
        title: "Mentors Vérifiés",
        description: "Qualité garantie. Chaque mentor est sélectionné pour son expertise et sa capacité à transmettre son savoir.",
        color: "text-indigo-600",
        bg: "bg-indigo-50"
    },
    {
        icon: Target,
        title: "Matching Intelligent",
        description: "Ne perdez plus de temps. Notre technologie vous connecte instantanément avec le profil le plus pertinent pour vous.",
        color: "text-purple-600",
        bg: "bg-purple-50"
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

                <div className="grid md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <div key={index} className="relative h-full rounded-2xl p-0.5">
                            <GlowingEffect
                                spread={40}
                                glow={true}
                                disabled={false}
                                proximity={64}
                                inactiveZone={0.01}
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative flex h-full flex-col items-center text-center group rounded-2xl bg-white p-8"
                            >
                                <div className={cn(
                                    "w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                                    feature.bg,
                                    feature.color
                                )}>
                                    <feature.icon className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
