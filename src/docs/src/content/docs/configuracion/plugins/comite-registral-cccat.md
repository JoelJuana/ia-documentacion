---
title: Plugin "comite-registral-cccat"
description: "Suite industrial v2.2 (4 agentes expertos + 14 motores deterministas) para Propiedad Horizontal en Cataluña: 376 preceptos oficiales BOE + 17 resoluciones verificadas, cierre 1-clic de Asamblea desde Excel vivo (--from-excel), mail-merge de papeletas y certificados monitorios A4/PDF/DOCX, cruce de Notas Simples PDF vs Censo (art. 20 LH), motor de derramas complejas sin descuadre (0,00 €), simulador Modelo 600 ATC / afección real 4+1 años y defensa post-calificación (STC 4/2014: DGDyEJ vs DGSJFP)."
---

*   **Ruta en repositorio**: `IA_Configuracion/plugins/comite-registral-cccat/`
*   **Versión**: `v2.2.0`
*   **Estado**: Activo

---

# Comité Registral, Fiscal ATC y Propiedad Horizontal CCCat (`comite-registral-cccat` v2.2.0)

Plugin especializado de Antigravity (**Industrial End-to-End 4-Expert Edition**) para redactar, auditar, celebrar Asambleas, gobernar y blindar de extremo a extremo **Estatutos, Reglamentos, Convocatorias, Papeletas nominales, Mesas en Excel vivo (`.xlsx`), Actas bilingües (`ca`/`es`), Certificados Notariales, Minutas en `.docx`, Autoliquidaciones Modelo 600 ATC, Derramas complejas, Reclamaciones Monitorias y Recursos Gubernativos (`DGDyEJ` / `DGSJFP`)** en comunidades de propietarios de Cataluña.

## Los 4 Subagentes Especializados del Comité (`agents/`)

1. **`redactor-notarial-cccat`**: Letrado y Oficial Mayor de Notaría en Cataluña (`ca`/`es`). Redacta, armoniza y sincroniza Estatutos, Reglamentos, Convocatorias, Actas, Anexos, Certificados, Minutas `.docx` y Recursos Gubernativos.
2. **`registrador-calificador`**: Registrador de la Propiedad en Cataluña (*Abogado del Diablo Hipotecario*). Audita los 7 vectores de calificación preventiva, cruza Notas Simples PDF frente al Censo (`art. 20 LH`) y dirige la estrategia post-calificación (`STC 4/2014`).
3. **`experto-fiscal-atc-catastro`**: Fiscalista inmobiliario y autonómico catalán (**ATC Modelo 600**, Libro VI del Código Tributario de Cataluña `DLeg 1/2024`, no sujeción `art. 31.2 TRLITPAJD`, IVA `10 %` vs `21 %` en obras, `Modelo 184` EATR y Catastro `TRLCI`).
4. **`abogado-administrador-comunidades`**: Letrado procesalista y Administrador de Fincas Colegiado en Cataluña. Gestiona monitorios con afección real `4+1` años (`art. 553-5.1 CCCat`), impugnaciones (`553-31`), pisos turísticos **HUT** (`553-40` y `Ley 13/2002`), obras/fotovoltaica/recarga VE (`553-25.2`, `553-30`, `553-36.2`), derramas mixtas (`553-45`) y mediación (`Ley 15/2009`).

## Arquitectura en Nueve Capas Deterministas (`v2.2.0`)

1. **Corpus Oficial del BOE (`376` preceptos de `20` normas) + Catálogo Verificado (`17` resoluciones/sentencias)**:
   - `lookup_norma.py` + `build_corpus_boe.py` + `sync_rag_normativa.py` (`7` documentos técnicos `00` a `06` en la colección aislada `juridico-cccat`).
2. **Linter Bilingüe (`ES`/`CA`), Geométrico A4 y Reconciliador Cruzado (`lint_registral_cccat.py` + `audit_expediente_cruzado.py`)**.
3. **Auditor de Tracto Sucesivo desde Notas Simples PDF (`audit_tracto_notas_simples.py`)** *(Nuevo en `v2.2`)*:
   - Escanea Notas Simples PDF con `PyMuPDF` y las contrasta contra el Censo CSV detectando cambios de titular/NIF (`art. 20 LH`), descuadres de cuotas y ejecuciones o asientos pendientes (`art. 17 LH`).
4. **Motor de Calendario Registral Fecha a Fecha (`calendario_plazos_cccat.py`)**.
5. **Cierre 1-Clic desde Excel Vivo "Día D" (`export_mesa_asamblea.py` -> `--from-excel` en `escrutinio_asamblea.py` y `sync_acta_certificado.py`)** *(Nuevo en `v2.2`)*:
   - Lee directamente `Mesa_Escrutinio_Asamblea.xlsx` rellenado en la puerta de la Asamblea y vuelca en `0` tokens todos los resultados en `02-asistencia`, `03-acta` (`ca`), `03b-anexo-acta` (`ca`) y `04-certificado` (`es`), compilando sus PDFs y `.docx` (`--compile-editorial`).
6. **Producción Editorial A4 / PDF / Word `.docx` de Secretaría y Monitorios (`generar_documentos_secretaria.py`)** *(Nuevo en `v2.2`)*:
   - *Mail-merge* de papeletas nominales recortables (`3/página A4`) desde el CSV, Certificado Oficial A4 de deuda monitoria (`art. 553-47`) y exportación de Minuta Notarial a `.docx` nativo (incluida también en `export_pack_notaria.py`).
7. **Calculadora de Derramas Complejas sin Descuadre (`reparto_derrama_cccat.py`)** *(Nuevo en `v2.2`)*:
   - Reparto al céntimo (`0,00 €` de desvío por resto mayor) con exoneraciones estatutarias (`art. 553-45.2`), subvenciones, fraccionamiento mensual, control del `art. 553-30.3 CCCat` (accesibilidad/eficiencia energética obligatoria para disidentes) y exportación `.xlsx`.
8. **Motor de Morosidad (`4+1` años) y Simulador Fiscal ATC/AEAT (`liquidar_mora_y_fiscalidad.py`)**.
9. **Defensa Post-Calificación Registral (`defensa_calificacion_negativa.py`) + Orquestador `run_comite_registral.py`** *(Nuevo en `v2.2`)*:
   - Determina por el test de la **`STC 4/2014`** si compete recurrir ante la **`DGDyEJ`** (`Ley 5/2009`) o ante la **`DGSJFP`** (recurso mixto), calcula plazos (`15d` sustitutoria, `1m` gubernativo, `2m` verbal, `60d hábiles` prórroga asiento `art. 323 LH`) y genera el borrador de Recurso Gubernativo.

