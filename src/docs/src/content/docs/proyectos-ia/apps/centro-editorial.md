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
│   ├── _identidad/                                   # 🎨 Imagen Institucional y Plantillas de la Comunidad
│   │   ├── IDENTIDAD_CORPORATIVA.md                  # Colores (#1B3A5C, #2B6CB0), Inter + Merriweather y estilo legal
│   │   ├── style.css                                 # Hoja de estilos institucional maestra
│   │   ├── reglas_acta_reunion.md                    # Reglas para Actas de Junta, Sesiones y Acuerdos (Modalidad A)
│   │   ├── plantilla_acta_reunion.html               # Plantilla exclusiva para Actas de Reunión
│   │   ├── reglas_estatutos_reglamento.md            # Reglas para Estatutos y Reglamentos Libro V CCCat (Modalidad B)
│   │   └── plantilla_estatutos_reglamento.html       # Plantilla exclusiva para Estatutos y Reglamentos
│   │
│   ├── 2026-08-acta-devesa/                          # 📄 Acta de Sesión de Trabajo (HTML + PDF + DOCX)
│   ├── 2026-10-acta-devesa/                          # 📄 Documento de Alineación Técnica (HTML + PDF + DOCX)
│   ├── 2026-10-estatutos-devesa/                     # 📄 Texto Refundido de los Estatutos (HTML + PDF + DOCX)
│   └── 2026-10-reglamento-almacenes/                 # 📄 Reglamento Interno de Almacenes (HTML + PDF + DOCX)
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
| **`actas_comunidad`** | **CP Mercat Devesa** | Azul clásico `#1B3A5C` · Azul noche `#0D1F33` · Azul acuerdos `#2B6CB0` | `Inter` (títulos, fichas y tablas) + `Merriweather` (cuerpo Serif) | 1. **Acta de Reunión y Acuerdos (Mod. A)**<br>2. **Estatutos y Reglamentos CCCat (Mod. B)**<br>*(Flujo editorial continuo + PDF + DOCX)* |
| **`dossier_financiero`** | **Compra Farmacia**<br>**Ramón Turró** | Azul banca `#1B3A5C` · Esmeralda `#0F766E` · Ámbar `#B45309` · Púrpura `#5B21B6` | `Inter` (títulos, KPIs, tablas y fichas) + `Merriweather` (introducción) | 1. **Dossier Bancario / Socios (`.hoja-a4`)**<br>2. **Anexos Fiscales Densos (`.hoja-densa`)**<br>*(Ocupación exacta 100 % por página A4 + PDF + DOCX)* |
| **`seat_124_taller`** | **SEAT 124 FL** | Rojo SEAT `#C8102E` · Carbón `#111827` · Ámbar Bosch `#D97706` | `Barlow Condensed` + `IBM Plex Sans` + `JetBrains Mono` | 1. **Manual Eléctrico y Fichas de Circuito SVG**<br>*(Alta densidad técnica + DIN 72552 · 30 Hojas)* |

---

## Compilación, QA Geométrico y Catálogo en 1 Comando

Para compilar cualquier documento a **`.pdf`** (con **marcadores/índice interactivo PDF** y metadatos integrados), verificar automáticamente la **ocupación vertical y ausencia de recortes en `.hoja-a4`**, regenerar **`preview/page_X.png`**, exportar a **`.docx`** y actualizar automáticamente el catálogo **`catalog.js`** del visor `index.html`:

```powershell
# Compilar documento + Bookmarks PDF + QA geométrico + Previews + DOCX + Autocatálogo
node "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\build_editorial.js" ".\ruta\al\documento.html" --max-pages 3

# Opcional: inyectar cifras actualizadas desde un JSON de simulador ([data-bind="clave"])
node "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\build_editorial.js" ".\ruta\al\documento.html" --data ".\escenario.json"

# Re-sincronizar únicamente el catálogo del visor o las carpetas _identidad/ de los 4 presets
node "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\build_editorial.js" --sync-catalog
node "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\build_editorial.js" --sync-presets
```

Cada carpeta de documento incluye un archivo ligero **`editorial.meta.json`** que alimenta automáticamente `catalog.js` y el visor interactivo (que soporta además *deep-linking* directo por URL como `index.html#doc=ramon-turro-plan-financiero-2026&page=5` y vista de pliego editorial real `1`, `2–3`, `4–5`).


---

## Catálogo Vivo de Publicaciones A4 (9 Documentos)

Inventario sincronizado automáticamente desde `IA_Proyectos/docs/editorial/catalog.js` (última compilación editorial: `2026-11-14` · **61 páginas A4** vectoriales · **8 exportaciones Word**):

| Cliente / Ámbito | Título del Documento | Preset | Extensión y Formatos | Estado | Compilado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Compra Farmacia** | Dossier Estratégico de Compraventa de Farmacia — Socios, Vendedor y Comprador | `dossier_financiero` | 3 págs. (PDF + DOCX) | Estrategia 3 Bloques (3 Págs.) | 2026-11-10 |
| **Ramón Turró** | Plan de Negocio y Estrategia Financiera — Proyecto Hotelero Ramón Turró (Girona) | `dossier_financiero` | 9 págs. (PDF + DOCX) | Dossier Bancario (9 Págs.) | 2026-11-13 |
| **OCA Global** | Due Diligence preliminar: Álabe Ingenieros (Fase 1) | `oca_global` | 2 págs. (PDF + DOCX) | Validado | 2026-11-10 |
| **OCA Global** | Protocolo y Checklist de Due Diligence Técnica: Álabe Ingenieros (Fase 2) | `oca_global` | 2 págs. (PDF + DOCX) | Protocolo Fase 2 | 2026-11-10 |
| **CP Mercat Devesa** | Acta de Sesión de Trabajo — Comunidad Mercat Devesa | `actas_comunidad` | 5 págs. (PDF + DOCX) | Finalizado | 2026-11-10 |
| **CP Mercat Devesa** | Documento de Alineación Técnica y Estatutos (Octubre 2026) | `actas_comunidad` | 2 págs. (PDF + DOCX) | Finalizado | 2026-11-10 |
| **CP Mercat Devesa** | Texto Refundido de los Estatutos de la Comunidad General | `actas_comunidad` | 4 págs. (PDF + DOCX) | Finalizado | 2026-11-14 |
| **CP Mercat Devesa** | Reglamento de Régimen Interno de la Comunidad de Almacenes | `actas_comunidad` | 4 págs. (PDF + DOCX) | Pendiente datos registrales | 2026-11-10 |
| **SEAT 124 FL** | Manual de Instalación Eléctrica SEAT 124 FL (1430 / 1600 Biárbol) | `seat_124_taller` | 30 págs. (PDF + HTML) | Edición Taller (30 Hojas) | 2026-11-10 |

