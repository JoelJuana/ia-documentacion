---
title: Crear y Sincronizar una Habilidad (Skill)
description: Guía paso a paso para diseñar, registrar en IA_Configuracion, activar localmente e indexar una nueva habilidad de agente.
sidebar:
  order: 3
---

Las **Skills** dotan a los agentes de IA de instrucciones especializadas, plantillas y flujos de trabajo reproducibles. Esta guía detalla cómo crear o actualizar una habilidad asegurando que quede disponible tanto para el agente local como en el portal de documentación.

---

## Paso 1: Crear el Archivo `SKILL.md` en `IA_Configuracion`

Toda habilidad debe crearse primero en el repositorio centralizado `IA_Configuracion`:

1.  Crea una carpeta con nombre en formato `snake_case` dentro de `C:\Users\jjtei\Desktop\IA_Configuracion\skills\<nombre_skill>\`.
2.  Crea dentro el archivo `SKILL.md` incluyendo **obligatoriamente** el bloque frontmatter YAML con `name` y `description`:

```markdown
---
name: gestiona_ejemplo
description: Descripción concisa del propósito de la habilidad y cuándo debe activarla el agente.
---

# Gestión de Ejemplo

Instrucciones detalladas, disparadores de lenguaje natural, reglas operativas y ejemplos de uso...
```

---

## Paso 2: Copiar al Directorio Activo del Agente

Para que el agente pueda utilizar la habilidad de forma inmediata en las sesiones locales, copia el archivo al directorio activo de configuración de Gemini:

```powershell
New-Item -ItemType Directory -Force -Path "C:\Users\jjtei\.gemini\config\skills\<nombre_skill>"
Copy-Item "C:\Users\jjtei\Desktop\IA_Configuracion\skills\<nombre_skill>\SKILL.md" `
          "C:\Users\jjtei\.gemini\config\skills\<nombre_skill>\SKILL.md" -Force
```

*(Alternativamente, puedes ejecutar el script `install.ps1` en la raíz de `IA_Configuracion` para sincronizar todas las skills y plugins de una sola vez).*

---

## Paso 3: Sincronizar con el Portal e Indexar en RAG

Ejecuta el build del portal de documentación para que [`sync-catalog.js`](file:///c:/Users/jjtei/Desktop/IA_Documentacion/src/docs/scripts/sync-catalog.js) genere la ficha en `/agente/skills/<nombre_skill>/`, actualice el contador de la portada e indexe su contenido en `api-conocimiento-rag`:

```powershell
npm run build --prefix "C:\Users\jjtei\Desktop\IA_Documentacion\src\docs"
```
