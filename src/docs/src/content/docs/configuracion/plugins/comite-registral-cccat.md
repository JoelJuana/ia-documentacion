---
title: Plugin "comite-registral-cccat"
description: "Suite jurídico-registral, fiscal y procesal v2.1 (4 agentes expertos) para Propiedad Horizontal en Cataluña: 374 preceptos oficiales BOE (CCCat, LH, RH, RN, Código Tributario Cataluña DLeg 1/2024, LIVA, LIRPF, Catastro, Vivienda, Mediación, Turismo HUT y LEC) + 17 resoluciones/sentencias verificadas (DGDyEJ, DGSJFP, TSJC, APB, DGT), linter bilingüe ES/CA y geométrico A4, calculadora de plazos, escrutinio y Excel vivo (.xlsx), motor de morosidad/afección real (4+1 años) y simulador Modelo 600 ATC, 5 plantillas operativas bilingües y orquestador con checkpoints."
---

*   **Ruta en repositorio**: `IA_Configuracion/plugins/comite-registral-cccat/`
*   **Versión**: `v2.1.0`
*   **Estado**: Activo

---

# Comité Registral, Fiscal ATC y Propiedad Horizontal CCCat (`comite-registral-cccat` v2.1.0)

Plugin especializado de Antigravity (**Full-Spectrum 4-Expert Edition**) para redactar, auditar, gobernar y blindar de extremo a extremo **Estatutos, Reglamentos Internos, Convocatorias, Actas bilingües (`ca`/`es`), Anexos `art. 553-27.5`, Certificados Notariales, Mesas de Asamblea en Excel vivo (`.xlsx`), Autoliquidaciones Modelo 600 ATC / IVA Obras / Modelo 184, Reclamaciones Monitorias de Morosos e Impugnaciones / Conflictos HUT** en comunidades de propietarios de Cataluña.

## Los 4 Subagentes Especializados del Comité (`agents/`)

1. **`redactor-notarial-cccat`**: Letrado y Oficial Mayor de Notaría en Cataluña (`ca`/`es`). Redacta, armoniza y sincroniza Estatutos, Reglamentos, Convocatorias, Actas, Anexos, Certificados y Minutas Notariales bajo `gestiona_editorial`.
2. **`registrador-calificador`**: Registrador de la Propiedad en Cataluña (*Abogado del Diablo Hipotecario*). Audita los 7 vectores de calificación registral preventiva (`arts. 18, 19 bis, 20, 34, 38, 98, 254 y 322 LH`, `Libro V CCCat`, `RH`, `RN` y `Ley 5/2009`).
3. **`experto-fiscal-atc-catastro`** *(Nuevo en `v2.1`)*: Fiscalista inmobiliario y autonómico catalán (**ATC Modelo 600**, Libro VI del Código Tributario de Cataluña `DLeg 1/2024`, no sujeción `art. 31.2 TRLITPAJD`, IVA `10 %` vs `21 %` vs `ISP` en obras de rehabilitación, `Modelo 184` EATR y Coordinación Catastro–Registro `TRLCI` / `Modelo 900D`).
4. **`abogado-administrador-comunidades`** *(Nuevo en `v2.1`)*: Letrado procesalista y Administrador de Fincas Colegiado en Cataluña. Gestiona recobro judicial monitorio con afección real catalana (`año en curso + 4 anteriores` ex `art. 553-5.1 CCCat`), defensa frente a impugnaciones (`art. 553-31`), acción de cesación y pisos turísticos **HUT** (`art. 553-40` y `Ley 13/2002`), obras en terrazas/ascensores (`arts. 553-39.2 y 553-43`) y mediación (`Ley 15/2009`).

## Arquitectura Técnica en Siete Capas (`v2.1.0`)

