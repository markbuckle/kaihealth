'use client';

import { usePathname } from 'next/navigation';
import { dashboardChrome } from '../../content/dashboard';
import { moreNav, tabBarNav } from '../../content/dashboard-nav';
import { cn } from '../../lib/cn';
import { Icon } from '../ui/icon';
import { IconButton } from '../ui/icon-button';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { useDashboardRoot } from './dashboard-root';
import { PageLink, SoonLabel } from './page-link';
import { ThemeToggle } from './theme-toggle';

const tabClassName = (current: boolean) =>
  cn(
    'flex min-h-13 cursor-pointer flex-col items-center justify-center gap-1 text-11 leading-flat',
    'aria-disabled:cursor-not-allowed',
    current ? 'font-semibold text-text' : 'text-text-muted',
  );

// The mobile navigation, below lg: four pages and a More menu for the rest.
export function TabBar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label={dashboardChrome.mainNav}
      className="sticky bottom-0 z-30 grid h-21 grid-cols-5 border-border border-t bg-page px-2 pt-2 pb-5 lg:hidden"
    >
      {tabBarNav.map(({ page, icon, label }) => {
        const current = pathname === page.href;
        return (
          <PageLink key={page.href} to={page} current={current} className={tabClassName(current)}>
            <Icon name={icon} className="size-5.5" />
            {label ?? page.label}
            <SoonLabel to={page} />
          </PageLink>
        );
      })}
      <MoreMenu />
    </nav>
  );
}

function MoreMenu() {
  const { portal } = useDashboardRoot();
  return (
    <Sheet>
      <SheetTrigger className={tabClassName(false)}>
        <Icon name="more" className="size-5.5" />
        {dashboardChrome.more}
      </SheetTrigger>
      <SheetContent variant="drawer" container={portal} className="px-5 pt-2 pb-8">
        <div className="flex items-center justify-between">
          <SheetTitle className="font-label text-12 text-text-muted uppercase tracking-label">
            {dashboardChrome.more}
          </SheetTitle>
          <SheetClose asChild>
            <IconButton aria-label={dashboardChrome.close}>
              <Icon name="close" />
            </IconButton>
          </SheetClose>
        </div>
        <ul className="flex flex-col">
          {moreNav.map((page) => {
            const link = (
              <PageLink
                to={page}
                className="flex min-h-14 items-center justify-between gap-3 text-16 aria-disabled:cursor-not-allowed aria-disabled:text-text-muted"
              >
                {page.label}
                <SoonLabel to={page} />
              </PageLink>
            );
            return (
              <li key={page.href} className="border-border border-b">
                {/* a ready page closes the menu as it navigates */}
                {page.ready ? <SheetClose asChild>{link}</SheetClose> : link}
              </li>
            );
          })}
          <li>
            <ThemeToggle variant="row" />
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
