import type { ReactNode } from 'react';
import { demoActionNote, home } from '../../content/dashboard';
import { dashboardPages } from '../../content/dashboard-nav';
import { cn } from '../../lib/cn';
import { formatDate, formatMonthYear, formatShortDate } from '../../lib/health/format';
import type { Draw } from '../../lib/health/types';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs } from '../ui/tabs';
import { PageLink, SoonLabel, textLinkClassName } from './page-link';

const copy = home.testing;
const { checkup } = dashboardPages;

function Row({ title, detail, action }: { title: string; detail: ReactNode; action?: ReactNode }) {
  return (
    <li className="flex items-center justify-between gap-3 border-border border-b py-3 last:border-b-0">
      <div>
        <p className="font-medium">{title}</p>
        <p className="font-label text-12 text-text-muted">{detail}</p>
      </div>
      {action}
    </li>
  );
}

export function TestingCard({
  draws,
  nextDrawDue,
  resultsConsultBooked,
  clinician,
}: {
  // newest first
  draws: Draw[];
  nextDrawDue: string;
  resultsConsultBooked: boolean;
  clinician: string;
}) {
  const upcoming = (
    <ul>
      <Row
        title={copy.consult}
        detail={
          <>
            <span className="max-md:hidden">{copy.withClinician(clinician)} · </span>
            {resultsConsultBooked ? copy.booked : copy.notBooked}
          </>
        }
        action={
          <Button size="xs" disabled aria-describedby="testing-demo-note">
            {copy.book}
          </Button>
        }
      />
      <Row
        title={copy.draw}
        detail={copy.due(formatMonthYear(nextDrawDue))}
        action={
          <Button variant="outline" size="xs" disabled aria-describedby="testing-demo-note">
            {copy.remind}
          </Button>
        }
      />
    </ul>
  );

  const done = (
    <ul>
      {draws.map((draw) => (
        <Row
          key={draw.drawn}
          title={copy.draw}
          detail={
            <>
              {copy.drawn(formatDate(draw.drawn))}
              {draw.reviewed
                ? ` · ${copy.reviewed(formatShortDate(draw.reviewed.date), draw.reviewed.by)}`
                : null}
            </>
          }
        />
      ))}
    </ul>
  );

  return (
    <Card
      as="article"
      variant="lit"
      aria-labelledby="testing-title"
      className="flex flex-col gap-3 p-5 md:gap-3.5 md:p-6"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="testing-title" className="font-semibold md:text-16">
          {copy.title}
        </h2>
        <PageLink to={checkup} className={cn(textLinkClassName, 'text-13 max-md:hidden')}>
          {checkup.label}
          <SoonLabel to={checkup} className="ml-1.5" />
        </PageLink>
      </div>
      <Tabs
        variant="underline"
        label={copy.tabsLabel}
        items={[
          { value: 'upcoming', label: copy.upcoming, content: upcoming },
          { value: 'done', label: copy.done, content: done },
        ]}
      />
      <p id="testing-demo-note" className="mt-auto text-12 text-text-muted">
        {demoActionNote}
      </p>
    </Card>
  );
}
