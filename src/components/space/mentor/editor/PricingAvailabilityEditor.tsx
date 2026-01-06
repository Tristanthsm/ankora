import { Banknote, Calendar, Plus, X } from 'lucide-react'

interface PricingAvailabilityEditorProps {
    formData: any
    setFormData: (data: any) => void
}

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

export default function PricingAvailabilityEditor({ formData, setFormData }: PricingAvailabilityEditorProps) {
    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }))
    }

    const addSlot = () => {
        const currentSlots = formData.availability?.slots || []
        handleChange('availability', {
            ...formData.availability,
            slots: [...currentSlots, { day: 'Lundi', time: '09:00' }]
        })
    }

    const updateSlot = (index: number, updates: any) => {
        const newSlots = [...(formData.availability?.slots || [])]
        newSlots[index] = { ...newSlots[index], ...updates }
        handleChange('availability', { ...formData.availability, slots: newSlots })
    }

    const removeSlot = (index: number) => {
        const newSlots = (formData.availability?.slots || []).filter((_: any, i: number) => i !== index)
        handleChange('availability', { ...formData.availability, slots: newSlots })
    }

    return (
        <section className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Pricing */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <Banknote className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Tarification</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Tarif horaire (1h)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={formData.hourly_rate}
                                    onChange={(e) => handleChange('hourly_rate', parseInt(e.target.value))}
                                    className="w-full border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/5 rounded-xl px-4 py-3 text-lg font-bold transition-all"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-lg">€ / h</span>
                            </div>
                            <p className="text-[10px] text-gray-400">ANKORA prélève des frais de service sur chaque transaction.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Délai de réponse moyen</label>
                            <select
                                value={formData.response_time}
                                onChange={(e) => handleChange('response_time', e.target.value)}
                                className="w-full bg-gray-50/50 border-gray-100 focus:bg-white focus:border-green-500 rounded-xl px-4 py-3 text-sm transition-all"
                            >
                                <option value="1h">Moins de 1h</option>
                                <option value="12h">Dans la demi-journée</option>
                                <option value="24h">Sous 24 heures</option>
                                <option value="48h">Sous 48 heures</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Availability */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <Calendar className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Disponibilités</h3>
                    </div>

                    <div className="space-y-3">
                        {(formData.availability?.slots || []).map((slot: any, index: number) => (
                            <div key={index} className="flex items-center gap-2 group">
                                <select
                                    value={slot.day}
                                    onChange={(e) => updateSlot(index, { day: e.target.value })}
                                    className="flex-1 bg-gray-50/50 border-gray-100 rounded-xl px-3 py-2 text-sm focus:bg-white focus:border-orange-500 transition-all font-medium"
                                >
                                    {DAYS.map(day => <option key={day} value={day}>{day}</option>)}
                                </select>
                                <input
                                    type="time"
                                    value={slot.time}
                                    onChange={(e) => updateSlot(index, { time: e.target.value })}
                                    className="w-28 bg-gray-50/50 border-gray-100 rounded-xl px-3 py-2 text-sm focus:bg-white focus:border-orange-500 transition-all"
                                />
                                <button
                                    onClick={() => removeSlot(index)}
                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}

                        <button
                            onClick={addSlot}
                            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-100 rounded-xl text-gray-400 hover:border-orange-200 hover:text-orange-500 hover:bg-orange-50/50 transition-all text-sm font-bold"
                        >
                            <Plus className="h-4 w-4" /> Ajouter un créneau habituel
                        </button>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-gray-50 italic text-xs text-gray-400">
                “Ces informations aident les étudiants à se projeter dans une collaboration.”
            </div>
        </section>
    )
}
