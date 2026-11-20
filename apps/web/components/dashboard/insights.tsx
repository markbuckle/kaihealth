import { home } from '../../content/dashboard';
import { dashboardPages, insightPage } from '../../content/dashboard-nav';
import type { Insight } from '../../content/demo/insights';
import { cn } from '../../lib/cn';
import { cardClassName } from '../ui/card';
import { Placeholder } from '../ui/placeholder';
import { PageLink, SoonLabel, textLinkClassName } from './page-link';
import { SectionHeading } from './section-heading';

const copy = home.insights;
const { insights: allInsights } = dashboardPages;

// A row that scrolls sideways. The list itself takes focus so it can scroll by keyboard,
// since the cards are not focusable until their articles exist.
export function Insights({ insights }: { insights: Insight[] }) {
  return (
    <section aria-labelledby="insights-title" className="flex flex-col gap-3 md:gap-4">
      <SectionHeading
        id="insights-title"
        title={copy.title}
        link={
          <PageLink to={allInsights} className={cn(textLinkClassName, 'text-14 max-md:hidden')}>
            {copy.seeAll}
            <SoonLabel to={allInsights} className="ml-1.5" />
          </PageLink>
        }
      />
      <ul
        aria-labelledby="insights-title"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrolling region must be reachable by keyboard
        tabIndex={0}
        className="-mr-4 flex gap-3 overflow-x-auto pr-4 pb-1 md:mr-0 md:gap-4 md:pr-0"
      >
        {insights.map((insight) => {
          const page = insightPage(insight.id, insight.title);
          return (
            <li key={insight.id} className="w-55 shrink-0 md:w-65">
              <PageLink
                to={page}
                className={cardClassName(
                  'outlined',
                  'flex h-full flex-col overflow-hidden text-text',
                )}
              >
                <Placeholder
                  variant="media"
                  label={home.imageLabel}
                  className="h-24 w-full md:h-30"
                />
                <span className="flex flex-col gap-1 p-3.5 md:gap-1.5 md:p-4">
                  <span className="font-semibold leading-snug">{insight.title}</span>
                  <span className="flex items-center justify-between gap-2 font-label text-11 text-text-muted">
                    {copy.meta(insight.minutes, insight.topic)}
                    <SoonLabel to={page} />
                  </span>
                </span>
              </PageLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
