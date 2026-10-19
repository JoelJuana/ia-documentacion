---
title: "app-calendario-farmacia"
description: "Ficha técnica y documentación de la aplicación app-calendario-farmacia."
---

*   **Ruta física**: [`apps/app-calendario-farmacia/`](file:///C:/Users/jjtei/Desktop/IA_Proyectos/apps/app-calendario-farmacia)
*   **Tipo**: `react`
*   **Creado el**: 2026-07-11
*   **Autor**: JoelJuana
*   **URL Pública**: [https://turnos-farmacia.gironacc.com](https://turnos-farmacia.gironacc.com)
*   **Etiquetas**: `Farmacia`, `React`, `Calendario`

---

# app-calendario-farmacia

Aplicación web interactiva para la planificación de turnos de personal, control de guardias y gestión del calendario de trabajo en oficinas de farmacia.

## Características y Funcionalidades

1. **Gestión de Turnos Visual**: Calendario interactivo con codificación por colores para una fácil lectura de las asignaciones de mañana, tarde y guardias nocturnas.
2. **Control de Restricciones**: Reglas automáticas para evitar asignaciones conflictivas y asegurar que se cumplan las horas de descanso normativas del personal.
3. **Control de Guardias**: Planificación específica de las guardias oficiales asignadas a la farmacia en el calendario de turnos anual.
4. **Timeline Diario (Gantt)**: Vista gráfica hora a hora de la ocupación de cada empleada para control de cobertura.
5. **Bolsa de Horas**: Dashboard con el saldo acumulado de horas a favor/en contra por empleada con historial de movimientos.
6. **Panel de Estadísticas**: KPIs de cómputo anual, guardias nocturnas, festivos, bajas y semanas de vacaciones por empleada.
7. **Exportación PDF y CSV**: Descarga del calendario mensual en PDF de alta resolución y exportación de datos en CSV compatible con Excel.
8. **Sincronización Firebase**: Persistencia en la nube con fallback automático a almacenamiento local (offline-first).
9. **Badge de Estado**: Indicador visual en tiempo real del estado de conexión con el backend (🟢 Sincronizado / 🟡 Modo Local).

## Stack Tecnológico

- **Biblioteca principal**: React.js 18
- **Herramienta de compilación (Bundler)**: Vite 5
- **Estilos**: CSS Custom (Dark Mode, Glassmorphism)
- **Exportación**: jsPDF + html2canvas (carga dinámica) / CSV nativo
- **Backend**: Firebase Firestore via API Gateway local
- **Diseño**: Componentes responsive adaptados para visualización en tabletas en el mostrador.

## Configuración

### Variables de Entorno

Copiar `.env.example` a `.env` y configurar:

```env
VITE_API_GATEWAY_URL=http://localhost:3000/api/fb
```

### Desarrollo

```bash
npm install
npm run dev     # Inicia en http://localhost:5173
```

### Producción

```bash
npm run build   # Genera la carpeta dist/
npm run preview # Previsualiza la build de producción
```

