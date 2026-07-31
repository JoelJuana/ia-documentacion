---
title: Caravanas
description: Ficha de documentación detallada del simulador financiero para el modelo de negocio de alquiler de plazas de caravanas.
sidebar:
  order: 2
---

El **Simulador de Caravanas** (`app-bp-caravanas`) es una aplicación interactiva desarrollada en **React** diseñada para analizar la viabilidad económica del negocio de pupilaje y custodia de caravanas, autocaravanas y furgonetas camper en naves industriales.

---

## 📋 Identificación del Proyecto

*   **Ruta física**: [`apps/business-plans/app-bp-caravanas/`](file:///c:/Users/jjtei/Desktop/IA_Proyectos/apps/business-plans/app-bp-caravanas)
*   **Tecnologías**: React, Tailwind CSS / Vanilla CSS, gráficos dinámicos interactivos, almacenamiento de estado local (LocalStorage).
*   **Autor**: JoelJuana
*   **Creado el**: 2026-07-06

---

## ⚙️ Características Técnicas y Funcionales

El simulador permite evaluar de forma reactiva las variables clave del negocio:

### 1. Variables de Entrada (Inputs)
*   **Capacidad de la Nave**: Número total de plazas disponibles (calculado por dimensiones de la nave y pasillos de maniobra).
*   **Precio del Alquiler de la Nave**: Coste mensual de alquiler del espacio físico por metro cuadrado o precio total.
*   **Inversión Inicial en Adecuación**: Costes de instalación de sistemas de seguridad (CCTV, alarma contra incendios), accesos automáticos, tomas de corriente y puntos de agua/vaciado.
*   **Tarifas de Pupilaje**: Tarifa mensual promedio según tipo de vehículo (caravanas, autocaravanas grandes, campers).
*   **Gastos Operativos (Opex)**: Seguros de responsabilidad civil, consumos de electricidad/agua, mantenimiento general, limpieza y publicidad mensual.

### 2. Cálculos Financieros Realizados
*   **Punto de Equilibrio (Break-Even)**: Número de plazas que deben alquilarse mensualmente para cubrir la totalidad de costes fijos.
*   **Margen de Contribución Plazo**: Beneficio neto por plaza tras deducir los costes variables directos (consumo eléctrico medio).
*   **Proyección de Pérdidas y Ganancias (P&G)**: Estimaciones a 1, 3 y 5 años contemplando tasas de ocupación progresivas (ej. 30% inicial, 80% estabilizado).
*   **Retorno de Inversión (ROI)**: Tiempo estimado para recuperar la adecuación inicial en base a los flujos netos acumulados.

---

## 🖥️ Libro de Estilo e Interfaz

La aplicación se adhiere al sistema de diseño unificado del monorepositorio:
*   **Tipografía**: Outfit para títulos destacados, Inter para cuerpo de datos.
*   **Paleta de Colores**: Tema oscuro con fondo HSL `#0f172a` (Slate-900), tarjetas HSL `#1e293b` (Slate-800) y acentos en verde esmeralda y cian para indicadores financieros positivos.
*   **Interactividad**: Inputs de rango (`<input type="range">`) para ajustar la ocupación y tarifas en caliente, recalculando los gráficos del flujo de caja al instante.
