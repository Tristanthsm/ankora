-- ============================================
-- SCHÉMA DE BASE DE DONNÉES SUPABASE
-- ANKORA Global Connect
-- Version mise à jour avec système de vérification
-- ============================================
-- 
-- Ce fichier contient le schéma SQL complet pour créer toutes les tables
-- nécessaires à la plateforme ANKORA Global Connect.
-- 
-- Instructions :
-- 1. Connectez-vous à votre dashboard Supabase
-- 2. Allez dans SQL Editor
-- 3. Créez une nouvelle requête
-- 4. Copiez-collez ce script
-- 5. Exécutez-le
-- ============================================

-- ============================================
-- TABLE: profiles
-- Profils utilisateurs (étudiants et mentors)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('student', 'mentor')),
  status TEXT NOT NULL DEFAULT 'pending_verification' CHECK (status IN ('pending_verification', 'under_review', 'verified', 'rejected')),
  full_name TEXT,
  bio TEXT,
  country TEXT,
  city TEXT,
  company TEXT,
  position TEXT,
  languages TEXT[] DEFAULT '{}',
  expertise_areas TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: student_details
-- Détails spécifiques aux étudiants
-- ============================================
CREATE TABLE IF NOT EXISTS student_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  school TEXT,
  degree_level TEXT,
  field_of_study TEXT,
  target_countries TEXT[] DEFAULT '{}',
  target_city TEXT,
  target_sectors TEXT[] DEFAULT '{}',
  internship_type TEXT,
  internship_duration TEXT,
  start_date TEXT,
  objective TEXT,
  languages TEXT[] DEFAULT '{}',
  linkedin_url TEXT,
  cv_url TEXT,
  student_proof_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: mentor_details
-- Détails spécifiques aux mentors
-- ============================================
CREATE TABLE IF NOT EXISTS mentor_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  current_position TEXT,
  company TEXT,
  experience_years INT,
  expertise_sectors TEXT[] DEFAULT '{}',
  countries_network TEXT[] DEFAULT '{}',
  help_types TEXT[] DEFAULT '{}',
  contact_types TEXT[] DEFAULT '{}',
  coaching_formats TEXT[] DEFAULT '{}',
  linkedin_url TEXT,
  proof_documents_url TEXT[] DEFAULT '{}',
  max_students_per_month INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: requests
-- Demandes de contact entre étudiants et mentors
-- ============================================
CREATE TABLE IF NOT EXISTS requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mentor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: messages
-- Messages échangés dans le cadre d'une requête acceptée
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES pour améliorer les performances
-- ============================================

-- Indexes pour profiles
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);

-- Indexes pour student_details
CREATE INDEX IF NOT EXISTS idx_student_details_profile_id ON student_details(profile_id);

-- Indexes pour mentor_details
CREATE INDEX IF NOT EXISTS idx_mentor_details_profile_id ON mentor_details(profile_id);

-- Indexes pour requests
CREATE INDEX IF NOT EXISTS idx_requests_student_id ON requests(student_id);
CREATE INDEX IF NOT EXISTS idx_requests_mentor_id ON requests(mentor_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);

