---
title: Creación de Nuevos Proyectos
description: Tutorial paso a paso sobre cómo inicializar y registrar un nuevo proyecto dentro de este monorepositorio.
---

Este tutorial describe el proceso paso a paso para la inicialización y el registro formal de nuevos subproyectos dentro del ecosistema de **Proyectos IA** mediante la interfaz web de **Project Creator**.

---

## Requisitos Previos

Antes de crear un proyecto, comprueba que tienes la infraestructura local en ejecución en el puerto 3000 (Gateway) para poder interactuar con los microservicios.

Para arrancar la infraestructura local:
```powershell
# Ejecutar en segundo plano desde IA_Infraestructura
./start-infra.ps1
```

---

## Paso 1: Ejecutar la Skill o Lanzar la Interfaz

Como agente de IA, puedes automatizar este proceso utilizando la skill `crea_proyecto`.

Si deseas levantarlo manualmente o a través de comandos directos:
1. Comprueba si el servicio `infra-project-creator` ya está respondiendo en el puerto **3300** o a través del Gateway en `http://localhost:3000/api/proj/api/projects`.
2. Si no responde, arráncalo ejecutando:
   ```powershell
   Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory "C:\Users\jjtei\Desktop\IA_Infraestructura\infra-project-creator" -WindowStyle Hidden
   ```
3. Abre el navegador interactivo en:
   👉 **[http://localhost:3300](http://localhost:3300)**

---

## Paso 2: Rellenar la Ficha de Configuración

En la interfaz web de Project Creator, introduce los siguientes datos del proyecto:
- **Nombre**: Siguiendo el prefijo de tipo (ej. `app-bp-restaurante` para Business Plans, `api-reservas` para APIs, `app-calculadora` para aplicaciones web).
- **Descripción**: Breve resumen de su función principal y tecnologías principales.
- **Autor**: `JoelJuana`.
- **Tipo de Proyecto**:
  - `vanilla`: Proyectos JS/HTML clásicos.
  - `react`: Aplicaciones con React + Vite.
  - `node`: Servicios o herramientas Node.
  - `python`: Scripts y APIs Python (crea entorno virtual automáticamente).
  - `api`: APIs REST estructuradas.
- **Configuraciones adicionales**: `.gitignore`, `CHANGELOG`, `LICENSE`, etc.

Haz clic en **✨ Crear Proyecto**. La carpeta se generará automáticamente en `C:\Users\jjtei\Desktop\Proyectos_IA\apps\<nombre-proyecto>`.

---

## Paso 3: Registrar en el Inventario Central

Es **obligatorio** registrar cada nuevo proyecto en el archivo central del catálogo `projects.json` de la raíz del monorepositorio.

Abre [projects.json](file:///C:/Users/jjtei/Desktop/Proyectos_IA/projects.json) y añade una entrada con el siguiente formato al final de la lista:

```json
  {
    "name": "nombre-del-proyecto",
    "type": "react",
    "description": "Una descripción clara y concisa de su funcionalidad.",
    "author": "JoelJuana",
    "createdAt": "YYYY-MM-DD",
    "hasPosts": false
  }
```

---

## Paso 4: Compilar y Actualizar el Portafolio

Para asegurar la visualización en la web de catálogo centralizada del monorepositorio, debes recompilar el portafolio:

1. Si es un frontend, ve a la carpeta del proyecto y compílalo:
   ```bash
   npm run build
   ```
2. Vuelve a la raíz del monorepositorio y corre el script de compilación del catálogo:
   ```bash
   node scripts/build-portfolio.js
   ```
3. Verifica que la carpeta `dist/` se haya actualizado con el nuevo proyecto enlazado correctamente.
