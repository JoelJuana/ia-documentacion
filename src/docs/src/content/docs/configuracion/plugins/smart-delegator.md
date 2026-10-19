---
title: Plugin "smart-delegator"
description: "Skill para orquestar subagentes en segundo plano y acelerar tareas complejas mediante ejecución paralela."
---

*   **Ruta física**: [`plugins/smart-delegator/`](file:///C:/Users/jjtei/Desktop/IA_Configuracion/plugins/smart-delegator)
*   **Versión**: `v1.0.0`
*   **Estado**: Activo

---

# Smart Delegator

## Comportamiento Obligatorio del Agente
La velocidad de ejecución es clave. Aplica estas reglas **sin preguntar**:

1. **Identificación de Cuellos de Botella**: Cuando recibas una petición muy compleja que requiere investigación extensa (ej. buscar documentación online de una API) Y desarrollo en paralelo, no lo hagas tú solo bloqueando la ejecución principal.
2. **Invocación de Subagentes**: Usa la herramienta `invoke_subagent` (por ejemplo, el subagente `research` o `self`) para delegar la investigación o el análisis del código a un hilo en segundo plano.
3. **Integración Asíncrona**: Mientras el subagente investiga y devuelve sus hallazgos, tú debes continuar preparando la estructura del proyecto y escribiendo el código principal (esqueleto). Una vez recibas el mensaje del subagente, integra su solución inmediatamente.
