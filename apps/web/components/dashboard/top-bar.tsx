import { dashboardChrome } from '../../content/dashboard';
import { dashboardPages } from '../../content/dashboard-nav';
import { routes } from '../../lib/config';
import type { Member } from '../../lib/member-data';
import { buttonClassName } from '../ui/button';
import { Icon } from '../ui/icon';
import { iconButtonClassName } from '../ui/icon-button';
import { Logo } from '../ui/logo';
import { PageLink, SoonLabel } from './page-link';
import { SidebarToggle } from './sidebar';
import { ThemeToggle } from './theme-toggle';

const { notifications, askKai, settings, account } = dashboardPages;

// The desktop top bar, from lg up. The mobile header takes over below that.
export function TopBar({ member }: { member: Member }) {
  return (
    <header className="flex h-18 items-center justify-between gap-4 border-border border-b bg-page px-6 max-lg:hidden">
      <div className="flex items-center gap-3">
        <SidebarToggle />
        <Logo variant="wordmark" href={routes.dashboard} />
      </div>
      <div className="flex items-center gap-1.5">
        <PageLink
          to={notifications}
          aria-label={dashboardChrome.soonSuffix(
            dashboardChrome.notifications(member.unreadNotifications),
          )}
          title={dashboardChrome.soon}
          className={iconButtonClassName('plain', 'relative')}
        >
          <Icon name="bell" />
          <span
            aria-hidden="true"
            className="absolute top-2.25 right-2.5 size-2 rounded-round bg-accent"
          />
        </PageLink>
        <PageLink to={askKai} className={buttonClassName({ variant: 'outline', size: 'xs' })}>
          <Icon name="sparkle" className="size-4" />
          {askKai.label}
          <SoonLabel to={askKai} />
        </PageLink>
        <ThemeToggle />
        <PageLink
          to={settings}
          aria-label={dashboardChrome.soonSuffix(settings.label)}
          title={dashboardChrome.soon}
          className={iconButtonClassName()}
        >
          <Icon name="settings" />
        </PageLink>
        <PageLink
          to={account}
          className="ml-1.5 flex items-center gap-2.5 rounded-pill border-hairline py-1 pr-3 pl-1 text-text aria-disabled:cursor-not-allowed"
        >
          <span className="flex size-8.5 items-center justify-center rounded-round bg-surface font-label text-12">
            {member.initials}
          </span>
          <span className="font-medium text-14">{member.firstName}</span>
          <SoonLabel to={account} className="text-text-muted" />
        </PageLink>
      </div>
    </header>
  );
}
