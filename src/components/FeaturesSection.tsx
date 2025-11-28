import { Globe, ShieldCheck, Calendar, Zap, Award, Users, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from './Button'
import { cn } from '@/lib/utils'

const features = [
    {
        icon: Globe,
        title: "Réseau Mondial",
        description: "Accédez à des mentors de plus de 50 pays. Élargissez vos horizons culturels et professionnels.",
        className: "md:col-span-2 bg-blue-50/50 border-blue-100"
    },
    {
        icon: ShieldCheck,
        title: "Mentors Vérifiés",
        description: "Chaque mentor est rigoureusement sélectionné pour garantir une expertise et une pédagogie de qualité.",
        className: "md:col-span-1 bg-white border-gray-100"
    },
    {
        icon: Calendar,
        title: "Planning Flexible",
        description: "Réservez des sessions selon vos disponibilités. Notre calendrier intelligent gère les fuseaux horaires.",
        className: "md:col-span-1 bg-white border-gray-100"
    },
    {
        icon: Zap,
        title: "Matching IA",
        description: "Notre algorithme vous connecte avec le mentor idéal en fonction de vos objectifs et de votre profil.",
        className: "md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-transparent",
        iconClassName: "text-white bg-white/20",
        titleClassName: "text-white",
        descriptionClassName: "text-blue-50"
    },
    {
        icon: Award,
        title: "Certifications",
        description: "Obtenez des certificats reconnus à la fin de vos parcours de mentorat pour valoriser votre CV.",
        className: "md:col-span-1 bg-white border-gray-100"
    },
    {
        icon: Users,
        title: "Communauté",
        description: "Rejoignez une communauté vibrante d'étudiants et de professionnels passionnés par l'apprentissage.",
        className: "md:col-span-2 bg-white border-gray-100"
    }
]

export default function FeaturesSection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                            Pourquoi choisir <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Ankora</span> ?
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Une plateforme conçue pour accélérer votre croissance professionnelle et personnelle, avec des outils puissants et une communauté bienveillante.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={cn(
                                "p-8 rounded-3xl border shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-full",
                                feature.className
                            )}
                        >
                            <div>
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110",
                                    feature.iconClassName || "bg-blue-50 text-blue-600"
                                )}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className={cn(
                                    "text-2xl font-bold mb-3",
                                    feature.titleClassName || "text-gray-900"
                                )}>
                                    {feature.title}
                                </h3>
                                <p className={cn(
                                    "text-lg leading-relaxed",
                                    feature.descriptionClassName || "text-gray-600"
                                )}>
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link to="/marketplace">
                        <Button size="lg" className="rounded-full px-8 h-14 text-lg shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-1 transition-all">
                            Trouver un mentor
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link to="/about">
                        <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all">
                            En savoir plus sur nous
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
