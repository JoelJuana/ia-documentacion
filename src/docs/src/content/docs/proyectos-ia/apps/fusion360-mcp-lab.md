---
title: "fusion360-mcp-lab"
description: "Ficha técnica y documentación de la aplicación Autodesk Fusion 360 MCP Lab (fusion360-mcp-lab)."
---

*   **Ruta en repositorio**: `IA_Proyectos/apps/fusion360-mcp-lab/`
*   **Nombre Comercial**: Autodesk Fusion 360 MCP Lab
*   **Tipo**: `node`
*   **Creado el**: 2026-11-20
*   **Autor**: JoelJuana
*   **Etiquetas**: `IA`, `MCP`, `Fusion 360`, `CAD`, `3D`, `Node`, `Python`

---

# fusion360-mcp-lab

Hub y puente **Model Context Protocol (MCP)** de arquitectura híbrida para diseñar, parametrizar, inspeccionar visualmente y exportar piezas CAD 3D en **Autodesk Fusion (Fusion 360)** directamente desde **Antigravity**.

## Arquitectura de Doble Vía

El proyecto combina dos canales locales sobre loopback (`127.0.0.1`) gobernados desde un único servidor MCP `stdio` resiliente (Node.js ARM64 nativo), evitando errores de conexión cuando Autodesk Fusion está cerrado:

1. **Add-In `FusionAntigravityBridge` (`127.0.0.1:27183`)**:
   - Instalado automáticamente en `%APPDATA%\Autodesk\Autodesk Fusion 360\API\AddIns\FusionAntigravityBridge` con `runOnStartup: true`.
   - Despacha todas las operaciones al hilo principal de Fusion mediante `CustomEvent` oficial de `adsk.core` (100% thread-safe).
   - Permite ejecución directa de scripts Python (`adsk.core`, `adsk.fusion`), creación de primitivas en milímetros, gestión de `UserParameters`, capturas de viewport en alta resolución y exportación directa a **STEP, STL, 3MF, F3D, IGES y DXF**.
2. **Conector al Servidor MCP Oficial de Autodesk Fusion (`127.0.0.1:27182/mcp`)**:
   - Cliente Streamable HTTP JSON-RPC integrado (`fusion_native_mcp`) compatible con el servidor nativo de Autodesk (*Preferencias > General > API > Fusion MCP Server*).

## Estructura del Proyecto

- `src/server.ts`: Servidor MCP principal (`stdio`) con 11 herramientas especializadas.
- `fusion-addin/FusionAntigravityBridge/`: Código fuente maestro del complemento Python para Autodesk Fusion.
- `templates/`: Catálogo de plantillas paramétricas listas para fabricar (`caja_electronica`, `escuadra_montaje`, `brida_circular`, `bandeja_organizadora`).
- `workspace/scripts/`: Scripts Python paramétricos generados durante tus sesiones de diseño.
- `workspace/exports/`: Archivos `.stl`, `.step`, `.3mf`, `.f3d` y `.dxf` listos para impresión 3D o mecanizado CNC.
- `workspace/renders/`: Capturas `.png` ortogonales e isométricas del modelo 3D.
- `workspace/specs/`: Especificaciones funcionales y dimensionales de piezas.

## Comandos Rápidos

```bash
# Compilar TypeScript e instalar/sincronizar el Add-In en Autodesk Fusion
npm run build

# Ejecutar verificación integral del protocolo MCP
npm run test:mcp

# Re-sincronizar únicamente el Add-In en %APPDATA%
npm run sync:addin
```

## Herramientas MCP Expuestas

| Herramienta | Función principal |
| :--- | :--- |
| `fusion_status` | Verifica instalación de Fusion, proceso en ejecución, puente `27183` y MCP nativo `27182`. |
| `fusion_launch` | Arranca Autodesk Fusion localmente y espera a que el puente CAD esté listo. |
| `fusion_get_scene` | Lee cuerpos sólidos (dimensiones en `mm`, volúmenes), bocetos, `UserParameters` y salud del Timeline. |
| `fusion_new_design` | Crea un documento paramétrico limpio en milímetros. |
| `fusion_set_parameters` | Crea o actualiza `UserParameters` y recalcula el modelo 3D. |
| `fusion_create_primitive` | Modela cajas, cilindros y esferas en `mm` con booleanas (`NewBody`, `Join`, `Cut`, `Intersect`) y redondeos. |
| `fusion_execute_script` | Ejecuta scripts `adsk.core`/`adsk.fusion` con helpers en milímetros (`mm()`, `pt()`, `val()`). |
| `fusion_cad_templates` | Lista e instancia plantillas paramétricas completas en segundos. |
| `fusion_export_cad` | Exporta sólidos o bocetos a `STEP`, `STL`, `3MF`, `F3D`, `IGES` o `DXF` en `workspace/exports/`. |
| `fusion_capture_viewport` | Captura renders `.png` desde vistas `iso`, `front`, `top`, `right`, etc. en `workspace/renders/`. |
| `fusion_native_mcp` | Invoca las herramientas CRUD nativas (`Create`, `Read`, `Update`, `Delete`, `Execute`) del MCP oficial de Fusion. |


---

## Historial de Versiones del Proyecto

### [1.0.0] - 2026-11-20
- Creación del servidor MCP híbrido `fusion360-mcp-lab` en TypeScript/Node.js nativo ARM64 (`@modelcontextprotocol/sdk`).
- Desarrollo e instalación automática del complemento `FusionAntigravityBridge` (`runOnStartup: true`) para Autodesk Fusion sobre `127.0.0.1:27183` con despacho thread-safe mediante `CustomEvent`.
- Integración de cliente Streamable HTTP JSON-RPC hacia el servidor MCP oficial de Autodesk Fusion (`127.0.0.1:27182/mcp`).
- Incorporación de 4 plantillas paramétricas (`caja_electronica`, `escuadra_montaje`, `brida_circular`, `bandeja_organizadora`), sistema de capturas de viewport y exportación directa a `STEP`, `STL`, `3MF`, `F3D`, `IGES` y `DXF`.

