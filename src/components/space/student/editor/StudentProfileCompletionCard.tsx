import { CheckCircle2, Circle, Loader2, Save } from 'lucide-react'
import { cn } from '../../../../lib/utils'

interface StudentProfileCompletionCardProps {
    formData: any
    isSaving: boolean
    handleSave: () => void
}

export default function StudentProfileCompletionCard({ formData, isSaving, handleSave }: StudentProfileCompletionCardProps) {
    const steps = [
        { label: 'Identité & Bio', completed: !!formData.full_name && !!formData.bio },
        { label: 'Parcours Académique', completed: !!formData.school && !!formData.degree_level },
        { label: 'Objectifs & Mobilité', completed: formData.target_countries?.length > 0 && !!formData.objective },
        { label: 'Compétences', completed: formData.skills?.length > 0 },
        { label: 'Documents (CV)', completed: !!formData.cv_url } // Note: we should passed this down
    ]

    const completedCount = steps.filter(s => s.completed).length
    const percentage = Math.round((completedCount / steps.length) * 100)

    return (
        <div className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm space-y-6">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">Complétion du profil</h4>
                    <span className="text-sm font-bold text-blue-600">{percentage}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-600 transition-all duration-500 ease-out"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>

            <div className="space-y-3">
                {steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                        {step.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        ) : (
                            <Circle className="h-4 w-4 text-gray-200 shrink-0" />
                        )}
                        <span className={cn(step.completed ? "text-gray-700" : "text-gray-400")}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className="pt-6 border-t border-gray-50">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl py-3 text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-600/20"
                >
                    {isSaving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    Enregistrer le profil
                </button>
            </div>

            <p className="text-[10px] text-center text-gray-400">
                Un profil complété à 100% est indispensable pour être mis en relation.
            </p>
        </div>
    )
}
