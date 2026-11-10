import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log(`
  [ERROR] Argumentos insuficientes.
  Uso: node scripts/validate-doc.mjs <ruta-borrador-md> <categoria-tematica>

  Categorías válidas:
    - tutoriales             (Tutoriales prácticos de inicio)
    - guias                  (Guías de tareas paso a paso)
    - referencia             (Especificaciones de puertos, APIs y variables)
    - explicaciones          (Arquitectura y decisiones de diseño)
    - agente/reglas          (Directrices generales de la suite)
    - agente/skills          (Especificaciones de habilidades)
    - proyectos-ia           (Inventario y fichas de desarrollos)
    - infraestructura-local  (Red, puertos y servicios Gateway)
    - configuracion          (Entorno, plugins y reglas por proyecto)
`);
  process.exit(1);
}

const sourceFile = path.resolve(args[0]);
const category = args[1].trim().toLowerCase();

const validCategories = [
  'tutoriales',
  'guias',
  'referencia',
  'explicaciones',
  'agente/reglas',
  'agente/skills',
  'proyectos-ia',
  'infraestructura-local',
  'configuracion'
];

if (!validCategories.includes(category)) {
  console.error(`[ERROR] Categoría inválida: "${category}". Debe ser una de: ${validCategories.join(', ')}`);
  process.exit(1);
}

if (!fs.existsSync(sourceFile)) {
  console.error(`[ERROR] El archivo de origen no existe: ${sourceFile}`);
  process.exit(1);
}

console.log(`Iniciando auditoría del documento: ${path.basename(sourceFile)}`);
console.log(`Categoría objetivo del portal: ${category}\n`);

const content = fs.readFileSync(sourceFile, 'utf8');
const errors = [];
const warnings = [];

// 1. Validar Frontmatter
console.log('--- Checkpoint 1: Frontmatter ---');
const yamlRegex = /^---\r?\n([\s\S]+?)\r?\n---/;
const match = content.match(yamlRegex);
if (!match) {
  errors.push('No se encontró un bloque frontmatter válido delimitado por "---" al inicio del archivo.');
} else {
  const yaml = match[1];
  if (!/^\s*title\s*:\s*\S+/m.test(yaml)) {
    errors.push('El frontmatter no contiene la clave obligatoria "title" con valor.');
  }
  if (!/^\s*description\s*:\s*\S+/m.test(yaml)) {
    errors.push('El frontmatter no contiene la clave obligatoria "description" con valor.');
  }
}

// 2. Validar Estándar Libre de Emojis en Encabezados y Enlaces Locales
console.log('--- Checkpoint 2: Estándar Corporativo y Rutas ---');
const bodyNoCode = content
  .replace(/```[\s\S]*?```/g, '')
  .replace(/`[^`\r\n]+`/g, '');

bodyNoCode.split(/\r?\n/).forEach((line, idx) => {
  if (/^#{1,6}\s+/.test(line) && /\p{Extended_Pictographic}/u.test(line)) {
    errors.push(`Encabezado con emoji prohibido en línea ${idx + 1}: "${line.trim()}"`);
  }
});

if (/\]\(file:\/\/\//i.test(bodyNoCode)) {
  errors.push('Se detectó un enlace con protocolo local file:/// incompatible con producción web.');
}

// 3. Validar Seguridad (Cero credenciales en texto plano)
console.log('--- Checkpoint 3: Seguridad y Compliance ---');
const privateIpRegex = /\b(192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/;
const privateIpMatch = content.match(privateIpRegex);
if (privateIpMatch) {
  warnings.push(`Se detectó una posible IP privada local: "${privateIpMatch[0]}". Verifica que sea un placeholder seguro.`);
}

const sensitiveKeywords = [
  { name: 'API Key de Google / Firebase', regex: /\b(AIzaSy[A-Za-z0-9_-]{33})\b/ },
  { name: 'Token de GitHub', regex: /\b(gh[pousr]_[A-Za-z0-9]{36,})\b/ },
  { name: 'Clave / Contraseña explícita', regex: /(password|contraseña|pwd)\s*[:=]\s*['"]?([^\n'"]{4,})['"]?/i },
  { name: 'Token Secreto / API Key genérica', regex: /(secret_key|api_key|private_key|token)\s*[:=]\s*['"]?([A-Za-z0-9_-]{16,})['"]?/i }
];

sensitiveKeywords.forEach(kw => {
  const matchEx = content.match(kw.regex);
  if (matchEx) {
    const val = (matchEx[2] || matchEx[0]).toLowerCase();
    const isPlaceholder =
      val.startsWith('tu_') ||
      val.startsWith('your_') ||
      val.startsWith('ejemplo') ||
      val.startsWith('superpassword') ||
      val.includes('placeholder') ||
      val.includes('xxxx');
    if (!isPlaceholder) {
      errors.push(`Posible credencial expuesta (${kw.name}): "${matchEx[0]}".`);
    }
  }
});

// 4. Validar Estructura por Categoría
console.log('--- Checkpoint 4: Estructura del Contenido ---');
const body = match ? content.replace(yamlRegex, '') : content;

if (category === 'agente/reglas' && !/^[*-]|\d+\.\s/m.test(body)) {
  warnings.push('Las directrices operativas del agente deben organizarse en listas numeradas o con viñetas.');
}

if (category === 'agente/skills' && !/(disparador|trigger|habilidad|propósito|cuándo)/i.test(body)) {
  warnings.push('Se recomienda detallar explícitamente el disparador de lenguaje natural o propósito de la skill.');
}

if (category === 'proyectos-ia') {
  if (!/(react|vanilla|node|express|astro|firebase|tecnologías|vite)/i.test(body)) {
    warnings.push('Las fichas de proyectos deben especificar las tecnologías principales empleadas.');
  }
  if (!/(ruta|path|carpeta|directorio|repositorio)/i.test(body)) {
    warnings.push('Se recomienda especificar la ruta del proyecto dentro del monorepositorio.');
  }
}

if (category === 'infraestructura-local' && !/(puerto|\d{4}|api|gateway|dns|cname)/i.test(body)) {
  warnings.push('La documentación de infraestructura debe contener puertos de red o endpoints del Gateway.');
}

// 5. Reportar resultados y publicar
console.log('\n--- Reporte de Auditoría ---');

if (warnings.length > 0) {
  console.log('ADVERTENCIAS:');
  warnings.forEach(w => console.log(`  [WARN] ${w}`));
}

if (errors.length > 0) {
  console.error('\nERRORES DE CONFORMIDAD DETECTADOS:');
  errors.forEach(e => console.error(`  [ERR]  ${e}`));
  console.error('\nEl archivo ha sido rechazado. Corrige los errores anteriores antes de publicar.');
  process.exit(1);
}

console.log('\n[OK] Documento aprobado sin errores de conformidad críticos.');

const docsRoot = path.resolve(__dirname, '../src/docs/src/content/docs');
const isAlreadyInDocs = sourceFile.toLowerCase().startsWith(docsRoot.toLowerCase());

if (!isAlreadyInDocs) {
  const filename = path.basename(sourceFile);
  const targetDir = path.resolve(docsRoot, category);
  const targetPath = path.join(targetDir, filename);

  try {
    fs.mkdirSync(targetDir, { recursive: true });
    fs.copyFileSync(sourceFile, targetPath);
    console.log(`\nPublicación exitosa en: ${targetPath}`);
  } catch (err) {
    console.error(`[ERROR] Fallo al copiar el archivo para publicación:`, err);
    process.exit(1);
  }
}
