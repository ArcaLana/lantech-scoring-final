import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Graceful fallback to prevent crash during build time if env missing
  if (typeof window === 'undefined') {
    console.warn('Supabase env vars missing on server');
  } else {
    throw new Error('Missing Supabase environment variables');
  }
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
