# `.context/SRS/` — Software Requirements (cómo se construye)

Salida de la Fase 2 (lado técnico) de `/project-foundation`. Convierte el PRD en el contrato técnico que consume `/project-bootstrap` para scaffoldear el código.

## Archivos esperados

| Archivo | Contenido |
| --- | --- |
| `architecture.md` | Access control, server actions + service-role client, modelo de datos (sin tabla local cuenta/perfil), audit log |
| `non-functional.md` | Requisitos de testing (ver § Testing del doc original) |

## Estado actual

Separado desde `../Project Foundation.md` § Architecture y § Testing. Ver `architecture.md`, `non-functional.md`.

## Notas

- No hardcodear schemas SQL acá — las migraciones reales van en `supabase/migrations/` (ver `documentos/estructura-de-carpetas.md`).
- Las decisiones arquitectónicas difíciles de revertir que aparezcan acá se promueven a `../ADR/`.
