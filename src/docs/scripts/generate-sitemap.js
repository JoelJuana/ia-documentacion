import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const SITE_ORIGIN = 'https://antigravity.gironacc.com';

function collectHtmlRoutes(dir, routes = []) {
  if (!fs.existsSync(dir)) return routes;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (entry === '_astro' || entry === 'pagefind') continue;
      collectHtmlRoutes(full, routes);
    } else if (entry === 'index.html') {
      const relDir = path.relative(distDir, path.dirname(full)).replace(/\\/g, '/');
      const route = relDir ? `/${relDir}/` : '/';
      if (route !== '/404/') {
        routes.push(route);
      }
    }
  }
  return routes;
}

const routes = collectHtmlRoutes(distDir).sort();
const lastmod = new Date().toISOString().split('T')[0];

const urlEntries = routes
  .map(r => `  <url>\n    <loc>${SITE_ORIGIN}${r}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8');
console.log(`[Sitemap SEO] Generados sitemap.xml (${routes.length} URLs) y robots.txt en dist/.`);
