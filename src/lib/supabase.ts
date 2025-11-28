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
  status: 'pending_verification' | 'under_review' | 'verified' | 'rejected'
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

export type StudentDetails = {
  id: string
  profile_id: string
  school: string | null
  degree_level: string | null
  field_of_study: string | null
  target_countries: string[] | null
  target_sectors: string[] | null
  internship_type: string | null
  internship_duration: string | null
  languages: string[] | null
  linkedin_url: string | null
  cv_url: string | null
  student_proof_url: string | null
  created_at: string
  updated_at: string
}

export type MentorDetails = {
  id: string
  profile_id: string
  current_position: string | null
  company: string | null
  experience_years: number | null
  expertise_sectors: string[] | null
  countries_network: string[] | null
  help_types: string[] | null
  linkedin_url: string | null
  proof_documents_url: string[] | null
  max_students_per_month: number | null
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

