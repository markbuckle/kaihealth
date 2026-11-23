import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

export const iconButtonVariants = ['plain', 'outline', 'bare'] as const;
export type IconButtonVariant = (typeof iconButtonVariants)[number];

const variants: Record<IconButtonVariant, string> = {
  plain: 'hover:bg-text/8',
  outline: 'border-hairline',
  // no hover circle, for icons that sit straight in a row of text
  bare: '',
};

// exported so Radix triggers and not-ready links can wear the same look
export function iconButtonClassName(variant: IconButtonVariant = 'plain', className?: string) {
  return cn(
    'inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-pill text-text',
    'transition-colors duration-(--duration-fast) motion-reduce:transition-none',
    'aria-disabled:cursor-not-allowed aria-disabled:text-text-muted',
    variants[variant],
    className,
  );
}

// An icon-only button. Give it an aria-label, since the icon is hidden from screen readers.
export function IconButton({
  variant,
  className,
  type = 'button',
  ...props
}: { variant?: IconButtonVariant } & ComponentProps<'button'>) {
  return <button type={type} className={iconButtonClassName(variant, className)} {...props} />;
}
