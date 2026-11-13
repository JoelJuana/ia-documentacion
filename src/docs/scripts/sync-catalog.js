import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas absolutas del ecosistema local
const configuracionRoot = 'C:/Users/jjtei/Desktop/IA_Configuracion';
const geminiActiveConfigRoot = 'C:/Users/jjtei/.gemini/config';
const proyectosRoot = 'C:/Users/jjtei/Desktop/IA_Proyectos';
const infraestructuraRoot = 'C:/Users/jjtei/Desktop/IA_Infraestructura';
const documentacionRoot = path.resolve(__dirname, '../../..');

// Modo seguro para entornos CI remotos (GitHub Actions Ubuntu) donde no existen los repositorios hermanos
if (!fs.existsSync(proyectosRoot) && !fs.existsSync(configuracionRoot)) {
  console.log('[CI Mode] Repositorios hermanos locales no detectados; se conserva el catálogo pre-sincronizado.');
  process.exit(0);
}

const projectsJsonPath = path.join(proyectosRoot, 'projects.json');
const editorialCatalogJsPath = path.join(proyectosRoot, 'docs/editorial/catalog.js');
const skillsDir = path.join(configuracionRoot, 'skills');
const pluginsDir = path.join(configuracionRoot, 'plugins');
const proyectosReglasDir = path.join(configuracionRoot, 'proyectos-reglas');

const targetProyectosMd = path.join(__dirname, '../src/content/docs/proyectos-ia/catalogo-general.md');
const targetSkillsDir = path.join(__dirname, '../src/content/docs/agente/skills');
const targetReglasMd = path.join(__dirname, '../src/content/docs/agente/reglas/reglas-y-directrices.md');
const targetInfraServiciosDir = path.join(__dirname, '../src/content/docs/infraestructura-local/servicios');
const targetConfiguracionDir = path.join(__dirname, '../src/content/docs/configuracion');
const targetConfigPluginsDir = path.join(__dirname, '../src/content/docs/configuracion/plugins');
const targetConfigReglasDir = path.join(__dirname, '../src/content/docs/configuracion/reglas');
const targetProyectosAppsDir = path.join(__dirname, '../src/content/docs/proyectos-ia/apps');
const targetProyectosBpDir = path.join(__dirname, '../src/content/docs/proyectos-ia/business-plans');
const targetChangelogMd = path.join(__dirname, '../src/content/docs/historial/cambios.md');
const targetIndexMd = path.join(__dirname, '../src/content/docs/index.md');

let countProjects = 0;
let countGeneralApps = 0;
let countBusinessPlans = 0;
let countSkills = 0;
let countInfra = 0;
let countActivePlugins = 0;
let countReservePlugins = 0;

// Rutas de destino para propagar reglas específicas de agentes (.agents/AGENTS.md)
const targetAgentsRules = [
  {
    src: path.join(configuracionRoot, 'proyectos-reglas/ia-documentacion.md'),
    dest: path.join(documentacionRoot, '.agents/AGENTS.md')
  },
  {
    src: path.join(configuracionRoot, 'proyectos-reglas/ia-infraestructura.md'),
    dest: path.join(infraestructuraRoot, '.agents/AGENTS.md')
  },
  {
    src: path.join(configuracionRoot, 'proyectos-reglas/proyectos-ia.md'),
    dest: path.join(proyectosRoot, '.agents/AGENTS.md')
  }
];

function fixEncoding(text) {
  return text
    .replace(/Ã¡/g, 'á')
    .replace(/Ã©/g, 'é')
    .replace(/Ã­/g, 'í')
    .replace(/Ã³/g, 'ó')
    .replace(/Ãº/g, 'ú')
    .replace(/Ã±/g, 'ñ')
    .replace(/Ã /g, 'Á')
    .replace(/Ã‰/g, 'É')
    .replace(/Ã /g, 'Í')
    .replace(/Ã“/g, 'Ó')
    .replace(/Ãš/g, 'Ú')
    .replace(/Ã‘/g, 'Ñ')
    .replace(/Â¡/g, '¡')
    .replace(/Â¿/g, '¿');
}

function sanitizeLocalFileLinks(text) {
  return text.replace(/\[([^\]]+)\]\(file:\/\/\/[^)]+\)/gi, (_, label) => {
    const trimmed = label.trim();
    return trimmed.startsWith('`') && trimmed.endsWith('`') ? trimmed : `\`${trimmed}\``;
  });
}

