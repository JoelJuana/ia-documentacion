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
