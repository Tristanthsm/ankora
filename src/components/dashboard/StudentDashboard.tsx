import { useState, useEffect } from 'react'
import { supabase, Profile, Request } from '../../lib/supabase'
import { useAuth } from '../../lib/auth'
import MentorSearch from './MentorSearch'
import RequestsList from './RequestsList'
import MessagesView from './MessagesView'
import { Search, MessageSquare, Send } from 'lucide-react'

/**
 * Dashboard étudiant
 * Permet de rechercher des mentors, voir les requêtes envoyées et accéder à la messagerie
 */
interface StudentDashboardProps {
  profile: Profile
}

export default function StudentDashboard({ profile }: StudentDashboardProps) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'search' | 'requests' | 'messages'>('search')
  const [requests, setRequests] = useState<Request[]>([])
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [loading, setLoading] = useState(true)

  // Charge les requêtes de l'étudiant
  useEffect(() => {
    if (!user) return

    const loadRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('requests')
          .select('*')
          .eq('student_id', user.id)
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
      .channel('student-requests')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'requests',
          filter: `student_id=eq.${user.id}`,
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

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Bienvenue, {profile.full_name || 'Étudiant'} !
        </h2>
        <p className="text-gray-600">
          Trouvez des mentors qui peuvent vous aider dans votre recherche de stage ou d'emploi
        </p>
      </div>

      {/* Onglets */}
      <div className="flex space-x-1 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('search')}
          className={`
            px-4 py-2 font-medium text-sm transition-colors
            ${activeTab === 'search'
              ? 'border-b-2 border-primary-600 text-primary-600'
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          <Search className="h-4 w-4 inline mr-2" />
          Rechercher des mentors
        </button>
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
          <Send className="h-4 w-4 inline mr-2" />
          Mes requêtes ({requests.length})
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
      {activeTab === 'search' && (
        <MentorSearch
          onRequestSent={() => {
            setActiveTab('requests')
          }}
        />
      )}

      {activeTab === 'requests' && (
        <RequestsList
          requests={requests}
          loading={loading}
          userRole="student"
          onSelectRequest={setSelectedRequest}
        />
      )}

      {activeTab === 'messages' && (
        <MessagesView
          requests={requests.filter(r => r.status === 'accepted')}
          userRole="student"
          selectedRequest={selectedRequest}
          onSelectRequest={setSelectedRequest}
        />
      )}
    </div>
  )
}

