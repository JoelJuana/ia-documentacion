---
title: gestiona_fusion360
description: "Diseña, parametriza, inspecciona visualmente y exporta piezas CAD 3D (STEP, STL, 3MF, F3D, DXF) en Autodesk Fusion mediante el servidor MCP local fusion360-mcp-lab."
---

*   **Ruta de Configuración**: `IA_Configuracion/skills/gestiona_fusion360/SKILL.md`

---

# Habilidad: gestiona_fusion360

Esta habilidad permite al agente controlar **Autodesk Fusion (Fusion 360)** en tiempo real mediante el servidor MCP local `fusion360` (`C:/Users/jjtei/Desktop/IA_Proyectos/apps/fusion360-mcp-lab/dist/server.js`).

## Arquitectura Operativa

El servidor MCP `fusion360` opera por `stdio` y gestiona dos canales complementarios sobre loopback:

1. **Canal Principal — Add-In `FusionAntigravityBridge` (`http://127.0.0.1:27183`)**:
   - Preinstalado con arranque automático (`runOnStartup: true`) en `%APPDATA%\Autodesk\Autodesk Fusion 360\API\AddIns\FusionAntigravityBridge`.
   - Ejecuta llamadas de la API `adsk.core` y `adsk.fusion` de forma segura en el hilo principal mediante `CustomEvent`.
2. **Canal Secundario — Servidor MCP Oficial de Autodesk (`http://127.0.0.1:27182/mcp`)**:
   - Accesible mediante `fusion_native_mcp` cuando el usuario activa *Preferencias > General > API > Fusion MCP Server* dentro de Autodesk Fusion.

## Flujo de Trabajo Recomendado para Diseño CAD

1. **Verificación y Arranque**:
   - Ejecuta `fusion_status` al comenzar una tarea CAD.
   - Si `fusionProcessRunning` es `false`, invoca `fusion_launch` para iniciar Autodesk Fusion y esperar a que el puente esté en línea.
2. **Parametrización Explícita**:
   - Antes de construir geometría compleja, registra las cotas clave con `fusion_set_parameters` (`UserParameters`) para que el usuario pueda ajustar medidas posteriormente desde *Modificar > Cambiar parámetros* en la interfaz de Fusion.
3. **Regla Crítica de Unidades en Scripts (`adsk.fusion`)**:
   - Internamente, la API Python de Autodesk Fusion trabaja **siempre en centímetros (`cm`)** (`1.0 == 10 mm`) para `Point3D.create` y `ValueInput.createByReal`.
   - En `fusion_execute_script`, utiliza siempre los helpers preinyectados `mm(valor_mm)`, `pt(x_mm, y_mm, z_mm)` y `val("25 mm")` para expresar todas las cotas en milímetros sin errores de escala 10x.
   - En bocetos sobre el plano `XZ`, utiliza `sketch.modelToSketchSpace(pt(x, y, z))` para evitar inversiones de signo en el eje `Z`.
4. **Auditoría Geométrica y Visual (QA CAD)**:
   - Tras ejecutar operaciones, llama a `fusion_get_scene` y verifica que todos los elementos de `timeline` tengan `health: "healthy"` y que `boundingBox_mm.size` coincida con las dimensiones objetivo.
   - Ejecuta `fusion_capture_viewport` (vistas `iso`, `front`, `top`) y revisa la imagen generada en `workspace/renders/` mediante `read_file` para validar visualmente taladros, vaciados y chaflanes.
5. **Exportación para Fabricación**:
   - Usa `fusion_export_cad` para generar entregables listos en `C:/Users/jjtei/Desktop/IA_Proyectos/apps/fusion360-mcp-lab/workspace/exports/`:
     - Impresión 3D (Bambu Studio / OrcaSlicer / PrusaSlicer): `stl` (`refinement: "high"`) o `3mf`.
     - Intercambio mecánico / CNC: `step` o `f3d`.
     - Corte láser / fresado 2D: `dxf` indicando el nombre del boceto en `targetName`.
