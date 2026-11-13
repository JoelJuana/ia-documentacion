# Bitácora de Cambios del Ecosistema IA

Todos los cambios y tareas notables de este monorepositorio y del ecosistema de IA local se documentarán en este archivo de forma cronológica.

---

## [2026-11-13] — Orquestación "Zero-Touch Docs", Ingesta de Changelogs/Catálogo Editorial, Skills Bidireccionales y Blindaje CI

### Añadido
- **Orquestador de Publicación Automática (`src/docs/scripts/auto-publish.js` y `npm run publish:auto`)**: Pipeline integral con control de bloqueo concurrente (`.auto-publish.lock`), detección inteligente de cambios reales (`git status`), auditoría automática, compilación Astro + Sitemap, encendido/apagado **JIT** de `IA_Infraestructura` para garantizar siempre la indexación RAG incremental, despliegue en Firebase Hosting (`documentacion-ia`) y commit/push automático a GitHub.
- **Disparador Automático en `infra-project-creator` (`IA_Infraestructura`)**: Integración de `triggerPortalAutoPublish` en segundo plano al crear, renombrar o eliminar proyectos, además de enrutamiento nativo de simuladores `app-bp-*` hacia `apps/business-plans/`.
- **Auto-Descubrimiento de Proyectos y Anexo de `CHANGELOG.md` (`sync-catalog.js`)**: Escaneo automático de subcarpetas en `IA_Proyectos/apps/` y `apps/business-plans/` para registrar proyectos nuevos sin intervención manual e inyección automática del historial de versiones (`CHANGELOG.md`) de cada aplicación en su ficha del portal.
- **Inventario Dinámico del Centro Editorial (`sync-catalog.js`)**: Lectura directa de `IA_Proyectos/docs/editorial/catalog.js` para publicar automáticamente la tabla viva de los 9 documentos A4, 61 páginas vectoriales y 8 exportaciones Word `.docx` en la ficha de `centro-editorial`.
- **Regla Global Transversal ("Zero-Touch Docs")**: Nueva sección 8 en `IA_Configuracion/AGENTS.md` y reglas por proyecto (`proyectos-ia`, `ia-infraestructura`, `ia-documentacion`) que instruyen a los agentes de cualquier repositorio a ejecutar `npm run publish:auto` tras cambios funcionales o documentales.

### Mejorado
- **Reconciliación Bidireccional de Configuración (`sync-catalog.js`)**: Importación automática de skills creadas o editadas en `~/.gemini/config/skills/` hacia `IA_Configuracion/skills/`, propagación automática de `AGENTS.md` y `plugins/` hacia `~/.gemini/config/` y ampliación del modo `--watch` a los 4 repositorios.
- **Métricas Precisas y Blindaje CI (`index.md`, `sync-catalog.js` y workflows)**: Separación exacta entre plugins activos (`4`) y módulos en reserva (`9`), eliminación del plugin residual de prueba `test-dashboard-skill`, modo seguro `[CI Mode]` en `sync-catalog.js` para no sobrescribir estadísticas en runners remotos y retirada del workflow heredado `deploy-docs.yml` (Node 18) en favor de `ci-portal.yml` (Node 22).
- **Saneamiento UTF-8 y Documentación al Día**: Corrección de codificación UTF-8 en origen en `IA_Configuracion/AGENTS.md` y `~/.gemini/GEMINI.md`, alineación de `gestiona_documentacion/SKILL.md` (`Pagefind` y `TOC` diferenciados entre Farmacia e IA) y actualización integral del `README.md` de `app-bp-ramon-turro` (`v2.2.0`: Hipoteca Promotora Verde Única a 20 años al `4,50%`, inmueble a título personal y freno `Deuda/EBITDA`).

---

## [2026-11-10] — Indexación RAG Incremental SHA-256, Auditoría Avanzada de Anclas/Mermaid, Carga Perezosa y Ampliación Diátaxis

### Añadido
- **Indexación RAG Incremental con Caché SHA-256 (`src/docs/scripts/index-rag.js`)**: Incorporación de manifiesto `.rag-manifest.json` para omitir automáticamente documentos sin cambios en compilaciones sucesivas, purgar fragmentos obsoletos de archivos modificados o eliminados (`DELETE /documents/:title`) e indexar con concurrencia controlada, además de modo `--force` (`npm run index:rag:force`).
- **Visor Modal Interactivo de Diagramas Mermaid (`astro.config.mjs` y `custom.css`)**: Incorporación de botón `Ampliar` y lightbox a pantalla completa con cierre por `Esc` en todos los diagramas de arquitectura.
- **Nuevos Documentos Diátaxis**:
  - **Tutorial (`tutoriales/crear-simulador-business-plan.md`)**: Recorrido guiado paso a paso para construir, conectar a `bp-core.js` y auditar un simulador financiero desde cero.
  - **Explicación (`explicaciones/motor-financiero-y-auditoria-bp.md`)**: Diseño arquitectónico del motor determinista `bp-core.js`, invariantes PyG vs. Cash Flow y convergencia con el Centro Editorial A4.
- **Integración Continua CI (`.github/workflows/ci-portal.yml`)**: Flujo automático en GitHub Actions que ejecuta `npm run audit` y `npx astro build` en cada `push` y `pull_request` sobre `main`.
- **Orquestador de Despliegue (`src/docs/scripts/deploy-portal.js`)**: Script de publicación que verifica conectividad con `infra-firebase` a través del API Gateway local y despliega el canal Multisite `documentacion-ia` con cabeceras `Cache-Control` inmutables para `/_astro/**` en `firebase.json`.