// Limpia emojis y pictogramas de encabezados Markdown (compatible 100% con audit-portal.js)
function cleanEmojisFromHeadings(body) {
  let insideFence = false;
  return sanitizeLocalFileLinks(body)
    .split('\n')
    .map(line => {
      if (line.trim().startsWith('```')) {
        insideFence = !insideFence;
        return line;
      }
      if (!insideFence && /^#{1,6}\s+/.test(line.trim())) {
        const trimmed = line.trim();
        const headerLevelMatch = trimmed.match(/^#+/);
        const headerLevel = headerLevelMatch ? headerLevelMatch[0] : '#';
        const headerText = trimmed.substring(headerLevel.length);

        let cleanText = headerText
          .replace(/\p{Extended_Pictographic}/gu, '')
          .replace(/\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu, '')
          .replace(/[\uFE0F\u200D\uE000-\uF8FF\u2100-\u27BF]/g, '');

        return `${headerLevel} ${cleanText.replace(/\s+/g, ' ').trim()}`;
      }
      return line;
    })
    .join('\n');
}

function purgeObsoleteMarkdownFiles(dirPath, validFilenamesSet) {
  if (!fs.existsSync(dirPath)) return;
  fs.readdirSync(dirPath).forEach(file => {
    if (file.endsWith('.md') && !validFilenamesSet.has(file)) {
      const fullPath = path.join(dirPath, file);
      fs.unlinkSync(fullPath);
      console.log(`Archivo obsoleto eliminado: ${fullPath}`);
    }
  });
}

function parseSkillMetadataAndBody(skillMdPath, fallbackName) {
  try {
    if (!fs.existsSync(skillMdPath)) {
      return {
        name: fallbackName,
        description: 'Sin descripción detallada.',
        body: 'No hay descripción de instrucciones para esta habilidad.'
      };
    }
    const rawContent = fs.readFileSync(skillMdPath, 'utf8');
    const content = fixEncoding(rawContent);
    const yamlRegex = /^---\r?\n([\s\S]+?)\r?\n---/;
    const match = content.match(yamlRegex);

    let name = fallbackName;
    let description = 'Sin descripción detallada.';
    let body = content;

    if (match) {
      const yamlBlock = match[1];
      body = content.replace(yamlRegex, '').trim();

      const lines = yamlBlock.split('\n');
      let currentKey = null;
      let currentValueLines = [];

      lines.forEach(line => {
        const keyMatch = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)/);
        if (keyMatch) {
          if (currentKey) {
            const finalVal = currentValueLines.join(' ').trim().replace(/^['"]|['"]$/g, '');
            if (currentKey === 'name') name = finalVal;
            if (currentKey === 'description') description = finalVal;
          }
          currentKey = keyMatch[1].trim().toLowerCase();
          const inlineVal = keyMatch[2].trim();
          currentValueLines = inlineVal === '>' ? [] : [inlineVal];
        } else if (currentKey) {
          currentValueLines.push(line.trim());
        }
      });

      if (currentKey) {
        const finalVal = currentValueLines.join(' ').trim().replace(/^['"]|['"]$/g, '');
        if (currentKey === 'name') name = finalVal;
        if (currentKey === 'description') description = finalVal;
      }
    }

    body = cleanEmojisFromHeadings(body);
    return { name, description, body };
  } catch (err) {
    console.error(`Error leyendo skill en ${skillMdPath}:`, err);
    return { name: fallbackName, description: 'Error al leer metadatos.', body: 'Error de lectura de archivo.' };
  }
}

// Detecta automáticamente proyectos físicos en IA_Proyectos/apps y apps/business-plans que falten en projects.json
function discoverUnregisteredProjects(projectsList) {
  const registeredNames = new Set(projectsList.map(p => p.name));
  const ignoredDirs = new Set(['business-plans', 'shared', 'node_modules', 'dist', 'build', 'scratch']);
  let addedAny = false;

  const scanRoots = [
    path.join(proyectosRoot, 'apps'),
    path.join(proyectosRoot, 'apps', 'business-plans')
  ];

  for (const scanRoot of scanRoots) {
    if (!fs.existsSync(scanRoot)) continue;
    for (const entry of fs.readdirSync(scanRoot)) {
      if (entry.startsWith('.') || entry.startsWith('_') || ignoredDirs.has(entry)) continue;
      if (registeredNames.has(entry)) continue;

      const folderPath = path.join(scanRoot, entry);
      if (!fs.statSync(folderPath).isDirectory()) continue;

      const pkgPath = path.join(folderPath, 'package.json');
      const readmePath = path.join(folderPath, 'README.md');
      const hasProjectMarkers =
        fs.existsSync(pkgPath) ||
        fs.existsSync(readmePath) ||
        fs.existsSync(path.join(folderPath, 'index.html')) ||
        fs.existsSync(path.join(folderPath, 'src', 'index.html')) ||
        fs.existsSync(path.join(folderPath, 'requirements.txt'));

      if (!hasProjectMarkers) continue;

      let detectedType = 'vanilla';
      let detectedDesc = 'Aplicación integrada automáticamente desde el monorepositorio Proyectos IA.';

      if (fs.existsSync(pkgPath)) {
        try {
          const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
          const deps = { ...pkg.dependencies, ...pkg.devDependencies };
          if (deps['@astrojs/starlight'] || deps.astro) detectedType = 'starlight';
          else if (deps.react) detectedType = 'react';
          else if (deps.vite) detectedType = 'vanilla';
          else detectedType = 'node';
          if (pkg.description) detectedDesc = pkg.description;
        } catch {
          // Ignorar errores de parseo de package.json
        }
      } else if (fs.existsSync(path.join(folderPath, 'requirements.txt'))) {
        detectedType = 'python';
      }

      if (fs.existsSync(readmePath)) {
        const lines = fixEncoding(fs.readFileSync(readmePath, 'utf8')).split(/\r?\n/);
        const firstParagraph = lines.find(
          l => l.trim() && !l.trim().startsWith('#') && !l.trim().startsWith('!') && !l.trim().startsWith('>')
        );
        if (firstParagraph) {
          detectedDesc = firstParagraph.replace(/\*\*/g, '').trim().slice(0, 220);
        }
      }

      const stat = fs.statSync(folderPath);
      const createdDate = (stat.birthtime || stat.mtime).toISOString().split('T')[0];

      const newEntry = {
        name: entry,
        title: entry,
        type: detectedType,
        description: detectedDesc,
        author: 'JoelJuana',
        createdAt: createdDate,
        hasPosts: fs.existsSync(path.join(folderPath, 'posts')),
        url: `./${entry}/`,
        publicUrl: null,
        tags: entry.startsWith('app-bp-') ? ['Finanzas', 'Business Plan'] : ['IA', detectedType]
      };

      projectsList.push(newEntry);
      registeredNames.add(entry);
      addedAny = true;
      console.log(`[Auto-Discovery] Nuevo proyecto detectado e incorporado a projects.json: ${entry}`);
    }
  }

  if (addedAny) {
    fs.writeFileSync(projectsJsonPath, JSON.stringify(projectsList, null, 2) + '\n', 'utf8');
  }
}

// Formatea el CHANGELOG.md individual de un subproyecto para anexarlo a su ficha técnica
function extractProjectChangelogSection(projectDir) {
  const clPath = path.join(projectDir, 'CHANGELOG.md');
  if (!fs.existsSync(clPath)) return '';

  const raw = fixEncoding(fs.readFileSync(clPath, 'utf8')).trim();
  if (!raw) return '';

  const lines = raw.split(/\r?\n/);
  const filteredLines = [];
  let skippedFirstH1 = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!skippedFirstH1 && /^#\s+/.test(trimmed)) {
      skippedFirstH1 = true;
      continue;
    }
    if (/^todos los cambios (relevantes|notables)/i.test(trimmed)) {
      continue;
    }
    // Bajar un nivel los encabezados H2/H3 para anidar bajo "## Historial de Versiones del Proyecto"
    if (/^#{2,5}\s+/.test(trimmed)) {
      filteredLines.push(`#${trimmed}`);
    } else {
      filteredLines.push(line);
    }
  }

  const cleaned = cleanEmojisFromHeadings(filteredLines.join('\n')).trim();
  if (!cleaned) return '';

  return `\n\n---\n\n## Historial de Versiones del Proyecto\n\n${cleaned}\n`;
}

// Extrae dinámicamente el inventario del Centro Editorial desde docs/editorial/catalog.js
function buildEditorialCatalogSection() {
  if (!fs.existsSync(editorialCatalogJsPath)) return '';

  try {
    const rawJs = fs.readFileSync(editorialCatalogJsPath, 'utf8');
    const metaMatch = rawJs.match(/window\.EDITORIAL_META\s*=\s*(\{[\s\S]*?\});/);
    const catMatch = rawJs.match(/window\.EDITORIAL_CATALOG\s*=\s*(\[[\s\S]*?\]);/);
    if (!catMatch) return '';

    const meta = metaMatch ? JSON.parse(metaMatch[1]) : {};
    const catalog = JSON.parse(catMatch[1]);
    if (!Array.isArray(catalog) || catalog.length === 0) return '';

    const sorted = [...catalog].sort((a, b) => (a.order || 99) - (b.order || 99));
    const lastSyncDate = meta.generatedAt ? meta.generatedAt.split('T')[0] : '-';

    let rows = '';
    for (const doc of sorted) {
      const buildDate = doc.lastBuiltAt ? doc.lastBuiltAt.split('T')[0] : doc.date || '-';
      const formats = doc.docxFile ? 'PDF + DOCX' : 'PDF + HTML';
      rows += `| **${doc.client || '-'}** | ${doc.title} | \`${doc.preset}\` | ${doc.pages} págs. (${formats}) | ${doc.status || 'Activo'} | ${buildDate} |\n`;
    }

    return `\n\n---\n\n## Catálogo Vivo de Publicaciones A4 (${meta.totalDocs || sorted.length} Documentos)\n\nInventario sincronizado automáticamente desde \`IA_Proyectos/docs/editorial/catalog.js\` (última compilación editorial: \`${lastSyncDate}\` · **${meta.totalPages || '-'} páginas A4** vectoriales · **${meta.totalDocx || 0} exportaciones Word**):\n\n| Cliente / Ámbito | Título del Documento | Preset | Extensión y Formatos | Estado | Compilado |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n${rows}`;
  } catch (err) {
    console.warn('Aviso al parsear docs/editorial/catalog.js:', err.message);
    return '';
  }
}

// 1. Sincronizar Catálogo de Proyectos, Aplicaciones y Suite Business Plans
function syncProjects() {
  console.log('Sincronizando catálogo de proyectos y fichas técnicas...');
  if (!fs.existsSync(projectsJsonPath)) {
    console.warn(`No se encontró el archivo ${projectsJsonPath}`);
    return;
  }

  const projects = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf8'));
  discoverUnregisteredProjects(projects);
  countProjects = projects.length;

  fs.mkdirSync(targetProyectosAppsDir, { recursive: true });
  fs.mkdirSync(targetProyectosBpDir, { recursive: true });

  const generalProjects = [];
  const businessPlans = [];
  const validAppFiles = new Set();
  const validBpFiles = new Set(['introduccion.md']);

  projects.forEach(p => {
    const isBp = p.name.startsWith('app-bp-');
    if (isBp) {
      businessPlans.push(p);
    } else {
      generalProjects.push(p);
    }

    let relativePath = '';
    let absolutePath = '';
    if (p.name === 'antigravity-joel') {
      relativePath = 'IA_Documentacion';
      absolutePath = documentacionRoot;
    } else if (p.name === 'centro-editorial') {
      relativePath = 'docs/editorial';
      absolutePath = path.join(proyectosRoot, 'docs', 'editorial');
    } else if (isBp) {
      relativePath = path.join('apps', 'business-plans', p.name);
      absolutePath = path.join(proyectosRoot, relativePath);
    } else {
      relativePath = path.join('apps', p.name);
      absolutePath = path.join(proyectosRoot, relativePath);
    }

    const readmePath = path.join(absolutePath, 'README.md');
    let docBody = '';
    if (fs.existsSync(readmePath)) {
      const rawContent = fs.readFileSync(readmePath, 'utf8');
      docBody = cleanEmojisFromHeadings(fixEncoding(rawContent));
    } else {
      docBody = `
No se encontró un archivo \`README.md\` local en el directorio del proyecto.

### Información del Registro
*   **Nombre**: \`${p.name}\`
*   **Tipo**: \`${p.type}\`
*   **Descripción**: ${p.description || 'Sin descripción.'}
*   **Fecha de creación**: ${p.createdAt || '-'}
*   **Autor**: ${p.author || 'JoelJuana'}
`;
    }

    // Inyección dinámica del catálogo A4 para centro-editorial y del CHANGELOG.md para apps de negocio
    if (p.name === 'centro-editorial') {
      docBody += buildEditorialCatalogSection();
    } else if (p.name !== 'antigravity-joel') {
      docBody += extractProjectChangelogSection(absolutePath);
    }

    const publicUrlMeta = p.publicUrl ? `\n*   **URL Pública**: [${p.publicUrl}](${p.publicUrl})` : '';
    const tagsMeta = Array.isArray(p.tags) && p.tags.length > 0 ? `\n*   **Etiquetas**: ${p.tags.map(t => `\`${t}\``).join(', ')}` : '';
    const titleMeta = p.title ? `\n*   **Nombre Comercial**: ${p.title}` : '';

    const repoDisplayPath = p.name === 'antigravity-joel'
      ? 'IA_Documentacion/'
      : `IA_Proyectos/${relativePath.replace(/\\/g, '/')}/`;

    const appFileContent = `---
title: "${p.name}"
description: "Ficha técnica y documentación de la aplicación ${p.title || p.name} (${p.name})."
---

*   **Ruta en repositorio**: \`${repoDisplayPath}\`${titleMeta}
*   **Tipo**: \`${p.type}\`
*   **Creado el**: ${p.createdAt || '-'}
*   **Autor**: ${p.author || 'JoelJuana'}${publicUrlMeta}${tagsMeta}

---

${docBody}
`;

    const filename = `${p.name}.md`;
    const targetDir = isBp ? targetProyectosBpDir : targetProyectosAppsDir;
    if (isBp) {
      validBpFiles.add(filename);
    } else {
      validAppFiles.add(filename);
    }

    const targetPath = path.join(targetDir, filename);
    fs.writeFileSync(targetPath, appFileContent, 'utf8');
    console.log(`Ficha sincronizada en: ${targetPath}`);
  });

  countGeneralApps = generalProjects.length;
  countBusinessPlans = businessPlans.length;

  purgeObsoleteMarkdownFiles(targetProyectosAppsDir, validAppFiles);
  purgeObsoleteMarkdownFiles(targetProyectosBpDir, validBpFiles);
  purgeObsoleteMarkdownFiles(path.dirname(targetProyectosMd), new Set(['arquitectura-monorepo.md', 'catalogo-general.md']));

  // Actualizar proyectos-ia/business-plans/introduccion.md dinámicamente
  let bpCards = '';
  let bpBullets = '';
  businessPlans.forEach(bp => {
    const displayTitle = bp.title ? `${bp.title}` : bp.name;
    bpCards += `  <a href="/proyectos-ia/business-plans/${bp.name}/" class="dashboard-card">\n    <span class="card-meta">${bp.name}</span>\n    <h3>${displayTitle}</h3>\n    <p>${bp.description}</p>\n  </a>\n`;
    const urlBadge = bp.publicUrl ? ` — [Producción](${bp.publicUrl})` : '';
    bpBullets += `*   **[${bp.name}](/proyectos-ia/business-plans/${bp.name}/)** (*${displayTitle}*): ${bp.description}${urlBadge}\n`;
  });

  const bpIntroContent = `---
title: Suite Business Plans
description: Vista general de la suite de simuladores y planes de negocio interactivos con fiscalidad avanzada y sincronización cloud.
sidebar:
  order: 1
---

La **Suite Business Plans** es un conjunto de aplicaciones de simulación financiera interactivas diseñadas para proyectar la rentabilidad, flujos de caja, fiscalidad AEAT y amortizaciones de diversos modelos de negocio e inversión patrimonial.

---

## Estructura General

Los simuladores de negocio comparten recursos de estilo y estándares arquitectónicos definidos en la habilidad [\`gestiona_business_plan\`](/agente/skills/gestiona_business_plan/):

*   **Ubicación en repositorio**: \`IA_Proyectos/apps/business-plans/\`
*   **Estilo Visual**: Tema oscuro/claro corporativo, tipografías modernas (Outfit/Inter), controles deslizantes fluidos y gráficos interactivos con Chart.js.
*   **Despliegue Granular**: Cada simulador se compila y despliega de forma individual en su propio canal/subdominio de Firebase Hosting Multisite.

---

## Simuladores Financieros Disponibles (${businessPlans.length})

Selecciona uno de los simuladores para consultar su ficha técnica e historial de versiones:

<div class="dashboard-grid">
${bpCards}</div>

${bpBullets}

---

## Desarrollo y Despliegue Individual

Para trabajar sobre un simulador específico sin recompilar toda la suite:

\`\`\`bash
cd apps/business-plans/<nombre-app>
npm install
npm run dev     # Entorno local interactivo
npm run build   # Compila únicamente el subproyecto activo
\`\`\`
`;
  fs.writeFileSync(path.join(targetProyectosBpDir, 'introduccion.md'), bpIntroContent, 'utf8');

  let tableRows = '';
  generalProjects.forEach(p => {
    const prodLink = p.publicUrl ? `[Enlace](${p.publicUrl})` : '-';
    tableRows += `| **[${p.name}](/proyectos-ia/apps/${p.name}/)** | \`${p.type}\` | ${p.description} | ${prodLink} | ${p.createdAt} |\n`;
  });

  if (businessPlans.length > 0) {
    const bpList = businessPlans.map(bp => `• **[${bp.name}](/proyectos-ia/business-plans/${bp.name}/)** (\`${bp.type}\`): ${bp.description}`).join('<br>');
    tableRows += `| **[Suite Business Plans](/proyectos-ia/business-plans/introduccion/)** | \`suite\` | Conjunto de ${businessPlans.length} simuladores financieros interactivos:<br>${bpList} | Multisite | - |\n`;
  }

  let detailSections = '';
  if (generalProjects.length > 0) {
    detailSections += `## Proyectos y Aplicaciones Generales (${generalProjects.length})\n\n`;
    generalProjects.forEach(p => {
      detailSections += `### [${p.name}](/proyectos-ia/apps/${p.name}/)\n`;
      detailSections += `*   **Tipo**: \`${p.type}\`\n`;
      detailSections += `*   **Propósito**: ${p.description}\n`;
      if (p.publicUrl) detailSections += `*   **Producción**: [${p.publicUrl}](${p.publicUrl})\n`;
      detailSections += `*   **Creado el**: ${p.createdAt}\n\n`;
    });
  }

  if (businessPlans.length > 0) {
    detailSections += `## Suite Business Plans — Simuladores Financieros (${businessPlans.length})\n\n`;
    detailSections += `Grupo de aplicaciones especializadas en análisis de viabilidad económica, fiscalidad y proyecciones patrimoniales.\n\n`;
    businessPlans.forEach(p => {
      detailSections += `### [${p.name}](/proyectos-ia/business-plans/${p.name}/)\n`;
      detailSections += `*   **Tipo**: \`${p.type}\`\n`;
      detailSections += `*   **Propósito**: ${p.description}\n`;
      if (p.publicUrl) detailSections += `*   **Producción**: [${p.publicUrl}](${p.publicUrl})\n`;
      detailSections += `*   **Creado el**: ${p.createdAt}\n\n`;
    });
  }

  const content = `---
title: Inventario de Proyectos
description: Listado oficial de todos los proyectos activos registrados en el monorepositorio Proyectos IA.
sidebar:
  order: 2
---

Este documento detalla el catálogo completo de **${projects.length} proyectos activos** registrados en el archivo central \`IA_Proyectos/projects.json\` (con detección automática de subcarpetas nuevas en \`apps/\` y \`apps/business-plans/\`).

---

## Tabla Resumen de Proyectos

| Nombre del Proyecto | Tipo | Descripción | Producción | Creado |
| :--- | :--- | :--- | :--- | :--- |
${tableRows}
---

${detailSections}`;

  fs.mkdirSync(path.dirname(targetProyectosMd), { recursive: true });
  fs.writeFileSync(targetProyectosMd, content, 'utf8');
  console.log(`Catálogo de proyectos guardado en: ${targetProyectosMd}`);
}

