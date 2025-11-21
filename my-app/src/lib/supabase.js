import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    `Supabase environment variables are not set. 
     Please check your .env file and make sure REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY are defined.`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);