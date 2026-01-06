import { GraduationCap, School, BookOpen, Calendar } from 'lucide-react'

interface AcademicBackgroundEditorProps {
    formData: any
    setFormData: (data: any) => void
}

export default function AcademicBackgroundEditor({ formData, setFormData }: AcademicBackgroundEditorProps) {
    return (
        <section className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Parcours Académique</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Université / École</label>
                    <div className="relative">
                        <School className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            value={formData.school}
                            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                            className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm transition-all"
                            placeholder="ex: HEC Paris, Polytechnique..."
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Niveau d'études actuel</label>
                    <div className="relative">
                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                            value={formData.degree_level}
                            onChange={(e) => setFormData({ ...formData, degree_level: e.target.value })}
                            className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm transition-all appearance-none"
                        >
                            <option value="">Sélectionnez un niveau</option>
                            <option value="Licence 1">Licence 1</option>
                            <option value="Licence 2">Licence 2</option>
                            <option value="Licence 3">Licence 3 / Bachelor</option>
                            <option value="Master 1">Master 1</option>
                            <option value="Master 2">Master 2 / MSc</option>
                            <option value="Doctorat">Doctorat / PhD</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Domaine d'études</label>
                    <div className="relative">
                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            value={formData.field_of_study}
                            onChange={(e) => setFormData({ ...formData, field_of_study: e.target.value })}
                            className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm transition-all"
                            placeholder="ex: Finance, Informatique, Marketing..."
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Année d'obtention prévue</label>
                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            value={formData.graduation_year || ''}
                            onChange={(e) => setFormData({ ...formData, graduation_year: e.target.value })}
                            className="w-full bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm transition-all"
                            placeholder="ex: 2026"
                        />
                    </div>
                </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3 text-xs text-amber-800">
                <BookOpen className="h-4 w-4 shrink-0 mt-0.5" />
                <p>
                    Ces informations permettent aux mentors de mieux comprendre votre bagage académique et de vous proposer des conseils adaptés à votre formation.
                </p>
            </div>
        </section>
    )
}
