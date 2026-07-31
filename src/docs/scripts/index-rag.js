import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsContentDir = path.resolve(__dirname, '../src/content/docs');
const gatewayUrl = 'http://localhost:3000/api/rag';

// Función recursiva para obtener todos los archivos .md and .mdx
function getMarkdownFiles(dir, filesList = []) {
  if (!fs.existsSync(dir)) return filesList;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getMarkdownFiles(filePath, filesList);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      filesList.push(filePath);
    }
  });
  return filesList;
}

// Extrae el título del frontmatter de forma simple y devuelve el cuerpo limpio
function extractTitleAndBody(filePath, fallbackName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const yamlRegex = /^---\r?\n([\s\S]+?)\r?\n---/;
    const match = content.match(yamlRegex);
    
    let title = fallbackName;
    let body = content;

    if (match) {
      const yamlBlock = match[1];
      body = content.replace(yamlRegex, '').trim(); // Cuerpo sin frontmatter

      yamlBlock.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const key = parts[0].trim().toLowerCase();
          const val = parts.slice(1).join(':').trim().replace(/^['"]|['"]$/g, '');
          if (key === 'title') title = val;
        }
      });
    }

    return { title, body };
  } catch (err) {
    console.error(`Error leyendo archivo en ${filePath}:`, err);
    return { title: fallbackName, body: '' };
  }
}

// Dividir el markdown en secciones basadas en encabezados H2 y H3
function splitByHeadings(markdown) {
  const sectionRegex = /(?=^#{2,3} .+)/gm;
  return markdown.split(sectionRegex).filter(s => s.trim().length > 0);
}

// Dividir un texto en trozos con tamaño máximo y solapamiento
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

// Genera los chunks híbridos finales a partir del markdown completo
function getChunks(markdown, maxChars = 1000, overlap = 150) {
  const sections = splitByHeadings(markdown);
  const finalChunks = [];
  sections.forEach(section => {
    const headingMatch = section.match(/^#{2,3}\s+(.+)$/m);
    const heading = headingMatch ? headingMatch[0].trim() : '';
    
    const sizeChunks = splitBySize(section, maxChars, overlap);
    sizeChunks.forEach((chunk, index) => {
      finalChunks.push({
        content: chunk,
        section: heading,
        chunkIndex: index + 1,
        totalChunks: sizeChunks.length
      });
    });
  });
  return finalChunks;
}

async function indexDocumentation() {
  console.log('\nIniciando indexación de documentación en el RAG local...');

  // 1. Comprobar si el Gateway RAG está disponible
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch(`${gatewayUrl}/`, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Gateway respondió con status ${response.status}`);
    }
  } catch (err) {
    console.warn('\n[WARN] El servicio local api-conocimiento-rag (puerto 3600 / Gateway 3000) no responde.');
    console.warn('Saltando la indexación RAG de documentación para no interrumpir el build.\n');
    process.exit(0);
  }

  // 2. Escanear y recopilar todos los documentos Markdown
  const mdFiles = getMarkdownFiles(docsContentDir);
  console.log(`Se encontraron ${mdFiles.length} documentos para indexar.`);

  let indexedCount = 0;
  let failedCount = 0;

  for (const filePath of mdFiles) {
    const relativePath = path.relative(docsContentDir, filePath).replace(/\\/g, '/');
    const fallbackName = path.basename(filePath, path.extname(filePath));
    const { title, body } = extractTitleAndBody(filePath, fallbackName);

    if (!body || body.trim().length === 0) {
      continue;
    }

    const chunks = getChunks(body, 1000, 150);

    for (const chunk of chunks) {
      try {
        let chunkTitle = title;
        if (chunk.section) {
          chunkTitle += ` — ${chunk.section.replace(/^#+\s+/, '')}`;
        }
        if (chunk.totalChunks > 1) {
          chunkTitle += ` (${chunk.chunkIndex}/${chunk.totalChunks})`;
        }

        const payload = {
          title: chunkTitle,
          content: chunk.content,
          metadata: {
            source: 'documentacion-ia',
            file: relativePath,
            section: chunk.section,
            chunk_index: chunk.chunkIndex,
            total_chunks: chunk.totalChunks
          }
        };

        const response = await fetch(`${gatewayUrl}/index`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          indexedCount++;
        } else {
          console.warn(`[WARN] Falló la indexación del chunk de: ${relativePath} (Status: ${response.status})`);
          failedCount++;
        }
      } catch (err) {
        console.error(`[ERROR] Excepción al indexar chunk de ${relativePath}:`, err.message);
        failedCount++;
      }
    }
  }

  console.log(`\nSincronización RAG finalizada: ${indexedCount} indexados con éxito, ${failedCount} fallidos.\n`);
}

indexDocumentation();
