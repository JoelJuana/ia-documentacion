---
title: Asignación CNAME Cloudflare
description: Guía de tareas para automatizar la asignación de subdominios DNS CNAME utilizando Cloudflare API.
---

Esta guía explica el flujo y los comandos necesarios para asignar y validar subdominios DNS CNAME de manera automática al publicar un nuevo proyecto web.

---

## Formato de Subdominios y Despliegues

Todos los proyectos frontend o APIs que sean subidas a producción en GitHub Pages u otros servidores estáticos deben recibir un subdominio bajo el dominio base del usuario.

El formato estandarizado es:
```
<nombre-proyecto>.<CLOUDFLARE_BASE_DOMAIN>
```

Por ejemplo, si el nombre del proyecto es `app-bp-velero` y el dominio base es `joeljuana.com`, el subdominio resultante será `app-bp-velero.joeljuana.com`, apuntando como un registro CNAME al host de despliegue (como `joeljuana.github.io`) con el proxy de Cloudflare activo (`proxied: true`) para garantizar HTTPS automático.

---

## El Microservicio `infra-domain-manager`

La gestión y registro automatizado de DNS se realiza a través de la skill `gestiona_dominios`, la cual interactúa con el microservicio `infra-domain-manager` (que corre internamente en el puerto **3400** o expuesto a través de la ruta del Gateway `/api/dns`).

### Configuración del Servicio (`.env`)
El servicio requiere que se definan las siguientes variables en su archivo `.env`:
*   `CLOUDFLARE_API_TOKEN`: Token con permisos de lectura y escritura de zonas DNS.
*   `CLOUDFLARE_ZONE_ID`: ID de zona de Cloudflare correspondiente al dominio.
*   `CLOUDFLARE_ACCOUNT_ID`: ID de la cuenta de Cloudflare.
*   `CLOUDFLARE_BASE_DOMAIN`: El dominio raíz (ej. `joeljuana.com`).

---

## Cómo Registrar un Subdominio CNAME

El agente de IA puede automatizar la llamada HTTP a través de la ruta del API Gateway.

### Ejemplo de Petición HTTP (POST)

Para crear o actualizar un registro CNAME en Cloudflare, realiza una llamada REST al API Gateway:

*   **URL**: `http://localhost:3000/api/dns/records`
*   **Método**: `POST`
*   **Cabeceras**: `Content-Type: application/json`
*   **Cuerpo (JSON)**:
```json
{
  "name": "app-bp-velero",
  "type": "CNAME",
  "content": "joeljuana.github.io",
  "proxied": true
}
```

### Script de PowerShell de Ejemplo:

```powershell
$body = @{
    name = "app-bp-velero"
    type = "CNAME"
    content = "joeljuana.github.io"
    proxied = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/dns/records" -Method Post -Body $body -ContentType "application/json"
```

El microservicio verificará si el subdominio ya existe en la zona. Si existe, actualizará su destino; si no, creará un nuevo registro DNS y devolverá el estado correspondiente.
