import { useState, FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { supabase } from '../lib/supabase'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'

/**
 * Page d'onboarding
 * Permet aux utilisateurs de compléter leur profil après inscription
 * Différencie les champs selon le rôle (étudiant ou mentor)
 */
export default function Onboarding() {
  const { user, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState<'student' | 'mentor'>('student')
  const [fullName, setFullName] = useState('')
  const [bio, setBio] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [languages, setLanguages] = useState('')
  const [expertiseAreas, setExpertiseAreas] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Vérifie si le profil existe déjà
  useEffect(() => {
    const checkProfile = async () => {
      if (!user) return

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data) {
        // Le profil existe, rediriger vers le dashboard
        navigate('/dashboard')
      }
    }

    checkProfile()
  }, [user, navigate])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!user) {
      setError('Utilisateur non authentifié')
      return
    }

    if (!fullName.trim()) {
      setError('Le nom complet est requis')
      return
    }

    setIsLoading(true)

    try {
      const profileData = {
        user_id: user.id,
        role,
        full_name: fullName.trim(),
        bio: bio.trim() || null,
        country: country.trim() || null,
        city: city.trim() || null,
        company: role === 'mentor' ? company.trim() || null : null,
        position: role === 'mentor' ? position.trim() || null : null,
        languages: languages.trim() ? languages.split(',').map(l => l.trim()) : [],
        expertise_areas: role === 'mentor' && expertiseAreas.trim() 
          ? expertiseAreas.split(',').map(a => a.trim()) 
          : [],
      }

      const { error: insertError } = await supabase
        .from('profiles')
        .insert([profileData])

      if (insertError) throw insertError

      await refreshProfile()
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création du profil')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complétez votre profil</h1>
          <p className="mt-2 text-gray-600">
            Remplissez les informations suivantes pour commencer
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Sélection du rôle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Je suis un(e) *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`
                    p-4 border-2 rounded-lg text-center transition-colors
                    ${role === 'student'
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                    }
                  `}
                >
                  <div className="font-semibold">Étudiant</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Je cherche un stage ou un emploi
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('mentor')}
                  className={`
                    p-4 border-2 rounded-lg text-center transition-colors
                    ${role === 'mentor'
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                    }
                  `}
                >
                  <div className="font-semibold">Mentor</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Je guide des étudiants
                  </div>
                </button>
              </div>
            </div>

            <Input
              label="Nom complet *"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Parlez-nous de vous..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Pays"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <Input
                label="Ville"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            {role === 'mentor' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Entreprise"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                  <Input
                    label="Poste"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>

                <Input
                  label="Domaines d'expertise (séparés par des virgules)"
                  value={expertiseAreas}
                  onChange={(e) => setExpertiseAreas(e.target.value)}
                  placeholder="Ex: Marketing, Finance, Tech..."
                />
              </>
            )}

            <Input
              label="Langues parlées (séparées par des virgules)"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              placeholder="Ex: Français, Anglais, Espagnol..."
            />

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Compléter mon profil
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

