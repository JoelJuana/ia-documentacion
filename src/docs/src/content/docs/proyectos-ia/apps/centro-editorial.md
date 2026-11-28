---
title: "centro-editorial"
description: "Ficha técnica y documentación de la aplicación Centro Editorial y Visor A4 (centro-editorial)."
---

*   **Ruta en repositorio**: `IA_Proyectos/docs/editorial/`
*   **Nombre Comercial**: Centro Editorial y Visor A4
*   **Tipo**: `vanilla`
*   **Creado el**: 2026-10-18
*   **Autor**: JoelJuana
*   **Etiquetas**: `Editorial`, `Dossiers`, `PDF`, `OCA Global`

---

# IA_Editorial — Estudio de Maquetación y Publicación de Documentos

Espacio de trabajo centralizado para la redacción, maquetación profesional y exportación simultánea a **PDF vectorial (A4)** y **Word / Google Docs (`.docx`)** mediante la skill `gestiona_editorial`.

Cada uno de los **ámbitos del estudio** tiene su propia carpeta **`_identidad/`** con el mismo esquema simétrico: su manual de **Identidad Corporativa** (`IDENTIDAD_CORPORATIVA.md`), su hoja de estilos maestra (`style.css`) y las **reglas y plantillas separadas por cada tipo de documento**.

---

## Arquitectura de Carpetas (Simétrica por Ámbito y Preset)

```text
docs/editorial/
│
├── 🏢 OCA Global/                                    # 1. PRESET: oca_global (Ámbito Corporativo)
│   ├── _identidad/                                   # 🎨 Imagen Corporativa y Plantillas de OCA Global
│   │   ├── IDENTIDAD_CORPORATIVA.md                  # Colores (#0B3356, #DE473C), Arial/Arial Black, cabeceras y tono
│   │   ├── style.css                                 # Hoja de estilos corporativa maestra
│   │   ├── logo_oca_global.png                       # Logotipo oficial recortado (40 pt)
│   │   ├── reglas_due_diligence.md                   # Reglas para Due Diligence preliminar (Fase 1) y notas de reunión
│   │   ├── plantilla_due_diligence.html              # Plantilla base Due Diligence
│   │   ├── reglas_informe_tecnico.md                 # Reglas para Informes Técnicos, Propuestas y Protocolos Fase 2
│   │   └── plantilla_informe_tecnico.html            # Plantilla base Informe Técnico / Checklist
│   │
│   ├── 2026-10-due-diligence-alabe-ingenieros/       # 📄 Due Diligence Preliminar Fase 1 (HTML + PDF + DOCX)
│   └── 2026-10-due-diligence-tecnica-alabe-fase2/    # 📄 Protocolo y Checklist Técnico Fase 2 (HTML + PDF + DOCX)
│
├── 🏛️ CP Mercat Devesa/                              # 2. PRESET: actas_comunidad (Ámbito Jurídico / Comunidad)
│   ├── README.md                                     # 📖 Base de Conocimiento Viva y Registro Auto-sincronizado
│   ├── _identidad/                                   # 🎨 Estándar Monocromo Notarial (#111827) y Plantillas CCCat
│   │   ├── IDENTIDAD_CORPORATIVA.md                  # Datos Finca 4.001, 4 subcomunidades, kits de reunión y reglas CCCat
│   │   ├── style.css                                 # Hoja de estilos institucional maestra
│   │   ├── reglas_acta_reunion.md                    # Reglas para Convocatorias, Asistencia, Actas y Certificados (Mod. A)
│   │   ├── plantilla_convocatoria.html               # Plantilla base Convocatoria + Orden del Día
│   │   ├── plantilla_asistencia.html                 # Plantilla base Hoja de Control de Asistencia y Escrutinio
│   │   ├── plantilla_acta_reunion.html               # Plantilla base Acta Oficial 1 página A4
│   │   ├── plantilla_certificado.html                # Plantilla base Certificado para Notaría y Registro
│   │   ├── reglas_estatutos_reglamento.md            # Reglas para Estatutos y Reglamentos Libro V CCCat (Mod. B)
│   │   └── plantilla_estatutos_reglamento.html       # Plantilla exclusiva para Estatutos y Reglamentos
│   │
│   ├── 01_Normativa/                                 # 📜 Título 1984 (N00), Estatutos Generales (N01) y Almacenes (N02)
│   ├── 02_Junta_Presidentes/                         # 🤝 Expedientes JP-AAAA-MM-DD (01-convocatoria, 02-acta, firmados/)
│   ├── 03_Asamblea_General/                          # 🏛️ Expedientes AG-AAAA-MM-DD (01-convocatoria..04-certificado, firmados/)
│   └── 04_Sesiones_Trabajo/                          # 📝 Antecedentes y minutas técnicas ST-AAAA-MM-DD
│
├── 📈 Compra Farmacia/ & 🏨 Ramon Turro/             # 3. PRESET: dossier_financiero (Inversión, Banca y Fiscalidad)
│   ├── _identidad/                                   # 🎨 Imagen Ejecutiva de Planes de Negocio (.hoja-a4 100%)
│   │   ├── IDENTIDAD_CORPORATIVA.md                  # Colores (#1B3A5C, #0F766E, #B45309, #5B21B6), Inter + Merriweather
│   │   ├── style.css                                 # Hoja de estilos maestra (.hoja-a4 Inversores + .hoja-densa)
│   │   ├── reglas_dossier_financiero.md              # Reglas de Dossiers Financieros, KPIs y Estrategia Fiscal
│   │   └── plantilla_dossier_financiero.html         # Plantilla base de Hoja A4 al 100% de ocupación
│   │
│   ├── 2026-11-plan-financiero-estrategia-real/      # 📄 Dossier Compraventa Farmacia: Socios, Vendedor y Comprador (3 Págs. · HTML + PDF + DOCX)
│   └── 2026-10-plan-financiero-estrategia-real/      # 📄 Plan de Negocio y Anexos Ramón Turró — Girona (9 Págs. · HTML + PDF + DOCX)
│
└── 🔧 SEAT 124 FL - Instalacion Electrica/           # 4. PRESET: seat_124_taller (Ingeniería y Manual de Taller)
    ├── _identidad/                                   # 🎨 Imagen Técnica SEAT Sport / Bosch Classic
    │   ├── IDENTIDAD_CORPORATIVA.md                  # Colores (#C8102E, #111827, #D97706), Barlow + IBM Plex + Mono
    │   ├── style.css                                 # Hoja de estilos técnica de taller
    │   ├── reglas_manual_electrico.md                # Reglas de esquemas SVG y tablas de pines DIN 72552
    │   └── plantilla_ficha_circuito.html             # Plantilla base para fichas de circuito
    │
    ├── circuitos/                                    # ⚡ ESPECIFICACION.md + C01..C15.html + generar_manual.py
    ├── manual_original/                              # 📚 Esquemas originales de referencia
    ├── preview/                                      # 🖼️ 30 capturas verificadas (page_1.png .. page_30.png)
    ├── style.css                                     # Hoja de estilos activa del manual
    ├── index.html                                    # ⚡ Visor interactivo de los 15 circuitos eléctricos
    ├── Manual_Instalacion_Electrica_SEAT_124_FL.html # 📄 Fuente HTML unificada del manual
    └── Manual_Instalacion_Electrica_SEAT_124_FL.pdf  # 📄 Manual completo en PDF vectorial (30 Hojas)
```

