# Flujo de trabajo agentic-dev — orden de fases

**Fecha**: 2026-09-17
**Fuente**: `tuDeclaracion/.claude/skills/REGISTRY.md` (campo `phase` de cada skill) y sus `SKILL.md`.

Este es el pipeline que define "qué hacer y en qué orden" en el boilerplate agentic-dev que usa tuDeclaracion. Cada fase la ejecuta un skill de Claude Code (`/nombre-skill`).

| Orden | Fase | Skill | Qué produce | Estado en BackOffice |
|---|---|---|---|---|
| 1 | Foundation | `/project-foundation` | Constitution (modelo de negocio + contexto de mercado) → PRD → SRS → ADRs, todo en `.context/` | ✅ Hecho — condensado en `Project Foundation.md`, no en el árbol completo `.context/PRD/`, `.context/SRS/` de tuDeclaracion |
| 2 | Design system | `/design-system` | `DESIGN.md` con tokens visuales, antes de tocar el frontend | ⬜ Pendiente (opcional, podríamos heredar el diseño de tuDeclaracion) |
| 3 | Bootstrap | `/project-bootstrap` | Scaffolding técnico real: backend (schema DB, tipos, server actions, manejo de errores), frontend (componentes de diseño) | 🟡 En curso — ya está el esqueleto de carpetas, falta el código/config real (Next.js, Supabase, package.json) |
| 4 | Backlog | `/product-management` | Épicas + historias en Jira derivadas del PRD/SRS | ⬜ Pendiente — necesita `.agents/project.yaml` configurado |
| 5 | Sprint loop | `/sprint-development` (usa `/git-flow-master` para ramas/PRs, `/unit-testing` para TDD, `/vercel-cli` para deploy) | Ciclo por historia: plan → implementar → code review → deploy staging → (gate) producción | ⬜ Pendiente |
| 6 | Testability guide | `/testability-guide` | Página pública `/qa` ("Software Testability Guide") + artefacto de credenciales (DB/API/UI testing) | ⬜ Pendiente — alto valor de portfolio dado el perfil QA |

## Notas

- El skill `/agentic-dev-onboard` no es una fase del pipeline — es la guía de onboarding para alguien nuevo en el repo (reglas críticas, mapa de contexto, checklist de setup).
- `/acli` (Jira/Confluence CLI) es transversal, lo usan `/product-management` y `/sprint-development`, no es una fase propia.
- El repo también documenta una metodología de testing paralela (`docs/methodology/IQL-methodology.md` — Integrated Quality Lifecycle) con fases early/mid/late-game, separada de este pipeline de desarrollo. Relevante para cuando lleguemos a testing, no ahora.
