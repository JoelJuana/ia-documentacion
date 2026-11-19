---
title: Plugin "comite-dossier-bancario"
description: "Comité multidisciplinar de 9 agentes expertos (negocio, explotación, CAPEX/EPC, deuda, modelización/estrés, fiscal/legal, riesgos bancarios, dirección ejecutiva y maquetación editorial A4) para crear, auditar y profesionalizar dossiers de financiación bancaria sincronizados con simuladores financieros."
---

*   **Ruta en repositorio**: `IA_Configuracion/plugins/comite-dossier-bancario/`
*   **Versión**: `v1.0.0`
*   **Estado**: Activo

---

# Comité de Dossier Bancario (`comite-dossier-bancario`)

Plugin nativo de Antigravity que despliega un **comité multidisciplinar de 9 agentes expertos** integrados para crear, auditar y profesionalizar **dossiers de financiación bancaria y planes de negocio** sincronizados al euro con simuladores financieros (`apps/business-plans/`) y maquetados en PDF vectorial A4 + Word (`.docx`) con `gestiona_editorial`.

## Roster de los 9 Agentes Expertos

| # | Agente | Bloque(s) del Dossier | Especialidad |
|---|---|---|---|
| 1 | `experto-modelo-negocio` | Pág. 2 · Proyecto y modelo de negocio | Mercado, posicionamiento, pricing, canales de venta y encaje regulatorio. |
| 2 | `experto-explotacion-opex` | Pág. 3 · Ingresos y gastos de explotación | Unit economics, estacionalidad, OpEx por estándares sectoriales (USALI), plantilla 365d y punto muerto. |
| 3 | `experto-capex-epc` | Pág. 9 · Anexo I · Presupuesto de obra | Presupuesto por capítulos, ratios €/m², contratación EPC llave en mano, imprevistos y Project Monitoring. |
| 4 | `experto-financiacion-deuda` | Pág. 4 · Inversión y financiación | Sources & Uses, tramos por vida útil (hipoteca/leasing/póliza), LTV/LTC, garantías, art. 363 LSC y Term Sheet. |
| 5 | `experto-modelizacion-estres` | Págs. 5 y 7 · Proyección financiera y Estrés | Proyección 0–25 años sincronizada con `engine.js`, cash sweep, DSCR/LLCR/TIR/VAN y batería de stress testing. |
| 6 | `experto-fiscal-legal` | Pág. 8 · Fiscalidad y calendario de trámites | Fiscalidad AEAT (IS, LIS, LIVA/ISP, REDEME, IRPF, ICIO/IBI), contratos clave (LAU, garantías) y cronograma Gate 0. |
| 7 | `experto-riesgos-banca` | Pág. 6 · Análisis de riesgos + Auditoría | Matriz de riesgos (impacto × prob. → residual), mitigantes contractuales y auditoría "Abogado del Diablo" de banca. |
| 8 | `director-dossier-ejecutivo` | Págs. 1 y 10 · Resumen ejecutivo y Glosario | Síntesis ejecutiva post-auditoría, glosario contextualizado y reconciliación al euro entre los 10 bloques. |
| 9 | `experto-maquetacion-editorial` | Maquetación A4 + PDF/DOCX + QA Visual | Ensamblaje `.hoja-a4` 100% bajo `dossier_financiero`, compilación `build_editorial.js` y verificación visual PNG. |

## Flujo Orquestado (`skills/comite_dossier/SKILL.md` + `scripts/run_comite.py`)

1. **Fase 0 — Fuente Única de Verdad**: Extracción verificada de cifras desde el simulador (`engine.js` / `bp-config.md`) o dossier origen hacia `modelo_verdad.json`.
2. **Fase 1 — Comité de Especialistas (en paralelo)**: Expertos 1, 2, 3, 4 y 6 trabajan en paralelo sobre sus bloques.
3. **Fase 2A — Modelización y Stress Testing**: Experto 5 verifica numéricamente la proyección 0–25 años y las pruebas de estrés.
4. **Fase 2B — Comité de Riesgos Bancario**: Experto 7 audita los 6 bloques anteriores como analista de riesgos de banca y cierra la matriz de riesgos y *Conditions Precedent (Gate 0)*.
5. **Fase 3A — Dirección Ejecutiva**: Experto 8 cierra Pág. 1 (Resumen Ejecutivo) y Pág. 10 (Glosario) y certifica coherencia al euro.
6. **Fase 3B — Maquetación Editorial A4**: Experto 9 maqueta el HTML final, compila PDF + DOCX con `build_editorial.js` y ejecuta QA visual sobre cada página generada.

