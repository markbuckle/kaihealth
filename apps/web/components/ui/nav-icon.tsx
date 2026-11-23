import { cn } from '../../lib/cn';

// The sidebar icons, from design/icons/kai-icons.zip (the currentColor set). Each is a line
// drawing with a faint tint of the same colour behind it. Names match the page or area id.
// A group is one tinted-and-lined part. Icons that move on hover are split into groups, and a group with a motion
// gets a class that the keyframes in globals.css pick up when its sidebar row is hovered or focused.
type Group = {
  tint?: string;
  line?: string;
  motion?:
    | 'tile'
    | 'beat'
    | 'echo'
    | 'trace'
    | 'pop'
    | 'arrive'
    | 'peek'
    | 'lines'
    | 'shuffle'
    | 'tick'
    | 'strap';
};
type Icon = { tint: string; line: string } | { groups: Group[] };

const paths = {
  areas: {
    // a heart from Lucide (ISC) and a brain from Iconoir (MIT), two large organs so they stay clear at small sizes;
    // the heart beats, then the brain, on hover
    groups: [
      {
        motion: 'beat',
        tint: 'M11.4 7.5c0.89 -0.88 1.8 -1.93 1.8 -3.3A3.3 3.3 0 0 0 9.9 0.9c-1.06 0 -1.8 0.3 -2.7 1.2 -0.9 -0.9 -1.64 -1.2 -2.7 -1.2A3.3 3.3 0 0 0 1.2 4.2c0 1.38 0.9 2.43 1.8 3.3l4.2 4.2Z',
        line: 'M11.4 7.5c0.89 -0.88 1.8 -1.93 1.8 -3.3A3.3 3.3 0 0 0 9.9 0.9c-1.06 0 -1.8 0.3 -2.7 1.2 -0.9 -0.9 -1.64 -1.2 -2.7 -1.2A3.3 3.3 0 0 0 1.2 4.2c0 1.38 0.9 2.43 1.8 3.3l4.2 4.2Z',
      },
      {
        motion: 'echo',
        line: 'M13.6 18.04C12.54 18.04 11.68 18.9 11.68 19.96C11.68 21.02 12.54 21.88 13.6 21.88C13.82 21.88 14.04 21.84 14.24 21.77M11.85 19.07C10.99 18.65 10.4 17.78 10.4 16.76C10.4 15.98 10.74 15.29 11.29 14.82M11.31 14.77C11.14 14.51 11.04 14.21 11.04 13.88C11.04 13 11.76 12.28 12.64 12.28C13 12.28 13.33 12.4 13.6 12.6M13.75 12.64C13.65 12.43 13.6 12.2 13.6 11.96C13.6 11.08 14.32 10.36 15.2 10.36C16.08 10.36 16.8 11.08 16.8 11.96V21.88M14.24 21.88C14.24 22.59 14.81 23.16 15.52 23.16C16.23 23.16 16.8 22.59 16.8 21.88M16.8 13.56C16.8 14.62 17.66 15.48 18.72 15.48M20 18.04C21.06 18.04 21.92 18.9 21.92 19.96C21.92 21.02 21.06 21.88 20 21.88C19.78 21.88 19.56 21.84 19.36 21.77M21.75 19.07C22.61 18.65 23.2 17.78 23.2 16.76C23.2 15.98 22.86 15.29 22.31 14.82M22.29 14.77C22.46 14.51 22.56 14.21 22.56 13.88C22.56 13 21.84 12.28 20.96 12.28C20.6 12.28 20.27 12.4 20 12.6M16.8 11.96C16.8 11.08 17.52 10.36 18.4 10.36C19.28 10.36 20 11.08 20 11.96C20 12.2 19.95 12.43 19.85 12.64M19.36 21.88C19.36 22.59 18.79 23.16 18.08 23.16C17.37 23.16 16.8 22.59 16.8 21.88',
      },
    ],
  },
  blood: {
    tint: 'M4.58 14.8h9.84a4.92 4.92 0 0 1-9.84 0M17.6 4.45c1.57 1.94 2.7 3.47 2.7 4.95a2.7 2.7 0 0 1-5.4 0c0-1.48 1.12-3.02 2.7-4.95',
    line: 'M9.5 5.78c2.87 3.53 4.92 6.31 4.92 9.02a4.92 4.92 0 0 1-9.84 0c0-2.71 2.05-5.49 4.92-9.02m8.1-1.33c1.57 1.94 2.7 3.47 2.7 4.95a2.7 2.7 0 0 1-5.4 0c0-1.48 1.12-3.02 2.7-4.95',
  },
  cellular: {
    tint: 'M10.4 10.2a3.2 3.2 0 1 0 6.4 0 3.2 3.2 0 1 0-6.4 0',
    line: 'M3.2 12a8.8 8.8 0 1 0 17.6 0 8.8 8.8 0 1 0-17.6 0m7.2-1.8a3.2 3.2 0 1 0 6.4 0 3.2 3.2 0 1 0-6.4 0M7 14.6a1 1 0 1 0 2 0 1 1 0 1 0-2 0m3.4 2.4a1 1 0 1 0 2 0 1 1 0 1 0-2 0',
  },
  exercise: {
    tint: 'M6 6.5A1.5 1.5 0 0 1 7.5 8v8A1.5 1.5 0 0 1 6 17.5 1.5 1.5 0 0 1 4.5 16V8A1.5 1.5 0 0 1 6 6.5m12 0A1.5 1.5 0 0 1 19.5 8v8a1.5 1.5 0 0 1-1.5 1.5 1.5 1.5 0 0 1-1.5-1.5V8A1.5 1.5 0 0 1 18 6.5',
    line: 'M6 6.5zA1.5 1.5 0 0 1 7.5 8v8A1.5 1.5 0 0 1 6 17.5 1.5 1.5 0 0 1 4.5 16V8A1.5 1.5 0 0 1 6 6.5m12 0zA1.5 1.5 0 0 1 19.5 8v8a1.5 1.5 0 0 1-1.5 1.5 1.5 1.5 0 0 1-1.5-1.5V8A1.5 1.5 0 0 1 18 6.5M3.25 9za1.25 1.25 0 0 1 1.25 1.25v3.5A1.25 1.25 0 0 1 3.25 15 1.25 1.25 0 0 1 2 13.75v-3.5A1.25 1.25 0 0 1 3.25 9m17.5 0zA1.25 1.25 0 0 1 22 10.25v3.5A1.25 1.25 0 0 1 20.75 15a1.25 1.25 0 0 1-1.25-1.25v-3.5A1.25 1.25 0 0 1 20.75 9M7.5 12h9',
  },
  'follow-up-testing': {
    tint: 'M10 12h4v5a2 2 0 0 1-4 0z',
    line: 'M8.5 3.5h7m-5.5 0V17a2 2 0 0 0 4 0V3.5M10 8h2',
  },
  heart: {
    tint: 'M12 20.5S4 15.9 4 9.7a4.4 4.4 0 0 1 8-2.6 4.4 4.4 0 0 1 8 2.6c0 6.2-8 10.8-8 10.8',
    line: 'M12 20.5S4 15.9 4 9.7a4.4 4.4 0 0 1 8-2.6 4.4 4.4 0 0 1 8 2.6c0 6.2-8 10.8-8 10.8m-4.2-8h2l1.3-2.2 1.7 4 1.2-1.8h2.2',
  },
  hormones: {
    tint: 'M8.2 12q2.85 7.05 5.7 0z',
    line: 'M2.5 12q2.85-7.05 5.7 0c2.85 7.05 3.8 4.7 5.7 0s3.8-4.7 5.7 0m1.9-2.5v5',
  },
  inflammation: {
    tint: 'M7 19c1.6 0 2.6-6.5 5-6.5s3.4 6.5 5 6.5z',
    line: 'M3 19h4c1.6 0 2.6-6.5 5-6.5s3.4 6.5 5 6.5h4M9.3 9.5c-.9-1.1.9-2.2 0-3.3s.9-2.2 0-3.2M12 9c-.9-1.1.9-2.2 0-3.3s.9-2.2 0-3.2m2.7 7c-.9-1.1.9-2.2 0-3.3s.9-2.2 0-3.2',
  },
  kidney: {
    tint: 'M14.5 3.5c-3 0-4.5 2.2-4.5 4.5 0 1.6 1.3 2.4 1.3 4S10 14.4 10 16c0 2.3 1.5 4.5 4.5 4.5 3.5 0 5.5-3.8 5.5-8.5s-2-8.5-5.5-8.5',
    line: 'M14.5 3.5c-3 0-4.5 2.2-4.5 4.5 0 1.6 1.3 2.4 1.3 4S10 14.4 10 16c0 2.3 1.5 4.5 4.5 4.5 3.5 0 5.5-3.8 5.5-8.5s-2-8.5-5.5-8.5M11.2 12H7a2 2 0 0 0-2 2v6.5',
  },
  lifestyle: {
    tint: 'M6.5 17.5a5.5 5.5 0 0 1 11 0z',
    line: 'M2.5 17.5h19m-15 0a5.5 5.5 0 0 1 11 0M12 6v2.4M5.6 9.6l1.7 1.7m11.1-1.7-1.7 1.7M7 21h10',
  },
  liver: {
    tint: 'M3.5 9.3C3.5 6.8 6 5.5 9 5.5h8.6c1.9 0 2.9 1.2 2.9 2.8 0 4.7-5 10.2-9.6 10.2-1.4 0-2-.8-2-2 0-2.9-5.4-3.4-5.4-7.2',
    line: 'M3.5 9.3C3.5 6.8 6 5.5 9 5.5h8.6c1.9 0 2.9 1.2 2.9 2.8 0 4.7-5 10.2-9.6 10.2-1.4 0-2-.8-2-2 0-2.9-5.4-3.4-5.4-7.2m8.1-3.8c0 2.8-.9 4.8-2.5 6.2',
  },
  metabolic: {
    tint: 'M12 7.8c-1.6-1.1-5.6-1.6-6.9 2-1.2 3.4.6 8.1 2.8 9.9 1.2 1 2.7.6 4.1-.1 1.4.7 2.9 1.1 4.1.1 2.2-1.8 4-6.5 2.8-9.9-1.3-3.6-5.3-3.1-6.9-2',
    line: 'M12 7.8c-1.6-1.1-5.6-1.6-6.9 2-1.2 3.4.6 8.1 2.8 9.9 1.2 1 2.7.6 4.1-.1 1.4.7 2.9 1.1 4.1.1 2.2-1.8 4-6.5 2.8-9.9-1.3-3.6-5.3-3.1-6.9-2m0 0c0-1.7.6-3.1 1.8-4.3m-.9 7.5-2.4 3.5h3L11.1 18',
  },
  neural: {
    tint: 'M8.8 11a3.2 3.2 0 1 0 6.4 0 3.2 3.2 0 1 0-6.4 0',
    line: 'M8.8 11a3.2 3.2 0 1 0 6.4 0 3.2 3.2 0 1 0-6.4 0m.8-2L6.3 6.4M14.4 9l3.3-2.6M12 14.2v4m-9.1-13a1.9 1.9 0 1 0 3.8 0 1.9 1.9 0 1 0-3.8 0m14.4 0a1.9 1.9 0 1 0 3.8 0 1.9 1.9 0 1 0-3.8 0m-7.1 15a1.8 1.8 0 1 0 3.6 0 1.8 1.8 0 1 0-3.6 0',
  },
  nutrients: {
    tint: 'M19.5 4.5c-9.5 0-15 4.5-15 11a4 4 0 0 0 4 4c6.5 0 11-5.5 11-15',
    line: 'M19.5 4.5c-9.5 0-15 4.5-15 11a4 4 0 0 0 4 4c6.5 0 11-5.5 11-15m-15 15 9-9',
  },
  nutrition: {
    tint: 'M3.5 11.5h17a8.5 8.5 0 0 1-17 0',
    line: 'M3.5 11.5h17a8.5 8.5 0 0 1-17 0m8.5 0c0-3 1.8-5.2 4.8-5.8-.3 3-2 5.2-4.8 5.8m0 0c0-2-1.2-3.6-3.2-4',
  },
  'plan-priorities': {
    tint: 'M5.5 4h11.4c.6 0 1 .7.6 1.2l-2.2 3.3 2.2 3.3c.4.5 0 1.2-.6 1.2H5.5z',
    line: 'M5.5 21V3.5m0 .5h11.4c.6 0 1 .7.6 1.2l-2.2 3.3 2.2 3.3c.4.5 0 1.2-.6 1.2H5.5',
  },
  plan: {
    // route from Lucide (ISC), with the start and end points tinted; the route redraws and the circles pop on hover
    groups: [
      {
        motion: 'pop',
        tint: 'M3 19a3 3 0 1 0 6 0 3 3 0 1 0-6 0',
        line: 'M3 19a3 3 0 1 0 6 0 3 3 0 1 0-6 0',
      },
      { motion: 'trace', line: 'M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15' },
      {
        motion: 'arrive',
        tint: 'M15 5a3 3 0 1 0 6 0 3 3 0 1 0-6 0',
        line: 'M15 5a3 3 0 1 0 6 0 3 3 0 1 0-6 0',
      },
    ],
  },
  priorities: {
    tint: 'M5.5 4h13a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2 2 2 0 0 1 2-2',
    line: 'M5.5 4h13a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2 2 2 0 0 1 2-2m0 6h8a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2 2 2 0 0 1 2-2m0 6h3a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2 2 2 0 0 1 2-2',
  },
  records: {
    // two pages: on hover the front one slides aside and the back one, with its lines, peeks out
    groups: [
      {
        motion: 'peek',
        line: 'M8 3.8A1.8 1.8 0 0 1 9.6 3h7.6a2.3 2.3 0 0 1 2.3 2.3v10.2a1.8 1.8 0 0 1-1.6 1.8',
      },
      // hidden at rest, they show only while the pages are apart
      { motion: 'lines', line: 'M14.8 8h3.2M14.8 11.5h3.2' },
      {
        motion: 'shuffle',
        tint: 'M6.5 6.5h7a2 2 0 0 1 2 2V19a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V8.5a2 2 0 0 1 2-2',
        line: 'M6.5 6.5h7a2 2 0 0 1 2 2V19a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V8.5a2 2 0 0 1 2-2M7.8 11.5h4.5M7.8 15h4.5',
      },
    ],
  },
  screening: {
    tint: 'M3.7 10.5a6.8 6.8 0 1 0 13.6 0 6.8 6.8 0 1 0-13.6 0',
    line: 'M3.7 10.5a6.8 6.8 0 1 0 13.6 0 6.8 6.8 0 1 0-13.6 0m11.7 4.9 5.1 5.1M10.5 8v5M8 10.5h5',
  },
  sleep: {
    tint: 'M3.5 11c2.2 3 5 4.5 8.5 4.5s6.3-1.5 8.5-4.5c-2.2 1.4-5 2.2-8.5 2.2s-6.3-.8-8.5-2.2',
    line: 'M3.5 11c2.2 3 5 4.5 8.5 4.5s6.3-1.5 8.5-4.5M6.2 14.2l-1.5 2.1m7.3-.8V18m5.8-3.8 1.5 2.1M15 3.5h3.5l-3.5 4h3.5',
  },
  summary: {
    // layout-dashboard from Lucide (ISC), with the two larger blocks tinted; the blocks shrink and return in turn on hover
    groups: [
      {
        motion: 'tile',
        tint: 'M4 3h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z',
        line: 'M4 3h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z',
      },
      {
        motion: 'tile',
        line: 'M15 3h5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z',
      },
      {
        motion: 'tile',
        tint: 'M15 12h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z',
        line: 'M15 12h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z',
      },
      {
        motion: 'tile',
        line: 'M4 16h5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z',
      },
    ],
  },
  thyroid: {
    tint: 'M11.2 8.6C10 5.6 5 5.4 5 10.2c0 4.4 3 7.6 6.2 6.2zm1.6 0c1.2-3 6.2-3.2 6.2 1.6 0 4.4-3 7.6-6.2 6.2z',
    line: 'M11.2 8.6C10 5.6 5 5.4 5 10.2c0 4.4 3 7.6 6.2 6.2zm1.6 0c1.2-3 6.2-3.2 6.2 1.6 0 4.4-3 7.6-6.2 6.2zm-1.6 4h1.6M12 3.5v3',
  },
  wearables: {
    // watch from Lucide (ISC), flipped horizontally and turned 90 degrees so it lies on its side, with the face tinted;
    // the hand turns one way and the strap the other on hover
    groups: [
      {
        tint: 'M12 6A6 6 0 1 0 12 18A6 6 0 1 0 12 6',
        line: 'M12 6A6 6 0 1 0 12 18A6 6 0 1 0 12 6',
      },
      { motion: 'tick', line: 'M14 12L12 12L11 11' },
      {
        motion: 'strap',
        line: 'M16.34 7.87L20.39 8.68A2 2 0 0 1 22 10.68L22 13.36A2 2 0 0 1 20.39 15.36L16.34 16.14M7.64 16.12L3.64 15.32A2 2 0 0 1 2.03 13.32L2.03 10.6A2 2 0 0 1 3.64 8.6L7.69 7.79',
      },
    ],
  },
} as const satisfies Record<string, Icon>;

export type NavIconName = keyof typeof paths;

export function NavIcon({ name, className }: { name: NavIconName; className?: string }) {
  const icon: Icon = paths[name];
  const groups: Group[] = 'groups' in icon ? icon.groups : [icon];
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      // overflow-visible lets a part that grows on hover draw past the edge instead of being cut off
      className={cn('size-5 shrink-0 overflow-visible fill-none', className)}
    >
      {groups.map((group) => (
        <g
          key={group.line ?? group.tint}
          className={group.motion ? `kai-icon-${group.motion}` : undefined}
        >
          {group.tint ? <path d={group.tint} fill="currentColor" fillOpacity={0.16} /> : null}
          {group.line ? (
            <path
              d={group.line}
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={group.motion === 'trace' ? 1 : undefined}
            />
          ) : null}
        </g>
      ))}
    </svg>
  );
}
