---
version: alpha
name: BackOffice
description: Sistema visual sobrio para el panel interno de administración de tuDeclaracion, pensado para dos admins (Juan, Matías) que ya usan la app cliente a diario — deliberadamente distinguible de tuDeclaracion para que nunca haya duda de en qué superficie están parados.
colors:
  primary: '#0F172A'
  accent: '#0D9488'
  secondary: '#334155'
  neutral: '#F1F5F9'
  background: '#F8FAFC'
  surface: '#FFFFFF'
  text: '#1E293B'
  muted: '#64748B'
  border: '#E2E8F0'
  success: '#2F9F3D'
  successBg: '#E6F4E8'
  successText: '#006B00'
  warning: '#EE9E10'
  warningBg: '#FDF3E2'
  warningText: '#7D4700'
  error: '#F13936'
  errorBg: '#FDE7E7'
  errorText: '#B00000'
typography:
  h1:
    fontFamily: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: '-0.02em'
  h2:
    fontFamily: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: '-0.01em'
  body:
    fontFamily: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: '0.01em'
  label:
    fontFamily: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif
    fontSize: 0.8125rem
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: '0.03em'
  mono:
    fontFamily: JetBrains Mono, "SFMono-Regular", Consolas, ui-monospace, monospace
    fontSize: 0.8125rem
    fontFeature: tnum
rounded:
  sm: 8px
  md: 10px
  lg: 16px
  full: 9999px
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 40px
  2xl: 48px
components:
  button:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.surface}'
    typography: '{typography.label}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm}'
    height: 40px
  buttonSecondary:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.secondary}'
    typography: '{typography.label}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm}'
    height: 40px
  buttonDanger:
    backgroundColor: '{colors.error}'
    textColor: '{colors.surface}'
    typography: '{typography.label}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm}'
    height: 40px
  input:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    typography: '{typography.body}'
    rounded: '{rounded.md}'
    padding: '{spacing.xs}'
    height: 40px
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    rounded: '{rounded.md}'
    padding: '{spacing.md}'
  modal:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    rounded: '{rounded.lg}'
    padding: '{spacing.lg}'
  badgeInfo:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.secondary}'
    rounded: '{rounded.full}'
    padding: '{spacing.xs}'
    height: 24px
  badgeSuccess:
    backgroundColor: '{colors.successBg}'
    textColor: '{colors.successText}'
    rounded: '{rounded.full}'
    padding: '{spacing.xs}'
    height: 24px
  badgeWarning:
    backgroundColor: '{colors.warningBg}'
    textColor: '{colors.warningText}'
    rounded: '{rounded.full}'
    padding: '{spacing.xs}'
    height: 24px
  badgeError:
    backgroundColor: '{colors.errorBg}'
    textColor: '{colors.errorText}'
    rounded: '{rounded.full}'
    padding: '{spacing.xs}'
    height: 24px
  alertInfo:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.secondary}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm}'
  alertWarning:
    backgroundColor: '{colors.warningBg}'
    textColor: '{colors.warningText}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm}'
  alertError:
    backgroundColor: '{colors.errorBg}'
    textColor: '{colors.errorText}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm}'
  table:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.muted}'
    typography: '{typography.body-sm}'
    padding: '{spacing.xs}'
  nav:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.surface}'
    rounded: '{rounded.sm}'
    padding: '{spacing.xs}'
  navInactive:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.muted}'
    rounded: '{rounded.sm}'
    padding: '{spacing.xs}'
  divider:
    backgroundColor: '{colors.border}'
    height: 1px
---

## Overview

**Herramienta interna, no producto de cara al cliente.** BackOffice es la superficie de administración de tuDeclaracion — la usan exclusivamente Juan y Matías, dos personas que ya conocen la identidad visual de tuDeclaracion de memoria porque la usan a diario para atender contadores. Ese conocimiento previo es exactamente el riesgo: si BackOffice se ve igual a tuDeclaracion, una pestaña de más y no queda claro si una acción (bloquear una cuenta, editar un catálogo global) se está ejecutando en la herramienta interna o, por error, en el producto de cliente.

