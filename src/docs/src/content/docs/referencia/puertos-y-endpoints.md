---
title: Matriz de Puertos, APIs y Targets Cloud
description: Referencia técnica centralizada de puertos reservados (3000-3799), rutas del API Gateway, variables de entorno y canales de Firebase Hosting.
sidebar:
  order: 1
---

Esta especificación de referencia reúne todos los puertos reservados, rutas del **API Gateway**, variables de entorno críticas y targets de despliegue en **Firebase Hosting Multisite** del ecosistema.

---

## 1. Reserva de Puertos e Infraestructura Local (`3000–3799`)

El rango de puertos **3000 al 3799** está reservado exclusivamente para los microservicios de `IA_Infraestructura`. Todas las peticiones de agentes y clientes deben dirigirse al **API Gateway** en el puerto `3000`:

| Servicio | Puerto Interno | Ruta Gateway (`:3000`) | Salud / Estado | Propósito Técnico |
| :--- | :--- | :--- | :--- | :--- |
| **infra-gateway** | `3000` | `/` y `/api/health` | `GET /api/health` | Proxy reverso central, observabilidad y visor de logs |
| **infra-github** | `3100` | `/api/git/*` | `GET /api/git/status` | Operaciones Git remotas, commits y automatización GitPublish |
| **infra-firebase** | `3200` | `/api/fb/*` | `GET /api/fb/status` | CRUD en Firestore, Auth y despliegue Hosting Multisite |
| **infra-project-creator** | `3300` | `/api/proj/*` | `GET /api/proj/status` | Scaffolding automatizado y baja limpia de proyectos |
| **infra-domain-manager** | `3400` | `/api/dns/*` | `GET /api/dns/status` | Gestión de registros DNS y subdominios CNAME en Cloudflare |
| **api-design-assets** | `3500` | `/api/design/*` | `GET /api/design/status` | Generación de paletas de color, tipografías y plantillas UI |
| **api-conocimiento-rag** | `3600` | `/api/rag/*` | `GET /api/rag/` | Base vectorial local, fragmentación e indexación semántica |
| **api-utilidades-scraping**| `3700` | `/api/scrape/*` | `GET /api/scrape/status` | Extracción limpia de contenido web a formato Markdown |

---

## 2. Endpoints Principales por Servicio (vía Gateway)

### API Gateway (`http://localhost:3000`)
*   `GET /api/health` — Estado consolidado de los 8 microservicios y validación de archivos `.env`.
*   `GET /api/logs/:service` — Últimas líneas de logs (`stdout`/`stderr`) del microservicio indicado.

### Conocimiento y RAG (`/api/rag`)
*   `GET /api/rag/` — Metadatos de la API y número total de chunks indexados.
*   `POST /api/rag/index` — Indexa un fragmento documental (`{ title, content, metadata }`).
*   `POST /api/rag/search` — Búsqueda semántica TF-IDF sobre la base de conocimientos local.
*   `DELETE /api/rag/store` — Purga completa de la base de conocimientos en memoria y disco (`data/store.json`).

### Firebase Service (`/api/fb`)
*   `POST /api/fb/api/firestore/query` — Consulta avanzada filtrada en colecciones de Firestore.
*   `POST /api/fb/api/firestore/set` — Crea o actualiza documentos en Firestore.
*   `POST /api/fb/api/hosting/deploy` — Despliega una carpeta compilada (`dist/`) a Firebase Hosting y retorna `deployUrl`.

### Domain Manager (`/api/dns`)
*   `GET /api/dns/records` — Lista registros DNS activos en la zona de Cloudflare (`gironacc.com`).
*   `POST /api/dns/cname` — Crea o actualiza un subdominio CNAME apuntando al sitio de Firebase Hosting.

---

## 3. Targets y Dominios de Producción (`gironacc.com`)

Relación de sitios publicados mediante **Firebase Hosting Multisite** y sus subdominios asignados en Cloudflare:

| Proyecto / Aplicación | Target / Sitio Firebase | Dominio Público | Tipo |
| :--- | :--- | :--- | :--- |
| **Portal Documentación IA** | `documentacion-ia` | `https://antigravity.gironacc.com` | Astro Starlight |
| **Documentación Farmacia** | `documentacion-farmacia` | `https://protocolo-farmacia.gironacc.com` | Astro Starlight |
| **Calendario Farmacia** | `app-calendario-farmacia` | `https://turnos-farmacia.gironacc.com` | React + Vite |
| **Comunidad Paradas** | `app-comunidad-paradas` | `https://paradas.gironacc.com` | React + Vite |
| **Notebook Studio** | `app-notebook-studio` | `https://notebook-studio.gironacc.com` | React + Vite |
| **BP Caravanas** | `app-bp-caravanas` | `https://caravanas.gironacc.com` | Vanilla + Vite |
| **BP Ramón Turró** | `app-bp-ramon-turro` | `https://ramon-turro.gironacc.com` | Vanilla + Vite |
| **BP Velero** | `app-bp-velero` | `https://velero.gironacc.com` | Vanilla + Vite |
| **BP Inversión Compra Piso** | `app-bp-inversion-compra-piso` | `https://compra-piso.gironacc.com` | Vanilla + Vite |
| **BP Cuidadora Abuela** | `app-bp-cuidadora-abuela` | `https://cuidadora-abuela.gironacc.com` | Vanilla + Vite |

---

## 4. Comandos Rápidos de Ciclo de Vida

```powershell
# 1. Arrancar la suite completa de microservicios locales (3000-3799)
npm run start --prefix "C:\Users\jjtei\Desktop\IA_Infraestructura"

# 2. Comprobar estado de salud de todos los servicios
curl http://localhost:3000/api/health

# 3. Sincronizar catálogos, compilar portal e indexar en RAG
npm run build --prefix "C:\Users\jjtei\Desktop\IA_Documentacion\src\docs"

# 4. Apagar obligatoriamente la infraestructura al finalizar la sesión
npm run stop --prefix "C:\Users\jjtei\Desktop\IA_Infraestructura"
```
