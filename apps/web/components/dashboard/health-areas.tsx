import { home } from '../../content/dashboard';
import { areaPage, dashboardPages } from '../../content/dashboard-nav';
import { cn } from '../../lib/cn';
import type { AreaSummary } from '../../lib/member-data';
import { cardClassName } from '../ui/card';
import { Eyebrow } from '../ui/eyebrow';
import { Icon } from '../ui/icon';
import { StatusPill } from '../ui/status-pill';
import { PageLink, SoonLabel, textLinkClassName } from './page-link';
import { ScoreChange } from './score-change';
import { SectionHeading } from './section-heading';

const copy = home.areas;

// the wireframe gives the first four areas large cards and the rest small ones
const priorityCount = 4;

// A large card from md up; a compact row below md, as the mobile wireframe draws it.
function PriorityCard({
  area,
  rank,
  since,
}: {
  area: AreaSummary;
  rank: number;
  since: string | undefined;
}) {
  const page = areaPage(area);
  const status = <StatusPill variant="dot" status={area.status} />;
  return (
    <PageLink to={page} className={cardClassName('outlined', 'block h-full text-text')}>
      <span className="flex items-center gap-3.5 p-4 md:hidden">
        <span className="w-13 shrink-0 font-heading text-36 leading-flat">{area.score}</span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.75">
          <Eyebrow as="span" variant="card">
            {copy.rank(rank)}
          </Eyebrow>
          <span className="font-semibold text-16">{area.label}</span>
          <span className="text-12">{status}</span>
          <span className="text-12 text-text-muted">{copy.drivenBy(area.drivers.join(', '))}</span>
        </span>
        {page.ready ? (
          <Icon name="chevron-right" className="size-4" />
        ) : (
          <SoonLabel to={page} className="text-text-muted" />
        )}
      </span>
      <span className="flex h-full flex-col gap-2.5 p-5 max-md:hidden">
        <span className="flex items-baseline justify-between gap-3">
          <Eyebrow as="span" variant="card">
            {copy.rank(rank)}
          </Eyebrow>
          <SoonLabel to={page} className="text-text-muted" />
        </span>
        <span className="font-semibold text-18">{area.label}</span>
        <span className="flex items-baseline gap-1.5">
          <span className="font-heading text-44 leading-flat">{area.score}</span>
          <span className="font-label text-12 text-text-muted">{copy.outOf}</span>
        </span>
        <span className="text-13">{status}</span>
        <span className="font-label text-12 text-text-muted">
          <ScoreChange current={area.score} previous={area.previousScore} since={since} />
        </span>
        <span className="mt-auto border-border border-t pt-2.5 text-13 text-text-muted">
          {copy.driving(area.drivers.join(', '))}
        </span>
      </span>
    </PageLink>
  );
}

function OtherCard({ area }: { area: AreaSummary }) {
  const page = areaPage(area);
  return (
    <PageLink
      to={page}
      className={cardClassName('outlined', 'flex h-full flex-col gap-1.5 px-4 py-3.5 text-text')}
    >
      <span className="flex items-baseline justify-between gap-3">
        <span className="font-semibold">{area.label}</span>
        <span className="font-heading text-26 leading-flat">{area.score}</span>
      </span>
      <span className="flex items-center justify-between gap-2 text-12">
        <StatusPill variant="dot" status={area.status} />
        <SoonLabel to={page} className="text-text-muted" />
      </span>
      <span className="text-12 text-text-muted">{copy.drivenBy(area.drivers.join(', '))}</span>
    </PageLink>
  );
}

export function HealthAreas({
  areas,
  since,
}: {
  // where focus will help most first
  areas: AreaSummary[];
  since: string | undefined;
}) {
  const priority = areas.slice(0, priorityCount);
  const others = areas.slice(priorityCount);
  const allAreas = dashboardPages.areas;
  return (
    <section aria-labelledby="areas-title" className="flex flex-col gap-3 md:gap-4">
      <SectionHeading
        id="areas-title"
        title={copy.title}
        lead={copy.lead}
        link={
          <PageLink to={allAreas} className={cn(textLinkClassName, 'shrink-0 text-13 md:text-14')}>
            <span className="md:hidden">{copy.viewAllShort}</span>
            <span className="max-md:hidden">{copy.viewAll}</span>
            <SoonLabel to={allAreas} className="ml-1.5" />
          </PageLink>
        }
      />
      <ol className="grid gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-4">
        {priority.map((area, index) => (
          <li key={area.id}>
            <PriorityCard area={area} rank={index + 1} since={since} />
          </li>
        ))}
      </ol>
      <ul className="grid gap-3 max-md:hidden md:grid-cols-3 xl:grid-cols-5">
        {others.map((area) => (
          <li key={area.id}>
            <OtherCard area={area} />
          </li>
        ))}
      </ul>
    </section>
  );
}
