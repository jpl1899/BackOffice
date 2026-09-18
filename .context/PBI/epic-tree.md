# Epic Tree — BackOffice (BAC)

**Read-only cache.** Source of truth is Jira (`https://lk-tudeclaracion.atlassian.net`, project `BAC`). Hand-written here because this repo has no `jira:sync-issues` script — regenerate manually if the backlog changes significantly.

Seeded 2026-09-18 from `.context/Project Foundation.md` (Workflow A — initial backlog seed).

| Epic | Key | Stories |
|---|---|---|
| Access Control | [BAC-1](https://lk-tudeclaracion.atlassian.net/browse/BAC-1) | [BAC-7](https://lk-tudeclaracion.atlassian.net/browse/BAC-7) Admin Access \| Restrict backoffice routes to whitelisted admins |
| Usage Analytics | [BAC-2](https://lk-tudeclaracion.atlassian.net/browse/BAC-2) | [BAC-8](https://lk-tudeclaracion.atlassian.net/browse/BAC-8) Error Tracking \| Capture app errors via Sentry · [BAC-9](https://lk-tudeclaracion.atlassian.net/browse/BAC-9) Product Analytics \| Capture usage events via PostHog |
| Support Alerts | [BAC-3](https://lk-tudeclaracion.atlassian.net/browse/BAC-3) | [BAC-10](https://lk-tudeclaracion.atlassian.net/browse/BAC-10) Alerts \| List accounts with unresolved declaración errors |
| User Management | [BAC-4](https://lk-tudeclaracion.atlassian.net/browse/BAC-4) | [BAC-11](https://lk-tudeclaracion.atlassian.net/browse/BAC-11) Accounts \| List and search accountants · [BAC-12](https://lk-tudeclaracion.atlassian.net/browse/BAC-12) Accounts \| Block and unblock an account |
| Declaración Support View | [BAC-5](https://lk-tudeclaracion.atlassian.net/browse/BAC-5) | [BAC-13](https://lk-tudeclaracion.atlassian.net/browse/BAC-13) Declaración Lookup \| View a declaración read-only for support |
| Catalog Configuration | [BAC-6](https://lk-tudeclaracion.atlassian.net/browse/BAC-6) | [BAC-14](https://lk-tudeclaracion.atlassian.net/browse/BAC-14) Catalog CRUD \| Manage codigo_linea_1376 and codigo_iva entries |

## Notes

- All issue types are native Jira Software (`Epic` / `Historia`) — no custom fields were provisioned in this workspace, so AC lives inside each story's `description` as a fenced Gherkin block, plus a `Persona:` and `Fuente:` line pointing back to `.context/SRS/architecture.md` / `.context/SRS/non-functional.md`.
- `Access Control` (BAC-7) documents behavior already scaffolded during `project-bootstrap` (admin whitelist guard) — kept as a story so it has explicit AC and a test target, not because it's still unbuilt.
- Audit log is not a separate epic — its AC is folded into BAC-12 (Accounts | Block and unblock) and BAC-14 (Catalog CRUD), the two stories that actually write to it.
- Next product-management workflows to run on this backlog: **D** (story refinement / INVEST) before any story starts development, and **H** (sprint sequencing) once dependencies across stories are worth mapping.
