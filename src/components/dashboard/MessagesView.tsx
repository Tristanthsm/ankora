import { useState, useEffect, useRef } from 'react'
import { supabase, Request, Message, Profile } from '../../lib/supabase'
import { useAuth } from '../../lib/auth'
import Card from '../Card'
import Button from '../Button'
import Input from '../Input'
import { Send, MessageSquare } from 'lucide-react'

/**
 * Vue de messagerie temps réel
 * Permet la communication entre étudiants et mentors via les requêtes acceptées
 */
interface MessagesViewProps {
  requests: Request[]
  userRole: 'student' | 'mentor'
  selectedRequest?: Request | null
  onSelectRequest?: (request: Request) => void
}

export default function MessagesView({
  requests,
  userRole,
  selectedRequest,
  onSelectRequest,
}: MessagesViewProps) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [currentRequest, setCurrentRequest] = useState<Request | null>(
    selectedRequest || null
  )
  const [messageContent, setMessageContent] = useState('')
  const [sending, setSending] = useState(false)
  const [otherProfile, setOtherProfile] = useState<Profile | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Charge les messages de la requête sélectionnée
  useEffect(() => {
    if (!currentRequest) {
      setMessages([])
      return
    }

    const loadMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('request_id', currentRequest.id)
          .order('created_at', { ascending: true })

        if (error) throw error
        setMessages(data || [])
      } catch (error) {
        console.error('Erreur lors du chargement des messages:', error)
      }
    }

    loadMessages()

    // Charge le profil de l'autre utilisateur
    const loadOtherProfile = async () => {
      const otherUserId =
        userRole === 'student'
          ? currentRequest.mentor_id
          : currentRequest.student_id

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', otherUserId)
          .single()

        if (error) throw error
        setOtherProfile(data)
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error)
      }
    }

    loadOtherProfile()

    // Abonnement temps réel aux messages
    const subscription = supabase
      .channel(`messages-${currentRequest.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `request_id=eq.${currentRequest.id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [currentRequest, userRole])

  // Scroll automatique vers le bas lors de nouveaux messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Met à jour la requête sélectionnée si elle change depuis l'extérieur
  useEffect(() => {
    if (selectedRequest) {
      setCurrentRequest(selectedRequest)
    }
  }, [selectedRequest])

  const handleSendMessage = async () => {
    if (!user || !currentRequest || !messageContent.trim()) return

    setSending(true)
    try {
      const { error } = await supabase.from('messages').insert([
        {
          request_id: currentRequest.id,
          sender_id: user.id,
          content: messageContent.trim(),
        },
      ])

      if (error) throw error
      setMessageContent('')
    } catch (error: any) {
      alert('Erreur lors de l\'envoi du message: ' + error.message)
    } finally {
      setSending(false)
    }
  }

  if (requests.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {userRole === 'student'
              ? 'Aucune conversation disponible. Les conversations apparaîtront ici une fois vos requêtes acceptées.'
              : 'Aucune conversation disponible. Les conversations apparaîtront ici une fois que vous aurez accepté des requêtes.'}
          </p>
        </div>
      </Card>
    )
  }

  if (!currentRequest) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <h3 className="font-semibold mb-4">Conversations</h3>
            <div className="space-y-2">
              {requests.map((request) => {
                return (
                  <button
                    key={request.id}
                    onClick={() => {
                      setCurrentRequest(request)
                      if (onSelectRequest) {
                        onSelectRequest(request)
                      }
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-gray-200"
                  >
                    <p className="font-medium text-sm">
                      Requête #{request.id.slice(0, 8)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(request.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </button>
                )
              })}
            </div>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <p className="text-center text-gray-600 py-12">
              Sélectionnez une conversation pour commencer
            </p>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Liste des conversations */}
      <div className="md:col-span-1">
        <Card>
          <h3 className="font-semibold mb-4">Conversations</h3>
          <div className="space-y-2">
            {requests.map((request) => (
              <button
                key={request.id}
                onClick={() => {
                  setCurrentRequest(request)
                  if (onSelectRequest) {
                    onSelectRequest(request)
                  }
                }}
                className={`
                  w-full text-left p-3 rounded-lg border transition-colors
                  ${currentRequest.id === request.id
                    ? 'bg-primary-50 border-primary-300'
                    : 'border-gray-200 hover:bg-gray-50'
                  }
                `}
              >
                <p className="font-medium text-sm">
                  Requête #{request.id.slice(0, 8)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(request.created_at).toLocaleDateString('fr-FR')}
                </p>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Zone de messagerie */}
      <div className="md:col-span-2">
        <Card padding="none" className="flex flex-col h-[600px]">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold">
              {otherProfile?.full_name || 'Utilisateur'}
            </h3>
            {otherProfile && (
              <p className="text-sm text-gray-600">
                {otherProfile.city && otherProfile.country
                  ? `${otherProfile.city}, ${otherProfile.country}`
                  : ''}
              </p>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => {
              const isOwn = message.sender_id === user?.id
              return (
                <div
                  key={message.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-xs lg:max-w-md px-4 py-2 rounded-lg
                      ${isOwn
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                      }
                    `}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`
                        text-xs mt-1
                        ${isOwn ? 'text-primary-100' : 'text-gray-500'}
                      `}
                    >
                      {new Date(message.created_at).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex space-x-2"
            >
              <Input
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button
                type="submit"
                disabled={!messageContent.trim() || sending}
                isLoading={sending}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}

