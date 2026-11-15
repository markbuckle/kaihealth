import Link from 'next/link';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

export const buttonVariants = ['primary', 'outline'] as const;
export const buttonSizes = ['sm', 'md', 'lg'] as const;
export type ButtonVariant = (typeof buttonVariants)[number];
export type ButtonSize = (typeof buttonSizes)[number];

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-button text-button-text hover:bg-button/85',
  outline: 'border-hairline text-text hover:bg-text/8',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-11 px-5.5 text-15',
  md: 'h-13 px-7 text-16',
  lg: 'h-14 px-7 text-16',
};

type StyleProps = { variant?: ButtonVariant; size?: ButtonSize; className?: string };

function buttonClassName({ variant = 'primary', size = 'md', className }: StyleProps) {
  return cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-button font-medium leading-flat',
    'transition-colors duration-(--duration-fast) motion-reduce:transition-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: StyleProps & ComponentProps<'button'>) {
  return (
    <button type={type} className={buttonClassName({ variant, size, className })} {...props} />
  );
}

// the same look for navigation, so links stay links for keyboard and screen reader users
export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: StyleProps & ComponentProps<typeof Link>) {
  return <Link className={buttonClassName({ variant, size, className })} {...props} />;
}
