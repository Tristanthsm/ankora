import { useState, useEffect } from 'react'
import { supabase, Request, Profile } from '../../lib/supabase'
import { useAuth } from '../../lib/auth'
import Button from '../Button'
import Card from '../Card'
import { Check, X, User } from 'lucide-react'

/**
 * Liste des requêtes
 * Affiche les requêtes selon le rôle (étudiant ou mentor)
 * Permet aux mentors d'accepter/rejeter les requêtes
 */
interface RequestsListProps {
  requests: Request[]
  loading: boolean
  userRole: 'student' | 'mentor'
  onSelectRequest?: (request: Request) => void
}

export default function RequestsList({
  requests,
  loading,
  userRole,
  onSelectRequest,
}: RequestsListProps) {
  const { user } = useAuth()
  const [profiles, setProfiles] = useState<Record<string, Profile>>({})
  const [processingId, setProcessingId] = useState<string | null>(null)

  // Charge les profils associés aux requêtes
  useEffect(() => {
    const loadProfiles = async () => {
      if (requests.length === 0) return

      const userIds = new Set<string>()
      requests.forEach(req => {
        if (userRole === 'student') {
          userIds.add(req.mentor_id)
        } else {
          userIds.add(req.student_id)
        }
      })

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .in('user_id', Array.from(userIds))

        if (error) throw error

        const profilesMap: Record<string, Profile> = {}
        data?.forEach(profile => {
          profilesMap[profile.user_id] = profile
        })
        setProfiles(profilesMap)
      } catch (error) {
        console.error('Erreur lors du chargement des profils:', error)
      }
    }

    loadProfiles()
  }, [requests, userRole])

  const handleAccept = async (request: Request) => {
    if (!user) return

    setProcessingId(request.id)
    try {
      const { error } = await supabase
        .from('requests')
        .update({ status: 'accepted' })
        .eq('id', request.id)

      if (error) throw error
    } catch (error: any) {
      alert('Erreur: ' + error.message)
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (request: Request) => {
    if (!user) return

    setProcessingId(request.id)
    try {
      const { error } = await supabase
        .from('requests')
        .update({ status: 'rejected' })
        .eq('id', request.id)

      if (error) throw error
    } catch (error: any) {
      alert('Erreur: ' + error.message)
    } finally {
      setProcessingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (requests.length === 0) {
    return (
      <Card>
        <p className="text-center text-gray-600 py-8">
          {userRole === 'student'
            ? 'Vous n\'avez pas encore envoyé de requêtes'
            : 'Aucune requête reçue'}
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => {
        const otherProfile = userRole === 'student'
          ? profiles[request.mentor_id]
          : profiles[request.student_id]

        return (
          <Card key={request.id}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">
                    {otherProfile?.full_name || 'Utilisateur'}
                  </h3>
                  <span
                    className={`
                      px-2 py-1 text-xs rounded-full
                      ${request.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : request.status === 'accepted'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                      }
                    `}
                  >
                    {request.status === 'pending' && 'En attente'}
                    {request.status === 'accepted' && 'Acceptée'}
                    {request.status === 'rejected' && 'Refusée'}
                  </span>
                </div>

                {request.message && (
                  <p className="text-gray-700 text-sm mb-2">{request.message}</p>
                )}

                <p className="text-xs text-gray-500">
                  {new Date(request.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>

                {userRole === 'mentor' && request.status === 'pending' && (
                  <div className="flex space-x-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => handleAccept(request)}
                      disabled={processingId === request.id}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Accepter
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleReject(request)}
                      disabled={processingId === request.id}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Refuser
                    </Button>
                  </div>
                )}

                {request.status === 'accepted' && onSelectRequest && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-4"
                    onClick={() => onSelectRequest(request)}
                  >
                    Ouvrir la conversation
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

