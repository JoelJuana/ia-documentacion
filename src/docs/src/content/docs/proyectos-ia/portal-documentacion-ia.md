---
title: Proyecto - Portal de Documentación Técnica de IA
description: Explicación de la arquitectura del portal de documentación actual y el script de validación Diátaxis.
---

Este **Portal de Documentación Técnica de IA** es el concentrador de conocimiento y especificaciones del monorepositorio. Sirve para documentar los proyectos, las habilidades de los agentes y la infraestructura de red local de soporte.

---

## Ficha de Identificación

*   **Nombre de Carpeta**: `app-documentacion-ia` (anteriormente referido en tablas como `app-documentacion-proyectos-ia`).
*   **Ruta en el Monorepositorio**: [\`apps/app-documentacion-ia/\`](file:///c:/Users/jjtei/Desktop/Proyectos_IA/apps/app-documentacion-ia)
*   **Tipo**: Frontend (Astro Starlight + Firebase Hosting)
*   **Tecnologías**: Astro Starlight, Node.js (ES Modules).
*   **Fecha de Creación**: 2026-07-08

---

## Componentes y Automatizaciones Internas

Este portal cuenta con dos scripts clave escritos en Node.js que facilitan la administración y evitan tareas manuales repetitivas:

### 1. Sincronizador de Inventarios (`sync-catalog.js`)
*   **Ruta**: [\`src/docs/scripts/sync-catalog.js\`](file:///c:/Users/jjtei/Desktop/Proyectos_IA/apps/app-documentacion-ia/src/docs/scripts/sync-catalog.js)
*   **Función**: Lee dinámicamente el archivo central [projects.json](file:///c:/Users/jjtei/Desktop/Proyectos_IA/projects.json) en la raíz y la carpeta de customizaciones de Gemini (`.gemini/config/skills/`), construyendo de forma automática y compilando al vuelo las tablas de proyectos activos y habilidades.

### 2. Agente Validador de Conformidad (`validate-doc.mjs`)
*   **Ruta**: [\`scripts/validate-doc.mjs\`](file:///c:/Users/jjtei/Desktop/Proyectos_IA/apps/app-documentacion-ia/scripts/validate-doc.mjs)
*   **Función**: Validador estático de archivos Markdown antes de su publicación.
    *   **Seguridad**: Busca IPs privadas locales y llaves o credenciales en texto plano (ej. Google API keys, contraseñas, tokens).
    *   **Metadata**: Valida la existencia obligatoria de las etiquetas `title` y `description`.
    *   **Estructura**: Evalúa reglas de conformidad en base a la categoría elegida (ej. evita mode-mixing o comandos de consola en explicaciones teóricas).
    *   **Publicación**: Si aprueba el test de conformidad, copia automáticamente el archivo a la carpeta física de Astro correspondiente para que aparezca dinámicamente en el portal.

---

## Uso en Desarrollo

Para ejecutar el portal en local:

```bash
cd apps/app-documentacion-ia/src/docs
npm install
npm run dev
```

Esto levanta el servidor Astro Starlight en `http://localhost:4321` y ejecuta el script de sincronización en segundo plano automáticamente.
