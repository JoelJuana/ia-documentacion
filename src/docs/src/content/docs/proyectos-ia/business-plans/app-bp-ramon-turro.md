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

1. **Titularidad Patrimonial, Garantía Real y Financiación Promotora Verde a 20 Años (Bloque 1)**
   - **Propiedad a título particular y garantía real (`1.1 Propiedad y Garantía`):** Titularidad al 100% de las 40 fincas privativas del hotel libres de cargas (`1.250 m²`, `78,1%` en Propiedad Horizontal art. 553 CCCat sobre `1.600 m²` físicos) junto con el proyecto ejecutivo visado y la licencia municipal concedida, mantenidas a título personal como **hipotecante no deudor** (valoración ECO `~600.000 €` [`550–685k €`], aportando `~30,4%` de *Equity* real y `0 €` en balance de la S.L., evitando `60–85k €` en impuestos de traspaso). La S.L. explota el inmueble mediante **contrato de arrendamiento hotelero LAU Título III a 25 años en modalidad *Triple Net*** (`1.500 €/mes = 18.000 €/año` + IVA neutro, `0 €` de carencia técnica en los 9 meses de obra, art. 18 LIS) con **cláusula de posposición bancaria (*Standstill* si `DSCR < 1,15x`)**, pignoración contractual y no-resolución sin venia bancaria.
   - **Hipoteca Promotora Verde Única a 20 años (`4,50%` TIN):**
     - **`1.2 Obra civil y Clima`:** Bloque unificado de financiación (`1.155.000 €`, plazo `20 años`, tipo `4,50%`, cuota `7.307 €/mes`) manteniendo desglosados los importes de Obra civil (`700.000 €`) y Clima e instalaciones (`350.000 €`, incluyendo `30 kWp` solares) para preservar sus ritmos de amortización fiscal diferenciados (`2%–4%` vs. `5%`).
     - **`1.3 Equipamiento`:** Tramo integrado bajo la misma estructura a `20 años` (`220.000 €`, `4,50%`, cuota `1.392 €/mes`; servicio total de deuda `8.699 €/mes = 104.387 €/año`, LTV `62,5%` s/ `2,2 M€` ECO).
     - **`1.4 Póliza de Circulante`:** Límite técnico mínimo de `115.000 €` (`150.000 €` solicitados, `30.746 €` dispuestos en Año 0) para absorber la rotación temporal del IVA de obra (`288.750 €` en REDEME mensual, pico `79.406 €`), gastos fijos de obra e intereses de carencia, respaldada en explotación por una cuenta de reserva del servicio de la deuda (**DSRA** de `45.000 €`).

2. **Explotación, IVA y Estrategia Fiscal AEAT — Ley 7/2024 y Decret 75/2020 (Bloque 2)**
   - **Hospedaje hotelero con servicios periódicos (IVA 10%, art. 91.Uno.2.2.º LIVA):** Limpieza periódica, repaso diario de `450 m²` comunes por plantilla y cambio de lencería, habilitando la **deducción del 100% del IVA soportado en la inversión** y calificando como actividad económica sustantiva (art. 5.1 LIS). `OpEx` total de la S.L. en régimen estable: `124.503 €/año` (`106.503 €` operativos del hotel = `36,5%` + `18.000 €` de alquiler subordinado = `42,7%`), generando `167.217 €/año` de EBITDA neto en la S.L. (`185.217 €/año` de EBITDAR pre-alquiler).
   - **Doble contabilidad (PGC PYMES vs. Ajuste Extracontable Art. 103 LIS):** Amortización contable lineal en la S.L. según vida útil real (`2%` obra civil = `15.400 €/a`, `5%` clima e instalaciones = `19.250 €/a`, `10%` equipamiento = `22.000 €/a`; total `56.650 €/a` en A1–A10 y `34.650 €/a` en A11–A20), combinada con amortización fiscal acelerada del `4%` en obra nueva mediante ajuste extracontable (`+15.400 €/año`) y deducibilidad íntegra del canon de alquiler (`18.000 €/año`).
   - **Cascada del Impuesto sobre Sociedades:** Ajuste extracontable de amortización → Reserva de Capitalización (art. 25 LIS, `20%` del beneficio retenido con tope del `25%` en microempresa) → Compensación de BINs (art. 26 LIS) → Tipo reducido de Nueva Creación (`15%` los dos primeros ejercicios positivos) → Escala definitiva de Microempresa (`17%` primeros `50.000 €` y `20%` resto), generando `+413.792 €` de ahorro neto conciliado por palancas en la S.L.
   - **Bonificación IBI Solar en Girona:** `50%` de bonificación municipal durante 5 años conforme al límite de la ordenanza fiscal de Girona (`329,10 €/año`).

