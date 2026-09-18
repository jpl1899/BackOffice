# ADR-0001 — Acceso admin vía whitelist de emails, sin tabla de roles

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** Juan (product owner), Matías
- **Tags:** authentication, authorization, cross-cutting-invariant
- **Supersedes:** —
- **Superseded by:** —

---

## Context

BackOffice necesita restringir el acceso a dos personas específicas (Juan y Matías), sin construir un sistema de roles cuando solo existen dos admins que necesitan el mismo nivel de acceso total. tuDeclaracion ya usa Supabase Auth para sus usuarios finales (contadores); BackOffice reutiliza el mismo proyecto de Supabase, no un sistema de auth propio.

## Decision

Un admin es cualquier usuario autenticado de Supabase cuyo email está en una whitelist server-side (`ADMIN_EMAILS`, env var, comma-separated). No se introduce ningún concepto de "rol" en la base de datos. Un guard a nivel de layout (equivalente a `src/app/backoffice/layout.tsx` en el diseño original, adaptado a rutas planas por ser repo separado — ver nota de arquitectura de rutas) llama a `supabase.auth.getUser()` y redirige si el email no está en la whitelist.

## Consequences

- **Positive:** cero schema nuevo para modelar "admin". Agregar o quitar un admin es cambiar una env var y redeployar, no una migración.
- **Negative / trade-offs:** la lista de admins vive fuera de la base de datos — no es queryable desde SQL ni auditable vía la DB (solo vía el valor del env var en cada deploy). Si algún día se necesitan roles granulares (operador/revisor/supervisor), este modelo no escala y hay que migrar a una tabla real.
- **Neutral / follow-ups:** revisar este ADR si se contrata personal nuevo (ver Non-goals en `Project Foundation.md` — RBAC granular quedó parkeado explícitamente para ese escenario).

## Alternatives considered

- **Tabla `admin` o columna `rol` en una tabla de usuarios** — rechazada: con dos personas fijas y el mismo nivel de acceso, es complejidad sin beneficio. Se reconsideraría solo si se contrata staff.
- **Roles nativos de Supabase (Postgres roles / custom claims en el JWT)** — rechazada por ahora: agrega una capa de configuración en Supabase que no se justifica para un caso binario (admin / no-admin).

## References

- `.context/Project Foundation.md` § Architecture → Access control
- `.context/PRD/README.md` (Non-goals: RBAC granular parkeado)
