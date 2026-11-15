import Link from 'next/link';
import { cn } from '../../lib/cn';
import { routes, siteConfig } from '../../lib/config';

const variants = {
  default: { link: 'gap-2.5 text-24 lg:text-28', mark: 'size-6 lg:size-7' },
} as const;

export type LogoVariant = keyof typeof variants;

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      aria-hidden="true"
      className={cn('shrink-0 fill-none stroke-current', className)}
      strokeWidth={1.5}
    >
      <circle cx="14" cy="14" r="12.5" />
      <circle cx="14" cy="14" r="4" className="fill-current stroke-none" />
    </svg>
  );
}

export function Logo({
  variant = 'default',
  className,
}: {
  variant?: LogoVariant;
  className?: string;
}) {
  const styles = variants[variant];
  return (
    <Link
      href={routes.home}
      className={cn(
        'inline-flex min-h-11 items-center whitespace-nowrap font-heading text-text leading-flat',
        styles.link,
        className,
      )}
    >
      <LogoMark className={styles.mark} />
      <span>{siteConfig.name}</span>
    </Link>
  );
}
