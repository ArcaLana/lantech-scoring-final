-- Assessor-Chain System Migration
-- Run this in Supabase SQL Editor

-- 1. Create Access Keys Table
CREATE TABLE IF NOT EXISTS access_keys (
    key TEXT PRIMARY KEY,
    role TEXT NOT NULL CHECK (role IN ('superintendent', 'admin', 'jury', 'kaprodi')),
    name TEXT, -- Name of the holder (e.g. "Juri 1", "Pak Budi")
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Insert Initial Superintendent Key (Change this in production!)
INSERT INTO access_keys (key, role, name) 
VALUES ('SUP-ALPHA-ONE', 'superintendent', 'Chief Superintendent')
ON CONFLICT (key) DO NOTHING;

-- 3. Modify Scores Table to support Multi-Examiner
-- We need to add judge_id to differentiate who gave the score.
-- WARNING: This alters the primary key/unique constraint logic.

-- Step 3a: Add judge_id column
ALTER TABLE scores ADD COLUMN IF NOT EXISTS judge_id TEXT;

-- Step 3b: Default existing scores to a placeholder if needed (Optional)
-- UPDATE scores SET judge_id = 'LEGACY' WHERE judge_id IS NULL;

-- Step 3c: Drop old unique constraint if it exists
-- Note: The constraint name might vary. Check your schema or use the following generic approach if known.
-- ALTER TABLE scores DROP CONSTRAINT IF EXISTS scores_student_id_criteria_id_key;

-- Step 3d: Create new Unique Constraint (student_id, criteria_id, judge_id)
-- This allows multiple judges to rate the same criteria for the same student.
-- We use a unique index which acts as a constraint.
CREATE UNIQUE INDEX IF NOT EXISTS unique_score_per_judge 
ON scores (student_id, criteria_id, judge_id);

-- 5. Add 'is_locked' to Students (for Finalization)
ALTER TABLE students ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT FALSE;

-- 6. Add 'weight' to Criteria (for Weighted Average)
ALTER TABLE criteria ADD COLUMN IF NOT EXISTS weight DECIMAL DEFAULT 1.0;

-- 4. Enable RLS (Row Level Security) - Optional but recommended
-- ALTER TABLE access_keys ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public Read Access Keys" ON access_keys FOR SELECT USING (true);
