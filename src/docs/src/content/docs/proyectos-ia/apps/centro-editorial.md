---
title: "centro-editorial"
description: "Ficha técnica y documentación de la aplicación centro-editorial."
---

*   **Ruta física**: [`docs/editorial/`](file:///C:/Users/jjtei/Desktop/IA_Proyectos/docs/editorial)
*   **Tipo**: `vanilla`
*   **Creado el**: 2026-10-18
*   **Autor**: JoelJuana
*   **Etiquetas**: `Editorial`, `Documentación`, `PDF`, `OCA Global`, `Vanilla`

---

# IA_Editorial — Estudio de Maquetación y Publicación de Documentos (v2.0)

Espacio de trabajo centralizado para la redacción, maquetación profesional y exportación simultánea a **PDF vectorial (A4)** y **Word / Google Docs (`.docx`)** de documentos corporativos de **OCA Global** y documentos jurídicos/comunitarios de la **Comunidad de Propietarios**.

---

## Arquitectura de Carpetas del Estudio Editorial

```text
docs/editorial/
├── _reglas/                                      # 📖 Reglas modulares por ámbito y tipo de documento
│   ├── 00_paginacion_y_maquetacion_a4.md         # Reglas universales de saltos de página, viudas/huérfanas y A4
│   ├── oca_01_identidad_y_tono_corporativo.md    # Manual visual OCA Global (Arial/Arial Black) y tono sobrio
│   ├── oca_02_due_diligence_y_notas_reunion.md   # Cuestionario previo y estructura de Due Diligence preliminar
│   ├── oca_03_informes_tecnicos_y_propuestas.md  # Estructura de informes técnicos, auditorías y memorias OCA
│   ├── comunidad_01_actas_y_acuerdos.md          # Estructura de Actas de Junta y Sesiones de Trabajo (Modalidad A)
│   ├── comunidad_02_estatutos_y_reglamentos.md   # Estructura de Estatutos y Reglamentos articulados (Modalidad B)
│   └── taller_01_manual_electrico_seat124.md     # Reglas técnicas y fuente única de verdad SEAT 124 FL
│
├── _plantillas/                                  # 🎨 Plantillas base y hojas de estilo maestras (espejo de la skill)
│   ├── oca_global/                               # style.css, template.html y logo_oca_global.png
│   ├── actas_comunidad/                          # style.css y template.html (Modalidad A + Modalidad B)
│   └── seat_124_taller/                          # style.css y template.html (Manual técnico automotriz)
│
├── OCA Global/                                   # 🏢 Producción documental corporativa (OCA Global)
│   └── 2026-10-due-diligence-alabe-ingenieros/   # HTML + CSS + PDF vectorial + Word (.docx)
│
├── CP Mercat Devesa/                             # 🏛️ Producción documental Comunidad de Propietarios
│   ├── 2026-08-acta-devesa/                      # Acta de Sesión de Trabajo (HTML + PDF + DOCX)
│   ├── 2026-10-acta-devesa/                      # Documento de Alineación Técnica (HTML + PDF + DOCX)
│   ├── 2026-10-estatutos-devesa/                 # Texto Refundido de los Estatutos (HTML + PDF + DOCX)
│   └── 2026-10-reglamento-almacenes/             # Reglamento Interno de Almacenes (HTML + PDF + DOCX)
│
└── SEAT 124 FL - Instalacion Electrica/          # 🔧 Manual de Taller e Instalación Eléctrica (SEAT 124 FL)
    ├── circuitos/ESPECIFICACION.md               # Fuente única de verdad (fusibles, relés, conectores y pines)
    ├── Manual_Instalacion_Electrica_SEAT_124_FL  # Manual completo HTML + PDF
    └── Hoja_Ayuda_Leyenda_y_Pines_SEAT_124_FL    # Hoja de ayuda rápida de taller HTML + PDF
```

---

## Scripts Automatizados (Skill `gestiona_editorial`)

1. **Inicializar un nuevo documento (`new-doc.ps1`)**:
   Crea automáticamente la subcarpeta con fecha `AAAA-MM-slug` dentro de `OCA Global/` o `CP Mercat Devesa/` y copia la plantilla y el CSS oficial:
   ```powershell
   & "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\new-doc.ps1" -Preset oca_global -Slug "informe-ejemplo"
   ```

2. **Compilar a PDF vectorial + Word/Google Docs (`.docx`) en un paso (`compile-pdf.ps1`)**:
   Genera simultáneamente el `.pdf` con Edge Headless y el `.docx` nativo (usando `export-oca-docx.py` o `export-comunidad-docx.py`), además de las capturas de verificación si se añade `-Preview`:
   ```powershell
   & "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\compile-pdf.ps1" -HtmlPath ".\ruta\al\documento.html" -Preview
   ```

---

## Inventario de Documentos Publicados

### 1. `OCA Global/` (Ámbito Laboral y Corporativo)

| Fecha | Carpeta | Entregables (PDF + Word / Google Docs) | Tipo / Regla Aplicada | Estado |
|---|---|---|---|---|
| 2026-10 | `OCA Global/2026-10-due-diligence-alabe-ingenieros/` | `due_diligence_alabe_ingenieros.pdf` + `.docx` (2 págs.) | `oca_02_due_diligence` | ✅ Validado |

### 2. `CP Mercat Devesa/` (Comunidad de Propietarios)

| Fecha | Carpeta | Entregables (PDF + Word / Google Docs) | Tipo / Regla Aplicada | Estado |
|---|---|---|---|---|
| 2026-08 | `CP Mercat Devesa/2026-08-acta-devesa/` | `Acta_Sesion_Trabajo_Devesa.pdf` + `.docx` | `comunidad_01_actas` | ✅ Finalizado |
| 2026-10 | `CP Mercat Devesa/2026-10-acta-devesa/` | `Documento_Alineacion_Estatutos_Devesa_Octubre_2026.pdf` + `.docx` | `comunidad_01_actas` | ✅ Finalizado |
| 2026-10 | `CP Mercat Devesa/2026-10-estatutos-devesa/` | `Estatutos_Comunidad_General_Mercado_Devesa_Octubre_2026.pdf` + `.docx` | `comunidad_02_estatutos` | ✅ Finalizado |
| 2026-10 | `CP Mercat Devesa/2026-10-reglamento-almacenes/` | `Reglamento_Interno_Comunidad_Almacenes_Devesa.pdf` + `.docx` | `comunidad_02_estatutos` | 📝 Pendiente datos registrales |

### 3. `SEAT 124 FL - Instalacion Electrica/` (Ingeniería y Manual de Taller)

| Fecha | Carpeta | Entregables (PDF + HTML + SVG) | Tipo / Regla Aplicada | Estado |
|---|---|---|---|---|
| 2026-10 | `SEAT 124 FL - Instalacion Electrica/` | `Manual_Instalacion_Electrica_SEAT_124_FL.pdf` + `Hoja_Ayuda_Leyenda_y_Pines_SEAT_124_FL.pdf` | `taller_01_manual_electrico` | ✅ En evolución |
