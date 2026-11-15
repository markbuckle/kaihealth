import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export const cardVariants = ['outlined', 'row', 'tile'] as const;
export type CardVariant = (typeof cardVariants)[number];

const variants: Record<CardVariant, string> = {
  // bordered panel on the page colour
  outlined: 'rounded-card border-card bg-page',
  // smaller radius for list rows
  row: 'rounded-inset border-card',
  // borderless panel on the surface colour
  tile: 'rounded-card bg-surface',
};

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'article' | 'li' | 'figure';
  variant?: CardVariant;
};

export function Card({ as: Tag = 'div', variant = 'outlined', className, ...props }: CardProps) {
  return <Tag className={cn(variants[variant], className)} {...props} />;
}
