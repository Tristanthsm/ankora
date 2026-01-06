import { useState } from 'react'
import { Sparkles, X, Plus, Lightbulb } from 'lucide-react'


interface StudentSkillsEditorProps {
    formData: any
    setFormData: (data: any) => void
}

export default function StudentSkillsEditor({ formData, setFormData }: StudentSkillsEditorProps) {
    const [inputValue, setInputValue] = useState('')

    const addSkill = (skill: string) => {
        const normalized = skill.trim()
        if (normalized && !formData.skills?.includes(normalized)) {
            setFormData({ ...formData, skills: [...(formData.skills || []), normalized] })
        }
        setInputValue('')
    }

    const removeSkill = (skill: string) => {
        setFormData({ ...formData, skills: formData.skills.filter((s: string) => s !== skill) })
    }

    const suggestions = [
        "Gestion de projet", "Python", "Data Analysis", "Marketing Digital",
        "Communication", "Travail d'équipe", "Résolution de problèmes",
        "Anglais (C1)", "Adaptabilité", "Curiosité"
    ]

    return (
        <section className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Compétences & Atouts</h3>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Ajouter une compétence</label>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Lightbulb className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(inputValue))}
                                className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm transition-all"
                                placeholder="ex: Management de projet, React, Anglais..."
                            />
                        </div>
                        <button
                            onClick={() => addSkill(inputValue)}
                            className="px-6 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Vos compétences</label>
                    <div className="flex flex-wrap gap-2">
                        {formData.skills?.map((skill: string) => (
                            <span
                                key={skill}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold group"
                            >
                                {skill}
                                <button
                                    onClick={() => removeSkill(skill)}
                                    className="hover:text-red-500 transition-colors"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        ))}
                        {(!formData.skills || formData.skills.length === 0) && (
                            <p className="text-sm text-gray-400 italic px-1">Aucune compétence ajoutée pour le moment.</p>
                        )}
                    </div>
                </div>

                {/* Suggestions */}
                <div className="space-y-3 pt-4 border-t border-gray-50">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Suggestions</label>
                    <div className="flex flex-wrap gap-2">
                        {suggestions.filter(s => !formData.skills?.includes(s)).map((s) => (
                            <button
                                key={s}
                                onClick={() => addSkill(s)}
                                className="px-3 py-1.5 border border-gray-100 rounded-lg text-xs font-medium text-gray-500 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-all"
                            >
                                + {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