// Reconciliación bidireccional entre ~/.gemini/config/skills y IA_Configuracion/skills
function reconcileActiveSkillsIntoConfig() {
  const activeSkillsRoot = path.join(geminiActiveConfigRoot, 'skills');
  if (!fs.existsSync(activeSkillsRoot) || !fs.existsSync(skillsDir)) return;

  for (const item of fs.readdirSync(activeSkillsRoot)) {
    if (item.startsWith('.')) continue;
    const activeItemDir = path.join(activeSkillsRoot, item);
    if (!fs.statSync(activeItemDir).isDirectory()) continue;

    const activeSkillMd = path.join(activeItemDir, 'SKILL.md');
    if (!fs.existsSync(activeSkillMd)) continue;

    const repoItemDir = path.join(skillsDir, item);
    const repoSkillMd = path.join(repoItemDir, 'SKILL.md');

    if (!fs.existsSync(repoItemDir)) {
      fs.cpSync(activeItemDir, repoItemDir, { recursive: true, force: true });
      console.log(`[Auto-Sync Skills] Nueva skill detectada en ~/.gemini/config/skills e importada a IA_Configuracion: ${item}`);
    } else if (fs.existsSync(repoSkillMd)) {
      const activeStat = fs.statSync(activeSkillMd);
      const repoStat = fs.statSync(repoSkillMd);
      if (activeStat.mtimeMs > repoStat.mtimeMs + 2000) {
        const aTxt = fs.readFileSync(activeSkillMd, 'utf8').replace(/\r\n/g, '\n');
        const rTxt = fs.readFileSync(repoSkillMd, 'utf8').replace(/\r\n/g, '\n');
        if (aTxt !== rTxt) {
          fs.cpSync(activeItemDir, repoItemDir, { recursive: true, force: true });
          console.log(`[Auto-Sync Skills] Edición más reciente en ~/.gemini/config/skills sincronizada hacia IA_Configuracion: ${item}`);
        }
      }
    }
  }
}

