---
title: Plugin "git-auto-sync"
description: "Skill para automatizar el control de versiones con Git (commits semánticos, branches, push)."
---

*   **Ruta en repositorio**: `IA_Configuracion/plugins/git-auto-sync/`
*   **Versión**: `v1.0.0`
*   **Estado**: En reserva (`SKILL.md.disabled`)

---

# Git Auto-Sync

## Comportamiento Obligatorio del Agente
Cuando desarrolles o modifiques código, aplica estas reglas de control de versiones **sin preguntar**:

1. **Inicialización**: Si el proyecto no tiene un repositorio Git (`.git/`), ejecuta `git init` automáticamente antes de hacer cambios.
2. **Commits Constantes y Semánticos**: 
   - Al completar una tarea o un archivo importante, haz un commit.
   - Usa Conventional Commits obligatoriamente: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.
   - Ejemplo: `git commit -m "feat: añade sistema de autenticación"`
3. **Sincronización (Push)**: Si detectas que hay un `remote` configurado (ej. GitHub o GitLab), ejecuta `git push` automáticamente después de tus commits.
4. **Manejo de Ramas**: Si el usuario te pide trabajar en una "nueva funcionalidad", crea una rama automáticamente (`git checkout -b feature/nombre-funcionalidad`) antes de empezar a programar.
