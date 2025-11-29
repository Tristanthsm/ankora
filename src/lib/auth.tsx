import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { Profile } from './supabase'

/**
 * Contexte d'authentification
 * Fournit l'état de l'utilisateur et les méthodes d'authentification
 * à tous les composants de l'application
 */
interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ data: any; error: any }>
  signOut: () => Promise<void>
  logout: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Provider d'authentification
 * Gère l'état global de l'authentification et synchronise avec Supabase
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  /**
   * Charge le profil utilisateur depuis la base de données
   */
  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        // Si le profil n'existe pas (code PGRST116), c'est normal pour un nouvel utilisateur
        if (error.code === 'PGRST116') {
          console.log('Profil non trouvé - utilisateur doit compléter l\'onboarding')
          setProfile(null)
          return
        }
        throw error
      }
      setProfile(data)
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error)
      setProfile(null)
    }
  }

  /**
   * Rafraîchit le profil utilisateur
   */
  const refreshProfile = async () => {
    if (user) {
      await loadProfile(user.id)
    }
  }

  /**
   * Initialise l'état d'authentification au chargement
   */
  useEffect(() => {
    let mounted = true
    let timeoutId: NodeJS.Timeout

    // Timeout de sécurité : si la session ne charge pas en 5 secondes, on arrête le loading
    timeoutId = setTimeout(() => {
      if (mounted) {
        console.warn('Timeout lors du chargement de la session - arrêt du loading')
        setLoading(false)
      }
    }, 5000)

    // Récupère la session actuelle avec gestion d'erreur
    supabase.auth.getSession()
      .then(async ({ data: { session }, error }) => {
        clearTimeout(timeoutId)
        if (!mounted) return
        
        if (error) {
          console.error('Erreur lors de la récupération de la session:', error)
          setLoading(false)
          return
        }

        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          try {
            await loadProfile(session.user.id)
          } catch (err) {
            console.error('Erreur lors du chargement du profil:', err)
          }
        }
        setLoading(false)
      })
      .catch((error) => {
        clearTimeout(timeoutId)
        console.error('Erreur lors de la récupération de la session:', error)
        if (mounted) {
          setLoading(false)
        }
      })

    // Écoute les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return
      
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        try {
          await loadProfile(session.user.id)
        } catch (err) {
          console.error('Erreur lors du chargement du profil:', err)
        }
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => {
      mounted = false
      clearTimeout(timeoutId)
      subscription.unsubscribe()
    }
  }, [])

  /**
   * Connexion utilisateur
   */
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (!error) {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        await loadProfile(session.user.id)
      }
    }

    return { error }
  }

  /**
   * Inscription utilisateur
   */
  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  }

  /**
   * Déconnexion utilisateur
   */
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    } finally {
      // Toujours réinitialiser l'état local pour éviter de rester connecté côté client
      setSession(null)
      setUser(null)
      setProfile(null)
    }
  }

  const logout = async () => {
    await signOut()
  }

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    logout,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Hook personnalisé pour accéder au contexte d'authentification
 * @throws Error si utilisé en dehors d'un AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
}

