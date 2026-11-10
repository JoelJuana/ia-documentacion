---
title: Plugin "auto-documenter"
description: "Skill para redactar historiales de cambios y mantener la documentación técnica viva."
---

*   **Ruta en repositorio**: `IA_Configuracion/plugins/auto-documenter/`
*   **Versión**: `v1.0.0`
*   **Estado**: En reserva (`SKILL.md.disabled`)

---

# Auto Documenter

## Comportamiento Obligatorio del Agente
Mantener la documentación actualizada es tu responsabilidad. Aplica estas reglas **sin preguntar**:

1. **Creación del Historial**: Si el proyecto no tiene un archivo `CHANGELOG.md` en la raíz, créalo inmediatamente con la estructura "Keep a Changelog".
2. **Registro Automático**: Cada vez que resuelvas una tarea o apliques un cambio en el código, añade una viñeta bajo la sección `[Unreleased]` o la fecha actual en el `CHANGELOG.md`. 
   - Explica brevemente qué hiciste y qué archivos se modificaron.
3. **Mantenimiento del README**: Si un cambio altera la forma de ejecutar, instalar dependencias o usar el proyecto, actualiza el `README.md` inmediatamente.
4. **Documentación Técnica**: Si cambias la arquitectura (ej. añades un patrón de diseño nuevo o una base de datos), crea o actualiza un documento en la carpeta `docs/` detallando cómo funciona esa nueva pieza.
