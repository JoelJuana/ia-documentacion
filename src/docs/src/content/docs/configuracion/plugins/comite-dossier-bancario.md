---
title: Plugin "comite-dossier-bancario"
description: "Comité autónomo de 9 agentes expertos con Mesa de Debate para maximizar beneficios netos, auditoría de Comité de Riesgos Bancario, reconciliación al euro con simuladores y entrega final 10/10 en PDF vectorial A4 y DOCX."
---

*   **Ruta en repositorio**: `IA_Configuracion/plugins/comite-dossier-bancario/`
*   **Versión**: `v2.0.0`
*   **Estado**: Activo

---

# Comité de Dossier Bancario (`comite-dossier-bancario` v2.1.0)

Plugin nativo de Antigravity que despliega un **comité autónomo multidisciplinar de 9 agentes expertos** respaldado por **validadores deterministas (Node.js + Python)** y **playbooks sectoriales** para crear, auditar, optimizar y maquetar **dossiers de financiación bancaria** sincronizados al euro con simuladores financieros (`apps/business-plans/`) y compilados en PDF vectorial A4 + Word (`.docx`) con `gestiona_editorial`.

## Novedades Clave en v2.1.0

1. **Playbooks Multisectoriales (`references/sectores/*.md`)**: Adaptación automática de vehículo jurídico, garantías y fiscalidad AEAT para `hotelero` / `coliving` (USALI, ISP, REDEME, LAU/LH), `farmacia` / `sanitario` (Persona Física IRPF Estimación Directa, Fondo de Comercio art. 12.2/103.5 LIS, Hipoteca Mobiliaria, Recargo Equivalencia), `inmobiliario` / `patrimonial` (art. 5.1 LIS vs. art. 23 LIRPF, LTV ECO) y `flota` (`caravanas`, `velero`, Leasing/Hipoteca Naval e IEDMT art. 66).
2. **Extractor Determinista Universal de Simuladores (`scripts/extract_simulador.mjs`)**: Lee todos los controles `<input>`/`<select>` (`min`, `max`, `step`, `value`) y ejecuta `engine.js` en Node.js antes de invocar a ningún LLM.
3. **Validación Estricta de `modelo_verdad.json`**: Esquema polimórfico `modelo_verdad.schema.json` con validación automática en Python y bucle de autocorrección en Fase 0C.
4. **Dictamen Tipado y Bucle Automático de Remediación (Fase 2C)**: Cuando `experto-riesgos-banca` detecta observaciones `CRITICA` o `ALTA` en Fase 2B, el orquestador relanza automáticamente en paralelo solo a los especialistas propietarios para subsanar sus bloques antes del cierre ejecutivo.
5. **Linter Determinista A4 / Tabular / OCR (`scripts/lint_dossier.py`)**: Verifica número exacto de hojas `.hoja-a4`, presencia de los 6 bloques canónicos, longitud de titulares, simetría de tablas `.grid-2col`, clases `num`/`cen`, higiene OCR (`GATE 0`, `&nbsp;`) y presencia de importes maestros de `modelo_verdad.json`.
6. **Ejecución Incremental y Enrutamiento de Modelos (`scripts/workflow.json`)**: Soporte para `paginas_objetivo`, `usar_cache_fase1`, `model_map` por rol y auto-scaffolding en `modo="nuevo"`.

## Roster de los 9 Agentes Expertos

| # | Agente | Bloque(s) del Dossier | Especialidad |
|---|---|---|---|
| 1 | `experto-modelo-negocio` | Pág. 2 · Proyecto y modelo de negocio | Mercado, posicionamiento, pricing/margen, canales y licencias. |
| 2 | `experto-explotacion-opex` | Pág. 3 · Ingresos y gastos de explotación | Cuenta operativa, unit economics, estándares sectoriales, plantilla y punto muerto. |
| 3 | `experto-capex-epc` | Pág. 9 · Anexo I · Inversión / Presupuesto | Capítulos de CAPEX/adquisición, ratios unitarios, contrato EPC y control ECO. |
| 4 | `experto-financiacion-deuda` | Pág. 4 · Inversión y financiación | Sources & Uses simétrico, tramos por vida útil, LTV/LTC, garantías, art. 363 LSC y Term Sheet. |
| 5 | `experto-modelizacion-estres` | Págs. 5 y 7 · Proyección y Estrés | Serie 0–25 años contra `engine.js`, estrategias de caja, DSCR/TIR/VAN y stress testing. |
| 6 | `experto-fiscal-legal` | Pág. 8 · Fiscalidad y trámites | Fiscalidad AEAT (IS, LIRPF, LIVA, Fondo de Comercio, IEDMT), contratos y Gate 0. |
| 7 | `experto-riesgos-banca` | Pág. 6 · Riesgos + Auditoría global | Matriz de riesgos residuales + dictamen tipado "Abogado del Diablo" + disparo de Fase 2C. |
| 8 | `director-dossier-ejecutivo` | Págs. 1 y 10 · Resumen y Glosario | Acta de reconciliación al euro entre las 10 páginas, Portada y Glosario contextualizado. |
| 9 | `experto-maquetacion-editorial` | Maquetación A4 + Linter + QA Visual | Ensamblaje `.hoja-a4`, `lint_dossier.py`, `build_editorial.js` (PDF+DOCX), QA PNG y simulador. |

