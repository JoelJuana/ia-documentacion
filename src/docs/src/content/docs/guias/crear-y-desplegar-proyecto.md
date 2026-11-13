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

## Paso 2: Registro en `projects.json` (Automático o Manual)

Si creas el proyecto mediante `infra-project-creator` (`crea_proyecto`), se registra automáticamente en `IA_Proyectos/projects.json` y dispara en segundo plano la publicación del portal. Asimismo, si creas la carpeta manualmente en `apps/` o `apps/business-plans/`, `sync-catalog.js` cuenta con **detección automática de carpetas nuevas** y genera la entrada base en `projects.json`. Para personalizar su nombre comercial o URL pública:

```json
{
  "name": "app-bp-ejemplo",
  "title": "Business Plan · Ejemplo",
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

## Paso 4: Publicación Automática en el Portal y RAG (`publish:auto`)

Por último, ejecuta el orquestador transversal para que la nueva ficha (junto con su `README.md` y `CHANGELOG.md`) se audite, compile, indexe en el RAG (con arranque/apagado JIT del Gateway si estaba en reposo), despliegue en `https://antigravity.gironacc.com` y se versione en GitHub:

```powershell
npm run publish:auto --prefix "C:\Users\jjtei\Desktop\IA_Documentacion\src\docs"
```
