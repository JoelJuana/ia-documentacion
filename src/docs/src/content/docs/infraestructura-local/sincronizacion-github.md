---
title: Sincronización con GitHub
description: Guía de tareas sobre el proceso de commits convencionales y sincronización obligatoria de cambios en el monorepositorio.
---

Esta guía explica detalladamente la tarea de sincronizar los cambios realizados en el monorepositorio con el repositorio remoto de GitHub de forma segura y estandarizada.

---

## Regla de Sincronización Obligatoria

Cada vez que termines una tarea (ya sea crear, modificar o eliminar código en cualquiera de los subproyectos del monorepo), **debes subir los cambios de forma inmediata a GitHub**. No dejes tareas a medias sin sincronizar localmente si ya están operativas.

---

## Convención de Commits (Conventional Commits)

Todos los commits de este monorepositorio deben seguir estrictamente el estándar de commits convencionales. Esto nos permite mantener un historial limpio y estructurado. El formato general es:

```bash
tipo(proyecto): mensaje descriptivo de la acción
```

### Tipos Permitidos
*   `feat`: Nuevas características o inicialización de un nuevo subproyecto.
    *   *Ejemplo*: `feat(astral): integrar API de horóscopo`
*   `fix`: Correcciones de bugs, dependencias o fallos de estilo en el código.
    *   *Ejemplo*: `fix(portfolio): alinear grid en pantallas pequeñas`
*   `docs`: Documentación en archivos Markdown o comentarios explicativos de arquitectura.
    *   *Ejemplo*: `docs(cms): actualizar guía del desarrollador`
*   `chore`: Tareas generales de mantenimiento del repositorio, configuración de linters o husky.
    *   *Ejemplo*: `chore(deps): actualizar dependencias de Vite`

---

## Secuencia de Comandos en Consola

Para realizar la sincronización, abre la terminal en la raíz del monorepositorio (`C:\Users\jjtei\Desktop\Proyectos_IA`) y ejecuta la siguiente secuencia ordenada de comandos:

```bash
# 1. Comprueba qué archivos han cambiado
git status

# 2. Agrega todos los archivos nuevos y modificados
git add .

# 3. Realiza el commit semántico
git commit -m "feat(docs-monorepo): inicializar portal de documentación del monorepo"

# 4. Sube los cambios a la rama principal
git push origin main
```

---

## Integridad del Monorepositorio

*   **Evita repositorios anidados:** Nunca inicialices un repositorio Git (`.git`) independiente dentro de las subcarpetas del proyecto en `apps/`. Todo el monorepositorio se consolida a través del archivo `.git` de la raíz.
*   Si integras o descargas una plantilla que contenga una carpeta `.git` interna, **elimínala** o renombrala a `.git_backup` antes de ejecutar `git add .` para evitar crear submódulos rotos en el control de versiones.
