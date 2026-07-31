---
title: Introducción a las Habilidades (Skills)
description: Guía de introducción técnica al catálogo de habilidades (skills) de la suite de agentes del monorepositorio.
template: doc
sidebar:
  order: 1
---

Las **Skills** (habilidades) son extensiones de automatización personalizadas que se configuran y mantienen de forma centralizada en el repositorio de [IA_Configuracion](file:///c:/Users/jjtei/Desktop/IA_Configuracion/skills).

Al arrancar el entorno de desarrollo o compilar el portal, estas habilidades se sincronizan y actualizan automáticamente en las carpetas de proyectos y microservicios locales (`IA_Proyectos`, `IA_Infraestructura` e `IA_Documentacion`).

Permiten al agente interactuar con servicios locales y externos de forma autónoma basándose en disparadores de lenguaje natural.

---

## Catálogo de Habilidades Activas

Selecciona una de las habilidades en la barra lateral o a través de las siguientes tarjetas para consultar su propósito y manual de instrucciones detallado:

<div class="dashboard-grid">
  <a href="/agente/skills/crea_proyecto/" class="dashboard-card">
    <h3>crea_proyecto</h3>
    <p>Lanza la interfaz web de Project Creator para crear un nuevo proyecto. Úsalo cuando el usuario diga "crea proyecto", "crear proyecto", "nuevo proyecto", "quiero crear un proyecto" o expresiones similares.</p>
  </a>
  <a href="/agente/skills/gestiona_conocimiento/" class="dashboard-card">
    <h3>gestiona_conocimiento</h3>
    <p>Indexa documentación y consulta la base de conocimiento local (RAG) para recuperar pasajes relevantes en tareas de investigación o soporte. Úsalo cuando necesites procesar o buscar en documentación extensa, manuales de API o código fuente del proyecto a través de la ruta /api/rag del Gateway.</p>
  </a>
  <a href="/agente/skills/gestiona_diseno/" class="dashboard-card">
    <h3>gestiona_diseno</h3>
    <p>Recupera recursos de diseño (paletas de colores, combinaciones tipográficas Google Fonts y plantillas HTML/CSS de mockups) para interfaces de usuario premium. Úsalo cuando crees o mejores aplicaciones web para dotarlas de una estética visual profesional a través de la ruta /api/design del Gateway.</p>
  </a>
  <a href="/agente/skills/gestiona_documentacion/" class="dashboard-card">
    <h3>gestiona_documentacion</h3>
    <p>Redacta, estructura, maqueta y valida documentación técnica y de procedimientos en portales Astro Starlight del monorepositorio bajo el estándar Diátaxis y el estándar corporativo sin emojis.</p>
  </a>
  <a href="/agente/skills/gestiona_dominios/" class="dashboard-card">
    <h3>gestiona_dominios</h3>
    <p>Inicia el servidor de Gestión Dominios y automatiza la validación de dominios y creación de subdominios CNAME. Úsalo cuando el usuario pida comprobar la disponibilidad de un dominio, crear registros DNS CNAME, levantar el agente de Gestión Dominios o frases similares.</p>
  </a>
  <a href="/agente/skills/gestiona_fierbase/" class="dashboard-card">
    <h3>gestiona_fierbase</h3>
    <p>Inicializa proyectos de Firebase y gestiona sus servicios (Firestore, Auth, Hosting) de forma centralizada utilizando la API REST local del microservicio infra-firebase. Úsalo cuando el usuario solicite base de datos Firestore, autenticación o despliegues de Firebase, asegurando que todas las peticiones pasen por el Gateway de infraestructura.</p>
  </a>
  <a href="/agente/skills/gestiona_github/" class="dashboard-card">
    <h3>gestiona_github</h3>
    <p>Sin descripción detallada.</p>
  </a>
  <a href="/agente/skills/gestiona_infraestructura/" class="dashboard-card">
    <h3>gestiona_infraestructura</h3>
    <p>Arranca, detiene y verifica el estado de todos los microservicios de infraestructura local (Gateway, GitHub, Firebase, Project Creator, Domain Manager, Design Assets, RAG, Scraping). Úsalo cuando el usuario diga "arranca infra", "activa infraestructura", "levanta los servicios", "para infra", "detén servicios", "estado de infra", "health check" o expresiones similares.</p>
  </a>
  <a href="/agente/skills/gestiona_scraping/" class="dashboard-card">
    <h3>gestiona_scraping</h3>
    <p>Extrae texto limpio y estructurado en formato Markdown de cualquier página web pública para análisis, documentación o alimentación de RAG. Úsalo cuando necesites consultar una URL, leer un artículo o descargar información técnica web a través del endpoint /api/scrape del Gateway.</p>
  </a>
  <a href="/agente/skills/gestiona_workspace/" class="dashboard-card">
    <h3>gestiona_workspace</h3>
    <p>Habilidad para interactuar con los servicios de Google Workspace (Drive, Sheets, Calendar y Apps Script) mediante el servidor MCP local para gestionar y automatizar tareas de oficina.</p>
  </a>
</div>
