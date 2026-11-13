---
title: crea_proyecto
description: "Lanza la interfaz web de Project Creator para crear un nuevo proyecto. Úsalo cuando el usuario diga 'crea proyecto', 'crear proyecto', 'nuevo proyecto', 'quiero crear un proyecto' o expresiones similares."
---

*   **Ruta de Configuración**: `IA_Configuracion/skills/crea_proyecto/SKILL.md`

---

# Skill: Crea Proyecto

Este skill inicia el servidor de **Project Creator** (corriendo en el puerto **3300** o de manera centralizada a través del API Gateway en `http://localhost:3000/api/proj`) y abre la interfaz web para que el usuario configure y cree un nuevo proyecto de forma interactiva.

---

## Cuándo activar

Activa este skill cuando el usuario diga cualquiera de estas frases (o similares):
- "crea proyecto"
- "crear proyecto"
- "nuevo proyecto"
- "quiero crear un proyecto"
- "lanza el creador de proyectos"

---

## Instrucciones

### Paso 1: Verificar que el servidor no está corriendo (Health Check)

Ejecuta un health check para ver si el servidor ya está activo en el puerto **3300** (usando preferiblemente la ruta del API Gateway `/api/proj`):

```powershell
try { $r = Invoke-RestMethod -Uri "http://localhost:3000/api/proj/api/projects" -TimeoutSec 3; "RUNNING" } catch { "STOPPED" }
```

### Paso 2A: Si el servidor NO está corriendo, arrancarlo

Arranca el servidor en segundo plano ocultando la ventana:

```powershell
Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory "C:\Users\jjtei\Desktop\IA_Infraestructura\infra-project-creator" -WindowStyle Hidden
Start-Sleep -Seconds 2
```

### Paso 2B: Si el servidor ya estaba corriendo, saltar al paso 3.

### Paso 3: Abrir el navegador con la interfaz

```powershell
Start-Process "http://localhost:3300"
```

### Paso 4: Confirmar al usuario

Responde al usuario confirmando el arranque:

> ✅ **Project Creator** está listo. Se ha abierto la interfaz en tu navegador en http://localhost:3300.
>
> Desde ahí puedes:
> - Elegir el tipo de proyecto (Vanilla, Node.js, Python, React, API REST)
> - Darle nombre, descripción y autor
> - Seleccionar extras (Chart.js, .gitignore, CHANGELOG, LICENSE)
> - Hacer clic en "✨ Crear Proyecto"
>
> El proyecto se creará automáticamente en `C:\Users\jjtei\Desktop\Proyectos_IA\`.

### Paso 5: Apagar el Servidor (Liberar Recursos)

Una vez que el usuario te indique que ha terminado de crear el proyecto, o cuando la IA detecte que el proyecto ya se ha generado en disco y no se requiere más la interfaz web, el agente debe apagar el servidor de Project Creator para liberar el puerto **3300** y ahorrar memoria RAM enviando un apagado a través del Gateway:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/proj/api/shutdown" -Method Post
```

---

## Notas

- El servidor corre en el puerto **3300** de forma predeterminada (mapeado en `/api/proj` del Gateway).
- Los proyectos se crean en `C:\Users\jjtei\Desktop\Proyectos_IA\`.
- Los 5 tipos de proyecto disponibles son: vanilla, node, python, react, api.
- El tipo React usa Vite como bundler.
- Node y API instalan dependencias npm automáticamente.
- Python crea un entorno virtual (venv) automáticamente.
