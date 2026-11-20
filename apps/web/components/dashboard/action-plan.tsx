import { home } from '../../content/dashboard';
import { dashboardPages, recommendationPage } from '../../content/dashboard-nav';
import { cn } from '../../lib/cn';
import { planCategoryLabel } from '../../lib/health/plan';
import type { PlanItem } from '../../lib/member-data';
import { buttonClassName } from '../ui/button';
import { Card } from '../ui/card';
import { Chip } from '../ui/chip';
import { Eyebrow } from '../ui/eyebrow';
import { Tabs } from '../ui/tabs';
import { PageLink, SoonLabel, textLinkClassName } from './page-link';
import { SectionHeading } from './section-heading';

const copy = home.plan;
const { plan: fullPlan, planPriorities } = dashboardPages;

function PlanCard({ item }: { item: PlanItem }) {
  const page = recommendationPage(item.id, item.title);
  return (
    <Card as="li" className="flex flex-col gap-2 p-4 md:gap-2.5 md:p-5">
      <div className="flex justify-between gap-3">
        <Eyebrow as="span" variant="card">
          {item.categoryLabel}
        </Eyebrow>
        <span className="font-label text-11 text-text uppercase leading-list tracking-label">
          {home.areas.rank(item.rank)}
        </span>
      </div>
      <h3 className="font-semibold text-16 leading-snug md:text-17">{item.title}</h3>
      <ul className="flex flex-wrap gap-1.5">
        {item.areaLabels.map((label) => (
          <li key={label}>
            <Chip variant="tag">{label}</Chip>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        <PageLink to={page} className={buttonClassName({ size: 'xs' })}>
          {copy.open}
          <SoonLabel to={page} />
        </PageLink>
        {item.secondaryAction ? (
          <div className="max-md:hidden">
            <PageLink to={page} className={buttonClassName({ variant: 'outline', size: 'xs' })}>
              {item.secondaryAction}
              <SoonLabel to={page} />
            </PageLink>
          </div>
        ) : null}
      </div>
    </Card>
  );
}

function PlanCards({ items, emptyLabel }: { items: PlanItem[]; emptyLabel?: string }) {
  if (items.length === 0) {
    return emptyLabel ? <p className="py-2 text-text-muted">{emptyLabel}</p> : null;
  }
  return (
    <ul className="grid gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
      {items.map((item) => (
        <PlanCard key={item.id} item={item} />
      ))}
    </ul>
  );
}

// The chips filter the plan: Priorities shows every recommendation by rank.
export function ActionPlan({ plan }: { plan: PlanItem[] }) {
  return (
    <section aria-labelledby="plan-title" className="flex flex-col gap-3 md:gap-4">
      <SectionHeading
        id="plan-title"
        title={copy.title}
        lead={copy.lead}
        link={
          <PageLink
            to={fullPlan}
            className={cn(textLinkClassName, 'shrink-0 text-14 max-md:hidden')}
          >
            {copy.seeAll}
            <SoonLabel to={fullPlan} className="ml-1.5" />
          </PageLink>
        }
      />
      <Tabs
        variant="filter"
        label={copy.filterLabel}
        items={[
          {
            value: 'priorities',
            label: planPriorities.label,
            content: <PlanCards items={plan} />,
          },
          ...copy.filters.map((category) => ({
            value: category,
            label: planCategoryLabel(category),
            content: (
              <PlanCards
                items={plan.filter((item) => item.category === category)}
                emptyLabel={copy.empty(planCategoryLabel(category))}
              />
            ),
          })),
        ]}
      />
    </section>
  );
}
