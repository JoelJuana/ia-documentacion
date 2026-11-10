---
title: gestiona_editorial
description: Maquetacion profesional de documentos en formato editorial con calidad de imprenta y exportacion instantanea a PDF vectorial (A4) y Word (.docx). Soporta 4 presets corporativos y tecnicos (oca_global, actas_comunidad, dossier_financiero, seat_124_taller) con control granular de saltos de pagina y tipografia avanzada.
---

*   **Ruta de Configuración**: `IA_Configuracion/skills/gestiona_editorial/SKILL.md`

---

# Habilidad: gestiona_editorial

Esta habilidad dota al agente de capacidades completas de **editorial y maquetador profesional**, permitiendo convertir textos en bruto, actas, minutas, dossiers financieros o borradores de Google Docs en documentos **PDF vectoriales (A4)** y **Word (`.docx`)** maquetados con diseño de alta calidad estética y precisión milimétrica en los saltos de página.

---

## Regla de Clasificación Inicial Obligatoria (4 Ámbitos / Presets)

> **REGLA FUNDAMENTAL**: Siempre que el usuario solicite crear, maquetar o editar un documento, **es obligatorio identificar a cuál de los 4 ámbitos pertenece** (o preguntarlo si es ambiguo), ya que su identidad visual, tipografía, arquitectura de paginación y tono son completamente diferentes:
>
> 1. **Documento de Trabajo / Corporativo (`oca_global`)**:
>    - **Ámbito**: Due Diligence preliminar (Fase 1), Protocolos y Checklists de Auditoría Técnica (Fase 2), informes técnicos de inspección, memorias de innovación o propuestas internas para **OCA Global**.
>    - **Identidad**: Tipografía corporativa *Arial* + *Arial Black* según manual OCA (sin Google Fonts), azul marino `#0B3356`, rojo del logo `#DE473C`, logo recortado de `40 pt` a la derecha, metadatos en grid de 2 columnas, tablas con badges de estado y firma sobria con barra roja.
>
> 2. **Documento Jurídico / Comunidad de Propietarios (`actas_comunidad`)**:
>    - **Ámbito**: Actas de junta, sesiones de trabajo y acuerdos (Modalidad A) o Estatutos y Reglamentos de Régimen Interno articulados conforme al Libro Quinto del CCCat (Modalidad B), como en **CP Mercat Devesa**.
>    - **Identidad**: Estilo institucional jurídico, encabezados y tablas en `'Inter'`, cuerpo expositivo en `'Merriweather'` (Serif), azul clásico `#1B3A5C` y azul acuerdos `#2B6CB0`.
>
> 3. **Dossier Financiero / Plan de Negocio e Inversión (`dossier_financiero`)**:
>    - **Ámbito**: Planes de negocio para bancos e inversores, dossiers estratégicos de compraventa (ej. *Compra Farmacia*, *Ramón Turró*) y estudios de optimización fiscal (IRPF / IS / IVA) vinculados a simuladores de `apps/business-plans/`.
>    - **Identidad**: Arquitectura de **Hojas A4 de Ocupación 100 % (`<section class="hoja-a4">` con `height: 275.5mm` y `justify-content: space-between`)** + modificador `.hoja-densa` para páginas de alta densidad, tiras de 5 KPIs (`.kpi-strip`), bandas en degradado azul, tablas comparativas de escenarios (`.tabla-datos`), tarjetas multicolumna (`.ficha-bloque`) y pie de síntesis (`.diligencia-cierre`).
>
> 4. **Manual Técnico de Taller e Ingeniería (`seat_124_taller`)**:
>    - **Ámbito**: Manuales de instalación eléctrica, restauración técnica, fichas de circuitos SVG y tablas de pines DIN 72552 / FLRY-B (ej. *SEAT 124 FL*).
>    - **Identidad**: Estética SEAT Sport / Bosch Classic (`#C8102E`, `#111827`, `#D97706`), tipografías `'Barlow Condensed'` + `'IBM Plex Sans'` + `'JetBrains Mono'` y esquemas vectoriales SVG sincronizados con `ESPECIFICACION.md`.

---

## Cuándo activar

Activa esta habilidad cuando el usuario o los requisitos soliciten:
* "Maqueta esto con el estilo `oca_global` / `actas_comunidad` / `dossier_financiero` / `seat_124_taller`"
* "Maqueta este informe para OCA Global" / "Haz el protocolo de Fase 2 para..."
* "Prepara el dossier estratégico / plan financiero en PDF A4 de N páginas completas"
* "Pasa este acta / estatuto / reglamento a PDF y Word con formato profesional"
* "Ajusta la paginación para que cada hoja quede al 100 % sin huecos ni cortes"

---

## Arquitectura Simétrica de Carpetas: `presets/<preset>/` y `<Ámbito>/_identidad/`

Tanto la biblioteca interna de la skill (`presets/<nombre_preset>/`) como cada carpeta de proyecto en el workspace del usuario (`IA_Proyectos/docs/editorial/<Ámbito>/_identidad/`) comparten exactamente la misma estructura modular por ámbito y por tipo de documento:

