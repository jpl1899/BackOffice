# ADR-0002 — Todas las escrituras del backoffice usan el cliente service-role, bypaseando RLS

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** Juan (product owner), Matías
- **Tags:** data-access, authorization, cross-cutting-invariant, supabase
- **Supersedes:** —
- **Superseded by:** —

---

## Context

Las tablas de catálogos globales (`codigo_linea_1376`, `codigo_iva`) tienen políticas RLS que deliberadamente solo permiten `select` a usuarios autenticados — la migración de `codigo_linea_1376` dice explícitamente que el mantenimiento "lo hará el backoffice (fuera de MVP 2), no la app". No existe hoy ningún concepto de "admin" a nivel de fila que RLS pueda chequear, porque el estatus de admin vive en una env var (`ADMIN_EMAILS`, ver ADR-0001), no en la base de datos.

## Decision

Todas las escrituras del backoffice pasan por server actions que usan el cliente **service-role** de Supabase (que bypasea RLS), nunca el cliente scoped a RLS. Cada server action revalida el email del caller contra la whitelist antes de tocar el cliente service-role — el bypass de RLS nunca es alcanzable desde una sesión no autorizada, porque el chequeo ocurre antes, en el servidor.

## Consequences

- **Positive:** no hace falta re-derivar la identidad de admin dentro de la base de datos solo para poder escribir políticas RLS de escritura. Una sola fuente de verdad (`ADMIN_EMAILS`) en vez de dos (env var + columna en DB) que podrían desincronizarse.
- **Negative / trade-offs:** el cliente service-role es peligroso por diseño — bypasea TODAS las políticas RLS de TODAS las tablas, no solo las de catálogos. Cualquier bug en la revalidación del whitelist dentro de una server action es una vulnerabilidad de escalada total, no acotada a una tabla. Exige disciplina: nunca usar el cliente service-role fuera de una server action que ya revalidó el whitelist.
- **Neutral / follow-ups:** si en el futuro se modela "admin" en la base de datos (ver ADR-0001, follow-up de RBAC), este ADR debería revisarse — en ese escenario sí tendría sentido escribir políticas RLS de escritura en vez de bypasearlas.

## Alternatives considered

- **Agregar políticas RLS de escritura basadas en una tabla `admin` o `perfil`** — rechazada: obligaría a crear esa tabla solo para que RLS tenga algo que chequear, duplicando la fuente de verdad que ya vive en `ADMIN_EMAILS` (ADR-0001).
- **Cliente RLS-scoped con service-role solo como fallback puntual** — rechazada: mezclar ambos clientes en el mismo flujo de escritura es más difícil de auditar que una regla simple ("todo backoffice-write = service-role + whitelist check").

## References

- `.context/Project Foundation.md` § Architecture → Access control, § Problem
- ADR-0001 (modelo de admin vía whitelist)
