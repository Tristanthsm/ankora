export default function HeroSection() {
    return (
        <section className="flex flex-col items-center justify-center h-[60vh] bg-gray-50 relative">
            {/* Badge */}
            <span className="px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center shadow-md mb-5">
                <span className="h-2 w-2 rounded-full bg-teal-400 mr-2"></span>
                Mentorat international personnalisé
            </span>
            {/* Titre & Call to action */}
            <h1 className="text-7xl font-bold text-gray-900 mb-4">O</h1>
            {/* Ajoute ici une phrase d’accroche, un sous-titre ou un bouton */}
        </section>
    )
}
