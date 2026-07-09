# Portal de Documentación Técnica de IA

Este proyecto aloja el portal de documentación técnica centralizado de la suite de agentes y microservicios locales del monorepositorio de IA.

## Arquitectura de la Documentación

El portal está construido utilizando **Astro Starlight** y se organiza de acuerdo con el estándar **Diátaxis**:

*   **Tutoriales (`src/docs/src/content/docs/tutoriales/`)**: Guías de aprendizaje prácticas de inicio rápido para agentes.
*   **Guías de Tareas (`src/docs/src/content/docs/guias/`)**: Procedimientos paso a paso para resolver problemas y flujos operativos (Git, DNS, Cloudflare, etc.).
*   **Referencia Técnica (`src/docs/src/content/docs/referencia/`)**: Matriz de red, puertos, catálogo de proyectos activos y especificaciones de skills.
*   **Explicaciones (`src/docs/src/content/docs/explicaciones/`)**: Conceptos teóricos de fondo, diseño de arquitectura y contexto.

## Sincronización de Catálogos

El portal automatiza la sincronización del inventario de proyectos y las habilidades (skills) instaladas:
1. El script `sync-catalog.js` se ejecuta en cada fase de inicio del servidor de desarrollo (`npm run dev`) y compilación (`npm run build`).
2. Lee dinámicamente el archivo `projects.json` del monorepositorio y las carpetas de skills de Gemini.
3. Genera automáticamente los Markdown del Catálogo de Proyectos y Catálogo de Skills.

## Uso e Integración

Para arrancar el portal en local para validación visual:

```bash
cd src/docs
npm install
npm run dev     # Servidor de desarrollo en http://localhost:4321
npm run build   # Compila el sitio estático en dist/
```

## Despliegue en Firebase Hosting

El proyecto se despliega de forma independiente utilizando Firebase Hosting Multisite al target `documentacion-ia` configurado en `firebase.json`.
