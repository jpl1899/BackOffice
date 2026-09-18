# Future Roadmap (Non-goals)

**Source:** `../Project Foundation.md` § Non-goals (parked, not part of this design)

These came up during scoping and are real future needs, but depend on decisions or subsystems that don't exist yet. Recorded here so they aren't lost, not designed further.

## Billing / subscriptions

No payment integration exists. Open questions parked for that future project:

- Cut off access immediately on missed payment vs. keep billing until explicit cancellation (Netflix-style)
- Device/session limit per account (anti-sharing)
- Number of `empresa` allowed per plan tier
- **Price changes require dual sign-off (Juan + Matías)** before taking effect

## Granular RBAC

Operador/revisor/supervisor roles: unnecessary with two admins who both need full access. Revisit if staff is ever hired.

## Staff-driven review/approval workflow

A staff review/approval workflow for declaraciones (pending → in review → approved), and a client-facing document upload/validation flow: neither matches how tuDeclaracion works today. `declaracion.estado` (`abierta` / `generada` / `con_errores`) is derived by the app from processing the accountant's own TXT import — no tuDeclaracion staff reviews or approves another user's declaración. The product's core value proposition is self-service with no human in the loop (`business-model.md`, Customer Relationships). Building a staff-approval workflow would be designing for a different business model than the one that exists.
