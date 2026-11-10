import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsDir = path.resolve(__dirname, '../src/content/docs');
const publicDir = path.resolve(__dirname, '../public');

const VALID_MERMAID_HEADERS = /^(flowchart|graph|sequenceDiagram|stateDiagram(?:-v2)?|classDiagram|erDiagram|xychart-beta|pie|gantt|journey|mindmap|timeline)\b/;

function getMarkdownFiles(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      getMarkdownFiles(full, list);
    } else if (entry.endsWith('.md') || entry.endsWith('.mdx')) {
      list.push(full);
    }
  }
  return list;
}

// Genera variantes de slug de encabezado compatibles con GitHub/Astro Starlight (con y sin tildes)
function generateHeadingSlugs(rawHeading) {
  const clean = rawHeading
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~]/g, '')
    .trim()
    .toLowerCase();

  const withAccents = clean
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');

  const withoutAccents = withAccents
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return [withAccents, withoutAccents].filter(Boolean);
}

function normalizeRouteSlug(relPath) {
  return relPath === 'index.md'
    ? '/'
    : '/' + relPath.replace(/\.(md|mdx)$/i, '').replace(/\/index$/i, '');
}

function runPortalAudit() {
  const files = getMarkdownFiles(docsDir);
  const validSlugs = new Set(['/']);
  const pageAnchors = new Map();

  // Fase 1: Indexar rutas válidas y anclas de encabezados de cada documento
  for (const file of files) {
    const rel = path.relative(docsDir, file).replace(/\\/g, '/');
    const cleanSlug = normalizeRouteSlug(rel).toLowerCase();
    const withSlash = cleanSlug === '/' ? '/' : `${cleanSlug}/`;

    validSlugs.add(cleanSlug);
    validSlugs.add(withSlash);

    const content = fs.readFileSync(file, 'utf8');
    const bodyNoCode = content.replace(/```[\s\S]*?```/g, '');
    const anchors = new Set();

    const yamlMatch = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
    if (yamlMatch) {
      const titleMatch = yamlMatch[1].match(/^\s*title\s*:\s*(.+)$/m);
      if (titleMatch) {
        generateHeadingSlugs(titleMatch[1].replace(/^['"]|['"]$/g, '')).forEach(s => anchors.add(s));
      }
    }

    for (const line of bodyNoCode.split(/\r?\n/)) {
      const hMatch = line.match(/^#{1,6}\s+(.+)$/);
      if (hMatch) {
        generateHeadingSlugs(hMatch[1]).forEach(s => anchors.add(s));
      }
    }

    pageAnchors.set(cleanSlug, anchors);
    pageAnchors.set(withSlash, anchors);
  }

  let totalErrors = 0;
  let totalLinksChecked = 0;
  let totalMermaidChecked = 0;

  // Fase 2: Auditar cada documento en profundidad
  for (const file of files) {
    const rel = path.relative(docsDir, file).replace(/\\/g, '/');
    const currentSlug = normalizeRouteSlug(rel).toLowerCase();
    const content = fs.readFileSync(file, 'utf8');

    // 1. Validar Frontmatter YAML
    const yamlMatch = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
    if (!yamlMatch) {
      console.error(`[ERROR] Sin frontmatter YAML en: ${rel}`);
      totalErrors++;
    } else {
      const yaml = yamlMatch[1];
      if (!/^\s*title\s*:\s*\S+/m.test(yaml) || !/^\s*description\s*:\s*\S+/m.test(yaml)) {
        console.error(`[ERROR] Frontmatter incompleto (falta title o description con valor) en: ${rel}`);
        totalErrors++;
      }
    }

    // 2. Validar bloques Mermaid antes de filtrarlos
    const mermaidRegex = /```mermaid\r?\n([\s\S]*?)```/g;
    let mMatch;
    while ((mMatch = mermaidRegex.exec(content)) !== null) {
      totalMermaidChecked++;
      const diagramSrc = mMatch[1].trim();
      const firstMeaningfulLine = diagramSrc
        .split(/\r?\n/)
        .map(l => l.trim())
        .find(l => l && !l.startsWith('%%'));

      if (!firstMeaningfulLine || !VALID_MERMAID_HEADERS.test(firstMeaningfulLine)) {
        console.error(`[ERROR] Bloque Mermaid inválido o vacío en ${rel}: "${firstMeaningfulLine || 'vacío'}"`);
        totalErrors++;
      }
    }

    // Eliminar bloques de código y spans inline para auditar encabezados y enlaces reales
    const bodyWithoutCodeBlocks = content
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`\r\n]+`/g, '');

    // 3. Verificar que los encabezados H1-H6 estén 100% libres de emojis decorativos
    const lines = bodyWithoutCodeBlocks.split(/\r?\n/);
    lines.forEach((line, idx) => {
      if (/^#{1,6}\s+/.test(line) && /\p{Extended_Pictographic}/u.test(line)) {
        console.error(`[ERROR] Emoji detectado en encabezado (${rel}:${idx + 1}): ${line.trim()}`);
        totalErrors++;
      }
    });

    // 4. Prohibir enlaces file:/// rotos en producción
    if (/\]\(file:\/\/\//i.test(bodyWithoutCodeBlocks) || /href=["']file:\/\/\//i.test(bodyWithoutCodeBlocks)) {
      console.error(`[ERROR] Enlace local file:/// expuesto en documento público: ${rel}`);
      totalErrors++;
    }

    // 5. Validar enlaces internos (/ruta/...) y sus anclas (#seccion)
    const mdLinkRegex = /!?\[[^\]]*\]\((\/[^)#\s]*)(?:#([^)\s]+))?\)/g;
    const htmlHrefRegex = /(?:href|src)=["'](\/[^"'#\s]*)(?:#([^"'\s]+))?["']/g;

    for (const regex of [mdLinkRegex, htmlHrefRegex]) {
      let match;
      while ((match = regex.exec(bodyWithoutCodeBlocks)) !== null) {
        const rawPath = (match[1] || '').trim();
        const rawAnchor = (match[2] || '').trim();
        const targetPath = (rawPath || currentSlug).toLowerCase();

        if (targetPath.startsWith('/_astro/')) continue;

        // Si parece un asset estático con extensión en public/
        if (/\.(svg|png|jpe?g|webp|gif|pdf|ico)$/i.test(targetPath)) {
          const assetFile = path.join(publicDir, targetPath.replace(/^\//, ''));
          if (!fs.existsSync(assetFile)) {
            console.error(`[ERROR] Recurso estático no encontrado en ${rel} -> ${rawPath}`);
            totalErrors++;
          }
          continue;
        }

        totalLinksChecked++;
        if (!validSlugs.has(targetPath)) {
          console.error(`[ERROR] Enlace interno roto en ${rel} -> ${rawPath}`);
          totalErrors++;
          continue;
        }

        if (rawAnchor) {
          const decodedAnchor = decodeURIComponent(rawAnchor).toLowerCase();
          const normalizedAnchor = decodedAnchor.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          const anchorsSet = pageAnchors.get(targetPath);
          if (anchorsSet && !anchorsSet.has(decodedAnchor) && !anchorsSet.has(normalizedAnchor)) {
            console.error(`[ERROR] Ancla interna inexistente en ${rel} -> ${rawPath}#${rawAnchor}`);
            totalErrors++;
          }
        }
      }
    }

    // 6. Detección ampliada de credenciales y claves privadas expuestas
    const secretPatterns = [
      { label: 'Google/Firebase API Key', regex: /\bAIzaSy[A-Za-z0-9_-]{33}\b/ },
      { label: 'GitHub Personal Token', regex: /\bgh[pousr]_[A-Za-z0-9]{36,}\b/ },
      { label: 'Private Key PEM', regex: /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----/ }
    ];

    for (const sp of secretPatterns) {
      if (sp.regex.test(content)) {
        console.error(`[ERROR] Secreto expuesto (${sp.label}) en: ${rel}`);
        totalErrors++;
      }
    }
  }

  console.log(
    `\n[Auditoría Portal IA] Documentos: ${files.length} | Enlaces validados: ${totalLinksChecked} | Diagramas Mermaid: ${totalMermaidChecked} | Errores: ${totalErrors}`
  );

  if (totalErrors > 0) {
    process.exit(1);
  }
}

runPortalAudit();
