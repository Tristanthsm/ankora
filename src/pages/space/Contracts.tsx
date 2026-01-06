import { FileSignature, Download, Calendar, User, Search, Filter } from 'lucide-react'
import Button from '../../components/Button'

export default function Contracts() {
    const contracts = [
        {
            id: 'CTR-2024-001',
            student: 'Thomas Anderson',
            program: 'Mentorat 1:1 (3 mois)',
            date: '15 Mai 2024',
            amount: '12% du salaire',
            status: 'signed',
            pdfUrl: '#'
        },
        {
            id: 'CTR-2024-002',
            student: 'Sarah Miller',
            program: 'Préparation Entretien',
            date: '02 Juin 2024',
            amount: '12% du salaire',
            status: 'signed',
            pdfUrl: '#'
        },
        {
            id: 'CTR-2024-003',
            student: 'Lucas Silva',
            program: 'Coaching Carrière',
            date: '20 Juin 2024',
            amount: '12% du salaire',
            status: 'pending',
            pdfUrl: '#'
        }
    ]

    return (
        <div className="max-w-6xl mx-auto pt-10 px-6 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Contrats</h1>
                    <p className="text-gray-500">Gérez vos accords et signatures avec vos étudiants.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-white">
                        <Download className="h-4 w-4 mr-2" /> Exporter tout
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        placeholder="Rechercher un contrat, un étudiant..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                        <Filter className="h-4 w-4" /> Filtrer
                    </button>
                    <select className="bg-gray-50 text-gray-600 rounded-lg text-sm font-medium border-none focus:ring-0 px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors">
                        <option>Tous les statuts</option>
                        <option>Signés</option>
                        <option>En attente</option>
                    </select>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contrat / ID</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Étudiant</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Programme</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {contracts.map((contract) => (
                                <tr key={contract.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                                <FileSignature className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">Contrat ISA</div>
                                                <div className="text-xs text-gray-500">{contract.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                                {contract.student.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-medium text-gray-700">{contract.student}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-gray-600">{contract.program}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4" />
                                            {contract.date}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${contract.status === 'signed'
                                                ? 'bg-green-50 text-green-700 border border-green-100'
                                                : 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                                            }`}>
                                            {contract.status === 'signed' ? 'Signé' : 'En attente'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                            <Download className="h-4 w-4 mr-2" /> PDF
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
