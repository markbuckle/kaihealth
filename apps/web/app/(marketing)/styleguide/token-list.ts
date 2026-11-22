// The tokens the styleguide shows. Each name maps to the CSS variable --{kind}-{name}
// in design/tokens/tokens.css. This list is for display only: tokens.css stays the
// source of truth, and a token missing here simply is not shown.

export type TokenKind =
  | 'color'
  | 'font'
  | 'text'
  | 'leading'
  | 'tracking'
  | 'spacing'
  | 'container'
  | 'radius'
  | 'border'
  | 'shadow'
  | 'blur'
  | 'ease'
  | 'duration';

export type TokenGroup = {
  title: string;
  tier: 'Named value' | 'Role';
  kind: TokenKind;
  names: string[];
};

export const tokenGroups: TokenGroup[] = [
  {
    title: 'Neutrals',
    tier: 'Named value',
    kind: 'color',
    names: [
      'neutral-0',
      'neutral-100',
      'neutral-300',
      'neutral-400',
      'neutral-450',
      'neutral-500',
      'neutral-600',
      'neutral-700',
      'neutral-750',
      'neutral-800',
      'neutral-900',
    ],
  },
  {
    title: 'Hues',
    tier: 'Named value',
    kind: 'color',
    names: [
      'teal-500',
      'teal-600',
      'teal-700',
      'sky-300',
      'yellow-500',
      'orange-500',
      'rose-500',
      'purple-600',
      'indigo-700',
      'green-400',
      'green-500',
      'amber-400',
      'amber-500',
      'red-400',
      'red-500',
    ],
  },
  {
    title: 'Colour roles',
    tier: 'Role',
    kind: 'color',
    names: [
      'page',
      'card',
      'canvas',
      'surface',
      'text',
      'text-muted',
      'border',
      'button',
      'button-text',
      'link',
      'accent',
      'status-good',
      'status-neutral',
      'status-warn',
      'status-flag',
    ],
  },
  {
    title: 'Artwork roles',
    tier: 'Role',
    kind: 'color',
    names: ['swirl-1', 'swirl-2', 'swirl-3', 'swirl-4', 'swirl-5', 'swirl-6'],
  },
  { title: 'Font families', tier: 'Named value', kind: 'font', names: ['serif', 'sans', 'mono'] },
  { title: 'Font roles', tier: 'Role', kind: 'font', names: ['heading', 'body', 'label'] },
  {
    title: 'Type sizes',
    tier: 'Named value',
    kind: 'text',
    names: [
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '20',
      '24',
      '26',
      '28',
      '32',
      '36',
      '40',
      '44',
      '52',
      '56',
      '64',
      '96',
    ],
  },
  {
    title: 'Line heights',
    tier: 'Named value',
    kind: 'leading',
    names: ['tight', 'flat', 'display', 'title', 'snug', 'list', 'body'],
  },
  {
    title: 'Letter spacing',
    tier: 'Named value',
    kind: 'tracking',
    names: ['number', 'display', 'caption', 'tag', 'label'],
  },
  {
    title: 'Spacing',
    tier: 'Named value',
    kind: 'spacing',
    names: [
      'section-compact',
      'section-roomy',
      'gutter-compact',
      'gutter-medium',
      'gutter-roomy',
      'sidebar',
    ],
  },
  { title: 'Spacing roles', tier: 'Role', kind: 'spacing', names: ['section-y', 'gutter'] },
  {
    title: 'Widths',
    tier: 'Named value',
    kind: 'container',
    names: ['content', 'dashboard', 'list', 'reading', 'heading', 'lead'],
  },
  {
    title: 'Radii',
    tier: 'Named value',
    kind: 'radius',
    names: ['sharp', 'xs', 'sm', 'soft', 'pill', 'round'],
  },
  { title: 'Radius roles', tier: 'Role', kind: 'radius', names: ['card', 'inset', 'button'] },
  {
    title: 'Borders',
    tier: 'Named value',
    kind: 'border',
    names: ['hairline', 'strong', 'dashed'],
  },
  { title: 'Border roles', tier: 'Role', kind: 'border', names: ['card'] },
  { title: 'Shadows', tier: 'Named value', kind: 'shadow', names: ['none', 'card'] },
  { title: 'Blurs', tier: 'Named value', kind: 'blur', names: ['blob', 'blob-compact'] },
  { title: 'Durations', tier: 'Named value', kind: 'duration', names: ['fast', 'base'] },
  { title: 'Easings', tier: 'Named value', kind: 'ease', names: ['standard'] },
];

export function cssVariable(kind: TokenKind, name: string): string {
  return `--${kind}-${name}`;
}
