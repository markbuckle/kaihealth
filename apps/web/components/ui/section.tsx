import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { AccentText } from './accent-text';
import { Eyebrow } from './eyebrow';

export const sectionVariants = ['page', 'surface'] as const;
export type SectionVariant = (typeof sectionVariants)[number];

const variants: Record<SectionVariant, string> = {
  page: 'bg-page',
  surface: 'bg-surface',
};

type SectionProps = {
  id?: string;
  variant?: SectionVariant;
  theme?: 'light' | 'dark';
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

// A full-width band with the page gutter and a centred content column.
export function Section({
  id,
  variant = 'page',
  theme,
  labelledBy,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      data-theme={theme}
      aria-labelledby={labelledBy}
      className={cn('scroll-mt-4 px-gutter py-section-y text-text', variants[variant], className)}
    >
      <div className={cn('mx-auto max-w-content', containerClassName)}>{children}</div>
    </section>
  );
}

export const sectionHeadingVariants = ['narrow', 'wide'] as const;
export type SectionHeadingVariant = (typeof sectionHeadingVariants)[number];

// both are centred; narrow caps the title so it breaks onto two balanced lines
const headingVariants: Record<SectionHeadingVariant, string> = {
  narrow: 'max-w-heading',
  wide: 'max-w-none',
};

type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  variant?: SectionHeadingVariant;
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  variant = 'narrow',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col items-center gap-5 text-center', className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className={cn(
          'text-balance font-heading text-40 leading-display tracking-display md:text-56 lg:text-64',
          headingVariants[variant],
        )}
      >
        <AccentText text={title} />
      </h2>
      {lead ? (
        <p className="max-w-lg text-pretty text-17 text-text-muted lg:text-18">{lead}</p>
      ) : null}
    </div>
  );
}
