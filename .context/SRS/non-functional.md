# Non-Functional Requirements

**Source:** `../Project Foundation.md` § Testing

- **Access control**: an authenticated non-admin user hitting any `/backoffice/*` route directly (not via UI) must be redirected — this is the one behavior worth an explicit test given it's a security boundary.
- **Catalog CRUD**: add/edit/delete round-trips, plus confirming a write produces exactly one `backoffice_audit_log` row with the correct `actor_email`.
- **User block/unblock**: a banned user's existing session/new login attempt is rejected by Supabase Auth; unblocking restores access.
- **Alerts query**: a `con_errores` declaración appears in the list; one that recovers to `generada` drops off.
