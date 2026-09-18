# ADR-0004 — Audit log sin RLS para `authenticated`, solo accesible vía service-role

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** Juan (product owner), Matías
- **Tags:** data-model, security, audit, supabase
- **Supersedes:** —
- **Superseded by:** —

---

## Context

Hoy no hay forma de saber quién bloqueó una cuenta o editó un catálogo, ni cuándo. Se necesita trazabilidad para las dos acciones sensibles del MVP1: bloqueo/desbloqueo de cuentas y escrituras en catálogos. No se busca loguear toda navegación o lectura del backoffice, solo estas dos.

## Decision

Nueva tabla `public.backoffice_audit_log` (`actor_email`, `accion`, `entidad`, `entidad_id`, `detalle jsonb`, `created_at`). **Sin políticas RLS que otorguen acceso a `authenticated`** — la tabla solo se escribe y lee vía el cliente service-role desde server actions del backoffice, mismo trust boundary que las escrituras de catálogos (ver ADR-0002). Cada server action que bloquea/desbloquea una cuenta o escribe un catálogo inserta exactamente una fila acá.

## Consequences

- **Positive:** trazabilidad completa de las dos acciones que más importan (quién, qué, cuándo) sin exponer la tabla a nadie fuera del backoffice. Consistente con el mismo modelo de confianza que ya se usa para las escrituras de catálogos.
- **Negative / trade-offs:** al no tener RLS para `authenticated`, no hay forma de que un futuro admin consulte el audit log directamente desde SQL con su propia sesión — todo acceso de lectura también tiene que pasar por una server action del backoffice (o por el dashboard de Supabase con credenciales de servicio).
- **Neutral / follow-ups:** logging genérico de toda acción/navegación del backoffice queda explícitamente fuera de alcance (ver `Project Foundation.md` § Audit log) — si se necesita en el futuro, es una decisión nueva, no una extensión automática de esta tabla.

## Alternatives considered

- **RLS que permite `select` a cualquier usuario de la whitelist directamente sobre la tabla** — rechazada: reintroduciría el mismo problema de ADR-0001/ADR-0002 (no hay forma de que RLS conozca la whitelist sin duplicarla en la DB).
- **Loguear todas las lecturas/navegación, no solo escrituras sensibles** — rechazada: el diseño original la descarta explícitamente por ser ruido sin valor de auditoría claro para un backoffice de dos personas.

## References

- `.context/Project Foundation.md` § Architecture → Audit log
- ADR-0002 (mismo trust boundary: service-role client)
