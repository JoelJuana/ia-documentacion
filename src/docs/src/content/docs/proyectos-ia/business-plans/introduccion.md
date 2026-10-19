---
title: Suite Business Plans
description: Vista general de la suite de simuladores y planes de negocio interactivos con fiscalidad avanzada y sincronización cloud.
sidebar:
  order: 1
---

La **Suite Business Plans** es un conjunto de aplicaciones de simulación financiera interactivas diseñadas para proyectar la rentabilidad, flujos de caja, fiscalidad AEAT y amortizaciones de diversos modelos de negocio e inversión patrimonial.

---

## Estructura General

Los simuladores de negocio comparten recursos de estilo y estándares arquitectónicos definidos en la habilidad [`gestiona_business_plan`](/agente/skills/gestiona_business_plan/):

*   **Ubicación física**: [`apps/business-plans/`](file:///c:/Users/jjtei/Desktop/IA_Proyectos/apps/business-plans)
*   **Estilo Visual**: Tema oscuro/claro corporativo, tipografías modernas (Outfit/Inter), controles deslizantes fluidos y gráficos interactivos con Chart.js.
*   **Despliegue Granular**: Cada simulador se compila y despliega de forma individual en su propio canal/subdominio de Firebase Hosting Multisite.

---

## Simuladores Financieros Disponibles (5)

Selecciona uno de los simuladores para consultar su ficha técnica detallada:

<div class="dashboard-grid">
  <a href="/proyectos-ia/business-plans/app-bp-caravanas/" class="dashboard-card">
    <h3>app-bp-caravanas</h3>
    <p>Analizador de modelo de negocio para alquiler de caravanas en naves industriales.</p>
  </a>
  <a href="/proyectos-ia/business-plans/app-bp-ramon-turro/" class="dashboard-card">
    <h3>app-bp-ramon-turro</h3>
    <p>Simulador de viabilidad financiera para modelos de explotación inmobiliaria (Hotel Boutique, Coliving, Alquiler Tradicional) en Ramón Turró, Girona.</p>
  </a>
  <a href="/proyectos-ia/business-plans/app-bp-velero/" class="dashboard-card">
    <h3>app-bp-velero</h3>
    <p>Planificador de inversión y amortización para adquisición de embarcaciones recreativas.</p>
  </a>
  <a href="/proyectos-ia/business-plans/app-bp-inversion-compra-piso/" class="dashboard-card">
    <h3>app-bp-inversion-compra-piso</h3>
    <p>Simulador genérico de viabilidad y Business Plan para adquisición, reforma y explotación inmobiliaria de piso.</p>
  </a>
  <a href="/proyectos-ia/business-plans/app-bp-cuidadora-abuela/" class="dashboard-card">
    <h3>app-bp-cuidadora-abuela</h3>
    <p>Simulador de costes y Business Plan de cuidados asistenciales para contratación de cuidadora del hogar, Seguridad Social y consumo de patrimonio.</p>
  </a>
</div>

*   **[app-bp-caravanas](/proyectos-ia/business-plans/app-bp-caravanas/)**: Analizador de modelo de negocio para alquiler de caravanas en naves industriales. — [ Producción](https://caravanas.gironacc.com)
*   **[app-bp-ramon-turro](/proyectos-ia/business-plans/app-bp-ramon-turro/)**: Simulador de viabilidad financiera para modelos de explotación inmobiliaria (Hotel Boutique, Coliving, Alquiler Tradicional) en Ramón Turró, Girona. — [ Producción](https://ramon-turro.gironacc.com)
*   **[app-bp-velero](/proyectos-ia/business-plans/app-bp-velero/)**: Planificador de inversión y amortización para adquisición de embarcaciones recreativas. — [ Producción](https://velero.gironacc.com)
*   **[app-bp-inversion-compra-piso](/proyectos-ia/business-plans/app-bp-inversion-compra-piso/)**: Simulador genérico de viabilidad y Business Plan para adquisición, reforma y explotación inmobiliaria de piso. — [ Producción](https://compra-piso.gironacc.com)
*   **[app-bp-cuidadora-abuela](/proyectos-ia/business-plans/app-bp-cuidadora-abuela/)**: Simulador de costes y Business Plan de cuidados asistenciales para contratación de cuidadora del hogar, Seguridad Social y consumo de patrimonio. — [ Producción](https://cuidadora-abuela.gironacc.com)


---

## Desarrollo y Despliegue Individual

Para trabajar sobre un simulador específico sin recompilar toda la suite:

```bash
cd apps/business-plans/<nombre-app>
npm install
npm run dev     # Entorno local interactivo
npm run build   # Compila únicamente el subproyecto activo
```
