export type DocumentStatus = 'validated' | 'pending' | 'missing' | 'optional'
export type DocumentCategory = 'identity' | 'student' | 'mentor' | 'academic' | 'professional' | 'misc'

export interface DocumentItem {
    id: string
    title: string
    description: string
    category: DocumentCategory
    status: DocumentStatus
    fileType?: 'pdf' | 'image' | 'video' | 'link'
    fileName?: string
    uploadDate?: string
    fileSize?: string
    isRequired: boolean
    helperText?: string
}

export interface DocumentSection {
    id: DocumentCategory
    title: string
    description: string
    items: DocumentItem[]
}

// Mock Data for UI prototyping (Updated for International Mentoring)
export const MOCK_DOCUMENTS: DocumentItem[] = [
    // A - Identity
    {
        id: 'id_card',
        title: "Pièce d'identité",
        description: "Passeport ou Carte Nationale d'Identité en cours de validité.",
        category: 'identity',
        status: 'missing',
        isRequired: true,
    },

    // B - Student / Academic
    {
        id: 'cv_student',
        title: "CV / Resume",
        description: "Votre CV à jour, de préférence en anglais.",
        category: 'academic',
        status: 'missing',
        isRequired: true,
    },
    {
        id: 'transcript',
        title: "Relevé de notes",
        description: "Vos notes de la dernière année académique (ou semestre).",
        category: 'academic',
        status: 'missing',
        isRequired: true,
    },
    {
        id: 'motivational_letter',
        title: "Lettre de motivation",
        description: "Expliquez votre projet d'expatriation ou de stage.",
        category: 'academic',
        status: 'missing',
        isRequired: false,
    },
    {
        id: 'portfolio',
        title: "Portfolio / Projets",
        description: "Lien vers votre site ou fichier PDF de vos réalisations.",
        category: 'academic',
        status: 'optional',
        isRequired: false,
    },

    // C - Mentor / Professional
    {
        id: 'cv_mentor',
        title: "CV Professionnel",
        description: "Détaillez votre expérience professionnelle actuelle et passée.",
        category: 'professional',
        status: 'missing',
        isRequired: true,
    },
    {
        id: 'proof_employment',
        title: "Justificatifs d'expérience",
        description: "Contrats de travail ou certificats de travail.",
        category: 'professional',
        status: 'missing',
        isRequired: true,
    },
    {
        id: 'diploma',
        title: "Diplômes",
        description: "Copies de vos diplômes universitaires ou certifications.",
        category: 'professional',
        status: 'missing',
        isRequired: false,
    },
    {
        id: 'reference_letter',
        title: "Lettres de recommandation",
        description: "Recommandations de vos anciens employeurs ou collaborateurs.",
        category: 'professional',
        status: 'optional',
        isRequired: false,
    },
]
