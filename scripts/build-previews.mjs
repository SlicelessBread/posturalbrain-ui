// Builds components/<Comp>/preview.html from the fragments in design-system/previews/.
// A fragment is the card marker on line 1 followed by the markup of the component;
// {{icon:name}} inlines an icon from assets/Icone so it inherits the text colour.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = 'design-system';
const ICONS = path.join(ROOT, 'project/assets/Icone');
const FONTS = 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@700;800&family=Red+Hat+Text:wght@400;500;600&display=swap';

export function loadIcon(name) {
  const svg = fs.readFileSync(path.join(ICONS, `${name}.svg`), 'utf8');
  const inner = svg.replace(/<!--[\s\S]*?-->/g, '').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  return inner.replace(/\s*\n\s*/g, '').replace(/\s+\/>/g, '/>');
}

export function buildPreview(source, name, icon) {
  const [marker, ...rest] = source.replace(/\r\n/g, '\n').split('\n');
  const body = rest.join('\n').trim().replace(/\{\{icon:([a-z0-9-]+)(?::(sm|lg))?\}\}/g, (_, id, size) =>
    `<svg class="pb-icon${size ? ` pb-icon--${size}` : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon(id)}</svg>`);
  const page = / page -->$/.test(marker);
  return `${marker}
<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${name}</title>
<link rel="stylesheet" href="${FONTS}">
</head>
<body class="pb-app${page ? '' : ' pb-app--inline'}">
${body}
</body>
</html>
`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const sources = path.join(ROOT, 'previews');
  const lucide = process.env.LUCIDE_DIR; // optional: folder of lucide-static icons to copy missing ones from
  const icon = (id) => {
    const file = path.join(ICONS, `${id}.svg`);
    if (!fs.existsSync(file) && lucide) fs.copyFileSync(path.join(lucide, `${id}.svg`), file);
    return loadIcon(id);
  };
  let count = 0;
  for (const file of fs.readdirSync(sources).filter((f) => f.endsWith('.html')).sort()) {
    const name = path.basename(file, '.html');
    const dir = path.join(ROOT, 'project/components', name);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'preview.html'), buildPreview(fs.readFileSync(path.join(sources, file), 'utf8'), name, icon));
    count += 1;
  }
  console.log(`built ${count} preview(s)`);
}
