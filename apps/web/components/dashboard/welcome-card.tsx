import { demoActionNote, home } from '../../content/dashboard';
import { dashboardPages } from '../../content/dashboard-nav';
import { formatMonthYear } from '../../lib/health/format';
import type { Draw } from '../../lib/health/types';
import { Button, buttonClassName } from '../ui/button';
import { Card } from '../ui/card';
import { Eyebrow } from '../ui/eyebrow';
import { PageLink, SoonLabel } from './page-link';

const copy = home.welcome;
const { results } = dashboardPages;

export function WelcomeCard({
  firstName,
  latestDraw,
  clinician,
}: {
  firstName: string;
  latestDraw: Draw;
  clinician: string;
}) {
  return (
    <Card as="section" aria-labelledby="welcome-title">
      <div className="flex flex-col justify-center gap-2.5 p-5 md:gap-3.5 md:px-11 md:py-10">
        <Eyebrow variant="card" className="max-md:hidden">
          {copy.eyebrow}
        </Eyebrow>
        <h1
          id="welcome-title"
          className="font-heading text-40 leading-flat tracking-display md:text-52"
        >
          {copy.greeting(firstName)}
        </h1>
        <p className="text-text-muted md:text-15">
          {copy.results(formatMonthYear(latestDraw.drawn), latestDraw.reviewed?.by ?? clinician)}
        </p>
        <div className="flex flex-wrap gap-2.5 pt-1.5">
          <PageLink to={results} className={buttonClassName({ size: 'sm' })}>
            {copy.seeWhatChanged}
            <SoonLabel to={results} />
          </PageLink>
          <div className="max-md:hidden">
            <Button variant="outline" size="sm" disabled aria-describedby="welcome-demo-note">
              {copy.bookConsult}
            </Button>
          </div>
        </div>
        <p id="welcome-demo-note" className="text-12 text-text-muted max-md:hidden">
          {demoActionNote}
        </p>
      </div>
    </Card>
  );
}
