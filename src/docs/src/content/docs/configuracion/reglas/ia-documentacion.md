---
title: Reglas de "IA Documentación"
description: Directrices y reglas obligatorias específicas del repositorio IA Documentación.
---

*   **Ruta en repositorio**: `IA_Configuracion/proyectos-reglas/ia-documentacion.md`

---

# Reglas del Proyecto: IA_Documentacion

Este espacio aloja el portal de documentación técnica unificado de la suite de agentes, proyectos de negocio y microservicios locales del ecosistema de IA.

## 1. Organización del Portal (Astro Starlight)
El contenido debe estructurarse estrictamente bajo el estándar **Diátaxis**:
*   **Tutoriales (`src/docs/src/content/docs/tutoriales/`)**: Lecciones prácticas orientadas al aprendizaje para que los agentes o desarrolladores se inicien rápidamente.
*   **Guías de Tareas (`src/docs/src/content/docs/guias/`)**: Instrucciones paso a paso para resolver un problema real específico (ej. "cómo configurar un CNAME en Cloudflare").
*   **Referencia (`src/docs/src/content/docs/referencia/`)**: Especificaciones técnicas secas y precisas (listado de puertos, variables de entorno, APIs, etc.).
*   **Explicaciones (`src/docs/src/content/docs/explicaciones/`)**: Discusiones de arquitectura, decisiones de diseño y teoría conceptual del ecosistema.

## 2. Automatizaciones de Catálogo
*   El catálogo de proyectos y el catálogo de skills de Gemini se generan automáticamente mediante scripts en la carpeta `scripts/` (ej. `sync-catalog.js`).
*   Antes de compilar a producción (`npm run build`), verifica que el catálogo dinámico esté actualizado y los markdown generados sean correctos.

## 3. Despliegue
*   Este portal se aloja en Firebase Hosting Multisite en el canal `documentacion-ia`.
*   Para desplegar, utiliza el microservicio `infra-firebase` local o ejecuta comandos de Firebase apuntando al target asignado en `firebase.json`.

## 4. Control de Versiones (Git)
*   Este es un repositorio independiente: [ia-documentacion](https://github.com/JoelJuana/ia-documentacion).
*   Sigue el formato de convencional commits: `feat(...)`, `fix(...)`, `docs(...)`, `chore(...)`.
*   Sincroniza siempre los cambios empujando a la rama `main` al finalizar tus aportaciones.

## 5. Protocolo de Ciclo de Vida Documental
Al finalizar cualquier tarea de desarrollo o arquitectura en el ecosistema, el agente de IA debe cumplir obligatoriamente los siguientes pasos:
1.  **Bitácora**: Registrar de forma breve y precisa la tarea completada en el archivo `CHANGELOG.md` en la raíz de `IA_Documentacion/`.
2.  **Sincronización y Build**: Ejecutar \`npm run build\` en \`IA_Documentacion/src/docs/\` para:
    *   Sincronizar todos los cambios de código, skills, READMEs y bitácora con el portal (\`sync-catalog.js\`).
    *   Compilar el sitio web estático.
    *   Indexar de forma automática todo el conocimiento actualizado en la base de datos vectorial del RAG local (\`index-rag.js\`).
3.  **Publicación**: Ejecutar \`npm run deploy\` en \`src/docs/\` para desplegar el portal web en Firebase Hosting.