---

## Catálogo de los 4 Presets Editoriales

| Preset | Ámbito / Proyectos | Colores Principales | Tipografías | Tipos de Documento y Paginación |
|---|---|---|---|---|
| **`oca_global`** | **OCA Global** | Azul marino `#0B3356` · Rojo logo `#DE473C` · Gris tabla `#F2F2F2` | `Arial Black` (títulos) + `Arial` (cuerpo y tablas) | 1. **Due Diligence Preliminar (Fase 1)**<br>2. **Protocolo Técnico (Fase 2) / Informe Técnico**<br>*(Flujo editorial continuo + PDF + DOCX)* |
| **`actas_comunidad`** | **[CP Mercat Devesa](./CP%20Mercat%20Devesa/README.md)** | Negro notarial `#111827` · Gris carbón `#1F2937` · Subtítulos `#4B5563` | `Inter` (títulos, fichas y tablas) + `Merriweather` (cuerpo Serif) | 1. **Kits Oficiales `JP` / `AG` en 1 pág. A4 (Mod. A)**<br>2. **Estatutos y Reglamentos CCCat (Mod. B)**<br>*(Flujo continuo + PDF + DOCX + Registro auto-sincronizado)* |
| **`dossier_financiero`** | **Compra Farmacia**<br>**Ramón Turró** | Azul banca `#1B3A5C` · Esmeralda `#0F766E` · Ámbar `#B45309` · Púrpura `#5B21B6` | `Inter` (títulos, KPIs, tablas y fichas) + `Merriweather` (introducción) | 1. **Dossier Bancario / Socios (`.hoja-a4`)**<br>2. **Anexos Fiscales Densos (`.hoja-densa`)**<br>*(Ocupación exacta 100 % por página A4 + PDF + DOCX)* |
| **`seat_124_taller`** | **SEAT 124 FL** | Rojo SEAT `#C8102E` · Carbón `#111827` · Ámbar Bosch `#D97706` | `Barlow Condensed` + `IBM Plex Sans` + `JetBrains Mono` | 1. **Manual Eléctrico y Fichas de Circuito SVG**<br>*(Alta densidad técnica + DIN 72552 · 30 Hojas)* |

