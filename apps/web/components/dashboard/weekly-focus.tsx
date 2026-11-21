import { home } from '../../content/dashboard';
import { recommendationPage } from '../../content/dashboard-nav';
import type { HomeSummary } from '../../lib/member-data';
import { buttonClassName } from '../ui/button';
import { Card } from '../ui/card';
import { Chip } from '../ui/chip';
import { Eyebrow } from '../ui/eyebrow';
import { Placeholder } from '../ui/placeholder';
import { PageLink, SoonLabel } from './page-link';

const copy = home.focus;

// This week's focus. Small screens show the first sentence only, as the mobile wireframe does.
export function WeeklyFocus({ focus }: { focus: HomeSummary['focus'] }) {
  const page = recommendationPage(focus.recommendationId, focus.title);
  return (
    <Card
      as="section"
      variant="lit"
      aria-labelledby="focus-title"
      className="flex flex-col overflow-hidden [--border-lit:var(--border-lit-top-left)] md:flex-row md:flex-wrap"
    >
      <Placeholder
        variant="media"
        label={home.imageLabel}
        className="h-35 w-full md:h-auto md:min-h-50 md:w-auto md:flex-1 md:basis-70"
      />
      <div className="flex flex-col gap-2 p-5 md:flex-2 md:basis-105 md:gap-2.5 md:px-8 md:py-7">
        <Eyebrow variant="card">{copy.eyebrow(focus.categoryLabel)}</Eyebrow>
        <h2 id="focus-title" className="font-heading text-26 leading-display md:text-32">
          {focus.title}
        </h2>
        <p className="max-w-130 text-13 text-text-muted md:text-14">
          {focus.summary}
          <span className="max-md:hidden"> {focus.detail}</span>
        </p>
        <ul className="flex flex-wrap gap-1.5 max-md:hidden">
          {focus.areaLabels.map((label) => (
            <li key={label}>
              <Chip variant="tag">{label}</Chip>
            </li>
          ))}
        </ul>
        <div className="pt-1.5">
          <PageLink to={page} className={buttonClassName({ size: 'sm' })}>
            {copy.cta}
            <SoonLabel to={page} />
          </PageLink>
        </div>
      </div>
    </Card>
  );
}
