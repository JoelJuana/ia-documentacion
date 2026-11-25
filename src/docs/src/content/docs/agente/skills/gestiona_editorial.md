---
title: gestiona_editorial
description: "Maquetacion profesional de documentos en formato editorial con calidad de imprenta y exportacion instantanea a PDF vectorial (A4) y Word (.docx). Soporta 4 presets corporativos y tecnicos (oca_global, actas_comunidad, dossier_financiero, seat_124_taller) con control granular de saltos de pagina y tipografia avanzada."
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
>    - **Ámbito**: Convocatorias, Actas de Junta de Presidentes o de Asamblea General, Certificados para Notaría y Registro (Modalidad A) o Estatutos y Reglamentos de Régimen Interno articulados conforme al Libro Quinto del CCCat (Modalidad B), como en **CP Mercat Devesa** (Finca Matriz 4.001 de Girona).
>    - **Identidad**: Estándar Monocromo Notarial y Registral (`#111827` negro pizarra, `#1F2937` cuerpo, `#4B5563` subtítulos, fondos blancos sin cajas azules), encabezados en `'Inter'` y cuerpo expositivo en `'Merriweather'` (Serif).
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
| `presets/actas_comunidad/` | `CP Mercat Devesa/_identidad/` | `IDENTIDAD_CORPORATIVA.md`<br>`style.css` | • `reglas_acta_reunion.md` + `plantilla_convocatoria.html`, `plantilla_asistencia.html`, `plantilla_acta_reunion.html`, `plantilla_certificado.html` *(Modalidad A)*<br>• `reglas_estatutos_reglamento.md` + `plantilla_estatutos_reglamento.html` *(Modalidad B)* |
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

## Reglas de Oro: Comunidad de Propietarios y Propiedad Horizontal Catalana (`actas_comunidad` — Libro Quinto CCCat)

Validadas en la actualización estatutaria y documental de la **Comunidad General del Mercado de la Devesa** (Finca Matriz **4.001** del Registro de la Propiedad de Girona n.º 2, Tomo **2.407**, Libro **314** de Girona, Sección **1.ª**, Folio **159**):

1. **Datos fijos de las 4 Comunidades Integrantes y cargos vigentes (CP Mercat Devesa)**:
   - **Comunidad de Propietarios de Paradas (`62,082 %`)**: Presidente, **D. Toni Ortiz** (quien ejerce asimismo el cargo de **Secretario General de la Comunidad General**, en representación orgánica de *Toni Ortiz Peixaters, S.L.*, `N.I.F. B-64455512`, finca `18.893`).
   - **Comunidad de Propietarios de Aparcamientos (`17,519 %`)**: Presidente, **D. Josep Pujol**.
   - **Comunidad de Propietarios de Locales (`14,064 %`)**: Presidenta, **D.ª Judith Pell**.
   - **Comunidad de Propietarios de Almacenes (`6,335 %`)**: Presidente, **D. Joel Juana Teixidor** (`D.N.I. 40.368.592-G`, cotitular registral de la finca `18.908`), quien ejerce el cargo de **Presidente de la Comunidad General** (y administración interna sin remuneración, manteniéndose diferenciados Presidencia y Secretaría conforme al art. 553-15.1 CCCat tras la Ley 5/2015).
2. **Estándar Monocromo Notarial y Registral (`#111827`) y compacidad en 1 página A4**:
   - En documentos oficiales (Estatutos, Convocatorias, Actas de reunión y Certificados para Notaría y Registro), usar exclusivamente escala monocroma (`#111827` títulos y filetes, `#1F2937` cuerpo, `#4B5563` subtítulos, sin cajas azules ni colores naranjas en `.docx`).
   - Las **Convocatorias**, **Actas de reuniones ordinarias/concretas** y **Certificados para Notaría y Registro** deben maquetarse para caber en **1 sola página A4** (en las Actas, pasar directamente a `ACUERDOS ADOPTADOS` sin repetir un bloque previo de Orden del Día).
3. **Convocatorias y Notificaciones (arts. 553-21 a 553-24 y 553-26 CCCat)**:
   - **Única convocatoria y hora**: En Cataluña rige única convocatoria sin quórum mínimo (art. 553-23 CCCat). En la Convocatoria / Orden del Día solo se indica la **hora de inicio** (la hora de finalización solo consta en el Acta) y nunca se predetermina en el Orden del Día el nombre del candidato a elegir.
   - **Régimen de acuerdos (art. 553-26 CCCat)**: Citar genéricamente *«conforme al régimen de acuerdos del artículo 553-26 del Código Civil de Cataluña»* (sin encasillarse entre unanimidad o 4/5 partes) para que el silencio positivo de los ausentes durante 1 mes (art. 553-26.3 CCCat) sirva tanto para unanimidad (553-26.1) como para 4/5 (553-26.2).
   - **Requisitos del art. 553-21.4 CCCat**: Detallar en el Punto Primero las materias estatutarias clave, adjuntar el texto íntegro de los Estatutos, incluir en el Punto Segundo la facultad de solicitar **inscripción total o parcial**, hacer constar expresamente la advertencia del voto favorable de los ausentes tras 1 mes (art. 553-26.3 CCCat) y la situación de morosidad / inexistencia de deudas vencidas frente a la Comunidad General (art. 553-21.4.d CCCat), con protocolo de notificación en orden: **(1)** elementos privativos del edificio, **(2)** tablón de anuncios de la Comunidad General (con diligencia fechada del art. 553-21.2 CCCat) y **(3)** contactos facilitados por las Presidencias.
