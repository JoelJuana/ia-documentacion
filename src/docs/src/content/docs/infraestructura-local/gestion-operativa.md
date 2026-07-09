---
title: Infraestructura - Gestión y Operación de Servicios
description: Procedimiento paso a paso para arrancar, detener y monitorear el estado de la infraestructura local en PM2 o Standalone.
---

La suite de infraestructura cuenta con herramientas para el arranque ordenado, apagado controlado y monitoreo en segundo plano de todos los microservicios locales.

---

## Modos de Ejecución y Arranque

Los servicios pueden iniciarse en dos modalidades de acuerdo con tus necesidades de desarrollo:

### Modo Standalone (Recomendado para pruebas rápidas)
Utiliza el runner unificado en Node.js para lanzar todos los procesos en background de forma nativa:

1.  Abre una terminal en el directorio de la infraestructura:
    ```bash
    cd c:\Users\jjtei\Desktop\IA_Infraestructura
    ```
2.  Arranca todos los servicios en bloque:
    ```bash
    npm run start
    ```
3.  Detén de forma limpia todos los servicios al terminar tu jornada:
    ```bash
    npm run stop
    ```

### Modo PM2 (Recomendado para ejecución persistente)
Si deseas que los servicios se mantengan levantados indefinidamente y se reinicien automáticamente ante cualquier fallo:

```bash
# Arrancar el ecosistema bajo el orquestador de procesos PM2
npm run pm2:start

# Detener los servicios en PM2
npm run pm2:stop
```

---

## Monitoreo de Estado

### 1. Panel de Control Web (Dashboard)
Al levantar la infraestructura, puedes acceder directamente a la interfaz web de observabilidad desde tu navegador:
👉 **[http://localhost:3000](http://localhost:3000)**

Desde este panel puedes:
*   Ver el estado de salud (saludable/degradado/desconectado).
*   Visualizar si hay archivos `.env` faltantes.
*   Consultar las últimas 250 líneas de logs en tiempo real de cada microservicio.
*   Arrancar o apagar servicios individuales.

### 2. Comandos de Consola
También puedes consultar el estado de red directamente desde la consola:

*   **Standalone**:
    ```bash
    npm run status    # Muestra si los puertos de red están abiertos
    npm run health    # Test de salud HTTP del Gateway
    ```
*   **PM2**:
    ```bash
    npm run pm2:status  # Equivale a "pm2 list"
    npm run pm2:logs    # Equivale a "pm2 logs"
    ```
