---
title: gestiona_editorial
description: Maquetacion profesional de documentos en formato editorial con calidad de imprenta y exportacion instantanea a PDF vectorial (A4). Soporta multiples presets de estilo (actas de comunidad, informes ejecutivos, contratos, propuestas, informes tecnicos OCA Global) con control granular de saltos de pagina y tipografia avanzada.
---

*   **Ruta de Configuración**: [`IA_Configuracion/skills/gestiona_editorial/`](file:///C:/Users/jjtei/Desktop/IA_Configuracion/skills/gestiona_editorial/SKILL.md)

---

# Habilidad: gestiona_editorial

Esta habilidad dota al agente de capacidades completas de **editorial y maquetador profesional**, permitiendo convertir textos en bruto, actas, minutas o borradores de Google Docs en documentos PDF maquetados con diseno de alta calidad estetica y precision milimetrica en los saltos de pagina.

---

## Regla de Clasificación Inicial Obligatoria (Personal vs. Trabajo)

> **REGLA FUNDAMENTAL**: Siempre que el usuario solicite crear, maquetar o editar un documento, **es obligatorio identificar o preguntar si se trata de un documento personal o de trabajo (empresa)**, ya que su naturaleza, identidad visual y estructura son completamente diferentes:
> 
> 1. **Documento Personal / Comunitario**:
>    - Ámbito: Actas de propietarios, estatutos de comunidad, reglamentos particulares, acuerdos privados.
>    - Preset asignado: `actas_comunidad` (estilo institucional sobrio, tipografía Serif *Merriweather*, azul clásico `#1B3A5C`).
> 
> 2. **Documento de Trabajo / Corporativo (OCA Global)**:
>    - Ámbito: Informes técnicos, auditorías, memorias de inspección, dictámenes periciales, propuestas técnicas o actas laborales para la empresa **OCA Global**.
>    - Preset asignado: `oca_global` (estilo ejecutivo técnico, tipografía corporativa *Arial* + *Arial Black* según manual OCA, azul marino `#0B3356`, rojo del logo `#DE473C`, metadatos en grid, tablas normalizadas y firmas técnicas).

---

## Cuándo activar

Activa esta habilidad cuando el usuario o los requisitos soliciten:
* "Maqueta esto con el estilo actas_comunidad"
* "Maqueta este informe para OCA Global" / "Haz un informe técnico con estilo de empresa"
* "Maqueta este texto con el estilo X"
* "Pasa este documento a PDF con formato profesional / editorial"
* "Crea un nuevo estilo editorial llamado X"
* "Ajusta la paginacion para que no queden huecos / no se corten los puntos"

## Arquitectura de Reglas por Tipo de Documento (`reglas/` y `docs/editorial/_reglas/`)

Las reglas específicas de maquetación, tono y estructura por cada tipo de documento están modularizadas tanto dentro de la skill (`reglas/`) como visibles en el propio workspace del usuario (`IA_Proyectos/docs/editorial/_reglas/`):

1. **`00_paginacion_y_maquetacion_a4.md`**: Reglas universales de saltos de página (`break-inside: avoid` en `p` y `li`, nunca en `ul`), control de huérfanas y calibración A4.
2. **`oca_01_identidad_y_tono_corporativo.md`**: Manual visual OCA Global (`Arial` + `Arial Black`, `#0B3356` + `#DE473C`, logo a la derecha), cero invención de datos, lenguaje llano sin anglicismos y tratamiento de manifestaciones de terceros no verificadas.
3. **`oca_02_due_diligence_y_notas_reunion.md`**: Cuestionario previo obligatorio y estructura de 5 secciones para Due Diligence preliminar y notas de evaluación de empresas/herramientas.
4. **`oca_03_informes_tecnicos_y_propuestas.md`**: Estructura para informes técnicos de inspección, memorias de innovación y propuestas internas de OCA Global.
5. **`comunidad_01_actas_y_acuerdos.md`**: Reglas de Actas de Junta, Sesiones de Trabajo y Documentos de Alineación (Preset `actas_comunidad` — Modalidad A).
6. **`comunidad_02_estatutos_y_reglamentos.md`**: Reglas de Estatutos y Reglamentos de Régimen Interno articulados conforme al Libro Quinto del CCCat (Preset `actas_comunidad` — Modalidad B).

---

## Biblioteca de Presets de Estilo (`presets/` y `docs/editorial/_plantillas/`)

Los presets se almacenan de forma modular en `presets/<nombre_preset>/` (y se replican en `docs/editorial/_plantillas/<nombre_preset>/`):

### 1. Preset `actas_comunidad` (Comunidad de Propietarios: Actas, Estatutos y Reglamentos)
* **Objetivo**: Todos los documentos de la Comunidad de Propietarios y ámbito personal/jurídico, con soporte nativo para **dos modalidades** en el mismo `style.css`:
  1. **Modalidad A — Actas de Reunión, Sesiones de Trabajo y Acuerdos** (`.header`, `.punto`, `.punto-header`, `.punto-num`, `.acuerdo`, `.compromisos-lista`, `.nota-final`).
  2. **Modalidad B — Estatutos, Reglamentos de Régimen Interno y Textos Articulados** (`.doc-header`, `.titulo-seccion`, `.articulo-titulo`, `.art-num`, `.subapartado-titulo`, `.tabla-fincas`, `.caja-resalte`, `.diligencia-cierre`, `.seccion-firmas`).
* **Tipografías**: 
  - Títulos, encabezados, tablas y fichas: `'Inter'` (Sans-serif, 700 / 600).
  - Cuerpo de texto: `'Merriweather'` (Serif, 9 pt, interlineado 1.48, texto justificado con `hyphens: auto` y `text-wrap: pretty`).
* **Paleta de Color**:
  - Azul institucional primario: `#1B3A5C` (cabeceras, badges numéricos, cabeceras de tabla, bordes destacados).
  - Azul secundario: `#2B6CB0` (cajas de compromiso/acuerdo clave, viñetas y subapartados).
  - Fondos suaves: `#F8FAFC` (tarjetas de metadatos), `#EDF2F7` (acuerdos) y `#EFF6FF` (cajas de resalte normativo).
  - Texto principal: `#1A202C` / `#2D3748` sobre blanco `#FFFFFF`.
* **Cabecera y pie `@page`**: Cabecera corrida en páginas 2+ (`@top-left` y `@top-right`, suprimida en `:first`) y numeración `"Página X de Y"` en `@bottom-right`.

### 2. Preset `oca_global` (Informes Técnicos, Auditorías y Documentos Corporativos de Trabajo)
* **Objetivo**: Informes técnicos, notas internas, valoraciones, due diligence y documentación de trabajo para **OCA Global**.
* **Referencia validada**: `IA_Proyectos/docs/editorial/OCA Global/2026-10-due-diligence-alabe-ingenieros/` (aprobado por el usuario, oct-2026).
* **Archivos del preset**: `style.css`, `template.html` y `logo_oca_global.png` (logo ya recortado sin márgenes transparentes). Copiar los tres a la carpeta del nuevo documento.
* **Tipografías** (según el manual corporativo publicado por OCA: [documento de ejemplo](https://docs.google.com/document/d/1NPv-Hk3bLkLnzbUDpJb5Dz7Dj5ntp_5rSk99zi8OOlQ/edit)):
  - **Arial** para todo el cuerpo (10 pt, interlineado 1.45), ficha (9 pt), tablas (9 pt), etiquetas, kicker y números de subapartado.
  - **Arial Black** (con `font-weight: normal` para evitar negrita sintética) para el título del documento y los títulos de sección `.oca-h1` y sus números.
  - Fuentes de sistema: no usar `@import` de Google Fonts. No usar Inter ni fuentes monoespaciadas.
* **Paleta de Color Corporativa**:
  - Azul marino: `#0B3356` (coincide con manual y logo: títulos, raya de cabecera, cabeceras de tabla).
  - Rojo corporativo: `#DE473C` (muestreado del logo; el manual usa `#D43235` en algún texto): números de sección, viñetas, "Confidencial", barra de firma.
  - Texto principal `#262626` (manual). Filas alternas de tabla `#F2F2F2` (manual).
  - Fondos: `#F8FAFC` (ficha y callouts primarios), `#FFF9F8` (callout de valoración). Secundarios `#555C66` / `#64748B`, bordes `#CBD5E1` / `#E2E8F0`.
* **Componentes Semánticos** (ver `template.html`):
  - `.doc-head`: `.doc-head-tag` sin caja a la izquierda ("CONFIDENCIAL" en rojo + "Uso interno" en gris) y **logo (40 pt de alto) siempre a la derecha**, como en los documentos de OCA. Etiqueta alineada con la línea base de "GLOBAL". Raya azul inferior con acento rojo bajo el logo.
  - `.doc-kicker` + `.doc-title` + `.doc-subtitle`: bloque de título en la primera página (sin portada independiente en documentos cortos).
  - `.oca-meta-grid` / `.oca-meta-field`: ficha de 2 columnas con número par de campos.
  - `.oca-h1` (números 1, 2, 3) y `.oca-h2` (2.1, 2.2) con `.sec-num` en rojo en ambos niveles (Arial Black en secciones, Arial negrita en subsecciones).
  - `.oca-p` (justificado, `text-wrap: pretty`) y `.oca-list` (alineada a la izquierda, viñeta cuadrada roja).
  - `.oca-callout-accent` (valoración/recomendación) y `.oca-callout-primary` (manifestaciones de terceros).
  - `.oca-table` + `.badge-status` (`badge-conforme` verde, `badge-no-conforme` rojo, `badge-observacion` ámbar para *Pendiente*, `badge-valorar` azul para *A valorar*).
  - `.keep-together`: agrupa título + intro + lista corta para que no se partan.
  - `.doc-signoff`: firma sin caja (nombre en negrita + cargo, barra roja a la izquierda, 26 pt de separación).
  - `@page`: cabecera corrida discreta en páginas 2+ (tipo de documento a la izquierda / "OCA GLOBAL" a la derecha) y pie con "Página X de Y". Sustituir los textos `[entre corchetes]` del CSS.

### 3. Preset `seat_124_taller` / `manual_tecnico` (Manuales Técnicos de Taller e Ingeniería Automotriz)
* **Objetivo**: Manuales de instalación eléctrica, restauración técnica, fichas de mazos de cableado y esquemas DIN/Bosch (como `SEAT 124 FL - Instalacion Electrica`).
* **Tipografías**: `'Barlow Condensed'` (títulos y cabeceras), `'IBM Plex Sans'` (cuerpo técnico) y `'JetBrains Mono'` (pines, bornes DIN 72552 y secciones en mm²).
* **Paleta de Color**: Rojo SEAT Competición (`#C8102E`), Carbón Chasis (`#111827`), Ámbar Bosch (`#D97706`) y Gris Acero (`#334155`).

---

## Reglas Fundamentales de Maquetacion y Paginacion A4

Para evitar paginas con grandes espacios en blanco o parrafos cortados de forma antiestetica, el agente debe aplicar estrictamente estas directrices:

1. **Proteccion Granular a nivel de Parrafo**:
   - Cada parrafo (`p`), elemento de lista (`li`), tabla (`.oca-table-wrapper`) y caja (`.oca-callout`) debe llevar `page-break-inside: avoid; break-inside: avoid;`.
   - **No** aplicar `break-inside: avoid` a la lista `ul` completa: si es larga salta entera y deja un hueco grande en la página anterior. Proteger cada `li` y, si el bloque es corto, envolver título + intro + lista en `.keep-together`.
   - Los titulos (`.oca-h1`, `.oca-h2`, `.punto-header`) deben llevar siempre `page-break-after: avoid; break-after: avoid;` para que nunca queden huerfanos al final de pagina.
2. **Distribucion Homogenea por Paginas**:
   - En lugar de forzar que secciones gigantescas queden enteras en una pagina (lo que genera grandes huecos en la anterior), se permite el salto natural entre parrafos o se usa la clase `.nueva-pagina` (`page-break-before: always;`) en los puntos de inicio deseados.
   - Un hueco de 2-3 líneas al final de una página es preferible a partir un bloque título + lista.
   - Si la firma o un bloque final salta solo a una página nueva, compactar primero el ritmo vertical (márgenes de títulos y listas) o fusionar párrafos muy cortos, en vez de reducir la fuente.
3. **Calibracion de Capacidad A4**:
   - A4 estandar (margenes 16-18 mm, fuente 9.2-9.5 pt, interlineado 1.5) admite aproximadamente **48 a 54 lineas de texto por hoja**.

---

## Lecciones Aprendidas: Documentos de Trabajo OCA Global

Validadas con el usuario en la Due Diligence preliminar de Álabe Ingenieros (oct-2026). Aplicar siempre en documentos de trabajo para OCA Global.

### Contenido y tono
1. **No inventar nada**. Solo hechos que el usuario confirme. Nada de flujos técnicos, arquitecturas, certificaciones, porcentajes de compra, comités, referencias de expediente o direcciones de sede que no se hayan dado.
2. **Preguntar antes de redactar** (con `ask_question`, varias preguntas en un solo bloque): tipo de documento, destinatario, autor y cargo, fecha, asistentes, objeto real de la reunión, qué se vio/dijo realmente, valoración que se quiere transmitir, dudas/riesgos y próximos pasos reales.
3. **Tono sobrio y llano**, sin parecer más técnico de lo que es: evitar anglicismos y jerga ("human-in-the-loop", "pipeline", "time-to-market", "foso defensivo", "M&A") salvo que el usuario los use.
4. **Afirmaciones de terceros no verificadas** (certificaciones ISO, documentación, cifras): recogerlas como *"Manifestación de la dirección de [Empresa]"* en `.oca-callout-primary`, con una nota en cursiva: *"Se recoge tal y como nos lo trasladaron. No hemos podido verificarlo."*. Nunca afirmarlas como hechos de OCA.
5. **Separar hechos de valoración**: "Lo que vimos" (hechos) / "Por qué nos interesa" (valoración) / "Puntos pendientes" (tabla con lo que no sabemos y badge Pendiente / A valorar) / "Próximos pasos" (solo reales o marcados como propuesta).
6. **Destacar lo que aporta valor**, no lo obvio: p. ej., en lugar de "tienen conocimiento del negocio" (se da por hecho), destacar mejora continua, optimización, automatización y metodología común.
7. **Títulos honestos**: mantener calificativos como "preliminar" cuando el alcance es limitado; el "Objeto" de la ficha describe lo que fue realmente la reunión (p. ej., "Demostración de la herramienta y sus funcionalidades").
8. **Extensión**: 2-3 páginas para notas de reunión/valoraciones iniciales.

### Formato
1. **Sin portada independiente** en documentos cortos: cabecera con logo + kicker + título + subtítulo + ficha en la primera página.
2. **Logo**: siempre **a la derecha** (convención de los documentos de OCA). Usar el PNG recortado sin márgenes transparentes (el original de 1024×684 tiene mucho aire y se ve diminuto). Altura 40 pt.
3. **Etiqueta de cabecera**: a la izquierda, sin caja ni fuente monoespaciada. "CONFIDENCIAL" (rojo, mayúsculas espaciadas) + "Uso interno" (gris). Alineada abajo con la línea base de "GLOBAL" (no arriba ni centrada). No poner códigos de referencia inventados. Si un texto con `letter-spacing` va alineado a la derecha, compensar el espaciado final con `margin-right` negativo.
4. **Firma**: sin caja ni "Elaborado por". Nombre en negrita + cargo, barra roja fina a la izquierda y ~26 pt de separación del último párrafo. Autor por defecto: *Joel Juana Teixidor · Responsable de Innovación · OCA Global*.
5. **Numeración coherente**: números en rojo corporativo en secciones y subsecciones.
6. **Listas alineadas a la izquierda** (el justificado crea huecos en líneas cortas); párrafos justificados con `text-wrap: pretty` para evitar palabras sueltas.
7. **Cabecera corrida en páginas 2+** vía `@page` margin boxes: `@top-left` con el tipo de documento (gris) y `@top-right` con "OCA GLOBAL" (azul, negrita espaciada), suprimida en `@page :first`. Pie con "Página X de Y".
8. **HTML siempre con atributos entre comillas** (`class="..."`, `style="..."`) y `content: "..."` en CSS: se detectó un documento con las comillas eliminadas que rompía estilos.
9. **Tipografía corporativa**: Arial (cuerpo) + Arial Black (títulos), como el manual de OCA. No usar Inter, monoespaciadas ni Google Fonts.

---

## Protocolo Operativo del Agente (Paso a Paso)

Cuando se solicite maquetar un documento:

### Paso 1: Clasificación del Documento
* **Determinar siempre si es Personal o de Trabajo (OCA Global)**. Si no viene especificado en la petición, **preguntar al usuario** antes de generar la plantilla.

### Paso 2: Recepcion y Estructuracion del Texto
* Si es un enlace de Google Docs o borrador local: estructurarlo en secciones, metadatos y tablas.
* Si es OCA Global: copiar `style.css`, `template.html` y `logo_oca_global.png` del preset a la carpeta del documento (`IA_Proyectos/docs/editorial/OCA Global/<aaaa-mm-nombre>/`), hacer las preguntas de la sección "Lecciones Aprendidas" y sustituir todos los `[placeholders]` (también los de `@page` en el CSS).

### Paso 3: Compilación Editorial en 1 Comando (`build_editorial.js` o `compile-pdf.ps1`)
Ejecutar el CLI Node.js **`build_editorial.js`** para renderizar el PDF A4 vectorial con Edge Headless, generar automáticamente las capturas de verificación en `preview/page_1.png`, `preview/page_2.png`, etc., comprobar que no exceda el objetivo de páginas (`--max-pages <N>`) y exportar automáticamente el archivo **Word (`.docx`)** en documentos de **OCA Global**:
```powershell
node "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\build_editorial.js" "C:\ruta\a\la\carpeta\documento.html" --max-pages 2
```
* Opciones soportadas por `build_editorial.js`:
  - `--max-pages <N>`: Verifica que el PDF resultante no supere `N` páginas; si las supera, imprime una alerta destacada en consola indicando qué página revisar.
  - `--pdf <ruta.pdf>`: Personaliza el nombre o ruta del archivo PDF de salida.
  - `--dpi <N>`: Resolución de las capturas PNG en `preview/` (por defecto `130`).
  - `--no-docx`: Omite la generación automática del archivo `.docx` en documentos de OCA Global.
* Alternativa en PowerShell (`compile-pdf.ps1`):
```powershell
& "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\compile-pdf.ps1" -HtmlPath "C:\ruta\a\la\carpeta\documento.html" -Preview
```
* Si se desea regenerar únicamente el archivo Word (`.docx`):
```powershell
python "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\export-oca-docx.py" "C:\ruta\a\la\carpeta\documento.html"
```

### Paso 4: Verificacion Visual Obligatoria y Limpieza
* Revisar las capturas generadas en `preview/page_1.png`, `preview/page_2.png`, etc. con `view_file` (huecos, títulos huérfanos, firma desbordada, número de páginas).
* Para detalles finos (alineaciones de cabecera), renderizar un recorte a 200 dpi con `clip=pymupdf.Rect(...)`.
* Si el documento va a servirse en el **Centro Editorial y Visor Documental** (`docs/editorial/index.html`), conservar `preview/page_1.png`, `preview/page_2.png`, etc. para que el visor modal interactivo muestre las páginas al instante.

---

## Procedimiento para Guardar Nuevos Presets de Estilo

Cuando el usuario pida: *"Guarda este formato como estilo X"*:
1. Crear la subcarpeta `presets/<nombre_preset>/` en ambas rutas de la skill:
   - `C:/Users/jjtei/Desktop/IA_Configuracion/skills/gestiona_editorial/presets/<nombre_preset>/`
   - `C:/Users/jjtei/.gemini/config/skills/gestiona_editorial/presets/<nombre_preset>/`
2. Guardar `style.css` con todas las fuentes, paleta y reglas CSS Paged Media.
3. Guardar `template.html` como plantilla estructural de referencia.
4. Actualizar el catalogo de presets en el `SKILL.md` de ambas carpetas.
