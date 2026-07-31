---
title: Suite Business Plans
description: Vista general de la suite de simuladores y planes de negocio interactivos de alta gama.
sidebar:
  order: 3
---

La **Suite Business Plans** es un conjunto de aplicaciones de simulación financiera interactivas diseñadas para proyectar la rentabilidad, flujos de caja y amortizaciones de diversos modelos de negocio.

---

## 📂 Estructura General

Los simuladores de negocio comparten recursos de estilo y se gestionan de manera conjunta:

*   **Ubicación física**: [`apps/business-plans/`](file:///c:/Users/jjtei/Desktop/IA_Proyectos/apps/business-plans)
*   **Estilo Visual**: Tema oscuro premium, tipografías modernas (Outfit/Inter), controles deslizantes fluidos y diseño de alta gama sin emojis en interfaces.
*   **Gestión de Compilación**: Cuenta con un script unificado (`build-all.js`) para empaquetar todas las aplicaciones en una salida unificada.

---

## 📊 Simuladores Financieros Disponibles

Selecciona uno de los simuladores en la barra lateral para ver su análisis detallado:

*   **[Simulador de Caravanas](file:///c:/Users/jjtei/Desktop/IA_Documentacion/src/docs/src/content/docs/proyectos-ia/business-plans/app-bp-caravanas.md)**: Proyección de pupilaje y custodia de vehículos recreativos en naves industriales.
*   **[Simulador de Trasteros](file:///c:/Users/jjtei/Desktop/IA_Documentacion/src/docs/src/content/docs/proyectos-ia/business-plans/app-bp-comunidad-trasteros.md)**: Simulador financiero de rentabilidad y tasas de retorno para self-storage urbano.
*   **[Simulador de Velero](file:///c:/Users/jjtei/Desktop/IA_Documentacion/src/docs/src/content/docs/proyectos-ia/business-plans/app-bp-velero.md)**: Evaluador de amortización, costes fijos y chárter de embarcaciones.

---

## 🛠️ Desarrollo y Despliegue

La suite cuenta con un orquestador que compila todos los proyectos y los mueve a una carpeta unificada para su publicación estática en la nube:

```bash
cd apps/business-plans
npm install
npm run build   # Ejecuta build-all.js y compila todas las apps en dist_global/
```

El despliegue se gestiona a través de targets de Firebase Hosting asociados a cada subproyecto.
