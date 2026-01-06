import { useState } from 'react'
import { MessageSquare, CheckCircle, ArrowRight } from 'lucide-react'
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

    const timeSlots = ['10:00', '14:00', '16:30', '18:00']

    return (
        <>
            <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-blue-900/5 p-6 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />

                    <h3 className="font-semibold text-gray-900 mb-4">Choisir un accompagnement</h3>

                    {/* Service Selector */}
                    <div className="space-y-3 mb-6">
                        <div
                            onClick={() => setSelectedService('pack')}
                            className={cn(
                                "p-3 rounded-xl border-2 transition-all cursor-pointer relative",
                                selectedService === 'pack'
                                    ? "border-blue-600 bg-blue-50/30"
                                    : "border-gray-100 hover:border-gray-200"
                            )}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-gray-900 text-sm">Pack "Décrocher son stage"</span>
                                {selectedService === 'pack' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2">Accompagnement complet de A à Z jusqu'à la signature.</p>
                            <div className="mt-2 text-xs font-semibold text-blue-700 bg-blue-100 inline-block px-2 py-0.5 rounded-md">
                                12% du salaire (au succès)
                            </div>
                        </div>

                        <div
                            onClick={() => setSelectedService('session')}
                            className={cn(
                                "p-3 rounded-xl border-2 transition-all cursor-pointer relative",
                                selectedService === 'session'
                                    ? "border-blue-600 bg-blue-50/30"
                                    : "border-gray-100 hover:border-gray-200"
                            )}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-gray-900 text-sm">Session Stratégie (1h)</span>
                                {selectedService === 'session' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                            </div>
                            <p className="text-xs text-gray-500">Diagnostic, relecture CV et plan d'action immédiat.</p>
                            <div className="mt-2 text-xs font-semibold text-gray-700">
                                Gratuit (Premier appel)
                            </div>
                        </div>
                    </div>

                    {/* Primary CTA */}
                    <Button
                        className="w-full h-12 text-base font-semibold shadow-blue-500/25 mb-3 group"
                        onClick={() => setShowCalendar(true)}
                    >
                        Planifier un rendez-vous
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>

                    {/* Secondary CTA */}
                    <Button variant="outline" className="w-full bg-white text-gray-600 hover:text-gray-900 border-gray-200">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Envoyer un message
                    </Button>

                    {/* Trust & Info */}
                    <div className="mt-6 pt-6 border-t border-gray-50 text-xs text-center space-y-2 text-gray-400">
                        <p>Réponse moyenne en <span className="font-medium text-gray-600">45 min</span></p>
                        <p className="flex justify-center items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            Mentor certifié par Ankora
                        </p>
                    </div>
                </div>
            </div>

            {/* Calendar Modal */}
            {showCalendar && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-xl text-gray-900">Choisir un créneau</h3>
                                <p className="text-sm text-gray-500">avec {mentorName}</p>
                            </div>
                            <button
                                onClick={() => setShowCalendar(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <span className="text-2xl leading-none text-gray-400">&times;</span>
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Date Strip */}
                            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
                                {dates.map((d, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedDate(d.date)}
                                        className={cn(
                                            "flex flex-col items-center justify-center min-w-[60px] h-[72px] rounded-xl border-2 transition-all",
                                            selectedDate === d.date
                                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                                : "border-gray-100 hover:border-gray-200 text-gray-600"
                                        )}
                                    >
                                        <span className="text-xs font-medium uppercase">{d.day}</span>
                                        <span className="text-lg font-bold">{d.date}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Time Slots */}
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {timeSlots.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={cn(
                                            "py-3 text-sm font-medium rounded-lg border transition-all",
                                            selectedTime === time
                                                ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                                                : "border-gray-200 text-gray-700 hover:border-blue-200 hover:bg-blue-50"
                                        )}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>

                            <Button className="w-full h-12 text-base" disabled={!selectedDate || !selectedTime}>
                                Confirmer le rendez-vous
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
