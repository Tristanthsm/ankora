import { Map, Briefcase, Calendar, Clock, Target } from 'lucide-react'

interface CareerGoalsEditorProps {
    formData: any
    setFormData: (data: any) => void
}

export default function CareerGoalsEditor({ formData, setFormData }: CareerGoalsEditorProps) {
    const handleArrayChange = (field: string, value: string) => {
        const newArray = value.split(',').map(s => s.trim()).filter(Boolean)
        setFormData({ ...formData, [field]: newArray })
    }

    return (
        <section className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Target className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Objectifs & Mobilité</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Pays cibles (séparés par des virgules)</label>
                    <div className="relative">
                        <Map className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            value={formData.target_countries?.join(', ') || ''}
                            onChange={(e) => handleArrayChange('target_countries', e.target.value)}
                            className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm transition-all"
                            placeholder="ex: USA, Canada, Singapour..."
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Villes cibles (facultatif)</label>
                    <div className="relative">
                        <Map className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            value={formData.target_cities?.join(', ') || ''}
                            onChange={(e) => handleArrayChange('target_cities', e.target.value)}
                            className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm transition-all"
                            placeholder="ex: New York, Toronto, Londres..."
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Type de stage recherché</label>
                    <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                            value={formData.internship_type}
                            onChange={(e) => setFormData({ ...formData, internship_type: e.target.value })}
                            className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm transition-all appearance-none"
                        >
                            <option value="">Sélectionnez un type</option>
                            <option value="Stage de fin d'études">Stage de fin d'études</option>
                            <option value="Stage césure">Stage césure</option>
                            <option value="Stage court / découverte">Stage court / découverte</option>
                            <option value="Alternance">Alternance</option>
                            <option value="Contrat local / CDI">Contrat local / CDI</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Durée souhaitée</label>
                    <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                            value={formData.internship_duration}
                            onChange={(e) => setFormData({ ...formData, internship_duration: e.target.value })}
                            className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm transition-all appearance-none"
                        >
                            <option value="">Sélectionnez une durée</option>
                            <option value="2 mois">2 mois</option>
                            <option value="3-4 mois">3-4 mois</option>
                            <option value="6 mois">6 mois</option>
                            <option value="&gt; 6 mois">&gt; 6 mois</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Date de début au plus tôt</label>
                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="date"
                            value={formData.start_date}
                            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                            className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Mes objectifs détaillés</label>
                <div className="relative">
                    <Target className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                    <textarea
                        value={formData.objective}
                        onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                        rows={4}
                        className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm transition-all resize-none"
                        placeholder="Quels sont vos objectifs principaux pour ce mentoring ? (Domaines d'intérêt, compétences à acquérir...)"
                    />
                </div>
            </div>
        </section>
    )
}
