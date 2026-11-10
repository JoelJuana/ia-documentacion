---
title: gestiona_business_plan
description: Estándar técnico, guía y plantilla base para simuladores financieros y Business Plans interactivos con fiscalidad AEAT avanzada y sincronización remota en la nube.
---

*   **Ruta de Configuración**: `IA_Configuracion/skills/gestiona_business_plan/SKILL.md`

---

# Habilidad: gestiona_business_plan

Esta habilidad establece el estándar de desarrollo y la arquitectura de los simuladores financieros y Business Plans interactivos del monorrepositorio (`apps/business-plans/`).

## Libro de Estilo Corporativo Unificado
Todos los simuladores deben compartir exactamente la misma línea estética limpia, directa y sin ruido visual:
- **Tipografías**: `'Outfit'` (Títulos, métricas y KPIs) e `'Inter'` (Cuerpo de texto, etiquetas y datos).
- **Fondo General**: `#080c14`
- **Tarjetas / Contenedores**: `rgba(13, 20, 35, 0.75)` con borde `rgba(255, 255, 255, 0.07)`.
- **Top Header Bar Sticky (`sticky top-0 z-50` con Smart Auto-Hide)**:
  - **Grilla Unificada 3x2 (6 cajas)**:
    1. **Título del Proyecto** (con icono temático y truncado en 1 línea).
    2. **Capital Inversión (Equity)** (`kpi-equity-total`).
    3. **EBITDA Anual / Gasto Anual** (`kpi-ebitda-annual`).
    4. **Rentabilidad / Cobertura** (`kpi-roi-ebitda`).
    5. **Extinción Deuda / Horizonte** (`kpi-debt-extinction`).
    6. **Selector de Año interactivo** (`btn-year-prev`, `btn-year` [1, 5, 10], `btn-year-next`).
  - **Sin barras secundarias ni widgets superfluos**: Queda prohibido añadir barras superiores de escenarios (Conservador/Base/Optimista), matrices de sensibilidad o gráficas decorativas que recarguen la pantalla.
  - **Smart Auto-Hide (`initAutohideHeader`)**: al hacer scroll hacia abajo la cabecera se oculta suavemente (`-translate-y-full`), y al hacer scroll hacia arriba reaparece (`translate-y-0`).

## Layout Estándar de 3 Columnas por Fases (Grid `grid-cols-1 lg:grid-cols-3`)
1. **Columna 1 (Izquierda - 1. Inversión & Financiación)**:
   - Hipótesis de Inversión Inicial / CAPEX (Adquisición de Inmueble, Reforma, Mobiliario, Vehículo o Embarcación).
   - Módulos de Financiación y Préstamos Bancarios (Porcentajes, Intereses, Plazos y Deducciones).
2. **Columna 2 (Centro - 2. Explotación & Operativa)**:
   - Hipótesis de Ingresos de Negocio (Tarifas, Rentas, Unidades, Días de Chárter, Ocupación).
   - Hipótesis de Gastos Operativos OpEx (Suministros, IBI, Mantenimiento, Seguros, Gestoría, Personal, Comunidad).
3. **Columna 3 (Derecha - Resultados Financieros Consolidados, Tesorería & Deuda)**:
   - **`3. Resultados (P&G Contable AEAT)`**:
     - P&G por partidas (Ingresos, OpEx, EBITDA, Amortización, EBIT, Intereses, EBT).
     - Bloque Fiscal AEAT agrupado (Impuesto de Sociedades Neto, Escudo Fiscal Ahorro Directo 25% IS y BINs compensables).
     - Beneficio Neto Contable como cierre final de la tarjeta.
   - **`4. Flujo de Caja Real & Deuda` (`#bloque-cashflow`)**:
     - Movimientos reales en metálico (EBITDA (+), Cuota Banco (-) con desglose `Intereses` + `Principal`, IS Pagado (-), Cash Flow Neto Anual (=)).
     - Tesorería Acumulada en Banco, Capital Pendiente de Recuperar (Payback) y **Deuda Viva Pendiente** (`Principal a Cancelar Hoy` + `Intereses Futuros Restantes`).
   - **`Regla de Estandarización de Filas y Cajas`**:
     - Todos los subtotales/totales (`+ Ingresos`, `- OpEx`, `= EBITDA`, `= EBIT`, `= EBT`, `= Beneficio Neto`, `= Cash Flow Anual`, `💰 Tesorería`, `🏦 Deuda Viva`) deben usar el MISMO contenedor: `py-2 px-3.5 rounded-lg border font-bold text-xs sm:text-sm font-heading flex justify-between items-center`.

