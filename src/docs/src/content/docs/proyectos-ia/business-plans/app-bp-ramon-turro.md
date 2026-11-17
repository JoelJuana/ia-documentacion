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

1. **Patrimonio, Inversión y Deuda (Columna 1)**
   - **`1.1 Propiedad y Garantía`:** Titularidad al 100% de las 40 fincas privativas del hotel libres de cargas (`1.250 m²`, `78,1%` en Propiedad Horizontal art. 553 CCCat) más proyecto visado y licencia municipal, mantenidas a título personal como **hipotecante no deudor** (`~600.000 €` ECO = `~30,4%` de *Equity* real y `0 €` en balance de la S.L., evitando `60–85k €` en impuestos de traspaso).
   - **`1.2 Inversión y Obra (CAPEX)`:** Rehabilitación integral ejecutada y amortizada al 100% por la S.L. (`1.375.000 €`): Obra civil (`700.000 €`), Clima, `30 kWp` solares y baños (`350.000 €`), Mobiliario y equipamiento (`200.000 €`), Imprevistos (`10%` = `125.000 €`), plazo de ejecución (`9 meses`) y gastos fijos en obra (`9.000 €`).
   - **`1.3 Financiación Bancaria`:** **Hipoteca Promotora Verde Única** (`1.375.000 €`, `100%` CAPEX, `20 años`, `4,50%` TIN, cuota `8.699 €/mes = 104.387 €/año`, LTV `62,5%` s/ `2,2 M€` ECO) más **Póliza de Circulante** (`5,20%`, límite técnico `115.000 €`, `30.746 €` dispuestos en Año 0).
   - **`1.4 Gestión de Deuda`:** Posposición automática del alquiler (*Standstill* si `DSCR < 1,15x` con cuenta subordinada del propietario), recuperación mensual de IVA en obra (`REDEME`), amortización anticipada de préstamos con excedentes y freno estratégico (`Deuda/EBITDA`).

2. **Explotación Multiformato y Fiscalidad AEAT — Ley 7/2024 y Decret 75/2020 (Columna 2)**
   - **`2.1 Ingresos Multiformato (Meses · Semanas · Días)`:** Configurador comercial en 3 tarjetas interactivas sobre `26 habitaciones` (`70%` ocup. Año 1 = `240.240 €`; `85%` ocup. Año 2+ = `22,1 hab.` medias = `291.720 €/año`), combinando **Meses** (`17,3h` · `78%` B2B directo a `900 €/mes` = `187.200 €`), **Semanas** (`3,5h` · `16%` a `345 €/sem` = `62.400 €`) y **Días** (`1,3h` · `6%` = `18 noches/hab·año` a `89 €/día` = `42.120 €`) para una tarifa media ponderada resultante de `1.100 €/mes` (`36,16 €/noche` + `10%` IVA hospedaje art. 91.Uno.2.2.º LIVA).
   - **`2.2 Gastos Operativos (OpEx)`:** `124.503 €/año` en crucero (`18.000 €/año` de alquiler subordinado LAU Título III a 25 años con prórrogas potestativas de la S.L. + `106.503 €` operativos del hotel: Personal y recepción 24/7 `39k €`, Limpieza y lavandería textil `22k €`, Comisiones OTA y pasarela `6%`, Luz neta FV/agua/fibra `11,5k €`, Mantenimiento normativo `6,5k €`, Gestoría/seguros/PMS `5,5k €` e IBI y basuras `4,5k €`), logrando `167.217 €/año` de EBITDA neto S.L. (`185.217 €/año` EBITDAR).
   - **Doble contabilidad (PGC PYMES vs. Ajuste Extracontable Art. 103 LIS):** Amortización contable lineal en la S.L. según vida útil real (`2%` obra civil = `15.400 €/a`, `5%` clima e instalaciones = `19.250 €/a`, `10%` equipamiento = `22.000 €/a`; total `56.650 €/a` en A1–A10 y `34.650 €/a` en A11–A20), combinada con amortización fiscal acelerada del `4%` en obra nueva mediante ajuste extracontable (`+15.400 €/año`) y deducibilidad íntegra del canon de alquiler (`18.000 €/año`).
   - **Cascada del Impuesto sobre Sociedades:** Ajuste extracontable de amortización → Reserva de Capitalización (art. 25 LIS, `20%` del beneficio retenido con tope del `25%` en microempresa) → Compensación de BINs (art. 26 LIS) → Tipo reducido de Nueva Creación (`15%` los dos primeros ejercicios positivos) → Escala definitiva de Microempresa (`17%` primeros `50.000 €` y `20%` resto), generando `+413.792 €` de ahorro neto conciliado por palancas en la S.L.
   - **Bonificación IBI Solar en Girona:** `50%` de bonificación municipal durante 5 años conforme al límite de la ordenanza fiscal de Girona (`329,10 €/año`).

