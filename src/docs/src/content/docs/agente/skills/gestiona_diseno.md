---
title: gestiona_diseno
description: "Recupera recursos de diseño (paletas de colores, combinaciones tipográficas Google Fonts y plantillas HTML/CSS de mockups) para interfaces de usuario premium. Úsalo cuando crees o mejores aplicaciones web para dotarlas de una estética visual profesional a través de la ruta /api/design del Gateway."
---

*   **Ruta de Configuración**: `IA_Configuracion/skills/gestiona_diseno/SKILL.md`

---

# Skill: Gestionar Diseño (`gestiona_diseno`)

Este skill interactúa con el microservicio **api-design-assets** (corriendo en el puerto **3500** o de manera centralizada a través del API Gateway en `http://localhost:3000/api/design`) para proveer paletas cromáticas optimizadas, recomendaciones tipográficas de Google Fonts y esquemas HTML/CSS base de alta calidad estética (mockups de Dashboards o Landing pages) para interfaces web.

---

## Cuándo activar

Activa esta habilidad cuando el usuario o los requisitos de desarrollo soliciten:
- *"dame una paleta de colores premium"*, *"estilos css para un modo oscuro"*
- *"qué tipografías o fuentes de Google Fonts puedo usar?"*
- *"genera un diseño de landing page"*, *"mockup css para un dashboard"*
- *"crea una interfaz elegante para mi web"*

---

## Instrucciones de Uso y Automatización

### Paso 1: Verificar el Estado del Servidor (Health Check)

El servicio corre en el puerto **3500** (mapeado en `/api/design` del Gateway). Comprueba su estado a través del Gateway:

```powershell
try { $r = Invoke-RestMethod -Uri "http://localhost:3000/api/design/" -TimeoutSec 3; $r.message } catch { "OFFLINE" }
```

Si no está activo, arráncalo de fondo:
```powershell
Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory "C:\Users\jjtei\Desktop\IA_Infraestructura\api-design-assets" -WindowStyle Hidden
Start-Sleep -Seconds 2
```

---

### Paso 2: Obtener Paletas de Colores Premium (`GET /api/design/palette`)

El servicio cuenta con paletas de diseño CSS preestablecidas listas para aplicar en `index.css` o hojas de estilo globales:

```powershell
$palettes = Invoke-RestMethod -Uri "http://localhost:3000/api/design/palette"
$palettes.data | ConvertTo-Json
```

*Temas disponibles en la respuesta:*
*   `dark-premium`: HSL, azules profundos, acentos de violeta brillante.
*   `glassmorphism`: Efectos traslúcidos, bordes semi-transparentes y gradientes suaves.
*   `minimalist-light`: Neutros limpios, grises suaves y acentos de azul cobalto.
*   `cyberpunk`: Fondos de carbón, acentos neón rosa y cian eléctrico.

---

### Paso 3: Combinaciones Tipográficas (`GET /api/design/fonts`)

Obtén combinaciones recomendadas de tipografías importables de Google Fonts estructuradas para Títulos, Cuerpo y enlaces de importación CSS:

```powershell
$fonts = Invoke-RestMethod -Uri "http://localhost:3000/api/design/fonts"
$fonts.data | Format-Table -AutoSize
```

---

### Paso 4: Obtener Plantillas de Mockup (`POST /api/design/mockup`)

Permite generar directamente código estructurado HTML y CSS para inyectar en layouts web base:

```powershell
# Tipos soportados: "dashboard-layout" o "landing-hero"
$body = @{
    type = "dashboard-layout"
} | ConvertTo-Json

$mockup = Invoke-RestMethod -Uri "http://localhost:3000/api/design/mockup" -Method Post -Body $body -ContentType "application/json"
$mockup.data.html # Estructura HTML del Dashboard
$mockup.data.css  # Reglas CSS aplicables
```

---

## Flujo de Diseño Recomendado para Nuevos Proyectos

Al crear un nuevo proyecto web con la skill `crea_proyecto`, el agente debe:
1. Consultar el microservicio de diseño para obtener la paleta y tipografías deseadas.
2. Generar el archivo `index.css` aplicando los tokens de colores (variables CSS `--primary`, `--background`, etc.) de la paleta seleccionada y el tag `@import` para la tipografía de Google Fonts elegida.
3. Si el usuario solicita una estructura de interfaz de inicio, recuperar el mockup de la API (`POST /api/design/mockup`) e inyectarlo en el archivo `index.html` del proyecto para ofrecer un acabado visual premium de forma instantánea.
