# MVP1 Scope

**Source:** `../Project Foundation.md` § Scope (MVP1)

| Area | Scope |
|---|---|
| Access control | Two admins (Juan, Matías), identified by an email whitelist — no roles |
| Usage analytics | Sentry (errors) + PostHog (product usage), instrumented in the main app |
| Proactive support signal | Passive alert list inside the backoffice (not push) |
| User management | List/search accountants, view their empresas + declaraciones, manual block/unblock |
| Declaración support view | Read-only lookup of one declaración for diagnosing a support case |
| Catalog configuration | CRUD on existing global catalogs (`codigo_linea_1376`, `codigo_iva`), reusable pattern for catalogs the next 3 forms will need |
| Audit log | Sensitive actions only: account block/unblock, catalog writes |

See `future-roadmap.md` for what's explicitly parked out of this MVP.
