
import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
export const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

