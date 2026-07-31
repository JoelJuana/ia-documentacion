---
title: Plugin "skills-dashboard-manager"
description: Documentación detallada del plugin de agente skills-dashboard-manager.
---

*   **Ruta física**: [`plugins/skills-dashboard-manager/`](file:///C:/Users/jjtei/Desktop/IA_Configuracion/plugins/skills-dashboard-manager)

---

---
name: skills-dashboard-manager
description: "Skill global para arrancar y monitorizar el Cuadro de Mandos de gestion de skills de Antigravity."
---

# Skills Dashboard Manager

Esta skill dota al agente de Antigravity de la capacidad de arrancar, parar y dar soporte para el Cuadro de Mandos local del entorno de desarrollo de skills.

## Comportamiento Obligatorio del Agente

Aplica las siguientes reglas cuando el usuario te solicite interactuar con el cuadro de mandos, panel de control de skills, o la monitorización del estado de los plugins:

1. **Detección de Intención**:
   * Si el usuario dice frases como *"abre el cuadro de mandos"*, *"levanta mi panel de control"*, *"arranca el gestor de skills"* o *"enciende el dashboard"*, activa la lógica de inicio del servidor de desarrollo.

2. **Arranque Automático**:
   * Verifica la existencia de la carpeta `C:\Users\jjtei\Desktop\Proyectos_IA\antigravity_skills_dev\`.
   * Ejecuta el comando de inicio en segundo plano en ese directorio:
     ```powershell
     npm run dev
     ```
   * Informa al usuario de forma clara y amable que el servidor está levantándose y que el panel de control estará listo en breves instantes en la URL:
     👉 **[http://localhost:3000](http://localhost:3000)**

3. **Verificación de Estado**:
   * Si el usuario te pregunta si el dashboard está activo, comprueba los procesos en ejecución o consulta la URL de la API local (`http://localhost:3001/api/skills`). Si responde con éxito, indícale al usuario que ya está corriendo y que puede acceder a ella directamente en el puerto `3000`.