3. **Tesorería, *Standstill* Automático, Freno de Barrido y Solvencia Bancaria (Bloques 3 y 4)**
   - **Puente exacto 1:1 Resultados → Caja → Deuda:** Validado mediante suite automatizada de 27 tests (`npm test` en `tests/engine.test.js`), con conciliación fiscal, de cuenta subordinada del socio (`deudaSocio`) y de deuda bancaria auditada al euro.
   - **Subordinación automática del alquiler (*Standstill*) y Prelación de barrido (*Cash Sweep*):** Si el `DSCR` baja de `1,15x` o falta caja libre, la S.L. mantiene la deducción fiscal del alquiler (`art. 11.1 LIS`) pero aplaza automáticamente el pago en cuenta subordinada del propietario (`0%`), limpiando primero la Póliza de Circulante (`5,20%`), liquidando atrasos al socio cuando hay holgura y amortizando anticipadamente la Hipoteca Única (con control interactivo de freno estratégico `Deuda/EBITDA ≤ 3,5x`).
   - **Solvencia en escenarios base y estrés (`3.4 Rentabilidad Socio 25a`):** Caso Base en euros constantes (`IPC 0%`, sin reposición pre-cargada) con **doble lectura de cobertura**: `DSCR neto S.L.` (tras abonar alquiler) de `1,41x` en A1 c/ 6 m de carencia (`1,12x` sin carencia) y `1,59x` en A2 (`1,62x` y `1,76x` pre-canon subordinado *EBITDAR*), cancelación total de deuda en `Año 11 y 9 meses` (`1.973.068 €` caja S.L. + `450.000 €` rentas percibidas = `2.423.068 €` totales), autosuficiencia bajo **Estrés Severo Combinado con *Standstill*** (`DSCR A2 = 1,03x`, póliza A2 `94.831 € < 150.000 €`) y panel consolidado de rentabilidad económica del socio sobre los `600.000 €` de garantía real (`TIR 10,1%`, `VAN +534.576 €` al `6%` y `Payback 14,1 años`).

## Dossier Bancario Editorial A4 (9 Páginas + Word)

El dossier ejecutivo auditado al 100% de ocupación A4 para Comité de Riesgos y Asesoría Jurídica (con Project Monitoring ECO y servidumbres estatutarias de foso, bajantes y cubierta solar) se encuentra en:
- HTML fuente: `docs/editorial/Ramon Turro/2026-10-plan-financiero-estrategia-real/documento.html`
- PDF vectorial (9 págs., 32 marcadores): `docs/editorial/Ramon Turro/2026-10-plan-financiero-estrategia-real/Plan_Financiero_Estrategia_Real_Ramon_Turro.pdf`
- Word editable: `docs/editorial/Ramon Turro/2026-10-plan-financiero-estrategia-real/Plan_Financiero_Estrategia_Real_Ramon_Turro.docx`


---

## Historial de Versiones del Proyecto

