
-- MIZGIN OIL - Master Database Schema
-- Instructions: Copy and paste this entire block into the Supabase SQL Editor and run it.

-- 1. Create tables with appropriate types
CREATE TABLE IF NOT EXISTS "Fuel Prices" (
  type TEXT PRIMARY KEY,
  "pricePerLiter" BIGINT NOT NULL,
  description TEXT DEFAULT 'Premium grade fuel.'
);

CREATE TABLE IF NOT EXISTS "services" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL, -- JSON string for multi-language
  description TEXT,
  icon TEXT DEFAULT 'Tool',
  image TEXT DEFAULT 'https://images.unsplash.com/photo-1486006396193-471068589dca?auto=format&fit=crop&q=80&w=1200',
  price BIGINT
);

CREATE TABLE IF NOT EXISTS "custom_sections" (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL -- JSON string
);

CREATE TABLE IF NOT EXISTS "custom_items" (
  id TEXT PRIMARY KEY,
  section_id TEXT REFERENCES custom_sections(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- JSON string
  price BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS "settings" (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- 2. Seed initial data (Exact prices requested by user)
INSERT INTO "Fuel Prices" (type, "pricePerLiter", description) VALUES
('Normal Kar', 770, 'Standard performance fuel for everyday commuting and reliability.'),
('Enhanced', 1000, 'Optimized combustion for better mileage and engine cleanliness.'),
('Super', 1250, 'High-octane premium blend for maximum power and engine protection.'),
('Elite Gasoline', 1000, 'Refined gasoline tailored for specialized engine performance.'),
('Pure Kerosene', 1000, 'Ultra-high purity for critical industrial and domestic heating.'),
('Refined LPG', 1000, 'Clean, consistent energy flow for sustainable applications.')
ON CONFLICT (type) DO UPDATE SET "pricePerLiter" = EXCLUDED."pricePerLiter";

INSERT INTO "settings" (key, value) VALUES
('contact_phone', '+964 750 000 0000')
ON CONFLICT (key) DO NOTHING;

-- 3. Enable Row Level Security (RLS)
ALTER TABLE "Fuel Prices" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "services" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "custom_sections" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "custom_items" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "settings" ENABLE ROW LEVEL SECURITY;

-- 4. Create Public Policies (Allows the app to read and edit data via anon key)
-- Note: In a production environment with real users, 'UPDATE/INSERT/DELETE' should be restricted.

-- Fuel Prices
CREATE POLICY "Public Read" ON "Fuel Prices" FOR SELECT USING (true);
CREATE POLICY "Public Insert" ON "Fuel Prices" FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update" ON "Fuel Prices" FOR UPDATE USING (true);
CREATE POLICY "Public Delete" ON "Fuel Prices" FOR DELETE USING (true);

-- Services
CREATE POLICY "Public Read" ON "services" FOR SELECT USING (true);
CREATE POLICY "Public Insert" ON "services" FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update" ON "services" FOR UPDATE USING (true);
CREATE POLICY "Public Delete" ON "services" FOR DELETE USING (true);

-- Sections
CREATE POLICY "Public Read" ON "custom_sections" FOR SELECT USING (true);
CREATE POLICY "Public Insert" ON "custom_sections" FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update" ON "custom_sections" FOR UPDATE USING (true);
CREATE POLICY "Public Delete" ON "custom_sections" FOR DELETE USING (true);

-- Items
CREATE POLICY "Public Read" ON "custom_items" FOR SELECT USING (true);
CREATE POLICY "Public Insert" ON "custom_items" FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update" ON "custom_items" FOR UPDATE USING (true);
CREATE POLICY "Public Delete" ON "custom_items" FOR DELETE USING (true);

-- Settings
CREATE POLICY "Public Read" ON "settings" FOR SELECT USING (true);
CREATE POLICY "Public Insert" ON "settings" FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update" ON "settings" FOR UPDATE USING (true);
CREATE POLICY "Public Delete" ON "settings" FOR DELETE USING (true);
