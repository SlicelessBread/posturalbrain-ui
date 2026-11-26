// Builds components/<Comp>/preview.html.
// The source of a preview is examples/<Comp>.tsx when it exists: the React components of the package,
// rendered to static markup, so the page shows exactly what the package draws.
// Otherwise it is a hand-written fragment in design-system/previews/: the card marker on line 1 followed
// by markup, where {{icon:name}} inlines an icon from assets/Icone.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = 'design-system';
const ICONS = path.join(ROOT, 'project/assets/Icone');
const EXAMPLES = 'examples';
const FONTS = 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@700;800&family=Red+Hat+Text:wght@400;500;600&display=swap';

export function loadIcon(name) {
  const svg = fs.readFileSync(path.join(ICONS, `${name}.svg`), 'utf8');
  const inner = svg.replace(/<!--[\s\S]*?-->/g, '').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  return inner.replace(/\s*\n\s*/g, '').replace(/\s+\/>/g, '/>');
}

/** The page around a preview body: fonts, and the app ground unless the card is the bare cover. */
function wrap(marker, body, name) {
  const page = / page -->$/.test(marker);
  const bare = name === 'Cover'; // the cover paints its own ground, with no app chrome
  return `${marker}
<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${name}</title>
<link rel="stylesheet" href="${FONTS}">
</head>
<body${bare ? ' style="margin: 0"' : ` class="pb-app${page ? '' : ' pb-app--inline'}"`}>
${body}
</body>
</html>
`;
}

export function buildPreview(source, name, icon) {
  const [marker, ...rest] = source.replace(/\r\n/g, '\n').split('\n');
  const body = rest.join('\n').trim().replace(/\{\{icon:([a-z0-9-]+)(?::(sm|lg))?\}\}/g, (_, id, size) =>
    `<svg class="pb-icon${size ? ` pb-icon--${size}` : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon(id)}</svg>`);
  return wrap(marker, body, name);
}

/** The card marker of the Design System page, in the order its grammar expects. */
export function cardMarker({ group, height, width, subtitle, page } = {}) {
  const parts = ['@dsCard'];
  if (group) parts.push(`group="${String(group).replace(/"/g, '&quot;')}"`);
  if (height) parts.push(`height=${Number(height)}`);
  if (width) parts.push(`width=${Number(width)}`);
  if (subtitle) parts.push(`subtitle="${String(subtitle).replace(/"/g, '&quot;')}"`);
  if (page) parts.push('page');
  return `<!-- ${parts.join(' ')} -->`;
}

export const examplePath = (name) => path.join(EXAMPLES, `${name}.tsx`);
export const fragmentPath = (name) => path.join(ROOT, 'previews', `${name}.html`);
export const hasExample = (name) => fs.existsSync(examplePath(name));

/** Renders examples/<name>.tsx. Needs a TypeScript loader: run through `node --import tsx`. */
export async function buildFromExample(name) {
  const { createElement } = await import('react');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const example = await import(pathToFileURL(path.resolve(examplePath(name))).href);
  const script = example.script ? `\n<script>\n${example.script.trim()}\n</script>` : '';
  return wrap(cardMarker(example.card), renderToStaticMarkup(createElement(example.default)) + script, name);
}

/** The preview of a component from whichever source it has. */
export async function buildComponentPreview(name, icon = loadIcon) {
  return hasExample(name) ? buildFromExample(name) : buildPreview(fs.readFileSync(fragmentPath(name), 'utf8'), name, icon);
}

/** Every component that has a source, sorted. */
export function componentNames() {
  const list = (dir, ext) => (fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(ext)).map((f) => path.basename(f, ext)) : []);
  return [...new Set([...list(path.join(ROOT, 'previews'), '.html'), ...list(EXAMPLES, '.tsx')])].sort();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const lucide = process.env.LUCIDE_DIR; // optional: folder of lucide-static icons to copy missing ones from
  const icon = (id) => {
    const file = path.join(ICONS, `${id}.svg`);
    if (!fs.existsSync(file) && lucide) fs.copyFileSync(path.join(lucide, `${id}.svg`), file);
    return loadIcon(id);
  };
  const names = componentNames();
  for (const name of names) {
    const dir = path.join(ROOT, 'project/components', name);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'preview.html'), await buildComponentPreview(name, icon));
  }
  console.log(`built ${names.length} preview(s), ${names.filter(hasExample).length} from React examples`);
}
