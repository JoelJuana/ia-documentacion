---
title: Crear y Desplegar un Subproyecto o Business Plan
description: Guía paso a paso para inicializar una nueva aplicación o simulador financiero, registrarla en el catálogo y desplegarla de forma granular en Firebase Hosting.
sidebar:
  order: 2
---

Esta guía describe el procedimiento estándar para crear un nuevo proyecto o simulador de la suite **Business Plans**, registrarlo en el inventario central y publicarlo de forma aislada en producción.

---

## Paso 1: Crear la Estructura del Proyecto

Dependiendo del tipo de proyecto, ubícalo en su directorio correspondiente dentro de `IA_Proyectos`:

*   **Aplicación general (React / Node / Astro)**: `C:\Users\jjtei\Desktop\IA_Proyectos\apps\<nombre-app>\`
*   **Simulador Financiero (Suite Business Plans)**: `C:\Users\jjtei\Desktop\IA_Proyectos\apps\business-plans\app-bp-<nombre>\`

:::tip[Plantilla Estándar de Business Plan]
Si estás creando un simulador financiero (`app-bp-*`), sigue la especificación de la habilidad [`gestiona_business_plan`](/agente/skills/gestiona_business_plan/) para reutilizar los estilos compartidos, cálculos fiscales AEAT y sincronización cloud.
:::

Asegúrate de incluir siempre un archivo `README.md` en la raíz del subproyecto describiendo sus funcionalidades y stack tecnológico.

---

## Paso 2: Registrar el Proyecto en `projects.json`

Añade la entrada del nuevo proyecto en el archivo [`C:\Users\jjtei\Desktop\IA_Proyectos\projects.json`](file:///C:/Users/jjtei/Desktop/IA_Proyectos/projects.json):

```json
{
  "name": "app-bp-ejemplo",
  "type": "vanilla",
  "description": "Simulador financiero de ejemplo con proyección de flujos de caja y ROI.",
  "author": "JoelJuana",
  "createdAt": "2026-10-19",
  "hasPosts": true,
  "url": "./app-bp-ejemplo/",
  "publicUrl": "https://ejemplo.gironacc.com",
  "tags": ["Finanzas", "Business Plan", "Vanilla"]
}
```

---

## Paso 3: Compilación y Despliegue Granular

:::caution[Regla de Despliegue Individual]
En el monorepositorio `IA_Proyectos` está prohibido ejecutar scripts de despliegue masivo (`deploy-all.js`) cuando se trabaja en una única aplicación. Compila y despliega **únicamente** el subproyecto modificado.
:::

1.  Compila únicamente el subproyecto en su directorio:
    ```powershell
    npm run build --prefix "C:\Users\jjtei\Desktop\IA_Proyectos\apps\business-plans\app-bp-ejemplo"
    ```
2.  Despliega el canal específico en Firebase Hosting apuntando a su target configurado en `firebase.json`:
    ```powershell
    firebase deploy --only hosting:app-bp-ejemplo
    ```
3.  Si requiere un nuevo subdominio en `gironacc.com`, utiliza el microservicio `infra-domain-manager` (`/api/dns`) a través del Gateway local en el puerto `3000`.

---

## Paso 4: Sincronizar el Portal de Documentación

Por último, actualiza el portal `IA_Documentacion` para que la nueva ficha técnica aparezca en el menú lateral y quede indexada en el RAG:

1.  Registra el alta en [`CHANGELOG.md`](file:///c:/Users/jjtei/Desktop/IA_Documentacion/CHANGELOG.md).
2.  Ejecuta la compilación y sincronización en `IA_Documentacion/src/docs`:
    ```powershell
    npm run build --prefix "C:\Users\jjtei\Desktop\IA_Documentacion\src\docs"
    ```
