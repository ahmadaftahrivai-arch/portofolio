import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

// Null when env vars aren't set yet, so callers can render an honest
// "not connected" state instead of crashing or faking data.
export const supabase = url && anonKey ? createClient(url, anonKey) : null
