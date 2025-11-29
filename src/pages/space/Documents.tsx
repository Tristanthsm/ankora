import { useState, useEffect } from 'react'
import Card from '../../components/Card'
import SectionHeader from '../../components/SectionHeader'
import Button from '../../components/Button'
import { useAuth } from '../../lib/auth'
import { hasRole } from '../../lib/roles'
import { FileText, Upload, CheckCircle, X, Download } from 'lucide-react'

interface Document {
  id: string
  name: string
  type: 'cv' | 'student_proof' | 'mentor_proof'
  url: string | null
  uploaded: boolean
  required: boolean
}

export default function DocumentsPage() {
  const { profile } = useAuth()
  const [documents, setDocuments] = useState<Document[]>([])
  const [uploading, setUploading] = useState<string | null>(null)

  const isStudent = profile && hasRole(profile, 'student')
  const isMentor = profile && hasRole(profile, 'mentor')

  useEffect(() => {
    // Initialiser les documents selon le rôle
    const docs: Document[] = []
    
    if (isStudent) {
      docs.push({
        id: 'cv',
        name: 'CV',
        type: 'cv',
        url: null,
        uploaded: false,
        required: true,
      })
      docs.push({
        id: 'student_proof',
        name: 'Preuve d\'étudiant',
        type: 'student_proof',
        url: null,
        uploaded: false,
        required: true,
      })
    }

    if (isMentor) {
      docs.push({
        id: 'mentor_proof',
        name: 'Documents de preuve (diplômes, certifications)',
        type: 'mentor_proof',
        url: null,
        uploaded: false,
        required: true,
      })
    }

    setDocuments(docs)
  }, [isStudent, isMentor])

  const handleFileSelect = (docId: string, file: File) => {
    setUploading(docId)
    // TODO: Implémenter l'upload vers Supabase Storage
    setTimeout(() => {
      setDocuments(prev => prev.map(doc => 
        doc.id === docId 
          ? { ...doc, uploaded: true, url: URL.createObjectURL(file) }
          : doc
      ))
      setUploading(null)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Documents"
        title="Gérez vos documents"
        description="Téléchargez les documents requis pour compléter votre profil."
        align="left"
      />

      {documents.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600">
              Aucun document requis pour le moment. Complétez votre profil pour voir les documents à fournir.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {documents.map((doc) => (
            <Card key={doc.id} className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-primary-600" />
                    <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                    {doc.required && (
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                        Requis
                      </span>
                    )}
                  </div>
                  {doc.uploaded ? (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Document téléchargé</span>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">Aucun document téléchargé</p>
                  )}
                </div>
                {doc.uploaded && (
                  <div className="flex items-center gap-2">
                    {doc.url && (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    )}
                    <button
                      onClick={() => setDocuments(prev => prev.map(d => 
                        d.id === doc.id ? { ...d, uploaded: false, url: null } : d
                      ))}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {!doc.uploaded && (
                <div>
                  <label className="block">
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileSelect(doc.id, file)
                      }}
                      disabled={uploading === doc.id}
                    />
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={uploading === doc.id}
                      isLoading={uploading === doc.id}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {uploading === doc.id ? 'Téléchargement...' : 'Télécharger un fichier'}
                    </Button>
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    Formats acceptés : PDF, DOC, DOCX, JPG, PNG (max 10MB)
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <h4 className="font-semibold text-gray-900 mb-2">Instructions</h4>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Les documents doivent être clairs et lisibles</li>
          <li>Les fichiers PDF sont recommandés</li>
          <li>La taille maximale par fichier est de 10MB</li>
          <li>Vos documents seront vérifiés par notre équipe</li>
        </ul>
      </Card>
    </div>
  )
}

