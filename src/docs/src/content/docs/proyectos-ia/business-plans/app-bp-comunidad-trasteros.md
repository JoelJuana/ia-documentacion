---
title: Trasteros
description: Ficha de documentación detallada del simulador financiero para el modelo de negocio de alquiler de trasteros y self-storage.
sidebar:
  order: 3
---

El **Simulador de Trasteros** (`app-bp-comunidad-trasteros`) es una herramienta interactiva desarrollada en **Vanilla Javascript** diseñada para evaluar la rentabilidad del desarrollo y alquiler de trasteros urbanos y almacenes de autoalmacenamiento (self-storage).

---

## 📋 Identificación del Proyecto

*   **Ruta física**: [`apps/business-plans/app-bp-comunidad-trasteros/`](file:///c:/Users/jjtei/Desktop/IA_Proyectos/apps/business-plans/app-bp-comunidad-trasteros)
*   **Tecnologías**: Vanilla HTML5, CSS3 Custom Properties (variables HSL), Vanilla JS ES6 modular.
*   **Autor**: JoelJuana
*   **Creado el**: 2026-06-28

---

## ⚙️ Características Técnicas y Funcionales

Este simulador permite evaluar el potencial de adecuación de locales comerciales a trasteros mediante las siguientes métricas:

### 1. Variables de Entrada (Inputs)
*   **Superficie Útil Local**: Metros cuadrados totales disponibles para construir.
*   **Eficiencia de Distribución**: Porcentaje del local destinado a trasteros útiles vs. pasillos comunes (usualmente entre 65% y 75%).
*   **Coste de Construcción por m²**: Precio de la tabiquería de chapa galvanizada, puertas y pasillos por metro cuadrado útil.
*   **Distribución de Tamaños**: Porcentaje de trasteros Pequeños (1-2 m²), Medianos (3-4 m²) y Grandes (>5 m²).
*   **Precio de Alquiler por m²**: Tarifa mensual promedio por cada tamaño de trastero.
*   **Gasto de Gestión y Seguridad**: Cuota mensual de mantenimiento de software de accesos, alarma y limpieza.

### 2. Cálculos Financieros Realizados
*   **TIR (Tasa Interna de Retorno)**: Rentabilidad anualizada del proyecto calculada en un horizonte de 5 y 10 años.
*   **VAN (Valor Actual Neto)**: Valor presente de los flujos de caja netos futuros descontados a una tasa mínima de rentabilidad exigida (tasa de descuento).
*   **Payback Period**: Tiempo exacto en años y meses necesarios para amortizar el coste de adecuación metálica del local.
*   **Evolución de Flujo de Caja**: Gráfico lineal dinámico que visualiza los ingresos brutos, gastos fijos y EBITDA estimado a lo largo del tiempo.

---

## 🖥️ Libro de Estilo e Interfaz

La aplicación se diseñó de forma nativa para cargar instantáneamente sin librerías externas:
*   **Estilo Visual**: Tema oscuro minimalista, bordes redondeados y uso de degradados cian y morado en indicadores clave.
*   **Interacciones Reactivas**: El cálculo se desencadena de manera síncrona en el evento `input` de los formularios de configuración, actualizando los resultados en el DOM sin recargas de página.
