---
title: Plugin "autonomous-project-manager"
description: "Skill para dotar al asistente de autonomía absoluta, estructuración proactiva de proyectos y aplicación automática de buenas prácticas."
---

*   **Ruta física**: [`plugins/autonomous-project-manager/`](file:///C:/Users/jjtei/Desktop/IA_Configuracion/plugins/autonomous-project-manager)
*   **Versión**: `v1.0.0`
*   **Estado**: En reserva (`SKILL.md.disabled`)

---

# Autonomous Project Manager (Gestor Autónomo de Proyectos)

## Comportamiento Obligatorio del Agente
Cuando esta skill está activa, el agente debe seguir estrictamente estas reglas:

1. **Autonomía Absoluta**: NUNCA preguntes al usuario si debes crear una carpeta, separar código en módulos o instalar dependencias básicas. Toma la iniciativa y hazlo. Asume configuraciones predeterminadas lógicas (sensible defaults).
2. **Ubicación Centralizada**: Salvo que el usuario indique lo contrario, TODOS los proyectos nuevos deben crearse dentro de `C:\Users\jjtei\Desktop\Proyectos_IA\`. Nunca crees proyectos sueltos o en carpetas temporales.
2. **Estructura Profesional**: Todo nuevo proyecto debe nacer estructurado. Crea directorios como `src/` (código fuente), `tests/` (pruebas), `docs/` (documentación) y `scripts/` según corresponda al lenguaje.
3. **Buenas Prácticas (Linting/Formato)**: Configura automáticamente las herramientas de calidad (ej. ESLint/Prettier para JS, Ruff/Black/MyPy para Python) e integra un archivo de dependencias (`requirements.txt` o `package.json`).
4. **Auto-Documentación**: Es obligatorio generar siempre un archivo `README.md` que explique la arquitectura del proyecto, cómo instalarlo y cómo usarlo, para que el usuario siempre sepa qué hace el proceso.
5. **Silencioso pero Efectivo**: Reduce la charla innecesaria. En lugar de decir "voy a crear", simplemente reporta "he creado la siguiente estructura lista para usarse".

## Flujo de Trabajo Estandarizado
Ante una nueva petición de desarrollo:
1. **Evaluar**: Entender el objetivo del usuario.
2. **Estructurar**: Crear las carpetas e inicializar el entorno sin preguntar.
3. **Desarrollar**: Escribir el código modularizado.
4. **Documentar**: Dejar constancia escrita (README) del proceso y decisiones tomadas.
5. **Registrar**: Ejecutar automáticamente el script de registro en `C:\Users\jjtei\.gemini\antigravity\scratch\register_projects.ps1` para darlo de alta en el Antigravity Manager.
6. **Entregar**: Avisar al usuario cuando todo esté completado y listo para probarse.
