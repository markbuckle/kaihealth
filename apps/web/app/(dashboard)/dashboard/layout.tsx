import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { DashboardRoot } from '../../../components/dashboard/dashboard-root';
import { DemoBanner } from '../../../components/dashboard/demo-banner';
import { FollowSystemTheme } from '../../../components/dashboard/follow-system-theme';
import { MobileHeader } from '../../../components/dashboard/mobile-header';
import { Sidebar } from '../../../components/dashboard/sidebar';
import { TabBar } from '../../../components/dashboard/tab-bar';
import { TopBar } from '../../../components/dashboard/top-bar';
import { featureFlags } from '../../../lib/config';
import { getMember } from '../../../lib/member-data';
import { parseTheme, themeCookie } from '../../../lib/theme';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// The member dashboard. Sign-in, when it exists, becomes one check here: everything below
// already reads the member through lib/member-data.ts.
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  if (!featureFlags.demoDashboard) notFound();

  // A saved choice renders on the server, so there is no flash. Without one, a small script
  // follows the system setting before the first paint.
  const theme = parseTheme((await cookies()).get(themeCookie.name)?.value);
  const member = await getMember();

  return (
    <DashboardRoot
      initialTheme={theme}
      className="flex min-h-dvh flex-col bg-page text-14 text-text leading-body"
    >
      {theme ? null : <FollowSystemTheme />}
      <DemoBanner />
      <TopBar member={member} />
      <MobileHeader member={member} />
      <div className="flex flex-1">
        <Sidebar />
        <main
          id="main"
          className="min-w-0 flex-1 bg-canvas px-4 pt-5 pb-8 md:px-8 lg:px-12 lg:pt-10 lg:pb-24"
        >
          <div className="max-w-content">{children}</div>
        </main>
      </div>
      <TabBar />
    </DashboardRoot>
  );
}
