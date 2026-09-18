# Estructura de carpetas — BackOffice

**Fecha**: 2026-09-17
**Referencia**: estructura calcada de `tuDeclaracion` (proyecto principal), adaptada al alcance del MVP1 descripto en `Project Foundation.md`.

Orden de dependencia: de abajo hacia arriba — primero lo que no depende de nada, al final lo que usa todo lo anterior.

| # | Carpeta | Qué es | Para qué sirve |
|---|---|---|---|
| 1 | `src/infrastructure/supabase/` | Capa de conexión a Supabase (`client.ts` para browser, `server.ts` para RSC/server actions, `env.ts` para las env vars validadas) | Todo lo demás depende de esto para hablar con la base. Separarlo de `src/lib` es la misma idea de tuDeclaracion: infraestructura ≠ utilidades genéricas |
| 2 | `src/lib/` | Utilidades genéricas sin estado ni dependencia de negocio (`utils.ts`, validaciones) | Funciones puras reusables en toda la app (formateo, validación de inputs, etc.) |
| 3 | `src/types/` | Tipos TS compartidos (ej. tipos generados de Supabase, DTOs) | Un solo lugar de verdad para los shapes de datos, evita duplicar interfaces en cada módulo |
| 4 | `src/modules/` | Lógica de dominio, un subfolder por capacidad de negocio | Acá vive el "qué hace" el backoffice, separado de "cómo se ve" (eso es `app/`) |
| 4a | `src/modules/catalogos/` | Server actions + queries para CRUD de `codigo_linea_1376` / `codigo_iva` | El patrón genérico reusable que pide el diseño (una function parametrizada por tabla) |
| 4b | `src/modules/usuarios/` | Wrappers sobre Supabase Admin API (listar, buscar, block/unblock) | Nadie más debería llamar `auth.admin.*` directo — todo pasa por acá |
| 4c | `src/modules/declaraciones/` | Queries read-only de `declaracion` + `asiento` por empresa/período | Vista de soporte, sin mutaciones |
| 4d | `src/modules/alertas/` | Queries de `estado = 'con_errores'` + integración API de Sentry | Alertas computadas on-read, sin tabla propia |
| 4e | `src/modules/auditoria/` | Helper único para insertar en `backoffice_audit_log` | Un solo punto de escritura evita que alguien loguee distinto en cada acción |
| 5 | `src/components/ui/` | Primitivos de UI estilo shadcn (Button, Card, Dialog, Badge...) | Igual que tuDeclaracion — piezas visuales sin lógica de negocio |
| 5 | `src/components/brand/` | Logo y assets de marca | Identidad visual reusada en headers/login |
| 6 | `src/app/login/` | Página de login (reusa Supabase Auth, mismo proyecto que tuDeclaracion) | Punto de entrada — sin esto nadie llega al whitelist check |
| 6 | `src/app/usuarios/` | Pantalla de gestión de cuentas | Consume `modules/usuarios` |
| 6 | `src/app/declaraciones/` | Pantalla de lookup de declaraciones | Consume `modules/declaraciones` |
| 6 | `src/app/catalogos/` | Pantallas CRUD de catálogos | Consume `modules/catalogos` |
| 6 | `src/app/alertas/` | Dashboard de alertas | Consume `modules/alertas` |
| 7 | `supabase/migrations/` | SQL de la tabla `backoffice_audit_log` (y futuras) | Igual convención que tuDeclaracion: schema versionado, no editado a mano en prod |
| 8 | `docs/architectures/` y `docs/workflows/` | Documentación técnica del proyecto | Esto es lo que más pesa para portfolio — mostrás que documentás decisiones, no solo que "funciona" |

## Nota sobre rutas

`Project Foundation.md` (el diseño original) asumía que el backoffice viviría *dentro* del repo de tuDeclaracion como route group (`src/app/backoffice/*`). Como este es un repo separado, las rutas van **planas** en `src/app/` (`src/app/usuarios`, no `src/app/backoffice/usuarios`) — toda la app ya es el backoffice, no hace falta el prefijo.
