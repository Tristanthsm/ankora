import { useState, useEffect } from 'react'
import { supabase, Profile } from '../../lib/supabase'
import { useAuth } from '../../lib/auth'
import Button from '../Button'
import Card from '../Card'
import Input from '../Input'
import { MapPin, Briefcase, Languages } from 'lucide-react'

/**
 * Composant de recherche de mentors
 * Permet aux étudiants de rechercher et contacter des mentors
 */
interface MentorSearchProps {
  onRequestSent?: () => void
}

export default function MentorSearch({ onRequestSent }: MentorSearchProps) {
  const { user } = useAuth()
  const [mentors, setMentors] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMentor, setSelectedMentor] = useState<Profile | null>(null)
  const [requestMessage, setRequestMessage] = useState('')
  const [sendingRequest, setSendingRequest] = useState(false)

  // Charge tous les mentors
  useEffect(() => {
    const loadMentors = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'mentor')
          .order('created_at', { ascending: false })

        if (error) throw error
        setMentors(data || [])
      } catch (error) {
        console.error('Erreur lors du chargement des mentors:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMentors()
  }, [])

  // Filtre les mentors selon le terme de recherche
  const filteredMentors = mentors.filter(mentor => {
    const search = searchTerm.toLowerCase()
    return (
      mentor.full_name?.toLowerCase().includes(search) ||
      mentor.bio?.toLowerCase().includes(search) ||
      mentor.country?.toLowerCase().includes(search) ||
      mentor.city?.toLowerCase().includes(search) ||
      mentor.expertise_areas?.some(area => area.toLowerCase().includes(search)) ||
      false
    )
  })

  const handleSendRequest = async (mentor: Profile) => {
    if (!user) return

    setSendingRequest(true)
    try {
      const { error } = await supabase
        .from('requests')
        .insert([
          {
            student_id: user.id,
            mentor_id: mentor.user_id,
            status: 'pending',
            message: requestMessage.trim() || null,
          },
        ])

      if (error) throw error

      setSelectedMentor(null)
      setRequestMessage('')
      if (onRequestSent) {
        onRequestSent()
      }
      alert('Requête envoyée avec succès !')
    } catch (error: any) {
      alert('Erreur lors de l\'envoi de la requête: ' + error.message)
    } finally {
      setSendingRequest(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Barre de recherche */}
      <div className="mb-6">
        <Input
          label="Rechercher un mentor"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Nom, pays, domaine d'expertise..."
        />
      </div>

      {/* Liste des mentors */}
      {filteredMentors.length === 0 ? (
        <Card>
          <p className="text-center text-gray-600 py-8">
            {searchTerm ? 'Aucun mentor trouvé pour cette recherche' : 'Aucun mentor disponible'}
          </p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id}>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {mentor.full_name || 'Mentor'}
                  </h3>
                  {mentor.position && mentor.company && (
                    <p className="text-sm text-gray-600 mt-1">
                      {mentor.position} chez {mentor.company}
                    </p>
                  )}
                </div>

                {mentor.bio && (
                  <p className="text-gray-700 text-sm line-clamp-3">{mentor.bio}</p>
                )}

                <div className="space-y-2">
                  {mentor.city && mentor.country && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {mentor.city}, {mentor.country}
                    </div>
                  )}

                  {mentor.expertise_areas && mentor.expertise_areas.length > 0 && (
                    <div className="flex items-start text-sm text-gray-600">
                      <Briefcase className="h-4 w-4 mr-2 mt-0.5" />
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise_areas.map((area, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {mentor.languages && mentor.languages.length > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Languages className="h-4 w-4 mr-2" />
                      {mentor.languages.join(', ')}
                    </div>
                  )}
                </div>

                <Button
                  className="w-full"
                  onClick={() => setSelectedMentor(mentor)}
                >
                  Contacter ce mentor
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de contact */}
      {selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">
              Contacter {selectedMentor.full_name}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message (optionnel)
                </label>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Expliquez brièvement pourquoi vous souhaitez être accompagné par ce mentor..."
                />
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setSelectedMentor(null)
                    setRequestMessage('')
                  }}
                >
                  Annuler
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => handleSendRequest(selectedMentor)}
                  isLoading={sendingRequest}
                >
                  Envoyer la requête
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

