import { Camera, MapPin, Globe, ShieldCheck } from 'lucide-react'
import Badge from '../../../Badge'

interface ProfileHeroEditorProps {
    formData: any
    setFormData: (data: any) => void
}

export default function ProfileHeroEditor({ formData, setFormData }: ProfileHeroEditorProps) {
    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }))
    }

    return (
        <section className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Avatar Editor */}
                <div className="relative group self-center md:self-start">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0 bg-gray-50 relative">
                        {formData.image_url ? (
                            <img
                                src={formData.image_url}
                                alt={formData.full_name}
                                className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <span className="text-4xl font-bold">{formData.full_name?.[0]}</span>
                            </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 cursor-pointer">
                            <Camera className="text-white h-8 w-8 drop-shadow-md" />
                        </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-blue-600 text-white p-1.5 rounded-full ring-4 ring-white shadow-sm" title="Mentor Vérifié">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                </div>

                {/* Fields */}
                <div className="flex-1 w-full space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Prénom & Nom</label>
                            <input
                                type="text"
                                value={formData.full_name}
                                disabled
                                className="w-full bg-gray-50/50 border-gray-100 text-gray-400 rounded-xl px-4 py-3 cursor-not-allowed font-medium"
                            />
                            <p className="text-[10px] text-gray-400">Non modifiable. Contactez le support pour changer votre nom.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Titre professionnel</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                placeholder="ex: Senior Product Manager"
                                className="w-full border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-3 transition-all placeholder:text-gray-300"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Entreprise</label>
                            <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => handleChange('company', e.target.value)}
                                placeholder="ex: Google"
                                className="w-full border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-3 transition-all placeholder:text-gray-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Localisation</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => handleChange('location', e.target.value)}
                                    placeholder="ex: Paris, France"
                                    className="w-full pl-11 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-3 transition-all placeholder:text-gray-300"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Langues parlées</label>
                        <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={formData.languages.join(', ')}
                                onChange={(e) => handleChange('languages', e.target.value.split(',').map(s => s.trim()))}
                                placeholder="ex: Français, Anglais"
                                className="w-full pl-11 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-3 transition-all placeholder:text-gray-300"
                            />
                        </div>
                        <p className="text-[10px] text-gray-400 italic">Séparez les langues par une virgule.</p>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2">
                        <Badge color="warning" className="bg-amber-50 text-amber-700 border-amber-100">
                            Mentor Certifié
                        </Badge>
                        <Badge color="muted" className="border-gray-200 text-gray-500">
                            Top Mentor (Calculé)
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 italic text-xs text-gray-400">
                “Ces informations apparaissent en haut de votre fiche publique.”
            </div>
        </section>
    )
}