4. **Estatutos vs. Acta y Cláusulas Separadas Arts. 13 y 14 (arts. 553-13.3, 567-2 y 567-3.2 CCCat y 98 LH)**:
   - **Finiquitos del pasado fuera de los Estatutos**: Los pactos de liquidación, exoneración o renuncia de reclamaciones por obras, reparaciones o incumplimientos de los antiguos Estatutos carecen de trascendencia real (art. 98 LH) y no deben ir como artículo de los Estatutos (que quedan limpios del Art. 1 al 15), sino como acuerdo en el **Acta de la Junta de Presidentes** supeditado a la aprobación unánime e inscripción registral de los nuevos Estatutos.
   - **Separación de Art. 13 (reordenación/unificación) y Art. 14 (`14.1` solar + `14.2` cubrición de C/ Ramón Turró)**: El `Art. 13` regula la reordenación interior, unificación reversible en finca única (`13.1`) y otorgamiento directo (`13.2`); el `Art. 14.1` regula las placas solares e instalaciones en ambas cubiertas superiores (`2.2` y `2.4`, excluido Patio Interior) y el **`Art. 14.2`** recoge en **cláusula separada y específica** (`arts. 553-13.3` y `567-3.2 CCCat`) la cubrición parcial o total de la cubierta de C/ Ramón Turró (`2.4`) con los 4 requisitos determinativos del `art. 567-2.1 CCCat`: **(1)** tope de altura máxima ya existente en el edificio (`planta baja y tres plantas piso`) y prohibición de superar el número de elementos privativos consignado en el preámbulo (inscripción `4.ª`), **(2)** plazo máximo improrrogable de **treinta años desde el otorgamiento de la escritura**, **(3)** recálculo de cuotas internas **en proporción a su superficie útil** manteniendo invariables los cuatro coeficientes generales, y **(4)** carácter inseparable *ob rem* **sin contraprestación por reciprocidad estatutaria** y asunción íntegra de gastos de su cubierta y envolvente.
5. **Arquitectura Obligatoria de Carpetas, Kits por Reunión y Conocimiento Vivo (`CP Mercat Devesa`)**:
   - **Organización por órgano y fecha real de la reunión (`AAAA-MM-DD`)**: Nunca mezclar varios documentos distintos en la misma carpeta hoja (para que cada pieza tenga su propio `editorial.meta.json` y sea visible en el Visor Editorial), ni usar la fecha de redacción en lugar de la fecha de celebración:
     * `01_Normativa/N01_...`, `N02_...`: Estatutos y Reglamentos vigentes + subcarpeta `firmados/`.
     * `02_Junta_Presidentes/JP-AAAA-MM-DD_<Asunto>/`: Kit fijo obligatorio de **`01-convocatoria/`** (Convocatoria + Orden del Día unificados) + **`02-acta/`** + **`firmados/`** *(+ `03-certificado/` opcional)*.
     * `03_Asamblea_General/AG-AAAA-MM-DD_<Asunto>/`: Kit fijo obligatorio de **`01-convocatoria/`** + **`02-asistencia/`** (Hoja de Control de Asistencia, Delegaciones y Escrutinio) + **`03-acta/`** + **`firmados/`** *(+ `04-certificado/` cuando vaya a Notaría/Registro)*.
     * `04_Sesiones_Trabajo/ST-AAAA-MM-DD_<Asunto>/`: Minutas internas o notas preparatorias que no van al Libro de Actas.
     * `05_Subcomunidad_<Nombre>/SC-AAAA-MM-DD_<Asunto>/`: Juntas propias de cada subcomunidad con el mismo kit que `AG`.
   - **Nomenclatura oficial de archivos**: `<Expediente>_<Paso>_<Descripción>_Devesa.pdf` / `.docx` (ej. `AG-2027-01-15_03_Acta_Asamblea_Estatutos_Devesa.pdf`).
   - **Inicialización automática de reuniones con `new-reunion-devesa.ps1`**: Siempre que el usuario pida preparar una nueva Junta de Presidentes, Asamblea o reunión de subcomunidad, crear primero el expediente completo con:
     ```powershell
     & "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\new-reunion-devesa.ps1" -Organo JP -Fecha "2027-03-15" -Slug "Ordinaria-Presupuesto-2027"
     ```
     *(Usar `-Organo AG -ConCertificado` para Asambleas con elevación a público).*
   - **Mantenimiento colaborativo del archivo de conocimiento `CP Mercat Devesa/README.md`**: `build_editorial.js` regenera de forma 100 % automática el inventario, enlaces y tabla de auditoría de kits/evidencias de `CP Mercat Devesa/README.md` en cada compilación. Adicionalmente, cuando se adopten nuevos acuerdos relevantes, cambien cargos o se abran nuevos frentes jurídicos/económicos en la Comunidad, el agente **debe actualizar también el bloque narrativo «2. Qué Estamos Haciendo»** de dicho `README.md` para mantener viva la memoria institucional.

