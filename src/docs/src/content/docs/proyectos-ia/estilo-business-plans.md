---
title: Estilo de Business Plans
description: Libro de estilo estético corporativo unificado para los simuladores financieros y de planes de negocio en el monorepositorio.
---

Este documento describe las directrices estéticas y el libro de estilo visual que deben compartir obligatoriamente todos los simuladores financieros ubicados bajo `apps/business-plans/`.

---

## Principios de Diseño

Todos los simuladores financieros deben transmitir un aspecto visual de nivel premium, moderno y cohesivo (estilo Dashboard Financiero SaaS). Se prohíbe el uso de estilos por defecto del navegador o colores primarios no curados (como azul o rojo básico).

---

## Tipografía Corporativa

La combinación tipográfica unificada se importa desde Google Fonts:

*   **Títulos y Cifras Clave (KPIs)**: Usar la tipografía `'Outfit'`. Transmite modernidad, estructura geométrica y gran legibilidad en cifras numéricas grandes.
*   **Cuerpo de Texto y Tablas de Datos**: Usar la tipografía `'Inter'`. Es altamente neutra y optimizada para la legibilidad en pantallas en tamaños de fuente pequeños.

```css
/* Ejemplo de importación */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
```

---

## Paleta de Colores Oficial

La paleta se define utilizando variables CSS en la hoja de estilos global para facilitar el mantenimiento:

### 1. Colores de Fondo y Contenedores (Dark Mode)
*   **Fondo de Página (`--bg-primary`)**: `#080c14` (un azul oscuro profundo, casi negro).
*   **Tarjetas y Contenedores (`--bg-card`)**: `rgba(13, 20, 35, 0.75)` (tarjetas con transparencia y efecto de desenfoque/glassmorphism).
*   **Bordes de Tarjeta (`--border-color`)**: `rgba(255, 255, 255, 0.07)` (bordes extremadamente sutiles y finos).

### 2. Colores de Acento y Estado
*   **Acento Principal (Índigo)**: `#6366f1`
*   **Acento Secundario (Cian)**: `#06b6d4`
*   **Estados de Éxito / Ganancias (Esmeralda)**: `#10b981` (para retornos positivos, flujos de caja a favor).
*   **Estados de Alerta / Pérdidas (Rojo)**: `#f43f5e` (para gastos, amortizaciones pendientes o pérdidas netas).

---

## Gradientes y Efectos Especiales

Para dar una terminación premium al dashboard, utiliza gradientes lineales sutiles:

*   **Gradiente de Títulos Principales**:
    ```css
    background: linear-gradient(135deg, #6366f1, #3b82f6, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    ```
*   **Efecto Desenfoque (Glassmorphism)** en tarjetas:
    ```css
    background: rgba(13, 20, 35, 0.75);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 12px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    ```

Cualquier nuevo simulador financiero o de negocio que agregues a la suite debe importar estas variables y seguir estrictamente estas pautas estéticas para garantizar una experiencia de usuario consistente.
