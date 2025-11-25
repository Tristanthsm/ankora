import { useState, useEffect } from 'react'
import { supabase, Profile, Request } from '../../lib/supabase'
import { useAuth } from '../../lib/auth'
import Card from '../Card'
import RequestsList from './RequestsList'
import MessagesView from './MessagesView'
import { MessageSquare, Users } from 'lucide-react'

/**
 * Dashboard mentor
 * Permet de voir et gérer les requêtes reçues, et accéder à la messagerie
 */
interface MentorDashboardProps {
  profile: Profile
}

export default function MentorDashboard({ profile }: MentorDashboardProps) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'requests' | 'messages'>('requests')
  const [requests, setRequests] = useState<Request[]>([])
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [loading, setLoading] = useState(true)

  // Charge les requêtes reçues par le mentor
  useEffect(() => {
    if (!user) return

    const loadRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('requests')
          .select('*')
          .eq('mentor_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error
        setRequests(data || [])
      } catch (error) {
        console.error('Erreur lors du chargement des requêtes:', error)
      } finally {
        setLoading(false)
      }
    }

    loadRequests()

    // Abonnement temps réel aux requêtes
    const subscription = supabase
      .channel('mentor-requests')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'requests',
          filter: `mentor_id=eq.${user.id}`,
        },
        () => {
          loadRequests()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  const pendingCount = requests.filter(r => r.status === 'pending').length
  const acceptedCount = requests.filter(r => r.status === 'accepted').length

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Bienvenue, {profile.full_name || 'Mentor'} !
        </h2>
        <p className="text-gray-600">
          Gérez les requêtes des étudiants et aidez-les dans leur recherche
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Requêtes en attente</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            </div>
            <Users className="h-8 w-8 text-primary-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Requêtes acceptées</p>
              <p className="text-2xl font-bold text-gray-900">{acceptedCount}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total requêtes</p>
              <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
            </div>
            <Users className="h-8 w-8 text-gray-600" />
          </div>
        </Card>
      </div>

      {/* Onglets */}
      <div className="flex space-x-1 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('requests')}
          className={`
            px-4 py-2 font-medium text-sm transition-colors
            ${activeTab === 'requests'
              ? 'border-b-2 border-primary-600 text-primary-600'
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          <Users className="h-4 w-4 inline mr-2" />
          Requêtes reçues ({requests.length})
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`
            px-4 py-2 font-medium text-sm transition-colors
            ${activeTab === 'messages'
              ? 'border-b-2 border-primary-600 text-primary-600'
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          <MessageSquare className="h-4 w-4 inline mr-2" />
          Messages
        </button>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'requests' && (
        <RequestsList
          requests={requests}
          loading={loading}
          userRole="mentor"
          onSelectRequest={setSelectedRequest}
        />
      )}

      {activeTab === 'messages' && (
        <MessagesView
          requests={requests.filter(r => r.status === 'accepted')}
          userRole="mentor"
          selectedRequest={selectedRequest}
          onSelectRequest={setSelectedRequest}
        />
      )}
    </div>
  )
}

