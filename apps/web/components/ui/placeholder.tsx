import { cn } from '../../lib/cn';

const variants = {
  avatar: 'rounded-round',
} as const;

export type PlaceholderVariant = keyof typeof variants;

// Stands in for a photo that does not exist yet. Size it with className.
export function Placeholder({
  variant = 'avatar',
  label = 'Photo',
  className,
}: {
  variant?: PlaceholderVariant;
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className={cn(
        'flex shrink-0 items-center justify-center border-dashed bg-text/12',
        'font-label text-10 text-text-muted uppercase tracking-label',
        variants[variant],
        className,
      )}
    >
      {label}
    </div>
  );
}
