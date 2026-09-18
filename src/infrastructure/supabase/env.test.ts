import { describe, expect, it, vi } from 'vitest';

vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://example.supabase.co');
vi.stubEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'publishable-key');
vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'service-role-key');
vi.stubEnv('ADMIN_EMAILS', 'juan@tudeclaracion.com, matias@tudeclaracion.com');

const { isAdminEmail } = await import('./env');

describe('isAdminEmail', () => {
  it('returns true for an email on the whitelist', () => {
    expect(isAdminEmail('juan@tudeclaracion.com')).toBe(true);
  });

  it('is case-insensitive', () => {
    expect(isAdminEmail('JUAN@tudeclaracion.com')).toBe(true);
  });

  it('ignores surrounding whitespace from the whitelist entry', () => {
    expect(isAdminEmail('matias@tudeclaracion.com')).toBe(true);
  });

  it('returns false for an email not on the whitelist', () => {
    expect(isAdminEmail('contador@tudeclaracion.com')).toBe(false);
  });

  it('returns false for null or undefined', () => {
    expect(isAdminEmail(null)).toBe(false);
    expect(isAdminEmail(undefined)).toBe(false);
  });
});
