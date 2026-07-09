---
title: Proyectos - Suite Astral (Carta y Generador Astral)
description: Ficha de las aplicaciones React para el cálculo de cartas celestes y compatibilidades zodiacales.
---

La **Suite Astral** está conformada por dos aplicaciones web avanzadas desarrolladas en React que calculan mapas celestes y afinidades astrológicas basadas en coordenadas geográficas e ingresos temporales específicos.

---

## Ficha de Identificación

*   **Ruta en el Monorepositorio**:
    *   [\`apps/app-carta-astral/\`](file:///c:/Users/jjtei/Desktop/Proyectos_IA/apps/app-carta-astral): Calculador y comparador de afinidad y compatibilidad zodiacal de parejas.
    *   [\`apps/app-generador-astral/\`](file:///c:/Users/jjtei/Desktop/Proyectos_IA/apps/app-generador-astral): Generador gráfico e interactivo de mapas celestes en tiempo real.
*   **Tipo**: Frontend (React)
*   **Tecnologías Clave**: React, Vite, SVG dinámico, geolocalización.
*   **Autor**: JoelJuana
*   **Fecha de Creación**: 2026-06-28

---

## Características de los Proyectos

### 1. Carta Astral (`app-carta-astral`)
*   **Propósito**: Analizar la sinastría astrológica entre dos personas.
*   **Funcionamiento**: Solicita la fecha, hora y lugar de nacimiento de ambas personas, calcula las posiciones planetarias en las casas zodiacales y emite un porcentaje de afinidad desglosado por ámbitos (emocional, intelectual, físico).

### 2. Generador Astral (`app-generador-astral`)
*   **Propósito**: Dibujar e interpretar de forma interactiva una carta natal.
*   **Efecto WOW**: Renderiza un plano celeste interactivo en formato SVG dinámico que rota y posiciona los astros en los grados correspondientes de la rueda zodiacal de manera matemáticamente precisa según las efemérides astronómicas.

---

## Uso en Desarrollo

Ambas aplicaciones se ejecutan localmente en servidores de desarrollo Vite estándar:

```bash
# Para el Generador Astral
cd apps/app-generador-astral
npm install
npm run dev

# Para la Carta Astral
cd apps/app-carta-astral
npm install
npm run dev
```

El servidor dev se levanta en `http://localhost:5173/` (o puertos subsiguientes de Vite).
