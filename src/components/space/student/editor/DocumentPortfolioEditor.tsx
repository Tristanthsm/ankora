import { FileText, CheckCircle2, AlertCircle, ExternalLink, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../lib/auth'

export default function DocumentPortfolioEditor() {
    const { profile, studentDetails } = useAuth()

    const docs = [
        { name: 'Curriculum Vitae', received: !!studentDetails?.cv_url },
        { name: 'Relevés de notes', received: !!studentDetails?.transcript_url },
        { name: 'Pièce d\'identité', received: !!profile?.id_card_url },
        { name: 'Lettre de motivation', received: !!studentDetails?.motivational_letter_url },
    ]

    return (
        <section className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Portfolio & Documents</h3>
                </div>
                <Link
                    to="/space/documents"
                    className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all"
                >
                    Gérer mes documents <ArrowRight className="h-4 w-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {docs.map((doc) => (
                    <div key={doc.name} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 group hover:border-blue-100 transition-all">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${doc.received ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                {doc.received ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                            </div>
                            <span className="text-sm font-medium text-gray-700">{doc.name}</span>
                        </div>
                        {doc.received && (
                            <Link to="/space/documents" className="p-2 text-gray-300 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100">
                                <ExternalLink className="h-4 w-4" />
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 italic text-xs text-blue-700">
                “Un dossier complet avec CV et relevés de notes augmente de 80% vos chances d'être accepté par un mentor.”
            </div>
        </section>
    )
}
