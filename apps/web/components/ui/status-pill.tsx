import { cn } from '../../lib/cn';
import { describeStatus } from '../../lib/health/status';
import type { Direction, Status } from '../../lib/health/types';

export const statusPillVariants = ['outline', 'dot'] as const;
export type StatusPillVariant = (typeof statusPillVariants)[number];

const variants: Record<StatusPillVariant, { pill: string; dot: string }> = {
  // a bordered pill with an uppercase label
  outline: {
    pill: 'h-6.5 gap-1.5 rounded-pill border px-2.5 font-label text-11 uppercase tracking-tag',
    dot: 'size-1.5',
  },
  // the dashboard's plain dot and label; it takes its text size from className or its parent
  dot: { pill: 'gap-1.75 font-medium', dot: 'size-2.5' },
};

const tones: Record<Status, { border: string; dot: string }> = {
  optimal: { border: 'border-status-good', dot: 'bg-status-good' },
  'in-range': { border: 'border-status-neutral', dot: 'bg-status-neutral' },
  borderline: { border: 'border-status-warn', dot: 'bg-status-warn' },
  'out-of-range': { border: 'border-status-flag', dot: 'bg-status-flag' },
};

// The status is always written out, so it never depends on colour alone. The label stays in
// the text colour and only the dot and border carry the status colour, which is too light to
// read as text.
export function StatusPill({
  status,
  direction,
  variant = 'outline',
  className,
}: {
  status: Status;
  direction?: Direction;
  variant?: StatusPillVariant;
  className?: string;
}) {
  const styles = variants[variant];
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center whitespace-nowrap text-text',
        styles.pill,
        tones[status].border,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('shrink-0 rounded-round', styles.dot, tones[status].dot)}
      />
      {describeStatus(status, direction)}
    </span>
  );
}
