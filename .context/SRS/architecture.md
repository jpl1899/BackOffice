# Architecture

**Source:** `../Project Foundation.md` § Architecture

## Access control

No new concept of "role" is introduced. An admin is any authenticated Supabase user whose email is in a server-side whitelist (`ADMIN_EMAILS` env var, comma-separated — added to `.env` / `.env.example` per Critical Rule #1).

`/backoffice/*` is a new route group. A server-side check in `src/app/backoffice/layout.tsx` calls `supabase.auth.getUser()` and redirects to `/` if the email isn't in the whitelist. This mirrors the existing `middleware.ts` pattern but is intentionally a layout guard, not a `middleware.ts` matcher entry — keeps the admin-gating logic colocated with the admin routes instead of growing the shared middleware's route lists.

**All backoffice writes go through server actions using the Supabase service-role client**, never the RLS-scoped client. Reasoning: the two catalog tables' existing RLS policies deliberately have no insert/update/delete policies for anyone — there is no per-row concept of "admin" for RLS to check against, since admin status lives in an env var, not in the database. Re-deriving admin identity into the DB just to write RLS policies would add a new source of truth for something that's already answered server-side. Every server action re-validates the caller's email against the whitelist before touching the service-role client, so the RLS bypass is never reachable from an unauthorized session.

## Usage analytics

Sentry and PostHog are added as dependencies to the main app (not backoffice-specific) to capture errors and usage events respectively. Event payloads only carry behavioral data (page, action, error) — never declaración/asiento contents — so no fiscal data leaves Supabase.

## Proactive support alerts

Computed on read, not stored. The backoffice alerts screen queries:

- `declaracion` rows with `estado = 'con_errores'`, joined to `empresa` for context, filtered by how long they've been in that state.
- Accounts with repeated Sentry errors in a recent window (via Sentry's API, not duplicated into Supabase).

No new table for alerts in MVP1 — if the query becomes a bottleneck it can be revisited then, not preemptively.

## User management

There is no local `cuenta`/`perfil` table — `empresa.cuenta_id` **is** the Supabase Auth user id directly. So:

- Listing/searching accountants reads from Supabase Auth (Admin API), not a local table.
- Manual block/unblock uses Supabase Auth's native ban support (`auth.admin.updateUserById(id, { ban_duration })`) — no new schema for a boolean flag that Supabase already models.
- "View their empresas/declaraciones" is a straightforward query on `empresa` filtered by `cuenta_id`, plus `declaracion` per empresa.

## Declaración support view

Read-only. Given an `empresa` + `periodo`, shows the `declaracion` row, its `estado`, and its linked `asiento` rows. No edit affordance — if a declaración is broken, the fix happens in the accountant's own data (their import), not by an admin editing state by hand.

## Catalog configuration

Simple CRUD screens for `codigo_linea_1376` and `codigo_iva`: list, add row, edit row, delete row, via server actions using the service-role client (see Access control). Built as a reusable pattern (one generic catalog-table component/action, parameterized by table name and columns) so that when the next 3 declaración types land, each new global catalog they need reuses the same screen shape rather than a bespoke one-off.

Explicitly **not** in scope: no schema/rule editor that lets admins define field types or digit-length limits without a migration. Structural changes to a catalog (new columns, new validation) still ship as code + migration, same as today. Only the *values* inside an existing catalog shape are backoffice-editable.

## Audit log

New table, `public.backoffice_audit_log`:

```sql
create table public.backoffice_audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_email text not null,
  accion text not null,        -- e.g. 'cuenta.bloquear', 'catalogo.editar'
  entidad text not null,       -- e.g. 'cuenta', 'codigo_linea_1376'
  entidad_id text not null,
  detalle jsonb,
  created_at timestamptz not null default now()
);
```

No RLS policies granting access to `authenticated` — this table is only ever written/read via the service-role client from backoffice server actions, same trust boundary as the catalog writes. Every server action that blocks/unblocks an account or writes to a catalog inserts one row here. Generic action logging (every backoffice read or navigation) is explicitly out of scope — only the two sensitive action types above.
