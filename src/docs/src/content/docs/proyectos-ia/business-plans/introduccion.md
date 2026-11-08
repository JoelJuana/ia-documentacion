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

## Simuladores Financieros Disponibles (6)

Selecciona uno de los simuladores para consultar su ficha técnica detallada:

<div class="dashboard-grid">
  <a href="/proyectos-ia/business-plans/app-bp-caravanas/" class="dashboard-card">
    <span class="card-meta">app-bp-caravanas</span>
    <h3>Business Plan · Parking Caravanas</h3>
    <p>Simulador financiero y fiscal de modelo de negocio para custodia y alquiler de caravanas en naves industriales.</p>
  </a>
  <a href="/proyectos-ia/business-plans/app-bp-ramon-turro/" class="dashboard-card">
    <span class="card-meta">app-bp-ramon-turro</span>
    <h3>Business Plan · Ramón Turró (Girona)</h3>
    <p>Modelo financiero y fiscal a 25 años para rehabilitación y explotación de hotel de 26 habitaciones en C/ Ramon Turró (Girona), con dossier bancario A4 de 9 páginas.</p>
  </a>
  <a href="/proyectos-ia/business-plans/app-bp-compra-farmacia/" class="dashboard-card">
    <span class="card-meta">app-bp-compra-farmacia</span>
    <h3>Business Plan · Compra de Farmacia</h3>
    <p>Simulador comparativo Comprador vs Vendedor para compraventa de Oficina de Farmacia (2 M€): 6 opciones estratégicas, S.L. de Parafarmacia, Fondo de Comercio (7,5%) e IRPF/IS.</p>
  </a>
  <a href="/proyectos-ia/business-plans/app-bp-velero/" class="dashboard-card">
    <span class="card-meta">app-bp-velero</span>
    <h3>Business Plan · Inversión Velero</h3>
    <p>Planificador de inversión, explotación en chárter, financiación y amortización fiscal para adquisición de embarcaciones recreativas.</p>
  </a>
  <a href="/proyectos-ia/business-plans/app-bp-inversion-compra-piso/" class="dashboard-card">
    <span class="card-meta">app-bp-inversion-compra-piso</span>
    <h3>Business Plan · Inversión Compra Piso</h3>
    <p>Simulador de viabilidad financiera y fiscal para adquisición, reforma, hipoteca y explotación en alquiler de vivienda.</p>
  </a>
  <a href="/proyectos-ia/business-plans/app-bp-cuidadora-abuela/" class="dashboard-card">
    <span class="card-meta">app-bp-cuidadora-abuela</span>
    <h3>Business Plan · Cuidados Asistenciales</h3>
    <p>Simulador de costes y planificación familiar para contratación de cuidadora del hogar, Seguridad Social, ayudas de dependencia y consumo de patrimonio.</p>
  </a>
</div>

*   **[app-bp-caravanas](/proyectos-ia/business-plans/app-bp-caravanas/)** (*Business Plan · Parking Caravanas*): Simulador financiero y fiscal de modelo de negocio para custodia y alquiler de caravanas en naves industriales. — [Producción](https://caravanas.gironacc.com)
*   **[app-bp-ramon-turro](/proyectos-ia/business-plans/app-bp-ramon-turro/)** (*Business Plan · Ramón Turró (Girona)*): Modelo financiero y fiscal a 25 años para rehabilitación y explotación de hotel de 26 habitaciones en C/ Ramon Turró (Girona), con dossier bancario A4 de 9 páginas. — [Producción](https://ramon-turro.gironacc.com)
*   **[app-bp-compra-farmacia](/proyectos-ia/business-plans/app-bp-compra-farmacia/)** (*Business Plan · Compra de Farmacia*): Simulador comparativo Comprador vs Vendedor para compraventa de Oficina de Farmacia (2 M€): 6 opciones estratégicas, S.L. de Parafarmacia, Fondo de Comercio (7,5%) e IRPF/IS. — [Producción](https://compra-farmacia.gironacc.com)
*   **[app-bp-velero](/proyectos-ia/business-plans/app-bp-velero/)** (*Business Plan · Inversión Velero*): Planificador de inversión, explotación en chárter, financiación y amortización fiscal para adquisición de embarcaciones recreativas. — [Producción](https://velero.gironacc.com)
*   **[app-bp-inversion-compra-piso](/proyectos-ia/business-plans/app-bp-inversion-compra-piso/)** (*Business Plan · Inversión Compra Piso*): Simulador de viabilidad financiera y fiscal para adquisición, reforma, hipoteca y explotación en alquiler de vivienda. — [Producción](https://compra-piso.gironacc.com)
*   **[app-bp-cuidadora-abuela](/proyectos-ia/business-plans/app-bp-cuidadora-abuela/)** (*Business Plan · Cuidados Asistenciales*): Simulador de costes y planificación familiar para contratación de cuidadora del hogar, Seguridad Social, ayudas de dependencia y consumo de patrimonio. — [Producción](https://bp-cuidadora-abuela.web.app)


---

## Desarrollo y Despliegue Individual

Para trabajar sobre un simulador específico sin recompilar toda la suite:

```bash
cd apps/business-plans/<nombre-app>
npm install
npm run dev     # Entorno local interactivo
npm run build   # Compila únicamente el subproyecto activo
```
