---
title: Publicar un Nuevo Documento en el Portal
description: Guía paso a paso para auditar, validar y publicar un documento técnico en el portal de documentación IA.
sidebar:
  order: 1
---

Esta guía explica paso a paso cómo redactar, auditar y publicar de forma segura un nuevo documento técnico en el portal de documentación de la suite de agentes. 

Siguiendo este proceso garantizamos que todos los markdown agregados cumplan con las reglas de estilo y seguridad (evitando brechas de seguridad como credenciales en texto plano) de la infraestructura.

---

## Paso 1: Redactar el Borrador del Documento

1.  Crea un nuevo archivo Markdown (`.md`) en tu directorio de trabajo (por ejemplo, en una carpeta temporal o en tu espacio de trabajo local).
2.  Define el **Frontmatter obligatorio** al inicio del archivo, especificando `title` y `description`.
    ```markdown
    ---
    title: Mi Nueva Guía de Tarea
    description: Guía paso a paso para resolver un problema operativo específico del ecosistema.
    ---
    ```
3.  Escribe el contenido utilizando la jerarquía markdown estándar (`##`, `###`), evitando decoraciones redundantes o emojis en los títulos de secciones.

---

## Paso 2: Auditar el Borrador Localmente

Antes de copiar el archivo al portal, debes ejecutar el script de auditoría `scripts/validate-doc.mjs` para comprobar que cumple con el estándar del portal.

1.  Abre una terminal en la raíz del proyecto `IA_Documentacion`.
2.  Ejecuta la validación especificando la ruta al borrador y su categoría temática de destino:
    ```bash
    node scripts/validate-doc.mjs <ruta-a-tu-borrador.md> <categoria>
    ```
    *Categorías válidas:*
    *   `agente/reglas` (Directrices del agente)
    *   `agente/skills` (Especificaciones de habilidades)
    *   `proyectos-ia` (Inventario y fichas de desarrollos)
    *   `infraestructura-local` (Servicios, red y puertos)

### Ejemplo de Ejecución:
```bash
node scripts/validate-doc.mjs C:\temp\mi-guia.md proyectos-ia
```

Si la auditoría es exitosa, el validador copiará **automáticamente** el borrador aprobado a la carpeta de contenido correspondiente del portal de Astro.

---

## Paso 3: Confirmar Errores Comunes de Rechazo

Si el script de auditoría rechaza el documento, revisa las siguientes reglas:
*   **Credenciales**: Se prohíbe exponer claves de API (como cadenas `AIzaSy...`), contraseñas o tokens secretos. Si usas ejemplos, usa marcadores ficticios.
*   **IPs Privadas**: Asegúrate de que no se exponen direcciones IP críticas en texto plano.
*   **Frontmatter**: Asegúrate de no olvidar las claves obligatorias `title` y `description` delimitadas por `---`.
*   **Listas**: Para la categoría `agente/reglas`, el contenido debe estar organizado en listas ordenadas o viñetas para mayor claridad.

---

## Paso 4: Pasar el Control de Pre-commit Automático

El repositorio cuenta con un Git Hook `pre-commit` instalado en `.git/hooks/pre-commit`. 

Cada vez que intentes realizar un commit (`git commit`) de un archivo markdown en las carpetas vigiladas del portal, el hook interceptará el archivo staged y ejecutará la auditoría de forma transparente.

1.  Añade tu archivo a la zona de preparación (staged):
    ```bash
    git add src/docs/src/content/docs/proyectos-ia/mi-guia.md
    ```
2.  Realiza el commit:
    ```bash
    git commit -m "docs(proyectos): añadir nueva guía para el servicio de ejemplo"
    ```
3.  Si la validación encuentra errores, el commit se cancelará de inmediato. Corrige los puntos indicados en la terminal y repite el proceso.

---

## Paso 5: Compilar e Indexar en RAG

Para que tu documento esté disponible en las búsquedas semánticas del agente autónomo local, debes compilar el sitio para inyectarlo en el motor RAG local.

1.  Asegúrate de que el API Gateway está encendido en el puerto 3000.
2.  Ejecuta la compilación de producción en el directorio `src/docs/`:
    ```bash
    npm run build
    ```
    Este comando desencadenará:
    *   La sincronización en caliente del catálogo de proyectos.
    *   La compilación estática de Astro.
    *   La indexación granular (híbrida con chunking) de tu nuevo archivo en `api-conocimiento-rag`.
