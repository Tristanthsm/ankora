import { CheckCircle2, Circle, AlertCircle, ShieldCheck } from 'lucide-react'
import { cn } from '../../../../lib/utils'
// Button is imported but not used yet, keeping for future sync button in card

interface ProfileCompletionCardProps {
    formData: any
    isSaving: boolean
    handleSave: () => void
}

export default function ProfileCompletionCard({ formData }: ProfileCompletionCardProps) {
    const checklist = [
        { label: 'Photo de profil', completed: !!formData.image_url, weight: 10 },
        { label: 'Titre & Entreprise', completed: !!(formData.title && formData.company), weight: 10 },
        { label: 'Localisation & Langues', completed: !!(formData.location && formData.languages.length > 0), weight: 10 },
        { label: 'Accroche principale', completed: !!formData.short_pitch, weight: 15 },
        { label: 'Points forts (min 3)', completed: formData.outcomes.length >= 3, weight: 15 },
        { label: 'Services (min 1)', completed: formData.services.some((s: any) => s.active), weight: 15 },
        { label: 'Bio détaillée', completed: formData.bio?.length > 50, weight: 10 },
        { label: 'Réseau Pays (min 1)', completed: formData.countries_network.length > 0, weight: 10 },
        { label: 'Tarif & Disponibilités', completed: !!(formData.hourly_rate > 0 && formData.availability?.slots?.length > 0), weight: 5 },
    ]

    const completion = checklist.reduce((acc, item) => acc + (item.completed ? item.weight : 0), 0)

    return (
        <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm space-y-8">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">Qualité du profil</h3>
                    <span className="text-sm font-bold text-blue-600">{completion}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-50 rounded-full overflow-hidden">
                    <div
                        className={cn(
                            "h-full transition-all duration-1000 ease-out rounded-full",
                            completion < 50 ? "bg-orange-400" : completion < 90 ? "bg-blue-500" : "bg-green-500"
                        )}
                        style={{ width: `${completion}%` }}
                    />
                </div>
            </div>

            <div className="space-y-4">
                {checklist.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {item.completed ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                                <Circle className="h-4 w-4 text-gray-200" />
                            )}
                            <span className={cn(
                                "text-sm",
                                item.completed ? "text-gray-600" : "text-gray-400"
                            )}>
                                {item.label}
                            </span>
                        </div>
                        {!item.completed && item.weight >= 15 && (
                            <AlertCircle className="h-3 w-3 text-orange-400" />
                        )}
                    </div>
                ))}
            </div>

            <div className="pt-6 border-t border-gray-50">
                <div className="bg-blue-50/50 rounded-2xl p-4 flex items-start gap-3">
                    <div className="p-1 px-2 bg-blue-600 text-white rounded text-[10px] font-bold uppercase mt-0.5">Note</div>
                    <p className="text-xs text-blue-900/70 leading-relaxed">
                        Un profil complété à <strong>100%</strong> reçoit en moyenne <strong>3x plus</strong> de demandes de mentorat.
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between px-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>Visibilité</span>
                    <span className="text-green-500 flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" /> Connecté
                    </span>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                    <p className="text-[10px] text-gray-500">Dernière sauvegarde il y a 2 min</p>
                </div>
            </div>
        </div>
    )
}
