/**
 * Configuración centralizada y validada de variables de entorno de Supabase.
 *
 * El acceso a las públicas DEBE ser estático (`process.env.NEXT_PUBLIC_*`) —
 * Next.js reemplaza estos literales en build time para el bundle de browser.
 * Un lookup dinámico (`process.env[name]`) resuelve `undefined` en cliente.
 *
 * `ADMIN_EMAILS` y `SUPABASE_SERVICE_ROLE_KEY` son server-only — nunca se
 * importan desde un Client Component (ver ADR-0001 y ADR-0002).
 */

function requireEnv(name: string, value: string | undefined): string {
  if (!value || value.trim() === '') {
    throw new Error(
      `Falta la variable de entorno requerida: ${name}. Copiá .env.example a .env y completá las credenciales.`,
    );
  }
  return value.trim();
}

export const supabaseUrl = requireEnv(
  'NEXT_PUBLIC_SUPABASE_URL',
  process.env.NEXT_PUBLIC_SUPABASE_URL,
);

export const supabasePublishableKey = requireEnv(
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

export const supabaseServiceRoleKey = requireEnv(
  'SUPABASE_SERVICE_ROLE_KEY',
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

/**
 * Whitelist de admins (ADR-0001). Sin roles en DB — el email autenticado de
 * Supabase Auth se valida contra esta lista en cada server action y en el
 * guard del layout raíz.
 */
export const adminEmails = requireEnv('ADMIN_EMAILS', process.env.ADMIN_EMAILS)
  .split(',')
  .map(email => email.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) {
    return false;
  }
  return adminEmails.includes(email.trim().toLowerCase());
}
