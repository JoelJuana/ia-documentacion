---
title: "app-bp-ramon-turro"
description: "Ficha técnica y documentación de la aplicación Business Plan · Ramón Turró (Girona) (app-bp-ramon-turro)."
---

*   **Ruta en repositorio**: `IA_Proyectos/apps/business-plans/app-bp-ramon-turro/`
*   **Nombre Comercial**: Business Plan · Ramón Turró (Girona)
*   **Tipo**: `vanilla`
*   **Creado el**: 2026-06-28
*   **Autor**: JoelJuana
*   **URL Pública**: [https://ramon-turro.gironacc.com](https://ramon-turro.gironacc.com)
*   **Etiquetas**: `Finanzas`, `Business Plan`, `Inmobiliaria`, `Hotel`

---

# Business Plan: Ramón Turró · Modelo Financiero y Fiscal (Girona)

Simulador interactivo de viabilidad financiera, estructura bancaria y optimización fiscal (horizonte Año 0 + Años 1 a 25) para la rehabilitación y explotación de un hotel de 26 habitaciones con servicios en **C/ Ramon Turró 19, Girona** (`https://ramon-turro.gironacc.com`).

## Arquitectura del Modelo (`src/js/config.js` y `src/js/engine.js`)

1. **Titularidad Patrimonial y Financiación Promotora Verde a 20 Años (Bloque 1)**
   - **Inmueble a título personal y pre-inversión propia (`1.1`):** Titularidad al 100% de las fincas privativas del hotel libres de cargas (`1.250 m²`, `78,1%` en Propiedad Horizontal art. 553 CCCat sobre `1.600 m²` físicos), mantenidas a título personal fuera del balance de la S.L. explotadora (sin amortización del edificio en la sociedad). Pre-inversión previa a firma y primera disposición de `85.000 €` con fondos propios (`55.000 €` técnicos ya ejecutados + `30.000 €` de ICIO y escrituras; `28%–33%` de Equity real).
   - **Hipoteca Promotora Verde Única a 20 años (`4,50%` TIN):**
     - **`1.2 Obra civil y Clima`:** Bloque unificado de financiación (`1.155.000 €`, plazo `20 años`, tipo `4,50%`, cuota `7.307 €/mes`) manteniendo desglosados los importes de Obra civil (`700.000 €`) y Clima e instalaciones (`350.000 €`, incluyendo `30 kWp` solares) para preservar sus ritmos de amortización fiscal diferenciados (`2%–4%` vs. `5%–10%`).
     - **`1.3 Equipamiento`:** Tramo integrado bajo la misma estructura a `20 años` (`220.000 €`, `4,50%`, cuota `1.392 €/mes`; servicio total de deuda `8.699 €/mes`, LTV `62,5%`).
     - **`1.4 Póliza de Circulante`:** Límite técnico mínimo de `115.000 €` (`30.746 €` dispuestos en Año 0) para absorber la rotación temporal del IVA de obra (REDEME mensual), gastos fijos de obra e intereses de carencia, respaldada en explotación por una cuenta de reserva del servicio de la deuda (**DSRA** de `45.000 €`).

2. **Explotación, IVA y Estrategia Fiscal AEAT — Ley 7/2024 y Decret 75/2020 (Bloque 2)**
   - **Hospedaje hotelero con servicios periódicos (IVA 10%, art. 91.Uno.2.2.º LIVA):** Limpieza periódica, repaso diario de `450 m²` comunes por plantilla y cambio de lencería, habilitando la **deducción del 100% del IVA soportado en la inversión** y calificando como actividad económica sustantiva (art. 5.1 LIS). Presentación contable neteada por base imponible sin IVA de salidas B2B directas (`OpEx 36,5%` con IBI post-reforma).
   - **Doble contabilidad (PGC PYMES vs. Ajuste Extracontable Art. 103 LIS):** Amortización contable lineal según vida útil real (`2%` obra civil, `5%` clima e instalaciones, `10%` equipamiento) para maximizar la solvencia EBIT/EBT ante el Comité de Riesgos, combinada con amortización fiscal acelerada (`×2` en elementos nuevos puestos a disposición) mediante ajuste extracontable en el Impuesto sobre Sociedades.
   - **Cascada del Impuesto sobre Sociedades:** Ajuste extracontable de amortización → Reserva de Capitalización (art. 25 LIS, `20%` del beneficio retenido con tope del `25%` en microempresa) → Compensación de BINs (art. 26 LIS) → Tipo reducido de Nueva Creación (`15%` los dos primeros ejercicios positivos) → Escala definitiva de Microempresa (`17%` primeros `50.000 €` y `20%` resto).
   - **Bonificación IBI Solar en Girona:** `50%` de bonificación municipal durante 5 años conforme al límite de la ordenanza fiscal de Girona (`329,10 €/año`).

3. **Tesorería, Freno de Barrido y Solvencia Bancaria (Bloques 3 y 4)**
   - **Puente exacto 1:1 Resultados → Caja → Deuda:** Validado mediante suite automatizada de tests (`npm test` en `tests/engine.test.js`), con conciliación fiscal y de deuda auditada.
   - **Prelación de barrido (*Cash Sweep*) y Freno Estratégico (`Deuda/EBITDA`):** Cancelación prioritaria de la Póliza de Circulante seguida de amortización anticipada de tramos a largo plazo, incorporando un control interactivo de freno estratégico tras liberar el *covenant* de reparto de dividendos (`Deuda/EBITDA ≤ 3,5x`).
   - **Solvencia en escenarios base y estrés (`3.4 Rentabilidad Socio 25a`):** `DSCR A1` de `1,62x` con 6 meses de carencia (`1,29x` sin carencia), autosuficiencia demostrada bajo **Estrés Severo Combinado** (`DSCR A2 = 1,05x`, póliza máxima `92.036 €` dentro del límite de `115.000 €`) y panel en tiempo real de rentabilidad del socio (`TIR`, `VAN al 6%` y `Payback`).

## Dossier Bancario Editorial A4 (9 Páginas + Word)

El dossier ejecutivo auditado al 100% de ocupación A4 para Comité de Riesgos y Asesoría Jurídica (con Project Monitoring ECO y servidumbres estatutarias de foso, bajantes y cubierta solar) se encuentra en:
- HTML fuente: `docs/editorial/Ramon Turro/2026-10-plan-financiero-estrategia-real/documento.html`
- PDF vectorial (9 págs., 32 marcadores): `docs/editorial/Ramon Turro/2026-10-plan-financiero-estrategia-real/Plan_Financiero_Estrategia_Real_Ramon_Turro.pdf`
- Word editable: `docs/editorial/Ramon Turro/2026-10-plan-financiero-estrategia-real/Plan_Financiero_Estrategia_Real_Ramon_Turro.docx`


---

## Historial de Versiones del Proyecto

### [2.2.0] - 2026-11-13
#### Cambiado
- **Adopción exclusiva de Hipoteca Promotora Verde Única a 20 años (`4,50%`)** en el simulador y en el Dossier Editorial (PDF/DOCX), eliminando la estructura dual y los botones de conmutación.
- **Unificación financiera de Obra civil y Clima (`1.2 Obra civil y Clima`)**: bloque único de financiación (`1.155.000 €`, tipo `4,5%`, plazo `20 años`, cuota `7.307 €/mes`) manteniendo separados los deslizadores de importe (`Obra civil` `700.000 €` y `Clima e instalaciones` `350.000 €`) para preservar sus amortizaciones fiscales diferenciadas (`2%–4%` vs. `5%–10%`).
- **Renumeración y valores por defecto**: `1.3 Equipamiento` (`220.000 €`, `4,5%`, `20 años`, cuota `1.392 €/mes`) y `1.4 Póliza de Circulante` (`115.000 €` límite técnico mínimo, `30.746 €` dispuestos en Año 0).

### [2.1.0] - 2026-11-13
#### Mejorado (Dossier Bancario A4 de 9 páginas y Estrategia Financiera)
- **Coherencia temporal de pre-inversión (`85.000 €`)**: precisada la secuencia real (55k € técnicos ya ejecutados + 30k € de ICIO y escrituras aportados con fondos propios antes de firma y primera disposición).
- **Encaje registral en Propiedad Horizontal (`art. 553 CCCat`)**: acotada la titularidad al 100% de las fincas privativas del hotel (1.250 m², 78,1% sobre 1.600 m² físicos) y blindadas en Riesgo 7 las servidumbres estatutarias de foso, bajantes y campo solar en cubierta.
- **Operativa de limpieza y presentación contable**: explicitado el repaso diario de 450 m² comunes por plantilla y la nota de presentación neteada por base imponible sin IVA de los 5.400 € de salidas B2B directas.
- **Pruebas de estrés y Opción B preferente**: etiquetado exacto de saldo de póliza en explotación y cuantificada la autosuficiencia en Estrés Severo Combinado bajo Hipoteca Promotora Única a 20 años (DSCR A2 `1,05x`, póliza A2 `92.036 €`).

#### Añadido (Simulador Web Interactivo)
- Conmutador rápido en cabecera de Bloque 1 entre **Estructura Dual (Base)** e **Hipoteca Única 20a (Opción B)**, ampliando a 20 años los deslizadores de Clima y Equipamiento.
- Control de **Freno estratégico de barrido (`Deuda/EBITDA`)** en Gestión de Deuda para simular el mantenimiento de apalancamiento barato tras liberar el *covenant* de dividendos (`≤ 3,5x`).
- Panel en tiempo real **3.4 Rentabilidad Socio (25a)** con `TIR`, `VAN (6%)` y `Payback` del accionista, respaldado por nuevos tests unitarios en `tests/engine.test.js`.

### [1.0.0] - 2026-06-05
#### Añadido
- Simulador financiero con interfaz web
- Gráficos interactivos con Chart.js
- Estilos CSS personalizados

#### Reestructurado
- Código fuente movido a `src/`
- Añadidos README.md, CHANGELOG.md y .gitignore

