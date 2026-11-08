---
title: "app-comunidad-paradas"
description: "Ficha técnica y documentación de la aplicación app-comunidad-paradas."
---

*   **Ruta física**: [`apps/app-comunidad-paradas/`](file:///C:/Users/jjtei/Desktop/IA_Proyectos/apps/app-comunidad-paradas)
*   **Tipo**: `react`
*   **Creado el**: 2026-06-28
*   **Autor**: JoelJuana
*   **URL Pública**: [https://paradas.gironacc.com](https://paradas.gironacc.com)
*   **Etiquetas**: `Comunidad`, `Paradas`, `React`, `Finanzas`

---

# app-comunidad-paradas

Panel de administración, contabilidad y gestión integral para la Comunidad de Propietarios Paradas (Mercat de la Devesa, Girona).

## Características y Funcionalidades

1. **Dashboard Financiero**: Visión en tiempo real de saldos bancarios, fondo de reserva, ingresos por cuotas y gastos operativos de la comunidad.
2. **Gestión de Recibos y Cuotas**: Control de emisión de cuotas ordinarias y derramas extraordinarias por parada comercial, con seguimiento de morosidad.
3. **Liquidación y Presupuesto Anual**: Generación automatizada del cierre de ejercicio y propuesta de presupuesto por coeficientes de participación.
4. **Actas y Documentación**: Archivo digital de convocatorias, actas de juntas ordinarias/extraordinarias y contratos de mantenimiento.
5. **Sincronización Cloud**: Persistencia en Firebase Firestore con soporte offline-first para consulta y edición rápida.

## Stack Tecnológico

- **Frontend**: React 18 + Vite
- **Estilos**: CSS Custom (Tema corporativo de alta legibilidad)
- **Backend / Persistencia**: Firebase Firestore (`infra-firebase` vía API Gateway)
- **Despliegue**: Firebase Hosting → `paradas.gironacc.com`

