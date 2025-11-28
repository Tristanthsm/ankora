-- Migration: Profile Verification System
-- Date: 2023-11-28

-- 1. Update profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending_verification' CHECK (status IN ('pending_verification', 'under_review', 'verified', 'rejected'));

-- 2. Create student_details table
CREATE TABLE IF NOT EXISTS student_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  school TEXT,
  degree_level TEXT,
  field_of_study TEXT,
  target_countries TEXT[] DEFAULT '{}',
  target_sectors TEXT[] DEFAULT '{}',
  internship_type TEXT,
  internship_duration TEXT,
  languages TEXT[] DEFAULT '{}',
  linkedin_url TEXT,
  cv_url TEXT,
  student_proof_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(profile_id)
);

-- 3. Create mentor_details table
CREATE TABLE IF NOT EXISTS mentor_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  current_position TEXT,
  company TEXT,
  experience_years INT,
  expertise_sectors TEXT[] DEFAULT '{}',
  countries_network TEXT[] DEFAULT '{}',
  help_types TEXT[] DEFAULT '{}',
  linkedin_url TEXT,
  proof_documents_url TEXT[] DEFAULT '{}',
  max_students_per_month INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(profile_id)
);

-- 4. Enable RLS
ALTER TABLE student_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_details ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for student_details
-- Users can view their own details
CREATE POLICY "Users can view their own student details"
  ON student_details FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = student_details.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- Users can insert their own details
CREATE POLICY "Users can insert their own student details"
  ON student_details FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = student_details.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- Users can update their own details
CREATE POLICY "Users can update their own student details"
  ON student_details FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = student_details.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- 6. RLS Policies for mentor_details
-- Users can view their own details
CREATE POLICY "Users can view their own mentor details"
  ON mentor_details FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = mentor_details.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- Users can insert their own details
CREATE POLICY "Users can insert their own mentor details"
  ON mentor_details FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = mentor_details.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- Users can update their own details
CREATE POLICY "Users can update their own mentor details"
  ON mentor_details FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = mentor_details.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- 7. Triggers for updated_at
DROP TRIGGER IF EXISTS update_student_details_updated_at ON student_details;
CREATE TRIGGER update_student_details_updated_at
  BEFORE UPDATE ON student_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_mentor_details_updated_at ON mentor_details;
CREATE TRIGGER update_mentor_details_updated_at
  BEFORE UPDATE ON mentor_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
