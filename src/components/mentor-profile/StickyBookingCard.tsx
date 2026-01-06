import { useState } from 'react'
import { MessageSquare, CheckCircle, ArrowRight, Sun, Sunset, Moon, Calendar as CalendarIcon, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../Button'
import { cn } from '@/lib/utils'

interface StickyBookingCardProps {
    mentorName: string
}

export function StickyBookingCard({ mentorName }: StickyBookingCardProps) {
    const [selectedService, setSelectedService] = useState('pack')
    const [showCalendar, setShowCalendar] = useState(false)
    const [selectedDate, setSelectedDate] = useState<number | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)

    // Mock dates for next 7 days
    const dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() + i + 1)
        return {
            day: d.toLocaleDateString('fr-FR', { weekday: 'short' }),
            date: d.getDate(),
            fullDate: d
        }
    })

    const timeSlots = {
        'Matin': { icon: Sun, slots: ['09:00', '10:30', '11:45'] },
        'Après-midi': { icon: Sunset, slots: ['14:00', '15:30', '17:00'] },
        'Soir': { icon: Moon, slots: ['18:30', '19:45', '21:00'] }
    }

    return (
        <>
            <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-[24px] border border-gray-100 shadow-xl shadow-blue-900/5 p-6 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

                    <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                        Choisir un accompagnement
                    </h3>

                    {/* Service Selector */}
                    <div className="space-y-3 mb-8">
                        {[
                            { id: 'pack', title: 'Pack "Décrocher son stage"', desc: 'Accompagnement complet jusqu\'à la signature.', badge: '12% du salaire (au succès)' },
                            { id: 'session', title: 'Session Stratégie (1h)', desc: 'Diagnostic et plan d\'action immédiat.', badge: 'Gratuit (Premier appel)' }
                        ].map(service => (
                            <div
                                key={service.id}
                                onClick={() => setSelectedService(service.id)}
                                className={cn(
                                    "p-4 rounded-2xl border-2 transition-all cursor-pointer relative group",
                                    selectedService === service.id
                                        ? "border-blue-600 bg-blue-50/40 shadow-lg shadow-blue-600/5"
                                        : "border-gray-50 hover:border-gray-200 hover:bg-gray-50/50"
                                )}
                            >
                                <div className="flex justify-between items-start mb-1.5">
                                    <span className="font-bold text-gray-900 text-[13px] leading-tight">{service.title}</span>
                                    {selectedService === service.id && (
                                        <motion.div layoutId="active-check">
                                            <CheckCircle className="w-4 h-4 text-blue-600" />
                                        </motion.div>
                                    )}
                                </div>
                                <p className="text-[11px] text-gray-500 leading-relaxed mb-3">{service.desc}</p>
                                <div className={cn(
                                    "text-[10px] font-bold px-2 py-1 rounded-lg inline-block",
                                    selectedService === service.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                                )}>
                                    {service.badge}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Primary CTA */}
                    <div className="space-y-3">
                        <Button
                            className="w-full h-12 text-sm font-bold shadow-xl shadow-blue-600/20 group relative overflow-hidden"
                            onClick={() => setShowCalendar(true)}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Planifier un rendez-vous
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </Button>

                        <Button variant="outline" className="w-full h-12 bg-white text-gray-600 hover:text-gray-900 border-gray-200 text-sm font-bold group">
                            <MessageSquare className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                            Envoyer un message
                        </Button>
                    </div>

                    {/* Trust & Info */}
                    <div className="mt-8 pt-6 border-t border-gray-50/80 text-[11px] text-center space-y-2.5">
                        <div className="flex items-center justify-center gap-2 text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Réponse moyenne en <span className="font-bold text-gray-600">45 min</span>
                        </div>
                        <p className="flex justify-center items-center gap-1.5 text-gray-400">
                            <CheckCircle className="w-3.5 h-3.5 text-blue-500/50" />
                            Mentor certifié par Ankora
                        </p>
                    </div>
                </div>
            </div>

            {/* Calendar Modal */}
            <AnimatePresence>
                {showCalendar && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowCalendar(false)}
                            className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-600/20">
                                        <CalendarIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-2xl text-gray-900 leading-none mb-1.5">Choisir un créneau</h3>
                                        <p className="text-sm text-gray-500 font-medium">Session avec {mentorName}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowCalendar(false)}
                                    className="p-2.5 hover:bg-white hover:shadow-lg rounded-2xl transition-all text-gray-400 hover:text-gray-900"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto custom-scrollbar">
                                {/* Date Selection */}
                                <div className="space-y-4 mb-10">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Sélectionner une date</label>
                                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none snap-x">
                                        {dates.map((d, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedDate(d.date)}
                                                className={cn(
                                                    "flex flex-col items-center justify-center min-w-[72px] h-[88px] rounded-2xl border-2 transition-all snap-start",
                                                    selectedDate === d.date
                                                        ? "border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                                                        : "border-gray-50 bg-gray-50/50 hover:border-gray-200 text-gray-500"
                                                )}
                                            >
                                                <span className={cn("text-[10px] font-bold uppercase mb-1", selectedDate === d.date ? "text-blue-100" : "text-gray-400")}>
                                                    {d.day}
                                                </span>
                                                <span className="text-xl font-black">{d.date}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Time Slot Selection */}
                                <div className="space-y-6">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Créneaux disponibles</label>

                                    <div className="space-y-8">
                                        {Object.entries(timeSlots).map(([period, data]) => (
                                            <div key={period} className="space-y-3">
                                                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 px-1">
                                                    <data.icon className="w-3.5 h-3.5" />
                                                    {period}
                                                </div>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {data.slots.map(time => (
                                                        <button
                                                            key={time}
                                                            onClick={() => setSelectedTime(time)}
                                                            className={cn(
                                                                "py-3.5 text-sm font-bold rounded-xl border-2 transition-all",
                                                                selectedTime === time
                                                                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-lg shadow-emerald-500/10"
                                                                    : "border-gray-50 bg-gray-50/30 text-gray-600 hover:border-gray-200 hover:bg-white"
                                                            )}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer CTA */}
                            <div className="p-8 bg-gray-50/50 border-t border-gray-50">
                                <Button
                                    className="w-full h-14 text-base font-bold shadow-xl shadow-blue-600/20"
                                    disabled={!selectedDate || !selectedTime}
                                >
                                    {selectedDate && selectedTime ? (
                                        <span className="flex items-center gap-2">
                                            Confirmer pour le {selectedDate} à {selectedTime}
                                            <CheckCircle className="w-5 h-5" />
                                        </span>
                                    ) : (
                                        "Sélectionner un créneau"
                                    )}
                                </Button>
                                <p className="text-center mt-4 text-[11px] text-gray-400 font-medium">
                                    Un lien de réunion vous sera envoyé par email après confirmation.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