// 2. Sincronizar Catálogo de Habilidades (Skills) Individuales y la Introducción
function syncSkills() {
  console.log('Sincronizando catálogo de skills (bidireccional)...');
  if (!fs.existsSync(skillsDir)) {
    console.warn(`No se encontró el directorio de skills en ${skillsDir}`);
    return;
  }

  reconcileActiveSkillsIntoConfig();
  fs.mkdirSync(targetSkillsDir, { recursive: true });

  const items = fs.readdirSync(skillsDir);
  const skillsList = [];
  const validFilenames = new Set(['introduccion.md']);

  items.forEach(item => {
    const itemPath = path.join(skillsDir, item);
    if (fs.statSync(itemPath).isDirectory() && !item.startsWith('.')) {
      const skillMdPath = path.join(itemPath, 'SKILL.md');
      const skillData = parseSkillMetadataAndBody(skillMdPath, item);

      skillsList.push({
        id: item,
        name: skillData.name,
        description: skillData.description
      });

      const filename = `${item}.md`;
      validFilenames.add(filename);

      const fileContent = `---
title: ${skillData.name}
description: "${skillData.description.replace(/"/g, "'")}"
---

*   **Ruta de Configuración**: \`IA_Configuracion/skills/${item}/SKILL.md\`

---

${skillData.body}
`;

      const targetPath = path.join(targetSkillsDir, filename);
      fs.writeFileSync(targetPath, fileContent, 'utf8');
      console.log(`Ficha de skill individual creada en: ${targetPath}`);

      // Sincronizar también al directorio activo de Antigravity (~/.gemini/config/skills/<item>) como carpeta física real
      try {
        const activeSkillDir = path.join(geminiActiveConfigRoot, 'skills', item);
        if (fs.existsSync(activeSkillDir)) {
          const lstat = fs.lstatSync(activeSkillDir);
          if (lstat.isSymbolicLink()) {
            fs.rmSync(activeSkillDir, { recursive: true, force: true });
          }
        }
        fs.cpSync(itemPath, activeSkillDir, { recursive: true, force: true });
      } catch (err) {
        console.warn(`Aviso al sincronizar skill activa ${item}:`, err.message);
      }
    }
  });

  purgeObsoleteMarkdownFiles(targetSkillsDir, validFilenames);

  countSkills = skillsList.length;
  skillsList.sort((a, b) => a.name.localeCompare(b.name));

  let cardsContent = '';
  skillsList.forEach(s => {
    cardsContent += `  <a href="/agente/skills/${s.id}/" class="dashboard-card">\n    <h3>${s.name}</h3>\n    <p>${s.description}</p>\n  </a>\n`;
  });

  const introContent = `---
title: Introducción a las Habilidades (Skills)
description: Guía de introducción técnica al catálogo de habilidades (skills) de la suite de agentes del monorepositorio.
template: doc
sidebar:
  order: 1
---

Las **Skills** (habilidades) son extensiones de automatización personalizadas que se configuran y mantienen de forma centralizada en el repositorio [\`IA_Configuracion\`](/configuracion/introduccion/) (\`IA_Configuracion/skills/\`) con sincronización bidireccional hacia \`~/.gemini/config/skills/\`.

Al compilar o ejecutar la publicación automática (\`npm run publish:auto\`), estas habilidades se propagan y documentan de inmediato en todo el ecosistema.

---

## Catálogo de Habilidades Activas (${countSkills})

Selecciona una de las habilidades en la barra lateral o a través de las siguientes tarjetas para consultar su propósito y manual de instrucciones detallado:

<div class="dashboard-grid">
${cardsContent}</div>
`;

  const targetIntroPath = path.join(targetSkillsDir, 'introduccion.md');
  fs.writeFileSync(targetIntroPath, introContent, 'utf8');
  console.log(`Archivo de introducción de skills autogenerado en: ${targetIntroPath}`);
}

