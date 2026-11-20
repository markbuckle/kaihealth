import { showcaseCounts, showcaseSeries } from '../content/demo/showcase';
import { hero } from '../content/landing';
import { cn } from '../lib/cn';
import { formatValue } from '../lib/health/results';
import { statusLabels } from '../lib/health/status';
import { type Status, statuses } from '../lib/health/types';
import { BiomarkerCard } from './ui/biomarker-card';
import { Card } from './ui/card';
import { Chip } from './ui/chip';
import { Eyebrow } from './ui/eyebrow';
import { StatusPill } from './ui/status-pill';

const dotTones: Record<Status, string> = {
  optimal: 'bg-status-good',
  'in-range': 'bg-status-neutral',
  borderline: 'bg-status-warn',
  'out-of-range': 'bg-status-flag',
};

const copy = hero.dashboard;

// one-off: the 5 to 4 column split matches the wireframe
const resultsColumns = 'grid-cols-[5fr_4fr]';

// A picture of the product built from synthetic sample data. It sits in the dark hero
// but keeps the light theme, as the real dashboard would.
export function HeroDashboard({ className }: { className?: string }) {
  return (
    <figure
      data-theme="light"
      aria-label="Example dashboard showing synthetic sample results"
      className={cn('w-full max-w-sm text-text lg:max-w-dashboard', className)}
    >
      <CompactDashboard />
      <FullDashboard />
    </figure>
  );
}

function CompactDashboard() {
  return (
    <Card className="px-5 pt-5 pb-2 lg:hidden">
      <div className="flex items-baseline justify-between pb-3.5">
        <p className="font-medium text-16">{copy.title}</p>
        <Eyebrow as="span" variant="card" className="text-10">
          {copy.sampleLabel}
        </Eyebrow>
      </div>
      <ul>
        {showcaseSeries.map(({ biomarker, observations }) => {
          const latest = observations.at(-1);
          if (!latest) return null;
          const { status } = latest.interpretation;
          return (
            <li
              key={biomarker.id}
              className="flex items-center gap-2.5 border-border border-t py-3"
            >
              <span className="flex-1 text-14">{biomarker.name}</span>
              <span className="font-label text-13">
                {formatValue(biomarker, latest.valueQuantity.value)}
              </span>
              <StatusPill status={status} />
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

function FullDashboard() {
  const [featured, ...others] = showcaseSeries;
  const total = statuses.reduce((sum, status) => sum + showcaseCounts[status], 0);

  return (
    <Card className="hidden overflow-hidden lg:block">
      <div className="flex h-16 items-center justify-between border-border border-b px-7">
        <p className="font-medium text-17">{copy.title}</p>
        <div className="flex gap-1">
          {copy.tabs.map((tab, index) => (
            <Chip key={tab} variant="ghost" selected={index === 0}>
              {tab}
            </Chip>
          ))}
        </div>
      </div>
      <div className="flex">
        <div className="flex w-75 shrink-0 flex-col gap-5 border-border border-r p-7">
          <p className="flex flex-col gap-1.5">
            <span className="font-label text-56 leading-flat tracking-number">{total}</span>
            <span className="text-14 text-text-muted">{copy.totalLabel}</span>
          </p>
          <div aria-hidden="true" className="flex gap-0.75">
            {statuses.map((status) => (
              <span
                key={status}
                className={cn('h-2 rounded-pill', dotTones[status])}
                style={{ flexGrow: showcaseCounts[status] }}
              />
            ))}
          </div>
          <ul className="border-border border-b">
            {statuses.map((status) => (
              <li
                key={status}
                className="flex items-center gap-2.5 border-border border-t py-3 text-15"
              >
                <span
                  aria-hidden="true"
                  className={cn('size-2.5 rounded-round', dotTones[status])}
                />
                <span className="flex-1">{statusLabels[status]}</span>
                <span className="font-label">{showcaseCounts[status]}</span>
              </li>
            ))}
          </ul>
          <Eyebrow variant="card">{copy.sampleLabel}</Eyebrow>
        </div>
        <div className={cn('grid min-w-0 flex-1 items-start gap-4 bg-surface p-7', resultsColumns)}>
          {featured ? <BiomarkerCard series={featured} sampleLabel={copy.sampleLabel} /> : null}
          <div className="flex flex-col gap-4">
            {others.map((series) => (
              <BiomarkerCard key={series.biomarker.id} series={series} variant="compact" />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
