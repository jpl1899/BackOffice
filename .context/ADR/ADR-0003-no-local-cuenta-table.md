# ADR-0003 — Sin tabla local cuenta/perfil: empresa.cuenta_id es directamente el user id de Supabase Auth

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** Juan (product owner), Matías
- **Tags:** data-model, supabase, cross-cutting-invariant
- **Supersedes:** —
- **Superseded by:** —

---

## Context

BackOffice necesita listar/buscar contadores, ver sus empresas y declaraciones, y poder bloquear/desbloquear su acceso. tuDeclaracion nunca creó una tabla `cuenta` o `perfil` propia — `empresa.cuenta_id` ya apunta directamente al id de usuario de Supabase Auth.

## Decision

BackOffice no crea una tabla local `cuenta`/`perfil`. Listar y buscar contadores se hace contra la **Supabase Admin API**, no contra una tabla propia. Bloquear/desbloquear usa el soporte nativo de ban de Supabase Auth (`auth.admin.updateUserById(id, { ban_duration })`) en vez de una columna booleana `bloqueado` inventada. Ver las empresas/declaraciones de un contador es una query directa a `empresa` filtrada por `cuenta_id`.

## Consequences

- **Positive:** cero schema nuevo, cero tabla que mantener sincronizada con Supabase Auth (el problema clásico de tener dos fuentes de verdad para lo mismo). Se reusa un mecanismo (ban) que Supabase ya probó y mantiene.
- **Negative / trade-offs:** cualquier búsqueda/filtro sobre usuarios que Supabase Admin API no soporte nativamente (ej. joins complejos, filtros por atributos de negocio que no viven en Auth) requiere traer todo y filtrar en memoria, o hacer dos llamadas (Admin API + query a `empresa`) y cruzar en código. No hay índice de base de datos sobre atributos de Auth.
- **Neutral / follow-ups:** si el volumen de contadores crece mucho, la performance de listar/buscar vía Admin API debería revisarse — hoy no es un problema con el volumen esperado.

## Alternatives considered

- **Tabla `cuenta` espejo de `auth.users`** — rechazada: introduce el problema de sincronización (webhook o trigger para mantenerla al día) para no ganar nada que Supabase Admin API no dé ya.
- **Columna `bloqueado boolean` en una tabla propia** — rechazada: Supabase Auth ya modela ban nativamente (`banned_until`); duplicar ese estado en otro lado es una fuente de verdad extra que puede desincronizarse (ej. alguien desbloquea en Auth pero no en la columna propia).

## References

- `.context/Project Foundation.md` § Architecture → User management
