import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Rutas base relativas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workspaceRoot = path.resolve(__dirname, '../../../../Proyectos_IA');
const projectsJsonPath = path.join(workspaceRoot, 'projects.json');
const skillsDir = path.resolve('C:/Users/jjtei/.gemini/config/skills');

const targetProyectosMd = path.join(__dirname, '../src/content/docs/proyectos-ia/catalogo-general.md');
const targetSkillsDir = path.join(__dirname, '../src/content/docs/agente/skills');

// Función para limpiar emojis de los encabezados markdown (líneas que empiezan con #)
function cleanEmojisFromHeadings(body) {
  return body.split('\n').map(line => {
    if (line.trim().startsWith('#')) {
      const headerLevelMatch = line.match(/^#+/);
      const headerLevel = headerLevelMatch ? headerLevelMatch[0] : '#';
      const headerText = line.substring(headerLevel.length);
      
      // Remover emojis y símbolos decorativos comunes
      let cleanText = headerText.replace(/\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu, '');
      cleanText = cleanText.replace(/[\uE000-\uF8FF\u2100-\u27BF]/g, '');
      
      return `${headerLevel} ${cleanText.replace(/\s+/g, ' ').trim()}`;
    }
    return line;
  }).join('\n');
}

// Función para parsear el frontmatter YAML de las skills y extraer metadatos de forma robusta
function parseSkillMetadataAndBody(skillMdPath, fallbackName) {
  try {
    if (!fs.existsSync(skillMdPath)) {
      return { name: fallbackName, description: 'Sin descripción detallada.', body: 'No hay descripción de instrucciones para esta habilidad.' };
    }
    const content = fs.readFileSync(skillMdPath, 'utf8');
    const yamlRegex = /^---\r?\n([\s\S]+?)\r?\n---/;
    const match = content.match(yamlRegex);
    
    let name = fallbackName;
    let description = 'Sin descripción detallada.';
    let body = content;

    if (match) {
      const yamlBlock = match[1];
      body = content.replace(yamlRegex, '').trim(); // Cuerpo sin frontmatter

      const lines = yamlBlock.split('\n');
      let currentKey = null;
      let currentValueLines = [];

      lines.forEach(line => {
        // ¿Es una línea de clave-valor clásica? (ej. name: crea_proyecto o description: >)
        const keyMatch = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)/);
        if (keyMatch) {
          // Si ya estábamos procesando una clave anterior, guardarla
          if (currentKey) {
            const finalVal = currentValueLines.join(' ').trim().replace(/^['"]|['"]$/g, '');
            if (currentKey === 'name') name = finalVal;
            if (currentKey === 'description') description = finalVal;
          }
          currentKey = keyMatch[1].trim().toLowerCase();
          const inlineVal = keyMatch[2].trim();
          if (inlineVal === '>') {
            currentValueLines = [];
          } else {
            currentValueLines = [inlineVal];
          }
        } else {
          // Es una línea que continúa el valor de la clave anterior (multilínea indentada)
          if (currentKey) {
            currentValueLines.push(line.trim());
          }
        }
      });

      // Guardar la última clave procesada
      if (currentKey) {
        const finalVal = currentValueLines.join(' ').trim().replace(/^['"]|['"]$/g, '');
        if (currentKey === 'name') name = finalVal;
        if (currentKey === 'description') description = finalVal;
      }
    }

    // Sanitizar emojis del cuerpo antes de devolverlo
    body = cleanEmojisFromHeadings(body);

    return { name, description, body };
  } catch (err) {
    console.error(`Error leyendo skill en ${skillMdPath}:`, err);
    return { name: fallbackName, description: 'Error al leer metadatos.', body: 'Error de lectura de archivo.' };
  }
}

// 1. Sincronizar Catálogo de Proyectos
function syncProjects() {
  console.log('Sincronizando catálogo de proyectos...');
  if (!fs.existsSync(projectsJsonPath)) {
    console.warn(`No se encontró el archivo ${projectsJsonPath}`);
    return;
  }
  const projects = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf8'));

  // Construir tabla
  let tableRows = '';
  let detailSections = '';

  projects.forEach(p => {
    tableRows += `| **${p.name}** | \`${p.type}\` | ${p.description} | ${p.author} | ${p.createdAt} |\n`;

    detailSections += `### ${p.name}\n`;
    detailSections += `*   **Tipo**: \`${p.type}\`\n`;
    detailSections += `*   **Propósito**: ${p.description}\n`;
    detailSections += `*   **Creado el**: ${p.createdAt}\n`;
    detailSections += `*   **Autor**: ${p.author}\n\n`;
  });

  const content = `---
title: Inventario de Proyectos de IA
description: Listado oficial de todos los proyectos activos registrados en el monorepositorio Proyectos IA.
---

Este documento detalla el catálogo completo de proyectos activos y registrados en el archivo central [projects.json](file:///c:/Users/jjtei/Desktop/Proyectos_IA/projects.json) en la raíz del monorepositorio.

---

## Tabla Resumen de Proyectos

| Nombre del Proyecto | Tipo | Descripción | Autor | Creado |
| :--- | :--- | :--- | :--- | :--- |
${tableRows}
---

## Ficha de Proyectos Destacados

${detailSections}`;

  // Asegurar directorio destino
  fs.mkdirSync(path.dirname(targetProyectosMd), { recursive: true });
  fs.writeFileSync(targetProyectosMd, content, 'utf8');
  console.log(`Catálogo de proyectos guardado en: ${targetProyectosMd}`);
}

// 2. Sincronizar Catálogo de Habilidades (Skills) Individuales y la Introducción
function syncSkills() {
  console.log('Sincronizando catálogo de skills...');
  if (!fs.existsSync(skillsDir)) {
    console.warn(`No se encontró el directorio de skills en ${skillsDir}`);
    return;
  }

  // Limpiar carpeta de destino para no acumular archivos obsoletos (esta vez limpiamos todo para autogenerar introduccion)
  if (fs.existsSync(targetSkillsDir)) {
    fs.readdirSync(targetSkillsDir).forEach(file => {
      if (file.endsWith('.md')) {
        fs.unlinkSync(path.join(targetSkillsDir, file));
      }
    });
  } else {
    fs.mkdirSync(targetSkillsDir, { recursive: true });
  }

  const items = fs.readdirSync(skillsDir);
  const skillsList = [];

  items.forEach(item => {
    const itemPath = path.join(skillsDir, item);
    if (fs.statSync(itemPath).isDirectory() && !item.startsWith('.')) {
      const skillMdPath = path.join(itemPath, 'SKILL.md');
      const skillData = parseSkillMetadataAndBody(skillMdPath, item);

      // Guardar en la lista para la autogeneración de la introducción
      skillsList.push({
        id: item,
        name: skillData.name,
        description: skillData.description
      });

      // Crear el archivo Markdown Starlight para la skill individual
      const fileContent = `---
title: ${skillData.name}
description: ${skillData.description}
---

*   **Ruta de Configuración**: [\`.gemini/config/skills/${item}/\`](file:///C:/Users/jjtei/.gemini/config/skills/${item}/SKILL.md)

---

${skillData.body}
`;

      const targetPath = path.join(targetSkillsDir, `${item}.md`);
      fs.writeFileSync(targetPath, fileContent, 'utf8');
      console.log(`Ficha de skill individual creada en: ${targetPath}`);
    }
  });

  // Ordenar alfabéticamente las skills para el catálogo
  skillsList.sort((a, b) => a.name.localeCompare(b.name));

  // Generar introduccion.md dinámicamente con cuadrícula HTML nativa y clases CSS de custom.css
  let cardsContent = '';
  skillsList.forEach(s => {
    cardsContent += `  <a href="/agente/skills/${s.id}/" class="dashboard-card">\n    <h3>${s.name}</h3>\n    <p>${s.description}</p>\n  </a>\n`;
  });

  const introContent = `---
title: Introducción a las Habilidades (Skills)
description: Guía de introducción técnica al catálogo de habilidades (skills) de la suite de agentes del monorepositorio.
template: doc
sidebar:
  order: 1
---

Las **Skills** (habilidades) son extensiones de automatización personalizadas instaladas en el sistema de desarrollo global del agente de IA (\`C:\\Users\\jjtei\\.gemini\\config\\skills\\\`).

Permiten al agente interactuar con servicios locales y externos de forma autónoma basándose en disparadores de lenguaje natural.

---

## Catálogo de Habilidades Activas

Selecciona una de las habilidades en la barra lateral o a través de las siguientes tarjetas para consultar su propósito y manual de instrucciones detallado:

<div class="dashboard-grid">
${cardsContent}</div>
`;

  const targetIntroPath = path.join(targetSkillsDir, 'introduccion.md');
  fs.writeFileSync(targetIntroPath, introContent, 'utf8');
  console.log(`Archivo de introducción de skills autogenerado en: ${targetIntroPath}`);
}

// Ejecutar sincronización
try {
  syncProjects();
  syncSkills();
  console.log('Sincronización de catálogos finalizada con éxito.');
} catch (err) {
  console.error('Error durante la sincronización de catálogos:', err);
}

