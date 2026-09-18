-- Audit log del backoffice — ver ADR-0004 (.context/ADR/ADR-0004-audit-log-no-rls-service-role-only.md)
-- Solo dos tipos de acción se loguean: bloqueo/desbloqueo de cuenta y escritura de catálogo.
-- Sin políticas RLS para `authenticated` a propósito: solo se lee/escribe vía service-role
-- client desde server actions del backoffice (mismo trust boundary que ADR-0002).

create table public.backoffice_audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_email text not null,
  accion text not null,        -- e.g. 'cuenta.bloquear', 'catalogo.editar'
  entidad text not null,       -- e.g. 'cuenta', 'codigo_linea_1376'
  entidad_id text not null,
  detalle jsonb,
  created_at timestamptz not null default now()
);

alter table public.backoffice_audit_log enable row level security;
-- Intencionalmente sin policies: ningún rol `authenticated` tiene acceso.
-- El service-role client bypasea RLS por diseño (ver ADR-0002).
