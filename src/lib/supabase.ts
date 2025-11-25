import { createClient } from '@supabase/supabase-js'

/**
 * Configuration Supabase
 * Les credentials sont chargés depuis les variables d'environnement
 * pour garantir la sécurité et la flexibilité de déploiement
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Variables d\'environnement Supabase manquantes. ' +
    'Vérifiez que VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont définies dans votre fichier .env'
  )
}

/**
 * Client Supabase singleton
 * Utilisé pour toutes les interactions avec la base de données
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

/**
 * Types de base de données
 * Synchronisés avec le schéma Supabase
 */
export type Profile = {
  id: string
  user_id: string
  role: 'student' | 'mentor'
  full_name: string | null
  bio: string | null
  country: string | null
  city: string | null
  company: string | null
  position: string | null
  languages: string[] | null
  expertise_areas: string[] | null
  created_at: string
  updated_at: string
}

export type Request = {
  id: string
  student_id: string
  mentor_id: string
  status: 'pending' | 'accepted' | 'rejected'
  message: string | null
  created_at: string
  updated_at: string
}

export type Message = {
  id: string
  request_id: string
  sender_id: string
  content: string
  created_at: string
}