Por eso este sistema comparte la base tipográfica y de espaciado con `tuDeclaracion/DESIGN.md` (mismo Inter, misma escala de 8px, misma familia de radios) — no hay razón para reinventar eso, y mantenerlo igual facilita reusar patrones de componente entre ambos repos — pero cambia deliberadamente el color dominante: donde tuDeclaracion usa un azul institucional cálido pensado para transmitir confianza a un cliente externo, BackOffice usa un **grafito oscuro** (`primary`) como color de navegación/chrome y un **teal** (`accent`) como único color de acción — ninguno de los dos es el azul de tuDeclaracion. La intención es que el ojo reconozca "estoy en el admin" antes de leer una sola palabra.

**Nota de honestidad (a diferencia de `tuDeclaracion/DESIGN.md`)**: ese sistema se derivó de un prototipo HTML/CSS real ya construido. Este no — BackOffice todavía no tiene pantallas construidas, así que este `DESIGN.md` es **autoría LLM desde cero** (Path E de `/design-system`), basado en los requisitos de `.context/Project Foundation.md` (tablas de catálogos, listados de usuarios, vista de soporte read-only) más la restricción explícita de diferenciación visual de tuDeclaracion. Se corrige por uso real en cuanto existan pantallas construidas — no lo trates como verdad revelada, es un punto de partida razonado.

## Colors

- **Primary (`#0F172A`):** grafito casi negro — fondo de la navegación/sidebar. Es la señal visual principal de "estás en el admin", nunca aparece en tuDeclaracion.
- **Accent (`#0D9488`):** teal — único color de acción primaria (botones de confirmar, guardar). Elegido por ser perceptualmente distinto tanto del azul de tuDeclaracion como de los tres colores semánticos (success/warning/error), para no generar ambigüedad.
- **Secondary (`#334155`):** slate oscuro — texto sobre `neutral`, botones secundarios, íconos de navegación inactivos.
- **Neutral (`#F1F5F9`):** superficie alterna para paneles secundarios y filas alternadas de tabla.
- **Background (`#F8FAFC`) / Surface (`#FFFFFF`):** iguales a tuDeclaracion — el fondo casi blanco es un patrón neutro razonable para cualquier superficie de trabajo intensivo en datos, no hay motivo de diferenciación acá.
- **Text (`#1E293B`) / Muted (`#64748B`) / Border (`#E2E8F0`):** escala slate estándar, más fría que el azul-gris de tuDeclaracion (`#293442`) para reforzar el tono "herramienta técnica" sin sacrificar legibilidad.
- **Success / Warning / Error** (y sus `*Bg`/`*Text`): **idénticos a `tuDeclaracion/DESIGN.md`**, deliberadamente. Los colores semánticos de estado (algo salió bien / mal / hay que prestar atención) son una convención que Juan y Matías ya internalizaron usando tuDeclaracion — reinventarlos acá solo generaría fricción cognitiva sin ningún beneficio de diferenciación (el punto es diferenciar "dónde estoy", no "qué significa el rojo").

## Typography

Misma familia que tuDeclaracion (Inter + JetBrains Mono para tabulares — RUTs, montos, fechas de catálogos), pero **sin el nivel `display`**: tuDeclaracion lo usa para el hero de su landing pública, y BackOffice no tiene landing ni pantalla de marketing — el título más grande que necesita es un `h1` de página (ej. "Usuarios", "Catálogo codigo_iva"). Escala general un escalón más chica que tuDeclaracion (`h1` 32px vs 40px, `body` 15px vs 17px) porque el público es dos personas técnicas operando una herramienta de trabajo, no contadores de alfabetización digital heterogénea — se puede priorizar densidad de información sobre tamaño de lectura.

## Layout

Misma unidad base de 8px y misma escala de espaciado que tuDeclaracion (`xs 8px … 2xl 48px`) — sin razón para divergir, ayuda a que cualquier componente compartido entre ambos repos se sienta consistente. Contenedor: sidebar fijo de navegación (usa `nav`/`navInactive`, fondo `primary`) + contenido fluido a la derecha, sin el layout de cards-de-resumen de 4 columnas que tiene el dashboard de tuDeclaracion — el contenido principal de BackOffice es tabular (listados de usuarios, filas de catálogo), no cards.

