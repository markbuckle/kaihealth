import { home } from '../../content/dashboard';
import { formatShortMonthYear } from '../../lib/health/format';
import type { HomeSummary } from '../../lib/member-data';
import { Card } from '../ui/card';
import { Eyebrow } from '../ui/eyebrow';
import { ScoreRing } from '../ui/score-ring';
import { ScoreChange } from './score-change';
import { ScoreExplainer } from './score-explainer';

const copy = home.score;

// On small screens the ring sits left of the title, change and link. From md the title runs
// across the top and the link sits at the bottom, as the desktop wireframe draws it.
export function ScoreCard({
  score,
  drawn,
  since,
}: {
  score: HomeSummary['score'];
  drawn: string;
  since: string | undefined;
}) {
  return (
    <Card
      as="article"
      aria-labelledby="score-title"
      className="grid grid-cols-[auto_1fr] items-center gap-x-4.5 gap-y-1 p-5 md:grid-rows-[auto_auto_1fr] md:gap-x-5 md:gap-y-4 md:p-6"
    >
      <div className="col-start-2 row-start-1 flex items-baseline justify-between gap-3 md:col-span-2 md:col-start-1">
        <h2 id="score-title" className="font-semibold md:text-16">
          {copy.title}
        </h2>
        <Eyebrow as="span" variant="card" className="max-md:hidden">
          {formatShortMonthYear(drawn)}
        </Eyebrow>
      </div>
      <ScoreRing
        score={score.value}
        caption={copy.outOf}
        className="col-start-1 row-span-3 row-start-1 md:row-span-1 md:row-start-2"
      />
      <p className="col-start-2 row-start-2 flex flex-col gap-1.5 font-label">
        <span className="text-12 md:text-13">
          <ScoreChange current={score.value} previous={score.previous} since={since} />
          {score.previous === undefined ? null : (
            <span className="md:hidden"> · {copy.previousShort(score.previous)}</span>
          )}
        </span>
        {score.previous === undefined ? null : (
          <span className="text-12 text-text-muted max-md:hidden">
            {copy.previous(score.previous)}
          </span>
        )}
      </p>
      <ScoreExplainer
        score={score.value}
        areaCount={score.areaCount}
        holdingBack={score.holdingBack}
        helping={score.helping}
        className="col-start-2 row-start-3 self-start md:col-span-2 md:col-start-1 md:self-end md:justify-self-start"
      />
    </Card>
  );
}
