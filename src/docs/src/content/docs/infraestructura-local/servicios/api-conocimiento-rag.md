---
title: "Conocimiento y RAG (api-conocimiento-rag)"
description: "Ficha técnica detallada del microservicio api-conocimiento-rag."
---

*   **Ruta en repositorio**: `IA_Infraestructura/api-conocimiento-rag/`

---

# api-conocimiento-rag

Microservicio local (`v1.4.0`) encargado de la indexación transaccional por lotes, fragmentación semántica jerárquica en Markdown, aislamiento por **colecciones (`collections`)** y recuperación híbrida mediante **Okapi BM25 + Lematización Ligera en Español + Phrase Boost** para las bases de conocimiento especializadas de los agentes de IA.

## Especificaciones Técnicas

- **Puerto de red**: `3600` (Gateway: `/api/rag`)
- **Ruta física**: `IA_Infraestructura/api-conocimiento-rag/`
- **Persistencia compacta y serializada**: Guarda su base de conocimientos de forma atómica sin duplicar vectores derivados en `data/store.json` (ignorado en Git), con cola asíncrona libre de colisiones en Windows NTFS y volcado síncrono en `SIGINT`/`SIGTERM`.
- **Aislamiento multi-dominio (`v1.4.0`)**: Soporta colecciones independientes (`default` para documentación del portal, `juridico-cccat` para legislación consolidada del BOE y doctrina registral catalana, etc.) con estadísticas IDF exactas y morfológicas separadas por colección.

## Funciones Clave

1. **Fragmentación Semántica Markdown (Semantic Chunker)**: Agrupa el contenido por secciones de encabezado (`#`–`####`) respetando bloques de código cercados, fusiona encabezados huérfanos con la sección siguiente y divide artículos extensos (`> 1.400` caracteres) con solapamiento contextual e inyección automática del encabezado de sección.
2. **Tokenización Técnica/Jurídica y Stemming en Español**: Conserva dígitos individuales (`art. 9 LH`, `Gate 0`) y referencias jerárquicas compuestas (`553-26.3`, `12.2`), expande sub-tokens con guion (`infra-firebase`) y aplica lematización determinista en español (plurales, género y adverbios en `-mente`) 100% nativa en ARM64.
3. **Búsqueda Avanzada e Indexación por Lotes**: Admite filtrado por metadatos (`filter`), umbral de relevancia (`minScore`), diversificación máxima por documento (`maxPerDoc`) e ingesta masiva atómica mediante `POST /index-batch`.

## Endpoints del Servicio

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/` | Metadatos de la API, versión, chunks totales, tamaño de vocabulario y desglose de colecciones activas |
| `GET` | `/collections` | Lista todas las colecciones con su recuento de documentos y fragmentos |
| `GET` | `/documents` | Lista los documentos indexados (admite filtro `?collection=<nombre>`) |
| `POST` | `/index` | Indexa o actualiza un documento individual (`title`, `content`, `metadata`, `collection` opcional) |
| `POST` | `/index-batch` | Indexa un lote de documentos en una sola transacción en memoria (`documents`, `collection`, `replaceCollection`) |
| `POST` | `/index-directory` | Indexa recursivamente una carpeta local `.md`/`.mdx`/`.txt` en la `collection` indicada |
| `POST` | `/search` | Busca pasajes relevantes (`query`, `limit`, `collection`, `minScore`, `maxPerDoc`, `filter`) |
| `DELETE` | `/documents/:title` | Elimina un documento específico (admite `?collection=<nombre>`) |
| `DELETE` | `/store` | Vacía todo el almacén o únicamente una colección si se indica `?collection=<nombre>` |
| `GET` | `/ping` | Healthcheck del servicio con métricas de memoria y colecciones |
| `POST` | `/api/shutdown` | Persiste el almacén de forma síncrona y apaga limpiamente el servicio |

