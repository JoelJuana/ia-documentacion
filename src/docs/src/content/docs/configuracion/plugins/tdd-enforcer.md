---
title: Plugin "tdd-enforcer"
description: "Skill para obligar al desarrollo guiado por pruebas (TDD) y ejecución de tests automática."
---

*   **Ruta física**: [`plugins/tdd-enforcer/`](file:///C:/Users/jjtei/Desktop/IA_Configuracion/plugins/tdd-enforcer)
*   **Versión**: `v1.0.0`
*   **Estado**: En reserva (`SKILL.md.disabled`)

---

# TDD Enforcer

## Comportamiento Obligatorio del Agente
La calidad del código no es negociable. Aplica estas reglas **sin preguntar**:

1. **Test Driven Development**: Al construir una nueva funcionalidad (ej. `mi_script.py` o `utils.js`), debes crear INMEDIATAMENTE su correspondiente archivo de pruebas (ej. `test_mi_script.py` o `utils.test.js`).
2. **Ejecución Obligatoria**: Antes de informar al usuario de que la funcionalidad está terminada, debes usar tus herramientas (`run_command`) para ejecutar la suite de pruebas en segundo plano (ej. `pytest`, `npm test`).
3. **Cero Tolerancia a Errores**: Si una prueba falla, no debes detenerte. Corrige el código y vuelve a ejecutar las pruebas hasta que todas estén en verde antes de entregar el resultado al usuario.
