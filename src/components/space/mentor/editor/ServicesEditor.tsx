import { Briefcase, Video, FileText, Clock, ToggleLeft, ToggleRight, Trash2, Plus, GripVertical } from 'lucide-react'
import { cn } from '../../../../lib/utils'
import Button from '../../../../components/Button'

interface ServicesEditorProps {
    formData: any
    setFormData: (data: any) => void
}

export default function ServicesEditor({ formData, setFormData }: ServicesEditorProps) {
    const updateService = (id: string, updates: any) => {
        setFormData((prev: any) => ({
            ...prev,
            services: prev.services.map((s: any) => s.id === id ? { ...s, ...updates } : s)
        }))
    }

    const addService = () => {
        const newService = {
            id: `service-${Date.now()}`,
            name: '',
            type: 'Visio',
            duration: '45 min',
            deliverable: '',
            response_time: '48h',
            active: true
        }
        setFormData((prev: any) => ({
            ...prev,
            services: [...prev.services, newService]
        }))
    }

    const removeService = (id: string) => {
        setFormData((prev: any) => ({
            ...prev,
            services: prev.services.filter((s: any) => s.id !== id)
        }))
    }

    return (
        <section className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <Briefcase className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Services proposés</h3>
                </div>
                <button
                    onClick={addService}
                    className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all"
                >
                    <Plus className="h-4 w-4" /> Ajouter un service
                </button>
            </div>

            <div className="space-y-4">
                {formData.services.map((service: any) => (
                    <div
                        key={service.id}
                        className={cn(
                            "group border rounded-[20px] p-6 transition-all",
                            service.active ? "border-gray-200 bg-white" : "border-gray-100 bg-gray-50/50 opacity-60"
                        )}
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:text-gray-600 transition-colors">
                                <GripVertical className="h-5 w-5" />
                            </div>

                            <div className="flex-1 space-y-6">
                                {/* Service Header */}
                                <div className="flex items-center justify-between gap-4">
                                    <input
                                        type="text"
                                        value={service.name}
                                        onChange={(e) => updateService(service.id, { name: e.target.value })}
                                        placeholder="Nom du service (ex: Stratégie Admission)"
                                        className="text-lg font-bold text-gray-900 bg-transparent border-none p-0 focus:ring-0 w-full placeholder:text-gray-300"
                                    />
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => updateService(service.id, { active: !service.active })}
                                            className={cn(
                                                "transition-colors",
                                                service.active ? "text-green-600" : "text-gray-400"
                                            )}
                                        >
                                            {service.active ? <ToggleRight className="h-8 w-8" /> : <ToggleLeft className="h-8 w-8" />}
                                        </button>
                                        <button
                                            onClick={() => removeService(service.id)}
                                            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Service Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Format</label>
                                        <select
                                            value={service.type}
                                            onChange={(e) => updateService(service.id, { type: e.target.value })}
                                            className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm transition-all"
                                        >
                                            <option value="Visio">Vidéo Conférence</option>
                                            <option value="Écrit">Correction / Écrit</option>
                                            <option value="Mixte">Mixte</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Durée / Unité</label>
                                        <select
                                            value={service.duration}
                                            onChange={(e) => updateService(service.id, { duration: e.target.value })}
                                            className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm transition-all"
                                        >
                                            <option value="30 min">30 min</option>
                                            <option value="45 min">45 min</option>
                                            <option value="60 min">60 min</option>
                                            <option value="Forfait">Forfait libre</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Délai réponse</label>
                                        <select
                                            value={service.response_time}
                                            onChange={(e) => updateService(service.id, { response_time: e.target.value })}
                                            className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm transition-all"
                                        >
                                            <option value="24h">24h</option>
                                            <option value="48h">48h</option>
                                            <option value="72h">3 jours</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Livrable attendu (optionnel)</label>
                                    <input
                                        type="text"
                                        value={service.deliverable}
                                        onChange={(e) => updateService(service.id, { deliverable: e.target.value })}
                                        placeholder="ex: Scorecards, Feedback PDF, Roadmap..."
                                        className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl px-4 py-3 text-sm transition-all placeholder:text-gray-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {formData.services.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-100 rounded-[24px] text-center">
                        <div className="p-4 bg-gray-50 text-gray-300 rounded-full mb-4">
                            <Plus className="h-8 w-8" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Aucun service configuré</h4>
                        <p className="text-sm text-gray-500 max-w-[280px] mb-6">Ajoutez au moins un service pour permettre aux étudiants de réserver un créneau.</p>
                        <Button onClick={addService} variant="outline" className="border-gray-200">
                            Créer mon premier service
                        </Button>
                    </div>
                )}
            </div>

            <div className="pt-6 border-t border-gray-50 italic text-xs text-gray-400">
                “Les étudiants choisiront un service avant de vous contacter.”
            </div>
        </section>
    )
}
