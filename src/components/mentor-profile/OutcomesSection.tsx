import { Target, CheckCircle2, TrendingUp } from 'lucide-react'

export function OutcomesSection() {
    return (
        <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ce que vous allez obtenir</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {/* Outcome 1 */}
                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                        <Target className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Stratégie Ciblée</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Ne perdez plus de temps. Nous définirons ensemble les entreprises qui recrutent et comment les approcher.
                    </p>
                </div>

                {/* Outcome 2 */}
                <div className="bg-purple-50/50 rounded-2xl p-6 border border-purple-100">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Candidatures Blindées</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        CV, Cover Letter et LinkedIn optimisés pour les standards locaux et les systèmes ATS.
                    </p>
                </div>

                {/* Outcome 3 */}
                <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Entraînement Intensif</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Simulations d'entretiens "Mock Interviews" pour arriver confiant et prêt le jour J.
                    </p>
                </div>
            </div>
        </section>
    )
}
