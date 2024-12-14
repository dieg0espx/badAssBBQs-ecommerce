import { createClient } from '@supabase/supabase-js';

// Use the correct environment variable names from your .env file
const REACT_APP_SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL; // Matches your .env
const REACT_APP_SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY; // Matches your .env

if (!REACT_APP_SUPABASE_URL || !REACT_APP_SUPABASE_ANON_KEY) {
  console.error('Missing Supabase URL or anon key in environment variables');
}

const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY);

export default supabase;

