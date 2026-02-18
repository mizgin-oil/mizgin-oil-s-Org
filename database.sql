
-- Database Setup for Mizgin Oil

-- Fuel Prices
create table if not exists "Fuel Prices" (
  type text primary key,
  "pricePerLiter" bigint not null,
  description text default 'Premium grade fuel.'
);

-- Services
create table if not exists "services" (
  id text primary key,
  name text not null,
  description text,
  icon text default 'Tool',
  image text default 'https://images.unsplash.com/photo-1486006396193-471068589dca?auto=format&fit=crop&q=80&w=1200',
  price bigint
);

-- Coffee Menu
create table if not exists "coffee_menu" (
  id text primary key,
  name text not null,
  price bigint not null
);

-- Custom Sections
create table if not exists "custom_sections" (
  id text primary key,
  title text not null
);

-- Custom Items
create table if not exists "custom_items" (
  id text primary key,
  section_id text references custom_sections(id) on delete cascade,
  name text not null,
  price bigint not null
);

-- Global Settings
create table if not exists "settings" (
  key text primary key,
  value text not null
);
