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

Simulador interactivo de viabilidad financiera, estructura bancaria y optimización fiscal (horizonte Año 0 + Años 1 a 25) para la rehabilitación y explotación de un edificio de alojamiento con servicios en **C/ Ramon Turró 19, Girona**.

## Arquitectura del Modelo (`src/js/config.js` y `src/js/engine.js`)

1. **Segregación de CAPEX y Financiación Sincronizada (Bloque 1)**
   - **Inmueble aportado y licencias (1.1):** Aportación no dineraria del edificio (80% vuelo amortizable al 2% lineal sin acelerada por ser usado) + gastos de escritura + proyecto técnico y licencia de obras (activados como mayor valor de la obra civil, admitiendo amortización acelerada al 4% según doctrina DGT).
   - **Tres tramos de préstamo francés (1.2 a 1.4):** Hipoteca de Obra Civil (hasta 20 años), Préstamo/Leasing de Instalaciones y Clima (hasta 10 años) y Préstamo/Leasing de Mobiliario y Equipos (hasta 10 años).
   - **Fase de Obra — Año 0 y Póliza de Crédito (1.5):** Carencia de principal durante la obra con devengo de intereses según curva real de certificaciones (50% obra civil, 35% instalaciones, 15% mobiliario). La Póliza de Crédito absorbe la rotación del IVA de obra (con o sin REDEME mensual), los gastos fijos mensuales de obra y los intereses de carencia.

2. **Explotación, IVA y Estrategia Fiscal AEAT — Ley 7/2024 (Bloque 2)**
   - **Hospedaje con servicios periódicos (IVA 10%, art. 91.Uno.2.2º LIVA):** Limpieza periódica interior y cambio semanal de ropa de cama y baño, habilitando la **deducción del 100% del IVA de la obra** y calificando como **actividad económica por sí misma** sin necesidad de contratar personal a jornada completa (art. 5.1 LIS).
   - **Doble contabilidad (PGC PYMES vs. Ajuste Extracontable Art. 103 LIS):** Amortización contable según vida útil real (2% edificio, 2% obra, 5% instalaciones, 10% mobiliario) para presentar un EBIT/EBT sólido ante los bancos, combinada con amortización fiscal acelerada (×2 en elementos nuevos: 4% obra+proyecto, 20% instalaciones y mobiliario) como ajuste extracontable en el Impuesto sobre Sociedades.
   - **Cascada del Impuesto sobre Sociedades:** Ajuste de amortización acelerada → Reserva de Capitalización (art. 25 LIS, 20% del beneficio retenido con límite del 25% de la base en microempresa) → Compensación de BINs (art. 26 LIS) → Tipo de Nueva Creación (15% los 2 primeros ejercicios con base liquidable positiva) → Escala definitiva de Microempresa (17% primeros 50.000 € y 20% resto).
   - **Bonificación IBI Solar en Girona:** 50% de la cuota íntegra durante 5 años con el límite máximo de la ordenanza fiscal de Girona (`329,10 €/año`).

3. **Tesorería, Prelación de Deuda y Solvencia Bancaria (Bloques 3 y 4)**
   - **Puente exacto 1:1 Resultados → Caja → Deuda:** Verificado con suite de tests (`npm test`).
   - **Prelación de barrido de caja (*Cash Sweep*):** 1.º Devolución íntegra de la Póliza de Crédito (corto plazo); 2.º Cancelación anticipada de préstamos a largo plazo ordenados de mayor a menor TIN (manteniendo cuota mensual y reduciendo plazo).
   - **Métricas bancarias y de accionista:** DSCR anual y mínimo, TIR del accionista (con valor residual prudente = Suelo + VNC), VAN (6%), Payback y fecha exacta (año y mes) de extinción de deuda.

## Dossier Editorial para Bancos

El documento ejecutivo en formato A4 que explica toda la estrategia, estructura y reglas normativas del modelo se encuentra en:
- HTML fuente: `docs/editorial/Ramon Turro/2026-10-plan-financiero-estrategia-real/documento.html`
- PDF maquetado: `docs/editorial/Ramon Turro/2026-10-plan-financiero-estrategia-real/Plan_Financiero_Estrategia_Real_Ramon_Turro.pdf`

