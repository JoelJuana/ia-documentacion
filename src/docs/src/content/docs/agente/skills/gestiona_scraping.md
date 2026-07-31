---
title: gestiona_scraping
description: Extrae texto limpio y estructurado en formato Markdown de cualquier página web pública para análisis, documentación o alimentación de RAG. Úsalo cuando necesites consultar una URL, leer un artículo o descargar información técnica web a través del endpoint /api/scrape del Gateway.
---

*   **Ruta de Configuración**: [`IA_Configuracion/skills/gestiona_scraping/`](file:///C:/Users/jjtei/Desktop/IA_Configuracion/skills/gestiona_scraping/SKILL.md)

---

# Skill: Gestionar Scraping (`gestiona_scraping`)

Este skill interactúa con el microservicio **api-utilidades-scraping** (corriendo en el puerto **3700** o de manera centralizada a través del API Gateway en `http://localhost:3000/api/scrape`) para realizar descargas web rápidas, extraer el contenedor principal de texto de la página (eliminando banners, headers, footers y scripts) y transformarlo a formato Markdown limpio y legible.

---

## Cuándo activar

Activa esta habilidad cuando el usuario o los flujos automatizados de investigación requieran:
- *"extrae el contenido de la web ..."*, *"descarga este artículo"*
- *"lee la documentación de la URL ..."*, *"haz scraping a ..."*
- *"extrae texto limpio de la página ..."*
- *"alimenta el RAG con información de este enlace web"*

---

## Instrucciones de Uso y Automatización

### Paso 1: Verificar el Estado del Servidor (Health Check)

El servicio corre en el puerto **3700** (mapeado en `/api/scrape` del Gateway). Comprueba su estado a través del Gateway:

```powershell
try { $r = Invoke-RestMethod -Uri "http://localhost:3000/api/scrape/" -TimeoutSec 3; $r.message } catch { "OFFLINE" }
```

Si no está activo, arráncalo de fondo:
```powershell
Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory "C:\Users\jjtei\Desktop\IA_Infraestructura\api-utilidades-scraping" -WindowStyle Hidden
Start-Sleep -Seconds 2
```

---

### Paso 2: Extraer Contenido de una URL (`POST /api/scrape/extract`)

Envía la URL del sitio web público al endpoint. El microservicio procesará la página y devolverá un objeto JSON con el título, descripción y contenido transformado a Markdown:

```powershell
$body = @{
    url = "https://es.wikipedia.org/wiki/Inteligencia_artificial"
} | ConvertTo-Json

$res = Invoke-RestMethod -Uri "http://localhost:3000/api/scrape/extract" -Method Post -Body $body -ContentType "application/json"
$res.data.title             # Título extraído de la página
$res.data.contentMarkdown   # Contenido limpio estructurado en Markdown
```

---

## Integración con RAG (Alimentación de Conocimiento)

Este servicio se complementa de forma natural con `gestiona_conocimiento` para permitir búsquedas locales sobre páginas de internet. Para implementarlo en paralelo:

1. **Extracción**: Llama a `gestiona_scraping` (`/api/scrape/extract`) pasándole la URL de la documentación externa deseada.
2. **Obtención**: Captura el `contentMarkdown` y el `title` devueltos.
3. **Indexación**: Llama a `gestiona_conocimiento` (`/api/rag/index`) enviando ese texto markdown para que se fragmente e indexe en el almacén de RAG local.
4. **Búsqueda**: Posteriormente, el agente puede buscar cualquier dato de esa web realizando peticiones a `/api/rag/search`.
