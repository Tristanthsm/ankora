import { useState, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { supabase, Message } from '../../lib/supabase'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Send, Search, MessageSquare } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'

interface ConversationPreview {
  id: string
  requestId: string
  otherUser: {
    id: string
    name: string
    role: 'mentor' | 'student'
    avatar?: string
  }
  lastMessage: string
  timestamp: string
  unread: number
  status: 'accepted' | 'pending' | 'rejected'
}

export default function InboxPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const [conversations, setConversations] = useState<ConversationPreview[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [messageContent, setMessageContent] = useState('')
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Charger les conversations
  useEffect(() => {
    if (!user) return

    const loadConversations = async () => {
      try {
        setLoading(true)

        // Récupérer les requêtes où l'utilisateur est impliqué
        const { data: requests, error: requestsError } = await supabase
          .from('requests')
          .select('*')
          .or(`student_id.eq.${user.id},mentor_id.eq.${user.id}`)
          .order('updated_at', { ascending: false })

        if (requestsError) throw requestsError

        if (!requests || requests.length === 0) {
          setLoading(false)
          return
        }

        // Pour chaque requête, récupérer les infos de l'autre utilisateur et le dernier message en parallèle
        const conversationsData = await Promise.all(requests.map(async (request) => {
          const otherUserId = request.student_id === user.id ? request.mentor_id : request.student_id

          try {
            // Récupérer le profil de l'autre utilisateur
            const { data: otherProfile } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', otherUserId)
              .single()

            if (!otherProfile) return null

            // Récupérer le dernier message
            const { data: lastMessage } = await supabase
              .from('messages')
              .select('*')
              .eq('request_id', request.id)
              .order('created_at', { ascending: false })
              .limit(1)
              .single()

            // Compter les messages non lus
            const { count: unreadCount } = await supabase
              .from('messages')
              .select('*', { count: 'exact', head: true })
              .eq('request_id', request.id)
              .eq('sender_id', otherUserId)
            // .is('read_at', null) // Uncomment when read_at is implemented

            return {
              id: `${request.id}-${otherUserId}`,
              requestId: request.id,
              otherUser: {
                id: otherUserId,
                name: otherProfile.full_name || 'Utilisateur',
                role: (otherProfile.role && otherProfile.role.includes('student')) ? 'student' : 'mentor',
                avatar: otherProfile.avatar_url
              },
              lastMessage: lastMessage?.content || request.message || 'Aucun message',
              timestamp: lastMessage?.created_at || request.created_at,
              unread: unreadCount || 0,
              status: request.status,
            } as ConversationPreview
          } catch (err) {
            console.error(`Erreur pour la conversation ${request.id}:`, err)
            return null
          }
        }))

        // Filtrer les conversations nulles (erreurs)
        const validConversations = conversationsData.filter((c): c is ConversationPreview => c !== null)

        setConversations(validConversations)

        // Sélectionner la première conversation par défaut
        if (validConversations.length > 0 && !selectedConversation) {
          setSelectedConversation(validConversations[0].id)
        }
      } catch (error) {
        console.error('Erreur lors du chargement des conversations:', error)
      } finally {
        setLoading(false)
      }
    }

    loadConversations()
  }, [user, profile])

  // Charger les messages de la conversation sélectionnée
  useEffect(() => {
    if (!selectedConversation || !user) return

    const conversation = conversations.find(c => c.id === selectedConversation)
    if (!conversation) return

    const loadMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('request_id', conversation.requestId)
          .order('created_at', { ascending: true })

        if (error) throw error
        setMessages(data || [])
      } catch (error) {
        console.error('Erreur lors du chargement des messages:', error)
      }
    }

    loadMessages()

    // Abonnement temps réel aux nouveaux messages
    const subscription = supabase
      .channel(`messages-${conversation.requestId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `request_id=eq.${conversation.requestId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [selectedConversation, conversations, user])

  // Scroll automatique vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!user || !selectedConversation || !messageContent.trim()) return

    const conversation = conversations.find(c => c.id === selectedConversation)
    if (!conversation) return

    setSending(true)
    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            request_id: conversation.requestId,
            sender_id: user.id,
            content: messageContent.trim(),
          },
        ])

      if (error) throw error
      setMessageContent('')
    } catch (error: any) {
      console.error('Erreur lors de l\'envoi du message:', error)
      alert('Erreur lors de l\'envoi du message: ' + error.message)
    } finally {
      setSending(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Permettre l'accès même sans profil complet
  // L'utilisateur pourra voir les conversations s'il en a

  const filteredConversations = conversations.filter(conv =>
    conv.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeConversation = conversations.find(c => c.id === selectedConversation)

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'À l\'instant'
    if (minutes < 60) return `Il y a ${minutes} min`
    if (hours < 24) return `Il y a ${hours}h`
    if (days < 7) return `Il y a ${days}j`
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container-custom py-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
          <div className="grid grid-cols-[380px_1fr] h-full">
            {/* Colonne gauche - Liste des conversations */}
            <div className="border-r border-gray-200 flex flex-col">
              {/* Header avec recherche */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="h-6 w-6 text-primary-600" />
                  <h2 className="text-xl font-bold text-gray-900">Messages</h2>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Rechercher une conversation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Liste des conversations */}
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Aucune conversation</p>
                  </div>
                ) : (
                  filteredConversations.map((conversation) => {
                    const isActive = selectedConversation === conversation.id
                    return (
                      <button
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation.id)}
                        className={`
                          w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left
                          ${isActive ? 'bg-primary-50 border-l-4 border-l-primary-600' : ''}
                        `}
                      >
                        <div className="flex items-start gap-3">
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
                              {conversation.otherUser.name.charAt(0).toUpperCase()}
                            </div>
                          </div>

                          {/* Contenu */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className={`font-semibold text-sm truncate ${isActive ? 'text-primary-900' : 'text-gray-900'}`}>
                                {conversation.otherUser.name}
                              </p>
                              <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                                {formatTime(conversation.timestamp)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className={`text-sm truncate ${isActive ? 'text-primary-700' : 'text-gray-600'}`}>
                                {conversation.lastMessage}
                              </p>
                              {conversation.unread > 0 && (
                                <span className="flex-shrink-0 ml-2 bg-primary-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                                  {conversation.unread > 9 ? '9+' : conversation.unread}
                                </span>
                              )}
                            </div>
                            <div className="mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${conversation.otherUser.role === 'mentor'
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'bg-emerald-100 text-emerald-700'
                                }`}>
                                {conversation.otherUser.role === 'mentor' ? 'Mentor' : 'Étudiant'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })
                )}
              </div>
            </div>

            {/* Colonne droite - Conversation active */}
            <div className="flex flex-col">
              {activeConversation ? (
                <>
                  {/* Header de la conversation */}
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
                        {activeConversation.otherUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{activeConversation.otherUser.name}</p>
                        <p className="text-xs text-gray-500">
                          {activeConversation.otherUser.role === 'mentor' ? 'Mentor' : 'Étudiant'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Aucun message. Commencez la conversation !</p>
                      </div>
                    ) : (
                      messages.map((message) => {
                        const isOwn = message.sender_id === user.id
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`
                                max-w-xs lg:max-w-md px-4 py-2 rounded-2xl
                                ${isOwn
                                  ? 'bg-primary-600 text-white rounded-tr-sm'
                                  : 'bg-white text-gray-900 rounded-tl-sm shadow-sm'
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
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input d'envoi */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleSendMessage()
                      }}
                      className="flex gap-2"
                    >
                      <Input
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        placeholder="Écrire un message..."
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
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center text-gray-500">
                    <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">Sélectionnez une conversation</p>
                    <p className="text-sm">Choisissez une conversation dans la liste pour commencer</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
