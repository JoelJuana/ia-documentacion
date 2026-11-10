---
title: Reglas de "Proyectos IA"
description: Directrices y reglas obligatorias específicas del repositorio Proyectos IA.
---

*   **Ruta en repositorio**: `IA_Configuracion/proyectos-reglas/proyectos-ia.md`

---

# Reglas del Workspace: IA Proyectos

Estas son directrices que debes seguir obligatoriamente cuando edites código en este espacio de trabajo (`C:\Users\jjtei\Desktop\IA_Proyectos`):

## 1. Sincronización Obligatoria con GitHub
*   Cada vez que termines una tarea que implique crear, modificar o eliminar código en cualquiera de los subproyectos del monorepo, **debes subir los cambios de forma inmediata a GitHub**.
*   Los comandos a ejecutar al terminar son:
    ```bash
    git add .
    git commit -m "<mensaje-convencional>"
    git push origin main
    ```

## 2. Convención de Commits (Conventional Commits)
*   Todos los commits deben seguir el estándar convencional:
    *   `feat(proyecto): ...` para nuevas características o inicialización de código.
    *   `fix(proyecto): ...` para corrección de bugs o estilos.
    *   `docs(proyecto): ...` para documentación y archivos Markdown.
    *   `chore(proyecto): ...` para mantenimiento.
*   **Ejemplo**: `feat(astral): integrar API de horóscopo` o `docs(cms): actualizar guía del desarrollador`.

## 3. Integridad del Monorepositorio
*   Nunca inicialices un repositorio Git (`.git`) independiente dentro de las subcarpetas del proyecto. Todo debe consolidarse a través del repositorio de la raíz.
*   Si agregas un proyecto que ya contiene una carpeta `.git`, elimínala o renombrala a `.git_backup` para evitar conflictos de submódulos de Git.

## 4. Gestión de Dominios e Infraestructura con Cloudflare
*   Al crear o publicar nuevos proyectos web (Vanilla, React) mediante el creador de proyectos o al subirlos a producción en GitHub, se debe automatizar la asignación de su subdominio CNAME.
*   El subdominio debe seguir el formato `<nombre-proyecto>.<CLOUDFLARE_BASE_DOMAIN>` y apuntar al servidor o host de despliegue (ej. `joeljuana.github.io`) con el proxy de Cloudflare activo (`proxied: true`) para garantizar HTTPS automático sin configuración manual.
*   Los microservicios de infraestructura viven en `C:\Users\jjtei\Desktop\IA_Infraestructura` y se controlan con la skill `gestiona_infraestructura`. Utiliza la skill `gestiona_dominios` para interactuar con el agente local (`http://localhost:3400`) y automatizar la validación de dominios e infraestructura.
*   **Gestión Automática del Ciclo de Vida**: 
    - **Arranque JIT (Just-In-Time)**: Si una tarea requiere el uso de algún servicio de soporte (GitHub, Firebase, Dominios, Project Creator, etc.) y detectas que no está respondiendo en su puerto correspondiente, **debes arrancarlo automáticamente** en segundo plano antes de realizar la operación.
    - **Apagado al finalizar**: Para evitar el consumo continuo de memoria y bloqueos de puertos en la máquina local, **es tu responsabilidad apagar todos los servicios de infraestructura** (`stop-infra.ps1` o mediante el comando de apagado) una vez hayas completado la tarea o detectes que la conversación ha entrado en fase de cierre, antes de entregar tu respuesta final al usuario.
*   **Reserva de Puertos**: El rango de puertos del **3000 al 3799** está reservado exclusivamente para los microservicios globales de infraestructura. Las aplicaciones de negocio o proyectos independientes (React, Node, APIs de negocio) deben utilizar puertos fuera de este rango (por ejemplo, la serie `5000` o superiores, o el puerto por defecto de Vite `5173`).
*   **Libro de Estilo Corporativo (Business Plans)**: Todos los simuladores en `apps/business-plans/` deben compartir la misma estética unificada:
    - Tipografía: `'Outfit'` (títulos y KPIs) e `'Inter'` (cuerpo y datos).
    - Colores base: Fondo `#080c14`, tarjetas `rgba(13, 20, 35, 0.75)`, bordes `rgba(255, 255, 255, 0.07)`.
    - Colores de acento: Índigo (`#6366f1`), cian (`#06b6d4`), esmeralda (`#10b981`) para éxitos y rojo (`#f43f5e`) para pérdidas.
    - Gradiente de títulos: `linear-gradient(135deg, #6366f1, #3b82f6, #06b6d4)`.
*   **Mantenimiento del Catálogo y Builds**: Tras crear, modificar o mover cualquier proyecto, el agente debe obligatoriamente:
    - Actualizar el inventario central `projects.json` si corresponde.
    - Compilar a producción (`npm run build`) en la carpeta del subproyecto si es un frontend.
    - Correr el script del portafolio (`node scripts/build-portfolio.js`) desde la raíz del monorepositorio para asegurar que la web de catálogo en `dist/` contenga los últimos cambios funcionales.


