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

    try {
      const payload = {
        title: title,
        content: body,
        metadata: {
          source: 'documentacion-ia',
          file: relativePath
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
        console.warn(`[WARN] Falló la indexación de: ${relativePath} (Status: ${response.status})`);
        failedCount++;
      }
    } catch (err) {
      console.error(`[ERROR] Excepción al indexar ${relativePath}:`, err.message);
      failedCount++;
    }
  }

  console.log(`\nSincronización RAG finalizada: ${indexedCount} indexados con éxito, ${failedCount} fallidos.\n`);
}

indexDocumentation();
