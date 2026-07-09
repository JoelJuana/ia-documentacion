---
title: Proyecto - API Administrador Comunidad Paradas
description: Ficha técnica detallada de la API REST modular para la gestión de alquileres y parcelas.
---

Esta es la API REST modular de la suite de proyectos, diseñada específicamente para gestionar el alquiler y la administración de parcelas y paradas comunitarias.

---

## Ficha de Identificación

*   **Nombre de Carpeta**: `api-administrador-comunidad-paradas`
*   **Ruta en el Monorepositorio**: [\`apps/api-administrador-comunidad-paradas/\`](file:///c:/Users/jjtei/Desktop/Proyectos_IA/apps/api-administrador-comunidad-paradas)
*   **Tipo**: Backend / API REST
*   **Tecnologías Clave**: Node.js, Express, JavaScript, CORS.
*   **Autor**: JoelJuana
*   **Fecha de Creación**: 2026-06-28

---

## Arquitectura del Servicio

El servicio está estructurado como una API backend minimalista de alto rendimiento organizada en módulos:

```
api-administrador-comunidad-paradas/
├── src/
│   ├── config/       # Variables de entorno y configuración
│   ├── controllers/  # Controladores de negocio y manejo de peticiones
│   ├── routes/       # Definición de rutas Express
│   └── app.js        # Inicialización de la aplicación Express
├── package.json      # Dependencias y scripts de ejecución
└── server.js         # Entrada principal que levanta el puerto HTTP
```

### Características Principales
*   **Controladores Modulares**: Lógica de negocio totalmente aislada de las rutas para simplificar las pruebas unitarias y el linteo.
*   **Manejo de CORS**: Configurado para recibir solicitudes seguras exclusivamente de los frontends autorizados en el monorepositorio.
*   **Arquitectura REST**: Rutas estructuradas semánticamente para el CRUD completo de parcelas, estados de cobro y registros de inquilinos.

---

## Puesta en Marcha

Para arrancar el servidor de la API localmente en desarrollo:

```bash
cd apps/api-administrador-comunidad-paradas
npm install
npm run dev
```

El servidor arranca habitualmente en el puerto `5000` (o el puerto configurado en las variables de entorno) y expone sus endpoints en `http://localhost:5000/api/`.