### [2.7.0] - 2026-11-17
#### Mejorado (Arquitectura Simétrica de Columnas 1–2–3 y Configurador Multiformato Mes · Semana · Día)
- **Reestructuración lógica y de equilibrio visual en Columna 1 (`1. Patrimonio, Inversión y Deuda`)**: separación nítida entre **`1.1 Propiedad y Garantía`** (activo externo del socio `600.000 €`), **`1.2 Inversión y Obra (CAPEX)`** (consolidando Obra civil `700k €`, Clima y solar `350k €`, Equipamiento `200k €`, Imprevistos `10%`, Duración `9m` y Gastos de obra `9k €` = `1.375.000 €`), **`1.3 Financiación Bancaria`** (Hipoteca Promotora Verde Única `1.375.000 €` a `20 años` al `4,5%` = `8.699 €/mes` sin controles duplicados + Póliza IVA `5,2%`) y **`1.4 Gestión de Deuda`** (trasladado desde la Columna 2 para agrupar *Standstill*, REDEME, barrido de excedentes y freno `Deuda/EBITDA`).
- **Configurador interactivo de Ingresos Multiformato (`Meses · Semanas · Días`) en `2.1 Ingresos` (`src/js/engine.js`, `src/index.html` y `src/js/app.js`)**: nueva función pura `calcularMixComercial` y rejilla de 3 tarjetas simétricas que desglosa en tiempo real habitaciones medias ocupadas, cupos, tarifas y facturación de **Meses** (`17,3h` · `78%` a `900 €/m` = `187.200 €/a`), **Semanas** (`3,5h` · `16%` a `345 €/s` = `62.400 €/a`) y **Días** (`1,3h` · `6%` = `18 noches/hab·año` a `89 €/d` = `42.120 €/a`), reproduciendo al céntimo los `1.100,00 €/mes` (`240.240 €` A1 y `291.720 €` A2+) del Dossier Bancario (`28/28` tests unitarios en verde).
- **Claridad operativa en `2.2 Gastos (OpEx)` y respeto estricto a la altura de la Columna 3**: etiquetado explícito de las 8 partidas operativas (`Alquiler edificio (propiedad)` destacado en cabeza, `Personal y recepción 24/7`, `Limpieza y lavandería textil`, `Comisiones OTA y pasarela`, `Luz (neta FV), agua y fibra`, `Mantenimiento normativo`, `Gestoría, seguros y PMS` e `IBI y tasa de basuras`) manteniendo la altura natural de las Columnas 1 y 2 siempre por debajo del techo marcado por la Columna 3.

### [2.6.0] - 2026-11-16
#### Mejorado (Subordinación Automática del Alquiler *Standstill* y Cuenta de Deuda con el Propietario)
- **Automatización del *Standstill* en el motor (`src/js/config.js` y `src/js/engine.js`)**: cuando el `DSCR` efectivo baja de `1,15x` o el flujo operativo antes de alquiler no alcanza para cubrir deuda e impuestos sin recurrir a la póliza bancaria, la S.L. **mantiene íntegro el gasto devengado en el Impuesto sobre Sociedades** (`art. 11.1 LIS`, sin perder deducción ni BINs), **pospone automáticamente el pago en efectivo** registrándolo en una cuenta subordinada sin intereses a favor del propietario (`deudaSocio`), prioriza el pago al banco y la limpieza de la póliza corta, y **liquida el 100% de los atrasos al socio** en cuanto recupera holgura (rescatando `>+500.000 €` de caja en la S.L. bajo *Estrés Severo* sin que el propietario pierda un solo euro de los `450.000 €`).
- **Visibilidad y control en la interfaz (`src/index.html` y `src/js/app.js`)**: destacado `Alquiler edificio (propiedad)` (`18.000 €/año`) en la primera fila de `2.2 Gastos (OpEx)`, añadido control interactivo `Posposición alquiler si baja DSCR (Standstill)` en `2.4 Gestión de Deuda`, línea dinámica en `3.2 Tesorería` cuando se posponen o liquidan rentas al socio, y visualización directa de las rentas acumuladas (`+450.000 €`) en `3.4 Rentabilidad Socio (25a)`, manteniendo el Caso Base 100% conciliado al euro con el Dossier Bancario (`27/27` tests unitarios en verde).

