import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsContentDir = path.resolve(__dirname, '../src/content/docs');
const manifestPath = path.resolve(__dirname, '../.rag-manifest.json');
const gatewayUrl = 'http://127.0.0.1:3000/api/rag';
const TARGET_COLLECTION = 'default';
const BATCH_SIZE = 120;
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

// Divide el markdown en secciones semánticas basadas en encabezados H1..H3 fusionando encabezados vacíos
function splitByHeadings(markdown) {
  const normalized = markdown.replace(/\r\n/g, '\n');
  const rawParts = normalized.split(/(?=^#{1,3} .+)/gm).filter((s) => s.trim().length > 0);
  const merged = [];
  let pendingHeaderPrefix = '';

  for (const part of rawParts) {
    const trimmed = part.trim();
    const lines = trimmed.split('\n');
    const firstLineIsHeading = /^#{1,3}\s+/.test(lines[0]);
    const restBody = firstLineIsHeading ? lines.slice(1).join('\n').trim() : trimmed;

    // Si la sección es únicamente un encabezado sin párrafo debajo, acumular para la siguiente subsección
    if (firstLineIsHeading && restBody.length < 15) {
      pendingHeaderPrefix = pendingHeaderPrefix ? `${pendingHeaderPrefix}\n${lines[0].trim()}` : lines[0].trim();
      continue;
    }

    const fullSection = pendingHeaderPrefix ? `${pendingHeaderPrefix}\n${trimmed}` : trimmed;
    pendingHeaderPrefix = '';
    merged.push(fullSection);
  }

  // Si todo el archivo era breve y quedó en pendingHeaderPrefix, conservarlo si supera 25 caracteres
  if (merged.length === 0 && pendingHeaderPrefix.length >= 25) {
    merged.push(pendingHeaderPrefix);
  }

  return merged;
}

// Dividir un texto en trozos con ventana deslizante y solapamiento
function splitBySize(text, maxChars = 1100, overlap = 150) {
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
    const headingMatches = [...section.matchAll(/^#{1,3}\s+(.+)$/gm)];
    const lastHeadingMatch = headingMatches.length > 0 ? headingMatches[headingMatches.length - 1] : null;
    const headingRaw = lastHeadingMatch ? lastHeadingMatch[0].trim() : '';
    const headingLabel = lastHeadingMatch ? lastHeadingMatch[1].trim() : '';
    const sizeChunks = splitBySize(section, 1100, 150);

    sizeChunks.forEach((chunkContent, index) => {
      if (chunkContent.trim().length < 20) return;

      let chunkTitle = title;
      if (headingLabel && headingLabel.toLowerCase() !== title.toLowerCase()) {
        chunkTitle += ` — ${headingLabel}`;
      }
      if (sizeChunks.length > 1) {
        chunkTitle += ` (${index + 1}/${sizeChunks.length})`;
      }

      payloads.push({
        collection: TARGET_COLLECTION,
        title: chunkTitle,
        content: chunkContent,
        metadata: {
          collection: TARGET_COLLECTION,
          source: 'documentacion-ia',
          file: relativePath,
          url: urlSlug,
          section: headingRaw,
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
  console.log(`\nIniciando sincronización incremental con el RAG local (colección '${TARGET_COLLECTION}')...`);

  let defaultCollectionDocs = 0;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const response = await fetch(`${gatewayUrl}/`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Gateway respondió con status ${response.status}`);
    }
    const statusJson = await response.json();
    const collections = Array.isArray(statusJson?.data?.collections) ? statusJson.data.collections : [];
    const defaultEntry = collections.find((c) => c.collection === TARGET_COLLECTION);
    defaultCollectionDocs = defaultEntry
      ? defaultEntry.documentsCount
      : (collections.length === 0 ? statusJson?.data?.totalDocuments || 0 : 0);
  } catch {
    console.warn('\n[WARN] El servicio local api-conocimiento-rag (Gateway :3000) no responde.');
    console.warn('Saltando la indexación RAG de documentación para no interrumpir el build.\n');
    process.exit(0);
  }

  const prevManifest = loadManifest();
  const hasValidCache = !forceReindex && defaultCollectionDocs > 0 && Object.keys(prevManifest).length > 0;

  if (!hasValidCache) {
    // Vaciar exclusivamente la colección 'default' preservando colecciones especializadas (ej. juridico-cccat)
    await fetch(`${gatewayUrl}/store?collection=${encodeURIComponent(TARGET_COLLECTION)}`, { method: 'DELETE' });
    console.log(forceReindex
      ? `Modo --force activo: Colección '${TARGET_COLLECTION}' restablecida (resto de colecciones intactas).`
      : `Caché inicial o colección '${TARGET_COLLECTION}' vacía: iniciando indexación base limpia.`);
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
      titles: docPayloads.map((p) => p.title)
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

  // Purgar fragmentos previos de archivos modificados o eliminados únicamente en 'default'
  if (titlesToDelete.length > 0) {
    await runWithConcurrency(titlesToDelete, 6, async (docTitle) => {
      try {
        await fetch(
          `${gatewayUrl}/documents/${encodeURIComponent(docTitle)}?collection=${encodeURIComponent(TARGET_COLLECTION)}`,
          { method: 'DELETE' }
        );
      } catch {
        // Ignorar si algún título ya no existía
      }
    });
  }

  // Indexar por lotes transaccionales (/index-batch) con fallback automático individual
  let indexedCount = 0;
  let failedCount = 0;

  if (payloadsToIndex.length > 0) {
    const batches = [];
    for (let i = 0; i < payloadsToIndex.length; i += BATCH_SIZE) {
      batches.push(payloadsToIndex.slice(i, i + BATCH_SIZE));
    }

    for (const batch of batches) {
      try {
        const batchRes = await fetch(`${gatewayUrl}/index-batch`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            collection: TARGET_COLLECTION,
            documents: batch
          })
        });

        if (batchRes.ok) {
          const json = await batchRes.json();
          indexedCount += json?.data?.documentsProcessed ?? batch.length;
          continue;
        }
      } catch {
        // Fallback a inserción unitaria si el servicio aún estuviera en versión anterior
      }

      await runWithConcurrency(batch, 4, async (payload) => {
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
  }

  if (failedCount === 0) {
    saveManifest(nextManifest);
  }

  console.log(
    `[RAG Incremental '${TARGET_COLLECTION}'] Total docs: ${mdFiles.length} | Actualizados: ${updatedFiles} | En caché (omitidos): ${unchangedFiles} | Eliminados: ${removedFiles} | Chunks enviados: ${indexedCount} | Fallidos: ${failedCount}\n`
  );
}

indexDocumentation();
