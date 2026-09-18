import type { Database } from '@/types/supabase';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { supabasePublishableKey, supabaseUrl } from './env';

/**
 * Cliente Supabase para Server Components y Route Handlers, scoped a RLS.
 * Se usa para LEER la sesión del admin logueado (auth.getUser()) — nunca
 * para escribir en tablas del backoffice, eso es service.ts (ADR-0002).
 *
 * `cookies()` es async en Next.js 15 — siempre `await createClient()`.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        }
        catch {
          // Esperado en render de Server Component (cookies read-only ahí);
          // middleware.ts refresca la sesión en cada request.
        }
      },
    },
  });
}
