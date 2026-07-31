---
title: Comunidad Paradas
description: Ficha técnica detallada de la API REST modular para la gestión de alquileres, incidencias y actas de la comunidad.
sidebar:
  order: 2
---

Esta es la API REST modular de la suite de proyectos, diseñada específicamente para gestionar el alquiler, la administración de parcelas, incidencias, actas de reuniones y la caja común de la comunidad de propietarios.

---

## Ficha de Identificación

*   **Nombre de Carpeta**: `api-administrador-comunidad-paradas`
*   **Ruta en el Monorepositorio**: [`apps/api-administrador-comunidad-paradas/`](file:///c:/Users/jjtei/Desktop/IA_Proyectos/apps/api-administrador-comunidad-paradas)
*   **Tipo**: Backend / API REST
*   **Tecnologías Clave**: Python 3.x, FastAPI, Uvicorn, Pydantic, FPDF2.
*   **Autor**: JoelJuana
*   **Fecha de Creación**: 2026-06-28

---

## Arquitectura del Servicio

El servicio está estructurado como una API backend minimalista de alto rendimiento organizada en módulos:

```
api-administrador-comunidad-paradas/
├── src/
│   ├── config/       # Configuración general y rutas de almacenamiento
│   ├── controllers/  # Controladores de negocio y manejo de peticiones
│   ├── database.py   # Gestión de persistencia local en db.json
│   ├── models.py     # Esquemas de datos Pydantic para validación
│   └── pdf_utils.py  # Generador de PDFs para convocatorias y actas
├── drive/            # Directorio local simulado de almacenamiento
│   └── Actas y Ordenes del Dia/  # PDFs de actas generadas
├── static/           # SPA frontend montada y servida por la API
├── tests/            # Suite de pruebas unitarias
├── venv/             # Entorno virtual de Python
├── app.py            # Servidor principal FastAPI y endpoints
├── db.json           # Base de datos simulada en JSON
├── requirements.txt  # Dependencias del sistema
└── README.md
```

### Características Principales
*   **Monolito FastAPI con Extensiones**: Toda la lógica de enrutamiento reside en `app.py`, mientras que la persistencia y utilidades se extraen a `src/`.
*   **CORS Abierto**: Configurado para desarrollo local recibiendo peticiones desde cualquier origen (`allow_origins=["*"]`).
*   **Generador de Actas PDF**: Utiliza la librería `fpdf2` para generar documentos PDF elegantes con cabeceras de comunidad, firmas y resúmenes de acuerdos.

---

## Referencia de Endpoints

### 1. Dashboard e Información General
*   `GET /api/dashboard/resumen?anio={int}`: Obtiene el saldo actual, cobros, costes, tasa de morosidad y detalles de reuniones de un año determinado (por defecto, 2025).
*   `GET /api/dashboard/evolucion?anio={int}`: Devuelve series temporales de ingresos y costes agrupados por los 12 meses de un año.
*   `GET /api/dashboard/deuda-evolucion`: Devuelve el desglose consolidado de la deuda viva, deuda judicializada y deudas pendientes de cobro por propietario.
*   `GET /api/comunidad`: Obtiene los datos generales de la comunidad (nombre, NIF, saldo inicial histórico).
*   `GET /api/balances`: Devuelve el histórico de balances anuales.

### 2. Gestión de Propiedades y Propietarios
*   `GET /api/propiedades?anio={int}`: Lista las paradas/pisos con el total pagado y deuda acumulada por su propietario.
*   `GET /api/propiedades/{id}`: Obtiene los detalles específicos de una propiedad y su propietario asociado.
*   `PUT /api/propiedades/{id}`: Actualiza los datos de contacto del propietario (nombre, email, teléfono).
*   `GET /api/propietarios`: Lista detallada de todos los propietarios, sus paradas asociadas, sumas totales de pagos y deuda desglosada (incluyendo clasificaciones judiciales de morosidad).

### 3. Caja Común (Ingresos y Costes)
*   `GET /api/ingresos?estado={str}&propiedad_id={str}&anio={int}`: Lista ingresos con filtros opcionales de estado (`Pagado`/`Pendiente`), propiedad y año.
*   `POST /api/ingresos`: Crea un nuevo cargo manual pendiente de pago.
*   `PATCH /api/ingresos/{id}/pagar?fecha_pago={str}`: Registra el pago efectivo de un ingreso.
*   `GET /api/costes?categoria={str}&anio={int}`: Lista costes históricos de la comunidad.
*   `POST /api/costes`: Registra un gasto manual de caja común.
*   `GET /api/costes/categorias`: Obtiene las categorías únicas de gastos registradas (ej. Suministros, Limpieza, Mantenimiento).

### 4. Reuniones y Actas
*   `GET /api/reuniones`: Lista las reuniones celebradas, actas redactadas y convocatorias.
*   `POST /api/reuniones/procesar`: Procesa una reunión. Si es un acta, autodetecta propuestas de derramas, genera un PDF oficial elegante en la carpeta `drive/` y lo registra en la base de datos.
*   `GET /drive/Actas y Ordenes del Dia/{filename}`: Descarga directa de archivos PDF de actas desde el almacenamiento local.

### 5. Automatizaciones y Lógica Inteligente
*   `POST /api/derrama/crear`: Distribuye una derrama extraordinaria de importe fijo entre todos los propietarios basándose en el coeficiente de participación de cada una de sus paradas asociadas.
*   `POST /api/banco/conciliar`: Procesa un extracto bancario en texto (formato delimitado por tubos `|`). Realiza una conciliación relacional automática:
    *   **Ingresos**: Identifica al propietario mediante coincidencia de nombre o número de parada (ej. "parada 3"), busca un cargo pendiente equivalente y lo marca como pagado.
    *   **Costes**: Identifica palabras clave (como "luz", "ascensor", "seguro") para categorizar el gasto y registrar el coste de forma automática.
*   `POST /api/chat`: Consola conversacional del chatbot interactivo. Responde a preguntas de lenguaje natural sobre el saldo de caja, morosos y permite ejecutar comandos directos:
    *   `derrama <importe> <concepto>` (ej. `derrama 12000 Reparación tejado`)
    *   `conciliar\n<extracto bancario>`

---

## Puesta en Marcha

Para arrancar el servidor local de desarrollo:

1.  **Entrar al directorio**:
    ```bash
    cd apps/api-administrador-comunidad-paradas
    ```
2.  **Activar el entorno virtual**:
    ```powershell
    .\venv\Scripts\activate
    ```
3.  **Instalar dependencias**:
    ```bash
    pip install -r requirements.txt
    ```
4.  **Iniciar la API con recarga en vivo**:
    ```bash
    uvicorn app:app --reload
    ```

El servidor estará escuchando en `http://127.0.0.1:8000`. La documentación interactiva Swagger estará disponible en `http://127.0.0.1:8000/docs`.