| Preset en la Skill (`presets/`) | Carpeta en Workspace (`docs/editorial/`) | Manual de Marca y Hoja de Estilos | Reglas y Plantillas por Tipo de Documento |
|---|---|---|---|
| `presets/oca_global/` | `OCA Global/_identidad/` | `IDENTIDAD_CORPORATIVA.md`<br>`style.css`<br>`logo_oca_global.png` | • `reglas_due_diligence.md` + `plantilla_due_diligence.html`<br>• `reglas_informe_tecnico.md` + `plantilla_informe_tecnico.html` *(incluye Fase 2 / Checklists)* |
| `presets/actas_comunidad/` | `CP Mercat Devesa/_identidad/` | `IDENTIDAD_CORPORATIVA.md`<br>`style.css` | • `reglas_acta_reunion.md` + `plantilla_acta_reunion.html` *(Modalidad A)*<br>• `reglas_estatutos_reglamento.md` + `plantilla_estatutos_reglamento.html` *(Modalidad B)* |
| `presets/dossier_financiero/` | `Compra Farmacia/_identidad/`<br>`Ramon Turro/_identidad/` | `IDENTIDAD_CORPORATIVA.md`<br>`style.css` | • `reglas_dossier_financiero.md` + `plantilla_dossier_financiero.html` *(Hojas `.hoja-a4` 100 %)* |
| `presets/seat_124_taller/` | `SEAT 124 FL - Instalacion Electrica/_identidad/` | `IDENTIDAD_CORPORATIVA.md`<br>`style.css` | • `reglas_manual_electrico.md` + `plantilla_ficha_circuito.html` |

---

## Dos Filosofías de Paginación A4 (Flujo Continuo vs. Hoja-Bloque 100 %)

Según el preset elegido, la paginación A4 sigue una de estas dos arquitecturas:

### Modo A — Flujo Editorial Continuo (`oca_global` y `actas_comunidad`)
1. **Protección granular a nivel de elemento**:
   - Cada párrafo (`p`), elemento de lista (`li`), tabla (`.oca-table-wrapper`, `.tabla-fincas`) y caja (`.oca-callout`, `.acuerdo`, `.caja-resalte`) lleva `page-break-inside: avoid; break-inside: avoid;`.
   - **Nunca** aplicar `break-inside: avoid` al `ul` completo: si la lista es larga salta entera y deja un hueco enorme en la página anterior. Si un bloque título + intro + lista corta debe ir unido, envolverlo en `.keep-together`.
   - Todos los títulos (`.oca-h1`, `.oca-h2`, `.punto-header`, `.titulo-seccion`, `.articulo-titulo`) llevan `page-break-after: avoid; break-after: avoid;` para no quedar nunca huérfanos al pie de página.
2. **Ajuste del cierre**:
   - Si la firma o diligencia final salta sola a una página extra, compactar primero el ritmo vertical (márgenes de secciones y listas) o condensar párrafos cortos, sin reducir la fuente por debajo del estándar del manual.

### Modo B — Hoja-Bloque de Ocupación 100 % A4 (`dossier_financiero` y fichas técnicas)
1. **Cada página es un contenedor `<section class="hoja-a4">`**:
   - Tiene `height: 275.5mm; display: flex; flex-direction: column; justify-content: space-between; break-after: page; overflow: hidden;`.
   - Distribuye automáticamente los componentes de arriba abajo (cabecera → titular → intro → `.kpi-strip` → `.grupo-seccion` con tabla/tarjetas → `.diligencia-cierre`) para que **la página quede llena al 100 % y el bloque de cierre descanse exactamente en el borde inferior**.
2. **Doble escala tipográfica**:
   - Usar `<section class="hoja-a4">` para páginas ejecutivas de lectura amplia (inversores/bancos).
   - Usar `<section class="hoja-a4 hoja-densa">` cuando una página concentre tablas de 6 escenarios, matrices fiscales y múltiples bloques que requieran la escala compacta para no recortarse por `overflow: hidden`.

---

## Reglas de Oro: Documentos de Trabajo OCA Global (`oca_global`)

Validadas con el usuario en las Fases 1 y 2 de Álabe Ingenieros:

