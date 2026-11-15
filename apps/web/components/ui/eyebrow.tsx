import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export const eyebrowVariants = ['section', 'card'] as const;
export type EyebrowVariant = (typeof eyebrowVariants)[number];

const variants: Record<EyebrowVariant, string> = {
  // above section headings and as small panel titles
  section: 'text-12 leading-list tracking-label',
  // inside cards
  card: 'text-11 leading-list tracking-label',
};

type EyebrowProps = {
  as?: 'p' | 'span' | 'div';
  variant?: EyebrowVariant;
  className?: string;
  children: ReactNode;
};

export function Eyebrow({ as: Tag = 'p', variant = 'section', className, children }: EyebrowProps) {
  return (
    <Tag className={cn('font-label text-text-muted uppercase', variants[variant], className)}>
      {children}
    </Tag>
  );
}
