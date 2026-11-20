// SYNTHETIC DEMO DATA. The landing page's picture of the product, made from the demo member.
// The landing page reads demo content here rather than through lib/member-data.ts, because
// the marketing site must never show a real member's results once sign-in exists.

import { resultSeries, resultsOn, statusCounts } from '../../lib/health/results';
import { demoBiomarkers, demoDraws } from './results';

const showcaseIds = ['apob', 'vitamin-d', 'hs-crp'];

const series = resultSeries(demoBiomarkers, demoDraws);
const latestDraw = demoDraws.at(-1);

export const showcaseSeries = showcaseIds.flatMap((id) =>
  series.filter((entry) => entry.biomarker.id === id),
);

// counts for every result in the latest draw, not only the ones shown
export const showcaseCounts = statusCounts(latestDraw ? resultsOn(series, latestDraw.drawn) : []);
