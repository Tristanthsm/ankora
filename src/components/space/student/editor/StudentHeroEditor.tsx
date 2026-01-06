import { User, MapPin, Mail, Globe, Sparkles } from 'lucide-react'

interface StudentHeroEditorProps {
    formData: any
    setFormData: (data: any) => void
}

export default function StudentHeroEditor({ formData, setFormData }: StudentHeroEditorProps) {
    return (
        <section className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <User className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Identité & Bio</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-10">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                    <div className="relative group">
                        <div className="h-32 w-32 rounded-[32px] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-blue-500/20">
                            {formData.full_name?.[0]?.toUpperCase() || 'S'}
                        </div>
                        <div className="absolute inset-0 bg-black/20 rounded-[32px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <span className="text-white text-xs font-bold">Changer</span>
                        </div>
                    </div>
                </div>

                {/* Identity Fields */}
                <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Nom complet</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm transition-all"
                                    placeholder="ex: Jean Dupont"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 opacity-50">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Email (non-modifiable)</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="email"
                                    value={formData.email || ''}
                                    readOnly
                                    className="w-full bg-gray-100 border-transparent rounded-xl pl-11 pr-4 py-3 text-sm cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Pays</label>
                            <div className="relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm transition-all"
                                    placeholder="ex: France"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Ville</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm transition-all"
                                    placeholder="ex: Paris"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bio / Introduction</label>
                            <span className="text-[10px] text-gray-400">{formData.bio?.length || 0}/500</span>
                        </div>
                        <div className="relative">
                            <Sparkles className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value.slice(0, 500) })}
                                rows={4}
                                className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm transition-all resize-none"
                                placeholder="Présentez-vous en quelques lignes..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
