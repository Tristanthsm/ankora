import { Target, CheckCircle2, Plus, X, Lightbulb } from 'lucide-react'

interface ValuePropositionEditorProps {
    formData: any
    setFormData: (data: any) => void
}

export default function ValuePropositionEditor({ formData, setFormData }: ValuePropositionEditorProps) {
    const handlePitchChange = (val: string) => {
        setFormData((prev: any) => ({ ...prev, short_pitch: val }))
    }

    const handleOutcomeChange = (index: number, val: string) => {
        const newOutcomes = [...formData.outcomes]
        newOutcomes[index] = val
        setFormData((prev: any) => ({ ...prev, outcomes: newOutcomes }))
    }

    const addOutcome = () => {
        if (formData.outcomes.length < 5) {
            setFormData((prev: any) => ({ ...prev, outcomes: [...prev.outcomes, ''] }))
        }
    }

    const removeOutcome = (index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            outcomes: prev.outcomes.filter((_: any, i: number) => i !== index)
        }))
    }

    return (
        <section className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm space-y-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Target className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Accroche & Promesse</h3>
            </div>

            <div className="space-y-6">
                {/* Short Pitch */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-gray-700">Accroche principale</label>
                        <span className="text-[10px] text-gray-400 font-medium">Idéal : 80-120 caractères</span>
                    </div>
                    <textarea
                        value={formData.short_pitch}
                        onChange={(e) => handlePitchChange(e.target.value)}
                        placeholder="ex: J'accompagne les PM juniors à structurer leur approche et décrocher leur premier poste en FAANG."
                        className="w-full text-lg font-bold text-blue-900 bg-blue-50/30 border-blue-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-2xl px-5 py-4 transition-all placeholder:text-blue-300/50 resize-none"
                        rows={2}
                    />
                    <div className="flex items-start gap-2 p-3 bg-amber-50/50 rounded-xl border border-amber-100/50">
                        <Lightbulb className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-800 leading-relaxed">
                            <strong>Conseil :</strong> Commencez par un verbe d'action et ciblez un résultat concret.
                        </p>
                    </div>
                </div>

                {/* Outcomes (Bullets) */}
                <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-700 block">Ce que vous allez obtenir (3-5 points)</label>
                    <div className="space-y-3">
                        {formData.outcomes.map((outcome: string, index: number) => (
                            <div key={index} className="flex items-center gap-3 group">
                                <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
                                <input
                                    type="text"
                                    value={outcome}
                                    onChange={(e) => handleOutcomeChange(index, e.target.value)}
                                    placeholder="ex: Un CV corrigé et optimisé pour le marché US"
                                    className="flex-1 bg-gray-50/50 border-gray-100 focus:bg-white focus:border-blue-500 rounded-xl px-4 py-3 text-sm transition-all"
                                />
                                <button
                                    onClick={() => removeOutcome(index)}
                                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {formData.outcomes.length < 5 && (
                        <button
                            onClick={addOutcome}
                            className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors px-2 py-1"
                        >
                            <Plus className="h-4 w-4" /> Ajouter un point fort
                        </button>
                    )}
                </div>
            </div>

            <div className="pt-6 border-t border-gray-50 italic text-xs text-gray-400">
                “Cette section alimente directement le bloc 'Ce que vous allez obtenir' sur votre fiche.”
            </div>
        </section>
    )
}
