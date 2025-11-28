import Header from "./Header"
import BackgroundPaths from "./BackgroundPaths"
import FeaturesSection from "./FeaturesSection"
import TestimonialsSection from "./TestimonialsSection"
import Footer from "./Footer"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <BackgroundPaths />
                <FeaturesSection />
                <TestimonialsSection />
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
