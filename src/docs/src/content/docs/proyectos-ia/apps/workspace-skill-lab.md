---
title: "workspace-skill-lab"
description: "Ficha técnica y documentación de la aplicación Google Workspace MCP Lab (workspace-skill-lab)."
---

*   **Ruta en repositorio**: `IA_Proyectos/apps/workspace-skill-lab/`
*   **Nombre Comercial**: Google Workspace MCP Lab
*   **Tipo**: `node`
*   **Creado el**: 2026-07-10
*   **Autor**: JoelJuana
*   **Etiquetas**: `IA`, `MCP`, `Google Workspace`, `Node`

---

# workspace-skill-lab

Espacio de trabajo experimental de desarrollo y HUB local para servidores MCP (Model Context Protocol). Provee a los agentes de IA de la suite integración y automatizaciones para herramientas de oficina de Google Workspace.

## Características y Funcionalidades

1. **Servidor MCP Google Workspace**: Integración bidireccional local mediante conectores OAuth para:
   - **Google Drive**: Búsqueda, lectura y escritura de archivos del disco en la nube.
   - **Google Sheets**: Lectura de celdas, actualización de tablas y recopilación de reportes.
   - **Google Calendar**: Consulta de disponibilidad, creación de eventos y programación de avisos.
2. **Entorno de Pruebas (Lab)**: Rutas especiales de pruebas de prompts e integración local de herramientas para refinar el comportamiento del agente autónomo.

## Stack Tecnológico

- **Entorno**: Node.js
- **Protocolo**: Model Context Protocol (MCP) Server
- **Autenticación**: OAuth2 (Google API Client)

