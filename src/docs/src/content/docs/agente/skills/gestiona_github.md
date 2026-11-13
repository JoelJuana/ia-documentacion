---
title: gestiona_github
description: "Sin descripción detallada."
---

*   **Ruta de Configuración**: `IA_Configuracion/skills/gestiona_github/SKILL.md`

---

﻿---
name: gestiona_github
description: >
  Controla el servidor local de GitPublish CMS y automatiza tareas en repositorios remotos de GitHub.
  Úsalo cuando el usuario pida realizar acciones como crear repositorios, ramas, commits, Pull Requests, issues, o automatizar flujos de trabajo de GitHub mediante lenguaje natural.
---

# Skill: Gestionar GitHub (`gestiona_github`)

Este skill interactúa con el servidor de **GitPublish CMS** (corriendo en el puerto **3100** o de manera centralizada a través del API Gateway en `http://localhost:3000/api/git`) para automatizar tareas en repositorios de GitHub mediante la API REST local que expone el cliente `@octokit/rest`.

Está diseñado para operar en paralelo con los skills de `crea_proyecto`, `gestiona_fierbase` y `gestiona_dominios`.

---

## Cuándo activar

Activa este skill cuando el usuario o los requisitos de automatización soliciten:
- *"inicia el servidor de github"*, *"arranca github"*
- *"lista mis repositorios"*, *"crea un repositorio en github"*
- *"crea la rama..."*, *"sube cambios a github"*
- *"abre un pull request"*, *"fusiona el PR"*
- *"crea una issue"*, *"cierra la issue..."*
- *"publica el post..."*, *"sube una imagen a github"*
- *"ejecuta el workflow de github"* (flujo completo automatizado)

---

## Instrucciones de Uso y Automatización

### Paso 1: Verificar el Estado del Servidor (Health Check)

El servidor corre por defecto en el puerto **3100** (mapeado a través de la ruta del API Gateway `/api/git`). Ejecuta una llamada HTTP para comprobar si el servicio está activo a través del Gateway:

```powershell
try { $r = Invoke-RestMethod -Uri "http://localhost:3000/api/git/ping" -TimeoutSec 3; $r.status } catch { "STOPPED" }
```

### Paso 2A: Si el servidor NO está activo, inicializarlo

Arranca el servidor de Node en segundo plano ocultando la ventana:

```powershell
Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory "C:\Users\jjtei\Desktop\IA_Infraestructura\infra-github" -WindowStyle Hidden
Start-Sleep -Seconds 2
```

### Paso 2B: Si el servidor ya está activo, continúa directamente.

---

### Paso 3: Interactuar con las APIs de Automatización

A continuación se listan las principales peticiones de PowerShell para interactuar con las APIs del servidor:

#### A. Leer y Actualizar Configuración (Tokens y Repos)
Para actualizar el repositorio activo o cambiar las credenciales:
```powershell
# Leer la configuración actual
$config = Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/config"
$config | Format-List

# Actualizar el token u otros parámetros
$body = @{
    token = "ghp_xxxxxxxxxxxxxxxxxxxx" # Omitir si no cambia
    owner = "JoelJuana"
    repo = "mi-nuevo-repo"
    branch = "main"
    postsPath = "posts"
} | ConvertTo-Json

$res = Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/config" -Method Post -Body $body -ContentType "application/json"
$res | Format-List
```

#### B. Gestionar Repositorios
```powershell
# Listar repositorios del usuario
$repos = Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/repos"
$repos | Select-Object name, fullName, private, htmlUrl | Format-Table

# Crear un nuevo repositorio
$body = @{
    name = "nuevo-proyecto-remoto"
    description = "Creado desde la Suite de Agentes"
    private = $true
} | ConvertTo-Json

$res = Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/repos" -Method Post -Body $body -ContentType "application/json"
$res.repo | Format-List
```

#### C. Gestionar Ramas (Branches)
```powershell
# Listar ramas
$branches = Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/branches"
$branches.name

# Crear una nueva rama desde 'main'
$body = @{
    branchName = "feature/nueva-funcionalidad"
    fromBranch = "main"
} | ConvertTo-Json

$res = Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/branches" -Method Post -Body $body -ContentType "application/json"
$res | Format-List

# Eliminar una rama
Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/branches/feature/nueva-funcionalidad" -Method Delete
```

