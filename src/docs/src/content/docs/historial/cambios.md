---
title: Bitácora de Cambios
description: Historial de actualizaciones, cambios y tareas completadas en la infraestructura y proyectos.
sidebar:
  order: 5
---

Este documento registra cronológicamente las actualizaciones, mejoras e intervenciones realizadas en el ecosistema de IA.

---

# Bitácora de Cambios del Ecosistema IA

Todos los cambios y tareas notables de este monorepositorio y del ecosistema de IA local se documentarán en este archivo de forma cronológica.

---

## [2026-07-12] — Sistema de Documentación Viva y Automatizada

### Añadido
- **Automatización**: Nueva versión del script `sync-catalog.js` capaz de extraer y copiar de forma dinámica los `README.md` individuales de las apps de negocio en `IA_Proyectos` y de los servicios de infraestructura en `IA_Infraestructura`.
- **Configuración del Agente**: Se integra de forma automatizada el repositorio de `IA_Configuracion` (catálogo de plugins activos, instalación mediante `install.ps1`, reglas específicas por proyecto e introducción técnica).
- **Estilo**: Estructura del menú lateral de Astro Starlight configurada para auto-generar la barra de navegación basada en directorios dinámicos (`proyectos-ia/apps`, `configuracion/plugins`, `configuracion/reglas`).
- **Historial**: Este archivo de bitácora (`CHANGELOG.md`) y su respectiva integración en el portal.
- **Fichas de Soporte**: Se crearon `README.md` explicativos iniciales para las 7 aplicaciones de negocio y los 8 microservicios de desarrollo local.

