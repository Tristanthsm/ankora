-- Migration: Onboarding Enhancement
-- Date: 2023-11-28

-- 1. Update student_details table
ALTER TABLE student_details ADD COLUMN IF NOT EXISTS target_city TEXT;
ALTER TABLE student_details ADD COLUMN IF NOT EXISTS start_date TEXT; -- Storing as TEXT for flexibility (e.g. "Septembre 2024"), or DATE if strict
ALTER TABLE student_details ADD COLUMN IF NOT EXISTS objective TEXT;

-- 2. Update mentor_details table
ALTER TABLE mentor_details ADD COLUMN IF NOT EXISTS contact_types TEXT[] DEFAULT '{}';
ALTER TABLE mentor_details ADD COLUMN IF NOT EXISTS coaching_formats TEXT[] DEFAULT '{}';
