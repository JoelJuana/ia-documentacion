---
title: Primeros Pasos en el Ecosistema
description: Tutorial de inicio práctico para desarrolladores y agentes de IA en el ecosistema local.
sidebar:
  order: 1
---

¡Bienvenido al **Ecosistema de IA**! Este tutorial práctico está diseñado para que tanto desarrolladores humanos como agentes autónomos de IA aprendan a configurar, arrancar e interactuar con la infraestructura local de microservicios y el portal de documentación en menos de 10 minutos.

Al finalizar este tutorial habrás:
1. Arrancado los servicios locales de la suite de IA a través del API Gateway.
2. Comprobado el estado de salud de la infraestructura local.
3. Generado e indexado documentación RAG en tiempo real.

---

## Prerrequisitos

Antes de comenzar, asegúrate de cumplir con los siguientes requisitos en tu máquina local:
*   Disponer de un entorno Node.js activo.
*   Tener el monorepositorio `IA_Documentacion` y la carpeta `IA_Infraestructura` clonados en las siguientes rutas físicas:
    *   `C:/Users/jjtei/Desktop/IA_Documentacion/`
    *   `C:/Users/jjtei/Desktop/IA_Infraestructura/`

---

## Paso 1: Arrancar la Infraestructura de Microservicios

El ecosistema local está coordinado por un **API Gateway** central en el puerto **3000**. El gateway enruta las peticiones HTTP internas a los servicios core y utilidades.

1.  Abre una terminal de PowerShell.
2.  Ejecuta el comando para levantar el entorno completo en segundo plano:
    ```powershell
    npm run start --prefix "C:\Users\jjtei\Desktop\IA_Infraestructura"
    ```
3.  El gateway y todos los microservicios asociados se inicializarán secuencialmente.

---

## Paso 2: Verificar la Salud del Entorno

Una vez que el gateway ha arrancado, puedes confirmar de forma centralizada la salud de cada servicio haciendo una petición al endpoint unificado:

1.  Realiza una consulta a través de tu navegador o mediante `curl` en la consola:
    ```bash
    curl http://localhost:3000/api/health
    ```
2.  Deberías recibir un JSON con el estado de los servicios core (RAG, Firebase, GitHub, Domain Manager, etc.).
3.  Alternativamente, puedes entrar a la interfaz visual del Dashboard en:
    ```
    http://localhost:3000/
    ```

---

## Paso 3: Lanzar el Portal de Documentación

Con la infraestructura activa, ahora levantaremos el portal local de documentación técnica (Astro Starlight) para visualizar las fichas del catálogo y las reglas del agente en tiempo real.

1.  Abre otra terminal y navega al directorio del portal:
    ```powershell
    cd C:\Users\jjtei\Desktop\IA_Documentacion\src\docs
    ```
2.  Instala las dependencias si es la primera vez que entras:
    ```bash
    npm install
    ```
3.  Lanza el servidor de desarrollo con sincronización continua automática:
    ```bash
    npm run dev
    ```
4.  Abre tu navegador en [http://localhost:4321/](http://localhost:4321/). ¡Verás el portal interactivo de documentación en marcha!

---

## Paso 4: Probar la Sincronización en Caliente (Hot Reload)

Hagamos una prueba práctica del modo Watch implementado en el portal:

1.  Ve al directorio central de configuración: `C:\Users\jjtei\Desktop\IA_Configuracion\skills\`.
2.  Crea o edita un archivo `SKILL.md` bajo cualquier subdirectorio de skill.
3.  Observa la consola donde corre `npm run dev`: verás un log del tipo `[Watch] Cambio detectado...`.
4.  Refresca el portal de documentación de Starlight en tu navegador en la sección de Skills y confirma que el cambio se ha propagado de inmediato.

---

## Paso 5: Apagar la Infraestructura al Terminar

De acuerdo con las reglas de comportamiento del ecosistema, **es obligatorio liberar los puertos de infraestructura core** cuando termines tus tareas de desarrollo:

1.  En la terminal de PowerShell, ejecuta el comando de apagado seguro:
    ```powershell
    npm run stop --prefix "C:\Users\jjtei\Desktop\IA_Infraestructura"
    ```
2.  Esto cerrará los microservicios locales y liberará el rango de puertos del 3000 al 3799.

¡Felicidades! Has completado el tutorial básico de operaciones del ecosistema. Sigue con la sección de **Guías de Tareas** para aprender a realizar flujos específicos.
