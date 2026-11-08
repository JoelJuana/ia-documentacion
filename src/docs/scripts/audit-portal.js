import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsDir = path.resolve(__dirname, '../src/content/docs');

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

function runPortalAudit() {
  const files = getMarkdownFiles(docsDir);
  const validSlugs = new Set(['/']);

  files.forEach(file => {
    const rel = path.relative(docsDir, file).replace(/\\/g, '/');
    const cleanSlug = rel === 'index.md'
      ? '/'
      : '/' + rel.replace(/\.(md|mdx)$/i, '').replace(/\/index$/i, '');
    validSlugs.add(cleanSlug.toLowerCase());
    validSlugs.add((cleanSlug + '/').toLowerCase());
  });

  let totalErrors = 0;
  let totalLinksChecked = 0;

  for (const file of files) {
    const rel = path.relative(docsDir, file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');

    // 1. Validar Frontmatter
    const yamlMatch = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
    if (!yamlMatch) {
      console.error(`[ERROR] Sin frontmatter YAML en: ${rel}`);
      totalErrors++;
    } else {
      const yaml = yamlMatch[1];
      if (!/^\s*title\s*:/m.test(yaml) || !/^\s*description\s*:/m.test(yaml)) {
        console.error(`[ERROR] Frontmatter incompleto (falta title o description) en: ${rel}`);
        totalErrors++;
      }
    }

    // Eliminar bloques de código triple backtick y spans de código inline para inspeccionar encabezados y enlaces reales
    const bodyWithoutCodeBlocks = content
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`\r\n]+`/g, '');

    // 2. Verificar que los encabezados H1-H6 no tengan emojis decorativos
    const lines = bodyWithoutCodeBlocks.split(/\r?\n/);
    lines.forEach((line, idx) => {
      if (/^#{1,6}\s+/.test(line)) {
        if (/\p{Extended_Pictographic}/u.test(line)) {
          console.error(`[ERROR] Emoji detectado en encabezado (${rel}:${idx + 1}): ${line.trim()}`);
          totalErrors++;
        }
      }
    });

    // 3. Validar enlaces internos (/ruta/...)
    const mdLinkRegex = /\[[^\]]*\]\((\/[^)#\s]+)(?:#[^)]*)?\)/g;
    const htmlHrefRegex = /href=["'](\/[^"'#\s]+)(?:#[^"']*)?["']/g;

    for (const regex of [mdLinkRegex, htmlHrefRegex]) {
      let match;
      while ((match = regex.exec(bodyWithoutCodeBlocks)) !== null) {
        const target = match[1].trim().toLowerCase();
        if (target.startsWith('/_astro/')) continue;
        totalLinksChecked++;
        if (!validSlugs.has(target)) {
          console.error(`[ERROR] Enlace interno roto en ${rel} -> ${match[1]}`);
          totalErrors++;
        }
      }
    }

    // 4. Validar ausencia de credenciales expuestas
    if (/\bAIzaSy[A-Za-z0-9_-]{33}\b/.test(content)) {
      console.error(`[ERROR] Posible clave API expuesta en: ${rel}`);
      totalErrors++;
    }
  }

  console.log(`\n[Auditoría Portal IA] Documentos verificados: ${files.length} | Enlaces internos validados: ${totalLinksChecked} | Errores: ${totalErrors}`);
  if (totalErrors > 0) {
    process.exit(1);
  }
}

runPortalAudit();
