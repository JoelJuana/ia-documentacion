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

```text
IA_Proyectos/
├── .agents/                                  # Reglas específicas del workspace de proyectos
│   └── AGENTS.md                             # Sincronizado automáticamente desde IA_Configuracion
├── apps/                                     # Subproyectos individuales (Web Apps, Portales y Simuladores)
│   ├── app-calendario-farmacia/              # Planificador de turnos y guardias de farmacia (React)
│   ├── app-comunidad-paradas/                # Panel de gestión Comunidad Mercat de la Devesa (React)
│   ├── app-notebook-studio/                  # Entorno interactivo de cuadernos digitales IA (React)
│   ├── documentacion-farmacia/               # Portal de PNT y protocolos de farmacia (Astro Starlight)
│   ├── workspace-skill-lab/                  # Servidor MCP local para Google Workspace (Node/TS)
│   └── business-plans/                       # Suite integrada de 6 simuladores financieros (Vanilla + Vite)
│       ├── app-bp-caravanas/                 # Custodia y alquiler de caravanas en naves industriales
│       ├── app-bp-compra-farmacia/           # Compraventa de Oficina de Farmacia (Comprador vs Vendedor)
│       ├── app-bp-cuidadora-abuela/          # Planificación familiar y costes de cuidados asistenciales
│       ├── app-bp-inversion-compra-piso/     # Viabilidad financiera y fiscal de inversión en vivienda
│       ├── app-bp-ramon-turro/               # Rehabilitación y explotación hotelera a 25 años (Girona)
│       └── app-bp-velero/                    # Inversión, chárter y amortización de embarcaciones
├── dist/                                     # Catálogo web unificado compilado para producción
├── docs/                                     # Documentación corporativa y Estudio Editorial A4
│   └── editorial/                            # Centro Editorial y Visor Documental A4 (PDF + DOCX)
│       ├── _reglas/                          # Reglas modulares de paginación A4 y estilo por ámbito
│       ├── _plantillas/                      # Presets maestros (oca_global, actas_comunidad, dossier_financiero, seat_124_taller)
│       ├── OCA Global/                       # Informes técnicos, auditorías y due diligence corporativa
│       ├── CP Mercat Devesa/                 # Actas de junta, estatutos y reglamentos comunitarios
│       ├── Finanzas_y_Dossiers/              # Dossiers ejecutivos bancarios A4 vinculados a Business Plans
│       └── SEAT 124 FL - Instalacion Electrica/ # Manual eléctrico de taller y esquemas técnicos
├── scripts/                                  # Scripts de orquestación y compilación del portafolio
│   └── build-portfolio.js                    # Genera el portafolio estático dinámico en dist/
├── firebase.json                             # Configuración de Firebase Hosting Multisite
├── projects.json                             # Inventario centralizado de los 13 proyectos activos
└── package.json                              # Scripts y configuración raíz del monorepositorio
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
