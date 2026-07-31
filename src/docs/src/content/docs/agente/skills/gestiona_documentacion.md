---
title: gestiona_documentacion
description: Redacta, estructura, maqueta y valida documentación técnica y de procedimientos en portales Astro Starlight del monorepositorio bajo el estándar Diátaxis y el estándar corporativo sin emojis.
---

*   **Ruta de Configuración**: [`IA_Configuracion/skills/gestiona_documentacion/`](file:///C:/Users/jjtei/Desktop/IA_Configuracion/skills/gestiona_documentacion/SKILL.md)

---

# Habilidad: Gestión y Redacción de Documentación Profesional

Esta habilidad instruye al agente en el estándar de redacción, maquetación, organización y validación de contenidos para los portales de documentación del monorepositorio: **Farmacia Planas Morell** y **Documentación IA**.

---

## Ecosistema y Rutas Físicas

Los portales de documentación están construidos con **Astro Starlight** y se ubican en las siguientes rutas del monorepositorio:

*   **Portal de Farmacia**: `c:\Users\jjtei\Desktop\Proyectos_IA\apps\documentacion\app-documentacion-farmacia\src\docs`
    *   Contenidos: `src/content/docs/`
*   **Portal de IA**: `C:\Users\jjtei\Desktop\IA_Documentacion\src\docs`
    *   Contenidos: `src/content/docs/`

---

## Arquitectura de Contenidos (Estándar Diátaxis)

Para evitar el cruce de modos de escritura (*mode-mixing*), los archivos markdown (`.md` / `.mdx`) deben clasificarse estrictamente en uno de los cuatro cuadrantes de **Diátaxis**:

1.  **Tutoriales (`tutoriales/`)**:
    *   *Propósito*: Lecciones prácticas orientadas al aprendizaje de inicio rápido para principiantes.
    *   *Estilo*: Paso a paso, guiados, sin explicar demasiada teoría de fondo.
2.  **Guías de Tareas (`guias/`)**:
    *   *Propósito*: Procedimientos enfocados en resolver un problema práctico o tarea concreta del mundo real.
    *   *Estilo*: Instrucciones secuenciales claras, orientadas a la acción (ej. SOPs de farmacia o manuales de Git).
3.  **Referencia Técnica (`referencia/`)**:
    *   *Propósito*: Descripción de datos técnicos, especificaciones y catálogo de información.
    *   *Estilo*: Fichas de identificación, esquemas de bases de datos, APIs, puertos de red, tablas y listados objetivos.
4.  **Explicaciones (`explicaciones/`)**:
    *   *Propósito*: Contexto de fondo, decisiones de diseño, teoría y alternativas de arquitectura.
    *   *Estilo*: Enfoque conceptual y discursivo.

---

## Configuración del Entorno de Astro Starlight

El archivo `astro.config.mjs` de los proyectos orquesta la inyección de estilos y el comportamiento de la barra lateral:

### 1. Inyección de Hojas de Estilo y Desactivación de Tabla de Contenidos y Búsqueda (TOC & Search)
Para inyectar el diseño corporativo, asegurar un ancho completo de lectura sin barra lateral derecha ("On this page") y omitir el botón de búsqueda superior, las propiedades `tableOfContents` y `pagefind` deben estar establecidas en `false`:
```javascript
starlight({
  title: 'Título del Portal',
  tableOfContents: false,      // Desactiva la barra lateral de Tabla de Contenidos globalmente
  pagefind: false,             // Desactiva el motor e interfaz de búsqueda interna
  customCss: [
    './src/styles/custom.css', // Ruta del CSS personalizado
  ],
  // ...
})
```

### 2. Desactivación o Sobreescritura de Componentes
Starlight permite sustituir componentes por defecto con componentes personalizados vacíos o alternativos. Por ejemplo, para deshabilitar el selector nativo de temas (Light/Dark):
```javascript
starlight({
  components: {
    ThemeSelect: './src/components/Empty.astro', // Desactiva el selector de temas
  },
  // ...
})
```

---

## Parámetros de Estilo CSS y Legibilidad (`custom.css`)

El archivo `./src/styles/custom.css` gestiona el aspecto premium y el confort de lectura. Debe configurarse siguiendo estas reglas clave:

### 1. Variables de Tipografía y Escala en `:root`
*   **Fuentes**: Importar `Outfit` (encabezados) e `Inter` (texto base) desde Google Fonts:
    ```css
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
    ```
*   **Asignaciones**:
    *   `--sl-font-system` e `--sl-font-markdown`: `'Inter', -apple-system, sans-serif;`
    *   `--sl-font-headings`: `'Outfit', 'Inter', var(--sl-font-system);`
*   **Dimensiones de Lectura Confortable y Adaptabilidad**:
    *   `--sl-text-base: 1.0625rem !important;` (Tamaño base ~17px)
    *   `--sl-line-height: 1.75 !important;` (Espaciado de líneas cómodo)
    *   `--sl-content-width` debe ser declarada dentro de una media query de pantalla grande para asegurar responsividad móvil (evitando scroll horizontal en smartphones):
        ```css
        @media (min-width: 50rem) {
            :root {
                --sl-content-width: 76ch !important;
            }
        }
        ```

### 2. Ocultación Sistemática de Iconos
Para garantizar un aspecto sobrio y corporativo, se deben ocultar mediante CSS los iconos automáticos del contenido:
*   **Cajas de Notas y Advertencias (Asides)**:
    ```css
    .aside__icon {
        display: none !important;
    }
    .aside {
        display: block !important;
        padding-left: 1.25rem !important; /* Compensa la falta de icono */
    }
    ```
*   **Enlaces Externos**:
    ```css
    .content a[href^="http"] svg,
    .content a[target="_blank"] svg {
        display: none !important;
    }
    ```
*   **Flujos de Pasos Compactos**:
    ```css
    .step-icon-compact {
        display: none !important;
    }
    ```
*   **Tabla de Contenidos (TOC) Movil y Escritorio**:
    ```css
    .right-sidebar-container,
    starlight-toc,
    mobile-starlight-toc,
    .right-sidebar {
        display: none !important;
    }
    ```
*   **Buscador Integrado (Search)**:
    ```css
    site-search,
    button[data-open-modal] {
        display: none !important;
    }
    ```

---

## Componentes MDX Nativos de Starlight (Recomendados)

Para maquetar contenidos complejos de forma estándar, limpia y moderna, prioriza siempre el uso de los componentes nativos incorporados de Starlight:

### 1. Cuadros de Destacados, Notas y Alertas (`Aside`)
Usa asides para resaltar información. Se escriben en markdown de forma nativa o mediante JSX:
```markdown
> [!NOTE]
> Esto es una nota informativa sobre el proceso.

> [!WARNING]
> Esto es una advertencia importante sobre la seguridad de datos.
```
*   *Nota*: No metas emojis en el título de la alerta.

### 2. Contenedor de Pasos Operativos (`Steps`)
Para desglosar SOPs (Procedimientos Operativos Estándar) o guías secuenciales, envuelve la lista numerada en un componente `<Steps>` de Starlight. Esto renderiza una línea de tiempo visual muy estética:
```markdown
import { Steps } from '@astrojs/starlight/components';

<Steps>
1. **Paso Inicial**: Descripción de la acción.
2. **Paso Intermedio**: Procesamiento de la información.
3. **Paso Final**: Confirmación y cierre.
</Steps>
```

### 3. Accesos Directos Destacados (`LinkCard` y `CardGrid`)
Para estructurar portadas o portafolios, usa grids y tarjetas nativas para evitar inyectar código HTML/CSS complejo:
```markdown
import { Card, CardGrid, LinkCard } from '@astrojs/starlight/components';

<CardGrid>
  <Card title="Organización y RRHH" icon="setting">
    Manuales de funciones y KPIs del personal.
  </Card>
  <LinkCard title="Guía de Ventas" href="/guias/ventas-por-familia/" description="Consejo farmacéutico activo." />
</CardGrid>
```

---

## Enrutamiento Estático y Enlaces Internos

Para evitar enlaces rotos (*404*) en los builds de producción o tras despliegues en Firebase Multisite:
*   **Formato de Slug Absoluto**: Todos los enlaces internos entre páginas deben hacer referencia al slug absoluto de la aplicación (ruta web), y **nunca al archivo físico `.md` o `.mdx`**.
    *   *Incorrecto*: `[Manual](file:///c:/Users/jjtei/Desktop/Proyectos_IA/apps/documentacion/app-documentacion-farmacia/src/docs/src/content/docs/referencia/protocolo-organizativo.md)` o `[Manual](../referencia/protocolo-organizativo.md)`
    *   *Correcto*: `[Manual](/referencia/protocolo-organizativo/)`
*   Asegúrate de incluir la barra diagonal final `/` en los enlaces internos para un enrutamiento correcto y SEO limpio.

---

## SEO y Metadatos en el Frontmatter

Cada página markdown debe comenzar con un bloque frontmatter de YAML estructurado y descriptivo. Esto alimenta el SEO del portal y el indexador de búsquedas internas (*Pagefind*):

*   **`title`**: Corto, conciso e identificativo del procedimiento (evitar palabras de relleno). Sin emojis.
*   **`description`**: Resumen de 1 a 2 oraciones detallando qué cubre el documento, útil para los snippets de búsqueda.
*   **`template`**: Usar `doc` por defecto. Reservar `splash` únicamente para portadas principales sin barra lateral.
*   **`tableOfContents`**: `true` por defecto para guías largas, `false` para portadas.

Ejemplo:
```yaml
---
title: Control de Caducidades en Inventario
description: Procedimiento operativo para la revisión física mensual de estanterías, rotación de stock (FEFO) y registro en Farmatic.
template: doc
tableOfContents: true
---
```

---

## Estándar Corporativo Libre de Emojis

*   **Regla de Títulos**: Queda terminantemente prohibido incluir emojis decorativos en los títulos y encabezados (`h1`, `h2`, `h3`, etc.) o en el frontmatter del Hero.
    *   *Incorrecto*: `## ⚙️ Configuración y Variables`
    *   *Correcto*: `## Configuración y Variables`
*   **Regla de Portada**: Las tarjetas del grid y las acciones del Hero en `index.md` no deben contener emojis decorativos ni iconos innecesarios.
*   **Identificadores de Responsabilidad**: En las guías de farmacia se usarán exclusivamente badges HTML sin emojis (ej. `<span class="badge-vanessa">Vanessa</span>`).

---

## Bitácora de Referencia de la Refactorización (Julio 2026)

Como ejemplo práctico de conformidad, se detalla la reestructuración realizada:

1.  **Limpieza Masiva de Markdown**: Se procesaron y limpiaron más de 20 archivos `.md` de documentación técnica del portal de IA, eliminando emojis decorativos en más de 40 encabezados secundarios.
2.  **Rediseño de Portadas**: Se eliminaron las declaraciones `icon` del Hero y las etiquetas `<span class="card-icon">` que contenían emojis en las portadas de los dos proyectos.
3.  **Actualización Estética**: Se inyectaron las nuevas variables tipográficas (`Outfit`/`Inter`), el line-height (`1.75`) y el ancho máximo (`76ch`) en las respectivas hojas `custom.css`.
4.  **Validación**: Se ejecutó la compilación de producción (`npm run build`) en local para comprobar que el código es robusto y genera las páginas estáticas satisfactoriamente.

---

## Checklist de Control de Calidad para el Agente (Obligatorio)

Antes de finalizar una tarea de documentación, el agente debe validar el cumplimiento de esta lista:

*   [ ] **Diátaxis**: ¿El documento está en la subcarpeta correcta según su tipo (Tutorial, Guía, Referencia, Explicación)?
*   [ ] **Títulos**: ¿Todos los encabezados (#, ##, ###) del archivo están 100% libres de emojis?
*   [ ] **Enlaces**: ¿Todos los enlaces internos usan la sintaxis de slug absoluta (ej. `/guias/nombre-guia/`) y no apuntan a archivos `.md`?
*   [ ] **Frontmatter**: ¿Se han definido `title` y `description` de forma descriptiva y única?
*   [ ] **CSS/Estilos**: ¿Se utilizan las clases oficiales de badges de personal o de flujos, y no estilos inline ad-hoc?
*   [ ] **MDX Nativos**: ¿Se priorizan los componentes `<Steps>`, `<Aside>` y `<CardGrid>` sobre HTML sucio?
*   [ ] **Compilación**: ¿Se ha ejecutado `npm run build` en el portal y ha completado satisfactoriamente sin advertencias ni enlaces rotos?
