import type { RangeBand, Status } from '../../content/sample-results';
import { cn } from '../../lib/cn';

export const rangeBarVariants = ['default'] as const;
export type RangeBarVariant = (typeof rangeBarVariants)[number];

const variants: Record<RangeBarVariant, string> = {
  default: 'gap-1.5',
};

// the band the value sits in is stronger than the others
const bandTones: Record<Status, { current: string; other: string }> = {
  good: { current: 'bg-status-good/60', other: 'bg-status-good/22' },
  warn: { current: 'bg-status-warn/60', other: 'bg-status-warn/22' },
  flag: { current: 'bg-status-flag/60', other: 'bg-status-flag/22' },
};

const markerTones: Record<Status, { halo: string; dot: string }> = {
  good: { halo: 'bg-status-good/22', dot: 'bg-status-good' },
  warn: { halo: 'bg-status-warn/22', dot: 'bg-status-warn' },
  flag: { halo: 'bg-status-flag/22', dot: 'bg-status-flag' },
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
  const columns = { gridTemplateColumns: bands.map((band) => `${band.weight}fr`).join(' ') };
  const marker = markerTones[status];

  return (
    <div aria-hidden="true" className={cn('flex flex-col', variants[variant], className)}>
      <div className="relative grid h-5.5 items-center gap-1" style={columns}>
        {bands.map((band) => (
          <div
            key={band.label}
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
            'absolute top-1 size-3.5 -translate-x-1/2 rounded-round border-3 border-page',
            marker.dot,
          )}
          style={{ left: `${markerPercent}%` }}
        />
      </div>
      {showLabels ? (
        <div
          className="grid gap-1 font-label text-10 text-text-muted uppercase tracking-tag"
          style={columns}
        >
          {bands.map((band) => (
            <span key={band.label}>{band.label}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