## Estándar Obligatorio del Cuadro Proyección Multianual (Años 1 a 25)
1. **Sin Redundancias de Texto**: La primera columna lleva la cabecera `Periodo` -> `Año` y las celdas muestran el número del ejercicio (`1`, `2`, `3`...), resaltando con badge `Caja ≥ Deuda` el primer año libre de deuda neta.
2. **Columna "Año" y Cabeceras Fijas (Sticky 100% Responsive Mobile)**:
   - Cabecera fija (`sticky top-0 z-30`) y primera columna fija en horizontal (`sticky left-0 z-20 bg-slate-900`).
3. **Interactividad Total**: Hacer clic en cualquier fila selecciona ese ejercicio (`window.selectYearFromTable(year)`), sincroniza en la nube y actualiza las tarjetas de P&G, Flujo de Caja y Balance.

## Reglas de Rigor Financiero, Auditoría Bancaria y Librería Compartida (`bp-core.js`)
1. **Librería Compartida (`apps/business-plans/shared/bp-core.js`)**:
   - Todos los simuladores deben importar las utilidades comunes desde `../../shared/bp-core.js` (`formatCurrency`, `formatNumber`, `initAutohideHeader`, `initYearButtons`, `createCloudSync`, `exportToCSV`, `bindTooltipSystem`).
2. **CAPEX Total de la Operación vs. Base Financiable LTV**:
   - `capexTotal` debe reflejar el coste total real de la inversión (`capexFinanciable + costesTramites`), incluyendo gastos de escritura, AJD, licencias de obra y honorarios técnicos, explicando en su tooltip qué importe constituye la base financiable mediante hipoteca/préstamo y qué importe se cubre con fondos propios (*Equity*).
3. **Límite de Póliza de Crédito (TVA / Circulante)**:
   - El límite recomendado de póliza de crédito (`limitePoliza` / `necesidadMaximaPoliza`) debe calcularse evaluando el máximo global de toda la proyección (`0..25` años): `Math.max(picoIvaPoliza + polizaDispuestaAno0, maxPolizaCierre)`, garantizando que cubra tanto el puente de IVA del Año 0 como cualquier déficit transitorio de explotación durante el *ramp-up*.
4. **Desglose Explícito en Tooltips Contables y Fiscales**:
   - En el bloque `3. Resultados (P&G Contable AEAT)`, las partidas de amortización deben indicar explícitamente la tasa anual y la base amortizable de cada componente (p. ej., `2%` sobre construcción excluido suelo y `2%`/`5%`/`10%` sobre obra civil, instalaciones y mobiliario), diferenciando entre amortización contable (PGC) y ajuste extracontable de amortización fiscal acelerada (Art. 103 LIS).
5. **Sincronización Inicial de HTML Estático y Dossier Bancario PDF**:
   - Los valores por defecto renderizados en `src/index.html` deben coincidir exactamente con el escenario base de `src/js/engine.js` para evitar parpadeos (*flash of stale values*) al cargar la página.
   - Si el proyecto dispone de Dossier Bancario en el Centro Editorial (`docs/editorial/`), el archivo PDF compilado debe copiarse también en `src/public/docs/` del simulador para que el botón de descarga sirva siempre la última versión auditada.