<!-- AUTO-EDITORIAL-STATS:START -->
> **Estado actual del catálogo editorial:** **24 documentos activos** (**100 páginas A4** y **22 archivos Word `.docx`**) — Compra Farmacia: **1** · Ramón Turró: **1** · OCA Global: **3** · CP Mercat Devesa: **18** · SEAT 124 FL: **1**.
<!-- AUTO-EDITORIAL-STATS:END -->

---

## Compilación, Creación de Expedientes y Catálogo en 1 Comando

Para compilar cualquier documento a **`.pdf`** (con **marcadores/índice interactivo PDF** y metadatos integrados), verificar automáticamente la **ocupación vertical**, regenerar **`preview/page_X.png`**, exportar a **`.docx`** y actualizar automáticamente tanto **`catalog.js`** como el registro vivo **[`CP Mercat Devesa/README.md`](./CP%20Mercat%20Devesa/README.md)**:

```powershell
# Compilar documento + Bookmarks PDF + QA geométrico + Previews + DOCX + Autocatálogo + README Devesa
node "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\build_editorial.js" ".\ruta\al\documento.html" --max-pages 1

# Crear un expediente completo de reunión en CP Mercat Devesa (JP, AG, ST o Subcomunidad)
& "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\new-reunion-devesa.ps1" -Organo JP -Fecha "2027-03-15" -Slug "Ordinaria-Presupuesto-2027"

# Re-sincronizar únicamente el catálogo del visor + READMEs o propagar presets y scripts a IA_Configuracion
node "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\build_editorial.js" --sync-catalog
node "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\build_editorial.js" --sync-presets
```

Cada carpeta de documento incluye un archivo ligero **`editorial.meta.json`** que alimenta automáticamente `catalog.js` y el visor interactivo (que soporta además *deep-linking* directo por URL como `index.html#doc=devesa-ag-2027-01-15-03-acta&page=1` y vista de pliego editorial real `1`, `2–3`, `4–5`).


---

## Catálogo Vivo de Publicaciones A4 (24 Documentos)

Inventario sincronizado automáticamente desde `IA_Proyectos/docs/editorial/catalog.js` (última compilación editorial: `2026-11-28` · **100 páginas A4** vectoriales · **22 exportaciones Word**):

