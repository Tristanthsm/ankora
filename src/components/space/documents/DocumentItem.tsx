import { useRef } from 'react'
import { FileText, Upload, CheckCircle2, AlertCircle, Clock, Trash2, Eye, File, Link as LinkIcon, Download } from 'lucide-react'
import { DocumentItem, DocumentStatus } from '../../types/documents'
import Button from '../../Button'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface DocumentItemProps {
    document: DocumentItem
    onUpload?: (files: FileList) => void
    onDelete?: () => void
    onPreview?: () => void
}

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs))
}

export function DocumentItemCard({ document, onUpload, onDelete, onPreview }: DocumentItemProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleClickUpload = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onUpload?.(e.target.files)
        }
    }

    // Visual configuration based on status
    const statusConfig = {
        validated: {
            color: 'bg-green-50 text-green-700 border-green-200',
            icon: <CheckCircle2 className="w-4 h-4" />,
            text: 'Validé',
            border: 'border-green-100 hover:border-green-200'
        },
        pending: {
            color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
            icon: <Clock className="w-4 h-4" />,
            text: 'En vérification',
            border: 'border-yellow-100 hover:border-yellow-200'
        },
        missing: {
            color: 'bg-red-50 text-red-700 border-red-200',
            icon: <AlertCircle className="w-4 h-4" />,
            text: 'Requis',
            border: 'border-red-100 hover:border-red-200'
        },
        optional: {
            color: 'bg-blue-50 text-blue-700 border-blue-200',
            icon: <File className="w-4 h-4" />,
            text: 'Optionnel',
            border: 'border-gray-100 hover:border-blue-100'
        }
    }

    const status = statusConfig[document.status]
    const isUploaded = document.status === 'validated' || document.status === 'pending'

    return (
        <div className={cn(
            "group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl bg-white border transition-all duration-300",
            status.border,
            isUploaded ? "shadow-sm" : "border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50/50"
        )}>
            {/* Icon Section */}
            <div className={cn(
                "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                isUploaded ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400 group-hover:bg-white group-hover:text-blue-500 group-hover:shadow-sm"
            )}>
                {document.fileType === 'link' ? <LinkIcon className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 truncate">{document.title}</h3>

                    <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                        status.color
                    )}>
                        {status.icon}
                        {status.text}
                    </span>
                </div>

                {isUploaded ? (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-medium text-gray-700">{document.fileName}</span>
                        <span>•</span>
                        <span>{document.fileSize}</span>
                        <span>•</span>
                        <span>{document.uploadDate}</span>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 leading-relaxed">
                        {document.description}
                        {document.helperText && <span className="ml-1 text-blue-600 font-medium">{document.helperText}</span>}
                    </p>
                )}
            </div>

            {/* Actions Section */}
            <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                {isUploaded ? (
                    <>
                        <button
                            onClick={onPreview}
                            className="p-2 transition-colors text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Prévisualiser"
                        >
                            <Eye className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleClickUpload}
                            className="p-2 transition-colors text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Remplacer"
                        >
                            <Upload className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onDelete}
                            className="p-2 transition-colors text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Supprimer"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </>
                ) : (
                    <Button
                        size="sm"
                        variant="outline"
                        className="w-full sm:w-auto border-gray-200 hover:border-blue-300 hover:text-blue-600"
                        onClick={handleClickUpload}
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Importer
                    </Button>
                )}
            </div>
        </div>
    )
}
