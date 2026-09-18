import type { Database } from '@/types/supabase';
import { createBrowserClient } from '@supabase/ssr';
import { supabasePublishableKey, supabaseUrl } from './env';

/**
 * Cliente Supabase para Client Components ('use client'). Las cookies de
 * sesión las maneja automáticamente el storage por defecto de @supabase/ssr.
 * Scoped a RLS — nunca bypasea políticas (para eso existe service.ts).
 */
export function createClient() {
  return createBrowserClient<Database>(supabaseUrl, supabasePublishableKey);
}
