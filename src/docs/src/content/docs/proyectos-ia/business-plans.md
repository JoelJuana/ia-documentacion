---
title: Proyectos - Suite Business Plans (Simuladores Financieros)
description: Ficha de la suite de simuladores y planes de negocio interactivos de alta gama.
---

La **Suite Business Plans** es un conjunto de aplicaciones de simulación financiera interactivas diseñadas para proyectar la rentabilidad, flujos de caja y amortizaciones de diversos modelos de negocio.

---

## Ficha de Identificación

*   **Ruta en el Monorepositorio**: [\`apps/business-plans/\`](file:///c:/Users/jjtei/Desktop/Proyectos_IA/apps/business-plans)
*   **Tipo**: Frontend (React / Vanilla JS)
*   **Estética Visual**: Tema oscuro premium, fuentes modernas (Inter/Outfit), gráficos vectoriales de alta precisión, y microanimaciones interactivas.
*   **Proyectos Activos Integrados**:
    1.  `app-bp-velero`: Planificador de amortización y costes para embarcaciones recreativas (Vanilla JS).
    2.  `app-bp-comunidad-trasteros`: Simulador financiero para proyectos de self-storage / trasteros (Vanilla JS).
    3.  `app-bp-caravanas`: Analizador de pupilaje y custodia de caravanas en naves industriales (React).

---

## Estructura del Directorio

Los proyectos están alojados bajo una estructura compartida que unifica el build global:

```
business-plans/
├── app-bp-caravanas/           # Aplicación en React
├── app-bp-comunidad-trasteros/ # Aplicación en Vanilla HTML/JS
├── app-bp-velero/               # Aplicación en Vanilla HTML/JS
├── dist_global/                 # Carpeta de salida del build unificado
├── landing/                     # Landing page de acceso a la suite
├── package.json                 # Scripts de bootstrap y build total
└── build-all.js                 # Script que automatiza la compilación de la suite
```

### Características de Diseño
*   **Estilo Unificado**: Todas las herramientas financieros heredan estilos consistentes basados en tipografías Google Fonts (Outfit) y paletas HSL oscuras de alta gama proporcionadas por el Gateway de diseño.
*   **Simulación en Tiempo Real**: Calculadoras reactivas que recalculan impuestos, tasas de interés, amortizaciones y flujos de caja netos inmediatamente al deslizar o editar inputs.

---

## Compilación y Despliegue

La suite cuenta con un orquestador que compila todos los proyectos y los mueve a una carpeta unificada para su publicación estática en la nube:

```bash
cd apps/business-plans
npm install
npm run build   # Ejecuta build-all.js y compila todas las apps en dist_global/
```

El despliegue se gestiona a través de targets de Firebase Hosting asociados a cada subproyecto.
