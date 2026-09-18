import type { Database } from '@/types/supabase';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { supabaseServiceRoleKey, supabaseUrl } from './env';

/**
 * Cliente Supabase con service-role key: BYPASEA todas las políticas RLS
 * (ADR-0002). Uso exclusivo: server actions del backoffice, y SOLO después
 * de que la server action ya validó `isAdminEmail()` del caller.
 *
 * Nunca importar este módulo desde un Client Component ni desde código que
 * corra en el browser — la service-role key es un secreto server-only.
 */
export function createServiceRoleClient() {
  return createSupabaseClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
