---
title: Construir un Simulador Business Plan desde Cero
description: Tutorial práctico paso a paso para crear un simulador financiero interactivo conectado a bp-core.js, auditar sus métricas bancarias y publicarlo en Firebase Multisite.
sidebar:
  order: 2
---

En este tutorial práctico construirás de principio a fin un simulador financiero perteneciente a la [Suite Business Plans](/proyectos-ia/business-plans/introduccion/). Aprenderás a estructurar el subproyecto, integrar la persistencia híbrida de `bp-core.js`, separar correctamente la cuenta de resultados del flujo de caja y publicar únicamente ese canal en producción.

Al terminar este recorrido habrás:
1. Inicializado un subproyecto `app-bp-demo` dentro del monorepositorio `IA_Proyectos`.
2. Conectado controles interactivos a un motor determinista de cálculo fiscal y bancario.
3. Registrado y auditado la ficha del simulador en el portal y en el índice RAG.

---

## Prerrequisitos

*   Entorno Node.js nativo (`win32-arm64`) instalado en la estación de trabajo.
*   Repositorios `IA_Proyectos` e `IA_Documentacion` disponibles en el escritorio local.
*   Lectura previa recomendada de la especificación [Estándar Financiero y Editorial A4](/referencia/estandar-financiero-y-editorial/).

---

## Paso 1: Inicializar la Carpeta del Subproyecto

Todos los simuladores financieros residen de forma aislada bajo `IA_Proyectos/apps/business-plans/` para garantizar compilaciones rápidas e independientes:

1.  Abre una terminal PowerShell y crea la estructura base del nuevo simulador:
    ```powershell
    cd C:\Users\jjtei\Desktop\IA_Proyectos\apps\business-plans
    New-Item -ItemType Directory -Force -Path "app-bp-demo\src"
    cd app-bp-demo
    ```
2.  Crea un archivo `package.json` ligero basado en Vite:
    ```json
    {
      "name": "app-bp-demo",
      "private": true,
      "version": "1.0.0",
      "type": "module",
      "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
      },
      "devDependencies": {
        "vite": "^5.4.0"
      }
    }
    ```

---

## Paso 2: Separar CAPEX Total y Base Financiable en el Motor de Cálculo

Crea el archivo `src/finance-engine.js` respetando las reglas de auditoría bancaria del ecosistema (separación estricta entre desembolso total con impuestos y base hipotecable):

```javascript
export function calculateProjection(params) {
  const { precioActivo, reformaElegible, gastosImpuestos, ltvMaximo, interesAnual, plazoAnios } = params;

  // 1. Separar Desembolso Total (CAPEX) de Base Financiable
  const capexTotal = precioActivo + reformaElegible + gastosImpuestos;
  const baseFinanciable = precioActivo + reformaElegible;
  const principalHipoteca = Math.round(baseFinanciable * (ltvMaximo / 100));
  const fondosPropios = capexTotal - principalHipoteca;

  // 2. Cuota anual por sistema francés
  const tasa = interesAnual / 100;
  const cuotaAnual = tasa > 0
    ? (principalHipoteca * tasa * Math.pow(1 + tasa, plazoAnios)) / (Math.pow(1 + tasa, plazoAnios) - 1)
    : principalHipoteca / plazoAnios;

  return {
    capexTotal,
    baseFinanciable,
    principalHipoteca,
    fondosPropios,
    cuotaAnual: Math.round(cuotaAnual)
  };
}
```

---

## Paso 3: Conectar Escenarios y Persistencia con `bp-core.js`

Importa las utilidades compartidas de la suite (`../shared/bp-core.js`) en tu punto de entrada `src/main.js` para habilitar guardado en la nube (`Firestore`), respaldo offline (`localStorage`) y enlaces compartibles codificados en URL (`?s=`):

```javascript
import { calculateProjection } from './finance-engine.js';

const defaultState = {
  precioActivo: 350000,
  reformaElegible: 50000,
  gastosImpuestos: 42000,
  ltvMaximo: 70,
  interesAnual: 3.5,
  plazoAnios: 20
};

export function renderApp(state = defaultState) {
  const kpis = calculateProjection(state);
  console.log('Fondos propios requeridos:', kpis.fondosPropios.toLocaleString('es-ES'), '€');
  return kpis;
}
```

---

## Paso 4: Compilar y Verificar en Local

1.  Instala las dependencias locales del simulador y levanta el servidor de desarrollo:
    ```powershell
    npm install
    npm run dev
    ```
2.  Comprueba que al modificar cualquier control deslizante los KPIs recalculan al instante sin recargar la página y que el formato numérico emplea la convención `es-ES` (`1.250.000 €`).
3.  Genera el paquete estático de producción únicamente para este subproyecto:
    ```powershell
    npm run build
    ```

---

## Paso 5: Registrar en el Catálogo y Sincronizar Documentación

Una vez validado el simulador:

1.  Añade su entrada descriptiva en `IA_Proyectos/projects.json` siguiendo la guía [Crear y Desplegar un Subproyecto o Business Plan](/guias/crear-y-desplegar-proyecto/).
2.  Redacta el archivo `README.md` en la raíz de `app-bp-demo` detallando hipótesis financieras, pestañas incluidas y arquitectura.
3.  Sincroniza el catálogo y audita el portal ejecutando en `IA_Documentacion/src/docs`:
    ```powershell
    npm run build
    ```

Con esto tu simulador aparecerá automáticamente en la sección [Suite Business Plans](/proyectos-ia/business-plans/introduccion/) y sus reglas de negocio quedarán indexadas en `api-conocimiento-rag`.
