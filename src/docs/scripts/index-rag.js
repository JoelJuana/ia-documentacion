import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsContentDir = path.resolve(__dirname, '../src/content/docs');
const manifestPath = path.resolve(__dirname, '../.rag-manifest.json');
const gatewayUrl = 'http://127.0.0.1:3000/api/rag';
const forceReindex = process.argv.includes('--force');

// Obtener recursivamente todos los archivos .md y .mdx
function getMarkdownFiles(dir, filesList = []) {
  if (!fs.existsSync(dir)) return filesList;
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getMarkdownFiles(filePath, filesList);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      filesList.push(filePath);
    }
  }
  return filesList;
}

// Elimina contenedores <div class="dashboard-grid">...</div> respetando el anidamiento de etiquetas <div>
function stripDashboardGrids(markdown) {
  let result = markdown;
  const openPattern = /<div\s+class=["']dashboard-grid["'][^>]*>/i;

  while (true) {
    const match = openPattern.exec(result);
    if (!match) break;

    const startIdx = match.index;
    let cursor = startIdx + match[0].length;
    let depth = 1;
    const divTagRegex = /<\/?div\b[^>]*>/gi;
    divTagRegex.lastIndex = cursor;

    let tagMatch;
    while ((tagMatch = divTagRegex.exec(result)) !== null) {
      if (tagMatch[0].startsWith('</')) {
        depth--;
      } else if (!tagMatch[0].endsWith('/>')) {
        depth++;
      }
      cursor = divTagRegex.lastIndex;
      if (depth === 0) break;
    }

    result = result.slice(0, startIdx) + result.slice(cursor);
  }

  return result.replace(/\n{3,}/g, '\n\n').trim();
}

// Extrae el título del frontmatter y devuelve el cuerpo limpio sin HTML decorativo
function extractTitleAndBody(rawContent, fallbackName) {
  const yamlRegex = /^---\r?\n([\s\S]+?)\r?\n---/;
  const match = rawContent.match(yamlRegex);

  let title = fallbackName;
  let body = rawContent;

  if (match) {
    const yamlBlock = match[1];
    body = rawContent.replace(yamlRegex, '').trim();

    for (const line of yamlBlock.split(/\r?\n/)) {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim().toLowerCase();
        const val = parts.slice(1).join(':').trim().replace(/^['"]|['"]$/g, '');
        if (key === 'title' && val) title = val;
      }
    }
  }

  return { title, body: stripDashboardGrids(body) };
}

// Dividir el markdown en secciones semánticas basadas en encabezados H2 y H3
function splitByHeadings(markdown) {
  const sectionRegex = /(?=^#{2,3} .+)/gm;
  return markdown.split(sectionRegex).filter(s => s.trim().length > 0);
}

// Dividir un texto en trozos con ventana deslizante y solapamiento
function splitBySize(text, maxChars = 1000, overlap = 150) {
  if (text.length <= maxChars) return [text];
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    let end = start + maxChars;
    if (end < text.length) {
      const nextSpace = text.indexOf(' ', end);
      if (nextSpace !== -1 && nextSpace - end < 30) {
        end = nextSpace;
      }
    }
    chunks.push(text.slice(start, end).trim());
    start = end - overlap;
    if (start >= text.length || end - start <= 0) break;
  }
  return chunks;
}

// Genera los chunks híbridos finales a partir del markdown limpio
function buildDocumentChunks(title, body, relativePath, urlSlug) {
  const sections = splitByHeadings(body);
  const payloads = [];

  for (const section of sections) {
    const headingMatch = section.match(/^#{2,3}\s+(.+)$/m);
    const heading = headingMatch ? headingMatch[0].trim() : '';
    const sizeChunks = splitBySize(section, 1000, 150);

    sizeChunks.forEach((chunkContent, index) => {
      let chunkTitle = title;
      if (heading) {
        chunkTitle += ` — ${heading.replace(/^#+\s+/, '')}`;
      }
      if (sizeChunks.length > 1) {
        chunkTitle += ` (${index + 1}/${sizeChunks.length})`;
      }

      payloads.push({
        title: chunkTitle,
        content: chunkContent,
        metadata: {
          source: 'documentacion-ia',
          file: relativePath,
          url: urlSlug,
          section: heading,
          chunk_index: index + 1,
          total_chunks: sizeChunks.length
        }
      });
    });
  }

  return payloads;
}

function sha256(content) {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

function loadManifest() {
  if (!fs.existsSync(manifestPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch {
    return {};
  }
}

function saveManifest(manifest) {
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
}

// Ejecuta tareas asíncronas con límite de concurrencia controlada
async function runWithConcurrency(items, limit, worker) {
  let idx = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (idx < items.length) {
      const current = items[idx++];
      await worker(current);
    }
  });
  await Promise.all(runners);
}

async function indexDocumentation() {
  console.log('\nIniciando sincronización incremental con el RAG local...');

  let remoteTotalDocs = 0;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const response = await fetch(`${gatewayUrl}/`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Gateway respondió con status ${response.status}`);
    }
    const statusJson = await response.json();
    remoteTotalDocs = statusJson?.data?.totalDocuments || 0;
  } catch {
    console.warn('\n[WARN] El servicio local api-conocimiento-rag (Gateway :3000) no responde.');
    console.warn('Saltando la indexación RAG de documentación para no interrumpir el build.\n');
    process.exit(0);
  }

  const prevManifest = loadManifest();
  const hasValidCache = !forceReindex && remoteTotalDocs > 0 && Object.keys(prevManifest).length > 0;

  if (!hasValidCache) {
    await fetch(`${gatewayUrl}/store`, { method: 'DELETE' });
    console.log(forceReindex
      ? 'Modo --force activo: Store de RAG restablecido para re-indexación completa.'
      : 'Caché inicial o store vacío: iniciando indexación base limpia.');
  }

  const mdFiles = getMarkdownFiles(docsContentDir);
  const nextManifest = {};
  const currentRelPaths = new Set();

  const titlesToDelete = [];
  const payloadsToIndex = [];
  let unchangedFiles = 0;
  let updatedFiles = 0;

  for (const filePath of mdFiles) {
    const relativePath = path.relative(docsContentDir, filePath).replace(/\\/g, '/');
    currentRelPaths.add(relativePath);

    const rawContent = fs.readFileSync(filePath, 'utf8');
    const hash = sha256(rawContent);
    const prevEntry = prevManifest[relativePath];

    if (hasValidCache && prevEntry && prevEntry.hash === hash) {
      nextManifest[relativePath] = prevEntry;
      unchangedFiles++;
      continue;
    }

    if (hasValidCache && prevEntry && Array.isArray(prevEntry.titles)) {
      titlesToDelete.push(...prevEntry.titles);
    }

    const urlSlug = relativePath === 'index.md'
      ? '/'
      : '/' + relativePath.replace(/\.(md|mdx)$/, '') + '/';
    const fallbackName = path.basename(filePath, path.extname(filePath));
    const { title, body } = extractTitleAndBody(rawContent, fallbackName);

    if (!body) {
      nextManifest[relativePath] = { hash, titles: [] };
      continue;
    }

    const docPayloads = buildDocumentChunks(title, body, relativePath, urlSlug);
    payloadsToIndex.push(...docPayloads);
    nextManifest[relativePath] = {
      hash,
      titles: docPayloads.map(p => p.title)
    };
    updatedFiles++;
  }

  // Detectar documentos eliminados desde la última compilación
  let removedFiles = 0;
  if (hasValidCache) {
    for (const [oldRelPath, oldEntry] of Object.entries(prevManifest)) {
      if (!currentRelPaths.has(oldRelPath)) {
        removedFiles++;
        if (Array.isArray(oldEntry.titles)) {
          titlesToDelete.push(...oldEntry.titles);
        }
      }
    }
  }

  // Purgar fragmentos previos de archivos modificados o eliminados
  if (titlesToDelete.length > 0) {
    await runWithConcurrency(titlesToDelete, 4, async (docTitle) => {
      try {
        await fetch(`${gatewayUrl}/documents/${encodeURIComponent(docTitle)}`, { method: 'DELETE' });
      } catch {
        // Ignorar si algún título ya no existía
      }
    });
  }

  // Indexar únicamente fragmentos nuevos o modificados con concurrencia controlada
  let indexedCount = 0;
  let failedCount = 0;

  if (payloadsToIndex.length > 0) {
    await runWithConcurrency(payloadsToIndex, 4, async (payload) => {
      try {
        const response = await fetch(`${gatewayUrl}/index`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          indexedCount++;
        } else {
          console.warn(`[WARN] Falló la indexación de "${payload.title}" (HTTP ${response.status})`);
          failedCount++;
        }
      } catch (err) {
        console.error(`[ERROR] Excepción al indexar "${payload.title}":`, err.message);
        failedCount++;
      }
    });
  }

  if (failedCount === 0) {
    saveManifest(nextManifest);
  }

  console.log(
    `[RAG Incremental] Total docs: ${mdFiles.length} | Actualizados: ${updatedFiles} | En caché (omitidos): ${unchangedFiles} | Eliminados: ${removedFiles} | Chunks enviados: ${indexedCount} | Fallidos: ${failedCount}\n`
  );
}

indexDocumentation();
