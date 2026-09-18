# `.context/` — Project Memory the AI Reads

Espejo de la estructura de `tuDeclaracion/.context/`, adaptado al alcance de BackOffice. Este directorio es lo que hace que una sesión de IA nueva sea productiva desde el día uno.

## Estructura

```
.context/
├── README.md                  Este archivo — índice
├── Project Foundation.md      Documento consolidado de Fase 1 (Constitution + PRD + SRS en un solo archivo)
├── business/                  Constitution — por qué existe el producto (aún sin separar de Project Foundation.md)
│   └── README.md
├── PRD/                       Qué se construye — MVP scope, personas (aún sin separar)
│   └── README.md
├── SRS/                       Cómo se construye — arquitectura técnica (aún sin separar)
│   └── README.md
└── ADR/                       Decisiones de arquitectura importantes y difíciles de revertir
    ├── README.md
    └── ADR-NNNN-template.md
```

## Estado actual

`Project Foundation.md` es un documento único que todavía mezcla Constitution (Problem, Non-goals) + PRD (Scope) + SRS (Architecture, Testing). Las carpetas `business/`, `PRD/`, `SRS/` están creadas y listas, pero vacías — se van a ir poblando cuando ese contenido se separe en archivos individuales (mismo patrón que usó tuDeclaracion, ver nota de "Structure override" en sus propios README).

`ADR/` sí tiene sentido poblar antes: varias decisiones dentro de la sección Architecture de `Project Foundation.md` (modelo de acceso por whitelist, bypass de RLS vía service-role client, no crear tabla local de cuenta/perfil) son candidatas claras a ADR — arquitectónicas y difíciles de revertir. Se promueven a `ADR-NNNN-*.md` cuando se decida formalizarlas.

## Referencias

- Skill que gobierna esta fase: `tuDeclaracion/.claude/skills/project-foundation/SKILL.md`
- Pipeline completo de fases: `documentos/flujo-de-trabajo-agentic-dev.md`
- Estructura de carpetas de código: `documentos/estructura-de-carpetas.md`
