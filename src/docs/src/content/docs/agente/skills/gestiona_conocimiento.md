---
title: gestiona_conocimiento
description: "Indexa documentación y consulta la base de conocimiento local (RAG v1.4 con colecciones aisladas, fragmentación semántica Markdown, lematización ligera en español e indexación por lotes) para recuperar pasajes relevantes en tareas de investigación, soporte técnico o consulta normativa y jurisprudencial a través de /api/rag del Gateway."
---

*   **Ruta de Configuración**: `IA_Configuracion/skills/gestiona_conocimiento/SKILL.md`

---

# Skill: Gestionar Conocimiento (`gestiona_conocimiento`)

Esta habilidad interactúa con el microservicio **api-conocimiento-rag** (`v1.4.0`, puerto interno **3600**, expuesto centralizadamente en `http://localhost:3000/api/rag`) para indexar documentación o lotes completos, separarla en **colecciones aisladas (`collection`)**, fragmentar semánticamente por secciones Markdown y recuperar pasajes relevantes mediante **Okapi BM25 + Lematización Ligera en Español + Phrase Boost**.

---

## Cuándo activar

Activa esta habilidad cuando el usuario o los requerimientos de la tarea soliciten:
- Guardar manuales, doctrina o carpetas en la base de conocimientos (`default`, `juridico-cccat`, etc.).
- Consultar pasajes relevantes en documentación extensa, jurisprudencia registral o antecedentes históricos con diversificación por documento (`maxPerDoc`) o filtro de metadatos (`filter`) sin saturar el contexto.
- Listar colecciones activas, ingerir lotes transaccionales (`/index-batch`) o limpiar selectivamente una colección concreta.

---

## Instrucciones de Uso y Automatización

### Paso 1: Verificar el Estado del Servidor (Health Check vía Gateway)

Comprueba siempre el estado a través del Gateway central (`http://localhost:3000/api/health` o `/api/rag/`):

```powershell
try { $r = Invoke-RestMethod -Uri "http://localhost:3000/api/rag/" -TimeoutSec 3; $r.data | ConvertTo-Json -Depth 4 } catch { "OFFLINE" }
```

Si está apagado, arranca la infraestructura de fondo (`npm run start --prefix "C:\Users\jjtei\Desktop\IA_Infraestructura"`) y recuerda detenerla obligatoriamente al finalizar tu tarea (`npm run stop --prefix "C:\Users\jjtei\Desktop\IA_Infraestructura"`).

---

### Paso 2: Indexar Documentos, Lotes o Carpetas (`POST /index`, `/index-batch` y `/index-directory`)

Si se omite `collection`, los fragmentos se guardan en la colección `'default'` (usada por el portal de documentación). Para dominios específicos (como normativa y doctrina hipotecaria catalana), especifica `collection` (ej. `"juridico-cccat"`):

```powershell
$body = @{
    collection = "juridico-cccat"
    title      = "Doctrina DGDyEJ - Voto presunto art. 553-26.3 CCCat"
    content    = "## Voto presunto de ausentes`nEn los acuerdos sujetos a unanimidad o mayoría cualificada del artículo 553-26 CCCat..."
    metadata   = @{ ambito = "Propiedad Horizontal Cataluña"; fuente = "DGDyEJ" }
} | ConvertTo-Json -Depth 4

Invoke-RestMethod -Uri "http://localhost:3000/api/rag/index" -Method Post -Body $body -ContentType "application/json; charset=utf-8"
```

Para indexar múltiples documentos en una única transacción atómica (1 solo recálculo BM25 y 1 escritura a disco):

```powershell
$body = @{
    collection        = "juridico-cccat"
    replaceCollection = $false
    documents         = @(
        @{ title = "doc-1"; content = "Contenido técnico del primer documento..."; metadata = @{ fuente = "BOE" } },
        @{ title = "doc-2"; content = "Contenido técnico del segundo documento..."; metadata = @{ fuente = "DGDyEJ" } }
    )
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Uri "http://localhost:3000/api/rag/index-batch" -Method Post -Body $body -ContentType "application/json; charset=utf-8"
```

Para indexar recursivamente una carpeta completa dentro de una colección aislada:

```powershell
$body = @{
    collection    = "juridico-cccat"
    directoryPath = "C:\Users\jjtei\.gemini\config\plugins\comite-registral-cccat\skills\verifica_registral_cccat\references\rag_docs"
    titlePrefix   = "normativa-cccat"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/rag/index-directory" -Method Post -Body $body -ContentType "application/json; charset=utf-8"
```

---

### Paso 3: Consultar Colecciones y Buscar Pasajes (`GET /collections` y `POST /search`)

Listar colecciones disponibles:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/rag/collections" -Method Get
```

Buscar restringiendo el cálculo BM25 a una colección específica, con diversificación (`maxPerDoc`), umbral mínimo (`minScore`) o filtro de metadatos (`filter`):

```powershell
$body = @{
    collection = "juridico-cccat"
    query      = "derecho de vuelo plazo maximo treinta años valoracion 567-2"
    limit      = 4
    maxPerDoc  = 2
    minScore   = 2.0
} | ConvertTo-Json -Depth 4

$res = Invoke-RestMethod -Uri "http://localhost:3000/api/rag/search" -Method Post -Body $body -ContentType "application/json; charset=utf-8"
$res.data | Format-Table collection, title, section, score, text -Wrap
```

---

### Paso 4: Limpieza Selectiva por Colección (`DELETE /store?collection=...`)

Para vaciar únicamente una colección sin afectar al índice del portal `'default'`:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/rag/store?collection=juridico-cccat" -Method Delete
```
