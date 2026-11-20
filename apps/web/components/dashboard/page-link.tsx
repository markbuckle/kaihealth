import Link from 'next/link';
import type { MouseEventHandler, ReactNode } from 'react';
import { dashboardChrome } from '../../content/dashboard';
import type { DashboardPage } from '../../content/dashboard-nav';
import { cn } from '../../lib/cn';

// for text links; the disabled look drops the link colour and underline
export const textLinkClassName =
  'text-link underline underline-offset-3 aria-disabled:cursor-not-allowed aria-disabled:text-text-muted aria-disabled:no-underline';

type PageLinkProps = {
  to: DashboardPage;
  current?: boolean;
  className?: string;
  // for icon-only links; include the "soon" state in it, since the label is not visible
  'aria-label'?: string;
  title?: string;
  // lets a Radix Close wrap a ready link
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: ReactNode;
};

// A link to a dashboard page or, until that page is ready, the same element disabled.
// Pair it with <SoonLabel> so the disabled state is visible as well as announced.
export function PageLink({
  to,
  current = false,
  className,
  'aria-label': ariaLabel,
  title,
  onClick,
  children,
}: PageLinkProps) {
  if (to.ready) {
    return (
      <Link
        href={to.href}
        aria-current={current ? 'page' : undefined}
        aria-label={ariaLabel}
        title={title}
        onClick={onClick}
        className={className}
      >
        {children}
      </Link>
    );
  }
  return (
    // biome-ignore lint/a11y: a disabled link has no href and, like a disabled button, takes no focus
    <span
      role="link"
      aria-disabled="true"
      aria-label={ariaLabel}
      title={title}
      className={className}
    >
      {children}
    </span>
  );
}

// "Soon" for a page not built yet, "Coming later" for one the product does not offer yet
export function SoonLabel({ to, className }: { to: DashboardPage; className?: string }) {
  if (to.ready) return null;
  return (
    <span className={cn('font-label text-10 uppercase leading-flat tracking-tag', className)}>
      {to.later ? dashboardChrome.later : dashboardChrome.soon}
    </span>
  );
}
