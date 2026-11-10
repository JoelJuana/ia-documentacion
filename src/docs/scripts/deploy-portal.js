import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../..');
const distDir = path.resolve(__dirname, '../dist');
const gatewayFbConfigUrl = 'http://127.0.0.1:3000/api/fb/api/config';

async function deployPortal() {
  if (!fs.existsSync(distDir)) {
    console.error(`[ERROR] No existe el directorio compilado en ${distDir}. Ejecuta "npm run build" primero.`);
    process.exit(1);
  }

  // Consultar microservicio local infra-firebase vía API Gateway si está activo
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(gatewayFbConfigUrl, { signal: controller.signal });
    clearTimeout(timer);
    if (res.ok) {
      const cfg = await res.json();
      console.log(`[Gateway infra-firebase] Servicio detectado online (proyecto: ${cfg.projectId || 'protocolo-farmacia'}).`);
    }
  } catch {
    console.log('[Deploy] API Gateway local apagado; ejecutando despliegue directo con configuración Multisite oficial.');
  }

  console.log('\nPublicando portal en Firebase Hosting (canal Multisite: documentacion-ia)...');
  execSync('npx firebase-tools deploy --only hosting', {
    cwd: repoRoot,
    stdio: 'inherit'
  });
}

deployPortal();
