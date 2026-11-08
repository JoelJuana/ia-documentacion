---
title: Maquetar y Exportar Documentos Editoriales (A4 PDF + Word)
description: Guía paso a paso para crear, maquetar y compilar documentos corporativos, actas, dossiers financieros y manuales técnicos con la habilidad gestiona_editorial.
sidebar:
  order: 3
---

Esta guía explica cómo utilizar el estudio de maquetación **`centro-editorial`** (`IA_Proyectos/docs/editorial/`) y la habilidad [`gestiona_editorial`](/agente/skills/gestiona_editorial/) para producir documentos en **PDF vectorial (A4)** y **Word (`.docx`)** con control milimétrico de saltos de página.

---

## 1. Elegir el Preset según el Ámbito del Documento

Antes de crear un documento, selecciona uno de los **4 presets oficiales** según su propósito:

| Preset | Ámbito | Carpeta de Destino | Exportación |
| :--- | :--- | :--- | :--- |
| **`oca_global`** | Informes técnicos, auditorías, notas de reunión y *Due Diligence* de **OCA Global** | `docs/editorial/OCA Global/` | PDF A4 + `.docx` |
| **`actas_comunidad`** | Actas de junta (Modalidad A) y estatutos/reglamentos articulados (Modalidad B) | `docs/editorial/CP Mercat Devesa/` | PDF A4 + `.docx` |
| **`dossier_financiero`** | Dossiers ejecutivos bancarios e informes de inversión vinculados a *Business Plans* | `docs/editorial/Finanzas_y_Dossiers/` | PDF A4 + `.docx` |
| **`seat_124_taller`** | Manuales técnicos automotrices, esquemas eléctricos y hojas de taller | `docs/editorial/SEAT 124 FL - Instalacion Electrica/` | PDF A4 + SVG |

---

## 2. Inicializar un Nuevo Documento (`new-doc.ps1`)

Ejecuta el script `new-doc.ps1` indicando el `-Preset` y el `-Slug`. El script creará automáticamente la carpeta con prefijo de fecha (`AAAA-MM-slug`) en la ubicación correspondiente y copiará la hoja de estilos `style.css` y la plantilla `documento.html`:

```powershell
& "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\new-doc.ps1" `
  -Preset dossier_financiero `
  -Slug "dossier-inversion-ejemplo" `
  -Title "Dossier Ejecutivo de Inversión"
```

---

## 3. Compilar a PDF Vectorial y Word (`.docx`)

Una vez redactado el contenido en el archivo `.html` respetando los contenedores `<section class="page">`, compila el documento con `compile-pdf.ps1` (o `editorial_tools.py`):

```powershell
& "C:\Users\jjtei\.gemini\config\skills\gestiona_editorial\scripts\compile-pdf.ps1" `
  -HtmlPath "C:\Users\jjtei\Desktop\IA_Proyectos\docs\editorial\Finanzas_y_Dossiers\2026-11-dossier-inversion-ejemplo\documento.html" `
  -Preview
```

Este comando ejecuta automáticamente:
1. **Impresión vectorial A4** mediante Microsoft Edge Headless (`--print-to-pdf`).
2. **Generación de archivo `.docx`** nativo editable para Word y Google Docs.
3. **Renderizado de capturas PNG por página** en la subcarpeta `preview/` (`page_1.png`, `page_2.png`, etc.) para verificar visualmente que no existan desbordamientos ni páginas huérfanas.

---

## 4. Sincronizar con el Portal de Documentación

Si añades nuevos documentos relevantes al inventario de `docs/editorial/README.md`, actualiza este portal ejecutando:

```powershell
npm run build --prefix "C:\Users\jjtei\Desktop\IA_Documentacion\src\docs"
```
