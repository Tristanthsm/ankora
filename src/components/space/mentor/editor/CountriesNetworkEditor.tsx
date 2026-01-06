import { Globe2, MapPin, Plus, Trash2 } from 'lucide-react'
import { cn } from '../../../../lib/utils'

interface CountriesNetworkEditorProps {
    formData: any
    setFormData: (data: any) => void
}

const EXPERTISE_LEVELS = [
    { id: 'resident', label: 'Résident / Travaille sur place' },
    { id: 'network', label: 'Réseau très fort' },
    { id: 'market', label: 'Connaissance marché' }
]

export default function CountriesNetworkEditor({ formData, setFormData }: CountriesNetworkEditorProps) {
    const addCountry = () => {
        const newEntry = {
            id: `country-${Date.now()}`,
            country: '',
            level: 'resident',
            sectors: [] as string[],
            notes: ''
        }
        setFormData((prev: any) => ({
            ...prev,
            countries_network: [...prev.countries_network, newEntry]
        }))
    }

    const updateEntry = (id: string, updates: any) => {
        setFormData((prev: any) => ({
            ...prev,
            countries_network: prev.countries_network.map((c: any) => c.id === id ? { ...c, ...updates } : c)
        }))
    }

    const removeCountry = (id: string) => {
        setFormData((prev: any) => ({
            ...prev,
            countries_network: prev.countries_network.filter((c: any) => c.id !== id)
        }))
    }

    return (
        <section className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                        <Globe2 className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Réseau & Expertise Pays</h3>
                </div>
                <button
                    onClick={addCountry}
                    className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-xl transition-all"
                >
                    <Plus className="h-4 w-4" /> Ajouter un pays
                </button>
            </div>

            <div className="space-y-6">
                {formData.countries_network.map((entry: any) => (
                    <div key={entry.id} className="relative p-6 border border-gray-100 rounded-[20px] bg-gray-50/30 space-y-6 group">
                        <button
                            onClick={() => removeCountry(entry.id)}
                            className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left: Country & Level */}
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pays</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={entry.country}
                                            onChange={(e) => updateEntry(entry.id, { country: e.target.value })}
                                            placeholder="ex: États-Unis, Singapour..."
                                            className="w-full pl-11 bg-white border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 rounded-xl px-4 py-3 transition-all text-sm font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Relation avec ce pays</label>
                                    <div className="flex flex-col gap-2">
                                        {EXPERTISE_LEVELS.map((level) => (
                                            <button
                                                key={level.id}
                                                onClick={() => updateEntry(entry.id, { level: level.id })}
                                                className={cn(
                                                    "flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-all border text-left",
                                                    entry.level === level.id
                                                        ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-bold"
                                                        : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full",
                                                    entry.level === level.id ? "bg-emerald-500" : "bg-gray-200"
                                                )} />
                                                {level.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Sectors & Notes */}
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Secteurs maîtrisés sur place</label>
                                    <input
                                        type="text"
                                        value={entry.sectors.join(', ')}
                                        onChange={(e) => updateEntry(entry.id, { sectors: e.target.value.split(',').map(s => s.trim()) })}
                                        placeholder="ex: Tech, Finance, Luxe..."
                                        className="w-full bg-white border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 rounded-xl px-4 py-3 transition-all text-sm placeholder:text-gray-300"
                                    />
                                    <p className="text-[10px] text-gray-400 italic">Séparez par des virgules.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Conseil / Note (optionnel)</label>
                                    <textarea
                                        value={entry.notes}
                                        onChange={(e) => updateEntry(entry.id, { notes: e.target.value })}
                                        placeholder="ex: 'Je connais très bien les processus de recrutement chez Google London.'"
                                        className="w-full bg-white border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 rounded-xl px-4 py-3 transition-all text-sm placeholder:text-gray-300 resize-none"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {formData.countries_network.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-100 rounded-[24px] text-center">
                        <div className="p-4 bg-gray-50 text-gray-300 rounded-full mb-4">
                            <Globe2 className="h-8 w-8" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Pas encore de réseau pays</h4>
                        <p className="text-sm text-gray-500 max-w-[280px] mb-6">Précisez dans quels pays vous pouvez aider un étudiant à s'installer ou travailler.</p>
                        <button
                            onClick={addCountry}
                            className="bg-white border border-gray-200 text-gray-700 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors"
                        >
                            Ajouter un pays
                        </button>
                    </div>
                )}
            </div>

            <div className="pt-6 border-t border-gray-50 italic text-xs text-gray-400">
                “ANKORA est fondé sur l'expatriation. Plus votre réseau est clair, plus vous attirerez les bons profils.”
            </div>
        </section>
    )
}
