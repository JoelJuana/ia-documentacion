---
title: Arquitectura del Monorepo
description: Explicación de fondo sobre el diseño conceptual, la estructura de carpetas y los flujos del monorepositorio IA Proyectos.
sidebar:
  order: 1
---

Este artículo explica la arquitectura, el diseño conceptual y los motivos organizativos detrás de la estructura del monorepositorio de proyectos de negocio.

---

## Estructura Física y Lógica

El monorepositorio `IA_Proyectos` está organizado físicamente en carpetas especializadas que facilitan la administración autónoma por parte de agentes de IA y desarrolladores:

```
IA_Proyectos/
├── .agents/                    # Reglas específicas del workspace de proyectos
│   └── AGENTS.md               # Sincronizado automáticamente desde IA_Configuracion
├── apps/                       # Subproyectos individuales (APIs, Web Apps, Simuladores)
│   ├── api-administrador-comunidad-paradas/  # API modular para gestión de alquileres (FastAPI)
│   ├── app-calendario-farmacia/ # Planificador de turnos de la farmacia 2026 (React)
│   ├── documentacion-farmacia/ # Validador y portal de procedimientos de farmacia (Starlight)
│   ├── workspace-skill-lab/    # Servidor MCP local para control de Google Workspace (Node/TS)
│   └── business-plans/         # Suite integrada de simuladores financieros
│       ├── app-bp-caravanas/   # Simulador para alquiler de caravanas
│       ├── app-bp-comunidad-trasteros/  # Simulador para alquiler de trasteros
│       ├── app-bp-velero/      # Planificador de costes y amortización de barcos
│       ├── landing/            # Landing page unificada de acceso
│       └── build-all.js        # Script de compilación masiva de business plans
├── dist/                       # Catálogo web unificado compilado para producción
├── docs/                       # Documentos adicionales y archivos de soporte
│   ├── _documentos/            # Esquemas y assets de diseño
│   └── _plantillas/            # Plantillas HTML/CSS y layouts
├── scripts/                    # Scripts de orquestación de compilación y creación
│   ├── build-portfolio.js      # Genera el portafolio estático dinámico en dist/
│   ├── create_project.ps1      # Automatiza la creación y registro de apps
│   └── sincronizar-antigravity-manager.ps1 # Utilidad de sincronización
├── projects.json               # Inventario centralizado de proyectos activos
└── package.json                # Configuración básica de dependencias raíz
```

---

## ¿Por qué un Monorepositorio?

El uso de esta estructura proporciona tres ventajas operativas clave:

1.  **Coherencia en el Control de Versiones**: Un único historial de Git unificado para todas las aplicaciones de negocio facilita comprender el impacto global de los cambios y simplifica la gestión del repositorio.
2.  **Portafolio Centralizado**: El catálogo centralizado en [projects.json](file:///c:/Users/jjtei/Desktop/IA_Proyectos/projects.json) permite que scripts automáticos lee la metadata de cada aplicación y actualicen un portal estático unificado en `dist/` que consolida todos los desarrollos.
3.  **Compartición de Estilos e Infraestructura**: Facilita que proyectos similares (como la suite de Business Plans) adopten el mismo libro de estilo CSS de forma nativa sin duplicar archivos.

---

## Relación con `IA_Documentacion` e `IA_Configuracion`

El ecosistema local está dividido conceptualmente para mantener responsabilidades limpias:

*   **`IA_Configuracion`**: Repositorio centralizado de configuración global. Almacena las **skills** y las **reglas de comportamiento** (globales y de proyecto) del agente de IA. Es la fuente de la verdad para las directrices.
*   **`IA_Documentacion`**: Portal de documentación técnica unificado (este portal). Lee la información de skills y proyectos para mostrarla en una interfaz Astro Starlight amigable.
*   **`IA_Proyectos`**: Almacena las aplicaciones construidas de negocio o utilidad final que se desarrollan en el ecosistema. Su archivo de reglas `.agents/AGENTS.md` se actualiza de forma automática a partir de las plantillas de `IA_Configuracion`.

---

## Flujo de Compilación y Portafolio

Cuando se crea o actualiza un proyecto en `apps/`:
1.  Se debe compilar la aplicación respectiva.
2.  Se actualiza el archivo central `projects.json`.
3.  Se ejecuta el script de compilación del catálogo:
    ```bash
    node scripts/build-portfolio.js
    ```
    Este script analiza la configuración de cada proyecto en `projects.json` e inyecta dinámicamente enlaces, títulos y descripciones en la landing corporativa general ubicada en la carpeta `dist/` para producción.
