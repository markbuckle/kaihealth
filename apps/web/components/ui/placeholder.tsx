import { cn } from '../../lib/cn';

const variants = {
  // a dashed circle for a portrait
  avatar: 'rounded-round border-dashed bg-text/12 text-10 tracking-label',
  // a flat block for a photo or illustration; it fills its box, so size it with className
  media: 'bg-surface text-11 tracking-tag',
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
        'flex shrink-0 items-center justify-center font-label text-text-muted uppercase',
        variants[variant],
        className,
      )}
    >
      {label}
    </div>
  );
}