### Contenido y tono
1. **No inventar nada**: Solo hechos confirmados por el usuario (nada de arquitecturas, porcentajes de compra, comités, códigos de expediente o sedes no aportados).
2. **Cuestionario previo (Fase 1)**: Si faltan datos antes de redactar una nota de reunión o Due Diligence preliminar, preguntar en un solo bloque: fecha, asistentes con cargos, objeto real de la cita, qué se vio/dijo realmente, valoración para dirección, dudas/riesgos y próximos pasos reales.
3. **Tono sobrio y llano**: Evitar anglicismos y jerga (*human-in-the-loop*, *pipeline*, *time-to-market*, *foso defensivo*, *M&A*, *stack*) salvo que el usuario los utilice.
4. **Manifestaciones de terceros no verificadas** (certificaciones ISO 12207/90003/25000, cifras declaradas): Recogerlas siempre dentro de `.oca-callout-primary` bajo el título *"Manifestación de la dirección de [Empresa]"*, cerrando con nota en cursiva de que no se ha verificado aún o de que se revisará en Fase 2.
5. **Separar hechos de valoración**: *"Lo que vimos"* (hechos) / *"Por qué nos interesa"* (valoración) / *"Puntos pendientes"* o *"Matriz de verificación técnica"* (tabla con `.badge-observacion` *Pendiente* y `.badge-valorar` *A valorar*) / *"Próximos pasos"*.

### Formato visual
1. **Sin portada independiente** en documentos de 2–4 páginas: cabecera con logo + kicker + título + subtítulo + ficha `.oca-meta-grid` en la primera página.
2. **Logo siempre a la derecha (`40 pt` de alto)** usando `logo_oca_global.png` (recortado sin márgenes transparentes).
3. **Etiqueta de cabecera a la izquierda**: Sin caja ni fuente monoespaciada (`CONFIDENCIAL` en rojo + `Uso interno` en gris), alineada con la base de la palabra `"GLOBAL"`.
4. **Tipografía corporativa**: `Arial` (cuerpo `10 pt`, ficha y tablas `9 pt`) + `Arial Black` (`font-weight: normal`, títulos `.doc-title` y `.oca-h1`). Prohibido usar `@import` de Google Fonts.
5. **Firma (`.doc-signoff`)**: Sin recuadro ni *"Elaborado por:"*. Barra roja a la izquierda, nombre en negrita azul y cargo debajo (por defecto: *Joel Juana Teixidor · Responsable de Innovación · OCA Global*).

---

## Protocolo Operativo del Agente (Paso a Paso)

### Paso 1: Clasificación y Selección de Plantilla
* Identificar el ámbito (`oca_global`, `actas_comunidad`, `dossier_financiero` o `seat_124_taller`) y leer el `IDENTIDAD_CORPORATIVA.md` y el archivo `reglas_<tipo>.md` correspondiente de `presets/<preset>/`.
* Para inicializar rápidamente una carpeta nueva (aprovisionando además su subcarpeta `_identidad/` si no existe), puedes usar el script `new-doc.ps1`:
  ```powershell
  & "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\new-doc.ps1" -Preset oca_global -Tipo due_diligence -Slug "due-diligence-empresa"
  ```

### Paso 2: Compilación Editorial en 1 Comando (`build_editorial.js`)
Ejecutar el CLI Node.js `build_editorial.js` para:
1. Renderizar el PDF A4 vectorial con Microsoft Edge Headless.
2. Generar las capturas de verificación en `preview/page_1.png`, `preview/page_2.png`, etc.
3. Verificar que no supere el objetivo de páginas (`--max-pages <N>`).
4. Exportar automáticamente el archivo **Word (`.docx`)** en documentos de **OCA Global** (`export-oca-docx.py`), **Comunidad de Propietarios** (`export-comunidad-docx.py`) y **Dossiers Financieros** (`export-dossier-docx.py`):

```powershell
node "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\build_editorial.js" "C:\ruta\a\la\carpeta\documento.html" --max-pages 2
```
* Opciones soportadas por `build_editorial.js`:
  - `--max-pages <N>`: Verifica que el PDF resultante no supere `N` páginas; si las supera, muestra una alerta indicando qué página revisar.
  - `--pdf <ruta.pdf>`: Personaliza el nombre o ruta del archivo PDF (y DOCX) de salida.
  - `--dpi <N>`: Resolución de las capturas PNG en `preview/` (por defecto `130`).
  - `--no-docx`: Omite la generación automática del archivo `.docx`.

### Paso 3: Verificación Visual Obligatoria y Registro en el Visor
* Inspeccionar siempre las capturas generadas en `preview/page_1.png`, `preview/page_2.png`, etc. con `read_file` para comprobar que no haya huecos, títulos huérfanos, firmas desbordadas ni cortes en bloques `.hoja-a4`.
* Conservar la carpeta `preview/` y registrar el documento en `docs/editorial/index.html` (`EDITORIAL_DOCS`) y en `docs/editorial/README.md` para que el Centro Editorial interactivo esté siempre al día.

---

## Procedimiento para Crear o Actualizar Presets

Cuando se cree o mejore un preset de estilo:
1. Actualizar `presets/<nombre_preset>/` en ambas rutas de la skill:
   - `C:/Users/jjtei/.gemini/config/skills/gestiona_editorial/presets/<nombre_preset>/`
   - `C:/Users/jjtei/Desktop/IA_Configuracion/skills/gestiona_editorial/presets/<nombre_preset>/`
2. Sincronizar la carpeta `<Ámbito>/_identidad/` correspondiente dentro de `C:/Users/jjtei/Desktop/IA_Proyectos/docs/editorial/`.
