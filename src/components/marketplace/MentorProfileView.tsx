import { MapPin, Globe2, Star, MessageCircle, Video, Calendar, CheckCircle2, Award, Clock } from 'lucide-react'
import Button from '../Button'
import Badge from '../Badge'

interface MentorProfileViewProps {
    mentor: any
    onClose: () => void
}

export default function MentorProfileView({ mentor, onClose }: MentorProfileViewProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative z-50 bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

                {/* Main Content - Scrollable */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* Header */}
                    <div className="p-8 border-b border-gray-100">
                        <div className="flex items-start gap-6">
                            <img src={mentor.image} alt={mentor.name} className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-50" />
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-3xl font-bold text-gray-900">{mentor.name}</h2>
                                    {mentor.badge && <Badge color="secondary">{mentor.badge}</Badge>}
                                </div>
                                <p className="text-lg text-gray-600 mb-3">{mentor.role} @ {mentor.company}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {mentor.city}, {mentor.country}</span>
                                    <span className="flex items-center gap-1.5"><Globe2 className="h-4 w-4" /> {mentor.languages.join(' · ')}</span>
                                    <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-yellow-400 fill-current" /> {mentor.rating} ({mentor.reviews} avis)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-10">
                        {/* Result Block */}
                        <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                            <h3 className="text-xl font-bold text-blue-900 mb-4">
                                {mentor.primaryHelp || "Je vous aide à atteindre vos objectifs professionnels."}
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-blue-800">Accès à un réseau exclusif et opportunités cachées.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-blue-800">Préparation intensive aux entretiens et simulations.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-blue-800">Feedback personnalisé sur votre CV et votre stratégie.</span>
                                </li>
                            </ul>
                        </div>

                        {/* CTAs Mobile (Hidden on Desktop) */}
                        <div className="md:hidden flex flex-col gap-3">
                            <Button size="lg" className="w-full">Prendre rendez-vous</Button>
                            <Button variant="outline" className="w-full">Envoyer un message</Button>
                        </div>

                        {/* About */}
                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">À propos</h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {mentor.bio}
                            </p>
                        </section>

                        {/* Skills */}
                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Compétences clés</h3>
                            <div className="flex flex-wrap gap-2">
                                {mentor.expertise.map((exp: string) => (
                                    <Badge key={exp} color="primary" className="px-3 py-1.5 text-sm cursor-pointer hover:bg-blue-100 transition-colors">
                                        {exp}
                                    </Badge>
                                ))}
                            </div>
                        </section>

                        {/* Reviews */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Avis des étudiants</h3>
                                <a href="#" className="text-sm text-blue-600 hover:underline">Voir tous les avis</a>
                            </div>
                            <div className="grid gap-4">
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="font-semibold text-gray-900">Marie L.</div>
                                        <div className="flex text-yellow-400"><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /></div>
                                    </div>
                                    <p className="text-gray-600 text-sm">"Incroyable ! Grâce à {mentor.name}, j'ai décroché mon stage chez Goldman Sachs. Sa préparation aux entretiens est d'un autre niveau."</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="font-semibold text-gray-900">Paul D.</div>
                                        <div className="flex text-yellow-400"><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /></div>
                                    </div>
                                    <p className="text-gray-600 text-sm">"Très pédagogue et disponible. Il m'a aidé à refaire mon CV de A à Z."</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Sidebar - Fixed on Desktop */}
                <div className="hidden md:flex w-96 bg-gray-50 border-l border-gray-100 flex-col p-8 overflow-y-auto">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-500">Tarif</span>
                            <span className="text-2xl font-bold text-gray-900">{mentor.rate}€<span className="text-sm font-normal text-gray-500">/h</span></span>
                        </div>
                        <Button size="lg" className="w-full mb-3 shadow-lg shadow-blue-600/20">Prendre rendez-vous</Button>
                        <Button variant="outline" className="w-full mb-3 bg-white">
                            <Video className="h-4 w-4 mr-2" /> Planifier un appel
                        </Button>
                        <Button variant="ghost" className="w-full text-gray-600 hover:text-gray-900">
                            <MessageCircle className="h-4 w-4 mr-2" /> Envoyer un message
                        </Button>

                        <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Video className="h-4 w-4 text-gray-400" />
                                <span>Visio 1:1</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Award className="h-4 w-4 text-gray-400" />
                                <span>Pack préparation entretiens</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span>Réponse en {mentor.responseTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" /> Disponibilités
                        </h4>
                        <div className="space-y-2">
                            {mentor.availabilitySlots.map((slot: string) => (
                                <div key={slot} className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-100 text-center">
                                    {slot}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-center text-gray-500 mt-4">
                            Actuellement disponible pour 2 étudiants supplémentaires.
                        </p>
                    </div>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-gray-100 transition-colors z-50"
                >
                    <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
