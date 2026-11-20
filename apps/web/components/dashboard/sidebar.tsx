'use client';

import { usePathname } from 'next/navigation';
import { useId, useState } from 'react';
import { dashboardChrome } from '../../content/dashboard';
import { type DashboardPage, type SidebarEntry, sidebarNav } from '../../content/dashboard-nav';
import { cn } from '../../lib/cn';
import { Icon } from '../ui/icon';
import { IconButton } from '../ui/icon-button';
import { useDashboardRoot } from './dashboard-root';
import { PageLink, SoonLabel } from './page-link';

export const sidebarId = 'dashboard-sidebar';

const itemStyles = {
  top: 'min-h-10 px-3 text-14',
  sub: 'min-h-8.5 pr-3 pl-9 text-13',
} as const;

type Level = keyof typeof itemStyles;

// Sub-pages are quieter than top-level pages, and pages that are not ready are quieter still.
function tone(page: DashboardPage, level: Level, current: boolean): string {
  if (current) return 'bg-surface font-semibold text-text';
  if (page.later && level === 'sub') return 'text-text-muted/60';
  if (!page.ready || level === 'sub') return 'text-text-muted';
  return 'text-text';
}

function NavItem({ page, level }: { page: DashboardPage; level: Level }) {
  const current = usePathname() === page.href;
  return (
    <PageLink
      to={page}
      current={current}
      className={cn(
        'flex flex-1 items-center gap-2.5 rounded-inset',
        itemStyles[level],
        tone(page, level, current),
      )}
    >
      {page.label}
      <SoonLabel to={page} className="ml-auto" />
    </PageLink>
  );
}

// A page with sub-pages. The label is the group's own page; the chevron shows the sub-pages.
function NavGroup({ entry }: { entry: Extract<SidebarEntry, { type: 'group' }> }) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  return (
    <>
      <div className="flex items-center">
        <NavItem page={entry.page} level="top" />
        <IconButton
          aria-expanded={open}
          aria-controls={listId}
          aria-label={dashboardChrome.groupToggle(entry.page.label)}
          onClick={() => setOpen((value) => !value)}
          className="size-10"
        >
          <Icon
            name="chevron-down"
            className={cn(
              'size-3.5 transition-transform duration-(--duration-fast) motion-reduce:transition-none',
              open && 'rotate-180',
            )}
          />
        </IconButton>
      </div>
      <ul id={listId} hidden={!open} className="flex flex-col">
        {entry.items.map((page) => (
          <li key={page.href} className="flex">
            <NavItem page={page} level="sub" />
          </li>
        ))}
      </ul>
    </>
  );
}

// The desktop navigation, from lg up. The top bar's sidebar button hides and shows it.
export function Sidebar() {
  const { sidebarOpen } = useDashboardRoot();
  return (
    <nav
      id={sidebarId}
      aria-label={dashboardChrome.mainNav}
      className={cn(
        'w-sidebar shrink-0 border-border border-r bg-page px-4 pt-5 pb-8',
        sidebarOpen ? 'max-lg:hidden' : 'hidden',
      )}
    >
      <ul className="flex flex-col gap-0.5">
        {sidebarNav.map((entry, index) => {
          if (entry.type === 'divider') {
            // biome-ignore lint/suspicious/noArrayIndexKey: the nav list never reorders
            return <li key={index} aria-hidden="true" className="my-3 h-px bg-border" />;
          }
          return (
            <li key={entry.page.href} className={entry.type === 'link' ? 'flex' : undefined}>
              {entry.type === 'group' ? (
                <NavGroup entry={entry} />
              ) : (
                <NavItem page={entry.page} level="top" />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function SidebarToggle() {
  const { sidebarOpen, toggleSidebar } = useDashboardRoot();
  return (
    <IconButton
      aria-expanded={sidebarOpen}
      aria-controls={sidebarId}
      aria-label={dashboardChrome.sidebar}
      onClick={toggleSidebar}
    >
      <Icon name="sidebar" />
    </IconButton>
  );
}
