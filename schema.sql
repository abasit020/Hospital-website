-- AgroSmart Ghana - Soil Monitoring Database

-- 1. Create the soil_tests table
CREATE TABLE IF NOT EXISTS soil_tests (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  farmer_name TEXT,
  location TEXT,
  ph NUMERIC,
  nitrogen NUMERIC, -- mg/kg
  phosphorus NUMERIC, -- mg/kg
  potassium NUMERIC, -- mg/kg
  moisture NUMERIC, -- %
  recommendation TEXT,
  suitable_crops TEXT, -- Comma separated list
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE soil_tests ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
CREATE POLICY "Allow public read access to soil_tests" ON soil_tests FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to soil_tests" ON soil_tests FOR INSERT WITH CHECK (true);

-- 4. Enable Realtime for the soil_tests table
-- This allows the frontend to listen for new records in real-time
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE soil_tests;
COMMIT;
