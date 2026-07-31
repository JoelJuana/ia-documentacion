---
title: Velero
description: Ficha de documentación detallada del simulador financiero para el modelo de negocio de adquisición y chárter de embarcaciones.
sidebar:
  order: 4
---

El **Simulador de Velero** (`app-bp-velero`) es una calculadora financiera interactiva desarrollada en **Vanilla Javascript** orientada a evaluar la rentabilidad de adquirir una embarcación de recreo para su explotación comercial en régimen de chárter náutico.

---

## 📋 Identificación del Proyecto

*   **Ruta física**: [`apps/business-plans/app-bp-velero/`](file:///c:/Users/jjtei/Desktop/IA_Proyectos/apps/business-plans/app-bp-velero)
*   **Tecnologías**: Vanilla HTML5, CSS Custom Variables, Vanilla JS ES6 modular.
*   **Autor**: JoelJuana
*   **Creado el**: 2026-06-28

---

## ⚙️ Características Técnicas y Funcionales

Este simulador permite a inversores o armadores calcular la viabilidad de la compra de un barco analizando costes fijos marítimos vs. ingresos de charter en temporada alta/baja:

### 1. Variables de Entrada (Inputs)
*   **Inversión Inicial**: Precio de compra del barco (nuevo o de ocasión) más gastos de matriculación, ITB y equipo de seguridad obligatorio (zona 2/4).
*   **Coste de Amarre Anual**: Precio del derecho de amarre en puerto deportivo según eslora y manga del velero.
*   **Gastos Fijos Anuales**: Seguro a todo riesgo marítimo con franquicia, mantenimiento preventivo anual (antifouling/patente, revisión de motor, jarcia y velas).
*   **Semanas de Chárter Estimadas**: Número de semanas al año que se espera alquilar la embarcación (temporada alta, media y baja).
*   **Precio de Alquiler por Semana**: Tarifas estimadas por temporada.
*   **Comisión de Agencia**: Porcentaje cobrado por portales o brokers de chárter (usualmente entre 15% y 20%).

### 2. Cálculos Financieros Realizados
*   **Punto de Equilibrio de Semanas**: Cuántas semanas completas debe alquilarse el velero anualmente para cubrir los costes de mantenimiento y amarre sin pérdidas.
*   **Amortización de la Embarcación**: Tiempo estimado para recuperar la inversión inicial basándose en el beneficio operativo neto anual.
*   **Coste de Oportunidad**: Comparación del beneficio neto frente a una inversión conservadora en fondos indexados o depósitos a plazo fijo.
*   **Cálculo de Flujo de Caja**: EBITDA mensual contemplando que los ingresos se concentran en los meses de verano, mientras que los costes de amarre y mantenimiento son constantes.

---

## 🖥️ Libro de Estilo e Interfaz

La aplicación se diseñó respetando la estética marina y premium:
*   **Estilo Visual**: Tema oscuro náutico, con colores Slate, azules oscuros HSL `#075e9b` y acentos celestes para evocar el entorno marino.
*   **Layout Adaptable**: Diseñado de forma responsiva utilizando Grid y Flexbox nativos, facilitando su visualización y uso desde dispositivos móviles a pie de puerto.
