import { motion } from 'framer-motion'
import { Linkedin, Mail } from 'lucide-react'

const team = [
    {
        name: "Lucas Velay",
        role: "Chef de projet (CEO)",
        image: "/images/team/member1.png",
        bio: "",
        linkedin: "https://www.linkedin.com/in/lucas-velay-034a2a32b/",
        email: "lucas.velay@edu.em-lyon.com"
    },
    {
        name: "Baptiste DE OLIVEIRA MENDES",
        role: "Responsable Communication & Marketing",
        image: "/images/team/member2.png",
        bio: "",
        linkedin: "https://www.linkedin.com/in/baptiste-de-oliveira-mendes-a892a133b/",
        email: "baptiste.deoliveiramendes@edu.em-lyon.com"
    },
    {
        name: "Tristan THOMAS",
        role: "Responsable technique (CTO)",
        image: "/images/team/member3.png",
        bio: "",
        linkedin: "https://www.linkedin.com/in/tristan-thomas-b52629317/",
        email: "tristan.thomas@edu.em-lyon.com"
    },
    {
        name: "Hanaé MOLET",
        role: "Responsable Produit",
        image: "/images/team/member4.png",
        bio: "",
        linkedin: "https://www.linkedin.com/in/molet-hana%C3%A9-544b1633b/",
        email: "hanae.molet@edu.em-lyon.com"
    },
    {
        name: "Corentin CHARRA",
        role: "Responsable Qualité & Relation",
        image: "/images/team/member5.png",
        bio: "",
        linkedin: "https://www.linkedin.com/in/corentin-charra-b3a48728a/",
        email: "corentin.charra@edu.em-lyon.com"
    }
]

export default function TeamSection() {
    return (
        <section className="py-24 bg-white">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        L'équipe <span className="text-blue-600">Ankora</span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        Des passionnés unis par une mission commune : révolutionner le mentorat.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden ring-4 ring-gray-50 group-hover:ring-blue-100 transition-all duration-300">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                            <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>
                            {/* <p className="text-sm text-gray-500 mb-4 line-clamp-2">{member.bio}</p> */}

                            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                                <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-gray-900 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
