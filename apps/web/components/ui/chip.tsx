import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export const chipVariants = ['outline', 'ghost'] as const;
export type ChipVariant = (typeof chipVariants)[number];

// The selected look keys off data-state="active", which Radix Tabs sets on its triggers,
// so the same classes serve static chips and interactive tabs.
const variants: Record<ChipVariant, string> = {
  outline:
    'h-11 px-4.5 text-15 border-hairline text-text hover:bg-text/8 data-[state=active]:border-button data-[state=active]:bg-button data-[state=active]:text-button-text',
  ghost:
    'h-8 px-3.5 text-13 text-text-muted data-[state=active]:bg-button data-[state=active]:text-button-text',
};

export function chipClassName(variant: ChipVariant = 'outline', className?: string) {
  return cn(
    'inline-flex items-center whitespace-nowrap rounded-pill leading-flat',
    'transition-colors duration-(--duration-fast) motion-reduce:transition-none',
    variants[variant],
    className,
  );
}

type ChipProps = {
  variant?: ChipVariant;
  selected?: boolean;
  className?: string;
  children: ReactNode;
};

export function Chip({ variant, selected = false, className, children }: ChipProps) {
  return (
    <span
      data-state={selected ? 'active' : 'inactive'}
      className={chipClassName(variant, className)}
    >
      {children}
    </span>
  );
}
