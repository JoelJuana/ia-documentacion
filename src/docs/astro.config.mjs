// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	integrations: [
		starlight({
			title: 'Documentación IA',
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'Español',
					lang: 'es',
				},
			},
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.googleapis.com',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.gstatic.com',
						crossorigin: '',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap',
					},
				},
				{
					tag: 'script',
					attrs: {
						type: 'module',
					},
					content: `
						let mermaidInstance = null;

						function openMermaidModal(svgMarkup) {
							let modal = document.getElementById('mermaid-lightbox');
							if (!modal) {
								modal = document.createElement('div');
								modal.id = 'mermaid-lightbox';
								modal.className = 'mermaid-lightbox';
								modal.innerHTML = '<div class="mermaid-lightbox-backdrop"></div><div class="mermaid-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Diagrama ampliado"><button type="button" class="mermaid-lightbox-close">Cerrar (Esc)</button><div class="mermaid-lightbox-body"></div></div>';
								document.body.appendChild(modal);

								const close = () => modal.classList.remove('is-open');
								modal.querySelector('.mermaid-lightbox-backdrop')?.addEventListener('click', close);
								modal.querySelector('.mermaid-lightbox-close')?.addEventListener('click', close);
								document.addEventListener('keydown', (ev) => {
									if (ev.key === 'Escape' && modal.classList.contains('is-open')) close();
								});
							}

							const body = modal.querySelector('.mermaid-lightbox-body');
							if (body) body.innerHTML = svgMarkup;
							modal.classList.add('is-open');
						}

						async function renderMermaidDiagrams() {
							const codeBlocks = document.querySelectorAll('pre[data-language="mermaid"]');
							const existingDiagrams = document.querySelectorAll('.mermaid-diagram[data-mermaid-source]');
							if (!codeBlocks.length && !existingDiagrams.length) return;

							if (!mermaidInstance) {
								const mod = await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs');
								mermaidInstance = mod.default;
							}

							const isDark = document.documentElement.dataset.theme !== 'light';
							mermaidInstance.initialize({
								startOnLoad: false,
								theme: isDark ? 'dark' : 'neutral',
								fontFamily: 'Inter, system-ui, sans-serif',
							});

							for (const pre of codeBlocks) {
								const figure = pre.closest('.expressive-code') || pre;
								if (figure.dataset.mermaidProcessed === 'true') continue;
								const lines = Array.from(pre.querySelectorAll('.ec-line .code'));
								const source = (lines.length ? lines.map(l => l.textContent).join('\\n') : pre.textContent || '').trim();
								if (!source) continue;

								const container = document.createElement('div');
								container.className = 'mermaid-diagram not-content';
								container.dataset.mermaidSource = source;
								figure.dataset.mermaidProcessed = 'true';
								figure.replaceWith(container);
							}

							const diagrams = document.querySelectorAll('.mermaid-diagram[data-mermaid-source]');
							let idx = 0;
							for (const el of diagrams) {
								const src = el.dataset.mermaidSource;
								if (!src) continue;
								try {
									const id = 'mermaid-svg-' + Date.now() + '-' + (idx++);
									const { svg } = await mermaidInstance.render(id, src);
									el.innerHTML = '<button type="button" class="mermaid-zoom-btn" title="Ampliar diagrama">Ampliar</button><div class="mermaid-svg-wrap">' + svg + '</div>';
									el.querySelector('.mermaid-zoom-btn')?.addEventListener('click', () => openMermaidModal(svg));
								} catch (e) {
									console.warn('Error al renderizar diagrama Mermaid:', e);
								}
							}
						}

						if (document.readyState === 'loading') {
							document.addEventListener('DOMContentLoaded', renderMermaidDiagrams);
						} else {
							renderMermaidDiagrams();
						}

						const observer = new MutationObserver((mutations) => {
							for (const m of mutations) {
								if (m.attributeName === 'data-theme') {
									renderMermaidDiagrams();
									break;
								}
							}
						});
						observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
					`,
				},
			],
			customCss: [
				'./src/styles/custom.css',
			],
			tableOfContents: true,
			pagefind: true,

			sidebar: [
				// ── CUADRANTE DIÁTAXIS 1: Tutoriales ──
				{
					label: 'Tutoriales',
					autogenerate: { directory: 'tutoriales' },
				},

				// ── CUADRANTE DIÁTAXIS 2: Guías de Tareas ──
				{
					label: 'Guías de Tareas',
					autogenerate: { directory: 'guias' },
				},

				// ── CUADRANTE DIÁTAXIS 3: Referencia Técnica ──
				{
					label: 'Referencia Técnica',
					autogenerate: { directory: 'referencia' },
				},

				// ── CUADRANTE DIÁTAXIS 4: Explicaciones ──
				{
					label: 'Explicaciones y Arquitectura',
					autogenerate: { directory: 'explicaciones' },
				},

				// ── MÓDULO: Manual del Agente ──
				{
					label: 'Manual del Agente',
					items: [
						{
							label: 'Reglas y Directrices',
							slug: 'agente/reglas/reglas-y-directrices',
						},
						{
							label: 'Catálogo de Habilidades',
							autogenerate: { directory: 'agente/skills' },
							collapsed: false,
						},
					],
				},

				// ── MÓDULO: Proyectos de Negocio ──
				{
					label: 'Proyectos de Negocio',
					items: [
						{
							label: 'Visión General',
							items: [
								{ label: 'Arquitectura del Monorepo', slug: 'proyectos-ia/arquitectura-monorepo' },
								{ label: 'Inventario de Proyectos', slug: 'proyectos-ia/catalogo-general' },
							],
						},
						{
							label: 'Aplicaciones Generales',
							collapsed: true,
							autogenerate: { directory: 'proyectos-ia/apps' },
						},
						{
							label: 'Suite Business Plans',
							collapsed: true,
							autogenerate: { directory: 'proyectos-ia/business-plans' },
						},
					],
				},

				// ── MÓDULO: Infraestructura Local ──
				{
					label: 'Infraestructura Local',
					items: [
						{
							label: 'Visión General',
							items: [
								{ label: 'Arquitectura y Operación', slug: 'infraestructura-local/introduccion' },
								{ label: 'API Gateway', slug: 'infraestructura-local/servicios/infra-gateway' },
							],
						},
						{
							label: 'Servicios Core',
							collapsed: true,
							items: [
								{ label: 'GitHub', slug: 'infraestructura-local/servicios/infra-github' },
								{ label: 'Firebase', slug: 'infraestructura-local/servicios/infra-firebase' },
								{ label: 'Project Creator', slug: 'infraestructura-local/servicios/infra-project-creator' },
								{ label: 'Domain Manager', slug: 'infraestructura-local/servicios/infra-domain-manager' },
							],
						},
						{
							label: 'Servicios de Soporte',
							collapsed: true,
							items: [
								{ label: 'Design Assets', slug: 'infraestructura-local/servicios/api-design-assets' },
								{ label: 'Búsqueda RAG', slug: 'infraestructura-local/servicios/api-conocimiento-rag' },
								{ label: 'Scraping', slug: 'infraestructura-local/servicios/api-utilidades-scraping' },
							],
						},
					],
				},

				// ── MÓDULO: Configuración del Entorno ──
				{
					label: 'Configuración del Entorno',
					items: [
						{ label: 'Visión General', slug: 'configuracion/introduccion' },
						{ label: 'Instalación y Setup', slug: 'configuracion/instalacion' },
						{ label: 'Plugins Activos', slug: 'configuracion/plugins-activos' },
						{
							label: 'Detalle de Plugins',
							autogenerate: { directory: 'configuracion/plugins' },
							collapsed: true,
						},
						{ label: 'Reglas por Proyecto', slug: 'configuracion/reglas-por-proyecto' },
						{
							label: 'Detalle de Reglas',
							autogenerate: { directory: 'configuracion/reglas' },
							collapsed: true,
						},
					],
				},

				// ── MÓDULO: Historial ──
				{
					label: 'Historial',
					items: [
						{ label: 'Bitácora de Cambios', slug: 'historial/cambios' },
					],
				},
			],
		}),
	],
});