| Cliente / Ámbito | Título del Documento | Preset | Extensión y Formatos | Estado | Compilado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Compra Farmacia** | Dossier Estratégico de Compraventa de Farmacia — Socios, Vendedor y Comprador | `dossier_financiero` | 3 págs. (PDF + DOCX) | Estrategia 3 Bloques (3 Págs.) | 2026-11-10 |
| **Ramón Turró** | Plan de Negocio y Estrategia Financiera — Proyecto Hotelero Ramón Turró (Girona) | `dossier_financiero` | 10 págs. (PDF + DOCX) | Aprobable 10/10 · Gate 0 (10 Págs.) | 2026-11-25 |
| **OCA Global** | Due Diligence preliminar: Álabe Ingenieros (Fase 1) | `oca_global` | 2 págs. (PDF + DOCX) | Validado | 2026-11-10 |
| **OCA Global** | Protocolo y Checklist de Due Diligence Técnica: Álabe Ingenieros (Fase 2) | `oca_global` | 2 págs. (PDF + DOCX) | Protocolo Fase 2 | 2026-11-10 |
| **OCA Global** | Pressupost 2026/2027 · OCA Global | `oca_global` | 1 págs. (PDF + HTML) | Esborrany base | 2026-11-27 |
| **CP Mercat Devesa** | N00 · Título Modificativo y Estatutos Originarios de 1984 (Escritura 3.093) y Expediente Municipal (1983–1994) | `actas_comunidad` | 5 págs. (PDF + DOCX) | Antecedente 1984 (A sustituir por N01) | 2026-11-22 |
| **CP Mercat Devesa** | N01 · Estatutos de la Comunidad General del Mercado de la Devesa (Texto Refundido) | `actas_comunidad` | 4 págs. (PDF + DOCX) | Texto Definitivo | 2026-11-28 |
| **CP Mercat Devesa** | N02-ALM · Proyecto de Estatutos Particulares de la Comunidad de Propietarios de Almacenes (Sustitución Apartado C de 1984) | `actas_comunidad` | 3 págs. (PDF + DOCX) | Borrador Preparado (Fase Posterior a N01) | 2026-11-28 |
| **CP Mercat Devesa** | N03-PAR · Proyecto de Estatutos Particulares de la Comunidad de Propietarios de Paradas (Sustitución Apartado B de 1984) | `actas_comunidad` | 3 págs. (PDF + DOCX) | Borrador Preparado (Fase Posterior a N01) | 2026-11-28 |
| **CP Mercat Devesa** | N04-LOC · Proyecto de Estatutos Particulares de la Comunidad de Propietarios de Locales (Regulación Estatutaria Propia) | `actas_comunidad` | 3 págs. (PDF + DOCX) | Borrador Preparado (Fase Posterior a N01) | 2026-11-28 |
| **CP Mercat Devesa** | JP-2026-12-14 [01] · Convocatoria y Orden del Día — Junta Ordinaria de Presidentes | `actas_comunidad` | 1 págs. (PDF + DOCX) | Finalizado | 2026-11-25 |
| **CP Mercat Devesa** | JP-2026-12-14 [02] · Acta de la Reunión Ordinaria de la Junta de Presidentes | `actas_comunidad` | 1 págs. (PDF + DOCX) | Finalizado | 2026-11-24 |
| **CP Mercat Devesa** | AG-2027-01-15 [01] · Convocatoria y Orden del Día — Asamblea General Extraordinaria | `actas_comunidad` | 1 págs. (PDF + DOCX) | Finalizado | 2026-11-28 |
| **CP Mercat Devesa** | AG-2027-01-15 [02] · Hoja de Control de Asistencia, Delegaciones y Escrutinio | `actas_comunidad` | 1 págs. (PDF + DOCX) | Finalizado | 2026-11-24 |
| **CP Mercat Devesa** | AG-2027-01-15 [03] · Acta de la Asamblea General Extraordinaria y Notificación a Ausentes | `actas_comunidad` | 1 págs. (PDF + DOCX) | Finalizado | 2026-11-28 |
| **CP Mercat Devesa** | AG-2027-01-15 [03B] · Anexo al Acta de Efectividad Definitiva y Resultado Final por Unanimidad | `actas_comunidad` | 1 págs. (PDF + DOCX) | Finalizado | 2026-11-28 |
| **CP Mercat Devesa** | AG-2027-01-15 [04] · Certificado de Acuerdos y Firmeza para Notaría y Registro | `actas_comunidad` | 1 págs. (PDF + DOCX) | Finalizado | 2026-11-28 |
| **CP Mercat Devesa** | ST-2026-08-17 · Acta de Sesión de Trabajo con Comunidad de Aparcamientos | `actas_comunidad` | 5 págs. (PDF + DOCX) | Antecedente Cerrado | 2026-11-16 |
| **CP Mercat Devesa** | ST-2026-10-07 · Documento de Trabajo y Alineación Técnica con Letrado | `actas_comunidad` | 2 págs. (PDF + DOCX) | Antecedente Cerrado | 2026-11-16 |
| **CP Mercat Devesa** | ST-2026-11-21 · Censo Maestro Registral, Catastral y Conciliación de Cuotas (153 Entidades) | `actas_comunidad` | 6 págs. (PDF + DOCX) | Vigente | 2026-11-24 |
| **CP Mercat Devesa** | ST-2026-11-21-B · Radiografía Arquitectónica-Registral del Edificio por Plantas y Auditoría de Discrepancias | `actas_comunidad` | 6 págs. (PDF + DOCX) | Vigente | 2026-11-25 |
| **CP Mercat Devesa** | ST-2026-11-21-C · Auditoría de Proyectos (COAC y Actividades), Atlas de 23 Planos 1:50 y Licencias Municipales (1983–1985) | `actas_comunidad` | 6 págs. (PDF + DOCX) | Vigente | 2026-11-25 |
| **CP Mercat Devesa** | ST-2026-11-24 · Estrategia y Protocolo Operativo de Blindaje Registral (Controles Extrínsecos y Plantilla para Administradores) | `actas_comunidad` | 2 págs. (PDF + DOCX) | Vigente | 2026-11-28 |
| **SEAT 124 FL** | Manual de Instalación Eléctrica SEAT 124 FL (1430 / 1600 Biárbol) | `seat_124_taller` | 30 págs. (PDF + HTML) | Edición Taller (30 Hojas) | 2026-11-10 |

