---
title: "Conocimiento y RAG (api-conocimiento-rag)"
description: "Ficha técnica detallada del microservicio api-conocimiento-rag."
---

*   **Ruta en repositorio**: `IA_Infraestructura/api-conocimiento-rag/`

---

# api-conocimiento-rag

Microservicio local (`v1.3.0`) encargado de la indexación, fragmentación (*chunking*), aislamiento por **colecciones (`collections`)** y recuperación mediante ranking **Okapi BM25 + Phrase Boost** para las bases de conocimiento especializadas de los agentes de IA.

## Especificaciones Técnicas

- **Puerto de red**: `3600` (Gateway: `/api/rag`)
- **Ruta física**: `IA_Infraestructura/api-conocimiento-rag/`
- **Persistencia**: Guarda su base de conocimientos de forma atómica en `data/store.json` (ignorado en Git).
- **Aislamiento multi-dominio (`v1.3.0`)**: Soporta colecciones independientes (`default` para documentación del portal, `juridico-cccat` para legislación y doctrina registral catalana, etc.) con estadísticas IDF/BM25 separadas por colección.

## Funciones Clave

1. **Fragmentación Automatizada (Chunking)**: Divide documentos extensos por bloques semánticos y descarta *stop-words* triviales.
2. **Ranking Okapi BM25 por Colección**: Calcula relevancia con IDF suavizado, ponderación reforzada en títulos y bonificación de coincidencia exacta de frase dentro del universo exclusivo de la colección consultada.
3. **Upsert y Limpieza Selectiva**: Actualiza documentos por par `(collection, title)` y permite vaciar una colección concreta sin alterar el resto de la base de conocimientos.

## Endpoints del Servicio

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/` | Metadatos de la API, versión, chunks totales y desglose de colecciones activas |
| `GET` | `/collections` | Lista todas las colecciones con su recuento de documentos y fragmentos |
| `GET` | `/documents` | Lista los documentos indexados (admite filtro `?collection=<nombre>`) |
| `POST` | `/index` | Indexa o actualiza un documento (`title`, `content`, `metadata` y `collection` opcional) |
| `POST` | `/index-directory` | Indexa recursivamente una carpeta local `.md`/`.mdx`/`.txt` en la `collection` indicada |
| `POST` | `/search` | Busca pasajes relevantes por `query`, `limit` y `collection` opcional |
| `DELETE` | `/documents/:title` | Elimina un documento específico (admite `?collection=<nombre>`) |
| `DELETE` | `/store` | Vacía todo el almacén o solo una colección si se indica `?collection=<nombre>` |
| `GET` | `/ping` | Healthcheck del servicio con métricas de memoria y colecciones |
| `POST` | `/api/shutdown` | Persiste el almacén de forma síncrona y apaga limpiamente el servicio |