// 3. Sincronizar Reglas Generales en el Portal y en ~/.gemini/config/AGENTS.md
function syncReglasDocumentacion() {
  console.log('Sincronizando reglas generales en el portal y en ~/.gemini/config...');
  const srcReglas = path.join(configuracionRoot, 'AGENTS.md');
  if (!fs.existsSync(srcReglas)) {
    console.warn(`No se encontró el archivo de reglas globales en ${srcReglas}`);
    return;
  }
  const rawContent = fs.readFileSync(srcReglas, 'utf8');
  const utf8Clean = fixEncoding(rawContent);
  const cleanContent = cleanEmojisFromHeadings(utf8Clean);

  // Propagar también a ~/.gemini/config/AGENTS.md para mantener alineadas las reglas activas del agente
  try {
    if (fs.existsSync(geminiActiveConfigRoot)) {
      fs.writeFileSync(path.join(geminiActiveConfigRoot, 'AGENTS.md'), utf8Clean, 'utf8');
    }
  } catch (err) {
    console.warn('Aviso al sincronizar ~/.gemini/config/AGENTS.md:', err.message);
  }

  const fileContent = `---
title: Reglas Generales del Agente
description: Directrices, estándares obligatorios de codificación, seguridad y comportamiento para agentes de IA que operan en este monorepositorio.
template: doc
tableOfContents: true
---

:::tip[Sincronización Automática]
Las reglas globales y específicas de agentes se configuran centralizadamente en el repositorio [\`IA_Configuracion\`](/configuracion/introduccion/). Cualquier cambio se propaga de forma automática a \`~/.gemini/config/AGENTS.md\` y a los directorios \`.agents/AGENTS.md\` de **IA_Proyectos**, **IA_Infraestructura** e **IA_Documentacion**.
:::

Este documento establece las reglas fundamentales que todo agente de IA debe seguir al trabajar en el ecosistema local. Estas normas garantizan seguridad, consistencia de código, publicación documental automática y optimización nativa ARM64.

---

${cleanContent}
`;

  fs.mkdirSync(path.dirname(targetReglasMd), { recursive: true });
  fs.writeFileSync(targetReglasMd, fileContent, 'utf8');
  console.log(`Reglas generales del agente actualizadas en: ${targetReglasMd}`);
}

