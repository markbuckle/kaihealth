import { cn } from '../../lib/cn';

export const iconNames = [
  'check',
  'arrow-right',
  'plus',
  'minus',
  'menu',
  'close',
  'user',
  'shield',
  'bell',
  'sparkle',
  'sun',
  'chevron-down',
  'chevron-right',
  'home',
  'results',
  'plan',
  'messages',
  'more',
  'moon',
  'dna',
  'smile',
  'microbe',
] as const;
export type IconName = (typeof iconNames)[number];

// Line icons drawn on a 24 unit grid. They take their colour from the text colour.
// The dashboard icons are copied from design/wireframe/dashboard.html; moon is new, and sun is
// the wireframe's settings icon.
type Part = { d: string; className?: string };

// Most icons are one path. An icon with parts draws each as its own path, so a part with a class
// can move on its own (the sun's rays).
const paths: Record<IconName, string | { parts: Part[] }> = {
  bell: 'M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20a2 2 0 0 0 4 0',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z',
  sun: {
    parts: [
      { d: 'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' },
      {
        d: 'M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1',
        className: 'kai-rays',
      },
    ],
  },
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-right': 'M9 6l6 6-6 6',
  home: 'M4 11l8-7 8 7v9h-5v-6H9v6H4z',
  results: 'M5 19v-8M12 19V5M19 19v-5',
  plan: 'M5 6h14M5 12h14M5 18h9',
  messages: 'M4 5h16v11H9l-5 4z',
  more: 'M6 12h.01M12 12h.01M18 12h.01',
  // a faceted crescent, straight edges rather than arcs
  moon: 'M13 4.5L9.5 6L6 9L4.5 13L5.5 17L9 19.5L13 20L17 18.5L19.5 15L16 15.5L12.5 14L10.5 11L10.5 7.5Z',
  dna: {
    parts: [
      { d: 'M8 3c0 5 8 5 8 9s-8 4-8 9' },
      { d: 'M16 3c0 5-8 5-8 9s8 4 8 9' },
      { d: 'M10 7.5h4M10 16.5h4' },
    ],
  },
  smile: {
    parts: [
      { d: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17z' },
      { d: 'M8.5 14c.9 1.3 2 2 3.5 2s2.6-.7 3.5-2' },
      { d: 'M9 9.5h.01M15 9.5h.01' },
    ],
  },
  // a rod-shaped bacterium with two spots
  microbe: {
    parts: [
      { d: 'M7.5 16.5a3.5 3.5 0 0 1 0-5l4-4a3.5 3.5 0 0 1 5 5l-4 4a3.5 3.5 0 0 1-5 0z' },
      { d: 'M10 14h.01M14 10h.01' },
    ],
  },
  check: 'M5 12.5l4.5 4.5L19 7.5',
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  user: 'M12 12.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20.5c1-3.5 4-5 7.5-5s6.5 1.5 7.5 5',
  shield: 'M12 3.5l7 2.5v5.5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z',
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const path = paths[name];
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn('size-5 shrink-0 fill-none stroke-current', className)}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {typeof path === 'string' ? (
        <path d={path} />
      ) : (
        path.parts.map((part) => <path key={part.d} d={part.d} className={part.className} />)
      )}
    </svg>
  );
}
