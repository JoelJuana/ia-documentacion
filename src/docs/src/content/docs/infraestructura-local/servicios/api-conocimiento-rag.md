---
title: "Conocimiento y RAG (api-conocimiento-rag)"
description: "Ficha técnica detallada del microservicio api-conocimiento-rag."
---

*   **Ruta en repositorio**: `IA_Infraestructura/api-conocimiento-rag/`

---

# api-conocimiento-rag

Microservicio local (`v1.5.0`) encargado de la indexación transaccional por lotes, ingesta nativa multimodo (**Markdown, HTML editorial y catálogos JSON**), aislamiento por **colecciones (`collections`)** y recuperación híbrida mediante **Okapi BM25 + Puente Léxico Bilingüe ES/CA + Sinónimos Financieros + Phrase Boost**.

## Especificaciones Técnicas

- **Puerto de red**: `3600` (Gateway: `/api/rag`)
- **Ruta física**: `IA_Infraestructura/api-conocimiento-rag/`
- **Persistencia compacta y serializada**: Guarda su base de conocimientos de forma atómica sin vectores derivados en `data/store.json` (ignorado en Git), con cola asíncrona libre de colisiones en Windows NTFS y volcado síncrono en `SIGINT`/`SIGTERM`.
- **Ecosistema Multi-Colección (`v1.5.0`)**: Soporta colecciones especializadas aisladas (`default`, `juridico-cccat`, `financiero-fiscal`, `expedientes-editoriales`) con estadísticas IDF exactas y morfológicas independientes por dominio.

## Funciones Clave

1. **Ingesta Nativa Markdown, HTML y JSON**: Convierte automáticamente hojas `.hoja-a4` HTML (extrayendo encabezados `H1`–`H4`, listas y tablas `| col |` y limpiando `<style>`/`<script>`/`<svg>`) y catálogos JSON estructurados en secciones semánticas cohesivas (`<= 1.400` caracteres) con solapamiento contextual.
2. **Puente Bilingüe Castellano ↔ Catalán y Sinónimos Financieros**: Expande equivalencias jurídicas e inmobiliarias (`vuelo` ↔ `vol`, `estatutos` ↔ `estatuts`, `asamblea` ↔ `assemblea`, `deuda` ↔ `deute`, `almacenes` ↔ `magatzems`, `paradas` ↔ `parades`, `tablón` ↔ `tauler`) y acrónimos bancarios (`DSCR` ↔ `RCSD`, `LTV` ↔ `LTC`, `CAPEX` ↔ `inversión`) junto con lematización hispano-catalana 100 % nativa en ARM64.
3. **Búsqueda Avanzada y Ventana de Contexto (`includeNeighbors`)**: Admite filtrado por metadatos (`filter`), umbral de relevancia (`minScore`), diversificación por documento (`maxPerDoc`) y recuperación de fragmentos contiguos (`includeNeighbors: 1..3` en `contextWindow`).

## Endpoints del Servicio

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/` | Metadatos de la API, versión, chunks totales, tamaño de vocabulario y desglose de colecciones activas |
| `GET` | `/collections` | Lista todas las colecciones con su recuento de documentos y fragmentos |
| `GET` | `/documents` | Lista los documentos indexados (admite filtro `?collection=<nombre>`) |
| `POST` | `/index` | Indexa o actualiza un documento individual (`.md`, `.html` o `.json`) |
| `POST` | `/index-batch` | Indexa un lote de documentos en una sola transacción en memoria (`documents`, `collection`, `replaceCollection`) |
| `POST` | `/index-directory` | Indexa recursivamente una carpeta local (`.md`, `.mdx`, `.txt`, `.html`, `.json`, admite `excludePatterns`) |
| `POST` | `/search` | Busca pasajes relevantes (`query`, `limit`, `collection`, `minScore`, `maxPerDoc`, `filter`, `includeNeighbors`) |
| `DELETE` | `/documents/:title` | Elimina un documento específico (admite `?collection=<nombre>`) |
| `DELETE` | `/store` | Vacía todo el almacén o únicamente una colección si se indica `?collection=<nombre>` |
| `GET` | `/ping` | Healthcheck del servicio con métricas de memoria y colecciones |
| `POST` | `/api/shutdown` | Persiste el almacén de forma síncrona y apaga limpiamente el servicio |

