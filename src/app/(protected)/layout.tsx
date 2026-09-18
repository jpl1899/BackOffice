import { redirect } from 'next/navigation';
import { Logo } from '@/components/brand/logo';
import { isAdminEmail } from '@/infrastructure/supabase/env';
import { createClient } from '@/infrastructure/supabase/server';

const NAV_ITEMS = [
  { href: '/usuarios', label: 'Usuarios' },
  { href: '/declaraciones', label: 'Declaraciones' },
  { href: '/catalogos', label: 'Catálogos' },
  { href: '/alertas', label: 'Alertas' },
];

// El guard de whitelist vive ACÁ, no en middleware.ts (ADR-0001) — colocado
// junto a las rutas de admin en vez de crecer la lista de rutas del
// middleware compartido. middleware.ts ya garantizó que hay un `user`
// autenticado antes de que este layout se renderice.
export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    redirect('/login?error=unauthorized');
  }

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 flex-col gap-1 bg-sidebar p-4 text-sidebar-foreground">
        <Logo className="mb-6 block text-sm" />
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-sm px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-white/5 hover:text-sidebar-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <div className="flex-1 bg-background p-8">{children}</div>
    </div>
  );
}