## Elevation & Depth

Mismos dos niveles que tuDeclaracion (`sm` para cards/paneles, `md` para elementos que se elevan sobre el flujo — modal, dropdown). No hay necesidad de un tercer nivel: BackOffice no tiene superficies apiladas más allá de un modal de confirmación (ej. "¿Confirmás bloquear esta cuenta?").

## Shapes

Radios ligeramente más chicos que tuDeclaracion (`sm 8px · md 10px · lg 16px` vs `10/12/20`) — una herramienta interna densa en datos se beneficia de esquinas algo más cuadradas que un producto de cara al cliente pensado para sentirse amigable.

## Components

- **Button / ButtonSecondary / ButtonDanger**: `button` (fondo `accent`) es la única acción primaria por pantalla, igual que en tuDeclaracion. Se agrega **`buttonDanger`** (fondo `error`) — no existe en tuDeclaracion porque el cliente nunca ejecuta una acción destructiva irreversible; BackOffice sí (bloquear una cuenta, borrar una fila de catálogo), así que necesita una señal visual explícita de "esta acción es peligrosa" que el sistema fuente no necesitaba.
- **Input**: igual función que tuDeclaracion, altura 40px en vez de 48px — sin el requisito de objetivo táctil grande para público con baja alfabetización digital, se puede ser más denso. Foco con anillo de `accent` (teal), no `primary` (grafito) — un anillo grafito sobre `surface` blanca es de bajo contraste perceptual; el teal de acción se nota mejor y refuerza la asociación "esto es interactivo".
- **Card**: igual que tuDeclaracion, uso más acotado (paneles de detalle, no grillas de resumen).
- **Modal**: confirmaciones de acciones sensibles (block/unblock, delete de fila de catálogo) — este es el uso principal en BackOffice, a diferencia de tuDeclaracion donde quedó documentado como "no existe todavía en el prototipo".
- **Badge**: se agrega **`badgeError`** (no existía en tuDeclaracion) para el estado `con_errores` de una declaración en la vista de alertas.
- **Alert**: igual función — mensajes de resultado de una acción de servidor (ej. "cuenta bloqueada", "no se pudo guardar la fila del catálogo").
- **Table**: es el componente **dominante** de BackOffice (a diferencia de tuDeclaracion, donde es secundario) — listados de usuarios, filas de catálogo, declaraciones en alerta. Headers en mayúsculas color `muted`, filas separadas por `divider`, valores numéricos en `mono`.
- **Nav / NavInactive**: sidebar fijo con fondo `primary` (grafito) — es el elemento que más carga la diferenciación visual con tuDeclaracion, que usa una nav clara con fondo `surface`.
- **Divider**: igual función que tuDeclaracion.

## Do's and Don'ts

**Hacer:**
- Usar `primary` (grafito) exclusivamente en la navegación — es la señal de "estás en el admin", no diluirla usándola en otros componentes.
- Usar `buttonDanger` para toda acción destructiva o difícil de revertir (block, delete) — nunca el botón de acento normal.
- Confirmar con `modal` antes de ejecutar cualquier acción que dispare una fila en `backoffice_audit_log` (ver ADR-0004).
- Usar `mono`/tabular-nums para RUTs, montos, fechas — mismo criterio que tuDeclaracion.
- Reusar los tokens semánticos (`success`/`warning`/`error`) sin modificar — son la convención que los admins ya conocen.

**No hacer:**
- No usar el azul de tuDeclaracion (`#08569A`) en ningún componente de BackOffice — es exactamente la confusión que este sistema existe para evitar.
- No introducir un segundo color de acento además de `accent` (teal) — un solo acento de acción, igual que el principio mono-acento de tuDeclaracion.
- No agregar el nivel tipográfico `display` — BackOffice no tiene superficies de marketing.
- No reemplazar `buttonDanger` por el botón de acento normal en acciones destructivas, aunque "quede más lindo" — la señal de peligro es más importante que la consistencia cromática ahí.
