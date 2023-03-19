import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

const isServer = typeof window === 'undefined';

export const supabase = isServer
  ? createClient(supabaseUrl, supabaseServiceKey)
  : undefined;
