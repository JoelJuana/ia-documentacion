---
title: gestiona_conocimiento
description: "Indexa documentación multimodo (.md, .html, .json) y consulta las 4 colecciones aisladas de la base de conocimiento local (RAG v1.5 con puente bilingüe ES/CA, sinónimos financieros, ventana de contexto contiguo e indexación por lotes) a través de /api/rag del Gateway."
---

*   **Ruta de Configuración**: `IA_Configuracion/skills/gestiona_conocimiento/SKILL.md`

---

# Skill: Gestionar Conocimiento (`gestiona_conocimiento`)

Esta habilidad interactúa con el microservicio **api-conocimiento-rag** (`v1.5.0`, puerto interno **3600**, expuesto centralizadamente en `http://localhost:3000/api/rag`) para indexar documentación en **Markdown, HTML editorial o JSON**, aislarla en **colecciones especializadas (`collection`)** y recuperar pasajes mediante **Okapi BM25 + Puente Bilingüe Castellano/Catalán + Sinónimos Financieros + Ventana de Contexto (`includeNeighbors`)**.

---

## Catálogo de Colecciones Especializadas del Ecosistema

| Colección | Contenido Indexado | Sincronizador |
|---|---|---|
| `default` | Portal completo de documentación técnica, arquitectura, reglas y skills (`IA_Documentacion`). | `node scripts/index-rag.js` |
| `juridico-cccat` | `374` preceptos BOE de `20` normas (CCCat, LH, RH, RN, Código Tributario Cataluña, etc.), `17` resoluciones verificadas (`catalogo_resoluciones_cccat.json`) y `5` plantillas operativas bilingües. | `python sync_rag_normativa.py` |
| `financiero-fiscal` | `70` preceptos BOE de `11` leyes tributarias/mercantiles (`LIS`, `LIRPF`, `LIVA`, `LSC`, `RDL 7/1996`, `LAU`, `LHMPSD`, `LFARM`, `LIEE`), criterios de Comité de Riesgos Bancarios y `6` playbooks sectoriales. | `python sync_rag_financiero.py` |
| `expedientes-editoriales` | Memoria viva del Centro Editorial en HTML/MD: `CP Mercat Devesa` (Estatutos `N00–N04`, Actas, Acuerdos), Dossieres (`Compra Farmacia`, `Ramon Turro`), `OCA Global` y `SEAT 124 FL` (`C01–C15`). | `npm run rag:sync` |

Para resincronizar de una sola pasada las 4 colecciones del ecosistema con arranque/apagado JIT automático:

```powershell
npm run rag:sync --prefix "C:\Users\jjtei\Desktop\IA_Infraestructura"
```

---

## Instrucciones de Uso y Automatización

### Paso 1: Verificar el Estado del Servidor (Health Check vía Gateway)

Comprueba siempre el estado a través del Gateway central (`http://localhost:3000/api/health` o `/api/rag/`):

```powershell
try { $r = Invoke-RestMethod -Uri "http://localhost:3000/api/rag/" -TimeoutSec 3; $r.data | ConvertTo-Json -Depth 4 } catch { "OFFLINE" }
```

Si está apagado, arranca la infraestructura de fondo (`npm run start --prefix "C:\Users\jjtei\Desktop\IA_Infraestructura"`) y recuerda detenerla obligatoriamente al finalizar tu tarea (`npm run stop --prefix "C:\Users\jjtei\Desktop\IA_Infraestructura"`).

---

### Paso 2: Indexar Documentos (`.md`, `.html`, `.json`), Lotes o Carpetas

El motor `v1.5.0` convierte automáticamente páginas `.hoja-a4` HTML (incluyendo tablas `<table>`) y catálogos JSON estructurados en secciones semánticas:

```powershell
$body = @{
    collection = "financiero-fiscal"
    title      = "Criterio DGT - Renuncia exención IVA e ISP art. 84.Uno.2 LIVA"
    content    = "## Renuncia a la exención e Inversión del Sujeto Pasivo`nEn segundas entregas de edificaciones..."
    metadata   = @{ ambito = "Fiscalidad Inmobiliaria"; fuente = "DGT" }
} | ConvertTo-Json -Depth 4

Invoke-RestMethod -Uri "http://localhost:3000/api/rag/index" -Method Post -Body $body -ContentType "application/json; charset=utf-8"
```

Para indexar recursivamente una carpeta completa con exclusiones selectivas:

```powershell
$body = @{
    collection      = "expedientes-editoriales"
    directoryPath   = "C:\Users\jjtei\Desktop\IA_Proyectos\docs\editorial"
    extensions      = @(".md", ".html")
    excludePatterns = @("_identidad/", "comite_output", "/index.html")
    titlePrefix     = "editorial"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/rag/index-directory" -Method Post -Body $body -ContentType "application/json; charset=utf-8"
```

---

### Paso 3: Búsqueda Bilingüe ES/CA, Diversificación y Contexto Contiguo (`POST /search`)

Puedes consultar en castellano documentos redactados en catalán (ej. `asamblea derecho de vuelo almacenes deuda` recupera actas con `assemblea`, `dret de vol`, `magatzems`, `deute`) y pedir los fragmentos vecinos con `includeNeighbors`:

```powershell
$body = @{
    collection       = "expedientes-editoriales"
    query            = "estatutos almacenes paradas derecho de vuelo cuotas mercat devesa"
    limit            = 4
    maxPerDoc        = 1
    includeNeighbors = 1
} | ConvertTo-Json -Depth 4

$res = Invoke-RestMethod -Uri "http://localhost:3000/api/rag/search" -Method Post -Body $body -ContentType "application/json; charset=utf-8"
$res.data | Format-Table collection, title, section, score, neighborsIncluded -AutoSize
```

---

### Paso 4: Limpieza Selectiva por Colección (`DELETE /store?collection=...`)

Para vaciar únicamente una colección concreta preservando intactas las demás:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/rag/store?collection=expedientes-editoriales" -Method Delete
```
