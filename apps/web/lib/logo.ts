import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { logoFiles } from './config';

// Returns the newest SVG in design/logos that starts with the named prefix from logoFiles.
// Server only: it reads the file system, in dev on every request and in a build once.
const logosDirectory = path.join(process.cwd(), '../../design/logos');

export function logoSource(name: keyof typeof logoFiles): string {
  const prefix = logoFiles[name];
  const files = readdirSync(logosDirectory)
    .filter((name) => name.startsWith(prefix) && name.toLowerCase().endsWith('.svg'))
    // numeric: v10 sorts after v9
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
  const latest = files.at(-1);
  if (!latest) throw new Error(`No ${prefix}*.svg logo found in ${logosDirectory}.`);

  // the embedded provenance block is large and not drawn
  const svg = readFileSync(path.join(logosDirectory, latest), 'utf8').replace(
    /<metadata>[\s\S]*?<\/metadata>/g,
    '',
  );
  // an image keeps the logo's own styles and ids from touching the page
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}