// 4. Sincronizar Reglas Específicas (.agents/AGENTS.md) de los Proyectos
function syncProjectRules() {
  console.log('Sincronizando reglas específicas de agentes en los proyectos...');
  targetAgentsRules.forEach(rule => {
    if (!fs.existsSync(rule.src) || !fs.existsSync(path.dirname(path.dirname(rule.dest)))) {
      return;
    }
    const content = fs.readFileSync(rule.src, 'utf8');
    const fixedContent = fixEncoding(content);

    fs.mkdirSync(path.dirname(rule.dest), { recursive: true });
    fs.writeFileSync(rule.dest, fixedContent, 'utf8');
    console.log(`Reglas actualizadas en: ${rule.dest}`);
  });
}

// 5. Sincronizar Fichas de Infraestructura
function syncInfraestructura() {
  console.log('Sincronizando documentación de infraestructura...');
  if (!fs.existsSync(infraestructuraRoot)) {
    console.warn(`No se encontró el directorio de infraestructura en ${infraestructuraRoot}`);
    return;
  }

  fs.mkdirSync(targetInfraServiciosDir, { recursive: true });

  const items = fs.readdirSync(infraestructuraRoot);
  let localCountInfra = 0;
  const validInfraFiles = new Set();

  const serviceTitles = {
    'infra-gateway': 'Gateway (infra-gateway)',
    'infra-github': 'GitHub Service (infra-github)',
    'infra-firebase': 'Firebase Service (infra-firebase)',
    'infra-project-creator': 'Project Creator (infra-project-creator)',
    'infra-domain-manager': 'Domain Manager (infra-domain-manager)',
    'api-design-assets': 'Design Assets (api-design-assets)',
    'api-conocimiento-rag': 'Conocimiento y RAG (api-conocimiento-rag)',
    'api-utilidades-scraping': 'Scraping Utility (api-utilidades-scraping)'
  };

  items.forEach(item => {
    const itemPath = path.join(infraestructuraRoot, item);
    if (fs.statSync(itemPath).isDirectory() && !item.startsWith('.') && item !== 'packages' && item !== 'node_modules' && item !== 'scripts' && item !== 'tests') {
      const readmePath = path.join(itemPath, 'README.md');
      if (fs.existsSync(readmePath)) {
        const rawContent = fs.readFileSync(readmePath, 'utf8');
        const content = cleanEmojisFromHeadings(fixEncoding(rawContent));

        const title = serviceTitles[item] || item;
        const description = `Ficha técnica detallada del microservicio ${item}.`;

        const fileContent = `---
title: "${title}"
description: "${description}"
---

*   **Ruta en repositorio**: \`IA_Infraestructura/${item}/\`

---

${content}
`;

        const filename = `${item}.md`;
        validInfraFiles.add(filename);
        const targetPath = path.join(targetInfraServiciosDir, filename);
        fs.writeFileSync(targetPath, fileContent, 'utf8');
        console.log(`Ficha de servicio de infraestructura creada en: ${targetPath}`);
        localCountInfra++;
      }
    }
  });
  purgeObsoleteMarkdownFiles(targetInfraServiciosDir, validInfraFiles);
  purgeObsoleteMarkdownFiles(path.dirname(targetInfraServiciosDir), new Set(['introduccion.md']));
  countInfra = localCountInfra;
}

