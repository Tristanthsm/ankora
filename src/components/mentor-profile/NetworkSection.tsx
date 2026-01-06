import { Globe, Building, ArrowUpRight } from 'lucide-react'
import Badge from '../Badge'

export function NetworkSection() {
    return (
        <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-400" />
                Réseau & Expertise Pays
            </h2>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Pays Maîtrisés</h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 text-sm border-blue-100">🇨🇦 Canada (Expert)</Badge>
                            <Badge className="bg-gray-50 text-gray-700 hover:bg-gray-100 px-3 py-1 text-sm border-gray-200">🇺🇸 États-Unis</Badge>
                            <Badge className="bg-gray-50 text-gray-700 hover:bg-gray-100 px-3 py-1 text-sm border-gray-200">🇫🇷 France</Badge>
                        </div>

                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Codes Culturels</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                                <span className="bg-green-100 text-green-600 rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs mt-0.5">✓</span>
                                Le CV canadien ne doit PAS avoir de photo ni d'âge.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="bg-green-100 text-green-600 rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs mt-0.5">✓</span>
                                L'importance du "Networking" informel à Toronto.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="bg-green-100 text-green-600 rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs mt-0.5">✓</span>
                                Négociation de salaire : standards et tabous.
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            Secteurs & Entreprises
                        </h4>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            J'ai un réseau actif dans la Tech et la Finance à Toronto et Montréal. Je peux recommander des profils chez mes anciens employeurs.
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs font-medium text-gray-700">
                            <span className="bg-white border border-gray-200 px-2 py-1 rounded-md">Innovate Inc.</span>
                            <span className="bg-white border border-gray-200 px-2 py-1 rounded-md">TechFlow</span>
                            <span className="bg-white border border-gray-200 px-2 py-1 rounded-md">StartupNord</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
