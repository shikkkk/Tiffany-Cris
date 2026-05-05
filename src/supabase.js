import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || "https://ldvsjfgeornlispaefjf.supabase.co",
  import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdnNqZmdlb3JubGlzcGFlZmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4OTIwODAsImV4cCI6MjA5MzQ2ODA4MH0.IpT6BlTpWekM8nbk21gtkkkv_693wR8nRP6uuN32YTY"
);
