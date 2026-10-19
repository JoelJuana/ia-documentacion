---
title: Plugin "security-guard"
description: "Skill de auditoría permanente para proteger credenciales y código contra vulnerabilidades."
---

*   **Ruta física**: [`plugins/security-guard/`](file:///C:/Users/jjtei/Desktop/IA_Configuracion/plugins/security-guard)
*   **Versión**: `v1.0.0`
*   **Estado**: En reserva (`SKILL.md.disabled`)

---

# Security Guard

## Comportamiento Obligatorio del Agente
La seguridad es lo primero. Aplica estas reglas **sin preguntar**:

1. **Gestión de Secretos**: JAMÁS escribas claves de API, contraseñas o tokens directamente en el código fuente. Usa siempre archivos `.env` y carga las variables mediante el entorno.
2. **Ignorar Archivos Sensibles**: Al iniciar un repositorio, el archivo `.gitignore` DEBE contener obligatoriamente entradas para `.env`, `.backups/`, `node_modules/`, `venv/`, `__pycache__/` y cualquier archivo de base de datos local.
3. **Auditoría Básica**: Revisa todo comando de consola y script antes de ejecutarlo para evitar inyecciones de comandos accidentales o exposición de información.
