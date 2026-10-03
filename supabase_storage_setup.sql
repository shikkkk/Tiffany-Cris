-- ====================================================================
-- SUPABASE STORAGE SETUP: Collections Bucket & RLS Policies
-- Run this in your Supabase Project -> SQL Editor
-- ====================================================================

-- 1. Create the public 'collections' bucket if it doesn't already exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'collections',
  'collections',
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];

-- 2. Drop any conflicting existing policies for 'collections' bucket
DROP POLICY IF EXISTS "Public can view collections images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admins can upload collections images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admins can update collections images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admins can delete collections images" ON storage.objects;

-- 3. Allow EVERYONE (public visitors) to view/read images
CREATE POLICY "Public can view collections images"
ON storage.objects FOR SELECT
USING (bucket_id = 'collections');

-- 4. Allow AUTHENTICATED users (admins) to upload images
CREATE POLICY "Authenticated admins can upload collections images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'collections');

-- 5. Allow AUTHENTICATED users (admins) to update images
CREATE POLICY "Authenticated admins can update collections images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'collections');

-- 6. Allow AUTHENTICATED users (admins) to delete images
CREATE POLICY "Authenticated admins can delete collections images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'collections');