// 6. Sincronizar Fichas de Configuración del Agente (Plugins y Reglas)
function syncConfiguracion() {
  console.log('Sincronizando documentación de configuración...');
  if (!fs.existsSync(configuracionRoot)) {
    console.warn(`No se encontró el directorio de configuración en ${configuracionRoot}`);
    return;
  }

  fs.mkdirSync(targetConfiguracionDir, { recursive: true });
  fs.mkdirSync(targetConfigPluginsDir, { recursive: true });
  fs.mkdirSync(targetConfigReglasDir, { recursive: true });

  // A) Introducción
  const readmePath = path.join(configuracionRoot, 'README.md');
  if (fs.existsSync(readmePath)) {
    const rawContent = fs.readFileSync(readmePath, 'utf8');
    const content = cleanEmojisFromHeadings(fixEncoding(rawContent));
    const fileContent = `---
title: Introducción a la Configuración
description: Guía de introducción técnica al repositorio de configuración del agente de IA.
---

*   **Ruta en repositorio**: \`IA_Configuracion/\`

---

${content}
`;
    fs.writeFileSync(path.join(targetConfiguracionDir, 'introduccion.md'), fileContent, 'utf8');
  }

  // B) Instalación y Setup
  const installPath = path.join(configuracionRoot, 'install.ps1');
  if (fs.existsSync(installPath)) {
    const rawContent = fs.readFileSync(installPath, 'utf8');
    const content = fixEncoding(rawContent);
    const fileContent = `---
title: Instalación y Setup
description: Script de instalación y setup del entorno de los agentes.
---

El script \`install.ps1\` permite realizar la instalación y despliegue del repositorio de configuración de agentes de forma local en la máquina de desarrollo.

\`\`\`powershell
${content}
\`\`\`
`;
    fs.writeFileSync(path.join(targetConfiguracionDir, 'instalacion.md'), fileContent, 'utf8');
  }

  // C) Plugins Activos y En Reserva (ordenados: Activos primero)
  if (fs.existsSync(pluginsDir)) {
    const plugins = fs.readdirSync(pluginsDir);
    const parsedPlugins = [];
    const validPluginFiles = new Set();
    const validPluginDirs = new Set();

    plugins.forEach(p => {
      const pluginPath = path.join(pluginsDir, p);
      if (fs.statSync(pluginPath).isDirectory() && !p.startsWith('.')) {
        validPluginDirs.add(p);
        const pluginJsonPath = path.join(pluginPath, 'plugin.json');
        let pluginMeta = {};
        if (fs.existsSync(pluginJsonPath)) {
          try {
            pluginMeta = JSON.parse(fs.readFileSync(pluginJsonPath, 'utf8'));
          } catch {
            // Ignorar JSON malformado
          }
        }

        let docPath = path.join(pluginPath, 'README.md');
        let isEnabled = true;
        if (!fs.existsSync(docPath)) {
          docPath = path.join(pluginPath, 'SKILL.md');
        }
        if (!fs.existsSync(docPath)) {
          docPath = path.join(pluginPath, 'SKILL.md.disabled');
          isEnabled = false;
        }

        let description = pluginMeta.description ? fixEncoding(pluginMeta.description) : 'Sin descripción detallada.';
        let hasDetail = false;

        if (fs.existsSync(docPath)) {
          const parsed = parseSkillMetadataAndBody(docPath, p);
          if (description === 'Sin descripción detallada.' && parsed.description !== 'Sin descripción detallada.') {
            description = parsed.description;
          }
          hasDetail = true;

          const statusLabel = isEnabled ? 'Activo' : 'En reserva (`SKILL.md.disabled`)';
          const versionLabel = pluginMeta.version ? `v${pluginMeta.version}` : 'v1.0.0';

          const pluginContent = `---
title: Plugin "${p}"
description: "${description.replace(/"/g, "'")}"
---

*   **Ruta en repositorio**: \`IA_Configuracion/plugins/${p}/\`
*   **Versión**: \`${versionLabel}\`
*   **Estado**: ${statusLabel}

---

${parsed.body}
`;
          const filename = `${p}.md`;
          validPluginFiles.add(filename);
          const targetPath = path.join(targetConfigPluginsDir, filename);
          fs.writeFileSync(targetPath, pluginContent, 'utf8');
        }

        // Sincronizar plugin hacia ~/.gemini/config/plugins/<p>
        try {
          const activePluginDir = path.join(geminiActiveConfigRoot, 'plugins', p);
          fs.cpSync(pluginPath, activePluginDir, { recursive: true, force: true });
        } catch (err) {
          console.warn(`Aviso al sincronizar plugin ${p}:`, err.message);
        }

        parsedPlugins.push({
          id: p,
          isEnabled,
          hasDetail,
          description
        });
      }
    });

    // Purgar plugins obsoletos en ~/.gemini/config/plugins
    const activePluginsRoot = path.join(geminiActiveConfigRoot, 'plugins');
    if (fs.existsSync(activePluginsRoot)) {
      for (const existing of fs.readdirSync(activePluginsRoot)) {
        const full = path.join(activePluginsRoot, existing);
        if (fs.statSync(full).isDirectory() && !validPluginDirs.has(existing)) {
          fs.rmSync(full, { recursive: true, force: true });
        }
      }
    }

    purgeObsoleteMarkdownFiles(targetConfigPluginsDir, validPluginFiles);

    // Ordenar: Activos primero, luego alfabético
    parsedPlugins.sort((a, b) => {
      if (a.isEnabled !== b.isEnabled) return a.isEnabled ? -1 : 1;
      return a.id.localeCompare(b.id);
    });

    countActivePlugins = parsedPlugins.filter(p => p.isEnabled).length;
    countReservePlugins = parsedPlugins.filter(p => !p.isEnabled).length;

    let pluginsList = '';
    let activeCards = '';
    let reserveCards = '';

    parsedPlugins.forEach(p => {
      const link = p.hasDetail ? `/configuracion/plugins/${p.id}/` : '#';
      const stateText = p.isEnabled ? 'Activo' : 'En reserva';
      pluginsList += `| **[${p.id}](${link})** | \`${stateText}\` | ${p.description} |\n`;
      const cardHtml = `  <a href="${link}" class="dashboard-card">\n    <span class="card-meta">${stateText}</span>\n    <h3>${p.id}</h3>\n    <p>${p.description}</p>\n  </a>\n`;
      if (p.isEnabled) activeCards += cardHtml;
      else reserveCards += cardHtml;
    });

    const pluginsContent = `---
title: Plugins Activos y en Reserva
description: Catálogo completo de plugins de comportamiento y herramientas configurados para el agente (${countActivePlugins} activos y ${countReservePlugins} en reserva).
---

Los **Plugins** son módulos de comportamiento, reglas de estilo, sidecars o integraciones MCP que personalizan y amplían las capacidades de los agentes en el entorno de desarrollo.

---

## Plugins Activos (${countActivePlugins})

<div class="dashboard-grid">
${activeCards}</div>

---

## Plugins en Reserva (${countReservePlugins})

Módulos preservados con especificación \`SKILL.md.disabled\` listos para activarse bajo demanda sin consumir ventana de contexto en reposo:

<div class="dashboard-grid">
${reserveCards}</div>

---

## Tabla Resumen de Plugins (${countActivePlugins + countReservePlugins})

| Nombre del Plugin | Estado | Descripción |
| :--- | :--- | :--- |
${pluginsList}
`;
    fs.writeFileSync(path.join(targetConfiguracionDir, 'plugins-activos.md'), pluginsContent, 'utf8');
    console.log(`Catálogo de plugins sincronizado (${countActivePlugins} activos, ${countReservePlugins} en reserva).`);
  }

  // D) Reglas por Proyecto
  if (fs.existsSync(proyectosReglasDir)) {
    const reglas = fs.readdirSync(proyectosReglasDir);
    let reglasList = '';
    const validReglasFiles = new Set();

    reglas.forEach(r => {
      const reglaPath = path.join(proyectosReglasDir, r);
      if (fs.statSync(reglaPath).isFile() && r.endsWith('.md')) {
        validReglasFiles.add(r);
        const rawContent = fs.readFileSync(reglaPath, 'utf8');
        const content = cleanEmojisFromHeadings(fixEncoding(rawContent));
        const filename = path.basename(r, '.md');

        const serviceTitles = {
          'ia-documentacion': 'IA Documentación',
          'ia-infraestructura': 'IA Infraestructura',
          'proyectos-ia': 'Proyectos IA'
        };
        const title = serviceTitles[filename] || filename;

        const fileContent = `---
title: Reglas de "${title}"
description: Directrices y reglas obligatorias específicas del repositorio ${title}.
---

*   **Ruta en repositorio**: \`IA_Configuracion/proyectos-reglas/${r}\`

---

${content}
`;
        const targetPath = path.join(targetConfigReglasDir, r);
        fs.writeFileSync(targetPath, fileContent, 'utf8');
        reglasList += `*   **[Reglas de ${title}](/configuracion/reglas/${filename}/)**: Directrices para el espacio de trabajo de \`${filename}\`.\n`;
      }
    });

    purgeObsoleteMarkdownFiles(targetConfigReglasDir, validReglasFiles);

    const reglasIndexContent = `---
title: Reglas por Proyecto
description: Directrices específicas de comportamiento de agentes según el espacio de trabajo.
---

Cada repositorio o espacio de trabajo del monorepositorio cuenta con un conjunto de directrices operativas específicas en su archivo local \`.agents/AGENTS.md\`.

Estas directrices son auto-propagadas a partir de la configuración central del agente:

---

## Reglas del Ecosistema

${reglasList}
`;
    fs.writeFileSync(path.join(targetConfiguracionDir, 'reglas-por-proyecto.md'), reglasIndexContent, 'utf8');
  }
}

