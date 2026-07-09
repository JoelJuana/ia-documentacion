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
			components: {
				ThemeSelect: './src/components/Empty.astro',
			},
			customCss: [
				'./src/styles/custom.css',
			],
			tableOfContents: false,
			pagefind: false,

			sidebar: [
				{
					label: 'Directrices y Habilidades',
					items: [
						{
							label: 'Reglas Generales',
							autogenerate: { directory: 'agente/reglas' }
						},
						{
							label: 'Habilidades (Skills)',
							autogenerate: { directory: 'agente/skills' }
						}
					]
				},
				{
					label: 'Ecosistema de Proyectos (Proyectos IA)',
					autogenerate: { directory: 'proyectos-ia' }
				},
				{
					label: 'Infraestructura Local (IA Infraestructura)',
					autogenerate: { directory: 'infraestructura-local' }
				},
			],
		}),
	],
});
