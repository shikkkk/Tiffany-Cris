CREATE TABLE IF NOT EXISTS messages (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text        NOT NULL,
  email      text        NOT NULL,
  phone      text,
  subject    text        NOT NULL,
  message    text        NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_can_insert_messages"
  ON messages FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "authenticated_can_read_messages"
  ON messages FOR SELECT TO authenticated
  USING (true);

ALTER TABLE "Users"
  ADD CONSTRAINT users_email_unique UNIQUE (email);

DROP POLICY IF EXISTS "Enable read access for all users" ON "Users";
DROP POLICY IF EXISTS "Enable insert for all users" ON "Users";
DROP POLICY IF EXISTS "Enable update for all users" ON "Users";

CREATE POLICY "user_can_read_own_row"
  ON "Users" FOR SELECT TO authenticated
  USING (email = auth.jwt() ->> 'email');

CREATE POLICY "anon_can_insert_own_row"
  ON "Users" FOR INSERT TO anon
  WITH CHECK (is_admin = false);

DROP POLICY IF EXISTS "Enable update for all users" ON collections;

CREATE POLICY "authenticated_can_update_collections"
  ON collections FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