3. **Tesorería, Freno de Barrido y Solvencia Bancaria (Bloques 3 y 4)**
   - **Puente exacto 1:1 Resultados → Caja → Deuda:** Validado mediante suite automatizada de 26 tests (`npm test` en `tests/engine.test.js`), con conciliación fiscal y de deuda auditada al euro.
   - **Prelación de barrido (*Cash Sweep*) y Freno Estratégico (`Deuda/EBITDA`):** Cancelación prioritaria de la Póliza de Circulante seguida de amortización anticipada de la Hipoteca Única, siempre con prelación sobre el alquiler subordinado, e incorporando control interactivo de freno estratégico tras liberar el *covenant* de reparto de dividendos (`Deuda/EBITDA ≤ 3,5x`).
   - **Solvencia en escenarios base y estrés (`3.4 Rentabilidad Socio 25a`):** Caso Base en euros constantes (`IPC 0%`, sin reposición pre-cargada) con **doble lectura de cobertura**: `DSCR neto S.L.` (tras abonar alquiler) de `1,41x` en A1 c/ 6 m de carencia (`1,12x` sin carencia) y `1,59x` en A2 (`1,62x` y `1,76x` pre-canon subordinado *EBITDAR*), cancelación total de deuda en `Año 11 y 9 meses` (`1.973.068 €` caja S.L. + `450.000 €` rentas percibidas = `2.423.068 €` totales), autosuficiencia bajo **Estrés Severo Combinado con *Standstill*** (`DSCR A2 = 1,03x`, póliza A2 `94.831 € < 150.000 €`) y panel consolidado de rentabilidad económica del socio sobre los `600.000 €` de garantía real (`TIR 10,1%`, `VAN +534.576 €` al `6%` y `Payback 14,1 años`).

## Dossier Bancario Editorial A4 (9 Páginas + Word)

El dossier ejecutivo auditado al 100% de ocupación A4 para Comité de Riesgos y Asesoría Jurídica (con Project Monitoring ECO y servidumbres estatutarias de foso, bajantes y cubierta solar) se encuentra en:
- HTML fuente: `docs/editorial/Ramon Turro/2026-10-plan-financiero-estrategia-real/documento.html`
- PDF vectorial (9 págs., 32 marcadores): `docs/editorial/Ramon Turro/2026-10-plan-financiero-estrategia-real/Plan_Financiero_Estrategia_Real_Ramon_Turro.pdf`
- Word editable: `docs/editorial/Ramon Turro/2026-10-plan-financiero-estrategia-real/Plan_Financiero_Estrategia_Real_Ramon_Turro.docx`


---

## Historial de Versiones del Proyecto

### [2.5.0] - 2026-11-14
#### Cambiado (Rediseño Página 4: Garantía Real Hipotecaria + Contrato de Alquiler Subordinado a 25 Años)
- **Eliminación integral de la partida de `80.000 € / 85.000 €` en Simulador y Dossier**: suprimidos los deslizadores de pre-inversión dineraria en la S.L. (`#input-project-license` y `#input-purchase-tax-amount`) y toda mención a los `85.000 €` (`55k + 30k`) en las 9 páginas del Dossier Bancario. La propiedad aporta en garantía real de primer rango las **40 fincas privativas sin cargas + el proyecto ejecutivo visado + la licencia municipal concedida** (`~600.000 €` ECO = `~30,4%` de *Equity* real sobre la operación, `0 €` de deuda previa y ahorro de `60–85k €` en ITP/IRPF de traspaso) como **hipotecante no deudor**, mientras la S.L. ejecuta y financia exclusivamente los `1.375.000 €` de rehabilitación llave en mano.
- **Incorporación del Contrato de Arrendamiento Hotelero Subordinado (`18.000 €/año = 1.500 €/mes`)**: añadido deslizador `Alquiler edificio (propiedad)` (`#input-property-rent`, `opex.alquiler = 18.000 €/año` en `2.2 Gastos OpEx`, con `0 €` de carencia técnica durante los 9 meses de obra en Año 0 y plena seguridad ante operaciones vinculadas `art. 18 LIS` bajo contrato LAU Título III *Triple Net* a 25 años sobre el edificio sin reformar), incluyendo **cláusula de posposición bancaria (*Standstill* si `DSCR < 1,15x`)**, pignoración contractual y no-desahucio sin venia bancaria.
- **Doble lectura bancaria de solvencia y rentabilidad consolidada (`src/js/engine.js` y `src/js/app.js`)**: cálculo paralelo de `EBITDAR` (`136.826 €` A1 / `185.217 €` A2+) y `EBITDA neto SL` (`118.826 €` A1 / `167.217 €` A2+), `DSCR neto SL` (`1,41x` A1 c/ 6m carencia, `1,12x` sin ella y `1,59x` A2) frente a `DSCR pre-alquiler subordinado` (`1,62x` A1 c/ 6m y `1,76x` A2), cancelación total de deuda en `Año 11 y 9 meses`, ahorro neto conciliado por palancas en S.L. de `+413.792 €` (`-78.654 €` adicionales en IS gracias al alquiler deducible), liquidez acumulada a 25 años de `1.973.068 €` en S.L. + `450.000 €` en rentas = `2.423.068 €` y panel `3.4 Rentabilidad Socio` referenciado al *Equity* real en garantía (`600.000 €`: `TIR 10,1%`, `VAN +534.576 €`, `Payback 14,1 años`), con `26/26` tests unitarios en verde.
- **Rediseño editorial de Página 4 (`Inversión y financiación`), Página 5 (`Proyección financiera`) y Página 6 (`Análisis de riesgos`, `99.7%` ocupación)**: nuevos KPIs financieros ejecutivos en Página 4 (hipotecante no deudor, accesión arts. 334 CC / 110 LH, contrato LAU a 25 años art. 18 LIS y *Standstill*), Página 5 de horizonte íntegro `Año 0 a Año 25` con cascada desglosada (`Principal ordinario exigible` vs. `Anticipo voluntario / póliza`), hito del *covenant* en `Año 8` (`526.788 €` = `3,2x EBITDA`, `LTV 23,9%`) y las **3 políticas de tesorería y retorno del socio**, y nueva Página 6 con matriz de **severidad inherente vs. exposición residual bancaria (`A/M → B`)** sobre los 10 riesgos críticos (prelación registral hipotecaria y purga `art. 13.1 LAU`, *Project Monitoring* ECO + TRC, exclusión de moratorias HUT bajo `Decret 75/2020` + `art. 553 CCCat`, blindaje frente a regularización decenal `art. 107 LIVA` y seguro de lucro cesante 12 m) más tabla ejecutiva de los **4 niveles de escudos y *covenants* por fases**.

