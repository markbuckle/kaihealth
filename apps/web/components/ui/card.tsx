import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export const cardVariants = ['outlined', 'lit', 'row', 'tile'] as const;
export type CardVariant = (typeof cardVariants)[number];

const variants: Record<CardVariant, string> = {
  // bordered panel on the card colour, which is the page colour in light
  outlined: 'rounded-card border-card bg-card shadow-(--shadow-card)',
  // outlined, with a highlight along the top of the border in dark (--border-lit in tokens.css)
  lit: 'rounded-card border-lit shadow-(--shadow-card-lit)',
  // smaller radius for list rows
  row: 'rounded-inset border-card shadow-(--shadow-card)',
  // borderless panel on the surface colour
  tile: 'rounded-card bg-surface',
};

// exported so a link can look like a card
export function cardClassName(variant: CardVariant = 'outlined', className?: string) {
  return cn(variants[variant], className);
}

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'article' | 'section' | 'li' | 'figure';
  variant?: CardVariant;
};

export function Card({ as: Tag = 'div', variant = 'outlined', className, ...props }: CardProps) {
  return <Tag className={cardClassName(variant, className)} {...props} />;
}
