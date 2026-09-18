# User Personas

**Source:** `../Project Foundation.md` § Audience, § Access control

BackOffice has exactly two personas, both admins, both with identical permissions. There is no role hierarchy and no external (non-admin) user — this is an internal tool.

## Juan

Product owner of tuDeclaracion and co-admin of BackOffice. Identified as an authenticated Supabase user whose email is in the server-side `ADMIN_EMAILS` whitelist.

## Matías

Co-admin of BackOffice, same access level as Juan. Identified the same way (email in `ADMIN_EMAILS`).

## Non-goal: role differentiation

Granular RBAC (operador/revisor/supervisor roles) is explicitly parked — see `future-roadmap.md`. Any user story for BackOffice resolves its `As a …` persona to **Juan** or **Matías** interchangeably; never to a generic "the admin" or "the user".
