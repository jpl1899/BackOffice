# `.context/ADR/` — Architecture Decision Records

Registro append-only de decisiones arquitectónicas importantes y difíciles de revertir. Un archivo por decisión. Nunca se borran — se **superseden** por una ADR nueva que enlaza hacia atrás, así la historia de "por qué el sistema es como es" queda intacta.

Mismo protocolo que `tuDeclaracion/.context/ADR/` — ver ese README para el detalle completo del ciclo de vida y las dos puertas (¿es arquitectónica? ¿es difícil de revertir?).

## Cómo escribir una

1. Copiar [`ADR-NNNN-template.md`](./ADR-NNNN-template.md) a `ADR-<NNNN>-<slug>.md`.
2. Completar cada sección. Si la decisión sigue abierta, `Status: Proposed`.
3. Agregar una fila al Índice de abajo.

## Índice

| ADR | Título | Status | Supersedes | Superseded by |
| --- | ------ | ------ | ---------- | ------------- |
| [ADR-0001](./ADR-0001-admin-access-via-email-whitelist.md) | Acceso admin vía whitelist de emails, sin tabla de roles | Accepted | — | — |
| [ADR-0002](./ADR-0002-service-role-client-bypasses-rls.md) | Todas las escrituras del backoffice usan el cliente service-role, bypaseando RLS | Accepted | — | — |
| [ADR-0003](./ADR-0003-no-local-cuenta-table.md) | Sin tabla local cuenta/perfil: empresa.cuenta_id es el user id de Supabase Auth | Accepted | — | — |
| [ADR-0004](./ADR-0004-audit-log-no-rls-service-role-only.md) | Audit log sin RLS para authenticated, solo accesible vía service-role | Accepted | — | — |

> Mantener esta tabla sincronizada cada vez que se agregue una ADR o cambie su status.
