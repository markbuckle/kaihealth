import { cn } from '../../lib/cn';
import type { RangeBand } from '../../lib/health/results';
import type { Status } from '../../lib/health/types';

export const rangeBarVariants = ['default'] as const;
export type RangeBarVariant = (typeof rangeBarVariants)[number];

const variants: Record<RangeBarVariant, string> = {
  default: 'gap-1.5',
};

// short enough to fit narrow bands, as the wireframe's colour key writes them
const bandLabels: Record<Status, string> = {
  optimal: 'Optimal',
  'in-range': 'In range',
  borderline: 'Border.',
  'out-of-range': 'Out of range',
};

// the band the value sits in is stronger than the others
const bandTones: Record<Status, { current: string; other: string }> = {
  optimal: { current: 'bg-status-good/60', other: 'bg-status-good/22' },
  'in-range': { current: 'bg-status-neutral/60', other: 'bg-status-neutral/22' },
  borderline: { current: 'bg-status-warn/60', other: 'bg-status-warn/22' },
  'out-of-range': { current: 'bg-status-flag/60', other: 'bg-status-flag/22' },
};

const markerTones: Record<Status, { halo: string; dot: string }> = {
  optimal: { halo: 'bg-status-good/22', dot: 'bg-status-good' },
  'in-range': { halo: 'bg-status-neutral/22', dot: 'bg-status-neutral' },
  borderline: { halo: 'bg-status-warn/22', dot: 'bg-status-warn' },
  'out-of-range': { halo: 'bg-status-flag/22', dot: 'bg-status-flag' },
};

type RangeBarProps = {
  bands: RangeBand[];
  status: Status;
  markerPercent: number;
  showLabels?: boolean;
  variant?: RangeBarVariant;
  className?: string;
};

// Decorative: the status pill and value beside it carry the same information as text.
export function RangeBar({
  bands,
  status,
  markerPercent,
  showLabels = false,
  variant = 'default',
  className,
}: RangeBarProps) {
  // band widths are data, so the grid tracks are set inline
  const columns = {
    gridTemplateColumns: bands.map((band) => `minmax(0, ${band.weight}fr)`).join(' '),
  };
  const marker = markerTones[status];

  return (
    <div aria-hidden="true" className={cn('flex flex-col', variants[variant], className)}>
      <div className="relative grid h-5.5 items-center gap-1" style={columns}>
        {bands.map((band, index) => (
          <div
            // bands of one status can repeat either side of optimal, so the index is the key
            // biome-ignore lint/suspicious/noArrayIndexKey: the band list never reorders
            key={index}
            className={cn(
              'h-1.5 rounded-pill',
              band.status === status
                ? bandTones[band.status].current
                : bandTones[band.status].other,
            )}
          />
        ))}
        <div
          className={cn('absolute top-0 size-5.5 -translate-x-1/2 rounded-round', marker.halo)}
          style={{ left: `${markerPercent}%` }}
        />
        <div
          className={cn(
            'absolute top-1 size-3.5 -translate-x-1/2 rounded-round border-3 border-card',
            marker.dot,
          )}
          style={{ left: `${markerPercent}%` }}
        />
      </div>
      {showLabels ? (
        <div
          // a wider gap than the bar's, and labels that wrap in narrow bands, so neighbouring
          // labels never read as one phrase
          className="grid gap-2 font-label text-10 text-text-muted uppercase leading-snug tracking-tag"
          style={columns}
        >
          {bands.map((band, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: the band list never reorders
            <span key={index}>{bandLabels[band.status]}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
