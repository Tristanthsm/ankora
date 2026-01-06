import Header from "./Header"
import { Ankora } from "./BackgroundPaths"
import WaitlistSection from "./WaitlistSection"
import FeaturesSection from "./FeaturesSection"
import { TestimonialsSection } from "./TestimonialsSection"
import Footer from "./Footer"
import CityAccordion from "./CityAccordion"
import { GooeyText } from "./ui/GooeyText"
import { GradientButton } from "./ui/GradientButton"

import { useAuth } from "../lib/auth"

export default function HomePage() {
    const { user } = useAuth()

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <Ankora />
                <WaitlistSection />
                <CityAccordion />
                <FeaturesSection />
                <TestimonialsSection />
                {/* Call to Action Section */}
                <section className="py-20 bg-blue-600 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="container-custom relative z-10 text-center text-white">
                        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl max-w-5xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 flex flex-col md:flex-row items-center justify-center gap-2">
                                <span>Prêt à transformer votre</span>
                                <GooeyText
                                    texts={["avenir", "carrière", "futur", "vie"]}
                                    textClassName="text-3xl md:text-5xl font-bold text-white"
                                    className="h-[40px] md:h-[60px] w-[150px] md:w-[200px]"
                                />
                                <span>?</span>
                            </h2>
                            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                                Rejoignez dès aujourd'hui la communauté Ankora et commencez votre voyage vers l'excellence.
                            </p>
                            <GradientButton
                                onClick={() => window.location.href = user ? '/marketplace' : '/register'}
                                className="shadow-xl hover:shadow-2xl"
                            >
                                {user ? "Accéder à la marketplace" : "Créer mon compte gratuitement"}
                            </GradientButton>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
