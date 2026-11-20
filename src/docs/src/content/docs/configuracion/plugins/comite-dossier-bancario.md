---
title: Plugin "comite-dossier-bancario"
description: "Comité autónomo de 9 expertos con checkpoints reanudables, dieta de contexto (-80% tokens), 6 playbooks sectoriales, ensamblaje HTML y sincronización de simulador deterministas, linter pre-vuelo A4/OCR y generación de Excel bancario (.xlsx) + Q&A + Teaser."
---

*   **Ruta en repositorio**: `IA_Configuracion/plugins/comite-dossier-bancario/`
*   **Versión**: `v2.2.0`
*   **Estado**: Activo

---

# Comité de Dossier Bancario (`comite-dossier-bancario` v2.2.0)

Plugin nativo de Antigravity que despliega un **comité autónomo multidisciplinar de 9 agentes expertos** respaldado por **5 motores deterministas (Node.js + Python)**, **checkpoints reanudables** y **6 playbooks sectoriales** para crear, auditar, optimizar y maquetar **expedientes completos de financiación bancaria** sincronizados al euro con simuladores (`apps/business-plans/`).

## Capacidades Principales (`v2.2.0`)

1. **Checkpoints Reanudables (`pipeline_state.json`)**: `resume: true` y `desde_fase` permiten retomar instantáneamente cualquier corrida desde la fase exacta donde quedó sin perder trabajo ni cuota.
2. **Dieta de Contexto (-80% Tokens) y Ensamblaje 0-LLM (`assemble_dossier.py`)**: Partición automática en `modelo_verdad_core.json` (~7 KB) y extracción/ensamblaje determinista de `pages/page_01.html .. page_10.html` hacia `documento.html`.
3. **6 Playbooks Sectoriales (`references/sectores/*.md`)**:
   - `hotelero_coliving.md` · Hotelero, aparthotel y coliving (USALI, ISP, REDEME, LAU/LH).
   - `farmacia_sanitario.md` · Oficina de farmacia (Persona Física IRPF, Fondo de Comercio art. 12.2/103.5 LIS, Hipoteca Mobiliaria, Recargo Equivalencia).
   - `inmobiliario_patrimonial.md` · Inversión inmobiliaria y alquiler (art. 5.1 LIS vs. art. 23 LIRPF, LTV ECO).
   - `flota_activos_moviles.md` · Caravanas, chárter náutico y maquinaria móvil (Leasing/Hipoteca Naval, IEDMT art. 66).
   - `industrial_autoconsumo_energia.md` · Naves, líneas productivas, fotovoltaica/PPA y subvenciones art. 11 LIS.
   - `comercio_restauracion_franquicia.md` · Retail, hostelería, clínicas (exención art. 20 LIVA) y franquicias.
4. **Sincronización Bidireccional de Simuladores (`extract_simulador.mjs` + `sync_simulador.mjs`)**: Extracción determinista de `engine.js` y escritura validada contra `min`, `max` y `step` en `src/index.html`.
5. **Linter Pre-vuelo A4 / OCR / Antiresiduos (`lint_dossier.py` v2.2)**: Estimación determinista de altura en milímetros (`275.5 mm`), tablas paralelas `.grid-2col`, `class="num"`, higiene OCR (`GATE 0`) y bloqueo de cifras obsoletas (`--forbid-numbers`).
6. **Pack Completo de Comité Bancario**: Genera junto al PDF/DOCX de 10 páginas el libro **`Modelo_Financiero_Bancario.xlsx`** (5 hojas con fórmulas Excel vivas `=SUM`, `=ABS(PMT)`), la **`Defensa_Comite_Riesgos_QA.md`** (12–15 preguntas duras con respuesta cuantificada) y el **`Teaser_Ejecutivo_1Pag.html`** (+ PDF 1 cara).
7. **Suite Automatizada de Tests (`test_comite_tools.py`)**: Verificación integral de esquemas, compilación AST, ensamblador, linter, Excel y sincronizador de simulador.

