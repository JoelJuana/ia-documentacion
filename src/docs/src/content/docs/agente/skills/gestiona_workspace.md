---
title: gestiona_workspace
description: Habilidad para interactuar con los servicios de Google Workspace (Drive, Sheets, Calendar y Apps Script) mediante el servidor MCP local para gestionar y automatizar tareas de oficina.
---

*   **Ruta de Configuración**: `IA_Configuracion/skills/gestiona_workspace/SKILL.md`

---

# Habilidad: gestiona_workspace

Esta habilidad equipa al agente con la capacidad de gobernar servicios de Google Workspace (Google Drive, Google Sheets, Google Calendar y Google Apps Script) mediante un servidor MCP (*Model Context Protocol*) de tipo híbrido.

## Propósito

Automatizar la lectura, escritura y estructuración de datos en la nube de Google, facilitando la creación de hojas de cálculo de modelos financieros, el escaneo de archivos en la nube, el agendado de eventos en el calendario y el despliegue de soluciones mediante Google Apps Script.

## Herramientas MCP Disponibles

A través del servidor MCP `google-workspace`, el agente puede invocar de forma directa y nativa las siguientes herramientas:

### 1. Gestión de Archivos en Google Drive
*   `drive_list_files`: Permite realizar búsquedas filtradas sobre los archivos y carpetas de la cuenta de Google Drive.
    *   *Parámetros:*
        - `query` (opcional): Filtro de búsqueda (ej. `name contains 'reporte'`).
        - `pageSize` (opcional): Cantidad máxima de archivos a devolver (por defecto 10).

### 2. Edición y Lectura de Hojas de Cálculo (Sheets)
*   `sheets_read_values`: Extrae el contenido de un rango específico en un documento de Google Sheets.
    *   *Parámetros:*
        - `spreadsheetId` (requerido): ID único del archivo de Sheets.
        - `range` (requerido): El rango a consultar (ej. `Sheet1!A1:D10`).
*   `sheets_update_values`: Inyecta un bloque de celdas bidimensional en una hoja.
    *   *Parámetros:*
        - `spreadsheetId` (requerido): ID único del archivo de Sheets.
        - `range` (requerido): Rango donde escribir (ej. `Sheet1!A1:B2`).
        - `values` (requerido): Array bidimensional con los valores a rellenar.

### 3. Automatización y Apps Script
*   `apps_script_create_project`: Crea un nuevo proyecto standalone de Apps Script o bien lo asocia a un contenedor contenedor existente (como un Google Sheets o Google Docs).
    *   *Parámetros:*
        - `title` (requerido): Nombre o título del proyecto.
        - `parentId` (opcional): ID del archivo contenedor.
*   `apps_script_update_files`: Sube y actualiza el código fuente (.gs o archivos .html) en un proyecto de Apps Script existente.
    *   *Parámetros:*
        - `scriptId` (requerido): ID del proyecto de script.
        - `files` (requerido): Array de objetos que definen el nombre del archivo, su tipo (`SERVER_JS`, `HTML`, `JSON`) y su código en texto plano.

### 4. Organización del Calendario
*   `calendar_create_event`: Añade nuevos eventos de forma directa a un Google Calendar.
    *   *Parámetros:*
        - `summary` (requerido): Título o asunto del evento.
        - `description` (opcional): Resumen o notas del evento.
        - `startTime` (requerido): Fecha y hora de inicio en formato ISO 8601 (ej. `2026-07-10T10:00:00Z`).
        - `endTime` (requerido): Fecha y hora de fin en formato ISO 8601.
        - `calendarId` (opcional): ID del calendario de destino (por defecto el valor es `"primary"`).

## Directrices Operativas para el Agente

1. **Gestión de Autenticación**: El servidor de MCP depende de los tokens locales almacenados en el directorio del proyecto `apps/workspace-skill-lab`. Si el cliente no inicializa por falta de credenciales, guía al usuario a ejecutar `npm run auth` en dicho directorio para abrir el consentimiento OAuth de Google.
2. **Consultas Inteligentes**: Cuando vayas a leer Sheets, prefiere limitar los rangos estrictamente a las zonas de datos que necesitas procesar para no sobrecargar el buffer de tokens en el prompt.
3. **Escritura Ordenada**: Al actualizar valores en Google Sheets, formatea los datos en arrays bidimensionales y valida que coincidan las dimensiones del array con el rango definido en la petición.
