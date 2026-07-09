---
title: Reglas Generales del Agente
description: Directrices, estándares obligatorios de codificación, seguridad y comportamiento para agentes de IA que operan en este monorepositorio.
template: doc
tableOfContents: true
---

Este documento establece las reglas fundamentales que todo agente de IA debe seguir al trabajar en el monorepositorio **Proyectos IA** y en la máquina de desarrollo local. Estas normas garantizan la seguridad, mantenibilidad, consistencia de código y optimización de recursos.

---

## Directrices Obligatorias

### 1. Idioma de Comunicación y Código
*   **Responde siempre en español** en todas las conversaciones, razonamientos internos (thinking), resúmenes de commits, documentación, planes y cualquier otro tipo de comunicación.
*   El inglés solo se permite si el usuario lo solicita de forma explícita.

### 2. Estilo de Código
*   Usa **nombres descriptivos** para variables, funciones, módulos y clases. Prioriza la legibilidad del código antes que la brevedad.
*   Añade comentarios solo cuando aporten explicaciones valiosas sobre decisiones de diseño complejas o lógica no obvia. Evita comentarios redundantes que solo repitan lo que hace la propia línea de código.

### 3. Seguridad
*   **Nunca expongas claves de API, tokens o credenciales** en los archivos del código fuente ni en los commits.
*   Usa variables de entorno (`.env`) para almacenar datos sensibles.
*   Añade siempre los archivos `.env` al archivo `.gitignore` correspondiente de cada subproyecto.
*   **Reserva de Puertos de Infraestructura**: Los puertos en el rango **3000 al 3799** están reservados exclusivamente para los microservicios locales de la suite de agentes en la máquina local (`IA_Infraestructura`). Evita asignar estos puertos a servidores de desarrollo o APIs de aplicaciones de negocio.
*   **Gestión Autónoma del Ciclo de Vida**: Al operar en esta máquina, si requieres de algún microservicio local (puertos 3000-3799) y está apagado, **arráncalo automáticamente** en segundo plano. Al terminar tu labor, **es obligatorio apagar todos los servicios de infraestructura** de forma autónoma antes de entregar la respuesta final de cierre al usuario.
*   **Limpieza de Archivos Temporales**: Antes de finalizar tu labor y entregar la respuesta de cierre al usuario, debes realizar una limpieza rápida eliminando cualquier script temporal o de prueba (como archivos `.ps1` creados en directorios `scratch/` o similares) que hayas generado durante la sesión, para mantener el disco libre de residuos.

---

## Ecosistema de Infraestructura Local y API Gateway

La máquina local (`IA_Infraestructura`) cuenta con un conjunto de microservicios locales coordinados por un **API Gateway** central en el puerto **3000**.

### Reglas de Comunicación y Ciclo de Vida
1.  **Comunicación Centralizada**: Todas las solicitudes a los microservicios locales deben dirigirse a través de las rutas del Gateway (`http://localhost:3000/api/<prefijo>`) en lugar de llamar directamente a los puertos internos de los servicios.
2.  **Ciclo de Vida Automático**: Antes de consumir cualquier servicio, comprueba su estado usando la ruta de salud del Gateway (`http://localhost:3000/api/health`). Si está apagado, ejecuta de fondo el comando `npm run start --prefix "C:\Users\jjtei\Desktop\IA_Infraestructura"`. Al finalizar tu tarea, es **obligatorio** ejecutar `npm run stop --prefix "C:\Users\jjtei\Desktop\IA_Infraestructura"` para apagar todos los servicios de infraestructura.

### Catálogo de Servicios Disponibles
*   **API Gateway** (Puerto 3000): Dashboard principal (`/`) y salud general (`/api/health`).
*   **infra-github** (Ruta: `/api/git` | Puerto interno: 3100): Interfaz para interactuar con repositorios remotos y automatizaciones de GitPublish CMS.
*   **infra-firebase** (Ruta: `/api/fb` | Puerto interno: 3200): Inicialización, base de datos (Firestore CRUD/Queries), Auth y despliegue rápido en Firebase. ¡Debe priorizarse este servicio REST sobre la CLI local!
*   **infra-project-creator** (Ruta: `/api/proj` | Puerto interno: 3300): Interfaz web y backend para creación y borrado estructurado de nuevos proyectos.
*   **infra-domain-manager** (Ruta: `/api/dns` | Puerto interno: 3400): Validación de registros DNS y creación de subdominios CNAME mediante la API de Cloudflare.
*   **api-design-assets** (Ruta: `/api/design` | Puerto interno: 3500): Generación de paletas de colores premium, tipografías e inyección de plantillas HTML/CSS de mockup.
*   **api-conocimiento-rag** (Ruta: `/api/rag` | Puerto interno: 3600): Almacenamiento en memoria, fragmentación y búsqueda semántica de documentación local.
*   **api-utilidades-scraping** (Ruta: `/api/scrape` | Puerto interno: 3700): Extracción limpia de texto en formato markdown desde URLs web de forma no intrusiva.

---

## Especificaciones de Hardware y Optimización

*   La máquina local de desarrollo es un portátil **Lenovo con procesador Snapdragon X Elite (arquitectura Windows ARM64) y 32 GB de RAM**.
*   Al operar en esta máquina e instalar dependencias (`npm`, `pip`, `winget`), ejecutar binarios o configurar entornos de desarrollo, **se debe priorizar de forma absoluta la instalación de versiones nativas para ARM64**.
*   Evita estrictamente la descarga o uso de software en versiones de 64 bits de Intel/AMD (x64) que fuercen la traducción por emulación (Prism), para prevenir sobrecalentamiento, consumo excesivo de CPU y cuelgues temporales en ejecuciones simultáneas.

---

## Flujo de Trabajo del Desarrollo

Cada vez que recibas una tarea o un ticket de desarrollo, debes ejecutar las siguientes fases estructuradas:

1.  **Investigación**: Inspecciona la estructura actual de los directorios afectados y comprende sus dependencias antes de realizar cambios.
2.  **Plan de Implementación**: Si el cambio es complejo, elabora un plan en `implementation_plan.md` y obtén la aprobación explícita del usuario.
3.  **Ejecución**: Aplica los cambios de forma limpia. Prefiere `multi_replace_file_content` para editar múltiples líneas de forma no contigua.
4.  **Verificación**: Compila el proyecto en local (`npm run build` o equivalente) para asegurar que no hay errores de sintaxis o linteo.
5.  **Cierre**: Registra los nuevos proyectos en [projects.json](file:///c:/Users/jjtei/Desktop/Proyectos_IA/projects.json), actualiza el portafolio y sincroniza con Git.
