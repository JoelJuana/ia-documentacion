---
title: Estándar Financiero (Business Plans) y Editorial A4
description: Especificación de referencia del motor financiero bp-core.js, reglas de auditoría bancaria AEAT y matriz técnica de los 4 presets del Centro Editorial A4.
sidebar:
  order: 2
---

Esta especificación de referencia documenta los parámetros técnicos, fórmulas de auditoría bancaria y presets de maquetación que rigen la **Suite Business Plans** ([`gestiona_business_plan`](/agente/skills/gestiona_business_plan/)) y el **Centro Editorial A4** ([`gestiona_editorial`](/agente/skills/gestiona_editorial/)).

---

## 1. Arquitectura de Simuladores Financieros (`bp-core.js`)

Todos los simuladores ubicados en `IA_Proyectos/apps/business-plans/app-bp-*/` comparten un núcleo de utilidades y persistencia (`bp-core.js`) con las siguientes capacidades estándar:

| Componente / Función | Especificación Técnica | Comportamiento Estándar |
| :--- | :--- | :--- |
| **Persistencia Dual** | `Firestore` + `localStorage` | Sincronización en tiempo real en la colección `simulaciones` y fallback instantáneo offline. |
| **Gestión de Escenarios** | Snapshots con nombre + JSON | Guardado de escenarios comparativos, exportación/importación `.json` y enlace compartible (`?s=base64`). |
| **Formato Numérico (`es-ES`)** | Separador de miles `.` y decimal `,` | Moneda en `€` sin decimales en tablas anuales (`1.250.000 €`) y porcentajes con 1 o 2 decimales (`7,50 %`). |
| **Dossier Ejecutivo A4** | `src/public/docs/*.pdf` | Botón en cabecera que sirve el Dossier Bancario PDF maquetado desde `docs/editorial/Finanzas_y_Dossiers/`. |

---

## 2. Reglas de Auditoría Financiera, Bancaria y Fiscal (AEAT)

Reglas de cálculo obligatorias para garantizar la coherencia contable entre las pestañas interactivas del simulador y los dossiers ejecutivos bancarios:

| Regla de Auditoría | Fórmula / Criterio Técnico | Propósito Financiero |
| :--- | :--- | :--- |
| **1. CAPEX Total vs. Base Financiable (LTV)** | `Hipoteca = Base_Financiable × LTV` | Separar estrictamente el **Desembolso Inicial Total** (que incluye impuestos ITP/AJD, notaría, registro y existencias) de la **Base Financiable** (precio de escritura/tasación o reforma elegible). |
| **2. Límite de Póliza de Crédito (`0..N`)** | `Límite = max(Déficit_Acumulado[0..25]) × (1 + Margen)` | Evaluar siempre el flujo acumulado desde el **Año 0 hasta el final del horizonte (Año 25)** —nunca solo los primeros 5 años— para cubrir valles de tesorería por renovaciones de CAPEX o vencimientos de deuda. |
| **3. Cuota de Préstamo (Sistema Francés)** | $C = P \cdot \frac{r(1+r)^n}{(1+r)^n - 1}$ | Desglose explícito de **Intereses** (gasto financiero deducible en PyG) y **Amortización de Principal** (salida de caja en Cash Flow no deducible en PyG). |
| **4. Escudo Fiscal Fondo de Comercio (Farmacia)** | `Deducción = Precio_Licencia × 7,5%` anual | Amortización fiscal deducible en IRPF (Estimación Directa) durante ~13,33 años hasta agotar el 100% del valor intangible de la licencia. |
| **5. Impuesto sobre Sociedades (IS)** | `15%` (entidades nueva creación) / `23%–25%` (régimen general) | Aplicación de compensación de Bases Imponibles Negativas (BINs) de ejercicios previos antes de calcular la cuota íntegra. |

---

## 3. Matriz Técnica de Presets del Centro Editorial (`docs/editorial/`)

El motor de maquetación [`centro-editorial`](/proyectos-ia/apps/centro-editorial/) compila documentos HTML/CSS paginados en cajas físicas A4 (`210mm × 297mm`, márgenes de `15mm–20mm`) hacia **PDF vectorial** (vía Microsoft Edge Headless `--print-to-pdf`) y **Word (`.docx`)**:

| Preset Oficial | Carpeta de Destino | Tipografía Base | Presupuesto por Página A4 | Uso Principal |
| :--- | :--- | :--- | :--- | :--- |
| **`oca_global`** | `docs/editorial/OCA Global/` | `Inter` / `Segoe UI` (`9.5pt`) | Máx. `38–42` líneas o `2` tablas medianas | Informes de auditoría, notas de comité y *Due Diligence* corporativa |
| **`actas_comunidad`** | `docs/editorial/CP Mercat Devesa/` | `Inter` / `Georgia` (`10pt`) | Modalidad A (Actas) / Modalidad B (Estatutos) | Convocatorias, actas de junta de propietarios y reglamentos internos |
| **`dossier_financiero`** | `docs/editorial/Finanzas_y_Dossiers/` | `Outfit` + `Inter` (`9.5pt`) | KPI Grid + Tabla PyG + Callout de conclusión | Dossiers ejecutivos bancarios vinculados a simuladores *Business Plans* |
| **`seat_124_taller`** | `docs/editorial/SEAT 124 FL - Instalacion Electrica/` | `Inter` + `JetBrains Mono` | Ficha de circuito + Diagrama vectorial SVG | Manuales técnicos de taller, esquemas eléctricos y tablas de relés/fusibles |

---

## 4. Comandos CLI de Maquetación y Auditoría Visual

```powershell
# 1. Inicializar un nuevo documento editorial desde plantilla oficial
& "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\new-doc.ps1" `
  -Preset <oca_global|actas_comunidad|dossier_financiero|seat_124_taller> `
  -Slug "nombre-documento" `
  -Title "Título Oficial del Documento"

# 2. Compilar a PDF vectorial A4, exportar a Word (.docx) y generar capturas PNG por página
& "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\compile-pdf.ps1" `
  -HtmlPath "C:\Users\jjtei\Desktop\IA_Proyectos\docs\editorial\<Carpeta>\<Subcarpeta>\documento.html" `
  -Preview
```
