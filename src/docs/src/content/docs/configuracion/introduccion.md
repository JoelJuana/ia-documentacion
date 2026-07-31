---
title: Introducción a la Configuración
description: Guía de introducción técnica al repositorio de configuración del agente de IA.
---

*   **Ruta física**: [`IA_Configuracion/`](file:///C:/Users/jjtei/Desktop/IA_Configuracion)

---

# Gemini Agent Config — Backup de Configuración

Repositorio privado que almacena las **skills (habilidades)**, **plugins** y **reglas globales** del agente de IA Gemini/Antigravity.

## Estructura

```
├── AGENTS.md          → Reglas globales de comportamiento del agente
├── install.ps1        → Script de instalación automática en equipos nuevos
├── skills/            → Habilidades personalizadas del agente
│   ├── crea_proyecto/
│   ├── gestiona_dominios/
│   ├── gestiona_fierbase/
│   └── gestiona_github/
└── plugins/           → Plugins activos que extienden las capacidades del agente
    ├── auto-documenter/
    ├── auto-previewer/
    ├── chrome-devtools-plugin/
    └── ... (14 plugins en total)
```

## Instalación en un equipo nuevo

### Opción 1: Clonado directo (equipo limpio sin configuración previa)

```powershell
git clone https://github.com/JoelJuana/gemini-agent-config.git "$env:USERPROFILE\.gemini\config"
```

### Opción 2: Usar el script de instalación (equipo con configuración existente)

```powershell
# 1. Descargar el script
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/JoelJuana/gemini-agent-config/main/install.ps1" -OutFile "$env:TEMP\install-gemini-config.ps1"

# 2. Ejecutar
powershell -ExecutionPolicy Bypass -File "$env:TEMP\install-gemini-config.ps1"
```

## Mantener actualizado

Después de modificar skills o plugins localmente:

```powershell
cd "$env:USERPROFILE\.gemini\config"
git add .
git commit -m "feat(skills): descripción del cambio"
git push origin main
```

## Seguridad

Este repositorio usa una política de **lista blanca** en `.gitignore`. Solo se suben:
- `skills/` y `plugins/` (habilidades y extensiones)
- `AGENTS.md` (reglas globales)
- `README.md` e `install.ps1` (documentación y utilidades)

**No se suben nunca:** `config.json`, `mcp_config.json`, `projects/`, `sidecars/` ni ningún archivo con credenciales o rutas locales del sistema.

## Autor

Joel Juana — [@JoelJuana](https://github.com/JoelJuana)

