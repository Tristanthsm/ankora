import { useState } from 'react'
import { Award, Zap, X, Search } from 'lucide-react'
import { cn } from '../../../../lib/utils'

interface SkillsEditorProps {
    formData: any
    setFormData: (data: any) => void
}

const SECTOR_SUGGESTIONS = [
    'Tech & Engineering', 'Product Management', 'Finance & Investissement',
    'Conseil en Stratégie', 'Vente & Business Dev', 'Marketing & Growth',
    'Design & UX', 'Data & AI', 'Luxe & Mode', 'Impact & GreenTech'
]

export default function SkillsEditor({ formData, setFormData }: SkillsEditorProps) {
    const [skillInput, setSkillInput] = useState('')

    const toggleSector = (sector: string) => {
        const sectors = formData.key_skills.filter((s: string) => SECTOR_SUGGESTIONS.includes(s))
        if (sectors.includes(sector)) {
            setFormData((prev: any) => ({
                ...prev,
                key_skills: prev.key_skills.filter((s: string) => s !== sector)
            }))
        } else {
            setFormData((prev: any) => ({
                ...prev,
                key_skills: [...prev.key_skills, sector]
            }))
        }
    }

    const addSkill = (skill: string) => {
        const trimmed = skill.trim()
        if (trimmed && !formData.key_skills.includes(trimmed)) {
            setFormData((prev: any) => ({
                ...prev,
                key_skills: [...prev.key_skills, trimmed]
            }))
        }
        setSkillInput('')
    }

    const removeSkill = (skill: string) => {
        setFormData((prev: any) => ({
            ...prev,
            key_skills: prev.key_skills.filter((s: string) => s !== skill)
        }))
    }

    return (
        <section className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm space-y-10">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Award className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Expertise & Compétences</h3>
            </div>

            {/* Sectors */}
            <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700">Secteurs principaux</label>
                <div className="flex flex-wrap gap-2">
                    {SECTOR_SUGGESTIONS.map((sector) => {
                        const isSelected = formData.key_skills.includes(sector)
                        return (
                            <button
                                key={sector}
                                onClick={() => toggleSector(sector)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-sm font-medium transition-all border",
                                    isSelected
                                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                        : "bg-white border-gray-100 text-gray-500 hover:border-indigo-200 hover:text-indigo-600"
                                )}
                            >
                                {sector}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Key Skills Tag Input */}
            <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700">Compétences clés (Outils, Hard skills...)</label>
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addSkill(skillInput)}
                        placeholder="Appuyez sur Entrée pour ajouter une compétence..."
                        className="w-full pl-11 pr-20 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 rounded-xl px-4 py-3.5 text-sm transition-all"
                    />
                    <button
                        onClick={() => addSkill(skillInput)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors"
                    >
                        Ajouter
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {formData.key_skills.filter((s: string) => !SECTOR_SUGGESTIONS.includes(s)).map((skill: string) => (
                        <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 border border-gray-100 rounded-full text-xs font-semibold group"
                        >
                            <Zap className="h-3 w-3 text-indigo-400" />
                            {skill}
                            <button
                                onClick={() => removeSkill(skill)}
                                className="p-0.5 hover:text-red-500 rounded-full transition-colors"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    ))}

                    {formData.key_skills.length === 0 && (
                        <p className="text-xs text-gray-400 py-2">
                            Aucune compétence ajoutée. Précisez vos outils (ex: Figma, SQL, Python...).
                        </p>
                    )}
                </div>
            </div>

            <div className="pt-6 border-t border-gray-50 italic text-xs text-gray-400">
                “Ces tags aident les étudiants à vous trouver via la barre de recherche.”
            </div>
        </section>
    )
}
