---
title: gestiona_dominios
description: "Inicia el servidor de Gestión Dominios y automatiza la validación de dominios y creación de subdominios CNAME. Úsalo cuando el usuario pida comprobar la disponibilidad de un dominio, crear registros DNS CNAME, levantar el agente de Gestión Dominios o frases similares."
---

*   **Ruta de Configuración**: `IA_Configuracion/skills/gestiona_dominios/SKILL.md`

---

# Skill: Gestiona Dominios

Este skill interactúa con el servidor de **Gestión Dominios** para validar la disponibilidad y el precio de nombres de dominios generados por la IA y automatizar la creación de subdominios DNS CNAME con SSL (proxied) para proyectos web.

## Cuándo activar

Activa este skill cuando el usuario o las directrices de flujo requieran:
- "valida disponibilidad del dominio ..."
- "crea un subdominio CNAME para ..."
- "apunta el dominio a la web publicada"
- "inicia el agente de gestión dominios"
- "inicia gestión dominios"
- "comprueba el precio del dominio ..."

## Instrucciones

### Paso 1: Verificar el estado del servidor (Health Check)

El servidor corre por defecto en el puerto **3400** (mapeado a través del API Gateway en `/api/dns`). Ejecuta una llamada HTTP para comprobar si el servicio está activo a través del Gateway:

```powershell
try { $r = Invoke-RestMethod -Uri "http://localhost:3000/api/dns/ping" -TimeoutSec 3; "RUNNING" } catch { "STOPPED" }
```

### Paso 2A: Si el servidor NO está activo, inicializarlo

Arranca el servidor en segundo plano ocultando la ventana:

```powershell
Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory "C:\Users\jjtei\Desktop\IA_Infraestructura\infra-domain-manager" -WindowStyle Hidden
Start-Sleep -Seconds 2
```

### Paso 2B: Si el servidor ya está activo, continúa al paso 3.

### Paso 3: Interactuar con las APIs del Agente

#### A. Validar disponibilidad y precio de un dominio
Haz una petición GET a `/api/domains/check?domain=<nombre_dominio>`:
```powershell
$domain = "tuproyectoia.com"
$res = Invoke-RestMethod -Uri "http://localhost:3000/api/dns/api/domains/check?domain=$domain"
$res.result | Format-List
```

#### B. Crear un subdominio CNAME apuntando a una web
Haz una petición POST a `/api/dns/cname` con el subdominio y el destino:
```powershell
$body = @{
    name = "proyecto-web"
    content = "joeljuana.github.io"
    proxied = $true
} | ConvertTo-Json
 
$res = Invoke-RestMethod -Uri "http://localhost:3000/api/dns/api/dns/cname" -Method Post -Body $body -ContentType "application/json"
$res.record | Format-List
```

#### C. Listar registros DNS CNAME existentes
```powershell
$res = Invoke-RestMethod -Uri "http://localhost:3000/api/dns/api/dns/records"
$res.records | Out-GridView -Title "Registros DNS Cloudflare" # O simplemente formatear la salida en texto
```

#### D. Guardar o actualizar la configuración de API
```powershell
$body = @{
    token = "tu_token_real"
    zoneId = "tu_zone_id"
    accountId = "tu_account_id"
    baseDomain = "misproyectos.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/dns/api/config" -Method Post -Body $body -ContentType "application/json"
```

#### E. Apagar el Servidor (Liberar Recursos)
Una vez completadas todas las operaciones DNS requeridas, el agente debe apagar el servidor local para liberar el puerto **3400** y optimizar la RAM, enviando una petición de apagado a través del Gateway:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/dns/api/shutdown" -Method Post
```

## Integración con Agente de Carpetas y GitHub

Cuando uses el creador de proyectos y confirmes la publicación en GitHub Pages, puedes ejecutar el comando de **Crear subdominio CNAME** para apuntar el subdominio deseado (ej. `nombre-proyecto.midominio.com`) al destino (`joeljuana.github.io`), garantizando una URL limpia y HTTPS automática gracias al proxy de Cloudflare.
