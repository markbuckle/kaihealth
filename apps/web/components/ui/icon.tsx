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
  'sidebar',
  'bell',
  'sparkle',
  'settings',
  'chevron-down',
  'chevron-right',
  'home',
  'results',
  'plan',
  'messages',
  'more',
  'moon',
] as const;
export type IconName = (typeof iconNames)[number];

// Line icons drawn on a 24 unit grid. They take their colour from the text colour.
// The dashboard icons are copied from design/wireframe/dashboard.html; moon is new.
const paths: Record<IconName, string> = {
  sidebar: 'M6 4h12a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM9 4v16',
  bell: 'M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20a2 2 0 0 0 4 0',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z',
  settings:
    'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1',
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-right': 'M9 6l6 6-6 6',
  home: 'M4 11l8-7 8 7v9h-5v-6H9v6H4z',
  results: 'M5 19v-8M12 19V5M19 19v-5',
  plan: 'M5 6h14M5 12h14M5 18h9',
  messages: 'M4 5h16v11H9l-5 4z',
  more: 'M6 12h.01M12 12h.01M18 12h.01',
  moon: 'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z',
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
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn('size-5 shrink-0 fill-none stroke-current', className)}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
