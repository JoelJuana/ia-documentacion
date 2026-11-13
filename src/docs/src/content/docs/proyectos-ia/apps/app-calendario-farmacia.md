---
title: "app-calendario-farmacia"
description: "Ficha técnica y documentación de la aplicación Calendario y Turnos de Farmacia (app-calendario-farmacia)."
---

*   **Ruta en repositorio**: `IA_Proyectos/apps/app-calendario-farmacia/`
*   **Nombre Comercial**: Calendario y Turnos de Farmacia
*   **Tipo**: `react`
*   **Creado el**: 2026-07-11
*   **Autor**: JoelJuana
*   **URL Pública**: [https://turnos-farmacia.gironacc.com](https://turnos-farmacia.gironacc.com)
*   **Etiquetas**: `Farmacia`, `React`, `Calendario`

---

# app-calendario-farmacia

Aplicación web interactiva (PWA) para la planificación anual de turnos de personal, rotaciones de sábados y festivos, permutas entre compañeras, control de guardias nocturnas y gestión de la bolsa de horas en **Farmacia Planas Morell**.

## Características y Funcionalidades (v1.2.0)

1. **Gestión Visual Multi-Año (2026 / 2027+)**: Vistas Mensual, Semanal continua (sin huecos en bordes de mes) y Timeline Diario (Gantt hora a hora).
2. **Permuta / Intercambio de Turnos en 1 clic**: Permite intercambiar turnos del mismo día o días cruzados (ej. sábados alternos) entre dos trabajadoras con vista previa instantánea.
3. **Turnos Personalizados Simples y Partidos**: Registro de bajas médicas, días libres recuperables y horarios personalizados de 1 o 2 tramos (mañana y tarde) aplicables por rango de fechas.
4. **Bolsa de Horas por Ejercicio**: Saldo neto aislado por año con variaciones automáticas del cuadrante, apuntes manuales directos (formación, inventario, compensaciones) y exportación CSV.
5. **Alertas Proactivas Inteligentes**: Detección automática de descubiertos por franja horaria (Mañana vs. Tarde), fatiga post-guardia nocturna y solapes de vacaciones dentro del mismo equipo.
6. **Doble Motor de Exportación PDF + iCalendar (.ics) + CSV**:
   - **PDF A4 Modo Impresión Claro**: 100% vectorial sobre fondo blanco (*Ink-Friendly*) para tablón físico.
   - **PDF Visual Oscuro**: Captura de alta resolución.
   - **Google / Apple Calendar (`.ics`)**: Estándar RFC 5545 con alarma previa.
7. **Modo Lectura con PIN de Administración y PWA**: Candado rápido contra ediciones accidentales e instalación directa en dispositivos móviles y tablets.
8. **Sincronización Cloud Exacta (Firebase Firestore)**: Persistencia en tiempo real con eliminaciones en lote (`batch.delete`), soporte multi-año de vacaciones y fallback offline en `localStorage`.

## Configuración

### Variables de Entorno

Copiar `.env.example` a `.env` y configurar las credenciales del proyecto Firebase:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_API_GATEWAY_URL=http://localhost:3000/api/fb
```

### Desarrollo y Compilación

```bash
npm install
npm run dev     # Inicia en http://localhost:5173
npm run lint    # Verifica calidad de código con ESLint
npm run build   # Genera el bundle optimizado en dist/
```


---

## Historial de Versiones del Proyecto

### [1.2.0] - 2026-11-10

#### Corrección de Bugs Críticos
- Fix: Eliminaciones reales en Firestore (`fbSincronizarExcepciones` con `batch.delete`) para evitar que bajas o excepciones borradas reaparezcan al recargar.
- Fix: Sincronización en la nube de vacaciones multi-año (`2026`, `2027` y sucesivos) mediante claves `semanas_${anio}` manteniendo retrocompatibilidad con 2026.
- Fix: Semanas a caballo entre dos meses/años (`generarCalendarioRango`) ya no muestran celdas vacías ni suman 0h en Vista Semanal y barra lateral.
- Fix: Filtrado estricto de semanas ISO (`getISOWeekInfo` y `getTotalWeeksInYear`) evitando cruces en días 1-3 de enero y 29-31 de diciembre.
- Fix: Bolsa de Horas aislada por ejercicio activo y conectada a los festivos configurados.

#### Nuevas Funcionalidades Operativas
- **Permuta / Intercambio de Turnos (`SwapShiftModal`)**: Intercambio en 1 clic entre dos trabajadoras (mismo día o días cruzados como sábados alternos) con vista previa instantánea.
- **Turnos Personalizados Partidos y por Rango (`ExceptionModal`)**: Soporte para 2 tramos horarios (mañana y tarde) y aplicación por rango de fechas con omisión opcional de domingos y festivos.
- **PDF A4 Modo Impresión Claro (`exportarCalendarioPDFImpresion`)**: Generación 100% vectorial sobre fondo blanco de bajo consumo de tinta para el tablón de la rebotica.
- **Apuntes Manuales y CSV en Bolsa de Horas**: Registro directo de horas de formación/inventario/compensaciones sincronizado en Firestore y botón de descarga CSV conectado.
- **Alertas Inteligentes por Franja Horaria y Equipos (`alertEngine`)**: Detección de mañanas o tardes descubiertas (0 personas), solape de vacaciones entre compañeras del mismo equipo y salto directo al día desde cada alerta.
- **Modo Lectura / Candado PIN Admin y PWA**: Bloqueo rápido contra toques accidentales con PIN opcional y manifiesto PWA instalable en móviles y tablets.

#### Arquitectura y Seguridad
- Credenciales de cliente Firebase movidas a variables de entorno (`VITE_FIREBASE_*` en `.env`).
- Refactorización integral de `App.jsx` integrando `useCalendarSync`, `ConfirmModal` (cero `alert()` / `window.confirm()` nativos) y modales modulares.

### [1.1.0] - 2026-08-04

#### Corrección de Bugs
- Fix: Bucles de iteración de fechas con problema DST (horario verano/invierno) — normalización a mediodía UTC.
- Fix: Validación de rango invertido (fecha inicio > fecha fin) muestra error al usuario.
- Fix: `guardarVacacionesSemanas` con try/catch protegido para evitar estados desincronizados con Firebase.
- Fix: Filtrado de guardias nocturnas por año activo — antes se contabilizaban guardias de otros años.
- Fix: Eliminación de código muerto (`añoForm` declarado pero nunca leído en el JSX).
- Fix: Reemplazo de `document.getElementById` por `useRef` para la captura de PDF.

#### Optimización de Rendimiento
- Importación dinámica de `jsPDF` y `html2canvas` — bundle principal reducido de 812 kB a 82 kB (-90%).
- Configuración de `manualChunks` en Vite: separación de `vendor-react` y `vendor-pdf`.
- Alias de rutas `@` → `./src` en configuración de Vite.

#### Nuevas Funcionalidades
- Badge de estado de sincronización en header (🟢 Sincronizado / 🟡 Modo Local).
- Exportación de calendario en formato CSV (separador `;` compatible con Excel España).
- Utilidad de exportación de bolsa de horas en CSV para gestión de nóminas y RRHH.
- Custom hook `useCalendarSync` para desacoplar la lógica de persistencia de `App.jsx`.
- Componente `ConfirmModal` reutilizable con estética glassmorphism.

### [1.0.0] - 2026-07-11
- Inicialización de estructura mediante la API de Scaffolding.

