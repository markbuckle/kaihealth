import { cn } from '../../lib/cn';

export const scoreRingVariants = ['default'] as const;
export type ScoreRingVariant = (typeof scoreRingVariants)[number];

// 112px on small screens and 148px from md, as the wireframe draws it
const variants: Record<ScoreRingVariant, { root: string; value: string; caption: string }> = {
  default: {
    root: 'size-28 md:size-37',
    value: 'text-40 md:text-56',
    caption: 'text-10 md:text-11',
  },
};

const radius = 64;
const circumference = 2 * Math.PI * radius;

// A score out of 100 inside a ring. The ring is drawing only; the number and caption are the
// text alternative, so screen readers hear the score once.
export function ScoreRing({
  score,
  caption,
  variant = 'default',
  className,
}: {
  score: number;
  caption: string;
  variant?: ScoreRingVariant;
  className?: string;
}) {
  const styles = variants[variant];
  const filled = (Math.min(100, Math.max(0, score)) / 100) * circumference;
  return (
    <div className={cn('relative shrink-0', styles.root, className)}>
      <svg viewBox="0 0 148 148" aria-hidden="true" className="size-full">
        <circle
          cx="74"
          cy="74"
          r={radius}
          fill="none"
          strokeWidth="10"
          className="stroke-surface"
        />
        <circle
          cx="74"
          cy="74"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
          transform="rotate(-90 74 74)"
          className="stroke-accent"
        />
      </svg>
      <p className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('font-heading leading-flat tracking-display', styles.value)}>
          {score}
        </span>
        <span className={cn('font-label text-text-muted', styles.caption)}>{caption}</span>
      </p>
    </div>
  );
}