1. **Corpus Normativo Oficial Consolidado del BOE (`374` preceptos de `20` normas) + Catálogo Verificado de Doctrina (`17` resoluciones y sentencias)**:
   - Extraído desde la API abierta de Legislación Consolidada del BOE (`build_corpus_boe.py`): Libro Quinto (`167` arts.) y Libro Primero (`39` arts.) del `CCCat`, `CC` (`5, 396`), `LH` (`31`), `RH` (`13`), `RN` (`22`), `RD 1093/1997` (`11`), `Ley 24/2001`, `Ley 1/1998`, `Ley 5/2009`, **Libro VI Código Tributario de Cataluña `DLeg 1/2024`** (`BOE-A-2024-6951`, incluyendo tablas progresivas vigentes `2026`), `TRLITPAJD`, `LIVA`, `LIRPF`, `TRLCI` (Catastro), `Ley 18/2007` (Vivienda), `Ley 15/2009` (Mediación), `Ley 13/2002` (Turismo HUT), `LEC` y especialidad procesal del `art. 21 LPH`.
   - `catalogo_resoluciones_cccat.json`: Resoluciones contrastadas de `DGDyEJ`, `DGSJFP`, `STC 4/2014`, sentencias de la Sala Civil del **`TSJC`** (`STSJCat 33/2016`, `74/2018`, doctrina ascensores y terrazas), `Acuerdo Pleno Civil AP Barcelona 15/11/2019` y Consultas Vinculantes `DGT` (`V0231-19`, `V0449-20`, `V2574-22`).
2. **Linter Bilingüe (`ES`/`CA`), Geométrico A4 y Reconciliador Cruzado (`lint_registral_cccat.py` + `audit_expediente_cruzado.py`)**:
   - Audita el `100 %` de citas legales en castellano y catalán contra los `374` preceptos del BOE, cuotas al `100,000 %`, exclusión del `art. 98 LH`, los `4` extremos del `art. 567-2.1` (`<= 30` años), inscripción parcial (`arts. 19 bis y 322 LH`), geometría PDF A4 (`--check-pdf`), huecos de firma (`--ready-to-sign`) y congruencia cruzada entre todas las piezas del expediente (`--cross-check`).
3. **Motor de Calendario Registral Fecha a Fecha (`calendario_plazos_cccat.py`)**:
   - Calcula y audita la cadena `>= 8d convocatoria -> Junta -> <= 5d cierre -> <= 10d notificación -> 3d tablón subsidiario + 1 mes de fecha a fecha (art. 5.1 CC) -> 1.er día hábil para Anexo 553-27.5 y Certificado`.
4. **Calculadora de Doble Mayoría + Kit "Día D" (`escrutinio_asamblea.py` + `export_mesa_asamblea.py` + `sync_acta_certificado.py`)**:
   - Verifica doble mayoría (`propietarios + cuotas`) descontando morosos (`553-24.1`), genera `Mesa_Escrutinio_Asamblea.xlsx` con fórmulas Excel vivas y sincroniza en `0` tokens Asistencia, Acta (`ca`), Anexo (`ca`) y Certificado (`es`).
5. **Motor Determinista de Morosidad (`4+1` años) y Simulador Fiscal ATC/AEAT (`liquidar_mora_y_fiscalidad.py`)** *(Nuevo en `v2.1`)*:
   - Subcomando `mora`: desglosa al céntimo deuda con afección real preferente (`art. 553-5.1 CCCat`) frente a deuda personal decenal (`art. 121-20`) y alertas preventivas trienales (`art. 121-21.a`).
   - Subcomando `fiscal`: calcula cuotas exactas en Cataluña (`Modelo 600 ATC` según escala vigente `2026` `10 %–13 %` / `20 %` gran tenedor / `1,5 %` AJD, `IVA 10 %` vs `21 %` en obras y `Modelo 184`).
6. **Pack Notaría/ATC (`export_pack_notaria.py`) + Kit de 5 Plantillas Bilingües de Secretaría (`references/plantillas/`)**:
   - Incluye boletín de delegación de voto (`553-22.2`), diligencia de tablón (`553-21.2`), oficio de notificación con pie de `1 mes` (`553-26.3`), certificación de deuda monitoria (`553-47`) y requerimiento fehaciente de cesación HUT/actividades (`553-40`).
7. **Orquestador Autónomo con Checkpoints y Colección RAG `juridico-cccat` (`run_comite_registral.py` + `sync_rag_normativa.py`)**:
   - Indexa los `6` bloques normativos y manuales técnicos (`00` a `05`) en la colección aislada `juridico-cccat` de `api-conocimiento-rag`.

