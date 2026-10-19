import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Rutas base relativas para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validar argumentos de consola
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log(`
  ❌ Error: Argumentos insuficientes.
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
  console.error(`❌ Categoria inválida: "${category}". Debe ser una de: ${validCategories.join(', ')}`);
  process.exit(1);
}

if (!fs.existsSync(sourceFile)) {
  console.error(`❌ El archivo de origen no existe: ${sourceFile}`);
  process.exit(1);
}

console.log(`🔍 Iniciando auditoría del documento: ${path.basename(sourceFile)}`);
console.log(`📂 Categoría objetivo del portal: ${category}\n`);

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
  let hasTitle = false;
  let hasDesc = false;
  yaml.split('\n').forEach(line => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim().toLowerCase();
      if (key === 'title') hasTitle = true;
      if (key === 'description') hasDesc = true;
    }
  });

  if (!hasTitle) errors.push('El frontmatter no contiene la clave obligatoria "title".');
  if (!hasDesc) errors.push('El frontmatter no contiene la clave obligatoria "description".');
}

// 2. Validar Seguridad (Cero credenciales en texto plano)
console.log('--- Checkpoint 2: Seguridad y Compliance ---');
const privateIpRegex = /\b(192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/;
const privateIpMatch = content.match(privateIpRegex);
if (privateIpMatch) {
  warnings.push(`Se detectó una posible IP privada local: "${privateIpMatch[0]}". Asegura que no sea una IP crítica o expuesta.`);
}

const sensitiveKeywords = [
  { name: 'API Key de Google / Firebase', regex: /\b(AIzaSy[A-Za-z0-9_-]{33})\b/ },
  { name: 'Clave / Contraseña explícita', regex: /(password|contraseña|pwd)\s*[:=]\s*['"]?([^\n'"]{4,})['"]?/i },
  { name: 'Token Secreto / API Key genérica', regex: /(secret_key|api_key|private_key|token)\s*[:=]\s*['"]?([A-Za-z0-9_-]{16,})['"]?/i }
];

sensitiveKeywords.forEach(kw => {
  const matchEx = content.match(kw.regex);
  if (matchEx) {
    const val = (matchEx[2] || matchEx[0]).toLowerCase();
    const isPlaceholder = val.startsWith('tu_') || val.startsWith('your_') || val.startsWith('ejemplo') || val.includes('placeholder');
    if (!isPlaceholder) {
      errors.push(`¡Brecha de Seguridad! Se detectó un posible valor sensible expuesto (${kw.name}): "${matchEx[0]}".`);
    }
  }
});

// 3. Validar Estructura por Categoría
console.log('--- Checkpoint 3: Estructura del Contenido ---');
const body = match ? content.replace(yamlRegex, '') : content;

if (category === 'agente/reglas') {
  // Reglas del agente: Deben ser directrices organizadas
  const hasLists = /^[*-]|\d+\.\s/m.test(body);
  if (!hasLists) {
    warnings.push('Las directrices operativas del agente deben organizarse en listas numeradas o con viñetas.');
  }
}

if (category === 'agente/skills') {
  // Skills de IA: Deben describir disparadores o propósitos
  const hasTrigger = /(disparador|trigger|habilidad|propósito)/i.test(body);
  if (!hasTrigger) {
    warnings.push('Se recomienda detallar explícitamente el disparador de lenguaje natural (trigger) o propósito de la skill.');
  }
}

if (category === 'proyectos-ia') {
  // Proyectos de IA: Deben detallar rutas y tecnologías
  const hasTech = /(react|vanilla|node|express|astro|firebase|tecnologías)/i.test(body);
  if (!hasTech) {
    warnings.push('Las fichas de proyectos deben especificar las tecnologías principales empleadas (React, Astro, Node, etc.).');
  }
  const hasPath = /(ruta|path|carpeta|directorio)/i.test(body);
  if (!hasPath) {
    warnings.push('Se recomienda especificar la ruta o directorio físico del proyecto dentro del monorepositorio.');
  }
}

if (category === 'infraestructura-local') {
  // Infraestructura: Debe contener detalles de red, puertos o variables
  const hasPorts = /(puerto|\d{4}|api|gateway|dns|cname)/i.test(body);
  if (!hasPorts) {
    warnings.push('La documentación de infraestructura debe contener puertos de red (ej. 3000) o endpoints del Gateway.');
  }
}

// 4. Reportar resultados y publicar
console.log('\n--- 📊 Reporte de Auditoría ---');

if (warnings.length > 0) {
  console.log('⚠️ ADVERTENCIAS:');
  warnings.forEach(w => console.log(`  [WARN] ${w}`));
}

if (errors.length > 0) {
  console.error('\n❌ ERRORES DE CONFORMIDAD DETECTADOS:');
  errors.forEach(e => console.error(`  [ERR]  ${e}`));
  console.error('\nEl archivo ha sido rechazado. Corrige los errores anteriores para poder publicarlo.');
  process.exit(1);
} else {
  console.log('\n✅ ¡Documento aprobado sin errores de conformidad críticos!');
  
  const docsRoot = path.resolve(__dirname, '../src/docs/src/content/docs');
  const isAlreadyInDocs = sourceFile.toLowerCase().startsWith(docsRoot.toLowerCase());

  if (!isAlreadyInDocs) {
    // Publicar borrador externo en el directorio correspondiente de Astro
    const filename = path.basename(sourceFile);
    const targetDir = path.resolve(docsRoot, category);
    const targetPath = path.join(targetDir, filename);

    try {
      fs.mkdirSync(targetDir, { recursive: true });
      fs.copyFileSync(sourceFile, targetPath);
      console.log(`\n🎉 ¡Publicación exitosa! Documento copiado a:`);
      console.log(` 👉 ${targetPath}`);
    } catch (err) {
      console.error(`❌ Error al copiar el archivo para publicación:`, err);
      process.exit(1);
    }
  }
}