### [2.5.0] - 2026-11-14
#### Cambiado (Rediseño Página 4: Garantía Real Hipotecaria + Contrato de Alquiler Subordinado a 25 Años)
- **Eliminación integral de la partida de `80.000 € / 85.000 €` en Simulador y Dossier**: suprimidos los deslizadores de pre-inversión dineraria en la S.L. (`#input-project-license` y `#input-purchase-tax-amount`) y toda mención a los `85.000 €` (`55k + 30k`) en las 9 páginas del Dossier Bancario. La propiedad aporta en garantía real de primer rango las **40 fincas privativas sin cargas + el proyecto ejecutivo visado + la licencia municipal concedida** (`~600.000 €` ECO = `~30,4%` de *Equity* real sobre la operación, `0 €` de deuda previa y ahorro de `60–85k €` en ITP/IRPF de traspaso) como **hipotecante no deudor**, mientras la S.L. ejecuta y financia exclusivamente los `1.375.000 €` de rehabilitación llave en mano.
- **Incorporación del Contrato de Arrendamiento Hotelero Subordinado (`18.000 €/año = 1.500 €/mes`)**: añadido deslizador `Alquiler edificio (propiedad)` (`#input-property-rent`, `opex.alquiler = 18.000 €/año` en `2.2 Gastos OpEx`, con `0 €` de carencia técnica durante los 9 meses de obra en Año 0 y plena seguridad ante operaciones vinculadas `art. 18 LIS` bajo contrato LAU Título III *Triple Net* a 25 años sobre el edificio sin reformar), incluyendo **cláusula de posposición bancaria (*Standstill* si `DSCR < 1,15x`)**, pignoración contractual y no-desahucio sin venia bancaria.
- **Doble lectura bancaria de solvencia y rentabilidad consolidada (`src/js/engine.js` y `src/js/app.js`)**: cálculo paralelo de `EBITDAR` (`136.826 €` A1 / `185.217 €` A2+) y `EBITDA neto SL` (`118.826 €` A1 / `167.217 €` A2+), `DSCR neto SL` (`1,41x` A1 c/ 6m carencia, `1,12x` sin ella y `1,59x` A2) frente a `DSCR pre-alquiler subordinado` (`1,62x` A1 c/ 6m y `1,76x` A2), cancelación total de deuda en `Año 11 y 9 meses`, ahorro neto conciliado por palancas en S.L. de `+413.792 €` (`-78.654 €` adicionales en IS gracias al alquiler deducible), liquidez acumulada a 25 años de `1.973.068 €` en S.L. + `450.000 €` en rentas = `2.423.068 €` y panel `3.4 Rentabilidad Socio` referenciado al *Equity* real en garantía (`600.000 €`: `TIR 10,1%`, `VAN +534.576 €`, `Payback 14,1 años`), con `26/26` tests unitarios en verde.
- **Rediseño editorial integral y auditoría cruzada del Dossier Bancario A4 completo (`Páginas 1 a 9`, todas al `99.7%` exacto de ocupación)**:
  - **Auditoría transversal de consistencia (Págs. 1–9)**: unificadas las 9 cabeceras institucionales (`PROYECTO RAMON TURRÓ · GIRONA · DOSSIER DE FINANCIACIÓN BANCARIA`), conciliado el régimen dual `ISP art. 84 LIVA` (`0 €` IVA adelantado en `1,155 M€` obra/clima) + `REDEME` equipos (`46.200 €`; techo prudencial sin ISP `288.750 €` / pico `79.406 €`) en las Páginas 1, 2, 4, 6 y 8, homologado el cómputo de `28 baños completos` entre Páginas 4 y 9, conciliada en Página 5 la senda exacta de IS (`0 €` en `A0–A2` por `-46.556 €` de BINs y `8.045 €` en `A3–A4` al `15%`) e incorporada en Página 3 la escalabilidad operativa con auto check-in BLE y sensores domóticos.
  - **Página 1 (`Portada · Resumen ejecutivo`)**: reestructurada como *Executive Term Sheet* bancario con 5 KPIs decisivos (`1.375.000 €` 20a @ `4,50%` LTV `62,5%`, `~600.000 €` ECO = `30,4%` *Equity*, `167.217 €/año` EBITDA neto / `185.217 €` EBITDAR, DSCR `1,59x` / `1,76x*` y ruptura al `60,0%` · fin deuda en `11a 9m`), **Ficha Técnica de la Operación Solicitada (6 bloques contractuales, incluyendo ISP `art. 84 LIVA` = `0 €` IVA adelantado en obra/clima y pico real de póliza de `30.746 €`)**, **Cuadro de Mando de Solvencia y Suelos de Ruptura en euros constantes `IPC 0%`** comparando lado a lado `Año 1 (70%)`, `Crucero (85%)`, `Refugio 0% Turismo` y `Suelo DSCR 1,00x` (`205.731 €` = `-29,5%` ventas, `15,6 hab.`), **Tesis de Crédito en 4 Pilares** conectada con las Páginas 2 a 9 e índice estructural de cierre.
  - **Página 4**: nuevos KPIs financieros ejecutivos (hipotecante no deudor, accesión arts. 334 CC / 110 LH, contrato LAU a 25 años art. 18 LIS y *Standstill*).
  - **Página 5**: horizonte íntegro `Año 0 a Año 25` con cascada desglosada (`Principal ordinario exigible` vs. `Anticipo voluntario / póliza`), hito del *covenant* en `Año 8` (`526.788 €` = `3,2x EBITDA`, `LTV 23,9%`) y comparativa de las **3 políticas de tesorería y retorno del socio**.
  - **Página 6**: matriz ordenada estrictamente **de mayor a menor criticidad (`Impacto × Probabilidad → Riesgo Residual 10/10 Bajo`)** con colchones cuantificados en cada fila y tabla de **Gobernanza y Verificación Bancaria en 5 fases** (`Notaría + ECO` → `DF + PM + ECO` → `Tasador ECO + DF` → `Pignoración banco` → `Cuentas + IS`).
  - **Página 7**: doble auditoría de solvencia con **Matriz de estrés directa ordenada de menor a mayor tensión** (`DSCR A2: 1,43x → 1,39x → 1,35x → 1,33x → 1,31x`), nuevo escenario auditado **«Modo Refugio 0% Turismo»** (`18,2 hab. a 900 € B2B directo · 0% OTA · DSCR A1 1,27x / A2 1,02x`), **Escalera de supervivencia en 7 escalones y ruptura inversa (*Reverse Stress*)** (`7,2 hab. = 27,6%` para cubrir gastos, `15,6 hab. = 60,0%` o `793 €/mes = 26,1 €/noche` para cubrir hipoteca íntegra y `> 6,0 años` cubiertos al `50%` de ocupación con `195.000 €` de DSRA + Póliza).
  - **Página 8**: auditoría tributaria integral (`Ley 27/2014 LIS` reformada por `Ley 7/2024`, `LIVA`, `LIRPF`, `LIP Catalunya` y `Ordenances Fiscals de Girona`) conciliando los **`+413.792 €` en la SL** (`0 €` IS en `Año 0–Año 2` por absorción de `46.556 €` de BINs, `15%` en `Año 3–Año 4` = solo `8.045 €` acumulados en los primeros 5 años, `2%` contable c/ opción de prórroga `NRV 3.ª PGC` + `4%` fiscal `art. 103 LIS` sin mermar la Reserva de Capitalización del `20%`), incorporando **Inversión del Sujeto Pasivo (`art. 84.Uno.2.º.f` y `art. 20.Uno.22.º.B LIVA`)** sobre los `1.155.000 €` de obra e instalaciones (`0 €` caja adelantada de IVA) combinada con `REDEME + SII (≤ 4 días)` para el equipamiento, **bonificación del ICIO en Girona (`55%–95%` rehabilitación energética Letra A y `90%` accesibilidad)**, **doble amortización legal sin solapamiento Socio (`3%` en IRPF `art. 23.1.b LIRPF`) ↔ SL**, cláusula de obras no sustitutivas de renta y protocolo cronológico de cumplimiento formal (Modelos `036`, `303`, `SII`, `Junta junio` y `200`).
  - **Página 9**: reestructurada íntegramente como **Estado de Mediciones y Precios Unitarios (*Quadre d'Amidaments*, base BEDEC / ITeC Catalunya, PEC s/ IVA con GG+BI de cada industrial)** desglosando las **19 partidas codificadas (`01.01` a `03.05`)** en los 3 capítulos completos (`Cap. 01 Obra Civil 700.000 € = 560,00 €/m²`, `Cap. 02 Instalaciones 350.000 € = 280,00 €/m²` y `Cap. 03 Equipamiento FF&E 200.000 € = 160,00 €/m²` → `1.250.000 €` PEC base = `1.000,00 €/m²` + `125.000 €` contingencia bloqueada 10% = **`1.375.000 €` / `1.100,00 €/m²` / `52.885 €/hab.`**), incluyendo subprecios unitarios internos de cada partida, cuadro de superficies medidas por planta (`PB 50 + P1 400 + P2–P3 800 = 1.250 m²` + cubierta `400 m²`), exclusiones asumidas aparte por la propiedad y garantías de obra (`5%` retención a 12 m, TRC y visado ECO).

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

