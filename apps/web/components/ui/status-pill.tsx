import { type Status, statusLabels } from '../../content/sample-results';
import { cn } from '../../lib/cn';

export const statusPillVariants = ['outline'] as const;
export type StatusPillVariant = (typeof statusPillVariants)[number];

const variants: Record<StatusPillVariant, string> = {
  outline: 'h-6.5 gap-1.5 border px-2.5 text-11',
};

const tones: Record<Status, { pill: string; dot: string }> = {
  good: { pill: 'border-status-good text-status-good', dot: 'bg-status-good' },
  warn: { pill: 'border-status-warn text-status-warn', dot: 'bg-status-warn' },
  flag: { pill: 'border-status-flag text-status-flag', dot: 'bg-status-flag' },
};

// The status is always written out, so it never depends on colour alone.
export function StatusPill({
  status,
  variant = 'outline',
  className,
}: {
  status: Status;
  variant?: StatusPillVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center whitespace-nowrap rounded-pill font-label uppercase tracking-tag',
        variants[variant],
        tones[status].pill,
        className,
      )}
    >
      <span aria-hidden="true" className={cn('size-1.5 rounded-round', tones[status].dot)} />
      {statusLabels[status]}
    </span>
  );
}
