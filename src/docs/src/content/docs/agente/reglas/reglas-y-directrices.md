---
title: Reglas Generales del Agente
description: Directrices, estándares obligatorios de codificación, seguridad y comportamiento para agentes de IA que operan en este monorepositorio.
template: doc
tableOfContents: true
---

:::tip[Sincronización Automática]
Las reglas globales y específicas de agentes se configuran centralizadamente en el repositorio [IA_Configuracion](file:///C:/Users/jjtei/Desktop/IA_Configuracion). Cualquier cambio se propaga de forma automática a los directorios `.agents/AGENTS.md` de **IA_Proyectos**, **IA_Infraestructura** e **IA_Documentacion** al ejecutar el script de desarrollo (`npm run dev` o `npm run build`).
:::

Este documento establece las reglas fundamentales que todo agente de IA debe seguir al trabajar en el monorepositorio **Proyectos IA** y en la máquina de desarrollo local. Estas normas garantizan la seguridad, mantenibilidad, consistencia de código y optimización de recursos.

---

# Reglas Globales del Agente

Estas directrices se aplican en **todos** los proyectos y conversaciones sin excepción.

## 1. Idioma
- Responde **siempre en español** en todas las conversaciones, incluyendo respuestas, reflexiones, planes, resúmenes y cualquier otro tipo de comunicación.
- No uses el inglés salvo que el usuario lo solicite explícitamente.

## 2. Estilo de Código
- Usa **nombres descriptivos** en variables y funciones.
- Prioriza la **legibilidad** sobre la brevedad.
- Añade comentarios solo cuando aporten valor explicativo, no cuando sean redundantes con el código.

## 3. Seguridad
- **Nunca** expongas claves de API, tokens o credenciales en el código fuente ni en los commits.
- Usa variables de entorno (`.env`) para almacenar datos sensibles.
- Añade siempre los archivos `.env` al `.gitignore` de cada proyecto.
- **Reserva de Puertos de Infraestructura**: Los puertos en el rango **3000 al 3799** están reservados exclusivamente para los microservicios locales de la suite de agentes en la máquina local (`IA_Infraestructura`). Evita asignar estos puertos a servidores de desarrollo o APIs de aplicaciones de negocio.
- **Gestión Autónoma del Ciclo de Vida**: Cuando operes en esta máquina, si requieres de algún microservicio local (puertos 3000-3799) y está apagado, **arráncalo automáticamente** en segundo plano. Al terminar tu labor, **es obligatorio apagar todos los servicios de infraestructura** de forma autónoma antes de entregar la respuesta final de cierre al usuario.
- **Limpieza de Archivos Temporales**: Antes de finalizar tu labor y entregar la respuesta de cierre al usuario, debes realizar una limpieza rápida eliminando cualquier script temporal o de prueba (como archivos `.ps1` creados en directorios `scratch/` o similares) que hayas generado durante la sesión, para mantener el disco libre de residuos.

## 4. Ecosistema de Infraestructura Local y API Gateway

La máquina local (`IA_Infraestructura`) cuenta con un conjunto de microservicios locales coordinados por un **API Gateway** central en el puerto **3000**.

### Reglas de Comunicación y Ciclo de Vida
1. **Comunicación Centralizada**: Todas las solicitudes a los microservicios locales deben dirigirse a través de las rutas del Gateway (`http://localhost:3000/api/<prefijo>`) en lugar de llamar directamente a los puertos internos de los servicios.
2. **Ciclo de Vida Automático**: Antes de consumir cualquier servicio, comprueba su estado usando la ruta de salud del Gateway (`http://localhost:3000/api/health`). Si está apagado, ejecuta de fondo el comando `npm run start --prefix "C:\Users\jjtei\Desktop\IA_Infraestructura"`. Al finalizar tu tarea, es **obligatorio** ejecutar `npm run stop --prefix "C:\Users\jjtei\Desktop\IA_Infraestructura"` para apagar todos los servicios de infraestructura.
3. **Despliegues Granulares e Individuales en Monorrepositorios**: En proyectos monorrepositorio (como `IA_Proyectos` / `business-plans`), cuando el usuario solicite un cambio o despliegue en un subproyecto o app específica (por ejemplo `app-bp-inversion-compra-piso`), **compila y despliega ÚNICAMENTE ese subproyecto/sitio de forma aislada**. Queda estrictamente prohibido ejecutar scripts de despliegue masivo como `deploy-all.js` o compilar todo el portafolio a menos que el usuario pida explícitamente un despliegue global de todos los proyectos.

### Catálogo de Servicios Disponibles
*   **API Gateway** (Puerto 3000): Dashboard principal (`/`) y salud general (`/api/health`).
*   **infra-github** (Ruta: `/api/git` | Puerto interno: 3100): Interfaz para interactuar con repositorios remotos y automatizaciones de GitPublish CMS.
*   **infra-firebase** (Ruta: `/api/fb` | Puerto interno: 3200): Inicialización, base de datos (Firestore CRUD/Queries), Auth y despliegue rápido en Firebase. ¡Debe priorizarse este servicio REST sobre la CLI local!
*   **infra-project-creator** (Ruta: `/api/proj` | Puerto interno: 3300): Interfaz web y backend para creación y borrado estructurado de nuevos proyectos.
*   **infra-domain-manager** (Ruta: `/api/dns` | Puerto interno: 3400): Validación de registros DNS y creación de subdominios CNAME mediante la API de Cloudflare.
*   **api-design-assets** (Ruta: `/api/design` | Puerto interno: 3500): Generación de paletas de colores premium, tipografías e inyección de plantillas HTML/CSS de mockup.
*   **api-conocimiento-rag** (Ruta: `/api/rag` | Puerto interno: 3600): Almacenamiento en memoria, fragmentación y búsqueda semántica de documentación local.
*   **api-utilidades-scraping** (Ruta: `/api/scrape` | Puerto interno: 3700): Extracción limpia de texto en formato markdown desde URLs web de forma no intrusiva.

## 5. Especificaciones de Hardware y Optimización
- La máquina local de desarrollo es un portátil **Lenovo con procesador Snapdragon X Elite (arquitectura Windows ARM64) y 32 GB de RAM**.
- Cuando los agentes operen en esta máquina, instalen dependencias (npm, pip, winget), ejecuten binarios o configuren entornos de desarrollo, **deben priorizar de forma absoluta la instalación de versiones nativas para ARM64**.
- Evita estrictamente la descarga o uso de software en versiones de 64 bits de Intel/AMD (x64) que fuercen la traducción por emulación (Prism), para prevenir sobrecalentamiento, consumo excesivo de CPU y cuelgues temporales en ejecuciones simultáneas.

## 6. Creación y Registro de Habilidades (Skills)
- Cuando crees o modifiques una habilidad (*skill*), debes asegurarse de colocar su especificación (`SKILL.md`) dentro de su respectiva subcarpeta en `C:/Users/jjtei/Desktop/IA_Configuracion/skills/<skill_name>/` para que sea versionada y sincronizada en el portal de documentación de Astro.
- Además, debes copiarla en el directorio activo del agente: `C:/Users/jjtei/.gemini/config/skills/<skill_name>/SKILL.md` para que la suite de agentes pueda utilizarla inmediatamente de forma local.
- Asegúrese de incluir el frontmatter obligatorio con `name` y `description` en el `SKILL.md` para evitar fallos de compilación e indexación en el RAG.

## 7. Modo Autónomo y Ejecución Proactiva ("Modo Turbo")
- **Autonomía total**: No solicites permisos, planes ni validaciones redundantes al usuario durante el flujo de trabajo. Procede solo y de forma resolutiva de principio a fin.
- **Acción directa**: Crea los archivos necesarios, compila, prueba, genera los entregables terminados y entrega el resultado final ya listo.
- **Valores y decisiones por defecto**: Si faltan datos secundarios o específicos, toma decisiones razonables por defecto (placeholders técnicos profesionales bien estructurados) y genera el documento o código completo directamente para que el usuario solo tenga que revisarlo o cambiar el texto.
- **Cero bloqueos**: No termines las respuestas con preguntas abiertas que frenen el avance. Entrega el trabajo hecho y muestra directamente el siguiente paso ya ejecutado o disponible.
