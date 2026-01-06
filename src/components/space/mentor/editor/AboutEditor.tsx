import { User, Sparkles, Trophy, Trash2 } from 'lucide-react'

interface AboutEditorProps {
    formData: any
    setFormData: (data: any) => void
}

export default function AboutEditor({ formData, setFormData }: AboutEditorProps) {
    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }))
    }

    const addHighlight = () => {
        setFormData((prev: any) => ({
            ...prev,
            career_highlights: [...prev.career_highlights, '']
        }))
    }

    const updateHighlight = (index: number, val: string) => {
        const newHighlights = [...formData.career_highlights]
        newHighlights[index] = val
        setFormData((prev: any) => ({ ...prev, career_highlights: newHighlights }))
    }

    const removeHighlight = (index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            career_highlights: prev.career_highlights.filter((_: any, i: number) => i !== index)
        }))
    }

    return (
        <section className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm space-y-10">
            {/* Bio */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <User className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">À propos de vous</h3>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Votre histoire professionnelle</label>
                    <textarea
                        value={formData.bio}
                        onChange={(e) => handleChange('bio', e.target.value)}
                        placeholder="Racontez votre parcours, vos succès et ce qui vous anime dans le mentorat..."
                        className="w-full min-h-[180px] border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-[20px] p-5 text-gray-600 leading-relaxed transition-all placeholder:text-gray-300 resize-y"
                    />
                </div>
            </div>

            {/* Career Highlights */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                            <Trophy className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Points marquants</h3>
                    </div>
                    <button
                        onClick={addHighlight}
                        className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        + Ajouter un succès
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.career_highlights.map((highlight: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 group bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                            <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-1" />
                            <textarea
                                value={highlight}
                                onChange={(e) => updateHighlight(index, e.target.value)}
                                placeholder="ex: Levée de fonds de 5M€ en Série A"
                                className="flex-1 bg-transparent border-none p-0 focus:ring-0 text-sm font-medium text-gray-700 placeholder:text-gray-300 resize-none"
                                rows={2}
                            />
                            <button
                                onClick={() => removeHighlight(index)}
                                className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-red-500 transition-all"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))}

                    {formData.career_highlights.length === 0 && (
                        <p className="col-span-2 text-sm text-gray-400 italic text-center py-4">
                            Optionnel : Ajoutez vos réussites clés pour renforcer votre crédibilité.
                        </p>
                    )}
                </div>
            </div>

            <div className="pt-6 border-t border-gray-50 italic text-xs text-gray-400">
                “Humanisez votre profil. Les étudiants cherchent quelqu'un en qui ils peuvent avoir confiance.”
            </div>
        </section>
    )
}
