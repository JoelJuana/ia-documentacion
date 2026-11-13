import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(docsRoot, '../..');
const infraRoot = 'C:/Users/jjtei/Desktop/IA_Infraestructura';
const ragHealthUrl = 'http://127.0.0.1:3000/api/rag/';
const lockFilePath = path.join(docsRoot, '.auto-publish.lock');

const forcePublish = process.argv.includes('--force');
const skipGit = process.argv.includes('--no-git');
const skipDeploy = process.argv.includes('--no-deploy');

function acquireLock() {
  if (fs.existsSync(lockFilePath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(lockFilePath, 'utf8'));
      const ageMs = Date.now() - (existing.timestamp || 0);
      // Si el lock tiene menos de 5 minutos, otra publicación está en curso
      if (ageMs < 5 * 60 * 1000) {
        console.log(`[Auto-Publish] Otra publicación automática ya está en curso (PID ${existing.pid}). Omitiendo ejecución duplicada.`);
        process.exit(0);
      }
    } catch {
      // Continuar y regenerar lock obsoleto
    }
  }
  fs.writeFileSync(lockFilePath, JSON.stringify({ pid: process.pid, timestamp: Date.now() }), 'utf8');
}

function releaseLock() {
  try {
    if (fs.existsSync(lockFilePath)) {
      fs.unlinkSync(lockFilePath);
    }
  } catch {
    // Ignorar error de limpieza
  }
}

async function isRagOnline() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(ragHealthUrl, { signal: controller.signal });
    clearTimeout(timer);
    return res.ok;
  } catch {
    return false;
  }
}

async function waitForRagOnline(maxWaitMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    if (await isRagOnline()) return true;
    await new Promise(r => setTimeout(r, 1000));
  }
  return false;
}

function hasPendingDocChanges() {
  try {
    const out = execSync('git status --porcelain', { cwd: repoRoot, encoding: 'utf8' }).trim();
    if (!out) return false;
    const lines = out
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(l => l && !l.endsWith('.auto-publish.lock'));
    return lines.length > 0;
  } catch {
    return true;
  }
}

async function main() {
  acquireLock();
  let startedInfraHere = false;

  try {
    console.log('\n=== [Auto-Publish] Paso 1/5: Sincronizando catálogos del ecosistema ===');
    execSync('node scripts/sync-catalog.js', { cwd: docsRoot, stdio: 'inherit' });

    const changed = hasPendingDocChanges();
    if (!changed && !forcePublish) {
      console.log('\n[Auto-Publish] Sin cambios documentales pendientes respecto a la última versión publicada.');
      return;
    }

    console.log('\n=== [Auto-Publish] Paso 2/5: Auditando integridad del portal ===');
    execSync('node scripts/audit-portal.js', { cwd: docsRoot, stdio: 'inherit' });

    console.log('\n=== [Auto-Publish] Paso 3/5: Compilando Astro Starlight + Pagefind + Sitemap ===');
    execSync('npx astro build && node scripts/generate-sitemap.js', { cwd: docsRoot, stdio: 'inherit' });

    console.log('\n=== [Auto-Publish] Paso 4/5: Indexación incremental en RAG local (JIT) ===');
    const alreadyRunning = await isRagOnline();
    if (!alreadyRunning && fs.existsSync(infraRoot)) {
      console.log('[Auto-Publish] Gateway local en reposo; arrancando infraestructura en modo JIT...');
      execSync(`npm run start --prefix "${infraRoot}"`, { stdio: 'inherit' });
      startedInfraHere = true;
      await waitForRagOnline(20000);
    }

    execSync('node scripts/index-rag.js', { cwd: docsRoot, stdio: 'inherit' });

    if (!skipDeploy) {
      console.log('\n=== [Auto-Publish] Paso 5/5: Desplegando en Firebase Hosting (documentacion-ia) ===');
      execSync('node scripts/deploy-portal.js', { cwd: docsRoot, stdio: 'inherit' });
    }

    if (!skipGit) {
      console.log('\n=== [Auto-Publish] Versionando cambios documentales en GitHub ===');
      execSync('git add -A', { cwd: repoRoot, stdio: 'ignore' });
      const staged = execSync('git diff --cached --name-only', { cwd: repoRoot, encoding: 'utf8' }).trim();
      if (staged) {
        const today = new Date().toISOString().split('T')[0];
        execSync(`git commit -m "docs(auto-sync): actualizar catalogo y portal del ecosistema (${today})"`, {
          cwd: repoRoot,
          stdio: 'inherit'
        });
        execSync('git push origin main', { cwd: repoRoot, stdio: 'inherit' });
      }
    }

    console.log('\n[Auto-Publish] Publicación integral completada con éxito en https://antigravity.gironacc.com');
  } finally {
    if (startedInfraHere && fs.existsSync(infraRoot)) {
      console.log('\n[Auto-Publish] Apagando servicios de infraestructura arrancados en modo JIT...');
      try {
        execSync(`npm run stop --prefix "${infraRoot}"`, { stdio: 'inherit' });
      } catch (err) {
        console.warn('[Auto-Publish] Aviso al detener infraestructura:', err.message);
      }
    }
    releaseLock();
  }
}

main().catch(err => {
  releaseLock();
  console.error('\n[Auto-Publish ERROR]:', err.message);
  process.exit(1);
});
