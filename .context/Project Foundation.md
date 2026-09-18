# Backoffice MVP1 — Design

**Status**: Approved (design phase) — pending implementation plan
**Date**: 2026-09-16
**Audience**: Juan (product owner) and Matías — the two admins this backoffice is built for

## Problem

tuDeclaracion has no internal admin surface. Two concrete gaps exist today:

- `codigo_linea_1376` and `codigo_iva` are global reference catalogs with RLS policies that intentionally allow only `select` for authenticated users — the migration for `codigo_linea_1376` states maintenance "lo hará el backoffice (fuera de MVP 2), no la app." Today, changing either catalog requires a manual DB edit.
- There is no way to see how accountants actually use the app, diagnose a stuck user, or manually suspend an account, short of querying the database directly.

## Non-goals (parked, not part of this design)

These came up during scoping and are real future needs, but depend on decisions or subsystems that don't exist yet. Recorded here so they aren't lost, not designed further:

- **Billing/subscriptions**: no payment integration exists. Open questions parked for that future project: cut off access immediately on missed payment vs. keep billing until explicit cancellation (Netflix-style); device/session limit per account (anti-sharing); number of `empresa` allowed per plan tier; **price changes require dual sign-off (Juan + Matías)** before taking effect.
- **Granular RBAC** (operador/revisor/supervisor roles): unnecessary with two admins who both need full access. Revisit if staff is ever hired.
- A staff-driven review/approval workflow for declaraciones (pending → in review → approved), and a client-facing document upload/validation flow: neither matches how tuDeclaracion works today. `declaracion.estado` (`abierta` / `generada` / `con_errores`) is derived by the app from processing the accountant's own TXT import — no tuDeclaracion staff reviews or approves another user's declaración. The product's core value proposition is self-service with no human in the loop (`business-model.md`, Customer Relationships). Building a staff-approval workflow would be designing for a different business model than the one that exists.

## Scope (MVP1)

| Area | Scope |
|---|---|
| Access control | Two admins (Juan, Matías), identified by an email whitelist — no roles |
| Usage analytics | Sentry (errors) + PostHog (product usage), instrumented in the main app |
| Proactive support signal | Passive alert list inside the backoffice (not push) |
| User management | List/search accountants, view their empresas + declaraciones, manual block/unblock |
| Declaración support view | Read-only lookup of one declaración for diagnosing a support case |
| Catalog configuration | CRUD on existing global catalogs (`codigo_linea_1376`, `codigo_iva`), reusable pattern for catalogs the next 3 forms will need |
| Audit log | Sensitive actions only: account block/unblock, catalog writes |

## Architecture

### Access control

No new concept of "role" is introduced. An admin is any authenticated Supabase user whose email is in a server-side whitelist (`ADMIN_EMAILS` env var, comma-separated — added to `.env` / `.env.example` per Critical Rule #1).

`/backoffice/*` is a new route group. A server-side check in `src/app/backoffice/layout.tsx` calls `supabase.auth.getUser()` and redirects to `/` if the email isn't in the whitelist. This mirrors the existing `middleware.ts` pattern but is intentionally a layout guard, not a `middleware.ts` matcher entry — keeps the admin-gating logic colocated with the admin routes instead of growing the shared middleware's route lists.

**All backoffice writes go through server actions using the Supabase **service-role** client**, never the RLS-scoped client. Reasoning: the two catalog tables' existing RLS policies deliberately have no insert/update/delete policies for anyone (see Problem section) — there is no per-row concept of "admin" for RLS to check against, since admin status lives in an env var, not in the database. Re-deriving admin identity into the DB just to write RLS policies would add a new source of truth for something that's already answered server-side. Every server action re-validates the caller's email against the whitelist before touching the service-role client, so the RLS bypass is never reachable from an unauthorized session.

### Usage analytics

Sentry and PostHog are added as dependencies to the main app (not backoffice-specific) to capture errors and usage events respectively. Event payloads only carry behavioral data (page, action, error) — never declaración/asiento contents — so no fiscal data leaves Supabase.

### Proactive support alerts

Computed on read, not stored. The backoffice alerts screen queries:

- `declaracion` rows with `estado = 'con_errores'`, joined to `empresa` for context, filtered by how long they've been in that state.
- Accounts with repeated Sentry errors in a recent window (via Sentry's API, not duplicated into Supabase).

No new table for alerts in MVP1 — if the query becomes a bottleneck it can be revisited then, not preemptively.

### User management

There is no local `cuenta`/`perfil` table — `empresa.cuenta_id` **is** the Supabase Auth user id directly. So:

- Listing/searching accountants reads from Supabase Auth (Admin API), not a local table.
- Manual block/unblock uses Supabase Auth's native ban support (`auth.admin.updateUserById(id, { ban_duration })`) — no new schema for a boolean flag that Supabase already models.
- "View their empresas/declaraciones" is a straightforward query on `empresa` filtered by `cuenta_id`, plus `declaracion` per empresa.

### Declaración support view

Read-only. Given an `empresa` + `periodo`, shows the `declaracion` row, its `estado`, and its linked `asiento` rows. No edit affordance — if a declaración is broken, the fix happens in the accountant's own data (their import), not by an admin editing state by hand.

### Catalog configuration

Simple CRUD screens for `codigo_linea_1376` and `codigo_iva`: list, add row, edit row, delete row, via server actions using the service-role client (see Access control). Built as a reusable pattern (one generic catalog-table component/action, parameterized by table name and columns) so that when the next 3 declaración types land, each new global catalog they need reuses the same screen shape rather than a bespoke one-off.

Explicitly **not** in scope: no schema/rule editor that lets admins define field types or digit-length limits without a migration. Structural changes to a catalog (new columns, new validation) still ship as code + migration, same as today. Only the *values* inside an existing catalog shape are backoffice-editable.

### Audit log

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

## Testing

- Access control: an authenticated non-admin user hitting any `/backoffice/*` route directly (not via UI) must be redirected — this is the one behavior worth an explicit test given it's a security boundary.
- Catalog CRUD: add/edit/delete round-trips, plus confirming a write produces exactly one `backoffice_audit_log` row with the correct `actor_email`.
- User block/unblock: a banned user's existing session/new login attempt is rejected by Supabase Auth; unblocking restores access.
- Alerts query: a `con_errores` declaración appears in the list; one that recovers to `generada` drops off.

## Open items for the implementation plan (not this design)

- Exact PostHog/Sentry project setup and env vars.
- Whether `/backoffice` needs its own visual identity or reuses the existing app shell.
- Epic/story breakdown in Jira for `/product-management` to seed, since this spans multiple stories.
