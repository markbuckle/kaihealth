'use client';

import { dashboardChrome, home } from '../../content/dashboard';
import { dashboardPages } from '../../content/dashboard-nav';
import { cn } from '../../lib/cn';
import { formatSigned, spellCount } from '../../lib/health/format';
import type { ScoreFactor } from '../../lib/member-data';
import { Eyebrow } from '../ui/eyebrow';
import { Icon } from '../ui/icon';
import { IconButton } from '../ui/icon-button';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { StatusPill } from '../ui/status-pill';
import { useDashboardRoot } from './dashboard-root';
import { PageLink, SoonLabel, textLinkClassName } from './page-link';

const copy = home.scoreExplainer;

// the wireframe lists four results holding the score back and three helping it
const listLength = { holdingBack: 4, helping: 3 } as const;

// one-off: name, bar and points columns as the wireframe sizes them
const rowColumns = 'grid-cols-[1fr_7.5rem_2.25rem]';

function FactorList({
  title,
  factors,
  largest,
  barClassName,
}: {
  title: string;
  factors: ScoreFactor[];
  largest: number;
  barClassName: string;
}) {
  return (
    <section className="flex flex-col gap-2.5">
      <h3 className="font-semibold text-15">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {factors.map((factor) => (
          <li key={factor.name} className={cn('grid items-center gap-3', rowColumns)}>
            <span className="flex flex-col">
              <span className="font-medium">{factor.name}</span>
              <StatusPill
                variant="dot"
                status={factor.status}
                direction={factor.direction}
                className="text-11"
              />
            </span>
            <span aria-hidden="true" className="h-1.5 rounded-pill bg-surface">
              <span
                className={cn('block h-full rounded-pill', barClassName)}
                style={{ width: `${(Math.abs(factor.points) / largest) * 100}%` }}
              />
            </span>
            <span className="text-right font-label text-12">{formatSigned(factor.points, 1)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// "How this is calculated": the results that move the overall score most, from the same
// function that computed the score.
export function ScoreExplainer({
  score,
  areaCount,
  holdingBack,
  helping,
  className,
}: {
  score: number;
  areaCount: number;
  holdingBack: ScoreFactor[];
  helping: ScoreFactor[];
  className?: string;
}) {
  const { portal } = useDashboardRoot();
  const down = holdingBack.slice(0, listLength.holdingBack);
  const up = helping.slice(0, listLength.helping);
  // both lists share one scale, so bar lengths compare across them
  const largest = Math.max(...[...down, ...up].map((factor) => Math.abs(factor.points)), 0) || 1;

  return (
    <Sheet>
      <SheetTrigger
        className={cn(textLinkClassName, 'cursor-pointer text-left text-13 md:text-14', className)}
      >
        {home.score.explain}
      </SheetTrigger>
      <SheetContent variant="drawer" container={portal} className="pb-8">
        <div className="flex items-center justify-between pt-3.5 pr-3 pl-7">
          <Eyebrow as="span" variant="card">
            {copy.eyebrow}
          </Eyebrow>
          <SheetClose asChild>
            <IconButton aria-label={dashboardChrome.close}>
              <Icon name="close" />
            </IconButton>
          </SheetClose>
        </div>
        <div className="flex flex-col gap-5.5 px-7 pt-1">
          <div className="flex flex-col gap-2">
            <SheetTitle className="font-heading text-40 leading-display tracking-display">
              {copy.title}
            </SheetTitle>
            <p className="text-text-muted">
              {copy.introLead} <span className="font-label text-text">{score}</span>{' '}
              {copy.intro(spellCount(areaCount))}
            </p>
          </div>
          <FactorList
            title={copy.holdingBack}
            factors={down}
            largest={largest}
            barClassName="bg-text"
          />
          <FactorList
            title={copy.helping}
            factors={up}
            largest={largest}
            barClassName="bg-accent"
          />
          <p className="text-12 text-text-muted">{copy.disclaimer}</p>
          <PageLink to={dashboardPages.scoreMethod} className={textLinkClassName}>
            {copy.method}
            <SoonLabel to={dashboardPages.scoreMethod} className="ml-1.5" />
          </PageLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}
