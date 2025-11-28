import { Loader2 } from 'lucide-react'

export default function FullPageLoader({ label = 'Chargement...' }: { label?: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex items-center justify-center p-6">
      <div className="bg-white/80 border border-blue-100 shadow-2xl shadow-blue-200/40 rounded-2xl px-8 py-10 flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 w-16 h-16 rounded-full bg-blue-100 blur-lg" aria-hidden />
          <Loader2 className="w-14 h-14 text-blue-600 animate-spin" />
        </div>
        <p className="text-blue-900 font-semibold text-lg tracking-tight">{label}</p>
      </div>
    </div>
  )
}
