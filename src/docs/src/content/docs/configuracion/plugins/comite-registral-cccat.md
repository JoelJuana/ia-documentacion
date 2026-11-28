---
title: Plugin "comite-registral-cccat"
description: "Suite jurídico-registral industrial v2.0 para Propiedad Horizontal en Cataluña (Libro V CCCat, LH, RH, RN y Ley 5/2009): corpus oficial BOE (298 preceptos) + catálogo de resoluciones verificadas, linter bilingüe ES/CA y geométrico A4 (--check-pdf --cross-check), calculadora de plazos fecha a fecha, escrutinio con doble mayoría y Excel vivo (.xlsx), sincronizador 0-tokens de Actas/Certificados, Pack Notaría/Modelo 600 ATC y orquestador autónomo con checkpoints."
---

*   **Ruta en repositorio**: `IA_Configuracion/plugins/comite-registral-cccat/`
*   **Versión**: `v2.0.0`
*   **Estado**: Activo

---

# Comité Registral y Propiedad Horizontal CCCat (`comite-registral-cccat` v2.0.0)

Plugin especializado de Antigravity (**Industrial & Notarial Edition**) para blindar de extremo a extremo **Estatutos, Reglamentos Internos, Convocatorias, Hojas de Asistencia, Actas bilingües (`ca`/`es`), Anexos `art. 553-27.5`, Certificados Notariales, Mesas de Asamblea en Excel vivo (`.xlsx`) y Minutas / Modelos 600 ATC** en comunidades de propietarios simples y complejas regidas por el **Libro Quinto del Código Civil de Cataluña (CCCat)** y la legislación hipotecaria española.

## Arquitectura en Seis Capas (`v2.0.0`)

1. **Corpus Normativo Oficial del BOE (`298` preceptos) + Catálogo Verificado de Doctrina (`DGDyEJ`, `DGSJFP` y `TC`)**:
   - Extraído desde la API abierta de Legislación Consolidada del BOE (`build_corpus_boe.py`), abarcando Libro Quinto (`BOE-A-2006-11130`: propiedad, vecindad/inmisiones `544`, comunidad `552`, propiedad horizontal simple y compleja `553`, usufructo `561`, servidumbres `566` y derecho de vuelo `567`), Libro Primero (`111`, `121`, `122`), Código Civil (`arts. 5 y 396`), `LH`, `RH` (incluyendo `art. 16.2` y `art. 415`), `RN`, `RD 1093/1997`, `Ley 24/2001`, `Ley 1/1998`, `Ley 5/2009` de recursos ante la DGDyEJ y `TRLITPAJD`.
   - Incluye `catalogo_resoluciones_cccat.json` consultable con `lookup_norma.py --doctrina` con resoluciones oficiales contrastadas por código `BOE-A-YYYY-XXXXX` y fecha exacta.
2. **Linter Bilingüe (`ES`/`CA`), Geométrico A4 y Reconciliador Cruzado (`lint_registral_cccat.py` + `audit_expediente_cruzado.py`)**:
   - Verifica el `100 %` de citas legales en castellano y catalán contra el BOE, suma universal de cuotas (`100,000 %`), filtro del `art. 98 LH`, los `4` extremos del `art. 567-2.1` (bloqueando plazos `> 30` años), inscripción parcial (`arts. 19 bis y 322 LH`), páginas huérfanas A4 (`--check-pdf` vía PyMuPDF), campos vacíos (`--ready-to-sign`) y reconciliación cruzada entre Estatutos, Convocatoria, Asistencia, Acta, Anexo, Certificado y CSV del censo (`--cross-check`).
3. **Motor de Calendario Registral Fecha a Fecha (`calendario_plazos_cccat.py`)**:
   - Calcula y audita sin error de meses cortos (como febrero de 28 días) la cadena completa `8d convocatoria -> Junta -> 5d cierre -> 10d notificación -> 3d tablón subsidiario + 1 mes de fecha a fecha (art. 5.1 CC) -> 1.er día hábil para Anexo 553-27.5 y Certificado`.
4. **Calculadora de Doble Mayoría + Kit "Día D" (`escrutinio_asamblea.py` + `export_mesa_asamblea.py` + `sync_acta_certificado.py`)**:
   - Normaliza titulares por NIF/condominio (`art. 553-22.3`), descuenta morosos de la base (`art. 553-24.1`), verifica **doble mayoría de propietarios y cuotas** (`553-25.2` y `553-26.2`), soporta `--subcomunidad` y comunidad funcional `Dep. 153` (`553-52.1.a`), exporta `Mesa_Escrutinio_Asamblea.xlsx` con fórmulas Excel vivas y vuelca en `0` tokens los resultados en `02-asistencia`, `03-acta` (`ca`), `03b-anexo-acta` (`ca`) y `04-certificado` (`es`).
5. **Pack Documental para Notaría y Agència Tributària de Catalunya (`export_pack_notaria.py`)**:
   - Genera automáticamente la *Minuta de Escritura de Elevación a Público*, la *Memoria Fiscal de no sujeción a AJD gradual (`art. 31.2 TRLITPAJD`) para el Modelo 600 ATC (`art. 254 LH`)* y el *Checklist de Tracto Sucesivo (`arts. 20 y 34 LH`)*.
6. **Orquestador Autónomo `run_workflow` con Checkpoints y Colección RAG `juridico-cccat` (`run_comite_registral.py`)**:
   - Coordina a **`registrador-calificador`** y **`redactor-notarial-cccat`** con checkpoints reanudables, bucle automático de subsanación y sincronización JIT en `api-conocimiento-rag` (`sync_rag_normativa.py`).

