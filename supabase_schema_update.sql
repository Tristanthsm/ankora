-- Add new columns to mentor_details table
ALTER TABLE public.mentor_details 
ADD COLUMN IF NOT EXISTS short_pitch text,
ADD COLUMN IF NOT EXISTS hourly_rate numeric,
ADD COLUMN IF NOT EXISTS pack_price numeric,
ADD COLUMN IF NOT EXISTS services text[], -- array of strings
ADD COLUMN IF NOT EXISTS response_time text,
ADD COLUMN IF NOT EXISTS availability jsonb, -- structured schedule
ADD COLUMN IF NOT EXISTS key_skills text[], 
ADD COLUMN IF NOT EXISTS cv_url text;

-- Make sure existing columns are consistent if needed (optional)
-- ALTER TABLE public.mentor_details ADD COLUMN IF NOT EXISTS expertise_sectors text[];
-- ALTER TABLE public.mentor_details ADD COLUMN IF NOT EXISTS countries_network text[];
