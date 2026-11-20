import type { Metadata } from 'next';
import { ActionPlan } from '../../../components/dashboard/action-plan';
import { HealthAreas } from '../../../components/dashboard/health-areas';
import { Insights } from '../../../components/dashboard/insights';
import { ScoreCard } from '../../../components/dashboard/score-card';
import { TestingCard } from '../../../components/dashboard/testing-card';
import { WeeklyFocus } from '../../../components/dashboard/weekly-focus';
import { WelcomeCard } from '../../../components/dashboard/welcome-card';
import { dashboardPages } from '../../../content/dashboard-nav';
import { formatMonth } from '../../../lib/health/format';
import { getHomeSummary } from '../../../lib/member-data';

export const metadata: Metadata = {
  title: dashboardPages.summary.label,
};

export default async function DashboardHomePage() {
  const summary = await getHomeSummary();
  const [latestDraw, previousDraw] = summary.draws;
  if (!latestDraw) throw new Error('Home needs at least one draw.');
  // changes are described as "since April", after the previous draw
  const since = previousDraw ? formatMonth(previousDraw.drawn) : undefined;

  return (
    <div className="flex flex-col gap-7 lg:gap-10">
      <WelcomeCard
        firstName={summary.firstName}
        latestDraw={latestDraw}
        clinician={summary.clinician}
      />
      <div className="grid gap-7 md:grid-cols-2 md:gap-5">
        <ScoreCard score={summary.score} drawn={latestDraw.drawn} since={since} />
        <TestingCard
          draws={summary.draws}
          nextDrawDue={summary.nextDrawDue}
          resultsConsultBooked={summary.resultsConsultBooked}
          clinician={summary.clinician}
        />
      </div>
      <HealthAreas areas={summary.areas} since={since} />
      <WeeklyFocus focus={summary.focus} />
      <Insights insights={summary.insights} />
      <ActionPlan plan={summary.plan} />
    </div>
  );
}