### Mejorado
- **Limpieza Anidada de HTML en RAG (`index-rag.js`)**: Sustitución de expresión regular no anidada por analizador de balanceo de etiquetas `<div class="dashboard-grid">...</div>`, eliminando por completo el marcado decorativo de tarjetas en los vectores indexados.
- **Auditor Unificado de Alta Precisión (`audit-portal.js` y `validate-doc.mjs`)**: Validación de anclas internas (`#seccion`), existencia de recursos estáticos en `public/`, sintaxis de cabeceras en bloques `mermaid`, prohibición de enlaces locales `file:///` rotos en web y detección ampliada de secretos.
- **Saneamiento de Rutas Privadas (`sync-catalog.js` y guías)**: Reemplazo de enlaces `file:///C:/Users/...` expuestos en producción por rutas relativas limpias de repositorio y sanitizador automático `sanitizeLocalFileLinks`.
- **Rendimiento Web, Sitemap SEO y Maquetación (`astro.config.mjs`, `generate-sitemap.js` y `custom.css`)**: Generación determinista de `sitemap.xml` y `robots.txt` para `https://antigravity.gironacc.com`, carga perezosa condicional (`import()`) de Mermaid v11 únicamente en páginas que contienen diagramas, conexión loopback IPv4 directa (`127.0.0.1:3000`) con el Gateway sin latencia de fallback IPv6, justificación adaptativa con `hyphens: auto` solo en escritorio y eliminación de ~120 líneas de CSS heredado sin uso y de la carpeta vacía residual `app-documentacion-ia/`.

---

## [2026-11-08] — Sincronización con Centro Editorial v2.1 (4 Presets), Nuevo Simulador `app-bp-compra-farmacia` y Guía Diátaxis Editorial

### Añadido
- **Ficha Técnica `app-bp-compra-farmacia`**: Incorporación automática al catálogo de `Suite Business Plans` del nuevo simulador comparativo Comprador vs. Vendedor para compraventa de Oficina de Farmacia (`https://compra-farmacia.gironacc.com`), elevando el inventario a **13 proyectos activos**.
- **Guía Operativa Editorial (`guias/maquetar-documento-editorial.md`)**: Nueva guía paso a paso bajo estándar Diátaxis para inicializar, maquetar y exportar documentos A4 (PDF vectorial + Word `.docx`) con los 4 presets oficiales de `gestiona_editorial`.
- **Especificación de Referencia Financiera y Editorial (`referencia/estandar-financiero-y-editorial.md`)**: Nuevo documento de referencia técnica con las fórmulas de auditoría bancaria (`bp-core.js`, LTV vs. CAPEX Total, Póliza `0..25`, escudo fiscal Fondo de Comercio 7,5%) y la matriz técnica de los 4 presets A4.
- **Auditor Automático del Portal (`scripts/audit-portal.js` y `npm run audit`)**: Validador automático integrado en el pipeline de `npm run build` que verifica los **70 documentos** del portal (frontmatter YAML completo, cero emojis en encabezados, cero enlaces internos rotos y ausencia de credenciales expuestas).

### Mejorado
- **Renderizado Visual SVG de Diagramas Mermaid (`astro.config.mjs` y `custom.css`)**: Integración del motor cliente Mermaid v11 con adaptación dinámica al selector de tema (`dark`/`light`) de Starlight para renderizar diagramas de arquitectura interactivos en lugar de bloques de texto plano.
- **Enriquecimiento de Tarjetas y Metadatos en `sync-catalog.js`**: Incorporación de nombres comerciales (`title`) junto a los identificadores técnicos (`name`) en la Suite Business Plans y fichas de proyectos, así como etiquetas visuales de estado (`Activo` / `En reserva`) en el catálogo de plugins.
- **Sincronización Física de Skills en Antigravity (`~/.gemini/config/skills`)**: Reemplazo de enlaces NTFS (`ReparsePoint` / Junctions) por directorios físicos reales y sincronización automática desde `sync-catalog.js`, garantizando que el escáner nativo de Antigravity en Windows cargue siempre las 12 habilidades del ecosistema.
- **Actualización de `gestiona_business_plan` y `gestiona_documentacion`**: Incorporación de las reglas de auditoría financiera y bancaria y actualización de rutas físicas en `gestiona_documentacion`.
- **Sincronización con `centro-editorial` y `gestiona_editorial`**: Actualización de las fichas técnicas con el cuarto preset oficial (`dossier_financiero`), la nueva carpeta `Finanzas_y_Dossiers/` (Dossiers ejecutivos de Ramón Turró y Compra de Farmacia) y las reglas modulares `_reglas/finanzas_01_dossiers_ejecutivos.md`.
- **Arquitectura del Monorepo y Referencia de Dominios**: Actualización del árbol real de `IA_Proyectos` en `proyectos-ia/arquitectura-monorepo.md` (incluyendo los 6 simuladores financieros y la estructura completa de `docs/editorial/`), limpieza de emojis residuales en `infraestructura-local/introduccion.md` y actualización de la tabla de dominios productivos en `referencia/puertos-y-endpoints.md`.
- **Observador en `sync-catalog.js`**: Inclusión de `IA_Proyectos/docs/editorial` en los objetivos de observación del modo `--watch`.
- **Binarios Nativos Windows ARM64 (`src/docs`)**: Instalación de bindings nativos `@rollup/rollup-win32-arm64-msvc` y `@esbuild/win32-arm64` para compilación directa en Snapdragon X Elite sin emulación.

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