#### D. Gestionar Pull Requests (PRs)
```powershell
# Listar PRs abiertos y estado de checks de CI
$pulls = Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/pulls"
$pulls | Select-Object number, title, headBranch, checkState | Format-Table

# Crear un Pull Request
$body = @{
    title = "feat: añadir simulador financiero"
    headBranch = "feature/nueva-funcionalidad"
    baseBranch = "main"
    body = "Este PR incluye el simulador financiero integrado."
} | ConvertTo-Json

$res = Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/pulls" -Method Post -Body $body -ContentType "application/json"
$res | Format-List

# Fusionar (Merge) un Pull Request
$body = @{
    commitTitle = "chore: merge branch feature/nueva-funcionalidad"
} | ConvertTo-Json

$res = Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/pulls/1/merge" -Method Post -Body $body -ContentType "application/json"
$res | Format-List
```

#### E. Gestionar Tareas (Issues)
```powershell
# Listar issues abiertas
$issues = Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/issues"
$issues | Select-Object number, title, labels | Format-Table

# Crear una issue
$body = @{
    title = "Corregir formato de Frontmatter"
    body = "El campo 'date' de los posts debe validarse con formato AAAA-MM-DD en los commits."
    labels = @("bug", "urgente")
} | ConvertTo-Json

$res = Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/issues" -Method Post -Body $body -ContentType "application/json"
$res.issue | Format-List

# Cerrar una issue
Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/issues/5/close" -Method Post
```

#### F. Gestión de Publicaciones (Markdown)
```powershell
# Listar posts
$posts = Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/posts"
$posts | Select-Object name, sha | Format-Table

# Obtener contenido de un post
$post = Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/posts/mi-primer-post.md"
$post.content

# Guardar/Actualizar un post (valida Frontmatter)
$body = @{
    filename = "nuevo-post.md"
    content = "---\ntitle: \"Nuevo Post\"\ndate: \"2026-06-30\"\n---\n\nContenido de prueba."
    commitMessage = "feat: crear nuevo-post.md"
    branch = "main"
} | ConvertTo-Json

$res = Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/posts" -Method Post -Body $body -ContentType "application/json"
$res | Format-List
```

---

### Paso 4: Flujo Automatizado Completo (Workflow)

El endpoint `/api/workflow` permite realizar de una sola vez la creación de rama, commit del archivo, creación de PR, y merge. Esto permite al agente automatizar flujos sin pasos intermedios.

```powershell
$body = @{
    branchName = "feature/auto-publicacion"
    fromBranch = "main"
    filename = "posts/auto-post.md"
    content = "---\ntitle: \"Post Automático\"\ndate: \"2026-06-30\"\n---\n\nEste post se ha creado mediante flujo automático."
    commitMessage = "feat: auto-post creado por IA"
    createPr = $true
    prTitle = "feat: integrar auto-post"
    prBody = "PR generada y fusionada automáticamente por el flujo del Skill."
    mergePr = $true       # Fisiona el PR al crearlo
    deleteBranch = $true  # Borra la rama 'feature/auto-publicacion' tras el merge
} | ConvertTo-Json

$res = Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/workflow" -Method Post -Body $body -ContentType "application/json"
$res.steps
```

---

### Paso 5: Apagar el Servidor (Liberar Recursos)

Cuando el agente complete el lote de tareas programadas (como crear una PR, subir un post, etc.), debe liberar la memoria RAM y el puerto **3100** enviando una petición de apagado a través del Gateway. Esto garantiza que no queden servidores corriendo indefinidamente en la máquina local:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/git/api/shutdown" -Method Post
```

---

## Orquestación e Integración de Flujos


El skill `gestiona_github` está coordinado con los otros agentes del espacio de trabajo:

1. **Creación con `crea_proyecto`**: Tras generar un proyecto en local, el agente usa `gestiona_github` para inicializar el repositorio y subir la estructura inicial.
2. **Deploy con `gestiona_fierbase`**: Cuando el agente compila y despliega en Firebase Hosting, usa `gestiona_github` para sincronizar los cambios de configuración.
3. **Dominio con `gestiona_dominios`**: Al asociar un subdominio Cloudflare al hosting, el agente guarda la configuración final y la commitea al repositorio.

