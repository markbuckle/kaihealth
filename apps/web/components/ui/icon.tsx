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
] as const;
export type IconName = (typeof iconNames)[number];

// Line icons drawn on a 24 unit grid. They take their colour from the text colour.
const paths: Record<IconName, string> = {
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