// 7. Sincronizar CHANGELOG / Bitácora de Cambios
function syncChangelog() {
  console.log('Sincronizando bitácora de cambios...');
  const changelogPath = path.join(documentacionRoot, 'CHANGELOG.md');
  if (!fs.existsSync(changelogPath)) {
    console.warn(`No se encontró el archivo CHANGELOG.md global en ${changelogPath}`);
    return;
  }

  const rawContent = fs.readFileSync(changelogPath, 'utf8');
  const content = cleanEmojisFromHeadings(fixEncoding(rawContent));

  const fileContent = `---
title: Bitácora de Cambios
description: Historial de actualizaciones, cambios y tareas completadas en la infraestructura y proyectos.
sidebar:
  order: 5
---

Este documento registra cronológicamente las actualizaciones, mejoras e intervenciones realizadas en el ecosistema de IA.

---

${content}
`;

  fs.mkdirSync(path.dirname(targetChangelogMd), { recursive: true });
  fs.writeFileSync(targetChangelogMd, fileContent, 'utf8');
  console.log(`Bitácora de cambios sincronizada en: ${targetChangelogMd}`);
}

// 8. Inyectar Estadísticas dinámicas reales y blindadas en index.md
function syncStats() {
  console.log('Inyectando estadísticas en la página de inicio...');
  if (!fs.existsSync(targetIndexMd)) {
    console.warn(`No se encontró el archivo ${targetIndexMd}`);
    return;
  }
  let content = fs.readFileSync(targetIndexMd, 'utf8');

  if (countProjects > 0) {
    content = content.replace(
      /(<h3>Proyectos Registrados<\/h3>\s*<p class="stat-number">).*?(<\/p>(?:\s*<span class="stat-sub">.*?<\/span>)?)/s,
      `$1${countProjects}</p>\n    <span class="stat-sub">${countGeneralApps} apps · ${countBusinessPlans} simuladores</span>`
    );
  }
  if (countSkills > 0) {
    content = content.replace(
      /(<h3>Skills de Agente<\/h3>\s*<p class="stat-number">).*?(<\/p>(?:\s*<span class="stat-sub">.*?<\/span>)?)/s,
      `$1${countSkills}</p>\n    <span class="stat-sub">Sincronización bidireccional</span>`
    );
  }
  if (countInfra > 0) {
    content = content.replace(
      /(<h3>Servicios de Infraestructura<\/h3>\s*<p class="stat-number">).*?(<\/p>(?:\s*<span class="stat-sub">.*?<\/span>)?)/s,
      `$1${countInfra}</p>\n    <span class="stat-sub">API Gateway :3000–3700</span>`
    );
  }
  if (countActivePlugins + countReservePlugins > 0) {
    content = content.replace(
      /(<h3>Plugins Activos<\/h3>\s*<p class="stat-number">).*?(<\/p>(?:\s*<span class="stat-sub">.*?<\/span>)?)/s,
      `$1${countActivePlugins}</p>\n    <span class="stat-sub">+${countReservePlugins} módulos en reserva</span>`
    );
  }

  fs.writeFileSync(targetIndexMd, content, 'utf8');
  console.log(
    `Estadísticas inyectadas en index.md -> Proyectos: ${countProjects} (${countGeneralApps}+${countBusinessPlans}), Skills: ${countSkills}, Infra: ${countInfra}, Plugins: ${countActivePlugins} activos (+${countReservePlugins} reserva)`
  );
}

function runAllSync() {
  syncProjects();
  syncSkills();
  syncReglasDocumentacion();
  syncProjectRules();
  syncInfraestructura();
  syncConfiguracion();
  syncChangelog();
  syncStats();
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const debouncedSync = debounce(() => {
  try {
    console.log('\n[Watch] Ejecutando re-sincronización de cambios...');
    runAllSync();
    console.log('[Watch] Sincronización finalizada con éxito.\n');
  } catch (err) {
    console.error('[Watch] Error durante la sincronización:', err);
  }
}, 350);

try {
  runAllSync();
  console.log('Sincronización de catálogos inicial finalizada con éxito.');
} catch (err) {
  console.error('Error durante la sincronización de catálogos:', err);
  process.exit(1);
}

// Modo de observación integral (--watch) sobre los 4 repositorios
if (process.argv.includes('--watch')) {
  console.log('\n[Watch] Modo de sincronización continua activo sobre los 4 repositorios...');

  const ignoredSegments = /(?:^|[\\/])(node_modules|\.git|dist|\.firebase|\.astro|preview)(?:[\\/]|$)/i;

  const watchTargets = [
    { targetPath: skillsDir, recursive: true, filter: null },
    { targetPath: pluginsDir, recursive: true, filter: null },
    { targetPath: proyectosReglasDir, recursive: true, filter: null },
    { targetPath: path.join(configuracionRoot, 'AGENTS.md'), recursive: false, filter: null },
    { targetPath: projectsJsonPath, recursive: false, filter: null },
    {
      targetPath: path.join(proyectosRoot, 'apps'),
      recursive: true,
      filter: f => /(?:README|CHANGELOG)\.md$|package\.json$/i.test(f)
    },
    {
      targetPath: path.join(proyectosRoot, 'docs', 'editorial'),
      recursive: false,
      filter: f => /(?:README\.md|catalog\.js)$/i.test(f)
    },
    {
      targetPath: infraestructuraRoot,
      recursive: true,
      filter: f => /README\.md$/i.test(f)
    },
    { targetPath: path.join(documentacionRoot, 'CHANGELOG.md'), recursive: false, filter: null }
  ];

  watchTargets.forEach(({ targetPath: p, recursive, filter }) => {
    if (fs.existsSync(p)) {
      fs.watch(p, { recursive }, (eventType, filename) => {
        if (!filename) return;
        const normalized = String(filename);
        if (ignoredSegments.test(normalized)) return;
        if (filter && !filter(normalized)) return;

        console.log(`[Watch] Cambio relevante detectado en: ${normalized} (${eventType})`);
        debouncedSync();
      });
    } else {
      console.warn(`[Watch] Ruta no encontrada para observar: ${p}`);
    }
  });
}
