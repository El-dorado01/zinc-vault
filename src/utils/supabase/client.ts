// src/utils/supabase/client.ts
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client once
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: `sb-${new URL(supabaseUrl).hostname.split(".")[0]}-auth-token`,
  },
});

// Export the singleton client
export const getSupabaseClient = () => supabaseClient;
