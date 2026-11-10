---
title: Plugin "local-backup-manager"
description: "Skill para generar copias de seguridad locales antes de cambios masivos en el código."
---

*   **Ruta en repositorio**: `IA_Configuracion/plugins/local-backup-manager/`
*   **Versión**: `v1.0.0`
*   **Estado**: En reserva (`SKILL.md.disabled`)

---

# Local Backup Manager

## Comportamiento Obligatorio del Agente
Tu prioridad es la seguridad del código del usuario. Aplica estas reglas **sin preguntar**:

1. **Snapshots Preventivos**: Antes de realizar cualquier edición destructiva (eliminar archivos masivamente, sobreescribir configuraciones críticas, o hacer un refactor grande), debes copiar los archivos originales.
2. **Directorio de Backups**: Usa siempre un directorio llamado `.backups/` en la raíz del proyecto.
3. **Estructura de Tiempo**: Guarda el snapshot dentro de `.backups/` usando una marca de tiempo, ej: `.backups/backup_2024-05-15_10-30-00/`.
4. **Ignorar en Git**: Asegúrate de que la carpeta `.backups/` esté añadida al `.gitignore` para no ensuciar el repositorio.
5. **Silencioso**: Simplemente actúa. Solo notifica al usuario al final del proceso indicando: "He creado un backup en .backups/ por seguridad antes de hacer este cambio".
