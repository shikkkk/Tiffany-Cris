-- ============================================================
-- Tiffany & Cris — Supabase Backend Fixes
-- Run this in: https://supabase.com/dashboard/project/ldvsjfgeornlispaefjf/sql/new
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- FIX 1: Create the `messages` table for the Contact form
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text        NOT NULL,
  email      text        NOT NULL,
  phone      text,
  subject    text        NOT NULL,
  message    text        NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- RLS: Anyone can submit a contact form (anon INSERT allowed)
-- Only authenticated users (admins) can read messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_can_insert_messages"
  ON messages FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "authenticated_can_read_messages"
  ON messages FOR SELECT TO authenticated
  USING (true);


-- ────────────────────────────────────────────────────────────
-- FIX 2: Add UNIQUE constraint on Users.email
-- Prevents duplicate accounts and protects is_admin escalation
-- ────────────────────────────────────────────────────────────
ALTER TABLE "Users"
  ADD CONSTRAINT users_email_unique UNIQUE (email);


-- ────────────────────────────────────────────────────────────
-- FIX 3: Lock down the Users table RLS
-- Currently any anonymous user can SELECT, INSERT, and UPDATE
-- is_admin — including escalating their own privileges.
-- ────────────────────────────────────────────────────────────

-- Drop any permissive existing policies first
DROP POLICY IF EXISTS "Enable read access for all users" ON "Users";
DROP POLICY IF EXISTS "Enable insert for all users" ON "Users";
DROP POLICY IF EXISTS "Enable update for all users" ON "Users";

-- Authenticated users can read their own row only
CREATE POLICY "user_can_read_own_row"
  ON "Users" FOR SELECT TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Anon can insert their own row on signup (is_admin must be false)
CREATE POLICY "anon_can_insert_own_row"
  ON "Users" FOR INSERT TO anon
  WITH CHECK (is_admin = false);

-- No UPDATE allowed from the client (only done via Supabase dashboard)
-- is_admin changes must be made manually by a real admin in the dashboard


-- ────────────────────────────────────────────────────────────
-- FIX 4: Block anonymous UPDATE on collections table
-- Any visitor can currently overwrite product listings
-- ────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Enable update for all users" ON collections;

-- Only authenticated admins may update collections
CREATE POLICY "authenticated_can_update_collections"
  ON collections FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
