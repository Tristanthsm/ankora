import { useState, useEffect } from 'react'
import { ProgressOverview } from '../../components/space/documents/ProgressOverview'
import { DocumentItemCard } from '../../components/space/documents/DocumentItem'
import { DocumentItem } from '../../types/documents'
import { GraduationCap, Briefcase, Lightbulb, Plus, Loader2, AlertCircle, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../lib/auth'
import { supabase } from '../../lib/supabase'
import Button from '../../components/Button'

export default function DocumentsPage() {
  const { user, profile, studentDetails, mentorDetails, loading, refreshProfile } = useAuth()
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [isUploading, setIsUploading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (loading || !profile) return

    const docs: DocumentItem[] = []

    // 1. Identity Documents (Global)
    docs.push({
      id: 'id_card',
      title: "Pièce d'identité",
      description: "Passeport ou Carte Nationale d'Identité en cours de validité.",
      category: 'identity',
      status: profile.id_card_url ? 'validated' : 'missing',
      isRequired: true,
      fileName: profile.id_card_url ? 'identite.pdf' : undefined
    })

    // 2. Academic / Student Documents
    if (studentDetails) {
      docs.push({
        id: 'cv_student',
        title: "CV / Resume (Étudiant)",
        description: "Votre CV pour les candidatures.",
        category: 'academic',
        status: studentDetails.cv_url ? 'validated' : 'missing',
        isRequired: true,
        fileName: studentDetails.cv_url ? 'cv_etudiant.pdf' : undefined
      })
      docs.push({
        id: 'student_proof',
        title: "Preuve de scolarité",
        description: "Certificat de scolarité ou carte étudiante.",
        category: 'academic',
        status: studentDetails.student_proof_url ? 'validated' : 'missing',
        isRequired: true,
        fileName: studentDetails.student_proof_url ? 'certificat.pdf' : undefined
      })
      docs.push({
        id: 'transcript',
        title: "Relevés de notes",
        description: "Vos derniers résultats académiques.",
        category: 'academic',
        status: studentDetails.transcript_url ? 'validated' : 'missing',
        isRequired: true,
        fileName: studentDetails.transcript_url ? 'releves.pdf' : undefined
      })
      docs.push({
        id: 'motivational_letter',
        title: "Lettre de motivation",
        description: "Présentation de votre projet.",
        category: 'academic',
        status: studentDetails.motivational_letter_url ? 'validated' : 'missing',
        isRequired: false,
        fileName: studentDetails.motivational_letter_url ? 'lettre.pdf' : undefined
      })
      docs.push({
        id: 'portfolio',
        title: "Portfolio / Projets",
        description: "Lien ou fichier de vos réalisations.",
        category: 'academic',
        status: studentDetails.portfolio_url ? 'validated' : 'missing',
        isRequired: false,
        fileName: studentDetails.portfolio_url ? 'portfolio.pdf' : undefined
      })
    }

    // 3. Professional / Mentor Documents
    if (mentorDetails) {
      docs.push({
        id: 'cv_mentor',
        title: "CV complet (Mentor)",
        description: "Votre parcours détaillé.",
        category: 'professional',
        status: mentorDetails.cv_url ? 'validated' : 'missing',
        isRequired: true,
        fileName: mentorDetails.cv_url ? 'cv_mentor.pdf' : undefined
      })
      docs.push({
        id: 'proof_employment',
        title: "Justificatifs d'expérience",
        description: "Preuves d'emploi ou certifications.",
        category: 'professional',
        status: (mentorDetails.proof_documents_url && mentorDetails.proof_documents_url.length > 0) ? 'validated' : 'missing',
        isRequired: true,
        fileName: mentorDetails.proof_documents_url?.length ? `${mentorDetails.proof_documents_url.length} documents` : undefined
      })
      docs.push({
        id: 'diploma',
        title: "Diplômes",
        description: "Vos titres universitaires.",
        category: 'professional',
        status: mentorDetails.diploma_url ? 'validated' : 'missing',
        isRequired: false,
        fileName: mentorDetails.diploma_url ? 'diplome.pdf' : undefined
      })
      docs.push({
        id: 'reference_letter',
        title: "Lettres de recommandation",
        description: "Avis de vos pairs ou employeurs.",
        category: 'professional',
        status: mentorDetails.reference_letter_url ? 'validated' : 'missing',
        isRequired: false,
        fileName: mentorDetails.reference_letter_url ? 'recommandation.pdf' : undefined
      })
    }

    setDocuments(docs)

  }, [profile, studentDetails, mentorDetails, loading])

  // Calculate Stats
  const totalRequired = documents.filter(d => d.isRequired).length
  const totalValidated = documents.filter(d => d.status === 'validated').length
  const missingCount = documents.filter(d => d.status === 'missing' && d.isRequired).length
  const pendingCount = documents.filter(d => d.status === 'pending').length
  const completionPercentage = totalRequired > 0 ? Math.round((totalValidated / totalRequired) * 100) : 0

  // Sections config
  const sections = [
    {
      id: 'identity',
      title: 'Vérification d\'identité',
      description: 'Sécurisez votre compte et validez votre identité.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      color: 'bg-emerald-50 border-emerald-100',
    },
    {
      id: 'academic',
      title: 'Dossier Académique',
      description: 'Documents pour vos candidatures de stage ou d\'expatriation.',
      icon: <GraduationCap className="w-5 h-5 text-blue-600" />,
      color: 'bg-blue-50 border-blue-100',
    },
    {
      id: 'professional',
      title: 'Dossier Professionnel',
      description: 'Justificatifs de votre expertise et de vos diplômes.',
      icon: <Briefcase className="w-5 h-5 text-violet-600" />,
      color: 'bg-violet-50 border-violet-100',
    }
  ]

  const handleUpload = async (docId: string, files: FileList) => {
    if (!user || !profile || files.length === 0) return

    const file = files[0]
    setIsUploading(docId)
    setError(null)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/${docId}_${Date.now()}.${fileExt}`
      const filePath = `documents/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath)

      // Update Database records
      if (docId === 'id_card') {
        await supabase.from('profiles').update({ id_card_url: publicUrl }).eq('id', profile.id)
      } else if (docId === 'cv_student' || docId === 'student_proof' || docId === 'transcript' || docId === 'portfolio' || docId === 'motivational_letter') {
        const fieldMap: Record<string, string> = {
          'cv_student': 'cv_url',
          'student_proof': 'student_proof_url',
          'transcript': 'transcript_url',
          'portfolio': 'portfolio_url',
          'motivational_letter': 'motivational_letter_url'
        }
        await supabase.from('student_details').update({ [fieldMap[docId]]: publicUrl }).eq('profile_id', profile.id)
      } else if (docId === 'cv_mentor' || docId === 'diploma' || docId === 'reference_letter') {
        const fieldMap: Record<string, string> = {
          'cv_mentor': 'cv_url',
          'diploma': 'diploma_url',
          'reference_letter': 'reference_letter_url'
        }
        await supabase.from('mentor_details').update({ [fieldMap[docId]]: publicUrl }).eq('profile_id', profile.id)
      } else if (docId === 'proof_employment') {
        const currentProofs = mentorDetails?.proof_documents_url || []
        await supabase.from('mentor_details').update({
          proof_documents_url: [...currentProofs, publicUrl]
        }).eq('profile_id', profile.id)
      }

      await refreshProfile()
    } catch (err: any) {
      console.error('Upload error:', err)
      setError("Erreur lors de l'envoi du document.")
    } finally {
      setIsUploading(null)
    }
  }

  const handleDelete = async (docId: string) => {
    if (!user || !profile) return
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce document ?")) return

    setIsUploading(docId) // Re-use state for overlay
    setError(null)

    try {
      // 1. Identify URL to delete from storage
      let urlToDelete: string | null = null
      if (docId === 'id_card') urlToDelete = profile.id_card_url
      else if (docId === 'cv_student') urlToDelete = studentDetails?.cv_url
      else if (docId === 'student_proof') urlToDelete = studentDetails?.student_proof_url
      else if (docId === 'transcript') urlToDelete = studentDetails?.transcript_url
      else if (docId === 'portfolio') urlToDelete = studentDetails?.portfolio_url
      else if (docId === 'motivational_letter') urlToDelete = studentDetails?.motivational_letter_url
      else if (docId === 'cv_mentor') urlToDelete = mentorDetails?.cv_url
      else if (docId === 'diploma') urlToDelete = mentorDetails?.diploma_url
      else if (docId === 'reference_letter') urlToDelete = mentorDetails?.reference_letter_url

      if (urlToDelete) {
        // Extract storage path from public URL
        const path = urlToDelete.split('/public/documents/')[1]
        if (path) {
          await supabase.storage.from('documents').remove([path])
        }
      }

      // 2. Update Database to NULL
      if (docId === 'id_card') {
        await supabase.from('profiles').update({ id_card_url: null }).eq('id', profile.id)
      } else if (['cv_student', 'student_proof', 'transcript', 'portfolio', 'motivational_letter'].includes(docId)) {
        const fieldMap: Record<string, string> = {
          'cv_student': 'cv_url',
          'student_proof': 'student_proof_url',
          'transcript': 'transcript_url',
          'portfolio': 'portfolio_url',
          'motivational_letter': 'motivational_letter_url'
        }
        await supabase.from('student_details').update({ [fieldMap[docId]]: null }).eq('profile_id', profile.id)
      } else if (['cv_mentor', 'diploma', 'reference_letter'].includes(docId)) {
        const fieldMap: Record<string, string> = {
          'cv_mentor': 'cv_url',
          'diploma': 'diploma_url',
          'reference_letter': 'reference_letter_url'
        }
        await supabase.from('mentor_details').update({ [fieldMap[docId]]: null }).eq('profile_id', profile.id)
      } else if (docId === 'proof_employment') {
        // Clear all proofs for now (simpler than selective delete for MVP)
        await supabase.from('mentor_details').update({ proof_documents_url: [] }).eq('profile_id', profile.id)
      }

      await refreshProfile()
    } catch (err: any) {
      console.error('Delete error:', err)
      setError("Erreur lors de la suppression du document.")
    } finally {
      setIsUploading(null)
    }
  }

  const handleAddDocument = () => {
    const newDocId = `misc_${Date.now()}`
    setDocuments(prev => [...prev, {
      id: newDocId,
      title: "Nouveau document",
      description: "Document complémentaire (contrat, diplôme, etc.)",
      category: 'misc' as any,
      status: 'missing',
      isRequired: false
    }])
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Chargement des documents...</div>

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mes Documents</h1>
        <Button onClick={handleAddDocument} variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Ajouter un document
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {isUploading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-[2px] z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center gap-4 animate-in zoom-in-95">
            <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
            <div className="text-center">
              <p className="font-bold text-gray-900">Opération en cours...</p>
              <p className="text-sm text-gray-500">Veuillez patienter quelques instants</p>
            </div>
          </div>
        </div>
      )}

      <ProgressOverview
        completionPercentage={completionPercentage}
        pendingCount={pendingCount}
        missingCount={missingCount}
      />

      {/* Smart Suggestions */}
      {studentDetails && !studentDetails.cv_url && (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-white border border-blue-100 shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">Boostez votre profil</h4>
            <p className="text-sm text-gray-600 mt-0.5">
              Ajoutez votre CV dès maintenant pour postuler aux offres.
            </p>
          </div>
        </div>
      )}

      {/* Document Sections */}
      <div className="space-y-8">
        {documents.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500">Aucun document requis pour le moment. Complétez votre profil pour voir les requis.</p>
          </div>
        ) : (
          sections.map(section => {
            const sectionDocs = documents.filter(d => d.category === section.id)
            if (sectionDocs.length === 0) return null

            return (
              <div key={section.id} className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg border ${section.color}`}>
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                    <p className="text-sm text-gray-500">{section.description}</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {sectionDocs.map(doc => (
                    <DocumentItemCard
                      key={doc.id}
                      document={doc}
                      onUpload={(files) => handleUpload(doc.id, files)}
                      onDelete={() => handleDelete(doc.id)}
                    />
                  ))}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