-- Indexes pour messages
CREATE INDEX IF NOT EXISTS idx_messages_request_id ON messages(request_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- ============================================
-- TRIGGERS pour mettre à jour updated_at automatiquement
-- ============================================

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour profiles
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour student_details
DROP TRIGGER IF EXISTS update_student_details_updated_at ON student_details;
CREATE TRIGGER update_student_details_updated_at
  BEFORE UPDATE ON student_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour mentor_details
DROP TRIGGER IF EXISTS update_mentor_details_updated_at ON mentor_details;
CREATE TRIGGER update_mentor_details_updated_at
  BEFORE UPDATE ON mentor_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour requests
DROP TRIGGER IF EXISTS update_requests_updated_at ON requests;
CREATE TRIGGER update_requests_updated_at
  BEFORE UPDATE ON requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- POLITIQUES RLS (Row Level Security)
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLITIQUES RLS pour profiles
-- ============================================

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Les utilisateurs peuvent lire tous les profils
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Les utilisateurs peuvent créer leur propre profil
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- POLITIQUES RLS pour student_details
-- ============================================

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can view their own student details" ON student_details;
DROP POLICY IF EXISTS "Users can insert their own student details" ON student_details;
DROP POLICY IF EXISTS "Users can update their own student details" ON student_details;

-- Les utilisateurs peuvent voir leurs propres détails d'étudiant
CREATE POLICY "Users can view their own student details"
  ON student_details FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = student_details.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- Les utilisateurs peuvent créer leurs propres détails d'étudiant
CREATE POLICY "Users can insert their own student details"
  ON student_details FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = student_details.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- Les utilisateurs peuvent mettre à jour leurs propres détails d'étudiant
CREATE POLICY "Users can update their own student details"
  ON student_details FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = student_details.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- ============================================
-- POLITIQUES RLS pour mentor_details
-- ============================================

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can view their own mentor details" ON mentor_details;
DROP POLICY IF EXISTS "Users can insert their own mentor details" ON mentor_details;
DROP POLICY IF EXISTS "Users can update their own mentor details" ON mentor_details;

-- Les utilisateurs peuvent voir leurs propres détails de mentor
CREATE POLICY "Users can view their own mentor details"
  ON mentor_details FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = mentor_details.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- Les utilisateurs peuvent créer leurs propres détails de mentor
CREATE POLICY "Users can insert their own mentor details"
  ON mentor_details FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = mentor_details.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- Les utilisateurs peuvent mettre à jour leurs propres détails de mentor
CREATE POLICY "Users can update their own mentor details"
  ON mentor_details FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = mentor_details.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- ============================================
-- POLITIQUES RLS pour requests
-- ============================================

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can view their own requests" ON requests;
DROP POLICY IF EXISTS "Students can create requests" ON requests;
DROP POLICY IF EXISTS "Mentors can update their requests" ON requests;

-- Les utilisateurs peuvent voir les requêtes où ils sont impliqués
CREATE POLICY "Users can view their own requests"
  ON requests FOR SELECT
  USING (auth.uid() = student_id OR auth.uid() = mentor_id);

-- Les étudiants peuvent créer des requêtes
CREATE POLICY "Students can create requests"
  ON requests FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- Les mentors peuvent mettre à jour les requêtes qui leur sont adressées
CREATE POLICY "Mentors can update their requests"
  ON requests FOR UPDATE
  USING (auth.uid() = mentor_id);

-- ============================================
-- POLITIQUES RLS pour messages
-- ============================================

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can view messages in their requests" ON messages;
DROP POLICY IF EXISTS "Users can send messages in accepted requests" ON messages;

-- Les utilisateurs peuvent voir les messages des requêtes où ils sont impliqués
CREATE POLICY "Users can view messages in their requests"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM requests
      WHERE requests.id = messages.request_id
      AND (requests.student_id = auth.uid() OR requests.mentor_id = auth.uid())
    )
  );

-- Les utilisateurs peuvent envoyer des messages dans les requêtes acceptées où ils sont impliqués
CREATE POLICY "Users can send messages in accepted requests"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM requests
      WHERE requests.id = messages.request_id
      AND requests.status = 'accepted'
      AND (requests.student_id = auth.uid() OR requests.mentor_id = auth.uid())
    )
  );

-- ============================================
-- FONCTION pour créer automatiquement un profil après inscription
-- ============================================

-- Fonction qui crée un profil vide après l'inscription d'un utilisateur
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Note: Le profil sera complété via l'onboarding
  -- On ne crée pas de profil automatiquement pour laisser l'utilisateur choisir son rôle
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer un profil (optionnel - commenté car l'onboarding gère la création)
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW
--   EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- FIN DU SCHÉMA
-- ============================================
