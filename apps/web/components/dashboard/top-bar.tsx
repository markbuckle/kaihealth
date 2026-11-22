import { dashboardChrome } from '../../content/dashboard';
import { dashboardPages } from '../../content/dashboard-nav';
import { routes } from '../../lib/config';
import type { Member } from '../../lib/member-data';
import { buttonClassName } from '../ui/button';
import { Icon } from '../ui/icon';
import { iconButtonClassName } from '../ui/icon-button';
import { Logo } from '../ui/logo';
import { PageLink, SoonLabel } from './page-link';
import { ThemeToggle } from './theme-toggle';

const { notifications, askKai, account } = dashboardPages;

// The desktop top bar, from lg up. The mobile header takes over below that.
export function TopBar({ member }: { member: Member }) {
  return (
    <header className="flex h-18 items-center justify-between gap-4 border-border border-b bg-page px-6 max-lg:hidden">
      <Logo variant="dashboard" href={routes.dashboard} />
      <div className="flex items-center gap-1.5">
        <PageLink
          to={notifications}
          aria-label={dashboardChrome.soonSuffix(
            dashboardChrome.notifications(member.unreadNotifications),
          )}
          title={dashboardChrome.soon}
          className={iconButtonClassName('plain', 'relative size-9!')}
        >
          <Icon name="bell" />
          <span
            aria-hidden="true"
            className="absolute top-1.25 right-1.5 size-2 rounded-round bg-accent"
          />
        </PageLink>
        <PageLink to={askKai} className={buttonClassName({ variant: 'outline', size: 'xs' })}>
          <Icon name="sparkle" className="size-4" />
          {askKai.label}
          <SoonLabel to={askKai} />
        </PageLink>
        <ThemeToggle />
        <PageLink
          to={account}
          aria-label={dashboardChrome.soonSuffix(dashboardChrome.account(member.firstName))}
          title={dashboardChrome.soon}
          className="ml-1.5 flex size-9 items-center justify-center rounded-round bg-surface font-label text-12 text-text aria-disabled:cursor-not-allowed"
        >
          {member.initials}
        </PageLink>
      </div>
    </header>
  );
}
