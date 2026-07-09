---
title: Proyecto - Documentación Farmacia (Planas Morell)
description: Ficha del portal de procedimientos clínicos, logísticos y organizativos de la Farmacia Planas Morell.
---

**Documentación Farmacia** es una plataforma de documentación interna y aseguramiento de calidad diseñada para la **Farmacia Planas Morell**, construida con el objetivo de validar y servir los procedimientos normalizados de trabajo (SOPs).

---

## Ficha de Identificación

*   **Nombre de Carpeta**: `app-documentacion-farmacia`
*   **Ruta en el Monorepositorio**: [\`apps/documentacion/app-documentacion-farmacia/\`](file:///c:/Users/jjtei/Desktop/Proyectos_IA/apps/documentacion/app-documentacion-farmacia)
*   **Tipo**: Frontend (Astro Starlight + Firebase Hosting)
*   **Cliente / Cliente de Destino**: Farmacia Planas Morell
*   **Fecha de Creación**: 2026-07-05

---

## Funcionalidades del Portal

El portal organiza toda la documentación clínica y operativa bajo directrices rígidas de no-mezcla de estilos (*mode-mixing*) mediante su validador automático:

### Categorías de Procedimientos Alojados
1.  **Organización y RRHH**: Manuales de puestos (DPTs), acuerdos de nivel de servicio (SLA) para un flujo de "0 colas" en el mostrador, y manual de acogida para nuevos empleados.
2.  **Procedimientos Logísticos (SOP-LOG)**: Gestión de pedidos directos y mayoristas, control de caducidades de medicamentos en estanterías, y gestión de residuos SIGRE.
3.  **Procedimientos Clínicos (SOP-CLIN)**: Protocolo de custodia de sustancias estupefacientes, elaboración de fórmulas magistrales en el laboratorio de la farmacia, y dosificación de sistemas personalizados (SPD).
4.  **Ventas y Operaciones (SOP-OPER)**: Preparación de guardias nocturnas, promociones y visual merchandising de escaparates.

---

## Despliegue

La aplicación se compila y publica directamente en Firebase Hosting utilizando el target de multisite independiente:

```bash
cd apps/documentacion/app-documentacion-farmacia
npm install
npm run build     # Genera el portal estático en src/docs/dist
firebase deploy   # Despliega el target 'documentacion-farmacia' a la nube
```
