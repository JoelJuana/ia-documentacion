---
title: Plugin "comite-registral-cccat"
description: "Suite jurídico-registral para Propiedad Horizontal en Cataluña (Libro V CCCat, LH, RH y RN): corpus oficial consolidado del BOE, linter determinista de citas y plazos registrales, calculadora de escrutinio de asambleas, colección RAG aislada (juridico-cccat) y subagentes Registrador Calificador y Redactor Notarial."
---

*   **Ruta en repositorio**: `IA_Configuracion/plugins/comite-registral-cccat/`
*   **Versión**: `v1.0.0`
*   **Estado**: Activo

---

# Comité Registral y Propiedad Horizontal CCCat (`comite-registral-cccat` v1.0.0)

Plugin especializado de Antigravity para blindar técnicamente **Estatutos, Reglamentos Internos, Convocatorias, Actas bilingües (catalán/castellano), Anexos de efectividad y Certificados para Notaría y Registro de la Propiedad** en complejos inmobiliarios y comunidades de propietarios regidas por el **Libro Quinto del Código Civil de Cataluña (CCCat)** y la legislación hipotecaria española.

## Arquitectura en Cuatro Capas (`v1.0.0`)

1. **Corpus Normativo Oficial Consolidado del BOE (`corpus_ph_catalunya.json`)**:
   - Extraído de forma reproducible desde la API abierta de Legislación Consolidada del BOE (`build_corpus_boe.py`), abarcando el Libro Quinto del CCCat (`BOE-A-2006-11130`, con las reformas vigentes de la Ley 5/2015 y posteriores), Libro Primero (`BOE-A-2003-2410`), Ley Hipotecaria (`BOE-A-1946-2453`), Reglamento Hipotecario (`BOE-A-1947-3843`), Reglamento Notarial (`BOE-A-1944-6578`), RD 1093/1997 (`BOE-A-1997-16469`), Ley 24/2001 (`BOE-A-2001-24965`), Ley 1/1998 de Política Lingüística (`BOE-A-1998-2989`) y TRLITPAJD (`BOE-A-1993-25359`).
   - Desglosa cada artículo, apartado numérico y letra (`553-15.9`, `553-11.2.f`, `553-25.2.i`, `553-26.1.e`, `553-34.2`, `567-2.1.d`, etc.) con consulta instantánea por CLI (`lookup_norma.py`) sin consumir memoria en reposo.
2. **Linter Jurídico-Registral Pre-Vuelo (`lint_registral_cccat.py`)**:
   - Escanea archivos HTML editoriales o carpetas enteras de expediente, parsea todas las citas legales simples y múltiples y comprueba al 100 % contra el corpus oficial que ningún artículo, apartado o letra sea inexistente o derogado.
   - Audita controles hipotecarios críticos según modalidad documental: exclusión de pactos personales (`art. 98 LH`), congruencia Orden del Día y título constitutivo (`arts. 553-10`, `553-25.1` y `553-26.1 CCCat`), los cuatro requisitos del derecho de vuelo/cubrición (`art. 567-2.1.a–d CCCat`), plazos fatales (`8`, `5` y `10` días + `3 días tablón + 1 mes` del `art. 553-26.3 CCCat`), solicitud de inscripción parcial (`arts. 19 bis y 322 LH`) y suma exacta de cuotas (`100,000 %`).
3. **Calculadora Determinista de Asistencia y Escrutinio (`escrutinio_asamblea.py`)**:
   - Opera directamente sobre el censo registral oficial (`censo_153_entidades.csv`), agrupando cotitularidades, personas jurídicas y comunidades funcionales de garaje (`art. 553-52.1.a CCCat`), y calcula sin error humano las cuotas presentes, representadas, abstenciones adheridas (`art. 553-24.3 CCCat`) y voto favorable presunto de no asistentes (`art. 553-26.3.a CCCat`).
4. **Subagentes Especializados y Colección RAG Aislada (`juridico-cccat`)**:
   - **`registrador-calificador`**: Audita cualquier borrador como Registrador de la Propiedad en Cataluña emitiendo dictamen preventivo de defectos insubsanables, subsanables o mejoras de técnica hipotecaria.
   - **`redactor-notarial-cccat`**: Redacta y armoniza piezas en castellano y catalán apoyándose exclusivamente en preceptos verificados del corpus y datos tabulares del censo.
   - **`sync_rag_normativa.py`**: Sincroniza la normativa consolidada y el compendio de doctrina de la DGDyEJ de Catalunya y de la DGSJFP en la colección aislada `juridico-cccat` del microservicio `api-conocimiento-rag` (`v1.3.0`).

