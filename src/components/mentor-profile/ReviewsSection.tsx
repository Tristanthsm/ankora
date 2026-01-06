import { Star, ThumbsUp } from 'lucide-react'

export function ReviewsSection() {
    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Avis étudiants (18)</h2>
                <div className="text-sm text-gray-500">Note moyenne: <span className="font-bold text-gray-900">5.0/5</span></div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">ML</div>
                            <div>
                                <div className="font-bold text-gray-900 text-sm">Marie L.</div>
                                <div className="text-xs text-gray-500">Stage décroché @ Google</div>
                            </div>
                        </div>
                        <div className="flex text-amber-400">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed italic">
                        "Incroyable ! Grâce à Sarah, j'ai refait tout mon CV et j'ai eu 3 entretiens en 2 semaines. Elle connaît vraiment le marché canadien."
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-sm">PD</div>
                            <div>
                                <div className="font-bold text-gray-900 text-sm">Paul D.</div>
                                <div className="text-xs text-gray-500">Mentorat 3 mois</div>
                            </div>
                        </div>
                        <div className="flex text-amber-400">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed italic">
                        "Très pédagogue et disponible. Les simulations d'entretien étaient dures mais c'est exactement ce qu'il me fallait."
                    </p>
                </div>
            </div>
        </section>
    )
}
