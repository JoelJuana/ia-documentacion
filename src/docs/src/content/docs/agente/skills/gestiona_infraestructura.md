---
title: gestiona_infraestructura
description: Arranca, detiene y verifica el estado de todos los microservicios de infraestructura local (Gateway, GitHub, Firebase, Project Creator, Domain Manager, Design Assets, RAG, Scraping). Úsalo cuando el usuario diga "arranca infra", "activa infraestructura", "levanta los servicios", "para infra", "detén servicios", "estado de infra", "health check" o expresiones similares.
---

*   **Ruta de Configuración**: [`.gemini/config/skills/gestiona_infraestructura/`](file:///C:/Users/jjtei/.gemini/config/skills/gestiona_infraestructura/SKILL.md)

---

# Skill: Gestiona Infraestructura (`gestiona_infraestructura`)

Este skill controla el ciclo de vida completo de los **8 microservicios de infraestructura local** que dan soporte a los agentes autónomos de desarrollo. Los servicios viven en la carpeta dedicada `C:\Users\jjtei\Desktop\IA_Infraestructura` y se comunican a través de puertos locales en la serie `3000`.

---

## Mapa de Servicios

| Servicio | Puerto | Prefijo Gateway | Descripción |
| :--- | :---: | :---: | :--- |
| **infra-gateway** | 3000 | `/` | Gateway central y punto de acceso unificado |
| **infra-github** | 3100 | `/api/git` | Automatización de GitHub (commits, PRs, issues) |
| **infra-firebase** | 3200 | `/api/fb` | Automatización de Firebase (Firestore, Auth, Hosting) |
| **infra-project-creator** | 3300 | `/api/proj` | Creación de proyectos desde plantillas |
| **infra-domain-manager** | 3400 | `/api/dns` | Gestión DNS y subdominios Cloudflare |
| **api-design-assets** | 3500 | `/api/design` | Assets de diseño, paletas y layouts UI |
| **api-conocimiento-rag** | 3600 | `/api/rag` | Indexación y búsqueda semántica RAG |
| **api-utilidades-scraping** | 3700 | `/api/scrape` | Web scraping y conversión a Markdown |

---

## Cuándo activar

Activa este skill cuando el usuario diga cualquiera de estas frases (o similares):

### Arrancar
- "arranca infra", "activa infraestructura", "levanta los servicios"
- "arranca solo github", "activa el domain manager", "levanta firebase"
- "necesito la infraestructura", "pon en marcha los agentes"

### Verificar estado
- "estado de infra", "health check", "¿están los servicios activos?"
- "comprueba la infraestructura"

### Detener
- "para infra", "detén los servicios", "apaga la infraestructura"
- "libera los puertos", "cierra los agentes"

---

## Instrucciones

### Opción A: Arrancar TODA la infraestructura

#### Paso 1: Verificar si ya está corriendo
```powershell
try { $r = Invoke-RestMethod -Uri "http://localhost:3000/api/health" -TimeoutSec 3; "RUNNING" } catch { "STOPPED" }
```

#### Paso 2A: Si está STOPPED, arrancar todos los servicios
```powershell
npm run start --prefix "C:\Users\jjtei\Desktop\IA_Infraestructura"
```
Espera unos segundos y verifica con el health check.

#### Paso 2B: Si ya está RUNNING, informar al usuario que los servicios ya están activos.

#### Paso 3: Verificar el estado con el Gateway
```powershell
$health = Invoke-RestMethod -Uri "http://localhost:3000/api/health"
$health.data.services | Format-Table -AutoSize
```

Confirmar al usuario con un resumen del estado:
> ✅ **Infraestructura activa**. Gateway en `http://localhost:3000`. Estado general: `healthy`.

---

### Opción B: Arrancar UN servicio individual

Si el usuario solo necesita un servicio específico:

```powershell
# Ejemplo: arrancar solo infra-github
Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory "C:\Users\jjtei\Desktop\IA_Infraestructura\infra-github" -WindowStyle Hidden
Start-Sleep -Seconds 2
```

Verificar que el puerto responde:
```powershell
try { Invoke-RestMethod -Uri "http://localhost:3100/ping" -TimeoutSec 3; "OK" } catch { "ERROR" }
```

Los directorios y puertos de cada servicio son:

| Servicio | Directorio | Puerto |
| :--- | :--- | :---: |
| infra-github | `IA_Infraestructura\infra-github` | 3100 |
| infra-firebase | `IA_Infraestructura\infra-firebase` | 3200 |
| infra-project-creator | `IA_Infraestructura\infra-project-creator` | 3300 |
| infra-domain-manager | `IA_Infraestructura\infra-domain-manager` | 3400 |
| api-design-assets | `IA_Infraestructura\api-design-assets` | 3500 |
| api-conocimiento-rag | `IA_Infraestructura\api-conocimiento-rag` | 3600 |
| api-utilidades-scraping | `IA_Infraestructura\api-utilidades-scraping` | 3700 |
| infra-gateway | `IA_Infraestructura\infra-gateway` | 3000 |

---

### Opción C: Detener TODA la infraestructura

```powershell
npm run stop --prefix "C:\Users\jjtei\Desktop\IA_Infraestructura"
```

Confirmar al usuario:
> 🛑 **Infraestructura detenida**. Todos los puertos (3000-3700) han sido liberados.

---

### Opción D: Verificar estado (Health Check)

```powershell
try {
  $health = Invoke-RestMethod -Uri "http://localhost:3000/api/health" -TimeoutSec 3
  $health.data | ConvertTo-Json -Depth 3
} catch {
  "El Gateway no está corriendo. Usa 'arranca infra' para levantar los servicios."
}
```

---

## Integración con Otras Skills

Este skill es el **punto de entrada** para habilitar el resto de agentes locales:

1. **Antes de usar `gestiona_github`** → asegúrate de que `infra-github` (puerto 3100) está activo.
2. **Antes de usar `gestiona_dominios`** → asegúrate de que `infra-domain-manager` (puerto 3400) está activo.
3. **Antes de usar `crea_proyecto`** → asegúrate de que `infra-project-creator` (puerto 3300) está activo.
4. **Antes de usar `gestiona_fierbase`** → asegúrate de que `infra-firebase` (puerto 3200) está activo.
5. **Antes de usar `gestiona_conocimiento`** → asegúrate de que `api-conocimiento-rag` (puerto 3600) está activo.
6. **Antes de usar `gestiona_diseno`** → asegúrate de que `api-design-assets` (puerto 3500) está activo.
7. **Antes de usar `gestiona_scraping`** → asegúrate de que `api-utilidades-scraping` (puerto 3700) está activo.

Si el usuario invoca cualquiera de esos skills y su servicio no responde, **arranca automáticamente** el servicio de fondo correspondiente antes de continuar.
