---
title: Arquitectura del Monorepo
description: Explicación de fondo sobre el diseño conceptual, la estructura de carpetas y los flujos del monorepositorio Proyectos IA.
---

Este artículo explica la arquitectura, el diseño conceptual y los motivos organizativos detrás de la estructura de este monorepositorio.

---

## Estructura Física y Lógica

El monorepositorio `Proyectos_IA` está organizado físicamente en carpetas especializadas que facilitan la administración autónoma por parte de agentes de IA:

```
Proyectos_IA/
├── .agents/                    # Reglas específicas del workspace y skills del monorepo
├── apps/                       # Subproyectos individuales (APIs, Web Apps, Simuladores)
│   ├── business-plans/         # Grupo de simuladores financieros
│   ├── documentacion/          # Portales de documentación (Astro Starlight)
│   │   ├── app-documentacion-farmacia/ # Validador de procedimientos y portal
│   │   └── app-documentacion-ia/ # (Este portal de documentación)
│   ├── app-carta-astral/       # Aplicación React y horóscopo
│   └── app-generador-astral/   # Generador dinámico de cartas astrales
├── dist/                       # Catálogo web unificado copilado para producción
├── docs/                       # Documentación adicional y archivos de soporte
├── scripts/                    # Scripts de orquestación (ej. build-portfolio.js)
├── projects.json               # Inventario central de proyectos activos
└── package.json                # Configuración de dependencias raíz
```

---

## ¿Por qué un Monorepositorio?

El uso de una estructura de monorepositorio proporciona tres ventajas operativas clave:

1.  **Coherencia en el Control de Versiones**: Un único historial de Git unificado facilita a los agentes comprender el impacto global de los cambios realizados y evita problemas de sincronización entre frontends y APIs relacionadas.
2.  **Portafolio Centralizado**: La automatización mediante `build-portfolio.js` lee el inventario central `projects.json` y genera un portal estático unificado en `dist/` que consolida todos los desarrollos de forma visual y accesible.
3.  **Compartición de Estilos e Infraestructura**: Facilita que proyectos similares (como la suite de Business Plans) adopten el mismo libro de estilo CSS de forma nativa sin duplicar plantillas de diseño.

---

## Relación con `IA_Infraestructura`

Aunque `Proyectos_IA` almacena las aplicaciones que el usuario crea o consume, este repositorio depende operativamente de la suite de soporte **`IA_Infraestructura`**:

*   **`IA_Infraestructura`** proporciona los microservicios locales (Gateway en puerto 3000, RAG en el 3600, creador de proyectos en el 3300, etc.) que permiten a los agentes de IA realizar su trabajo.
*   **`Proyectos_IA`** contiene las aplicaciones construidas de negocio o utilidad final.

---

## Flujo de Compilación y Portafolio

Cuando un agente crea o actualiza un proyecto en `apps/`:
1.  Debe compilar la aplicación respectiva.
2.  Debe actualizar el archivo central `projects.json`.
3.  Debe ejecutar el script de compilación del catálogo:
    ```bash
    node scripts/build-portfolio.js
    ```
    Este script analiza la configuración de cada proyecto en `projects.json` e inyecta dinámicamente enlaces, títulos y descripciones en la landing corporativa general ubicada en la carpeta `dist/` para producción.