### [2.4.0] - 2026-11-13
#### Cambiado (Caso Base en Euros Constantes `IPC 0%` sin Reposición Pre-cargada)
- **Simulador interactivo (`2.5 Actualización Monetaria`)**: desmarcados por defecto los controles `Actualización de ingresos y gastos (IPC 2%)` (`#chk-ipc`) y `Reposición de mobiliario e instalaciones` (`#chk-reposicion`), estableciendo el Caso Base Canónico en **euros constantes (`IPC 0%`)** para no depender de variables inflacionarias externas ni distorsionar con CapEx post-deuda el periodo de amortización hipotecaria.
- **Motor financiero (`src/js/engine.js`)**: depurado el cálculo de `dscrMedio` para excluir colas residuales inferiores a un trimestre de cuota en el último año de extinción anticipada de deuda.
- **Dossier Bancario A4 de 9 páginas (`documento.html`, `.pdf` y `.docx`)**: recalculadas al euro las 9 páginas en euros constantes (`291.720 €/año` de ingresos estables, `185.217 €/año` de EBITDA estable, DSCR Año 1 `1,62x` con 6 m de carencia y `1,29x` sin ella, DSCR Año 2 `1,75x`, cancelación total de deuda en `Año 10 y 4 meses` / `10a 8m` con DSRA, ahorro fiscal y financiero neto de `+478.411 €`, caja neta acumulada de `2.407.843 €` y nota explícita en Página 5 sobre autofinanciación post-deuda).

### [2.3.0] - 2026-11-13
#### Mejorado (Díptico Comercial y Explotación · Páginas 2 y 3 del Dossier Bancario)
- **Rediseño integral de la Página 2 (`Proyecto y modelo de negocio`)**: enfocada al 100% en la propuesta comercial multiformato con medias centradas en mercado (**meses `850–980 €/m` · media `900 €/m`**, **semanas `315–455 €/sem.` · media `345 €/sem.`** y **días `75–110 €/noche` · media `88,77 €/noche`**), coste operativo unitario de rotación por formato (`~2,2 €`, `~6,5 €` y `~17,5 €/noche`), segmentación de los 4 perfiles de cliente en Girona, blindaje del IVA al 10% (REDEME `288.750 €`) y cobro 100% anticipado sin riesgo de impago.
- **Rediseño integral de la Página 3 (`Ingresos y gastos de explotación`)**: nueva tabla maestra multicolumna conciliada al euro entre **Año 1 (`70%` · `240.240 €`)**, **Caso Base constante (`85%` · `291.720 €`)** y **Año 2 nominal (`+2% IPC` · `297.554 €`)**, desglosando ingresos por formato (`64,2%` meses, `21,4%` semanas, `14,4%` días), agrupación transparente de las **6 partidas fijas (`89.000 €`) + 1 partida variable OTA (`6,0%`)**, tabla de **Economía Unitaria por habitación** (`594 €/mes EBITDA`), escalera de equilibrio (`27,6%` / `59,9%`) y cobertura de caja mensual en valle invernal.
- **Conciliación patrimonial transversal (Páginas 1 a 9)**: alineado todo el dossier con el esquema canónico de **hipotecante no deudor** (`valorAportacion: 0` en SL, amortización contable anual `58.330 €` en A1–A10, impuestos y caja neta a 25 años de `2.788.933 €`).

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

