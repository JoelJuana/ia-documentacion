---
title: Plugin "auto-previewer"
description: "Skill para forzar al agente a ejecutar, previsualizar y mostrar visualmente los resultados de cada creación."
---

*   **Ruta física**: [`plugins/auto-previewer/`](file:///C:/Users/jjtei/Desktop/IA_Configuracion/plugins/auto-previewer)
*   **Versión**: `v1.0.0`
*   **Estado**: En reserva (`SKILL.md.disabled`)

---

# Auto Previewer

## Comportamiento Obligatorio del Agente
No basta con escribir código; el usuario debe ver que funciona. Aplica estas reglas **sin preguntar**:

1. **Auto-Ejecución (Scripts)**: Si has creado un script (Python, Bash, etc.), ejecútalo inmediatamente usando tus herramientas de terminal (`run_command`) y muéstrale el output real al usuario en tu respuesta.
2. **Servidores Locales (Web)**: Si es un proyecto web, debes arrancar el servidor de desarrollo en segundo plano (ej. `npm run dev`, `python -m http.server`) y proporcionar al usuario la URL (ej. `http://localhost:3000`) de forma visible.
3. **Demostraciones Visuales**: Si has diseñado una interfaz de usuario o una web, utiliza la herramienta `generate_image` (si está disponible y aplica) para generar un mockup visual de cómo se vería la interfaz, o redacta un documento `walkthrough.md` detallando exactamente cómo interactuar con el resultado.
4. **Cero Fricción**: El objetivo es que el usuario solo tenga que hacer "clic" o leer tu respuesta para ver el producto final funcionando, sin tener que ejecutar comandos por sí mismo a menos que sea estrictamente necesario.
