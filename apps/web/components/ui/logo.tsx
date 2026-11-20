import Link from 'next/link';
import { cn } from '../../lib/cn';
import { routes, siteConfig } from '../../lib/config';
import { logoSource } from '../../lib/logo';

export const logoVariants = ['default', 'dashboard'] as const;
export type LogoVariant = (typeof logoVariants)[number];

const imageClassName = 'h-8 w-auto lg:h-10';

// The images are read from design/logos. They are data URIs that next/image cannot optimise.
function LogoImage({
  name,
  className,
}: {
  name: Parameters<typeof logoSource>[0];
  className?: string;
}) {
  return (
    // biome-ignore lint/performance/noImgElement: see above
    <img src={logoSource(name)} alt={siteConfig.name} className={cn(imageClassName, className)} />
  );
}

export function Logo({
  variant = 'default',
  href = routes.home,
  className,
}: {
  variant?: LogoVariant;
  href?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={cn('inline-flex min-h-11 items-center', className)}>
      {variant === 'dashboard' ? (
        // both are in the page and CSS shows the one for the theme, so there is no flash
        <>
          <LogoImage name="dashboardLight" className="in-data-[theme=dark]:hidden" />
          <LogoImage name="dashboardDark" className="hidden in-data-[theme=dark]:block" />
        </>
      ) : (
        <LogoImage name="landing" />
      )}
    </Link>
  );
}
