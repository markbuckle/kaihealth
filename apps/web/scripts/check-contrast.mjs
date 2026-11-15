// Reports WCAG AA contrast for text and background role pairs in design/tokens/tokens.css.
// It only reports: the exit code is always 0, so it never blocks a build.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const tokensPath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../../design/tokens/tokens.css',
);

// [foreground role, background role, minimum ratio]. 4.5 is AA for body text,
// 3 is AA for large text and for icons and graphics.
const pairs = [
  ['text', 'page', 4.5],
  ['text', 'surface', 4.5],
  ['text-muted', 'page', 4.5],
  ['text-muted', 'surface', 4.5],
  ['link', 'page', 4.5],
  ['link', 'surface', 4.5],
  ['button-text', 'button', 4.5],
  ['accent', 'page', 3],
  ['accent', 'surface', 3],
  ['status-good', 'page', 4.5],
  ['status-warn', 'page', 4.5],
  ['status-flag', 'page', 4.5],
  ['status-good', 'surface', 4.5],
  ['status-warn', 'surface', 4.5],
  ['status-flag', 'surface', 4.5],
];

const css = readFileSync(tokensPath, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

// the declarations inside every block whose header matches, in file order
function declarationsIn(headerPattern) {
  const declarations = {};
  for (const match of css.matchAll(new RegExp(`${headerPattern}\\s*\\{([^{}]*)\\}`, 'g'))) {
    for (const [, name, value] of match[1].matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
      declarations[name] = value.trim();
    }
  }
  return declarations;
}

const light = declarationsIn('@theme static');
const dark = { ...light, ...declarationsIn('\\[data-theme="dark"\\]') };

function resolve(tokens, name, seen = new Set()) {
  const value = tokens[name];
  if (!value || seen.has(name)) return null;
  seen.add(name);
  const reference = value.match(/^var\(--([\w-]+)\)$/);
  return reference ? resolve(tokens, reference[1], seen) : value;
}

function toRgb(hex) {
  const digits = hex.replace('#', '');
  const full = digits.length === 3 ? [...digits].map((d) => d + d).join('') : digits;
  if (!/^[0-9a-f]{6}$/i.test(full)) return null;
  return [0, 2, 4].map((i) => Number.parseInt(full.slice(i, i + 2), 16));
}

function luminance([r, g, b]) {
  const channel = (c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function ratio(a, b) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

const rows = [];
for (const [theme, tokens] of [
  ['light', light],
  ['dark', dark],
]) {
  for (const [fg, bg, minimum] of pairs) {
    const fgHex = resolve(tokens, `color-${fg}`);
    const bgHex = resolve(tokens, `color-${bg}`);
    const fgRgb = fgHex && toRgb(fgHex);
    const bgRgb = bgHex && toRgb(bgHex);
    const value = fgRgb && bgRgb ? ratio(fgRgb, bgRgb) : null;
    rows.push({
      theme,
      foreground: `${fg} ${fgHex ?? '?'}`,
      background: `${bg} ${bgHex ?? '?'}`,
      ratio: value ? value.toFixed(2) : 'n/a',
      needs: `${minimum}:1`,
      result: value === null ? 'UNRESOLVED' : value >= minimum ? 'pass' : 'FAIL',
    });
  }
}

console.table(rows);
const failures = rows.filter((row) => row.result !== 'pass').length;
console.log(
  failures === 0
    ? 'All pairs meet WCAG AA.'
    : `${failures} pair(s) below WCAG AA. This is a report only; nothing was blocked.`,
);
