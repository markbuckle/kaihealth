import { dashboardChrome } from '../../content/dashboard';
import { dashboardPages } from '../../content/dashboard-nav';
import { routes } from '../../lib/config';
import type { Member } from '../../lib/member-data';
import { buttonClassName } from '../ui/button';
import { Icon } from '../ui/icon';
import { iconButtonClassName } from '../ui/icon-button';
import { Logo } from '../ui/logo';
import { PageLink, SoonLabel } from './page-link';

const { notifications, askKai, account } = dashboardPages;

// The header below lg. Navigation moves to the tab bar at the bottom of the screen.
export function MobileHeader({ member }: { member: Member }) {
  return (
    <header className="flex h-15 items-center justify-between gap-2 border-border border-b bg-chrome pr-2 pl-5 lg:hidden">
      <Logo variant="dashboard" href={routes.dashboard} />
      <div className="flex items-center">
        <PageLink to={askKai} className={buttonClassName({ variant: 'outline', size: 'xs' })}>
          <Icon name="sparkle" className="size-3.75" />
          {askKai.label}
          {/* too tight to show at 360px; the name still says it */}
          <SoonLabel to={askKai} className="max-sm:sr-only" />
        </PageLink>
        <PageLink
          to={notifications}
          aria-label={dashboardChrome.soonSuffix(
            dashboardChrome.notifications(member.unreadNotifications),
          )}
          title={dashboardChrome.soon}
          className={iconButtonClassName('bare', 'kai-motion-trigger relative')}
        >
          <Icon name="bell" className="kai-bell" />
          <span
            aria-hidden="true"
            className="absolute top-2.5 right-2.75 size-1.75 rounded-round bg-accent"
          />
        </PageLink>
        <PageLink
          to={account}
          aria-label={dashboardChrome.soonSuffix(dashboardChrome.account(member.fullName))}
          title={dashboardChrome.soon}
          className={iconButtonClassName()}
        >
          <span className="flex size-8 items-center justify-center rounded-round bg-surface font-label text-11 text-text">
            {member.initials}
          </span>
        </PageLink>
      </div>
    </header>
  );
}
