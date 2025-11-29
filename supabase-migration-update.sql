-- ============================================
-- SCRIPT DE MIGRATION POUR BASE EXISTANTE
-- ANKORA Global Connect
-- ============================================
-- 
-- Ce script met à jour une base de données existante avec les nouvelles
-- fonctionnalités (système de vérification, tables student_details et mentor_details)
-- 
-- ⚠️ IMPORTANT : Exécutez ce script uniquement si vous avez déjà une base
-- de données existante. Pour une nouvelle installation, utilisez supabase-schema.sql
-- ============================================

-- ============================================
-- 1. Ajouter le champ status à profiles (si pas déjà présent)
-- ============================================
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending_verification' 
CHECK (status IN ('pending_verification', 'under_review', 'verified', 'rejected'));

-- Mettre à jour les profils existants avec le statut par défaut
UPDATE profiles 
SET status = 'pending_verification' 
WHERE status IS NULL;

-- ============================================
-- 2. Créer la table student_details (si pas déjà existante)
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
-- 3. Créer la table mentor_details (si pas déjà existante)
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
-- 4. Créer les index (si pas déjà existants)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);
CREATE INDEX IF NOT EXISTS idx_student_details_profile_id ON student_details(profile_id);
CREATE INDEX IF NOT EXISTS idx_mentor_details_profile_id ON mentor_details(profile_id);

-- ============================================
-- 5. Activer RLS sur les nouvelles tables
-- ============================================
ALTER TABLE student_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_details ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 6. Créer les triggers pour updated_at
-- ============================================

-- Fonction pour mettre à jour updated_at (créer si n'existe pas)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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

-- ============================================
-- 7. Créer les politiques RLS pour student_details
-- ============================================

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can view their own student details" ON student_details;
DROP POLICY IF EXISTS "Users can insert their own student details" ON student_details;
DROP POLICY IF EXISTS "Users can update their own student details" ON student_details;

CREATE POLICY "Users can view their own student details"
  ON student_details FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = student_details.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own student details"
  ON student_details FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = student_details.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

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
-- 8. Créer les politiques RLS pour mentor_details
-- ============================================

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can view their own mentor details" ON mentor_details;
DROP POLICY IF EXISTS "Users can insert their own mentor details" ON mentor_details;
DROP POLICY IF EXISTS "Users can update their own mentor details" ON mentor_details;

CREATE POLICY "Users can view their own mentor details"
  ON mentor_details FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = mentor_details.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own mentor details"
  ON mentor_details FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = mentor_details.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

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
-- FIN DE LA MIGRATION
-- ============================================

