import Header from "./Header"
import { BackgroundPaths } from "./BackgroundPaths"
import FeaturesSection from "./FeaturesSection"
import { TestimonialsSection } from "./TestimonialsSection"
import Footer from "./Footer"

const testimonials = [
    {
        author: {
            name: "Sarah Martin",
            role: "Étudiante en Droit",
            country: "France"
        },
        text: "Grâce à Ankora, j'ai trouvé un mentor à Londres qui m'a aidée à préparer mon année d'échange. Une expérience inestimable !",
    },
    {
        author: {
            name: "Thomas Dubois",
            role: "Entrepreneur",
            country: "Canada"
        },
        text: "La qualité des mentors est impressionnante. J'ai pu échanger avec des experts que je n'aurais jamais pu contacter autrement.",
    },
    {
        author: {
            name: "Emma Wilson",
            role: "Marketing Digital",
            country: "USA"
        },
        text: "L'interface est super intuitive et le matching a été parfait du premier coup. Je recommande à 100% !",
    },
    {
        author: {
            name: "Lucas Moretti",
            role: "Développeur Web",
            country: "Italie"
        },
        text: "Un réseau incroyable pour booster sa carrière. Les conseils reçus m'ont permis de décrocher mon premier job.",
    }
]

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <BackgroundPaths />
                <FeaturesSection />
                <TestimonialsSection
                    title="Ils nous font confiance"
                    description="Découvrez les retours de notre communauté grandissante d'étudiants et de mentors à travers le monde."
                    testimonials={testimonials}
                />
                {/* Call to Action Section */}
                <section className="py-20 bg-blue-600 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="container-custom relative z-10 text-center text-white">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Prêt à transformer votre avenir ?</h2>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                            Rejoignez dès aujourd'hui la communauté Ankora et commencez votre voyage vers l'excellence.
                        </p>
                        <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                            Créer mon compte gratuitement
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
