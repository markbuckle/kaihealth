import type { ReactNode } from 'react';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';

// The public site: the landing page, the coming-soon page and the styleguide.
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