---

## Protocolo Operativo del Agente (Paso a Paso)

### Paso 1: Clasificación y Selección de Plantilla
* Identificar el ámbito (`oca_global`, `actas_comunidad`, `dossier_financiero` o `seat_124_taller`) y leer el `IDENTIDAD_CORPORATIVA.md` y el archivo `reglas_<tipo>.md` correspondiente de `presets/<preset>/`.
* Para inicializar rápidamente una carpeta nueva (enlazada automáticamente a `../_identidad/style.css` + `editorial.meta.json`), usar el script `new-doc.ps1`:
  ```powershell
  & "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\new-doc.ps1" -Preset oca_global -Tipo due_diligence -Slug "due-diligence-empresa" -Titulo "Due Diligence Preliminar: Empresa"
  ```

### Paso 2: Compilación Editorial, Bookmarks PDF, QA Geométrico y Autocatálogo (`build_editorial.js`)
Ejecutar el CLI Node.js `build_editorial.js` para:
1. Renderizar el PDF A4 vectorial con Microsoft Edge Headless.
2. Inyectar automáticamente **Marcadores/Índice interactivo PDF (Outlines/TOC)** y metadatos corporativos mediante `postprocess-pdf.py`.
3. Ejecutar **QA geométrico** por página (`%` de ocupación útil, detección de recortes por `overflow: hidden` en `.hoja-a4` y alerta de firmas huérfanas en flujo continuo).
4. Generar las capturas de verificación en `preview/page_1.png`, `preview/page_2.png`, etc. y verificar `--max-pages <N>`.
5. Exportar automáticamente el archivo **Word (`.docx`)** (`export-oca-docx.py`, `export-comunidad-docx.py`, `export-dossier-docx.py`).
6. Actualizar `editorial.meta.json` y regenerar automáticamente `docs/editorial/catalog.js` para el visor interactivo.

```powershell
node "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\build_editorial.js" "C:\ruta\a\la\carpeta\documento.html" --max-pages 2
```
* Opciones soportadas por `build_editorial.js`:
  - `--max-pages <N>`: Verifica que el PDF resultante no supere `N` páginas; si las supera, muestra una alerta indicando qué página revisar.
  - `--pdf <ruta.pdf>`: Personaliza el nombre o ruta del archivo PDF (y DOCX) de salida.
  - `--data <datos.json>`: Actualiza nodos HTML con atributo `data-bind="clave"` antes de compilar (puente con simuladores).
  - `--dpi <N>`: Resolución de las capturas PNG en `preview/` (por defecto `130`).
  - `--no-docx`: Omite la generación automática del archivo `.docx`.
  - `--sync-catalog`: Escanea `docs/editorial/` y regenera `catalog.js` sin recompilar PDFs.
  - `--sync-presets`: Propaga los 4 presets a `IA_Configuracion/skills/gestiona_editorial/presets/` y a todas las carpetas `<Ámbito>/_identidad/`.

### Paso 3: Verificación Visual Obligatoria y Registro en el Visor
* Inspeccionar siempre las capturas generadas en `preview/page_1.png`, `preview/page_2.png`, etc. con `read_file` para comprobar que no haya huecos, títulos huérfanos, firmas desbordadas ni cortes en bloques `.hoja-a4`.
* Conservar la carpeta `preview/`, ajustar si procede la descripción/tags en `editorial.meta.json` (seguido de `--sync-catalog`) y mantener actualizado `docs/editorial/README.md`.

---

## Procedimiento para Crear o Actualizar Presets

Cuando se cree o mejore un preset de estilo:
1. Editar los archivos en `C:/Users/jjtei/.gemini/config/skills/gestiona_editorial/presets/<nombre_preset>/`.
2. Ejecutar `node "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\build_editorial.js" --sync-presets` para replicarlos automáticamente en `IA_Configuracion/skills/gestiona_editorial/presets/` y en todas las carpetas `<Ámbito>/_identidad/` de `docs/editorial/`.
