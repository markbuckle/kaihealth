import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Hanken_Grotesk,
  Instrument_Serif,
} from 'next/font/google';

// next/font downloads these at build time and serves them from our own origin,
// so the browser never contacts a font host.
// Each face sets a CSS variable that design/tokens/tokens.css points a font token at.

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

// The dashboard's faces: a characterful grotesque for titles and scores, and a plain-zero sans
// for everything small (no slashed zeros, which read as noise next to lab values).
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  // optical size lets large scores and headings tighten up while small text stays open
  axes: ['opsz'],
  variable: '--font-bricolage',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
});

// applied once on <html> so every font token resolves anywhere in the page
export const fontVariables = [geist, geistMono, instrumentSerif, bricolage, hanken]
  .map((font) => font.variable)
  .join(' ');
