---
title: "app-bp-compra-farmacia"
description: "Ficha técnica y documentación de la aplicación Business Plan · Compra de Farmacia (app-bp-compra-farmacia)."
---

*   **Ruta física**: [`apps/business-plans/app-bp-compra-farmacia/`](file:///C:/Users/jjtei/Desktop/IA_Proyectos/apps/business-plans/app-bp-compra-farmacia)
*   **Nombre Comercial**: Business Plan · Compra de Farmacia
*   **Tipo**: `vanilla`
*   **Creado el**: 2026-10-31
*   **Autor**: JoelJuana
*   **URL Pública**: [https://compra-farmacia.gironacc.com](https://compra-farmacia.gironacc.com)
*   **Etiquetas**: `Finanzas`, `Business Plan`, `Farmacia`, `IRPF`

---

# Business Plan: Compra de Farmacia · Adquisición por Tramos e IRPF

Simulador interactivo de viabilidad financiera, estructura bancaria y planificación fiscal en IRPF (horizonte Año 0 + Años 1 a 25) para la adquisición de una **Oficina de Farmacia**, permitiendo comparar en tiempo real la **compra directa al 100%** frente a la **compra progresiva por fases (p. ej. 50% en Año 1 en Comunidad de Bienes + 50% restante en el Año N)** tanto desde la perspectiva del **Farmacéutico Comprador** como del **Farmacéutico Vendedor**.

## Características Principales (`src/js/config.js` y `src/js/engine.js`)

1. **Compra Graduable por Tramos (100% Inicial vs Fase 1 + Fase 2 en Comunidad de Bienes)**
   - Permite graduar el **% de Compra Inicial (Tramo 1)** entre el `10%` y el `100%` y elegir el **Año de Compra del Tramo 2** (del Año 2 al Año 15).
   - Mientras el vendedor conserva el porcentaje restante, la farmacia opera en **Comunidad de Bienes (C.B.)** en régimen de atribución de rentas (Art. 8 y 89 LIRPF): el vendedor sigue percibiendo su porcentaje del EBITDA anual y el comprador amortiza aceleradamente la deuda del Tramo 1 antes de adquirir el Tramo 2.
   - Calcula al euro **qué percibe el Comprador** (Renta neta, escudo fiscal, tesorería acumulada y extinción de deuda) y **qué percibe el Vendedor** (Cobro Venta Tramo 1 + Rentas de explotación durante los años de cotitularidad + Cobro Venta Tramo 2, neto de su IRPF en la Base del Ahorro y General).

2. **Fiscalidad Específica de Oficina de Farmacia (IRPF por Tramos, Sin Impuesto de Sociedades)**
   - **Escala General del IRPF (Estatal + Autonómica de Cataluña):** Tramos progresivos del `19,5%` al `50,0%` con mínimo personal y cálculo en tiempo real del tipo medio efectivo y del tipo marginal alcanzado cada año.
   - **Amortización Fiscal del Fondo de Comercio (7,5% anual ERD):** Deducción del `7,5%` anual sobre el valor del Fondo de Comercio del Tramo 1 y del Tramo 2 (Art. 12.2 y 103.5 LIS por remisión del Art. 28 LIRPF), generando un escudo fiscal que no sale de caja y se destina a amortizar principal bancario.
   - **Incentivos en IRPF del Farmacéutico:** Reducción del `20%` por inicio de actividad económica (Art. 32.3 LIRPF), Plan de Pensiones Simplificado de Autónomos (`5.750 €/año`, Art. 52.1 LIRPF), amortización acelerada `2x` de robot y reforma (`20%` anual) y deducción de seguro médico familiar (`1.500 €/año`, Art. 30.2.5ª LIRPF).

