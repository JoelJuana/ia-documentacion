---
title: gestiona_conocimiento
description: Indexa documentación y consulta la base de conocimiento local (RAG) para recuperar pasajes relevantes en tareas de investigación o soporte. Úsalo cuando necesites procesar o buscar en documentación extensa, manuales de API o código fuente del proyecto a través de la ruta /api/rag del Gateway.
---

*   **Ruta de Configuración**: `IA_Configuracion/skills/gestiona_conocimiento/SKILL.md`

---

# Skill: Gestionar Conocimiento (`gestiona_conocimiento`)

Este skill interactúa con el microservicio **api-conocimiento-rag** (corriendo en el puerto **3600** o de manera centralizada a través del API Gateway en `http://localhost:3000/api/rag`) para indexar documentación y buscar información relevante en un almacén temporal en memoria.

---

## Cuándo activar

Activa esta habilidad cuando el usuario o los requerimientos de la tarea soliciten:
- *"guarda este manual en la base de conocimientos"*, *"indexa la documentación"*
- *"busca información sobre..."*, *"consulta en la base de conocimientos qué dice sobre..."*
- *"carga el código/guía en el RAG"*
- *"limpia la base de datos de conocimiento"*

---

## Instrucciones de Uso y Automatización

### Paso 1: Verificar el Estado del Servidor (Health Check)

El servidor corre por defecto en el puerto **3600** (mapeado en `/api/rag` del Gateway). Comprueba su estado a través del Gateway:

```powershell
try { $r = Invoke-RestMethod -Uri "http://localhost:3000/api/rag/" -TimeoutSec 3; $r.message } catch { "OFFLINE" }
```

Si no responde, arráncalo de fondo:
```powershell
Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory "C:\Users\jjtei\Desktop\IA_Infraestructura\api-conocimiento-rag" -WindowStyle Hidden
Start-Sleep -Seconds 2
```

---

### Paso 2: Indexar Documentos (`POST /api/rag/index`)

Este endpoint toma un texto extenso (`content`), lo divide automáticamente en fragmentos (*chunks*) por párrafos, los normaliza (tokenización, remoción de acentos) y los guarda en memoria.

```powershell
$body = @{
    title = "Manual de Arquitectura Local"
    content = "El Gateway central de la infraestructura escucha en el puerto 3000.`n`nRedirige las peticiones a los respectivos puertos internos en el rango 3100-3700."
    metadata = @{ autor = "Admin"; proyecto = "Suite IA" }
} | ConvertTo-Json

$res = Invoke-RestMethod -Uri "http://localhost:3000/api/rag/index" -Method Post -Body $body -ContentType "application/json"
$res | Format-List
```

---

### Paso 3: Buscar Pasajes Relevantes (`POST /api/rag/search`)

Permite realizar búsquedas rápidas. Devuelve los fragmentos ordenados descendentemente por su puntaje de relevancia léxica (`score`):

```powershell
$body = @{
    query = "en qué puerto escucha el gateway"
    limit = 3 # Cantidad máxima de fragmentos a retornar (por defecto 3)
} | ConvertTo-Json

$res = Invoke-RestMethod -Uri "http://localhost:3000/api/rag/search" -Method Post -Body $body -ContentType "application/json"
$res.data | Format-Table -Wrap
```

---

### Paso 4: Limpiar la Base de Conocimiento (`DELETE /store`)

Para vaciar por completo la base de conocimiento temporal en memoria (por ejemplo, para reiniciar el contexto de una nueva investigación):

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/rag/store" -Method Delete
```

---

## Flujo Recomendado de Indexación de Carpetas

Si necesitas indexar una carpeta entera del ordenador del usuario, el agente debe:
1. Buscar los archivos (generalmente `.md` o `.txt`) usando el sistema de archivos local (`list_dir`).
2. Leer recursivamente cada archivo.
3. Para cada uno, enviar una solicitud `POST` a `/api/rag/index` asignando el nombre del archivo como `title` y su contenido como `content`.
4. Una vez cargados, realizar las llamadas a `/api/rag/search` para encontrar respuestas precisas en lugar de saturar la ventana de contexto de la conversación principal.
