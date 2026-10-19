# Bitácora de Cambios del Ecosistema IA

Todos los cambios y tareas notables de este monorepositorio y del ecosistema de IA local se documentarán en este archivo de forma cronológica.

---

## [2026-10-19] — Optimización Integral Diátaxis, Purga de Duplicados y Enriquecimiento RAG

### Añadido
- **Estándar Diátaxis Completo**: Nuevas secciones de **Referencia Técnica** (`referencia/puertos-y-endpoints.md` con tabla maestra de puertos `3000–3799`, rutas del Gateway y targets Multisite) y **Explicaciones de Arquitectura** (`explicaciones/arquitectura-ecosistema-ia.md`).
- **Guías Operativas**: Nuevas guías paso a paso para creación y despliegue granular de subproyectos (`guias/crear-y-desplegar-proyecto.md`) y registro/sincronización de habilidades (`guias/registrar-nueva-skill.md`).
- **Documentación de Proyectos Recientes**: Creación de `README.md` y fichas técnicas completas para `app-comunidad-paradas`, `app-notebook-studio`, `app-bp-inversion-compra-piso`, `app-bp-cuidadora-abuela` y `centro-editorial`, así como sincronización de las skills `gestiona_business_plan` y `gestiona_editorial`.

### Mejorado
- **Sincronizador (`sync-catalog.js`)**: Separación automática entre aplicaciones generales (`proyectos-ia/apps/`) y simuladores financieros (`proyectos-ia/business-plans/`), autogeneración de la portada de la Suite Business Plans, inclusión de enlaces a producción (`publicUrl`) y etiquetas, y purga automática de fichas `.md` obsoletas.
- **Indexador RAG (`index-rag.js`)**: Filtrado de bloques HTML decorativos e inyección de la ruta URL relativa (`url`) en los metadatos de cada chunk.
- **Portada y Estilos (`index.md`, `custom.css`)**: Nuevo bloque de acceso rápido Diátaxis en portada, cuarto contador dinámico (`Plugins Activos`) y mejora de legibilidad en listas con código inline.

### Eliminado
- **Limpieza de Huérfanos y Duplicados**: Eliminación de 20 archivos `.md` antiguos duplicados en la raíz de `infraestructura-local/` y `proyectos-ia/` que duplicaban entradas en Pagefind y en la base vectorial RAG.

---

## [2026-07-12] — Sistema de Documentación Viva y Automatizada

### Añadido
- **Automatización**: Nueva versión del script `sync-catalog.js` capaz de extraer y copiar de forma dinámica los `README.md` individuales de las apps de negocio en `IA_Proyectos` y de los servicios de infraestructura en `IA_Infraestructura`.
- **Configuración del Agente**: Se integra de forma automatizada el repositorio de `IA_Configuracion` (catálogo de plugins activos, instalación mediante `install.ps1`, reglas específicas por proyecto e introducción técnica).
- **Estilo**: Estructura del menú lateral de Astro Starlight configurada para auto-generar la barra de navegación basada en directorios dinámicos (`proyectos-ia/apps`, `configuracion/plugins`, `configuracion/reglas`).
- **Historial**: Este archivo de bitácora (`CHANGELOG.md`) y su respectiva integración en el portal.
- **Fichas de Soporte**: Se crearon `README.md` explicativos iniciales para las 7 aplicaciones de negocio y los 8 microservicios de desarrollo local.
